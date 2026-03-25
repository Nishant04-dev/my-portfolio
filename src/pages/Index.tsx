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

// Lazy loaded heavy components
const StatsCounter = lazy(() => import("@/components/StatsCounter"));
const BookingSection = lazy(() => import("@/components/BookingSection"));
const BeforeAfterSection = lazy(() => import("@/components/BeforeAfterSection"));
const BlogSection = lazy(() => import("@/components/BlogSection"));
const GitHubActivity = lazy(() => import("@/components/GitHubActivity"));
const NewsletterSection = lazy(() => import("@/components/NewsletterSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const ThreeDViewer = lazy(() => import("@/components/ThreeDViewer"));
const MiniGame = lazy(() => import("@/components/MiniGame"));
const MatrixRain = lazy(() => import("@/components/MatrixRain"));
const TerminalEasterEgg = lazy(() => import("@/components/TerminalEasterEgg"));
const KonamiEasterEgg = lazy(() => import("@/components/KonamiEasterEgg"));
const SecretEasterEggs = lazy(() => import("@/components/SecretEasterEggs"));
const LiveChatWidget = lazy(() => import("@/components/LiveChatWidget"));
const CustomCursor = lazy(() => import("@/components/CustomCursor"));
const CursorTrail = lazy(() => import("@/components/CursorTrail"));
const ThemeSoundToggle = lazy(() => import("@/components/ThemeSoundToggle"));
const KeyboardHints = lazy(() => import("@/components/KeyboardHints"));
const LanguageSwitcher = lazy(() => import("@/components/LanguageSwitcher"));

const IndexContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { showHints, setShowHints, sections } = useKeyboardNavigation();
  const { isMatrixActive, deactivateMatrix } = useMatrixCode();

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
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Custom Cursor */}
            <Suspense fallback={null}>
              <CustomCursor />
              <CursorTrail />
            </Suspense>
            
            {/* Scroll Progress */}
            <ScrollProgress />
            
            {/* Theme & Sound Toggle */}
            <Suspense fallback={null}>
              <ThemeSoundToggle />
              <LanguageSwitcher />
            </Suspense>
            
            {/* Easter Eggs & Widgets */}
            <Suspense fallback={null}>
              <KonamiEasterEgg />
              <TerminalEasterEgg />
              <MatrixRain isActive={isMatrixActive} onDeactivate={deactivateMatrix} />
              <SecretEasterEggs />
              <MiniGame />
              <LiveChatWidget />
            </Suspense>
            
            <Suspense fallback={null}>
              <KeyboardHints 
                show={showHints} 
                onClose={() => setShowHints(false)} 
                sections={sections}
              />
            </Suspense>
            
            {/* Grain Overlay */}
            <div className="grain-overlay" />
            
            {/* Navigation */}
            <Navbar />

            {/* Main Content */}
            <main>
              <HeroSection />
              <ScrollReveal direction="up"><AboutSection /></ScrollReveal>
              
              <Suspense fallback={<div className="h-20" />}>
                <ScrollReveal direction="scale" delay={0.1}><StatsCounter /></ScrollReveal>
              </Suspense>
              
              <ScrollReveal direction="fade"><ClientLogosSection /></ScrollReveal>
              <ScrollReveal direction="left" delay={0.1}><SkillsSection /></ScrollReveal>
              <ScrollReveal direction="right"><ProjectsSection /></ScrollReveal>
              
              <Suspense fallback={<div className="h-96" />}>
                <ScrollReveal direction="scale"><BeforeAfterSection /></ScrollReveal>
                <ScrollReveal direction="up" delay={0.1}><GitHubActivity /></ScrollReveal>
              </Suspense>
              
              <ScrollReveal direction="left"><TimelineSection /></ScrollReveal>
              <ScrollReveal direction="scale" delay={0.1}><AchievementsSection /></ScrollReveal>
              
              <Suspense fallback={<div className="h-96" />}>
                <ScrollReveal direction="up"><ThreeDViewer /></ScrollReveal>
                <ScrollReveal direction="fade" delay={0.1}><BlogSection /></ScrollReveal>
              </Suspense>
              
              <ScrollReveal direction="left"><WorkWithMeSection /></ScrollReveal>
              
              <Suspense fallback={<div className="h-96" />}>
                <ScrollReveal direction="scale"><BookingSection /></ScrollReveal>
              </Suspense>
              
              <ScrollReveal direction="up"><FAQSection /></ScrollReveal>
              <ScrollReveal direction="right" delay={0.1}><TestimonialsSection /></ScrollReveal>
              
              <Suspense fallback={<div className="h-40" />}>
                <ScrollReveal direction="scale"><NewsletterSection /></ScrollReveal>
              </Suspense>
              
              <ScrollReveal direction="up"><ResumeSection /></ScrollReveal>
              
              <Suspense fallback={<div className="h-96" />}>
                <ScrollReveal direction="up" delay={0.1}><ContactSection /></ScrollReveal>
              </Suspense>
            </main>

            {/* Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Index = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <SoundProvider>
          <IndexContent />
        </SoundProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default Index;
