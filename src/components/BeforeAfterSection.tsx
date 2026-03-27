import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { ArrowLeftRight } from "lucide-react";

interface BeforeAfterItem {
  title: string;
  before: {
    label: string;
    description: string;
    color: string;
    issues: string[];
  };
  after: {
    label: string;
    description: string;
    color: string;
    improvements: string[];
  };
}

const comparisons: BeforeAfterItem[] = [
  {
    title: "Luveza — Startup Networking Platform",
    before: {
      label: "Before",
      description: "No dedicated space for founders to connect and collaborate",
      color: "from-gray-600 to-gray-800",
      issues: ["Scattered across LinkedIn", "No co-founder matching", "No community tools", "No SaaS structure"],
    },
    after: {
      label: "After",
      description: "Dedicated platform for startup founders to connect",
      color: "from-rose-500 to-pink-600",
      improvements: ["Founder matching", "Collaboration tools", "SaaS platform", "Growing community"],
    },
  },
  {
    title: "Vanguard India — Esports Brand",
    before: {
      label: "Before",
      description: "No online presence, Discord-only community",
      color: "from-gray-600 to-gray-800",
      issues: ["No website", "Limited reach", "Manual tournament management", "No branding"],
    },
    after: {
      label: "After",
      description: "Professional esports brand with 10K+ members",
      color: "from-red-600 to-orange-500",
      improvements: ["Professional website", "10,000+ members", "Automated tournaments", "Strong brand identity"],
    },
  },
  {
    title: "Lumiere AI — AI Platform",
    before: {
      label: "Before",
      description: "Manual workflows with no AI-powered automation",
      color: "from-gray-600 to-gray-800",
      issues: ["No code generation", "Manual research", "No image creation", "Slow workflows"],
    },
    after: {
      label: "After",
      description: "Advanced AI platform with full automation suite",
      color: "from-amber-400 to-orange-500",
      improvements: ["Code generation", "Deep research", "Image creation", "LLM-powered"],
    },
  },
];

const ComparisonCard = ({ item, index, isInView }: { item: BeforeAfterItem; index: number; isInView: boolean }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current || !isDragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  return (
    <motion.div
      className="rounded-2xl overflow-hidden"
      style={{ background: "var(--gradient-card)", border: "1px solid hsl(var(--border))" }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <div className="p-4 border-b border-border">
        <h3 className="font-display text-xl text-foreground">{item.title}</h3>
      </div>

      {/* Slider area */}
      <div
        ref={containerRef}
        className="relative h-64 select-none cursor-col-resize overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleTouchMove}
      >
        {/* Before side */}
        <div className={`absolute inset-0 bg-gradient-to-br ${item.before.color} flex items-center justify-center p-6`}>
          <div className="text-center text-white/80">
            <span className="text-xs uppercase tracking-widest font-semibold opacity-60 block mb-2">{item.before.label}</span>
            <p className="text-sm max-w-[200px]">{item.before.description}</p>
            <div className="mt-3 space-y-1">
              {item.before.issues.map((issue) => (
                <span key={issue} className="block text-xs opacity-60">✗ {issue}</span>
              ))}
            </div>
          </div>
        </div>

        {/* After side - clipped */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${item.after.color} flex items-center justify-center p-6`}
          style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
        >
          <div className="text-center text-white">
            <span className="text-xs uppercase tracking-widest font-semibold opacity-80 block mb-2">{item.after.label}</span>
            <p className="text-sm max-w-[200px]">{item.after.description}</p>
            <div className="mt-3 space-y-1">
              {item.after.improvements.map((imp) => (
                <span key={imp} className="block text-xs opacity-80">✓ {imp}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white/80 z-10"
          style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
            <ArrowLeftRight className="w-5 h-5 text-black" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BeforeAfterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            THE <span className="gradient-text-red text-glow">IMPACT</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Drag the slider to see the transformation. Before and after my involvement.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {comparisons.map((item, index) => (
            <ComparisonCard key={item.title} item={item} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
