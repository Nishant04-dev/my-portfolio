import { useState, useEffect, useCallback } from "react";

interface SecretCode {
  code: string;
  name: string;
  activated: boolean;
}

export const useSecretCodes = () => {
  const [currentInput, setCurrentInput] = useState("");
  const [activatedCodes, setActivatedCodes] = useState<string[]>([]);
  const [showGodMode, setShowGodMode] = useState(false);
  const [showDisco, setShowDisco] = useState(false);
  const [showNinja, setShowNinja] = useState(false);
  const [showRainbow, setShowRainbow] = useState(false);

  const secretCodes: SecretCode[] = [
    { code: "GODMODE", name: "God Mode", activated: activatedCodes.includes("GODMODE") },
    { code: "DISCO", name: "Disco Party", activated: activatedCodes.includes("DISCO") },
    { code: "NINJA", name: "Ninja Mode", activated: activatedCodes.includes("NINJA") },
    { code: "RAINBOW", name: "Rainbow Mode", activated: activatedCodes.includes("RAINBOW") },
    { code: "LOVE", name: "Love Mode", activated: activatedCodes.includes("LOVE") },
  ];

  const activateCode = useCallback((code: string) => {
    if (activatedCodes.includes(code)) return;
    
    setActivatedCodes((prev) => [...prev, code]);

    switch (code) {
      case "GODMODE":
        setShowGodMode(true);
        setTimeout(() => setShowGodMode(false), 5000);
        break;
      case "DISCO":
        setShowDisco(true);
        setTimeout(() => setShowDisco(false), 8000);
        break;
      case "NINJA":
        setShowNinja(true);
        setTimeout(() => setShowNinja(false), 5000);
        break;
      case "RAINBOW":
        setShowRainbow(true);
        setTimeout(() => setShowRainbow(false), 10000);
        break;
      case "LOVE":
        // Hearts will be handled by the component
        break;
    }
  }, [activatedCodes]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input fields
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const key = e.key.toUpperCase();
      if (key.length === 1 && /[A-Z]/.test(key)) {
        const newInput = (currentInput + key).slice(-10);
        setCurrentInput(newInput);

        // Check for matches
        for (const secret of secretCodes) {
          if (newInput.endsWith(secret.code) && !activatedCodes.includes(secret.code)) {
            activateCode(secret.code);
            setCurrentInput("");
            break;
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentInput, activatedCodes, activateCode, secretCodes]);

  return {
    activatedCodes,
    secretCodes,
    showGodMode,
    showDisco,
    showNinja,
    showRainbow,
    currentInput,
  };
};
