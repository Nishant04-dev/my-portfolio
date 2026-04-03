import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Bot, Trophy, Gamepad2, Globe } from "lucide-react";

const achievements = [
  { icon: Globe,    value: 150000, suffix: "+",  label: "Users Reached",          color: "#00d4ff", isNumeric: true },
  { icon: Bot,      value: 20,     suffix: "+",  label: "Bot Clients",             color: "#ff00ff", isNumeric: true },
  { icon: Users,    value: 10000,  suffix: "+",  label: "Community Members",       color: "#00ff88", isNumeric: true },
  { icon: Trophy,   value: "Multi",suffix: "ple",label: "BGMI Tournaments",        color: "#ffcc00", isNumeric: false },
  { icon: Gamepad2, value: "Hosted",suffix: "",  label: "Offline Esports Events",  color: "#ff3366", isNumeric: false },
];

const fmt = (n: number) => n >= 1000 ? n.toLocaleString("en-IN") : String(n);

const AnimCounter = ({ target, suffix, isInView }: { target: number; suffix: string; isInView: boolean }) => {
  const [c, setC] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const steps = 60, inc = target / steps;
    let cur = 0;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= target) { setC(target); clearInterval(t); }
      else setC(Math.floor(cur));
    }, 2000 / steps);
    return () => clearInterval(t);
  }, [isInView, target]);
  return <>{fmt(c)}{suffix}</>;
};

const AchievementsSection = () => {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="cyber-label">
            <span className="text-primary mr-1">05</span> Achievements
          </span>
          <h2 className="font-display text-4xl md:text-5xl mt-3 text-foreground">Achievements</h2>
          <div className="cyber-divider mt-3 max-w-xs" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {achievements.map((a, i) => (
            <motion.div
              key={a.label}
              className="cyber-card p-6 text-center"
              style={{ borderColor: `${a.color}20` }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ boxShadow: `0 0 10px ${a.color}, 0 0 20px ${a.color}60`, borderColor: a.color }}
            >
              <a.icon
                className="w-8 h-8 mx-auto mb-3"
                style={{ color: a.color, filter: `drop-shadow(0 0 6px ${a.color})` }}
                strokeWidth={1.5}
              />
              <div
                className="font-display text-2xl md:text-3xl mb-1"
                style={{ color: a.color, textShadow: `0 0 10px ${a.color}60` }}
              >
                {a.isNumeric
                  ? <AnimCounter target={a.value as number} suffix={a.suffix} isInView={isInView} />
                  : <>{a.value}{a.suffix}</>
                }
              </div>
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider leading-tight">{a.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
