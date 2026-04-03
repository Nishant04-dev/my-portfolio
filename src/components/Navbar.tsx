import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

const navLinks = [
  { label: "About",    href: "#about",    id: "about" },
  { label: "Skills",   href: "#skills",   id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Journey",  href: "#journey",  id: "journey" },
  { label: "Contact",  href: "#contact",  id: "contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled]             = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection]       = useState("");
  const { playHover, playClick }                = useSoundEffects();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (href: string) => {
    playClick();
    setIsMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-2 bg-background/95 border-b border-border backdrop-blur-sm" : "py-4 bg-transparent"}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {isScrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #00ff88, transparent)", boxShadow: "0 0 6px #00ff88" }} />
        )}

        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group" onClick={(e) => { e.preventDefault(); playClick(); window.scrollTo({ top: 0, behavior: "smooth" }); }} onMouseEnter={playHover}>
            <div className="w-8 h-8 flex items-center justify-center border border-primary cyber-chamfer-sm" style={{ boxShadow: "0 0 5px #00ff88, 0 0 10px #00ff8840" }}>
              <span className="font-display text-sm text-primary">N</span>
            </div>
            <span className="font-display text-sm tracking-widest text-foreground group-hover:text-primary transition-colors duration-150">CHAUHAN</span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  onMouseEnter={playHover}
                  className={`relative font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-150 group ${isActive ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                >
                  <span className="text-primary/50 mr-1">{">"}</span>
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-150 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                    style={{ boxShadow: "0 0 4px #00ff88" }}
                  />
                </a>
              );
            })}
            <button onClick={() => handleNavClick("#contact")} onMouseEnter={playHover} className="btn-cyber text-xs px-5 py-2">
              Hire Me
            </button>
          </div>

          <button
            className="lg:hidden p-2 border border-border text-foreground hover:border-primary hover:text-primary transition-colors duration-150"
            onClick={() => { playClick(); setIsMobileMenuOpen(!isMobileMenuOpen); }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div className="fixed inset-0 z-40 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-background/98 cyber-grid" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center gap-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="font-mono text-xs text-muted-foreground mb-4 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary" />
                <span>NAVIGATION_MENU.exe</span>
                <span className="animate-blink text-primary">_</span>
              </div>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`font-display text-3xl transition-colors duration-150 flex items-center gap-3 ${activeSection === link.id ? "text-primary" : "text-foreground hover:text-primary"}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <span className="font-mono text-sm text-primary/50">{String(i + 1).padStart(2, "0")}</span>
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                onClick={() => handleNavClick("#contact")}
                className="btn-cyber mt-6 text-base px-8 py-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.07 + 0.1 }}
              >
                Hire Me
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
