import React, { useState, createContext, useContext } from 'react';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import ServicesSection from '@/components/landing/ServicesSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/landing/Footer';
import Chatbot from '@/components/landing/Chatbot';

export const LanguageContext = createContext();

export default function Home() {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      <div className={`min-h-screen bg-[#0a0f1c] font-sans antialiased ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
        <Chatbot />
      </div>
    </LanguageContext.Provider>
  );
}