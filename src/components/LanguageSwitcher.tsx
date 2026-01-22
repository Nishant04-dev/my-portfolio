import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.div
      className="fixed top-24 right-4 z-[60] flex items-center gap-2 p-2 rounded-full backdrop-blur-sm"
      style={{ background: "hsl(var(--card) / 0.9)", border: "1px solid hsl(var(--border))" }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Globe className="w-4 h-4 text-primary" />
      </motion.div>
      <div className="flex rounded-full overflow-hidden">
        <motion.button
          onClick={() => setLanguage("en")}
          className={`px-3 py-1.5 text-xs font-medium transition-all ${
            language === "en"
              ? "bg-primary text-white"
              : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
          whileHover={{ scale: language === "en" ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          EN
        </motion.button>
        <motion.button
          onClick={() => setLanguage("hi")}
          className={`px-3 py-1.5 text-xs font-medium transition-all ${
            language === "hi"
              ? "bg-primary text-white"
              : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
          whileHover={{ scale: language === "hi" ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          हिं
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LanguageSwitcher;