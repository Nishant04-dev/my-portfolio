import { motion } from "framer-motion";
import { Sun, Moon, Volume2, VolumeX } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useSoundEffects } from "@/hooks/useSoundEffects";

const ThemeSoundToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { isSoundEnabled, toggleSound, playClick } = useSoundEffects();

  const handleThemeToggle = () => {
    playClick();
    toggleTheme();
  };

  const handleSoundToggle = () => {
    toggleSound();
  };

  return (
    <div className="fixed bottom-8 left-8 flex flex-col gap-3 z-[100]">
      {/* Theme Toggle */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleThemeToggle}
        className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center shadow-lg hover:border-primary/50 transition-colors group"
        aria-label="Toggle theme"
      >
        <motion.div
          initial={false}
          animate={{ rotate: theme === "dark" ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          {theme === "dark" ? (
            <Moon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          ) : (
            <Sun className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          )}
        </motion.div>
      </motion.button>

      {/* Sound Toggle */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleSoundToggle}
        className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center shadow-lg hover:border-primary/50 transition-colors group"
        aria-label="Toggle sound"
      >
        {isSoundEnabled ? (
          <Volume2 className="w-5 h-5 text-primary" />
        ) : (
          <VolumeX className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        )}
      </motion.button>
    </div>
  );
};

export default ThemeSoundToggle;
