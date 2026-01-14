import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";

// Import certificate images
import frontendCert from "@/assets/certificates/frontend-development.jpg";
import pythonBeginnersCert from "@/assets/certificates/python-beginners.jpg";
import aiToolsCert from "@/assets/certificates/ai-tools-workshop.jpg";
import pythonDataCert from "@/assets/certificates/python-data-analysis.jpg";
import generativeAiCert from "@/assets/certificates/generative-ai.jpg";
import uiuxCert from "@/assets/certificates/uiux-design.jpg";
import advancedPythonCert from "@/assets/certificates/advanced-python.jpg";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  pdfPath: string;
  category: string;
  code?: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Introduction to Front End Development",
    issuer: "Meta (Coursera)",
    date: "January 2026",
    image: frontendCert,
    pdfPath: "/certificates/frontend-development.pdf",
    category: "Web Development",
    code: "9706225"
  },
  {
    id: 2,
    title: "Python for Beginners",
    issuer: "Simplilearn",
    date: "January 2026",
    image: pythonBeginnersCert,
    pdfPath: "/certificates/python-beginners.pdf",
    category: "Programming",
    code: "9708056"
  },
  {
    id: 3,
    title: "Python for Data Analysis",
    issuer: "Simplilearn",
    date: "January 2026",
    image: pythonDataCert,
    pdfPath: "/certificates/python-data-analysis.pdf",
    category: "Data Science",
    code: "9708305"
  },
  {
    id: 4,
    title: "Website UI/UX Designing using ChatGPT",
    issuer: "Simplilearn SkillUp",
    date: "January 2026",
    image: uiuxCert,
    pdfPath: "/certificates/uiux-design.pdf",
    category: "Design",
    code: "9706265"
  },
  {
    id: 5,
    title: "Generative AI Mastermind",
    issuer: "Outskill",
    date: "2025",
    image: generativeAiCert,
    pdfPath: "/certificates/generative-ai.pdf",
    category: "AI & ML"
  },
  {
    id: 6,
    title: "AI Tools & ChatGPT Workshop",
    issuer: "be10x",
    date: "2025",
    image: aiToolsCert,
    pdfPath: "/certificates/ai-tools-workshop.pdf",
    category: "AI & ML"
  },
  {
    id: 7,
    title: "Advanced Python",
    issuer: "Simplilearn",
    date: "January 2026",
    image: advancedPythonCert,
    pdfPath: "/certificates/advanced-python.pdf",
    category: "Programming",
    code: "9714755"
  }
];

const categories = ["All", "Web Development", "Programming", "Data Science", "Design", "AI & ML"];

const CertificatesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredCertificates = selectedCategory === "All" 
    ? certificates 
    : certificates.filter(cert => cert.category === selectedCategory);

  const navigateCertificate = (direction: 'prev' | 'next') => {
    if (!selectedCert) return;
    const currentIndex = filteredCertificates.findIndex(c => c.id === selectedCert.id);
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? filteredCertificates.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === filteredCertificates.length - 1 ? 0 : currentIndex + 1;
    }
    setSelectedCert(filteredCertificates[newIndex]);
  };

  return (
    <section id="certificates" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Certifications</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">My </span>
            <span className="text-primary">Certificates</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Professional certifications and achievements that validate my expertise in various technologies
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card border border-border/50"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Certificates Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCertificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(cert.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedCert(cert)}
                className="group relative cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-500">
                  {/* Certificate Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    
                    {/* Category Badge */}
                    <motion.div
                      initial={false}
                      animate={{ 
                        y: hoveredId === cert.id ? 0 : -10,
                        opacity: hoveredId === cert.id ? 1 : 0.8
                      }}
                      className="absolute top-4 left-4"
                    >
                      <span className="px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium backdrop-blur-sm">
                        {cert.category}
                      </span>
                    </motion.div>

                    {/* View Button */}
                    <motion.div
                      initial={false}
                      animate={{ 
                        opacity: hoveredId === cert.id ? 1 : 0,
                        scale: hoveredId === cert.id ? 1 : 0.8
                      }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium flex items-center gap-2 shadow-xl shadow-primary/30">
                        <ExternalLink className="w-4 h-4" />
                        View Certificate
                      </div>
                    </motion.div>
                  </div>

                  {/* Certificate Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {cert.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{cert.issuer}</span>
                      <span className="text-primary/80">{cert.date}</span>
                    </div>
                    {cert.code && (
                      <p className="mt-2 text-xs text-muted-foreground/60">
                        Certificate ID: {cert.code}
                      </p>
                    )}
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 -z-10" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Total Certificates", value: certificates.length },
            { label: "Categories", value: categories.length - 1 },
            { label: "Platforms", value: 5 },
            { label: "Learning Hours", value: "100+" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors duration-300"
            >
              <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-3xl bg-card border border-border shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={() => navigateCertificate('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => navigateCertificate('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Certificate Image */}
              <div className="relative">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>

              {/* Certificate Details */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                      {selectedCert.category}
                    </span>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {selectedCert.title}
                    </h3>
                    <p className="text-muted-foreground mb-1">
                      Issued by <span className="text-foreground">{selectedCert.issuer}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedCert.date}
                      {selectedCert.code && ` • ID: ${selectedCert.code}`}
                    </p>
                  </div>
                  <a
                    href={selectedCert.pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View PDF
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificatesSection;
