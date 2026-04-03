import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

type Language = "en" | "hi";

interface Translations {
  [key: string]: { en: string; hi: string };
}

const translations: Translations = {
  // Navbar
  "nav.home":     { en: "Home",     hi: "होम" },
  "nav.about":    { en: "About",    hi: "परिचय" },
  "nav.skills":   { en: "Skills",   hi: "कौशल" },
  "nav.projects": { en: "Projects", hi: "प्रोजेक्ट्स" },
  "nav.services": { en: "Services", hi: "सेवाएं" },
  "nav.contact":  { en: "Contact",  hi: "संपर्क" },

  // Hero
  "hero.greeting":     { en: "Hi, I'm",                hi: "नमस्ते, मैं हूं" },
  "hero.title":        { en: "Entrepreneur & Developer", hi: "उद्यमी और डेवलपर" },
  "hero.cta.projects": { en: "View Projects",           hi: "प्रोजेक्ट्स देखें" },
  "hero.cta.contact":  { en: "Contact Me",              hi: "संपर्क करें" },

  // About
  "about.title": { en: "About Me", hi: "मेरे बारे में" },
  "about.description": {
    en: "I'm a passionate entrepreneur and developer from India, building innovative solutions in esports and technology.",
    hi: "मैं भारत का एक जुनूनी उद्यमी और डेवलपर हूं, ई-स्पोर्ट्स और तकनीक में नवीन समाधान बना रहा हूं।",
  },

  // Skills
  "skills.title": { en: "Skills & Expertise", hi: "कौशल और विशेषज्ञता" },

  // Projects
  "projects.title":   { en: "Featured Projects",   hi: "प्रमुख प्रोजेक्ट्स" },
  "projects.viewAll": { en: "View All Projects",    hi: "सभी प्रोजेक्ट्स देखें" },

  // Services
  "services.title":     { en: "Work With Me",      hi: "मेरे साथ काम करें" },
  "services.discord":   { en: "Discord Bot",       hi: "डिस्कॉर्ड बॉट" },
  "services.web":       { en: "Web Development",   hi: "वेब डेवलपमेंट" },
  "services.fullstack": { en: "Full-Stack",         hi: "फुल-स्टैक" },

  // Testimonials
  "testimonials.title": { en: "What Clients Say", hi: "क्लाइंट्स की राय" },

  // Contact
  "contact.title":   { en: "Get In Touch",   hi: "संपर्क करें" },
  "contact.name":    { en: "Name",           hi: "नाम" },
  "contact.email":   { en: "Email",          hi: "ईमेल" },
  "contact.message": { en: "Message",        hi: "संदेश" },
  "contact.send":    { en: "Send Message",   hi: "संदेश भेजें" },

  // Newsletter
  "newsletter.title":       { en: "Stay Updated",      hi: "अपडेट रहें" },
  "newsletter.placeholder": { en: "Enter your email",  hi: "अपना ईमेल दर्ज करें" },
  "newsletter.subscribe":   { en: "Subscribe",         hi: "सब्सक्राइब करें" },

  // Footer
  "footer.rights":   { en: "All rights reserved", hi: "सर्वाधिकार सुरक्षित" },
  "footer.madeWith": { en: "Made with",            hi: "बनाया गया" },

  // Common
  "common.loading":  { en: "Loading...", hi: "लोड हो रहा है..." },
  "common.readMore": { en: "Read More",  hi: "और पढ़ें" },
  "common.learnMore":{ en: "Learn More", hi: "और जानें" },
  "common.viewAll":  { en: "View All",   hi: "सभी देखें" },
  "common.close":    { en: "Close",      hi: "बंद करें" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Read from localStorage synchronously on init so first render is correct
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language");
      if (saved === "en" || saved === "hi") return saved;
    }
    return "en";
  });

  // Sync html lang attribute whenever language changes
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
  }, []);

  // t() depends on `language` — recreated whenever language changes
  const t = useCallback(
    (key: string): string => {
      const entry = translations[key];
      if (!entry) {
        if (process.env.NODE_ENV === "development") {
          console.warn(`[i18n] Missing translation key: "${key}"`);
        }
        return key;
      }
      return entry[language];
    },
    [language]   // ← this is the critical fix: t re-creates when language changes
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
