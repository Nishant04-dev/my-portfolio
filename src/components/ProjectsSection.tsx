import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, X, Play, Bot, Gamepad2, Cpu, Users, Sparkles, Image, Zap } from "lucide-react";
import { useTilt } from "@/hooks/useTilt";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  description: string;
  features: string[];
  icon: React.ElementType;
  color: string;
  link?: string;
  image?: string;
  category: string;
  tech: string[];
}

const categories = ["All", "Startup", "Esports", "AI", "Discord Bots", "Robotics"];

const projects: Project[] = [
  {
    id: 1,
    title: "Luveza",
    subtitle: "Startup Networking Platform",
    year: "2025",
    description: "A platform where startup founders and entrepreneurs connect, collaborate, and find the right co-founder.",
    features: ["Startup", "Networking", "SaaS", "Platform"],
    icon: Users,
    color: "from-rose-500 to-pink-600",
    link: "https://luveza.bond/",
    category: "Startup",
    tech: ["React", "Node.js", "SaaS"],
  },
  {
    id: 2,
    title: "Campus Clash",
    subtitle: "3D Esports Event Website",
    year: "2025",
    description: "A high-performance esports event website with smooth 3D scroll-based animations, built for Chandigarh University.",
    features: ["Esports", "3D", "Animation", "Web"],
    icon: Gamepad2,
    color: "from-violet-600 to-indigo-600",
    link: "https://campus.clash.aurixdevelopment.in/",
    category: "Esports",
    tech: ["React", "Three.js", "GSAP"],
  },
  {
    id: 3,
    title: "Lumiere AI",
    subtitle: "Advanced AI Platform",
    year: "2025",
    description: "An advanced AI capable of code generation, deep research, and image creation.",
    features: ["AI", "SaaS", "Automation", "LLM"],
    icon: Sparkles,
    color: "from-amber-400 to-orange-500",
    link: "https://lumiereai.nishantdev.in/",
    category: "AI",
    tech: ["Next.js", "OpenAI", "TypeScript"],
  },
  {
    id: 4,
    title: "The Nen Wallpapers",
    subtitle: "4K Wallpaper Platform",
    year: "2025",
    description: "A modern platform offering high-quality 4K wallpapers for desktop, mobile, and PC users.",
    features: ["Wallpapers", "Media", "Web Platform"],
    icon: Image,
    color: "from-cyan-500 to-teal-600",
    link: "https://bg.thenen.site/",
    category: "Startup",
    tech: ["React", "Tailwind", "CDN"],
  },
  {
    id: 5,
    title: "Aurix Development",
    subtitle: "Intelligent Discord Bot Platform",
    year: "2025",
    description: "Built and launched Aurix, a premium Discord bot with advanced features for community management, security, and automation.",
    features: ["AI-enhanced features", "Verification systems", "Role management", "20+ clients served"],
    icon: Bot,
    color: "from-blue-600 to-purple-600",
    link: "https://aurixdevelopment.xyz/",
    category: "Discord Bots",
    tech: ["Discord.js", "Node.js", "MongoDB"],
  },
  {
    id: 6,
    title: "Vanguard India",
    subtitle: "Competitive Esports Organization",
    year: "2024",
    description: "Founded and manage a competitive eSports organization with online and offline tournaments.",
    features: ["10,000+ members", "LAN events", "Sponsorship deals", "BGMI tournaments"],
    icon: Zap,
    color: "from-red-600 to-orange-500",
    link: "https://vanguard.ind.in/",
    category: "Esports",
    tech: ["React", "Community", "Events"],
  },
  {
    id: 7,
    title: "Robotics Project",
    subtitle: "Educational Robot for Children",
    year: "2025",
    description: "Designed an educational robotics prototype with movement, object-following, and target recognition.",
    features: ["Computer vision", "Autonomous navigation", "Camera sensors", "Real-time detection"],
    icon: Cpu,
    color: "from-green-500 to-teal-500",
    category: "Robotics",
    tech: ["Python", "OpenCV", "Arduino"],
  },
];

const ProjectCard = ({ project, index, isInView, onClick }: { 
  project: Project; 
  index: number; 
  isInView: boolean;
  onClick: () => void;
}) => {
  const { tiltStyle, handleMouseMove, handleMouseLeave } = useTilt(10);
  const { playHover } = useSoundEffects();

  return (
    <motion.div
      className="flex-shrink-0 w-72 md:w-80 rounded-xl overflow-hidden card-glow cursor-pointer group"
      style={{ 
        background: "var(--gradient-card)", 
        border: "1px solid hsl(var(--border))",
        ...tiltStyle
      }}
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={playHover}
    >
      {/* Card Header with Gradient */}
      <div className={`h-40 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
        <project.icon className="w-16 h-16 text-white/80" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
        
        {/* Play button overlay */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
            <Play className="w-6 h-6 text-black ml-1" fill="currentColor" />
          </div>
        </motion.div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-primary font-medium">{project.year}</span>
          {project.link && (
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
        <h3 className="font-semibold text-lg text-foreground mb-1">{project.title}</h3>
        <p className="text-sm text-muted-foreground">{project.subtitle}</p>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 relative" ref={ref}>
      <motion.h2 
        className="row-title text-3xl md:text-4xl"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        WORK & PROJECTS
      </motion.h2>

      {/* Category Filters */}
      <motion.div
        className="flex gap-2 overflow-x-auto px-4 md:px-12 lg:px-16 mb-4 pb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 border ${
              activeCategory === cat
                ? "border-primary text-primary"
                : "border-border text-muted-foreground hover:border-primary/50"
            }`}
            style={activeCategory === cat ? { background: "hsl(var(--primary) / 0.1)" } : { background: "var(--gradient-card)" }}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Horizontal Scroll Row */}
      <div className="scroll-row mt-2">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            isInView={isInView}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div 
            className="w-full max-w-2xl rounded-2xl overflow-hidden"
            style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`h-48 md:h-56 bg-gradient-to-br ${selectedProject.color} relative`}>
              <selectedProject.icon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 text-white/50" />
              <button 
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
                onClick={() => setSelectedProject(null)}
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-primary font-medium">{selectedProject.year}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{selectedProject.subtitle}</span>
              </div>
              
              <h3 className="font-display text-3xl md:text-4xl mb-4">{selectedProject.title}</h3>
              
              <p className="text-muted-foreground mb-6">{selectedProject.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.features.map((feature) => (
                  <span key={feature} className="skill-badge text-xs">
                    {feature}
                  </span>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tech.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                    {t}
                  </span>
                ))}
              </div>


              {selectedProject.link && (
                <a 
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Project
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default ProjectsSection;
