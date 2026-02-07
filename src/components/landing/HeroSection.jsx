import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Zap, BarChart3, Clock, Award } from 'lucide-react';
import { Button } from "@/components/ui/button";

const StatItem = ({ value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="text-center"
  >
    <div className="text-3xl md:text-4xl font-bold text-white">{value}</div>
    <div className="text-sm text-slate-400 mt-1">{label}</div>
  </motion.div>
);

const FeatureBadge = ({ icon: Icon, text, className }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-slate-300 ${className}`}
  >
    <Icon className="w-4 h-4 text-blue-400" />
    <span>{text}</span>
  </motion.div>
);

export default function HeroSection() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#0a0f1c] via-[#0d1424] to-[#0a0f1c]">
      {/* Cover Image Background */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698693974567338469dd516f/7cda83df0_CoverProfile.png"
          alt="Flogistic Solutions"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1c]/80 via-[#0d1424]/60 to-[#0a0f1c]/90" />
      </div>
      
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Enterprise AI Solutions</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Transform Your Business with{' '}
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">
                Enterprise AI
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-400 max-w-xl leading-relaxed"
            >
              Empowering enterprises with cutting-edge artificial intelligence and automation solutions that drive growth, efficiency, and innovation.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl group"
              >
                Request a Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => scrollToSection('services')}
                className="border-slate-700 text-slate-300 hover:bg-slate-800 px-8 py-6 text-lg rounded-xl"
              >
                Learn More
              </Button>
            </motion.div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-8 border-t border-slate-800"
            >
              <div className="grid grid-cols-3 gap-8">
                <StatItem value="500+" label="Enterprise Clients" delay={0.5} />
                <StatItem value="98%" label="Client Satisfaction" delay={0.6} />
                <StatItem value="2.4x" label="Average ROI" delay={0.7} />
              </div>
            </motion.div>
          </div>
          
          {/* Right Content - Floating Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 shadow-2xl">
                {/* 24/7 Support Badge */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 px-4 py-2 bg-emerald-500 rounded-full text-white text-sm font-medium shadow-lg shadow-emerald-500/25"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    24/7 Support
                  </div>
                </motion.div>
                
                <div className="text-center space-y-4 mb-8">
                  <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    AI
                  </div>
                  <div className="text-2xl text-white font-medium">Powered</div>
                  <div className="text-xl text-slate-400">Solutions</div>
                </div>
                
                <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-6" />
                
                <div className="space-y-3">
                  {[
                    { icon: BarChart3, text: 'Real-time Analytics' },
                    { icon: Zap, text: 'Automated Workflows' },
                    { icon: Sparkles, text: 'Predictive Intelligence' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center gap-3 text-slate-300"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-blue-400" />
                      </div>
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </div>
                
                {/* ISO Badge */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  className="absolute -bottom-4 -left-4 px-4 py-2 bg-emerald-600 rounded-full text-white text-sm font-medium shadow-lg shadow-emerald-600/25 flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  ISO Certified
                </motion.div>
              </div>
              
              {/* Background Glow */}
              <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-3xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}