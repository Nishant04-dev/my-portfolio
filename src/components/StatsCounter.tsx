import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Code, Users, Briefcase, Clock, Star } from "lucide-react";

const stats = [
  { icon: Briefcase, label: "Projects Completed", target: 50, suffix: "+" },
  { icon: Users, label: "Happy Clients", target: 20, suffix: "+" },
  { icon: Clock, label: "Years Experience", target: 3, suffix: "+" },
  { icon: Code, label: "Lines of Code", target: 100, suffix: "K+" },
  { icon: Star, label: "5-Star Reviews", target: 15, suffix: "+" },
];

const Counter = ({ target, suffix, isInView }: { target: number; suffix: string; isInView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span>{count}{suffix}</span>;
};

const StatsCounter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 relative overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 opacity-5" style={{ background: "var(--gradient-red)" }} />
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center border border-border group-hover:border-primary transition-colors duration-300"
                style={{ background: "var(--gradient-card)" }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <stat.icon className="w-7 h-7 text-primary" />
              </motion.div>
              <div className="font-display text-4xl md:text-5xl mb-1 text-foreground">
                <Counter target={stat.target} suffix={stat.suffix} isInView={isInView} />
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
