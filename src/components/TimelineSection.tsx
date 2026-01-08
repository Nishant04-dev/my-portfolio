import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Rocket, Trophy, Users, Code, Gamepad2, Bot } from "lucide-react";

const milestones = [
  {
    year: "2024",
    month: "January",
    title: "Vanguard India Founded",
    description:
      "Started my journey as an entrepreneur by founding Vanguard India, a competitive esports organization focused on BGMI tournaments.",
    icon: Gamepad2,
    color: "from-purple-500 to-pink-500",
    achievements: ["Organization Launch", "First Tournament"],
  },
  {
    year: "2024",
    month: "March",
    title: "First Offline LAN Event",
    description:
      "Successfully organized and hosted our first offline LAN esports event, bringing together gamers from across the region.",
    icon: Trophy,
    color: "from-yellow-500 to-orange-500",
    achievements: ["LAN Event", "100+ Participants"],
  },
  {
    year: "2024",
    month: "June",
    title: "10,000 Community Members",
    description:
      "Vanguard India community grew to over 10,000 members, establishing a strong presence in the Indian esports scene.",
    icon: Users,
    color: "from-green-500 to-emerald-500",
    achievements: ["10K+ Members", "Sponsorships"],
  },
  {
    year: "2024",
    month: "September",
    title: "Web Development Journey",
    description:
      "Expanded skills into web development, creating professional websites for businesses and personal brands.",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    achievements: ["First Client", "Portfolio Launch"],
  },
  {
    year: "2025",
    month: "January",
    title: "Aurix Development Launch",
    description:
      "Founded Aurix Development, offering intelligent Discord bot solutions with AI-enhanced features for premium community management.",
    icon: Bot,
    color: "from-primary to-red-700",
    achievements: ["20+ Bot Clients", "Premium Features"],
  },
  {
    year: "2025",
    month: "Present",
    title: "Scaling New Heights",
    description:
      "Continuing to grow both ventures while exploring robotics, AI/ML, and full-stack development opportunities.",
    icon: Rocket,
    color: "from-indigo-500 to-purple-600",
    achievements: ["1.5L+ Users Reached", "Multiple Ventures"],
  },
];

const TimelineSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="journey"
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-primary">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From a passionate gamer to a multi-venture entrepreneur
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex items-center mb-12 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-primary shadow-lg shadow-primary/50 z-10" />

                {/* Content Card */}
                <div
                  className={`ml-12 md:ml-0 md:w-[calc(50%-40px)] ${
                    isLeft ? "md:pr-8" : "md:pl-8"
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${milestone.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-primary font-semibold">
                          {milestone.month} {milestone.year}
                        </span>
                        <h3 className="text-xl font-bold">{milestone.title}</h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {milestone.description}
                    </p>

                    {/* Achievement Tags */}
                    <div className="flex flex-wrap gap-2">
                      {milestone.achievements.map((achievement, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                        >
                          {achievement}
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
