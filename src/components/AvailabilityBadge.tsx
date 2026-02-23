import { motion } from "framer-motion";

const AvailabilityBadge = () => {
  return (
    <motion.div
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border mb-6"
      style={{ background: "var(--gradient-card)" }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
    >
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
      </span>
      <span className="text-sm font-medium text-foreground">
        Available for Freelance
      </span>
    </motion.div>
  );
};

export default AvailabilityBadge;
