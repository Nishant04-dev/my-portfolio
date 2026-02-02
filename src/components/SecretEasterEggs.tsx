import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSecretCodes } from "@/hooks/useSecretCodes";
import { Zap, Sparkles, Ghost, Heart, PartyPopper } from "lucide-react";
import { useConfetti } from "./ConfettiCelebration";

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

const SecretEasterEggs = () => {
  const { showGodMode, showDisco, showNinja, showRainbow, activatedCodes, currentInput } = useSecretCodes();
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const { fireFireworks, fireStars } = useConfetti();
  const discoIntervalRef = useRef<number | null>(null);

  // Show notification when a code is activated
  useEffect(() => {
    if (activatedCodes.length > 0) {
      const lastCode = activatedCodes[activatedCodes.length - 1];
      const codeNames: Record<string, string> = {
        GODMODE: "⚡ GOD MODE ACTIVATED!",
        DISCO: "🪩 DISCO PARTY!",
        NINJA: "🥷 NINJA MODE!",
        RAINBOW: "🌈 RAINBOW MODE!",
        LOVE: "💕 LOVE MODE!",
      };
      
      setNotification(codeNames[lastCode] || `${lastCode} ACTIVATED!`);
      
      if (lastCode === "GODMODE") fireFireworks();
      if (lastCode === "LOVE") {
        fireStars();
        // Spawn hearts
        const newHearts: FloatingHeart[] = [];
        for (let i = 0; i < 30; i++) {
          newHearts.push({
            id: Date.now() + i,
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            size: Math.random() * 30 + 20,
            duration: Math.random() * 3 + 4,
          });
        }
        setHearts(newHearts);
        setTimeout(() => setHearts([]), 7000);
      }
      
      setTimeout(() => setNotification(null), 3000);
    }
  }, [activatedCodes, fireFireworks, fireStars]);

  // Disco effect
  useEffect(() => {
    if (showDisco) {
      discoIntervalRef.current = window.setInterval(() => {
        document.body.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
      }, 200);
    } else {
      if (discoIntervalRef.current) {
        clearInterval(discoIntervalRef.current);
        discoIntervalRef.current = null;
      }
      document.body.style.filter = "";
    }

    return () => {
      if (discoIntervalRef.current) {
        clearInterval(discoIntervalRef.current);
      }
      document.body.style.filter = "";
    };
  }, [showDisco]);

  return (
    <>
      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] px-6 py-4 rounded-2xl backdrop-blur-md border border-primary/50"
            style={{ 
              background: "linear-gradient(135deg, hsl(var(--card)), hsl(var(--primary) / 0.2))",
              boxShadow: "0 0 40px hsl(var(--primary) / 0.4)"
            }}
          >
            <motion.div 
              className="flex items-center gap-3"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <PartyPopper className="w-6 h-6 text-primary" />
              <span className="font-display text-xl text-foreground">{notification}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* God Mode Effect */}
      <AnimatePresence>
        {showGodMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-[9990]"
          >
            {/* Lightning border effect */}
            <motion.div
              className="absolute inset-0 border-4 border-yellow-400"
              animate={{
                boxShadow: [
                  "inset 0 0 50px rgba(250, 204, 21, 0.5), 0 0 50px rgba(250, 204, 21, 0.5)",
                  "inset 0 0 100px rgba(250, 204, 21, 0.8), 0 0 100px rgba(250, 204, 21, 0.8)",
                  "inset 0 0 50px rgba(250, 204, 21, 0.5), 0 0 50px rgba(250, 204, 21, 0.5)",
                ],
              }}
              transition={{ duration: 0.3, repeat: Infinity }}
            />
            {/* Floating lightning icons */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-400"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: Math.random() * window.innerHeight,
                  opacity: 0 
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5],
                  rotate: [0, 360],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.2 
                }}
              >
                <Zap className="w-12 h-12" fill="currentColor" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ninja Mode Effect */}
      <AnimatePresence>
        {showNinja && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-[9990]"
          >
            {/* Smoke effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-transparent"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Floating ghosts */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-muted-foreground/50"
                initial={{ 
                  x: -100, 
                  y: 100 + i * 100,
                }}
                animate={{ 
                  x: window.innerWidth + 100,
                  opacity: [0, 1, 1, 0],
                }}
                transition={{ 
                  duration: 3, 
                  delay: i * 0.5,
                  ease: "linear"
                }}
              >
                <Ghost className="w-16 h-16" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rainbow Mode Effect */}
      <AnimatePresence>
        {showRainbow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-[9990]"
            style={{
              background: "linear-gradient(45deg, rgba(255,0,0,0.1), rgba(255,127,0,0.1), rgba(255,255,0,0.1), rgba(0,255,0,0.1), rgba(0,0,255,0.1), rgba(139,0,255,0.1))",
              backgroundSize: "400% 400%",
            }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              style={{
                background: "inherit",
                backgroundSize: "inherit",
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            {/* Sparkles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  color: `hsl(${Math.random() * 360}, 100%, 60%)`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <Sparkles className="w-8 h-8" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Hearts (Love Mode) */}
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="fixed pointer-events-none z-[9990] text-red-500"
            initial={{ x: heart.x, y: heart.y, opacity: 1, scale: 0 }}
            animate={{ 
              y: -100, 
              opacity: [0, 1, 1, 0],
              scale: 1,
              x: heart.x + (Math.random() - 0.5) * 200,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: heart.duration, ease: "easeOut" }}
          >
            <Heart 
              className="fill-current" 
              style={{ width: heart.size, height: heart.size }} 
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Current input indicator (subtle) */}
      {currentInput.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          className="fixed bottom-4 left-4 text-xs font-mono text-muted-foreground z-[9999]"
        >
          {currentInput}
        </motion.div>
      )}
    </>
  );
};

export default SecretEasterEggs;
