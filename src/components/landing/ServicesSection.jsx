import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone, TrendingUp, Cog, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Megaphone,
    title: 'Digital Marketing Services',
    description: 'AI-driven marketing automation that optimizes campaigns, personalizes customer experiences, and maximizes ROI through intelligent data analysis.',
    gradient: 'from-blue-500 to-cyan-500',
    delay: 0.1,
  },
  {
    icon: TrendingUp,
    title: 'Predictive Analytics',
    description: 'Leverage machine learning to forecast trends, customer behavior, and market opportunities with unparalleled accuracy.',
    gradient: 'from-purple-500 to-pink-500',
    delay: 0.2,
  },
  {
    icon: Cog,
    title: 'Process Automation',
    description: 'Streamline operations with intelligent automation solutions that reduce costs and increase productivity across your organization.',
    gradient: 'from-emerald-500 to-teal-500',
    delay: 0.3,
  },
];

const ServiceCard = ({ service }) => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: service.delay }}
      whileHover={{ y: -8 }}
      className="group relative bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 hover:border-slate-600/50 transition-all duration-500"
    >
      {/* Gradient hover effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
      
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} p-0.5 mb-6`}>
        <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
          <service.icon className="w-6 h-6 text-white" />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-4">{service.title}</h3>
      <p className="text-slate-400 mb-6 leading-relaxed">{service.description}</p>
      
      <Button 
        variant="ghost" 
        onClick={scrollToContact}
        className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 p-0 h-auto group/btn"
      >
        Learn More
        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </Button>
    </motion.div>
  );
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-[#0a0f1c] to-[#0d1424] relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-6">
            Our Solutions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Comprehensive AI-Powered Services
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Tailored enterprise solutions designed to accelerate your digital transformation and drive measurable business outcomes.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}