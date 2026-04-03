import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Cpu, GitBranch, Users } from "lucide-react";

const skillCategories = [
  { title: "Programming",    icon: Code2,     color: "#00d4ff", prefix: "01", proficiency: 90, skills: ["Python", "JavaScript", "HTML", "CSS", "Node.js"] },
  { title: "Technologies",   icon: Cpu,       color: "#ff00ff", prefix: "02", proficiency: 75, skills: ["Automation", "AI/ML Basics", "Web Development", "Robotics Systems"] },
  { title: "Tools & Platforms", icon: GitBranch, color: "#00ff88", prefix: "03", proficiency: 85, skills: ["GitHub", "AI/ML APIs", "Web Frameworks", "Discord.js"] },
  { title: "Soft Skills",    icon: Users,     color: "#ffcc00", prefix: "04", proficiency: 95, skills: ["Leadership", "Project Management", "Event Organization", "Decision-Making"] },
];

const badgeContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const badgeVariants = {
  hidden:  { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
};

const SkillCard = ({ cat, index, isInView }: { cat: typeof skillCategories[number]; index: number; isInView: boolean }) => (
  <motion.div
    className="cyber-card p-0 overflow-hidden"
    style={{ borderColor: `${cat.color}30` }}
    initial={{ opacity: 0, y: 30 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    whileHover={{ boxShadow: `0 0 10px ${cat.color}, 0 0 20px ${cat.color}60`, borderColor: cat.color }}
  >
    <div className="flex items-center gap-3 px-5 py-3 border-b border-border" style={{ background: `${cat.color}10` }}>
      <cat.icon className="w-5 h-5" style={{ color: cat.color, filter: `drop-shadow(0 0 4px ${cat.color})` }} strokeWidth={1.5} />
      <span className="font-display text-sm tracking-widest" style={{ color: cat.color }}>{cat.title}</span>
      <span className="ml-auto font-mono text-xs text-muted-foreground">{cat.prefix}</span>
    </div>

    <motion.div className="p-5 flex flex-wrap gap-2" variants={badgeContainerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
      {cat.skills.map((skill) => (
        <motion.span key={skill} className="skill-badge" variants={badgeVariants}>{skill}</motion.span>
      ))}
    </motion.div>

    {/* Proficiency bar */}
    <div className="px-5 pb-5">
      <div className="flex justify-between font-mono text-[10px] text-muted-foreground mb-1">
        <span>PROFICIENCY</span>
        <span style={{ color: cat.color }}>{cat.proficiency}%</span>
      </div>
      <div className="h-1 bg-border overflow-hidden">
        <motion.div
          className="h-full"
          style={{ background: cat.color, boxShadow: `0 0 6px ${cat.color}` }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${cat.proficiency}%` } : { width: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  </motion.div>
);

const SkillsSection = () => {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.div className="mb-10" initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}>
          <span className="cyber-label"><span className="text-primary mr-1">02</span> Skills</span>
          <h2 className="font-display text-4xl md:text-5xl mt-3 text-foreground">Skills & Tech Stack</h2>
          <div className="cyber-divider mt-3 max-w-xs" />
        </motion.div>

        {/* Mobile/tablet: responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4 mt-4">
          {skillCategories.map((cat, i) => <SkillCard key={cat.title} cat={cat} index={i} isInView={isInView} />)}
        </div>

        {/* Desktop: horizontal scroll */}
        <div className="hidden lg:block">
          <div className="scroll-row mt-4">
            {skillCategories.map((cat, i) => (
              <div key={cat.title} className="flex-shrink-0 w-72 md:w-80">
                <SkillCard cat={cat} index={i} isInView={isInView} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
