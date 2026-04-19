import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Facebook, Instagram, ArrowUp, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { LanguageContext } from '@/pages/Home';
import { translations } from './translations';

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/company/flogistic-ai/' },
  { icon: Twitter, href: '#' },
  { icon: Facebook, href: '#' },
  { icon: Instagram, href: '#' },
];

export default function Footer() {
  const { language } = useContext(LanguageContext);
  const t = translations[language].footer;
  
  const footerLinks = {
    [t.solutions]: ['Digital Marketing', 'Predictive Analytics', 'Process Automation', 'Custom AI'],
    [t.company]: ['About Us', 'Careers', 'Press', 'Partners'],
    [t.resources]: ['Blog', 'Case Studies', 'Documentation', 'API'],
    [t.legal]: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
  };
  const { toggleLanguage } = useContext(LanguageContext);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070a12] border-t border-slate-800">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698693974567338469dd516f/538a6a95a_Logo.png" 
                alt="Flogistic Solutions Co"
                className="h-16 w-auto"
              />
            </div>
            <p className="text-slate-400 text-sm mb-6 max-w-xs">
              {t.description}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-800 gap-4">
          <p className="text-slate-500 text-sm">
            {t.copyright}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <Globe className="w-4 h-4 mr-2" />
              {language === 'en' ? 'العربية' : 'English'}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollToTop}
              className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-full"
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}