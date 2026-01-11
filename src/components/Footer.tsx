import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, Heart } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/Nishant04-dev", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/nishant-chauhan-a71002367", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/vg_nishantchauhan", label: "Instagram" },
    { icon: Mail, href: "mailto:Info@nishantchauhan.site", label: "Email" },
  ];

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  const projects = [
    { label: "Aurix Development", href: "https://aurixdevelopment.xyz/" },
    { label: "Vanguard India", href: "https://vanguard.ind.in/" },
    { label: "Sonix Bot", href: "https://sonix.aurixdevelopment.xyz/" },
  ];

  return (
    <footer className="py-16 border-t border-border">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl mb-4">NISHANT CHAUHAN</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Entrepreneur, Developer & Esports Founder. Building the future one project at a time.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-all"
                  whileHover={{ scale: 1.1, boxShadow: "0 0 20px hsl(357 83% 47% / 0.3)" }}
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors animated-underline inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Featured Projects</h4>
            <ul className="space-y-2">
              {projects.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors animated-underline inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>📍 Gurugram, Haryana, India</li>
              <li>
                <a href="mailto:Info@nishantchauhan.site" className="hover:text-primary transition-colors">
                  📧 Info@nishantchauhan.site
                </a>
              </li>
              <li>
                <a href="tel:+918810501509" className="hover:text-primary transition-colors">
                  📞 +91 8810501509
                </a>
              </li>
              <li>
                <a href="https://nishant.vanguard.ind.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  🌐 nishant.vanguard.ind.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Nishant Chauhan. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-primary fill-primary" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
