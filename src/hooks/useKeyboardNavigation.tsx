import { useEffect, useState } from "react";

const sections = [
  { key: "1", id: "about", label: "About" },
  { key: "2", id: "skills", label: "Skills" },
  { key: "3", id: "projects", label: "Projects" },
  { key: "4", id: "achievements", label: "Achievements" },
  { key: "5", id: "contact", label: "Contact" },
];

export const useKeyboardNavigation = () => {
  const [showHints, setShowHints] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Show/hide keyboard hints with '?'
      if (event.key === "?") {
        setShowHints((prev) => !prev);
        return;
      }

      // Navigate to top with 'h' or Home
      if (event.key === "h" || event.key === "Home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      // Navigate to bottom with 'e' or End
      if (event.key === "e" || event.key === "End") {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        return;
      }

      // Number keys for section navigation
      const section = sections.find((s) => s.key === event.key);
      if (section) {
        const element = document.getElementById(section.id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return { showHints, setShowHints, sections };
};
