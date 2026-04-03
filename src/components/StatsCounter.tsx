import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Code, Users, Briefcase, Clock, Star } from "lucide-react";

const stats = [
  { icon: Briefcase, label: "Projects",    target: 50,  suffix: "+",  color: "#00ff88" },
  { icon: Users,     label: "Clients",     target: 20,  suffix: "+",  color: "#00d4ff" },
  { icon: Clock,     label: "Yrs Exp",     target: 3,   suffix: "+",  color: "#ff00ff" },
  { icon: Code,      label: "Lines (K)",   target: 100, suffix: "K+", color: "#ffcc00" },
  { icon: Star,      label: "5★ Reviews",  target: 15,  suffix: "+",  color: "#ff3366" },
];

const Counter = ({ target, suffix, isInView }: { target: number; suffix: string; isInView: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const steps = 60;
    const inc   = target / steps;
    let cur     = 0;
    const t     = setInterval(() => {
      cur += inc;
      if (cur >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(cur));
    }, 2000 / steps);
    return () => clearInterval(t);
  }, [isInView, target]);
  return <>{count}{suffix}</>;
};

const StatsCounter = () => {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 relative overflow-hidden" ref={ref}>
      <div className="cyber-divider mb-0" />
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="cyber-card p-5 text-center group"
              style={{ borderColor: `${s.color}20` }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ boxShadow: `0 0 10px ${s.color}, 0 0 20px ${s.color}60`, borderColor: s.color }}
            >
              <s.icon
                className="w-6 h-6 mx-auto mb-3 transition-all duration-150"
                style={{ color: s.color, filter: `drop-shadow(0 0 4px ${s.color})` }}
                strokeWidth={1.5}
              />
              <div
                className="font-display text-3xl md:text-4xl mb-1"
                style={{ color: s.color, textShadow: `0 0 10px ${s.color}60` }}
              >
                <Counter target={s.target} suffix={s.suffix} isInView={isInView} />
              </div>
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="cyber-divider mt-0" />
    </section>
  );
};

export default StatsCounter;
