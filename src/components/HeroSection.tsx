import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Mail } from "lucide-react";
import nishantImage from "@/assets/nishant.jpg";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import ParticleBackground from "./ParticleBackground";

const roles = ["Entrepreneur", "Developer", "Esports Founder", "Bot Creator", "Tech Enthusiast"];

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const { playHover, playClick } = useSoundEffects();
  const { currentText } = useTypingEffect(roles, 100, 50, 2000);

  const scrollToProjects = () => {
    playClick();
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    playClick();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Parallax Background */}
      <motion.div className="absolute inset-0 z-[1]" style={{ y, scale }}>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: `url(${nishantImage})` }}
        />
        <div className="hero-gradient absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </motion.div>

      {/* Content with parallax */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-12"
        style={{ y: textY, opacity }}
      >
        {/* Text Content */}
        <motion.div 
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="overflow-hidden mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.span 
              className="inline-block text-primary font-medium tracking-widest uppercase text-sm"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Welcome to my portfolio
            </motion.span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1 
              className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wide mb-2"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="gradient-text">NISHANT</span>
            </motion.h1>
          </div>
          
          <div className="overflow-hidden">
            <motion.h1 
              className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wide mb-6"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span className="gradient-text-red text-glow">CHAUHAN</span>
            </motion.h1>
          </div>

          {/* Typing Animation */}
          <motion.div 
            className="h-8 md:h-10 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <span className="text-lg md:text-xl text-foreground font-semibold">
              {currentText}
            </span>
            <motion.span
              className="inline-block w-0.5 h-6 md:h-7 bg-primary ml-1 align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            />
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <button 
              onClick={scrollToProjects}
              onMouseEnter={playHover}
              className="btn-primary flex items-center justify-center gap-2 group"
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" />
              View Projects
            </button>
            <button 
              onClick={scrollToContact}
              onMouseEnter={playHover}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Contact Me
            </button>
          </motion.div>
        </motion.div>

        {/* Profile Image with parallax */}
        <motion.div 
          className="flex-shrink-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative">
            <motion.div 
              className="absolute -inset-4 rounded-full opacity-50 blur-2xl"
              style={{ background: "linear-gradient(135deg, hsl(357 83% 47% / 0.4), transparent)" }}
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <img 
              src={nishantImage} 
              alt="Nishant Chauhan"
              className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-primary/30 shadow-2xl relative z-10"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 1.5 }, y: { duration: 2, repeat: Infinity } }}
        style={{ opacity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex justify-center">
          <motion.div 
            className="w-1.5 h-3 bg-primary rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
