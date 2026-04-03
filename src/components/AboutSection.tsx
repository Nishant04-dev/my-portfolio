import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Rocket, Code, Gamepad2, Bot } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const highlights = [
  { icon: Rocket,   label: "Entrepreneur", glow: "#00ff88" },
  { icon: Code,     label: "Developer",    glow: "#00d4ff" },
  { icon: Gamepad2, label: "Esports CEO",  glow: "#ff00ff" },
  { icon: Bot,      label: "Bot Creator",  glow: "#ffcc00" },
];

const techStack = [
  { name: "React",        color: "#00d4ff" },
  { name: "TypeScript",   color: "#00ff88" },
  { name: "Node.js",      color: "#ffcc00" },
  { name: "Python",       color: "#ff00ff" },
  { name: "Discord.js",   color: "#00d4ff" },
  { name: "Tailwind CSS", color: "#00ff88" },
];

const AboutSection = () => {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t }    = useLanguage();

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.div className="mb-10" initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}>
          <span className="cyber-label"><span className="text-primary mr-1">01</span> About</span>
          <h2 className="font-display text-4xl md:text-5xl mt-3 text-foreground">{t("about.title")}</h2>
          <div className="cyber-divider mt-3 max-w-xs" />
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <motion.div className="cyber-card-terminal" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="terminal-header">
              <span className="terminal-dot bg-[#ff3366]" />
              <span className="terminal-dot bg-[#ffcc00]" />
              <span className="terminal-dot bg-[#00ff88]" />
              <span className="font-mono text-xs text-muted-foreground ml-2">about_nishant.md</span>
            </div>
            <div className="p-6 font-mono text-sm space-y-4">
              <p className="text-muted-foreground leading-relaxed"><span className="text-primary">{">"}</span> <span className="text-foreground font-semibold">Entrepreneurial student and programmer</span> with experience in building technology solutions, managing esports organizations, and leading development projects.</p>
              <p className="text-muted-foreground leading-relaxed"><span className="text-primary">{">"}</span> Founder of <span className="text-primary font-semibold">Aurix Development</span>, creator of intelligent Discord bots, and <span className="text-primary font-semibold">Founder & CEO of Vanguard India</span>.</p>
              <p className="text-muted-foreground leading-relaxed"><span className="text-primary">{">"}</span> Skilled at combining <span className="text-foreground">technical expertise with leadership</span> to deliver impactful projects.</p>
              <div className="flex items-center gap-1 text-primary"><span>{">"}</span><span className="animate-blink">_</span></div>
            </div>
          </motion.div>
          <motion.div className="grid grid-cols-2 gap-4" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.3 }}>
            {highlights.map((item, i) => (
              <motion.div key={item.label} className="cyber-card p-6 flex flex-col items-center justify-center text-center cursor-pointer" style={{ borderColor: `${item.glow}30` }} initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }} whileHover={{ scale: 1.03, boxShadow: `0 0 10px ${item.glow}, 0 0 20px ${item.glow}60`, borderColor: item.glow }} whileTap={{ scale: 0.97 }}>
                <item.icon className="w-10 h-10 mb-3" style={{ color: item.glow, filter: `drop-shadow(0 0 6px ${item.glow})` }} strokeWidth={1.5} />
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-foreground">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <motion.div className="mt-10" initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 }}>
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-[0.2em] mb-3"><span className="text-primary mr-2">{">"}</span>Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, i) => (
              <motion.span key={tech.name} className="font-mono text-xs px-3 py-1 border uppercase tracking-wider transition-all duration-150" style={{ color: tech.color, borderColor: `${tech.color}40`, background: `${tech.color}08` }} initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.3, delay: 0.5 + i * 0.06 }} whileHover={{ boxShadow: `0 0 8px ${tech.color}`, borderColor: tech.color, scale: 1.05 }}>{tech.name}</motion.span>
            ))}
          </div>
        </motion.div>
        <motion.div className="mt-6 flex flex-wrap gap-3" initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.7 }}>
          {[{ flag: "🇬🇧", lang: "English", level: "Fluent" }, { flag: "🇮🇳", lang: "Hindi", level: "Fluent" }].map((l) => (
            <span key={l.lang} className="skill-badge flex items-center gap-2 text-xs"><span>{l.flag}</span><span>{l.lang}</span><span className="text-primary">— {l.level}</span></span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;