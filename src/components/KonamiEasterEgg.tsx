import { motion, AnimatePresence } from "framer-motion";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { Gamepad2, X } from "lucide-react";

const KonamiEasterEgg = () => {
  const { isActivated, setIsActivated } = useKonamiCode(() => {
    console.log("🎮 Konami Code Activated!");
  });

  return (
    <AnimatePresence>
      {isActivated && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm cyber-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Confetti particles */}
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5"
              style={{
                background: ["#00ff88", "#ff00ff", "#00d4ff", "#ffcc00"][i % 4],
                left: `${Math.random() * 100}%`,
                boxShadow: `0 0 4px ${["#00ff88", "#ff00ff", "#00d4ff", "#ffcc00"][i % 4]}`,
              }}
              initial={{ y: -20, opacity: 1 }}
              animate={{ y: window.innerHeight + 20, rotate: Math.random() * 720, opacity: 0 }}
              transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 0.5, ease: "linear" }}
            />
          ))}

          <motion.div
            className="relative cyber-card p-10 max-w-md mx-4 text-center"
            style={{ borderColor: "#00ff88", boxShadow: "0 0 20px #00ff88, 0 0 40px #00ff8840" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <button
              onClick={() => setIsActivated(false)}
              className="absolute top-4 right-4 w-7 h-7 border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
            >
              <Gamepad2
                className="w-16 h-16 mx-auto mb-5 text-primary"
                style={{ filter: "drop-shadow(0 0 10px #00ff88)" }}
                strokeWidth={1.5}
              />
            </motion.div>

            <h2 className="font-display text-3xl mb-3 text-primary" style={{ textShadow: "0 0 20px #00ff88" }}>
              KONAMI CODE
            </h2>
            <p className="font-mono text-sm text-muted-foreground mb-5">
              <span className="text-primary">{">"}</span> Achievement unlocked. You are a true gamer.
            </p>

            <div className="font-mono text-xs text-muted-foreground border border-border p-3 mb-6">
              ↑ ↑ ↓ ↓ ← → ← → B A
            </div>

            <button
              onClick={() => setIsActivated(false)}
              className="btn-cyber w-full"
            >
              Continue Exploring
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KonamiEasterEgg;
