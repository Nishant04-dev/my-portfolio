import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Zap, Crown, Rocket, Bot, Globe, Code, Headphones } from "lucide-react";

const packages = [
  {
    id: "starter",
    name: "Starter",
    icon: Zap,
    price: "₹4,999",
    period: "/project",
    description: "Perfect for small projects and startups",
    color: "from-blue-500 to-cyan-500",
    popular: false,
    features: [
      "Basic Discord Bot Setup",
      "Up to 5 custom commands",
      "Standard moderation tools",
      "1 week support",
      "Basic documentation",
    ],
    cta: "Get Started",
  },
  {
    id: "professional",
    name: "Professional",
    icon: Crown,
    price: "₹14,999",
    period: "/project",
    description: "Ideal for growing communities & businesses",
    color: "from-primary to-red-700",
    popular: true,
    features: [
      "Advanced Discord Bot",
      "Unlimited custom commands",
      "AI-enhanced features",
      "Custom web dashboard",
      "Role & verification systems",
      "1 month support",
      "Priority response",
    ],
    cta: "Most Popular",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Rocket,
    price: "Custom",
    period: "pricing",
    description: "For large-scale operations & enterprises",
    color: "from-purple-500 to-pink-500",
    popular: false,
    features: [
      "Full-stack development",
      "Custom integrations",
      "White-label solutions",
      "Dedicated support team",
      "SLA guarantee",
      "Ongoing maintenance",
      "Priority feature requests",
    ],
    cta: "Contact Me",
  },
];

const services = [
  {
    icon: Bot,
    title: "Discord Bots",
    description: "Custom bots with moderation, automation, AI features, and more.",
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Modern, responsive websites and web applications.",
  },
  {
    icon: Code,
    title: "Automation",
    description: "Streamline workflows with custom automation solutions.",
  },
  {
    icon: Headphones,
    title: "Esports Management",
    description: "Tournament organization, streaming, and community management.",
  },
];

const WorkWithMeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            WORK WITH <span className="gradient-text-red text-glow">ME</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From Discord bots to full-stack web applications, I deliver premium solutions tailored to your needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="p-6 rounded-xl text-center card-glow"
              style={{ background: "var(--gradient-card)", border: "1px solid hsl(var(--border))" }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <service.icon className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
              <p className="text-xs text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              className={`relative p-8 rounded-2xl ${pkg.popular ? "ring-2 ring-primary" : ""}`}
              style={{ background: "var(--gradient-card)", border: "1px solid hsl(var(--border))" }}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1 rounded-full text-xs font-semibold text-white"
                       style={{ background: "var(--gradient-red)" }}>
                    MOST POPULAR
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-6">
                <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${pkg.color} flex items-center justify-center`}>
                  <pkg.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display text-2xl mb-1">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground">{pkg.description}</p>
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <span className="font-display text-4xl">{pkg.price}</span>
                <span className="text-muted-foreground text-sm">{pkg.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={scrollToContact}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                  pkg.popular
                    ? "btn-primary"
                    : "btn-secondary"
                }`}
              >
                {pkg.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Custom Project CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-muted-foreground mb-4">
            Have a unique project in mind? Let's discuss your requirements.
          </p>
          <button onClick={scrollToContact} className="btn-primary inline-flex items-center gap-2">
            <Rocket className="w-5 h-5" />
            Start a Custom Project
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkWithMeSection;
