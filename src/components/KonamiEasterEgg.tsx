import { motion, AnimatePresence } from "framer-motion";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { Gamepad2, X, Sparkles } from "lucide-react";

const KonamiEasterEgg = () => {
  const { isActivated, setIsActivated } = useKonamiCode(() => {
    console.log("🎮 Konami Code Activated!");
  });

  return (
    <AnimatePresence>
      {isActivated && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Confetti effect */}
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: `hsl(${Math.random() * 360}, 80%, 60%)`,
                left: `${Math.random() * 100}%`,
              }}
              initial={{ y: -20, opacity: 1 }}
              animate={{
                y: window.innerHeight + 20,
                rotate: Math.random() * 720,
                opacity: 0,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: "linear",
              }}
            />
          ))}

          <motion.div
            className="relative bg-gradient-to-br from-primary/20 to-purple-600/20 border border-primary/50 rounded-3xl p-12 max-w-lg mx-4 text-center"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <button
              onClick={() => setIsActivated(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
            >
              <Gamepad2 className="w-20 h-20 mx-auto mb-6 text-primary" />
            </motion.div>

            <motion.h2
              className="font-display text-4xl mb-4 gradient-text"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              🎮 KONAMI CODE!
            </motion.h2>

            <p className="text-lg text-muted-foreground mb-6">
              You found the secret! You are a true gamer.
            </p>

            <div className="flex items-center justify-center gap-2 text-primary">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">Achievement Unlocked</span>
              <Sparkles className="w-5 h-5" />
            </div>

            <div className="mt-6 p-4 bg-black/30 rounded-xl">
              <p className="text-sm text-muted-foreground font-mono">
                ↑ ↑ ↓ ↓ ← → ← → B A
              </p>
            </div>

            <motion.button
              onClick={() => setIsActivated(false)}
              className="mt-6 btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue Exploring
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KonamiEasterEgg;
