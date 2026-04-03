import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

// Theme is forced dark in this design system — only sound toggle remains
const ThemeSoundToggle = () => {
  const { isSoundEnabled, toggleSound } = useSoundEffects();

  return (
    <div className="fixed bottom-8 left-8 flex flex-col gap-3 z-[60]">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
        whileHover={{ boxShadow: "0 0 10px #00ff88, 0 0 20px #00ff8860" }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleSound}
        className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all duration-150"
        style={{ clipPath: "polygon(0 6px, 6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px))" }}
        aria-label="Toggle sound"
      >
        {isSoundEnabled
          ? <Volume2 className="w-4 h-4 text-primary" strokeWidth={1.5} />
          : <VolumeX className="w-4 h-4" strokeWidth={1.5} />
        }
      </motion.button>
    </div>
  );
};

export default ThemeSoundToggle;
