import { useState, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import AchievementsSection from "@/components/AchievementsSection";
import WorkWithMeSection from "@/components/WorkWithMeSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ResumeSection from "@/components/ResumeSection";
import Footer from "@/components/Footer";
import ClientLogosSection from "@/components/ClientLogosSection";
import FAQSection from "@/components/FAQSection";
import TimelineSection from "@/components/TimelineSection";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollReveal from "@/components/ScrollReveal";
import { ThemeProvider } from "@/hooks/useTheme";
import { SoundProvider } from "@/hooks/useSoundEffects";
import { LanguageProvider } from "@/hooks/useLanguage";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { useMatrixCode } from "@/hooks/useMatrixCode";

// Lazy-loaded sections (code-split for faster initial load)
const StatsCounter      = lazy(() => import("@/components/StatsCounter"));
const BookingSection    = lazy(() => import("@/components/BookingSection"));
const BeforeAfterSection = lazy(() => import("@/components/BeforeAfterSection"));
const BlogSection       = lazy(() => import("@/components/BlogSection"));
const GitHubActivity    = lazy(() => import("@/components/GitHubActivity"));
const NewsletterSection = lazy(() => import("@/components/NewsletterSection"));
const ContactSection    = lazy(() => import("@/components/ContactSection"));

// Easter eggs — lowest priority, lazy
const MiniGame          = lazy(() => import("@/components/MiniGame"));
const MatrixRain        = lazy(() => import("@/components/MatrixRain"));
const TerminalEasterEgg = lazy(() => import("@/components/TerminalEasterEgg"));
const KonamiEasterEgg   = lazy(() => import("@/components/KonamiEasterEgg"));
const SecretEasterEggs  = lazy(() => import("@/components/SecretEasterEggs"));

// UI utilities
const ThemeSoundToggle  = lazy(() => import("@/components/ThemeSoundToggle"));
const KeyboardHints     = lazy(() => import("@/components/KeyboardHints"));
const LanguageSwitcher  = lazy(() => import("@/components/LanguageSwitcher"));
const CustomCursor      = lazy(() => import("@/components/CustomCursor"));

// Removed: ThreeDViewer (heavy canvas + RAF), CustomCursor, CursorTrail, LiveChatWidget

const IndexContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { showHints, setShowHints, sections } = useKeyboardNavigation();
  const { isMatrixActive, deactivateMatrix }  = useMatrixCode();

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            className="min-h-screen bg-background text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Scroll progress bar */}
            <ScrollProgress />

            {/* Custom cursor — desktop only */}
            <Suspense fallback={null}>
              <CustomCursor />
            </Suspense>

            {/* UI toggles */}
            <Suspense fallback={null}>
              <ThemeSoundToggle />
              <LanguageSwitcher />
            </Suspense>

            {/* Easter eggs */}
            <Suspense fallback={null}>
              <KonamiEasterEgg />
              <TerminalEasterEgg />
              <MatrixRain isActive={isMatrixActive} onDeactivate={deactivateMatrix} />
              <SecretEasterEggs />
              <MiniGame />
            </Suspense>

            <Suspense fallback={null}>
              <KeyboardHints
                show={showHints}
                onClose={() => setShowHints(false)}
                sections={sections}
              />
            </Suspense>

            {/* Navigation */}
            <Navbar />

            {/* Main content */}
            <main>
              <HeroSection />

              <ScrollReveal><AboutSection /></ScrollReveal>

              <Suspense fallback={<div className="h-20" />}>
                <ScrollReveal delay={0.05}><StatsCounter /></ScrollReveal>
              </Suspense>

              <ScrollReveal><ClientLogosSection /></ScrollReveal>
              <ScrollReveal><SkillsSection /></ScrollReveal>
              <ScrollReveal><ProjectsSection /></ScrollReveal>

              <Suspense fallback={<div className="h-64" />}>
                <ScrollReveal><BeforeAfterSection /></ScrollReveal>
                <ScrollReveal delay={0.05}><GitHubActivity /></ScrollReveal>
              </Suspense>

              <ScrollReveal><TimelineSection /></ScrollReveal>
              <ScrollReveal delay={0.05}><AchievementsSection /></ScrollReveal>

              <Suspense fallback={<div className="h-64" />}>
                <ScrollReveal><BlogSection /></ScrollReveal>
              </Suspense>

              <ScrollReveal><WorkWithMeSection /></ScrollReveal>

              <Suspense fallback={<div className="h-64" />}>
                <ScrollReveal><BookingSection /></ScrollReveal>
              </Suspense>

              <ScrollReveal><FAQSection /></ScrollReveal>
              <ScrollReveal delay={0.05}><TestimonialsSection /></ScrollReveal>

              <Suspense fallback={<div className="h-40" />}>
                <ScrollReveal><NewsletterSection /></ScrollReveal>
              </Suspense>

              <ScrollReveal><ResumeSection /></ScrollReveal>

              <Suspense fallback={<div className="h-64" />}>
                <ScrollReveal delay={0.05}><ContactSection /></ScrollReveal>
              </Suspense>
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Index = () => (
  <LanguageProvider>
    <ThemeProvider>
      <SoundProvider>
        <IndexContent />
      </SoundProvider>
    </ThemeProvider>
  </LanguageProvider>
);

export default Index;
