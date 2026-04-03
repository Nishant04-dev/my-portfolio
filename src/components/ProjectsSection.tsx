import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, X, Bot, Gamepad2, Cpu, Users, Sparkles, Image, Zap } from "lucide-react";
import { useTilt } from "@/hooks/useTilt";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface Project {
  id: number; title: string; subtitle: string; year: string;
  description: string; features: string[]; icon: React.ElementType;
  accentColor: string; link?: string; category: string; tech: string[];
}

const categories = ["All", "Startup", "Esports", "AI", "Discord Bots", "Robotics"];

const projects: Project[] = [
  { id: 1, title: "Luveza", subtitle: "Startup Networking Platform", year: "2025", description: "A platform where startup founders and entrepreneurs connect, collaborate, and find the right co-founder.", features: ["Startup", "Networking", "SaaS", "Platform"], icon: Users, accentColor: "#ff00ff", link: "https://luveza.bond/", category: "Startup", tech: ["React", "Node.js", "SaaS"] },
  { id: 2, title: "Campus Clash", subtitle: "3D Esports Event Website", year: "2025", description: "A high-performance esports event website with smooth 3D scroll-based animations, built for Chandigarh University.", features: ["Esports", "3D", "Animation", "Web"], icon: Gamepad2, accentColor: "#00d4ff", link: "https://campus.clash.aurixdevelopment.in/", category: "Esports", tech: ["React", "Three.js", "GSAP"] },
  { id: 3, title: "Lumiere AI", subtitle: "Advanced AI Platform", year: "2025", description: "An advanced AI capable of code generation, deep research, and image creation.", features: ["AI", "SaaS", "Automation", "LLM"], icon: Sparkles, accentColor: "#ffcc00", link: "https://lumiereai.nishantdev.in/", category: "AI", tech: ["Next.js", "OpenAI", "TypeScript"] },
  { id: 4, title: "The Nen Wallpapers", subtitle: "4K Wallpaper Platform", year: "2025", description: "A modern platform offering high-quality 4K wallpapers for desktop, mobile, and PC users.", features: ["Wallpapers", "Media", "Web Platform"], icon: Image, accentColor: "#00ff88", link: "https://bg.thenen.site/", category: "Startup", tech: ["React", "Tailwind", "CDN"] },
  { id: 5, title: "Aurix Development", subtitle: "Intelligent Discord Bot Platform", year: "2025", description: "Built and launched Aurix, a premium Discord bot with advanced features for community management, security, and automation.", features: ["AI-enhanced features", "Verification systems", "Role management", "20+ clients served"], icon: Bot, accentColor: "#00d4ff", link: "https://aurixdevelopment.xyz/", category: "Discord Bots", tech: ["Discord.js", "Node.js", "MongoDB"] },
  { id: 6, title: "Vanguard India", subtitle: "Competitive Esports Organization", year: "2024", description: "Founded and manage a competitive eSports organization with online and offline tournaments.", features: ["10,000+ members", "LAN events", "Sponsorship deals", "BGMI tournaments"], icon: Zap, accentColor: "#ff3366", link: "https://vanguard.ind.in/", category: "Esports", tech: ["React", "Community", "Events"] },
  { id: 7, title: "Robotics Project", subtitle: "Educational Robot for Children", year: "2025", description: "Designed an educational robotics prototype with movement, object-following, and target recognition.", features: ["Computer vision", "Autonomous navigation", "Camera sensors", "Real-time detection"], icon: Cpu, accentColor: "#00ff88", category: "Robotics", tech: ["Python", "OpenCV", "Arduino"] },
];

