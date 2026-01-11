import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, X, Play, Bot, Gamepad2, Cpu, UtensilsCrossed, Home, Building } from "lucide-react";
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
}

const projects: Project[] = [
  {
    id: 1,
    title: "Aurix Development",
    subtitle: "Intelligent Discord Bot Platform",
    year: "2025",
    description: "Built and launched Aurix, a premium Discord bot with advanced features for community management, security, and automation.",
    features: ["AI-enhanced features", "Verification systems", "Role management", "20+ clients served"],
    icon: Bot,
    color: "from-blue-600 to-purple-600",
    link: "https://aurixdevelopment.xyz/",
  },
  {
    id: 2,
    title: "Sonix Bot",
    subtitle: "Premium Discord Experience",
    year: "2025",
    description: "Advanced Discord bot with premium features for enhanced community experience.",
    features: ["Premium features", "Community tools", "Automation", "Custom commands"],
    icon: Bot,
    color: "from-cyan-500 to-blue-600",
    link: "https://sonix.aurixdevelopment.xyz/",
  },
  {
    id: 3,
    title: "Aurix Pro",
    subtitle: "Enterprise Bot Solutions",
    year: "2025",
    description: "Professional-grade Discord bot for enterprise-level community management.",
    features: ["Enterprise features", "Advanced security", "Custom integrations", "Priority support"],
    icon: Bot,
    color: "from-purple-500 to-pink-500",
    link: "https://pro.aurixdevelopment.xyz/",
  },
  {
    id: 4,
    title: "Vanguard India",
    subtitle: "Competitive Esports Organization",
    year: "2024",
    description: "Founded and manage a competitive eSports organization with online and offline tournaments.",
    features: ["10,000+ members", "LAN events", "Sponsorship deals", "BGMI tournaments"],
    icon: Gamepad2,
    color: "from-red-600 to-orange-500",
    link: "https://vanguard.ind.in/",
  },
  {
    id: 5,
    title: "Robotics Project",
    subtitle: "Educational Robot for Children",
    year: "2025",
    description: "Designed an educational robotics prototype with movement, object-following, and target recognition.",
    features: ["Computer vision", "Autonomous navigation", "Camera sensors", "Real-time detection"],
    icon: Cpu,
    color: "from-green-500 to-teal-500",
  },
  {
    id: 6,
    title: "Desi Tandoor",
    subtitle: "Restaurant Website",
    year: "2024",
    description: "Modern restaurant website showcasing authentic Indian cuisine with online ordering capabilities.",
    features: ["Modern UI", "Menu showcase", "Online ordering", "Responsive design"],
    icon: UtensilsCrossed,
    color: "from-orange-500 to-red-500",
    link: "https://desi-tandoor.vercel.app/",
  },
  {
    id: 7,
    title: "Punjabi Tadka",
    subtitle: "Restaurant Platform",
    year: "2024",
    description: "Vibrant restaurant website featuring Punjabi cuisine with an engaging user experience.",
    features: ["Engaging UI", "Food gallery", "Location info", "Contact forms"],
    icon: UtensilsCrossed,
    color: "from-yellow-500 to-orange-500",
    link: "https://punjabi-tadka.vercel.app/",
  },
  {
    id: 8,
    title: "Elite Furnish",
    subtitle: "Furniture E-commerce",
    year: "2024",
    description: "Premium furniture store website with elegant design and product showcase.",
    features: ["Product catalog", "Elegant design", "Category filters", "Responsive layout"],
    icon: Home,
    color: "from-amber-600 to-yellow-500",
    link: "https://elite-furnish-ten.vercel.app/",
  },
  {
    id: 9,
    title: "Gurugram Dream Homes",
    subtitle: "Real Estate Platform",
    year: "2024",
    description: "Real estate website for property listings in Gurugram with modern search features.",
    features: ["Property listings", "Search filters", "Contact forms", "Location maps"],
    icon: Building,
    color: "from-slate-600 to-blue-600",
    link: "https://gurugram-dream-homes.vercel.app/",
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

      {/* Horizontal Scroll Row */}
      <div className="scroll-row mt-4">
        {projects.map((project, index) => (
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

              {/* CTA */}
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
