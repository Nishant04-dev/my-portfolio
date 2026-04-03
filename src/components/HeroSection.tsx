import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Terminal, Mail, ChevronDown } from "lucide-react";
import nishantImage from "@/assets/nishant.jpg";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import ParticleBackground from "./ParticleBackground";

const roles = ["ENTREPRENEUR", "DEVELOPER", "ESPORTS FOUNDER", "BOT CREATOR", "TECH DISRUPTOR"];

const statsData = [
  { val: "50+",   label: "Projects" },
  { val: "20+",   label: "Clients" },
  { val: "150K+", label: "Users Reached" },
];

const statsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.8 },
  },
};

const statItemVariants = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const opacity  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY    = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : 60]);

  const { playHover, playClick } = useSoundEffects();
  const { currentText }          = useTypingEffect(roles, 80, 40, 2000);

  const scrollTo = (id: string) => {
    playClick();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background cyber-grid"
    >
      <ParticleBackground />

      {/* Radial glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #00ff88 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 pt-24"
        style={{ y: textY, opacity }}
      >
        {/* Left: Text */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <span className="cyber-label">
              <span className="animate-blink text-primary">▮</span>
              &nbsp;SYSTEM ONLINE — PORTFOLIO v2.0
            </span>
          </motion.div>

          <div className="mb-4 overflow-hidden">
            <motion.h1
              className="font-display text-6xl md:text-8xl lg:text-9xl leading-none tracking-tighter"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <span className="cyber-glitch text-foreground block" data-text="NISHANT">NISHANT</span>
            </motion.h1>
            <motion.h1
              className="font-display text-6xl md:text-8xl lg:text-9xl leading-none tracking-tighter"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <span className="text-neon block" style={{ textShadow: "0 0 20px rgba(0,255,136,0.4), 0 0 40px rgba(0,255,136,0.2)" }}>
                CHAUHAN
              </span>
            </motion.h1>
          </div>

          <motion.div className="h-8 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <span className="font-mono text-sm md:text-base text-muted-foreground tracking-[0.2em]">
              <span className="text-primary mr-2">{">"}</span>
              <span className="text-foreground">{currentText}</span>
              <span className="animate-blink text-primary ml-1">_</span>
            </span>
          </motion.div>

          <motion.div className="mb-8 flex justify-center lg:justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
            <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground border border-border px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ boxShadow: "0 0 6px #00ff88" }} />
              STATUS: AVAILABLE FOR HIRE
            </span>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.button onClick={() => scrollTo("projects")} onMouseEnter={playHover} className="btn-cyber-solid" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Terminal className="w-4 h-4" />
              View Projects
            </motion.button>
            <motion.button onClick={() => scrollTo("contact")} onMouseEnter={playHover} className="btn-cyber" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Mail className="w-4 h-4" />
              Contact Me
            </motion.button>
          </motion.div>

          {/* Stats row — staggered */}
          <motion.div
            className="mt-12 flex gap-8 justify-center lg:justify-start"
            variants={statsContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {statsData.map((s) => (
              <motion.div
                key={s.label}
                className="text-center lg:text-left cursor-default"
                variants={statItemVariants}
                whileHover={{ scale: 1.08, filter: "drop-shadow(0 0 8px #00ff88)" }}
              >
                <div className="font-display text-2xl text-primary" style={{ textShadow: "0 0 10px rgba(0,255,136,0.4)" }}>
                  {s.val}
                </div>
                <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Profile image — floats, mobile-responsive */}
        <motion.div
          className="flex-shrink-0 relative animate-float mx-auto lg:mx-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative">
            <div
              className="absolute -inset-3 cyber-chamfer opacity-30"
              style={{ background: "linear-gradient(135deg, #00ff88, #00d4ff, #ff00ff)" }}
            />
            <div
              className="relative w-48 h-48 md:w-80 md:h-80 cyber-chamfer overflow-hidden border-2 border-primary"
              style={{ boxShadow: "0 0 10px #00ff88, 0 0 20px #00ff8860, 0 0 40px #00ff8830" }}
            >
              <img
                src={nishantImage}
                alt="Nishant Chauhan"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                style={{ filter: "grayscale(1) contrast(1.1) brightness(0.9)" }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)" }}
              />
              <span className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary" />
              <span className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary" />
              <span className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary" />
              <span className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary" />
            </div>
            <div className="absolute -bottom-6 left-0 right-0 flex justify-between font-mono text-[10px] text-muted-foreground px-1">
              <span>ID: NC-2025</span>
              <span className="text-primary">VERIFIED ✓</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative data stream line */}
      <motion.div
        className="absolute bottom-20 left-0 right-0 z-10 px-6 md:px-12 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="relative h-px overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full"
            style={{ background: "linear-gradient(90deg, transparent, #00ff88, #00d4ff, transparent)", boxShadow: "0 0 6px #00ff88" }}
            initial={{ width: "0%", x: "-100%" }}
            animate={{ width: "100%", x: "0%" }}
            transition={{ duration: 1.5, delay: 1.4, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ opacity }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">Scroll</span>
        <ChevronDown className="w-4 h-4 text-primary" style={{ filter: "drop-shadow(0 0 4px #00ff88)" }} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
