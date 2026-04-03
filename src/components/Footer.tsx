import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

const socialLinks = [
  { icon: Github,    href: "https://github.com/Nishant04-dev",                      label: "GitHub",    color: "#e0e0e0" },
  { icon: Linkedin,  href: "https://www.linkedin.com/in/nishant-chauhan-a71002367", label: "LinkedIn",  color: "#00d4ff" },
  { icon: Instagram, href: "https://www.instagram.com/vg_nishantchauhan",           label: "Instagram", color: "#ff00ff" },
  { icon: Mail,      href: "mailto:info@nishantdev.in",                             label: "Email",     color: "#00ff88" },
];

const quickLinks = [
  { label: "About",    href: "#about" },
  { label: "Skills",   href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey",  href: "#journey" },
  { label: "Contact",  href: "#contact" },
];

const projects = [
  { label: "Luveza",             href: "https://luveza.bond/" },
  { label: "Campus Clash",       href: "https://campus.clash.aurixdevelopment.in/" },
  { label: "Lumiere AI",         href: "https://lumiereai.nishantdev.in/" },
  { label: "The Nen Wallpapers", href: "https://bg.thenen.site/" },
  { label: "Aurix Development",  href: "https://aurixdevelopment.xyz/" },
  { label: "Vanguard India",     href: "https://vanguard.ind.in/" },
];

const columnVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
};

const Footer = () => {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer className="relative border-t border-border" ref={ref}>
      {/* Animated pulsing neon top line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #00ff88, transparent)" }}
        animate={{ boxShadow: ["0 0 4px #00ff88, 0 0 8px #00ff8840", "0 0 12px #00ff88, 0 0 24px #00ff8880", "0 0 4px #00ff88, 0 0 8px #00ff8840"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <motion.div custom={0} variants={columnVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 flex items-center justify-center border border-primary cyber-chamfer-sm" style={{ boxShadow: "0 0 5px #00ff88, 0 0 10px #00ff8840" }}>
                <span className="font-display text-sm text-primary">N</span>
              </div>
              <span className="font-display text-sm tracking-widest text-foreground">NISHANT CHAUHAN</span>
            </div>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-6">
              Entrepreneur, Developer & Esports Founder. Building the future one project at a time.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-border flex items-center justify-center text-muted-foreground transition-all duration-150"
                  style={{ clipPath: "polygon(0 4px, 4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px))" }}
                  whileHover={{ borderColor: s.color, color: s.color, boxShadow: `0 0 8px ${s.color}` }}
                  aria-label={s.label}
                >
                  <s.icon className="w-4 h-4" strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div custom={1} variants={columnVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <h4 className="font-display text-sm tracking-widest text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors duration-150 flex items-center gap-1.5">
                    <span className="text-primary/40">{">"}</span>{l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Projects */}
          <motion.div custom={2} variants={columnVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <h4 className="font-display text-sm tracking-widest text-foreground mb-4">Projects</h4>
            <ul className="space-y-2">
              {projects.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors duration-150 flex items-center gap-1.5">
                    <span className="text-primary/40">{">"}</span>{l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div custom={3} variants={columnVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <h4 className="font-display text-sm tracking-widest text-foreground mb-4">Contact</h4>
            <ul className="space-y-2 font-mono text-xs text-muted-foreground">
              <li className="flex items-center gap-1.5"><span className="text-primary/40">{">"}</span>Gurugram, Haryana, India</li>
              <li><a href="mailto:info@nishantdev.in" className="flex items-center gap-1.5 hover:text-primary transition-colors duration-150"><span className="text-primary/40">{">"}</span>info@nishantdev.in</a></li>
              <li><a href="https://nishantdev.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors duration-150"><span className="text-primary/40">{">"}</span>nishantdev.in</a></li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="font-mono text-xs text-muted-foreground">© {new Date().getFullYear()} Nishant Chauhan. All rights reserved.</p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono text-xs uppercase tracking-[0.2em] border border-border text-muted-foreground px-4 py-2 transition-all duration-150 hover:border-primary hover:text-primary"
            style={{ clipPath: "polygon(0 4px, 4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px))" }}
            whileHover={{ boxShadow: "0 0 8px #00ff88, 0 0 16px #00ff8840" }}
            whileTap={{ scale: 0.97 }}
          >
            ↑ Back to Top
          </motion.button>
          <p className="font-mono text-xs text-muted-foreground flex items-center gap-1">
            Made with <span className="text-primary mx-1">{"<3"}</span> in India
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
