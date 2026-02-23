import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Clock, Video, ArrowRight } from "lucide-react";

const timeSlots = [
  { day: "Mon - Fri", time: "10:00 AM - 6:00 PM IST" },
  { day: "Saturday", time: "11:00 AM - 3:00 PM IST" },
  { day: "Sunday", time: "By Appointment" },
];

const BookingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="booking" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            BOOK A <span className="gradient-text-red text-glow">CALL</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Let's discuss your project over a quick call. Pick a time that works for you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Left - Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-6 rounded-xl" style={{ background: "var(--gradient-card)", border: "1px solid hsl(var(--border))" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-red)" }}>
                  <Video className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Discovery Call</h3>
                  <p className="text-sm text-muted-foreground">30 min • Free</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                A quick introductory call to understand your requirements, timeline, and budget. No commitments.
              </p>
            </div>

            <div className="p-6 rounded-xl" style={{ background: "var(--gradient-card)", border: "1px solid hsl(var(--border))" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-secondary">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Availability</h3>
              </div>
              <div className="space-y-3">
                {timeSlots.map((slot) => (
                  <div key={slot.day} className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">{slot.day}</span>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {slot.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - CTA Card */}
          <motion.div
            className="p-8 rounded-2xl flex flex-col justify-center items-center text-center ring-2 ring-primary/20"
            style={{ background: "var(--gradient-card)", border: "1px solid hsl(var(--border))" }}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
              style={{ background: "var(--gradient-red)" }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Calendar className="w-9 h-9 text-white" />
            </motion.div>
            <h3 className="font-display text-2xl mb-2 text-foreground">Ready to Start?</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Send me your preferred date and time through the contact form, and I'll confirm within 24 hours.
            </p>
            <motion.button
              onClick={scrollToContact}
              className="btn-primary inline-flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule a Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <p className="text-xs text-muted-foreground mt-4">
              Response within 24 hours • No obligation
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
