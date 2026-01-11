import { motion, AnimatePresence } from "framer-motion";
import { X, Keyboard } from "lucide-react";

interface KeyboardHintsProps {
  show: boolean;
  onClose: () => void;
  sections: { key: string; id: string; label: string }[];
}

const KeyboardHints = ({ show, onClose, sections }: KeyboardHintsProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-card border border-border rounded-2xl p-8 max-w-md mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Keyboard className="w-6 h-6 text-primary" />
                <h3 className="font-display text-2xl">Keyboard Shortcuts</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="text-sm text-muted-foreground mb-4">
                Navigate quickly using your keyboard
              </div>

              {sections.map((section) => (
                <div
                  key={section.id}
                  className="flex items-center justify-between py-2 border-b border-border/50"
                >
                  <span className="text-foreground">{section.label}</span>
                  <kbd className="px-3 py-1.5 bg-secondary rounded-lg font-mono text-sm text-primary">
                    {section.key}
                  </kbd>
                </div>
              ))}

              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <span className="text-foreground">Go to top</span>
                <kbd className="px-3 py-1.5 bg-secondary rounded-lg font-mono text-sm text-primary">
                  H
                </kbd>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <span className="text-foreground">Go to bottom</span>
                <kbd className="px-3 py-1.5 bg-secondary rounded-lg font-mono text-sm text-primary">
                  E
                </kbd>
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="text-foreground">Toggle this menu</span>
                <kbd className="px-3 py-1.5 bg-secondary rounded-lg font-mono text-sm text-primary">
                  ?
                </kbd>
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary/10 rounded-xl border border-primary/20">
              <p className="text-sm text-center text-muted-foreground">
                <span className="text-primary font-semibold">Pro tip:</span> Try the Konami code for a surprise! 🎮
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KeyboardHints;
