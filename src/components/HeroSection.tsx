import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Mail, Sparkles } from "lucide-react";
import nishantImage from "@/assets/nishant.jpg";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { useLanguage } from "@/hooks/useLanguage";
import ParticleBackground from "./ParticleBackground";
import AvailabilityBadge from "./AvailabilityBadge";

const roles = ["Entrepreneur", "Developer", "Esports Founder", "Bot Creator", "Tech Enthusiast"];

const TypingText = ({ roles }: { roles: string[] }) => {
  const { currentText } = useTypingEffect(roles, 100, 50, 2000);
  return (
    <span className="text-xl md:text-2xl text-muted-foreground font-light tracking-tight">
      I am a <span className="text-white font-medium">{currentText}</span>
      <motion.span
        className="inline-block w-[2px] h-6 bg-primary ml-2 align-middle"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      />
    </span>
  );
};

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax values - disabled on mobile via conditional transform
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const { playHover, playClick } = useSoundEffects();
  const { t } = useLanguage();

  const scrollToProjects = () => {
    playClick();
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    playClick();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Parallax Background - optimized */}
      <motion.div 
        className="absolute inset-0 z-[1] hidden md:block will-change-transform" 
        style={{ y, scale, opacity }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 grayscale transition-opacity duration-1000"
          style={{ backgroundImage: `url(${nishantImage})` }}
        />
        <div className="hero-gradient absolute inset-0" />
      </motion.div>

      {/* Mobile Background (Static) */}
      <div className="absolute inset-0 z-[1] md:hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 grayscale"
          style={{ backgroundImage: `url(${nishantImage})` }}
        />
        <div className="hero-gradient absolute inset-0" />
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-16 will-change-transform"
        style={{ y: typeof window !== 'undefined' && window.innerWidth > 768 ? textY : 0 }}
      >
        {/* Text Content */}
        <motion.div 
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 text-primary font-semibold tracking-widest uppercase text-xs border border-primary/30 px-3 py-1 rounded-full bg-primary/5">
              <Sparkles className="w-3 h-3" />
              {t("hero.greeting")}
            </span>
          </motion.div>

          <div className="space-y-1 mb-8">
            <motion.h1 
              className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="text-white border-none">NISHANT</span>
            </motion.h1>
            <motion.h1 
              className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="gradient-text-red border-none">CHAUHAN</span>
            </motion.h1>
          </div>

          <AvailabilityBadge />

          {/* Typing Animation - Isolated */}
          <motion.div 
            className="h-10 mb-10 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <TypingText roles={roles} />
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.button 
              onClick={scrollToProjects}
              onMouseEnter={playHover}
              className="btn-primary group !rounded-full px-8 py-4 shadow-xl shadow-primary/10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-3">
                <Play className="w-4 h-4 fill-current" />
                {t("hero.cta.projects")}
              </span>
            </motion.button>
            <motion.button 
              onClick={scrollToContact}
              onMouseEnter={playHover}
              className="btn-secondary !rounded-full px-8 py-4 border-white/10 hover:border-primary/50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                {t("hero.cta.contact")}
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Profile Image - Simplified Elegance */}
        <motion.div 
          className="flex-shrink-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-transparent rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />
            <motion.img 
              src={nishantImage} 
              alt="Nishant Chauhan"
              className="w-72 h-72 md:w-96 md:h-96 rounded-full object-cover border-2 border-white/5 grayscale hover:grayscale-0 transition-grayscale duration-700 relative z-10 shadow-2xl"
              whileHover={{ scale: 1.02 }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        style={{ opacity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 font-semibold">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;