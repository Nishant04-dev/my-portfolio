import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

interface SoundContextType {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  playHover: () => void;
  playClick: () => void;
  playWhoosh: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

// Create audio context and oscillator-based sounds
const createTone = (frequency: number, duration: number, type: OscillatorType = "sine") => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = type;

  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
};

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("soundEnabled");
      return saved === "true";
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("soundEnabled", isSoundEnabled.toString());
  }, [isSoundEnabled]);

  const toggleSound = useCallback(() => {
    setIsSoundEnabled((prev) => !prev);
  }, []);

  const playHover = useCallback(() => {
    if (!isSoundEnabled) return;
    try {
      createTone(800, 0.05, "sine");
    } catch (e) {
      // Audio not supported
    }
  }, [isSoundEnabled]);

  const playClick = useCallback(() => {
    if (!isSoundEnabled) return;
    try {
      createTone(600, 0.1, "square");
    } catch (e) {
      // Audio not supported
    }
  }, [isSoundEnabled]);

  const playWhoosh = useCallback(() => {
    if (!isSoundEnabled) return;
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2);

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
      // Audio not supported
    }
  }, [isSoundEnabled]);

  return (
    <SoundContext.Provider value={{ isSoundEnabled, toggleSound, playHover, playClick, playWhoosh }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundEffects = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error("useSoundEffects must be used within a SoundProvider");
  }
  return context;
};
