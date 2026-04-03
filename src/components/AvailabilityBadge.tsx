import { motion } from "framer-motion";

const AvailabilityBadge = () => (
  <motion.div
    className="inline-flex items-center gap-2 px-3 py-1.5 border border-primary/30 font-mono text-xs uppercase tracking-[0.2em] text-primary mb-6"
    style={{
      background: "rgba(0,255,136,0.05)",
      clipPath: "polygon(0 4px, 4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px))",
    }}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 1.2, duration: 0.4 }}
  >
    <span
      className="w-2 h-2 rounded-full bg-primary animate-pulse"
      style={{ boxShadow: "0 0 6px #00ff88" }}
    />
    Available for Freelance
  </motion.div>
);

export default AvailabilityBadge;
