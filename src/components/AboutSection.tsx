import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Rocket, Code, Gamepad2, Bot, Sparkles } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const highlights = [
    { icon: Rocket, label: "Entrepreneur", color: "text-primary" },
    { icon: Code, label: "Developer", color: "text-blue-400" },
    { icon: Gamepad2, label: "Esports CEO", color: "text-green-400" },
    { icon: Bot, label: "Bot Creator", color: "text-purple-400" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section id="about" className="py-20 relative" ref={ref}>
      {/* Background decoration */}
      <motion.div 
        className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          <h2 className="row-title !px-0 !mb-0 text-3xl md:text-4xl">
            {t("about.title").toUpperCase()}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Bio Card */}
          <motion.div 
            className="p-8 rounded-2xl card-glow relative overflow-hidden"
            style={{ background: "var(--gradient-card)", border: "1px solid hsl(var(--border))" }}
            initial={{ opacity: 0, y: 40, rotateX: -10 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            whileHover={{ y: -5 }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            
            <motion.p 
              className="text-muted-foreground leading-relaxed mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              <span className="text-foreground font-semibold">Entrepreneurial student and programmer</span> with experience in building technology solutions, managing esports organizations, and leading development projects.
            </motion.p>
            <motion.p 
              className="text-muted-foreground leading-relaxed mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              <span className="text-primary font-semibold">Founder of Aurix Development</span>, creator of intelligent Discord bots, and <span className="text-primary font-semibold">Founder & CEO of Vanguard India</span>.
            </motion.p>
            <motion.p 
              className="text-muted-foreground leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              Skilled at combining <span className="text-foreground">technical expertise with leadership</span> to deliver impactful projects, from robotics to gaming events.
            </motion.p>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div 
            className="grid grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.label}
                className="p-6 rounded-xl flex flex-col items-center justify-center text-center card-glow cursor-pointer relative overflow-hidden group"
                style={{ background: "var(--gradient-card)", border: "1px solid hsl(var(--border))" }}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.08,
                  boxShadow: "0 0 30px hsl(357 83% 47% / 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Hover glow */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                >
                  <item.icon className={`w-10 h-10 mb-3 ${item.color}`} />
                </motion.div>
                <span className="font-semibold text-foreground relative z-10">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Languages */}
        <motion.div 
          className="mt-12 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div 
            className="skill-badge flex items-center gap-2"
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px hsl(357 83% 47% / 0.2)" }}
          >
            <span className="text-2xl">🇬🇧</span>
            <span>English — Fluent</span>
          </motion.div>
          <motion.div 
            className="skill-badge flex items-center gap-2"
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px hsl(357 83% 47% / 0.2)" }}
          >
            <span className="text-2xl">🇮🇳</span>
            <span>Hindi — Fluent</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;