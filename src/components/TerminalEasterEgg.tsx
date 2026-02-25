import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X } from "lucide-react";

interface TerminalLine {
  type: "input" | "output" | "error" | "success";
  content: string;
}

const COMMANDS = {
  help: `Available commands:
  help        - Show this help message
  about       - Learn about me
  skills      - View my technical skills
  projects    - See my projects
  contact     - Get my contact info
  certificates - View my certifications
  social      - My social links
  clear       - Clear the terminal
  exit        - Close terminal
  matrix      - Enter the matrix...
  hack        - 🔓 Just kidding!`,
  
  about: `╔══════════════════════════════════════╗
║        NISHANT CHAUHAN               ║
╠══════════════════════════════════════╣
║  Full Stack Developer & Designer     ║
║  Based in India                      ║
║                                      ║
║  Passionate about creating           ║
║  innovative digital experiences      ║
║  with clean code and modern design.  ║
╚══════════════════════════════════════╝`,

  skills: `Technical Skills:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Frontend  │ React, TypeScript, Tailwind CSS
Backend   │ Node.js, Python, Supabase
Design    │ Figma, UI/UX, Framer Motion
Tools     │ Git, VS Code, Docker
AI/ML     │ ChatGPT, Prompt Engineering
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,

  projects: `Recent Projects:
┌─────────────────────────────────────┐
│ 🚀 Portfolio Website                │
│ 🎮 Interactive Web Apps             │
│ 📱 Responsive Designs               │
│ 🤖 AI-Powered Tools                 │
└─────────────────────────────────────┘
Type 'contact' to work together!`,

  contact: `Get in Touch:
📧 Email    : info@nishantdev.in
🌐 Website  : nishantdev.in
📱 Phone    : Available on request

Type 'social' for my social media links!`,

  social: `Social Links:
🔗 LinkedIn  : linkedin.com/in/nishantchauhan
🐙 GitHub    : github.com/nishantchauhan
🐦 Twitter   : @nishantchauhan

Follow for updates and projects!`,

  certificates: `Certifications:
🏆 Frontend Development - Meta (Coursera)
🏆 Python for Beginners - Simplilearn
🏆 Python for Data Analysis - Simplilearn
🏆 Advanced Python - Simplilearn
🏆 UI/UX Design - Simplilearn
🏆 Generative AI - Outskill
🏆 AI Tools Workshop - be10x`,

  matrix: `
 ▄▄▄▄▄▄▄▄▄▄▄  ▄         ▄  ▄▄▄▄▄▄▄▄▄▄▄ 
▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌
 ▀▀▀▀█░█▀▀▀▀ ▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀▀▀ 
     ▐░▌     ▐░▌       ▐░▌▐░▌          
     ▐░▌     ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄ 
     ▐░▌     ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
     ▐░▌     ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀ 
     ▐░▌     ▐░▌       ▐░▌▐░▌          
     ▐░▌     ▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄▄▄ 
     ▐░▌     ▐░▌       ▐░▌▐░░░░░░░░░░░▌
      ▀       ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀ 
Wake up, Neo... The Matrix has you...`,

  hack: `
[██████████████████████████████] 100%

🔓 ACCESS GRANTED

Just kidding! But thanks for trying 😄
Your curiosity is appreciated!`,
};

const TerminalEasterEgg = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: "Welcome to Nishant's Terminal v1.0.0" },
    { type: "output", content: "Type 'help' for available commands." },
    { type: "output", content: "" },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Listen for Ctrl + ` to toggle terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const executeCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (!trimmedCmd) return;

    // Add to history
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    // Add input line
    setLines((prev) => [...prev, { type: "input", content: `$ ${cmd}` }]);

    if (trimmedCmd === "clear") {
      setLines([]);
      return;
    }

    if (trimmedCmd === "exit") {
      setIsOpen(false);
      return;
    }

    // Navigate commands
    const navCommands: Record<string, string> = {
      home: "#hero",
      about: "#about",
      skills: "#skills",
      projects: "#projects",
      contact: "#contact",
      certificates: "#certificates",
    };

    if (COMMANDS[trimmedCmd as keyof typeof COMMANDS]) {
      setLines((prev) => [
        ...prev,
        { type: "output", content: COMMANDS[trimmedCmd as keyof typeof COMMANDS] },
      ]);
      
      // Also scroll to section if applicable
      if (navCommands[trimmedCmd]) {
        setTimeout(() => {
          document.querySelector(navCommands[trimmedCmd])?.scrollIntoView({ behavior: "smooth" });
        }, 500);
      }
    } else {
      setLines((prev) => [
        ...prev,
        { type: "error", content: `Command not found: ${cmd}. Type 'help' for available commands.` },
      ]);
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(currentInput);
      setCurrentInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput("");
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    }
  };

  return (
    <>
      {/* Terminal Toggle Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="fixed bottom-8 left-24 z-[100] hidden md:block"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center shadow-lg hover:border-primary/50 transition-colors group"
          aria-label="Open terminal"
        >
          <Terminal className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </motion.button>
      </motion.div>

      {/* Terminal Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl bg-[#0d1117] border border-[#30363d] rounded-xl shadow-2xl overflow-hidden"
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 transition-colors"
                    />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="ml-4 text-sm text-[#8b949e] font-mono">nishant@portfolio:~</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#8b949e] hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Terminal Body */}
              <div
                ref={terminalRef}
                className="p-4 h-[400px] overflow-y-auto font-mono text-sm"
              >
                {lines.map((line, index) => (
                  <div
                    key={index}
                    className={`whitespace-pre-wrap mb-1 ${
                      line.type === "input"
                        ? "text-[#58a6ff]"
                        : line.type === "error"
                        ? "text-[#f85149]"
                        : line.type === "success"
                        ? "text-[#3fb950]"
                        : "text-[#c9d1d9]"
                    }`}
                  >
                    {line.content}
                  </div>
                ))}

                {/* Input Line */}
                <div className="flex items-center text-[#c9d1d9]">
                  <span className="text-[#3fb950] mr-2">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none caret-[#58a6ff]"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <motion.span
                    className="w-2 h-5 bg-[#58a6ff]"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </div>
              </div>

              {/* Terminal Footer */}
              <div className="px-4 py-2 bg-[#161b22] border-t border-[#30363d] text-xs text-[#8b949e] font-mono">
                Press <kbd className="px-1.5 py-0.5 bg-[#30363d] rounded text-[#c9d1d9]">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-[#30363d] rounded text-[#c9d1d9]">`</kbd> to toggle • <kbd className="px-1.5 py-0.5 bg-[#30363d] rounded text-[#c9d1d9]">Esc</kbd> to close
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TerminalEasterEgg;