import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const clients = [
  { name: "Aurix", logo: "A" },
  { name: "Vanguard", logo: "V" },
  { name: "Sonix", logo: "S" },
  { name: "Elite Furnish", logo: "EF" },
  { name: "Desi Tandoor", logo: "DT" },
  { name: "Punjabi Tadka", logo: "PT" },
  { name: "Dream Homes", logo: "DH" },
  { name: "Pro Bot", logo: "PB" },
];

const ClientLogosSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted By <span className="text-primary">Brands</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Proud to have worked with amazing clients and brands
          </p>
        </motion.div>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Scrolling Track */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-8 py-8"
            animate={{ x: [0, -1920] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...clients, ...clients, ...clients, ...clients].map((client, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-40 h-24 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl flex items-center justify-center gap-3 hover:border-primary/50 hover:bg-card transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-bold text-lg group-hover:scale-110 transition-transform">
                  {client.logo}
                </div>
                <span className="text-foreground/80 font-medium">{client.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogosSection;
