import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Github, GitCommit, Star, GitFork, Code } from "lucide-react";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const GitHubActivity = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [contributions, setContributions] = useState<ContributionDay[]>([]);

  // Generate mock contribution data (52 weeks x 7 days)
  useEffect(() => {
    const days: ContributionDay[] = [];
    const today = new Date();
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Generate realistic contribution patterns
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const baseChance = isWeekend ? 0.3 : 0.7;
      const hasContribution = Math.random() < baseChance;
      
      let count = 0;
      let level = 0;
      
      if (hasContribution) {
        count = Math.floor(Math.random() * 12) + 1;
        if (count <= 2) level = 1;
        else if (count <= 5) level = 2;
        else if (count <= 8) level = 3;
        else level = 4;
      }
      
      days.push({
        date: date.toISOString().split('T')[0],
        count,
        level
      });
    }
    
    setContributions(days);
  }, []);

  const stats = [
    { icon: GitCommit, label: "Commits", value: "1,247" },
    { icon: Star, label: "Stars", value: "89" },
    { icon: GitFork, label: "Forks", value: "34" },
    { icon: Code, label: "Repos", value: "28" },
  ];

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return "bg-muted/30";
      case 1: return "bg-emerald-900/60";
      case 2: return "bg-emerald-700/70";
      case 3: return "bg-emerald-500/80";
      case 4: return "bg-emerald-400";
      default: return "bg-muted/30";
    }
  };

  // Group contributions by week
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  return (
    <section id="github" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Github className="w-10 h-10 text-foreground" />
            <h2 className="font-display text-4xl md:text-5xl">
              GITHUB <span className="gradient-text-red text-glow">ACTIVITY</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My coding journey visualized through contributions
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="p-6 rounded-xl text-center"
              style={{ background: "var(--gradient-card)", border: "1px solid hsl(var(--border))" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="font-display text-3xl">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contribution Graph */}
        <motion.div
          className="p-6 rounded-2xl overflow-hidden"
          style={{ background: "var(--gradient-card)", border: "1px solid hsl(var(--border))" }}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Contribution Graph</h3>
            <span className="text-sm text-muted-foreground">Last 12 months</span>
          </div>

          {/* Graph */}
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-1 min-w-max">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <motion.div
                      key={day.date}
                      className={`w-3 h-3 rounded-sm ${getLevelColor(day.level)} cursor-pointer`}
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ 
                        duration: 0.2, 
                        delay: 0.5 + (weekIndex * 7 + dayIndex) * 0.002 
                      }}
                      whileHover={{ scale: 1.5 }}
                      title={`${day.date}: ${day.count} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 mt-4 text-sm text-muted-foreground">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`}
              />
            ))}
            <span>More</span>
          </div>
        </motion.div>

        {/* View on GitHub Button */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a
            href="https://github.com/nishantcha"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Github className="w-5 h-5" />
            View GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubActivity;
