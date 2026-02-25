import { useState } from "react";
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
import ContactSection from "@/components/ContactSection";
import StatsCounter from "@/components/StatsCounter";
import BookingSection from "@/components/BookingSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import Footer from "@/components/Footer";
import ClientLogosSection from "@/components/ClientLogosSection";
import FAQSection from "@/components/FAQSection";
import TimelineSection from "@/components/TimelineSection";
import CertificatesSection from "@/components/CertificatesSection";
import BlogSection from "@/components/BlogSection";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import ThemeSoundToggle from "@/components/ThemeSoundToggle";
import KonamiEasterEgg from "@/components/KonamiEasterEgg";
import KeyboardHints from "@/components/KeyboardHints";
import TerminalEasterEgg from "@/components/TerminalEasterEgg";
import GitHubActivity from "@/components/GitHubActivity";
import LiveChatWidget from "@/components/LiveChatWidget";
import NewsletterSection from "@/components/NewsletterSection";
import MiniGame from "@/components/MiniGame";
import MatrixRain from "@/components/MatrixRain";
import ThreeDViewer from "@/components/ThreeDViewer";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import CursorTrail from "@/components/CursorTrail";
import SecretEasterEggs from "@/components/SecretEasterEggs";
import ScrollReveal from "@/components/ScrollReveal";
import { ThemeProvider } from "@/hooks/useTheme";
import { SoundProvider } from "@/hooks/useSoundEffects";
import { LanguageProvider } from "@/hooks/useLanguage";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { useMatrixCode } from "@/hooks/useMatrixCode";

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
            <CustomCursor />
            
            {/* Cursor Trail Effect */}
            <CursorTrail />
            
            {/* Scroll Progress */}
            <ScrollProgress />
            
            {/* Theme & Sound Toggle */}
            <ThemeSoundToggle />
            
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* Konami Code Easter Egg */}
            <KonamiEasterEgg />
            
            {/* Terminal Easter Egg */}
            <TerminalEasterEgg />
            
            {/* Matrix Rain Easter Egg */}
            <MatrixRain isActive={isMatrixActive} onDeactivate={deactivateMatrix} />
            
            {/* Secret Code Easter Eggs */}
            <SecretEasterEggs />
            
            {/* Mini Game */}
            <MiniGame />
            
            {/* Live Chat Widget */}
            <LiveChatWidget />
            
            {/* Keyboard Hints Modal */}
            <KeyboardHints 
              show={showHints} 
              onClose={() => setShowHints(false)} 
              sections={sections}
            />
            
            {/* Grain Overlay */}
            <div className="grain-overlay" />
            
            {/* Navigation */}
            <Navbar />

            {/* Main Content */}
            <main>
              <HeroSection />
              <ScrollReveal direction="up"><AboutSection /></ScrollReveal>
              <ScrollReveal direction="scale" delay={0.1}><StatsCounter /></ScrollReveal>
              <ScrollReveal direction="fade"><ClientLogosSection /></ScrollReveal>
              <ScrollReveal direction="left" delay={0.1}><SkillsSection /></ScrollReveal>
              <ScrollReveal direction="right"><ProjectsSection /></ScrollReveal>
              <ScrollReveal direction="scale"><BeforeAfterSection /></ScrollReveal>
              <ScrollReveal direction="up" delay={0.1}><GitHubActivity /></ScrollReveal>
              <ScrollReveal direction="left"><TimelineSection /></ScrollReveal>
              <ScrollReveal direction="scale" delay={0.1}><AchievementsSection /></ScrollReveal>
              <ScrollReveal direction="right"><CertificatesSection /></ScrollReveal>
              <ScrollReveal direction="up"><ThreeDViewer /></ScrollReveal>
              <ScrollReveal direction="fade" delay={0.1}><BlogSection /></ScrollReveal>
              <ScrollReveal direction="left"><WorkWithMeSection /></ScrollReveal>
              <ScrollReveal direction="scale"><BookingSection /></ScrollReveal>
              <ScrollReveal direction="up"><FAQSection /></ScrollReveal>
              <ScrollReveal direction="right" delay={0.1}><TestimonialsSection /></ScrollReveal>
              <ScrollReveal direction="scale"><NewsletterSection /></ScrollReveal>
              <ScrollReveal direction="up"><ResumeSection /></ScrollReveal>
              <ScrollReveal direction="up" delay={0.1}><ContactSection /></ScrollReveal>
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
