import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { LanguageContext } from '@/pages/Home';
import { translations } from './translations';

export default function Navbar() {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const t = translations[language].nav;
  
  const navLinks = [
    { name: t.home, href: '#home' },
    { name: t.services, href: '#services' },
    { name: t.testimonials, href: '#testimonials' },
    { name: t.contact, href: '#contact' },
  ];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-slate-900/90 backdrop-blur-xl border-b border-slate-800' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button 
              onClick={() => scrollToSection('#home')}
              className="flex items-center gap-3"
            >
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698693974567338469dd516f/538a6a95a_Logo.png" 
                alt="Flogistic Solutions Co"
                className="h-16 w-auto"
              />
            </button>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
                >
                  {link.name}
                </button>
              ))}
            </div>
            
            {/* Right Side */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <Globe className="w-4 h-4 mr-2" />
                {language === 'en' ? 'العربية' : 'English'}
              </Button>
              <Button
                onClick={() => scrollToSection('#contact')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {t.getStarted}
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-slate-900/98 backdrop-blur-xl pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-2xl text-white font-medium py-4 border-b border-slate-800"
                >
                  {link.name}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection('#contact')}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
              >
                {t.getStarted}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}