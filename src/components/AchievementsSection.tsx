import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Bot, Trophy, Gamepad2, Globe } from "lucide-react";

interface Achievement {
  icon: typeof Globe;
  value: number | string;
  suffix: string;
  label: string;
  color: string;
  isNumeric: boolean;
}

const achievements: Achievement[] = [
  {
    icon: Globe,
    value: 150000,
    suffix: "+",
    label: "Users Reached",
    color: "text-blue-400",
    isNumeric: true,
  },
  {
    icon: Bot,
    value: 20,
    suffix: "+",
    label: "Bot Clients",
    color: "text-purple-400",
    isNumeric: true,
  },
  {
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "Community Members",
    color: "text-green-400",
    isNumeric: true,
  },
  {
    icon: Trophy,
    value: "Multiple",
    suffix: "",
    label: "BGMI Tournaments",
    color: "text-yellow-400",
    isNumeric: false,
  },
  {
    icon: Gamepad2,
    value: "Hosted",
    suffix: "",
    label: "Offline Esports Events",
    color: "text-primary",
    isNumeric: false,
  },
];

const formatNumber = (num: number): string => {
  if (num >= 100000) {
    return `${(num / 100000).toFixed(0)},${String(num % 100000).padStart(5, '0').slice(0, 2)},${String(num).slice(-3)}`;
  }
  if (num >= 1000) {
    return num.toLocaleString('en-IN');
  }
  return num.toString();
};

const AnimatedCounter = ({ 
  target, 
  suffix, 
  isInView 
}: { 
  target: number; 
  suffix: string; 
  isInView: boolean;
}) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
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
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [isInView, target]);
  
  return <>{formatNumber(count)}{suffix}</>;
};

const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.h2 
          className="row-title !px-0 text-3xl md:text-4xl mb-8"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          ACHIEVEMENTS
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              className="stat-card"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1, type: "spring" }}
              >
                <achievement.icon className={`w-10 h-10 mx-auto mb-3 ${achievement.color}`} />
              </motion.div>
              
              <motion.div 
                className="font-display text-3xl md:text-4xl mb-1"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                {achievement.isNumeric ? (
                  <AnimatedCounter 
                    target={achievement.value as number} 
                    suffix={achievement.suffix}
                    isInView={isInView}
                  />
                ) : (
                  <>{achievement.value}{achievement.suffix}</>
                )}
              </motion.div>
              
              <p className="text-sm text-muted-foreground">{achievement.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
