import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Download, FileText, Eye, X } from "lucide-react";

const ResumeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showPdfViewer, setShowPdfViewer] = useState(false);

  return (
    <section id="resume" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.h2 
          className="row-title !px-0 text-3xl md:text-4xl mb-8"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          RESUME / CV
        </motion.h2>

        <motion.div 
          className="max-w-2xl mx-auto p-8 rounded-2xl text-center"
          style={{ background: "var(--gradient-card)", border: "1px solid hsl(var(--border))" }}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
          >
            <FileText className="w-16 h-16 mx-auto mb-4 text-primary" />
          </motion.div>

          <h3 className="font-display text-2xl md:text-3xl mb-2">Nishant Chauhan</h3>
          <p className="text-muted-foreground mb-6">
            Entrepreneur • Developer • Esports Founder
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/Nishant_Chauhan_Resume.pdf"
              download="Nishant_Chauhan_Resume.pdf"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </a>
            <button 
              onClick={() => setShowPdfViewer(true)}
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              <Eye className="w-5 h-5" />
              View Resume
            </button>
          </div>
        </motion.div>
      </div>

      {/* PDF Viewer Modal */}
      {showPdfViewer && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowPdfViewer(false)}
        >
          <motion.div 
            className="w-full max-w-4xl h-[85vh] rounded-2xl overflow-hidden relative"
            style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
              onClick={() => setShowPdfViewer(false)}
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* PDF Embed with fallback */}
            <object
              data="/Nishant_Chauhan_Resume.pdf"
              type="application/pdf"
              className="w-full h-full"
            >
              <div className="flex flex-col items-center justify-center h-full gap-4 p-8">
                <p className="text-muted-foreground text-center">
                  Unable to display PDF. The file may not exist or your browser doesn't support inline PDF viewing.
                </p>
                <a 
                  href="/Nishant_Chauhan_Resume.pdf"
                  download="Nishant_Chauhan_Resume.pdf"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Instead
                </a>
              </div>
            </object>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default ResumeSection;
