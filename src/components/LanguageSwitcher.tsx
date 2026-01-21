import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.div
      className="fixed top-24 right-4 z-40 flex items-center gap-2 p-2 rounded-full"
      style={{ background: "var(--gradient-card)", border: "1px solid hsl(var(--border))" }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      <Globe className="w-4 h-4 text-muted-foreground" />
      <div className="flex rounded-full overflow-hidden">
        <button
          onClick={() => setLanguage("en")}
          className={`px-3 py-1 text-xs font-medium transition-all ${
            language === "en"
              ? "bg-primary text-white"
              : "bg-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage("hi")}
          className={`px-3 py-1 text-xs font-medium transition-all ${
            language === "hi"
              ? "bg-primary text-white"
              : "bg-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          हिं
        </button>
      </div>
    </motion.div>
  );
};

export default LanguageSwitcher;
