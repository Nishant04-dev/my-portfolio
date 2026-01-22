import { motion, useInView } from "framer-motion";
import { useRef, useState, FormEvent } from "react";
import { Mail, Phone, MapPin, Globe, Send, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending...");

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "1c271a21-c384-4a90-93b1-12698b4bfd6d");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("success");
        (event.target as HTMLFormElement).reset();
      } else {
        setResult("error");
      }
    } catch {
      setResult("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: "Location",
      value: "Gurugram, Haryana, India",
      href: null,
    },
    {
      icon: Mail,
      label: t("contact.email"),
      value: "info@nishantchauhan.site",
      href: "mailto:info@nishantchauhan.site",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8810501509",
      href: "tel:+918810501509",
    },
    {
      icon: Globe,
      label: "Website",
      value: "nishantchauhan.site",
      href: "https://www.nishantchauhan.site/",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring" as const, stiffness: 100 }
    },
  };

  return (
    <section id="contact" className="py-20 relative" ref={ref}>
      {/* Background decoration */}
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          <h2 className="row-title !px-0 !mb-0 text-3xl md:text-4xl">
            {t("contact.title").toUpperCase()}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.p 
              className="text-muted-foreground mb-8 text-lg"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              Have a project in mind or want to collaborate? Feel free to reach out. I'm always open to discussing new opportunities!
            </motion.p>

            <motion.div 
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-4 p-4 rounded-xl group"
                  style={{ background: "var(--gradient-card)", border: "1px solid hsl(var(--border))" }}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02, 
                    x: 10,
                    boxShadow: "0 0 30px hsl(357 83% 47% / 0.2)"
                  }}
                >
                  <motion.div 
                    className="p-3 rounded-lg bg-primary/10"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon className="w-5 h-5 text-primary" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a 
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-foreground font-medium hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-foreground font-medium">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="p-8 rounded-2xl relative overflow-hidden"
            style={{ background: "var(--gradient-card)", border: "1px solid hsl(var(--border))" }}
            initial={{ opacity: 0, y: 40, rotateY: -10 }}
            animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
            />
            
            <form onSubmit={onSubmit} className="space-y-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  {t("contact.name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="form-input"
                  placeholder="John Doe"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  {t("contact.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="form-input"
                  placeholder="john@example.com"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
              >
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="form-input"
                  placeholder="Project Inquiry"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  {t("contact.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="form-input resize-none"
                  placeholder="Tell me about your project..."
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px hsl(357 83% 47% / 0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div 
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t("contact.send")}
                  </>
                )}
              </motion.button>

              {/* Result Message */}
              {result === "success" && (
                <motion.div 
                  className="flex items-center gap-2 text-green-400 justify-center"
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Message sent successfully!</span>
                </motion.div>
              )}

              {result === "error" && (
                <motion.div 
                  className="flex items-center gap-2 text-red-400 justify-center"
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                >
                  <AlertCircle className="w-5 h-5" />
                  <span>Something went wrong. Please try again.</span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;