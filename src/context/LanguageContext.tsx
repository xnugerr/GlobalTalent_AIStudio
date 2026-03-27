import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, Record<Language, string>> = {
  'nav.home': { id: 'Beranda', en: 'Home' },
  'nav.announcements': { id: 'Pengumuman', en: 'Announcements' },
  'nav.articles': { id: 'Artikel', en: 'Articles' },
  'nav.publications': { id: 'Publikasi', en: 'Publications' },
  'nav.media': { id: 'Media', en: 'Media' },
  'nav.register': { id: 'Pendaftaran', en: 'Registration' },
  'nav.login': { id: 'Masuk', en: 'Login' },
  'home.hero.title': { id: 'Program Global Talent UI', en: 'Global Talent UI Program' },
  'home.hero.subtitle': { id: 'Mendorong Keunggulan Akademik Universitas Indonesia', en: 'Driving Academic Excellence at Universitas Indonesia' },
  'footer.copyright': { id: '© 2026 Universitas Indonesia. Program Global Talent UI.', en: '© 2026 Universitas Indonesia. Global Talent UI Program.' },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('lang');
    return (saved as Language) || 'id';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = (key: string): string => {
    return translations[key]?.[lang] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
