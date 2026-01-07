import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Code2, 
  Globe, 
  Bot, 
  Cpu, 
  GitBranch, 
  Users, 
  Target, 
  Calendar 
} from "lucide-react";

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: "Programming",
      icon: Code2,
      color: "from-blue-500 to-cyan-500",
      skills: ["Python", "JavaScript", "HTML", "CSS", "Node.js"],
    },
    {
      title: "Technologies",
      icon: Cpu,
      color: "from-purple-500 to-pink-500",
      skills: ["Automation", "AI/ML Basics", "Web Development", "Robotics Systems"],
    },
    {
      title: "Tools & Platforms",
      icon: GitBranch,
      color: "from-green-500 to-emerald-500",
      skills: ["GitHub", "AI/ML APIs", "Web Frameworks", "Discord.js"],
    },
    {
      title: "Soft Skills",
      icon: Users,
      color: "from-orange-500 to-red-500",
      skills: ["Leadership", "Project Management", "Event Organization", "Decision-Making"],
    },
  ];

  return (
    <section id="skills" className="py-20 relative" ref={ref}>
      <motion.h2 
        className="row-title text-3xl md:text-4xl"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        SKILLS & TECH STACK
      </motion.h2>

      {/* Horizontal Scroll Row */}
      <div className="scroll-row mt-4">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            className="flex-shrink-0 w-72 md:w-80 p-6 rounded-xl card-glow"
            style={{ background: "var(--gradient-card)", border: "1px solid hsl(var(--border))" }}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${category.color}`}>
                <category.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-lg text-foreground">{category.title}</h3>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span key={skill} className="skill-badge text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
