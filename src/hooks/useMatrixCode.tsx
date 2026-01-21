import { useState, useEffect } from "react";

// Secret code: M-A-T-R-I-X
const MATRIX_CODE = ["m", "a", "t", "r", "i", "x"];

export const useMatrixCode = () => {
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [inputSequence, setInputSequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input field
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      
      setInputSequence((prev) => {
        const newSequence = [...prev, key].slice(-MATRIX_CODE.length);
        
        // Check if sequence matches
        if (
          newSequence.length === MATRIX_CODE.length &&
          newSequence.every((k, i) => k === MATRIX_CODE[i])
        ) {
          setIsMatrixActive(true);
        }
        
        return newSequence;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const deactivateMatrix = () => {
    setIsMatrixActive(false);
    setInputSequence([]);
  };

  return { isMatrixActive, deactivateMatrix };
};
