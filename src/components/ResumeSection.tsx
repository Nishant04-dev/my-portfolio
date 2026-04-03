import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Download, Eye, X, MapPin, Phone, Globe, Mail,
  Briefcase, GraduationCap, Code2, Trophy, Lightbulb,
} from "lucide-react";

// ─── Data from resume ────────────────────────────────────────────────────────

const summary =
  "Versatile and driven Full-Stack Developer, UI/UX Designer, and Entrepreneur with hands-on experience in building scalable web solutions, automation systems, and digital products. Founder of multiple ventures across development services and esports, with a strong focus on innovation, user experience, and business growth. Skilled in delivering end-to-end solutions from concept to deployment.";

const skills = {
  Technical: [
    "Frontend Development (HTML, CSS, JavaScript)",
    "Backend Development",
    "Full-Stack Web Development",
    "UI/UX Design",
    "Responsive Web Design",
  ],
  Specialized: [
    "Discord Bot Development",
    "Automation Systems",
    "SaaS Product Development",
    "API Integration",
  ],
  Soft: [
    "Leadership & Team Management",
    "Problem Solving",
    "Communication",
    "Business Strategy",
    "Client Handling",
  ],
};

const experience = [
  {
    role: "Founder & Developer",
    company: "Aurix Development",
    color: "#00ff88",
    points: [
      "Provide custom bot development and automation solutions",
      "Deliver 24/7 client support and tailored software services",
      "Built multiple bots for communities and businesses",
    ],
  },
  {
    role: "Founder",
    company: "Vanguard India Gaming",
    color: "#ff00ff",
    points: [
      "Established and managed an esports organization",
      "Organized tournaments and managed gaming communities",
      "Handled operations, branding, and partnerships",
    ],
  },
  {
    role: "Founder",
    company: "Sanvaad",
    color: "#00d4ff",
    points: [
      "Developed and managed a community-driven platform",
      "Focused on communication and engagement solutions",
    ],
  },
];

const projects = [
  "Custom Discord Bots for automation and moderation",
  "Web development projects for clients and businesses",
  "Esports tournament management systems",
  "Personal portfolio website — nishantdev.in",
];

const achievements = [
  "Built and managed multiple startups at a young age",
  "Successfully handled client-based development services",
  "Organized esports tournaments with prize pools (₹11,000+)",
];

