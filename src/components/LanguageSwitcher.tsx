import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.div
      className="fixed top-20 right-4 z-[60] flex items-center"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2 }}
    >
      <div
        className="flex border border-border overflow-hidden"
        style={{
          clipPath:
            "polygon(0 4px, 4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px))",
        }}
      >
        {(["en", "hi"] as const).map((lang) => {
          const active = language === lang;
          return (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className="px-3 py-1.5 font-mono text-xs uppercase tracking-widest transition-all duration-150"
              style={{
                background: active ? "var(--neon-green)" : "hsl(var(--card))",
                color:      active ? "hsl(var(--card))" : "hsl(var(--muted-foreground))",
                boxShadow:  active ? "0 0 8px #00ff88" : "none",
              }}
              aria-pressed={active}
              aria-label={lang === "en" ? "English" : "Hindi"}
            >
              {lang === "en" ? "EN" : "हिं"}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default LanguageSwitcher;
