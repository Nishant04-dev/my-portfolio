import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Rocket, Trophy, Users, Code, Gamepad2, Bot } from "lucide-react";

const milestones = [
  {
    year: "2024", month: "JAN",
    title: "Vanguard India Founded",
    description: "Started my journey as an entrepreneur by founding Vanguard India, a competitive esports organization focused on BGMI tournaments.",
    icon: Gamepad2, color: "#ff00ff",
    tags: ["Organization Launch", "First Tournament"],
  },
  {
    year: "2024", month: "MAR",
    title: "First Offline LAN Event",
    description: "Successfully organized and hosted our first offline LAN esports event, bringing together gamers from across the region.",
    icon: Trophy, color: "#ffcc00",
    tags: ["LAN Event", "100+ Participants"],
  },
  {
    year: "2024", month: "JUN",
    title: "10,000 Community Members",
    description: "Vanguard India community grew to over 10,000 members, establishing a strong presence in the Indian esports scene.",
    icon: Users, color: "#00ff88",
    tags: ["10K+ Members", "Sponsorships"],
  },
  {
    year: "2024", month: "SEP",
    title: "Web Development Journey",
    description: "Expanded skills into web development, creating professional websites for businesses and personal brands.",
    icon: Code, color: "#00d4ff",
    tags: ["First Client", "Portfolio Launch"],
  },
  {
    year: "2025", month: "JAN",
    title: "Aurix Development Launch",
    description: "Founded Aurix Development, offering intelligent Discord bot solutions with AI-enhanced features for premium community management.",
    icon: Bot, color: "#00ff88",
    tags: ["20+ Bot Clients", "Premium Features"],
  },
  {
    year: "2025", month: "NOW",
    title: "Scaling New Heights",
    description: "Continuing to grow both ventures while exploring robotics, AI/ML, and full-stack development opportunities.",
    icon: Rocket, color: "#ff3366",
    tags: ["1.5L+ Users Reached", "Multiple Ventures"],
  },
];

const TimelineSection = () => {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} id="journey" className="py-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #00ff88 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="cyber-label">
            <span className="text-primary mr-1">06</span> Journey
          </span>
          <h2 className="font-display text-4xl md:text-5xl mt-3 text-foreground">My Journey</h2>
          <div className="cyber-divider mt-3 max-w-xs" />
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(180deg, #00ff88, #00ff8840, transparent)", boxShadow: "0 0 6px #00ff88" }}
          />

          {milestones.map((m, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                className={`relative flex items-start mb-10 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-4 md:left-1/2 w-3 h-3 -translate-x-1/2 mt-5 border-2 border-primary bg-background"
                  style={{ boxShadow: `0 0 8px ${m.color}, 0 0 16px ${m.color}60`, borderColor: m.color }}
                />

                {/* Card */}
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-32px)] ${isLeft ? "md:pr-8" : "md:pl-8"}`}>
                  <motion.div
                    className="cyber-card p-5 group"
                    style={{ borderColor: `${m.color}20` }}
                    whileHover={{ boxShadow: `0 0 10px ${m.color}, 0 0 20px ${m.color}60`, borderColor: m.color }}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 flex items-center justify-center border cyber-chamfer-sm flex-shrink-0"
                        style={{ borderColor: `${m.color}60`, background: `${m.color}10` }}
                      >
                        <m.icon
                          className="w-5 h-5"
                          style={{ color: m.color, filter: `drop-shadow(0 0 4px ${m.color})` }}
                          strokeWidth={1.5}
                        />
                      </div>
                      <div>
                        <span className="font-mono text-xs tracking-widest" style={{ color: m.color }}>
                          {m.month} {m.year}
                        </span>
                        <h3 className="font-display text-base tracking-wide text-foreground">{m.title}</h3>
                      </div>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-3">{m.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {m.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] px-2 py-0.5 border uppercase tracking-wider"
                          style={{ color: m.color, borderColor: `${m.color}40`, background: `${m.color}10` }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
