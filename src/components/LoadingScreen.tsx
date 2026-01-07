import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(357 83% 47% / 0.15) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Logo Animation */}
      <motion.div
        className="relative z-10 mb-8"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="relative"
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-2xl"
               style={{ boxShadow: "0 0 60px hsl(357 83% 47% / 0.4)" }}>
            <span className="font-display text-5xl text-white">N</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Name Animation */}
      <motion.div
        className="relative z-10 overflow-hidden mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <motion.h1
          className="font-display text-4xl md:text-5xl tracking-wider"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <span className="gradient-text-red text-glow">NISHANT CHAUHAN</span>
        </motion.h1>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        className="relative z-10 w-64 h-1 bg-muted rounded-full overflow-hidden"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--gradient-red)" }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>

      {/* Loading Text */}
      <motion.p
        className="relative z-10 mt-4 text-muted-foreground text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        Loading Experience...
      </motion.p>

      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-primary"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
