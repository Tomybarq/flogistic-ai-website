import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote: "Flogistic Solutions transformed our marketing operations. Their AI automation increased our conversion rates by 240% in just 6 months.",
    author: "Sarah Mitchell",
    role: "CMO, TechCorp Global",
    avatar: "SM",
    rating: 5,
  },
  {
    quote: "The predictive analytics platform has given us insights we never thought possible. Our decision-making is now data-driven and incredibly accurate.",
    author: "Ahmed Al-Rashid",
    role: "CEO, Middle East Ventures",
    avatar: "AA",
    rating: 5,
  },
  {
    quote: "Implementation was seamless and the ROI was immediate. Their team truly understands enterprise AI needs.",
    author: "Lisa Chen",
    role: "CTO, Innovation Labs",
    avatar: "LC",
    rating: 5,
  },
];

const clientLogos = [
  'TechCorp', 'GlobalTech', 'InnovateCo', 'FutureSoft', 'DataDrive', 'CloudNext'
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (index) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const next = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="py-24 bg-[#0d1424] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-center text-slate-500 text-sm uppercase tracking-wider mb-8">
            Trusted by Industry Leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {clientLogos.map((logo, index) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-slate-600 hover:text-slate-400 transition-colors font-semibold text-lg"
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-6">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            What Our Clients Say
          </h2>
        </motion.div>
        
        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-slate-800/30 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-8 md:p-12">
            <Quote className="absolute top-8 left-8 w-12 h-12 text-blue-500/20" />
            
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-center"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                
                <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-8 font-light">
                  "{testimonials[activeIndex].quote}"
                </p>
                
                <div className="flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-semibold text-lg">
                    {testimonials[activeIndex].avatar}
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold">{testimonials[activeIndex].author}</div>
                    <div className="text-slate-400 text-sm">{testimonials[activeIndex].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-slate-700/50">
              <Button
                variant="ghost"
                size="icon"
                onClick={prev}
                className="text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goTo(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? 'bg-blue-500 w-8' 
                        : 'bg-slate-600 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={next}
                className="text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}