const interests = [
  "Technology & Startups",
  "Gaming & Esports",
  "UI/UX Innovation",
  "Building Scalable Digital Products",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionHeading = ({ label, index }: { label: string; index: string }) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="font-mono text-xs text-primary/60">{index}</span>
    <h3 className="font-display text-sm tracking-widest text-primary uppercase">{label}</h3>
    <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #00ff8840, transparent)" }} />
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

const ResumeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showViewer, setShowViewer] = useState(false);

  return (
    <section id="resume" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">

        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="cyber-label">
            <span className="text-primary mr-1">08</span> Resume
          </span>
          <h2 className="font-display text-4xl md:text-5xl mt-3 text-foreground">Resume / CV</h2>
          <div className="cyber-divider mt-3 max-w-xs" />
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="flex flex-wrap gap-3 mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <a
            href="/my_Resume.pdf"
            download="Nishant_Chauhan_Resume.pdf"
            className="btn-cyber-solid inline-flex items-center gap-2 text-xs"
          >
            <Download className="w-4 h-4" strokeWidth={1.5} />
            Download PDF
          </a>
          <button
            onClick={() => setShowViewer(true)}
            className="btn-cyber inline-flex items-center gap-2 text-xs"
          >
            <Eye className="w-4 h-4" strokeWidth={1.5} />
            View PDF
          </button>
        </motion.div>

        {/* Resume card */}
        <motion.div
          className="cyber-card max-w-4xl mx-auto overflow-hidden"
          style={{ borderColor: "#00ff8830" }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Terminal header bar */}
          <div className="terminal-header">
            <span className="terminal-dot bg-[#ff3366]" />
            <span className="terminal-dot bg-[#ffcc00]" />
            <span className="terminal-dot bg-[#00ff88]" />
            <span className="font-mono text-xs text-muted-foreground ml-2">
              nishant_chauhan_resume.pdf
            </span>
          </div>

          <div className="p-6 md:p-10 space-y-8">

            {/* ── Name & contact ── */}
            <div className="text-center border-b border-border pb-8">
              <h1
                className="font-display text-4xl md:text-5xl text-foreground mb-1"
                style={{ textShadow: "0 0 20px rgba(0,255,136,0.2)" }}
              >
                NISHANT CHAUHAN
              </h1>
              <p className="font-mono text-xs text-primary tracking-[0.3em] mb-5 uppercase">
                Full-Stack Developer · UI/UX Designer · Entrepreneur
              </p>
              <div className="flex flex-wrap justify-center gap-4 font-mono text-xs text-muted-foreground">
                {[
                  { icon: MapPin, text: "Gurugram, India" },
                  { icon: Phone, text: "8810501509" },
                  { icon: Globe, text: "nishantdev.in", href: "https://nishantdev.in" },
                  { icon: Mail,  text: "info@nishantdev.in", href: "mailto:info@nishantdev.in" },
                ].map((item) => (
                  <span key={item.text} className="flex items-center gap-1.5">
                    <item.icon className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                    {item.href ? (
                      <a href={item.href} className="hover:text-primary transition-colors">{item.text}</a>
                    ) : (
                      item.text
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Summary ── */}
            <div>
              <SectionHeading label="Professional Summary" index="01" />
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                <span className="text-primary mr-2">{">"}</span>
                {summary}
              </p>
            </div>

            {/* ── Skills ── */}
            <div>
              <SectionHeading label="Skills" index="02" />
              <div className="grid md:grid-cols-3 gap-6">
                {Object.entries(skills).map(([category, list]) => (
                  <div key={category}>
                    <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">
                      {category} Skills
                    </p>
                    <ul className="space-y-1">
                      {list.map((s) => (
                        <li key={s} className="flex items-start gap-2 font-mono text-xs text-muted-foreground">
                          <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Experience ── */}
            <div>
              <SectionHeading label="Experience" index="03" />
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.company} className="cyber-card p-5" style={{ borderColor: `${exp.color}20` }}>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="font-display text-base tracking-wide text-foreground">{exp.role}</span>
                      <span
                        className="font-mono text-xs px-2 py-0.5 border"
                        style={{ color: exp.color, borderColor: `${exp.color}40`, background: `${exp.color}10` }}
                      >
                        {exp.company}
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {exp.points.map((p) => (
                        <li key={p} className="flex items-start gap-2 font-mono text-xs text-muted-foreground">
                          <span style={{ color: exp.color }} className="mt-0.5 flex-shrink-0">▸</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Projects ── */}
            <div>
              <SectionHeading label="Projects" index="04" />
              <div className="grid sm:grid-cols-2 gap-2">
                {projects.map((p) => (
                  <div key={p} className="flex items-start gap-2 font-mono text-xs text-muted-foreground">
                    <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                    {p}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Education ── */}
            <div>
              <SectionHeading label="Education" index="05" />
              <div className="cyber-card p-4 flex items-center gap-4" style={{ borderColor: "#00d4ff20" }}>
                <GraduationCap className="w-8 h-8 text-[#00d4ff] flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="font-display text-sm tracking-wide text-foreground">
                    B.Sc. Computer Science & Information Technology
                  </p>
                  <p className="font-mono text-xs text-muted-foreground mt-0.5">Currently Pursuing</p>
                </div>
              </div>
            </div>

            {/* ── Achievements ── */}
            <div>
              <SectionHeading label="Achievements" index="06" />
              <div className="space-y-2">
                {achievements.map((a) => (
                  <div key={a} className="flex items-start gap-2 font-mono text-xs text-muted-foreground">
                    <Trophy className="w-3.5 h-3.5 text-[#ffcc00] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    {a}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Interests ── */}
            <div>
              <SectionHeading label="Interests" index="07" />
              <div className="flex flex-wrap gap-2">
                {interests.map((i) => (
                  <span key={i} className="skill-badge text-xs">{i}</span>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      {/* PDF viewer modal */}
      {showViewer && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowViewer(false)}
        >
          <motion.div
            className="w-full max-w-4xl h-[88vh] cyber-card overflow-hidden relative"
            style={{ borderColor: "#00ff8840" }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="terminal-header">
              <span className="terminal-dot bg-[#ff3366]" />
              <span className="terminal-dot bg-[#ffcc00]" />
              <span className="terminal-dot bg-[#00ff88]" />
              <span className="font-mono text-xs text-muted-foreground ml-2">resume_viewer.exe</span>
              <button
                className="ml-auto w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setShowViewer(false)}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <object
              data="/my_Resume.pdf"
              type="application/pdf"
              className="w-full"
              style={{ height: "calc(100% - 36px)" }}
            >
              <div className="flex flex-col items-center justify-center h-full gap-4 p-8">
                <p className="font-mono text-sm text-muted-foreground text-center">
                  <span className="text-primary">{">"}</span> PDF viewer not supported in this browser.
                </p>
                <a
                  href="/my_Resume.pdf"
                  download="Nishant_Chauhan_Resume.pdf"
                  className="btn-cyber-solid inline-flex items-center gap-2 text-xs"
                >
                  <Download className="w-4 h-4" strokeWidth={1.5} />
                  Download Instead
                </a>
              </div>
            </object>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default ResumeSection;
