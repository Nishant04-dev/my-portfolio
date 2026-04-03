import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const sections = [
  { id: "about",    label: "About" },
  { id: "skills",   label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey",  label: "Journey" },
  { id: "contact",  label: "Contact" },
];

const ScrollProgress = () => {
  const [progress, setProgress]             = useState(0);
  const [showTop, setShowTop]               = useState(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((top / max) * 100);
      setShowTop(top > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setCurrentSection(id); },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const sectionLabel = sections.find((s) => s.id === currentSection)?.label ?? null;

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-border z-[100]">
        <div
          className="h-full bg-primary transition-[width] duration-100"
          style={{ width: `${progress}%`, boxShadow: "0 0 6px #00ff88, 0 0 12px #00ff8840" }}
        />
      </div>

      {/* Currently reading section indicator */}
      <AnimatePresence>
        {sectionLabel && (
          <motion.div
            key={sectionLabel}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[99] pointer-events-none"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/60 bg-background/80 px-3 py-1 border border-primary/20">
              {sectionLabel}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ boxShadow: "0 0 10px #00ff88, 0 0 20px #00ff8860" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 w-10 h-10 border border-primary bg-background flex items-center justify-center z-[100] text-primary transition-all duration-150"
            style={{ clipPath: "polygon(0 6px, 6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px))" }}
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" strokeWidth={1.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollProgress;
