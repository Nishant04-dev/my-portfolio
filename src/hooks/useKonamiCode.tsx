import { useState, useEffect, useCallback } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

export const useKonamiCode = (callback: () => void) => {
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [isActivated, setIsActivated] = useState(false);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const key = event.code;
    
    setInputSequence((prev) => {
      const newSequence = [...prev, key].slice(-KONAMI_CODE.length);
      
      if (newSequence.join(",") === KONAMI_CODE.join(",")) {
        setIsActivated(true);
        callback();
        return [];
      }
      
      return newSequence;
    });
  }, [callback]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return { isActivated, setIsActivated };
};
