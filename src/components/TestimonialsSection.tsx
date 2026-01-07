import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Discord Community Owner",
    content: "Aurix bot transformed our community management. The automation features saved us countless hours, and the AI-enhanced moderation is top-notch!",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Esports Team Manager",
    content: "Vanguard India's tournaments are incredibly well-organized. Nishant's leadership and attention to detail made our events a huge success.",
    rating: 5,
  },
  {
    name: "Amit Kumar",
    role: "Restaurant Owner - Desi Tandoor",
    content: "The website Nishant built for us increased our online orders by 40%. Professional work, delivered on time, and exceeded expectations!",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    role: "Tech Startup Founder",
    content: "Working with Nishant on our Discord integration was seamless. His technical skills combined with business acumen is rare to find.",
    rating: 5,
  },
  {
    name: "Sneha Gupta",
    role: "Gaming Community Lead",
    content: "The BGMI tournaments organized by Vanguard India brought together amazing players. The production quality was outstanding!",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-20 relative" ref={ref}>
      <motion.h2 
        className="row-title text-3xl md:text-4xl"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        WHAT CLIENTS SAY
      </motion.h2>

      {/* Horizontal Scroll Row */}
      <div className="scroll-row mt-4">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            className="flex-shrink-0 w-80 md:w-96 p-6 rounded-xl card-glow relative"
            style={{ background: "var(--gradient-card)", border: "1px solid hsl(var(--border))" }}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Quote Icon */}
            <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />

            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>

            {/* Content */}
            <p className="text-muted-foreground mb-6 leading-relaxed">
              "{testimonial.content}"
            </p>

            {/* Author */}
            <div>
              <p className="font-semibold text-foreground">{testimonial.name}</p>
              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
