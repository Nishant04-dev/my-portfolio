import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Eye, TrendingUp } from "lucide-react";

const LiveVisitorCounter = () => {
  const [visitors, setVisitors] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    // Simulate initial visitor count (would be real with backend)
    const baseVisitors = Math.floor(Math.random() * 5) + 3;
    setVisitors(baseVisitors);
    
    // Show the counter after a delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Simulate visitor fluctuation
    const fluctuationInterval = setInterval(() => {
      setVisitors((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newValue = Math.max(1, Math.min(15, prev + change));
        
        if (newValue !== prev) {
          setShowPulse(true);
          setTimeout(() => setShowPulse(false), 500);
        }
        
        return newValue;
      });
    }, 8000 + Math.random() * 7000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(fluctuationInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, scale: 0.9 }}
          className="fixed top-24 left-4 z-50"
        >
          <motion.div
            className="relative flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border border-border/50"
            style={{ 
              background: "hsl(var(--card) / 0.9)",
            }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Pulsing indicator */}
            <motion.div
              className="relative flex items-center justify-center"
              animate={showPulse ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute w-3 h-3 rounded-full bg-green-500"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="w-2 h-2 rounded-full bg-green-500 relative z-10" />
            </motion.div>

            {/* Icon */}
            <Eye className="w-4 h-4 text-muted-foreground" />

            {/* Counter */}
            <div className="flex items-center gap-1">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={visitors}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  className="font-mono font-semibold text-foreground"
                >
                  {visitors}
                </motion.span>
              </AnimatePresence>
              <span className="text-xs text-muted-foreground hidden sm:inline">
                viewing now
              </span>
            </div>

            {/* Hover tooltip */}
            <motion.div
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap opacity-0 pointer-events-none"
              style={{ 
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))"
              }}
              initial={false}
              whileHover={{ opacity: 1 }}
            >
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-muted-foreground">Live visitor count</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LiveVisitorCounter;