const ProjectCard = ({ project, index, isInView, onClick }: { project: Project; index: number; isInView: boolean; onClick: () => void }) => {
  const { tiltStyle, handleMouseMove, handleMouseLeave } = useTilt(8);
  const { playHover } = useSoundEffects();

  return (
    <motion.div
      className="cyber-card cursor-pointer group overflow-hidden w-full"
      style={{ borderColor: `${project.accentColor}20`, ...tiltStyle }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={playHover}
      whileHover={{ boxShadow: `0 0 10px ${project.accentColor}, 0 0 20px ${project.accentColor}60`, borderColor: project.accentColor }}
    >
      <div className="h-36 flex items-center justify-center relative overflow-hidden" style={{ background: `${project.accentColor}10`, borderBottom: `1px solid ${project.accentColor}30` }}>
        <div className="absolute inset-0 cyber-grid opacity-50" />
        {/* Shimmer on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{ background: `linear-gradient(105deg, transparent 40%, ${project.accentColor}20 50%, transparent 60%)`, backgroundSize: "200% 100%" }}
          animate={{ backgroundPosition: ["200% center", "-200% center"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <project.icon className="w-14 h-14 relative z-10 transition-all duration-300 group-hover:scale-110" style={{ color: project.accentColor, filter: `drop-shadow(0 0 8px ${project.accentColor})` }} strokeWidth={1.5} />
        <span className="absolute top-2 left-2 w-3 h-3 border-t border-l" style={{ borderColor: project.accentColor }} />
        <span className="absolute top-2 right-2 w-3 h-3 border-t border-r" style={{ borderColor: project.accentColor }} />
        <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l" style={{ borderColor: project.accentColor }} />
        <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r" style={{ borderColor: project.accentColor }} />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs tracking-widest" style={{ color: project.accentColor }}>{project.year}</span>
          {project.link && <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.5} />}
        </div>
        <h3 className="font-display text-lg tracking-wide text-foreground mb-1">{project.title}</h3>
        <p className="font-mono text-xs text-muted-foreground">{project.subtitle}</p>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected]         = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.div className="mb-10" initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}>
          <span className="cyber-label"><span className="text-primary mr-1">03</span> Projects</span>
          <h2 className="font-display text-4xl md:text-5xl mt-3 text-foreground">Work & Projects</h2>
          <div className="cyber-divider mt-3 max-w-xs" />
        </motion.div>

        <motion.div className="flex gap-2 overflow-x-auto pb-2 mb-6" initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.2 }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 font-mono text-xs uppercase tracking-[0.15em] px-4 py-1.5 border transition-all duration-150 ${activeCategory === cat ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"}`}
              style={activeCategory === cat ? { boxShadow: "0 0 5px #00ff88, 0 0 10px #00ff8840" } : {}}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Mobile/tablet grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} isInView={isInView} onClick={() => setSelected(project)} />
          ))}
        </div>
      </div>

      {/* Desktop horizontal scroll */}
      <div className="hidden lg:block">
        <div className="scroll-row mt-2">
          {filtered.map((project, i) => (
            <div key={project.id} className="flex-shrink-0 w-72 md:w-80">
              <ProjectCard project={project} index={i} isInView={isInView} onClick={() => setSelected(project)} />
            </div>
          ))}
        </div>
      </div>

      {/* Modal with AnimatePresence */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="w-full max-w-2xl cyber-card overflow-hidden"
              style={{ borderColor: `${selected.accentColor}60`, boxShadow: `0 0 20px ${selected.accentColor}40` }}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-44 flex items-center justify-center relative overflow-hidden" style={{ background: `${selected.accentColor}10`, borderBottom: `1px solid ${selected.accentColor}30` }}>
                <div className="absolute inset-0 cyber-grid" />
                <selected.icon className="w-20 h-20 relative z-10" style={{ color: selected.accentColor, filter: `drop-shadow(0 0 12px ${selected.accentColor})` }} strokeWidth={1.5} />
                <button className="absolute top-4 right-4 w-8 h-8 border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors" onClick={() => setSelected(null)}>
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-2 font-mono text-xs text-muted-foreground">
                  <span style={{ color: selected.accentColor }}>{selected.year}</span>
                  <span>•</span>
                  <span>{selected.subtitle}</span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl mb-4 text-foreground">{selected.title}</h3>
                <p className="font-mono text-sm text-muted-foreground mb-6 leading-relaxed">{selected.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selected.features.map((f) => <span key={f} className="skill-badge">{f}</span>)}
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selected.tech.map((t) => (
                    <span key={t} className="font-mono text-xs px-3 py-1 border" style={{ color: selected.accentColor, borderColor: `${selected.accentColor}40`, background: `${selected.accentColor}10` }}>{t}</span>
                  ))}
                </div>
                {selected.link && (
                  <a href={selected.link} target="_blank" rel="noopener noreferrer" className="btn-cyber inline-flex items-center gap-2" style={{ borderColor: selected.accentColor, color: selected.accentColor }}>
                    <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                    Live Demo →
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
