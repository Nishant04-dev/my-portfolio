import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Rocket, Code, Gamepad2, Bot } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    { icon: Rocket, label: "Entrepreneur", color: "text-primary" },
    { icon: Code, label: "Developer", color: "text-blue-400" },
    { icon: Gamepad2, label: "Esports CEO", color: "text-green-400" },
    { icon: Bot, label: "Bot Creator", color: "text-purple-400" },
  ];

  return (
    <section id="about" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.h2 
          className="row-title !px-0 text-3xl md:text-4xl mb-8"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          ABOUT ME
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Bio Card */}
          <motion.div 
            className="p-8 rounded-2xl card-glow"
            style={{ background: "var(--gradient-card)", border: "1px solid hsl(var(--border))" }}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-muted-foreground leading-relaxed mb-6">
              <span className="text-foreground font-semibold">Entrepreneurial student and programmer</span> with experience in building technology solutions, managing esports organizations, and leading development projects.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              <span className="text-primary font-semibold">Founder of Aurix Development</span>, creator of intelligent Discord bots, and <span className="text-primary font-semibold">Founder & CEO of Vanguard India</span>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Skilled at combining <span className="text-foreground">technical expertise with leadership</span> to deliver impactful projects, from robotics to gaming events.
            </p>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.label}
                className="p-6 rounded-xl flex flex-col items-center justify-center text-center card-glow cursor-pointer"
                style={{ background: "var(--gradient-card)", border: "1px solid hsl(var(--border))" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <item.icon className={`w-10 h-10 mb-3 ${item.color}`} />
                <span className="font-semibold text-foreground">{item.label}</span>
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
          <div className="skill-badge flex items-center gap-2">
            <span className="text-2xl">🇬🇧</span>
            <span>English — Fluent</span>
          </div>
          <div className="skill-badge flex items-center gap-2">
            <span className="text-2xl">🇮🇳</span>
            <span>Hindi — Fluent</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
