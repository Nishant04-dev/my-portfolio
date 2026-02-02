import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Sparkles, CheckCircle, Loader2 } from "lucide-react";
import { useConfetti } from "@/components/ConfettiCelebration";

const NewsletterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { fireStars, fireSideCannons } = useConfetti();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Store in localStorage as a simple solution
    const subscribers = JSON.parse(localStorage.getItem("newsletter_subscribers") || "[]");
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      localStorage.setItem("newsletter_subscribers", JSON.stringify(subscribers));
    }
    
    setStatus("success");
    setEmail("");
    
    // Fire confetti celebration!
    fireStars();
    setTimeout(() => fireSideCannons(), 300);
    
    // Reset status after 3 seconds
    setTimeout(() => setStatus("idle"), 3000);
  };

  const benefits = [
    "Weekly tech insights & tutorials",
    "Exclusive project sneak peeks",
    "Early access to new services",
    "No spam, unsubscribe anytime",
  ];

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center"
            style={{ background: "var(--gradient-red)" }}
          >
            <Mail className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl mb-4">
            STAY <span className="gradient-text-red text-glow">UPDATED</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Get the latest updates on my projects, tech insights, and exclusive content delivered straight to your inbox.
          </p>

          {/* Benefits */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/50"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div 
              className="flex flex-col sm:flex-row gap-3 p-2 rounded-2xl"
              style={{ background: "var(--gradient-card)", border: "1px solid hsl(var(--border))" }}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "loading" || status === "success"}
                className="flex-1 px-4 py-3 rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="btn-primary px-8 py-3 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
                {status === "success" && <CheckCircle className="w-4 h-4" />}
                {status === "idle" && <Mail className="w-4 h-4" />}
                {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : "Subscribe"}
              </button>
            </div>
          </motion.form>

          {/* Success Message */}
          <AnimatedMessage status={status} />
        </motion.div>
      </div>
    </section>
  );
};

const AnimatedMessage = ({ status }: { status: string }) => {
  if (status !== "success") return null;
  
  return (
    <motion.p
      className="mt-4 text-green-500 flex items-center justify-center gap-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <CheckCircle className="w-4 h-4" />
      Thanks for subscribing! Check your inbox for confirmation.
    </motion.p>
  );
};

export default NewsletterSection;
