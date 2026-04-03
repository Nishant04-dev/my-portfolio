import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const BOOT_LINES = [
  "INITIALIZING NEURAL INTERFACE...",
  "LOADING KERNEL MODULES...",
  "ESTABLISHING SECURE CHANNEL...",
  "DECRYPTING PORTFOLIO DATA...",
  "BYPASSING FIREWALL...",
  "ACCESS GRANTED.",
];

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    const lineInterval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= BOOT_LINES.length) { clearInterval(lineInterval); return prev; }
        return prev + 1;
      });
    }, 280);
    return () => clearInterval(lineInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadingComplete, 600);
          return 100;
        }
        return prev + 1.5;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background cyber-grid"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,255,136,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Logo */}
      <motion.div
        className="relative mb-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="w-20 h-20 flex items-center justify-center border-2 border-primary cyber-chamfer"
          style={{ boxShadow: "0 0 10px #00ff88, 0 0 20px #00ff8860, 0 0 40px #00ff8830" }}
        >
          <span className="font-display text-3xl text-primary">N</span>
        </div>
        {/* Corner accents */}
        <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-primary" />
        <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-primary" />
        <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-primary" />
        <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-primary" />
      </motion.div>

      {/* Boot log terminal */}
      <motion.div
        className="w-full max-w-sm mb-8 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="terminal-header mb-0 rounded-none">
          <span className="terminal-dot bg-[#ff3366]" />
          <span className="terminal-dot bg-[#ffcc00]" />
          <span className="terminal-dot bg-[#00ff88]" />
          <span className="font-mono text-xs text-muted-foreground ml-2">boot.sys</span>
        </div>
        <div
          className="border border-t-0 border-border bg-card p-4 font-mono text-xs space-y-1"
          style={{ minHeight: "140px" }}
        >
          {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              className={i === BOOT_LINES.length - 1 ? "text-primary" : "text-muted-foreground"}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-primary mr-2">{">"}</span>
              {line}
            </motion.div>
          ))}
          {visibleLines < BOOT_LINES.length && (
            <span className="inline-block w-2 h-4 bg-primary animate-blink" />
          )}
        </div>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="w-full max-w-sm px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex justify-between font-mono text-xs text-muted-foreground mb-1">
          <span>LOADING</span>
          <span className="text-primary">{Math.round(progress)}%</span>
        </div>
        <div className="h-1 bg-border w-full">
          <motion.div
            className="h-full bg-primary"
            style={{
              width: `${progress}%`,
              boxShadow: "0 0 6px #00ff88",
              transition: "width 0.05s linear",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
