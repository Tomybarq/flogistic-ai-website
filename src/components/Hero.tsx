import { ArrowRight, Zap } from "lucide-react";
import HeroMarquee from "./ui/HeroMarquee";
import SquircleButton from "./ui/SquircleButton";
import Image from "next/image";

export default function Hero() {
  const stats = [
    { val: "50+", label: "Projects Delivered" },
    { val: "98%", label: "Client Satisfaction" },
    { val: "4+", label: "Years Experience" },
    { val: "12+", label: "Industries Served" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-flogistic-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-flogistic-400/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-flogistic-500/3 rounded-full blur-3xl" />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Column 1: Headline & Call-to-Actions (7 Cols) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-flogistic-500/10 border border-flogistic-500/20 text-flogistic-400 text-xs font-medium animate-fade-in mx-auto lg:mx-0">
              <Zap size={14} />
              Digital Transformation Partner
            </div>

            {/* العنوان الدلالي الموجه لمحركات البحث والـ SEO بدون التأثير على المظهر البصري */}
            <h1 className="sr-only">
              We Build Digital Solutions That Drive Real Impact
            </h1>

            {/* شريط النصوص المتعاكس واللانهائي البديل بصرياً */}
            <div className="w-full my-6 overflow-visible">
              <HeroMarquee />
            </div>

            <p className="text-dark-100 text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              From custom apps and SaaS platforms to intelligent automation —
              Flogistic Solutions Co transforms your vision into scalable,
              production-ready technology.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <SquircleButton href="/#services" className="inline-flex items-center gap-2">
                Explore Services
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </SquircleButton>
              <SquircleButton href="/#contact">
                Get in Touch
              </SquircleButton>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-dark-300/20 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              {stats.map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-flogistic-400">{stat.val}</div>
                  <div className="text-dark-200 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

          </div>

          {/* Column 2: Glowing 3D Logo Illustration (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center items-center animate-fade-in relative">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[360px] md:h-[360px] rounded-full p-4 bg-dark-800/20 backdrop-blur-xl border border-flogistic-500/10 shadow-2xl shadow-flogistic-500/5 group flex items-center justify-center">
              
              {/* Spinning outer outline ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-flogistic-400/20 animate-[spin_60s_linear_infinite]" />
              
              {/* Inner glowing circle background */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-flogistic-600/10 to-cyan-500/10 blur-2xl" />
              
              {/* Core Image Container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border border-white/5 shadow-inner">
                <Image
                  src="/hero-graphic.jpg"
                  alt="Flogistic 3D Glowing Sphere Logo"
                  fill
                  priority
                  className="object-cover select-none pointer-events-none scale-105 group-hover:scale-110 transition-transform duration-700"
                />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </section>
  );
}
