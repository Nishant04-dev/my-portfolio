import { motion, useInView } from "framer-motion";
import { useRef, useState, FormEvent } from "react";
import { Mail, MapPin, Globe, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useConfetti } from "@/components/ConfettiCelebration";

const MAX_MESSAGE = 500;

const ContactSection = () => {
  const ref          = useRef(null);
  const isInView     = useInView(ref, { once: true, margin: "-100px" });
  const [result, setResult]             = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageLen, setMessageLen]     = useState(0);
  const { t }        = useLanguage();
  const { fireFireworks, fireSideCannons } = useConfetti();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult("sending");
    const fd = new FormData(e.currentTarget);
    fd.append("access_key", "1c271a21-c384-4a90-93b1-12698b4bfd6d");
    try {
      const res  = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        setResult("success");
        (e.target as HTMLFormElement).reset();
        fireSideCannons();
        setTimeout(() => fireFireworks(), 500);
      } else { setResult("error"); }
    } catch { setResult("error"); }
    finally { setIsSubmitting(false); }
  };

  const contactInfo = [
    { icon: MapPin, label: "Location", value: "Gurugram, Haryana, India", href: null,                          color: "#ff00ff" },
    { icon: Mail,   label: "Email",    value: "info@nishantdev.in",        href: "mailto:info@nishantdev.in",  color: "#00ff88" },
    { icon: Globe,  label: "Website",  value: "nishantdev.in",             href: "https://nishantdev.in/",     color: "#00d4ff" },
  ];

  return (
    <section id="contact" className="py-24 relative" ref={ref}>
      {/* Ambient glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #00ff88 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="cyber-label">
            <span className="text-primary mr-1">09</span> Contact
          </span>
          <h2 className="font-display text-4xl md:text-5xl mt-3 text-foreground">
            {t("contact.title")}
          </h2>
          <div className="cyber-divider mt-3 max-w-xs" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="font-mono text-sm text-muted-foreground mb-8 leading-relaxed">
              <span className="text-primary">{">"}</span>{" "}
              Have a project in mind or want to collaborate? Feel free to reach out. I'm always open to discussing new opportunities.
            </p>

            <div className="space-y-3">
              {contactInfo.map((item) => (
                <motion.div
                  key={item.label}
                  className="cyber-card flex items-center gap-4 p-4 group"
                  style={{ borderColor: `${item.color}20` }}
                  whileHover={{ boxShadow: `0 0 10px ${item.color}, 0 0 20px ${item.color}60`, borderColor: item.color, x: 6 }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center border flex-shrink-0 cyber-chamfer-sm"
                    style={{ borderColor: `${item.color}40`, background: `${item.color}10` }}
                  >
                    <item.icon className="w-4 h-4" style={{ color: item.color }} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="font-mono text-sm text-foreground hover:text-primary transition-colors duration-150"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-mono text-sm text-foreground">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form — terminal card */}
          <motion.div
            className="cyber-card-terminal overflow-hidden relative"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Subtle animated background grid */}
            <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
            <div className="terminal-header">
              <span className="terminal-dot bg-[#ff3366]" />
              <span className="terminal-dot bg-[#ffcc00]" />
              <span className="terminal-dot bg-[#00ff88]" />
              <span className="font-mono text-xs text-muted-foreground ml-2">send_message.sh</span>
            </div>

            <form onSubmit={onSubmit} className="p-6 space-y-5">
              {[
                { id: "name",    label: t("contact.name"),    type: "text",  placeholder: "John Doe" },
                { id: "email",   label: t("contact.email"),   type: "email", placeholder: "john@example.com" },
                { id: "subject", label: "Subject",            type: "text",  placeholder: "Project Inquiry" },
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block font-mono text-xs text-muted-foreground uppercase tracking-wider mb-1.5">
                    <span className="text-primary mr-1">{">"}</span>{field.label}
                  </label>
                  <div className="cyber-input-wrapper">
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      required
                      className="cyber-input"
                      placeholder={field.placeholder}
                    />
                  </div>
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block font-mono text-xs text-muted-foreground uppercase tracking-wider mb-1.5">
                  <span className="text-primary mr-1">{">"}</span>{t("contact.message")}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-primary font-mono text-sm font-bold pointer-events-none">{">"}</span>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    maxLength={MAX_MESSAGE}
                    className="cyber-input resize-none pt-3"
                    placeholder="Tell me about your project..."
                    onChange={(e) => setMessageLen(e.target.value.length)}
                  />
                  <span className="absolute bottom-2 right-3 font-mono text-[10px] text-muted-foreground pointer-events-none">
                    {messageLen}/{MAX_MESSAGE}
                  </span>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="btn-cyber-solid w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-card/30 border-t-card rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Transmitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" strokeWidth={1.5} />
                    {t("contact.send")}
                  </>
                )}
              </motion.button>

              {result === "success" && (
                <motion.div
                  className="flex items-center gap-2 font-mono text-xs text-primary justify-center"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle className="w-4 h-4" strokeWidth={1.5} />
                  MESSAGE TRANSMITTED SUCCESSFULLY
                </motion.div>
              )}
              {result === "error" && (
                <motion.div
                  className="flex items-center gap-2 font-mono text-xs text-[#ff3366] justify-center"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="w-4 h-4" strokeWidth={1.5} />
                  TRANSMISSION FAILED — RETRY
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
