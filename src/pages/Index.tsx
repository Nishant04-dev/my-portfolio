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
import { ThemeProvider } from "@/hooks/useTheme";
import { SoundProvider } from "@/hooks/useSoundEffects";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";

const IndexContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { showHints, setShowHints, sections } = useKeyboardNavigation();

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
            
            {/* Scroll Progress */}
            <ScrollProgress />
            
            {/* Theme & Sound Toggle */}
            <ThemeSoundToggle />
            
            {/* Konami Code Easter Egg */}
            <KonamiEasterEgg />
            
            {/* Terminal Easter Egg */}
            <TerminalEasterEgg />
            
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
              <AboutSection />
              <ClientLogosSection />
              <SkillsSection />
              <ProjectsSection />
              <TimelineSection />
              <AchievementsSection />
              <CertificatesSection />
              <BlogSection />
              <WorkWithMeSection />
              <FAQSection />
              <TestimonialsSection />
              <ResumeSection />
              <ContactSection />
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
    <ThemeProvider>
      <SoundProvider>
        <IndexContent />
      </SoundProvider>
    </ThemeProvider>
  );
};

export default Index;
