import { useEffect, useCallback } from "react";
import confetti from "canvas-confetti";

interface ConfettiCelebrationProps {
  trigger?: boolean;
  onComplete?: () => void;
}

// Custom hook to trigger confetti
export const useConfetti = () => {
  const fireConfetti = useCallback((options?: {
    particleCount?: number;
    spread?: number;
    origin?: { x: number; y: number };
    colors?: string[];
  }) => {
    const defaults = {
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.6 },
      colors: ["#E50914", "#FF6B6B", "#FFE66D", "#4ECDC4", "#FFFFFF"],
      ...options,
    };

    confetti({
      ...defaults,
      disableForReducedMotion: true,
    });
  }, []);

  const fireFireworks = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#E50914", "#FF6B6B", "#FFE66D"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#E50914", "#FFFFFF", "#4ECDC4"],
      });
    }, 250);
  }, []);

  const fireSideCannons = useCallback(() => {
    const end = Date.now() + 1000;
    const colors = ["#E50914", "#FF6B6B", "#FFE66D", "#FFFFFF"];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
        zIndex: 9999,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
        zIndex: 9999,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  const fireStars = useCallback(() => {
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ["#E50914", "#FFE66D", "#FFFFFF"],
      shapes: ["star"] as confetti.Shape[],
      zIndex: 9999,
    };

    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      origin: { x: 0.5, y: 0.5 },
    });

    confetti({
      ...defaults,
      particleCount: 25,
      scalar: 0.75,
      origin: { x: 0.5, y: 0.5 },
    });
  }, []);

  return { fireConfetti, fireFireworks, fireSideCannons, fireStars };
};

// Component that can be triggered externally
const ConfettiCelebration = ({ trigger, onComplete }: ConfettiCelebrationProps) => {
  const { fireFireworks } = useConfetti();

  useEffect(() => {
    if (trigger) {
      fireFireworks();
      onComplete?.();
    }
  }, [trigger, fireFireworks, onComplete]);

  return null;
};

export default ConfettiCelebration;
