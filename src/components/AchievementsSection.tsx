import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Bot, Trophy, Gamepad2, Globe } from "lucide-react";

const achievements = [
  {
    icon: Globe,
    value: "1,50,000+",
    label: "Users Reached",
    color: "text-blue-400",
  },
  {
    icon: Bot,
    value: "20+",
    label: "Bot Clients",
    color: "text-purple-400",
  },
  {
    icon: Users,
    value: "10,000+",
    label: "Community Members",
    color: "text-green-400",
  },
  {
    icon: Trophy,
    value: "Multiple",
    label: "BGMI Tournaments",
    color: "text-yellow-400",
  },
  {
    icon: Gamepad2,
    value: "Hosted",
    label: "Offline Esports Events",
    color: "text-primary",
  },
];

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
                {achievement.value}
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
