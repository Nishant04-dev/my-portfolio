import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is your typical turnaround time for projects?",
    answer:
      "For Discord bots, typical delivery is 1-2 weeks depending on complexity. Web development projects usually take 2-4 weeks. Full-stack applications vary based on scope, but I always provide a detailed timeline during our initial discussion.",
  },
  {
    question: "Do you offer ongoing support after project completion?",
    answer:
      "Yes! All my packages include post-launch support. Discord bot packages come with 1 month of priority support, and web development projects include post-launch support for bug fixes and minor adjustments. Extended support packages are also available.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "I specialize in Python for Discord bots (discord.py), JavaScript/TypeScript for web development, React for frontend, Node.js for backend, and various databases including MongoDB and PostgreSQL. I also work with AI/ML APIs and cloud platforms.",
  },
  {
    question: "How do we communicate during the project?",
    answer:
      "I maintain clear communication through Discord, email, or WhatsApp based on your preference. You'll receive regular updates, and I'm always available for quick questions. For larger projects, we can set up weekly progress calls.",
  },
  {
    question: "Do you require upfront payment?",
    answer:
      "For most projects, I work with a 50% upfront payment to begin work, with the remaining 50% due upon completion. For larger enterprise projects, we can discuss milestone-based payment structures.",
  },
  {
    question: "Can you work with my existing codebase or systems?",
    answer:
      "Absolutely! I can integrate with your existing systems, extend current functionality, or build new features that work seamlessly with what you already have. I'll review your current setup and provide recommendations.",
  },
  {
    question: "What makes your Discord bots different?",
    answer:
      "My bots are built with scalability, security, and user experience in mind. They feature advanced moderation, AI capabilities, custom verification systems, and are optimized for performance. Plus, you get full documentation and the source code.",
  },
  {
    question: "Do you offer custom solutions outside listed services?",
    answer:
      "Yes! The listed packages are starting points. I'm always open to discussing custom requirements, unique integrations, or specialized features. Just reach out with your idea, and we'll figure out the best approach together.",
  },
];

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      id="faq"
      className="py-24 bg-gradient-to-b from-card/30 to-background relative"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Got questions? I've got answers. Here are some common queries about my services.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl px-6 overflow-hidden hover:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left text-lg font-medium py-5 hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
