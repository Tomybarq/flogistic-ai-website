import { ArrowRight, Zap } from "lucide-react";
import HeroMarquee from "./ui/HeroMarquee";
import SquircleButton from "./ui/SquircleButton";

export default function Hero() {
  const stats = [
    { val: "50+", label: "Projects Delivered" },
    { val: "98%", label: "Client Satisfaction" },
    { val: "4+", label: "Years Experience" },
    { val: "12+", label: "Industries Served" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-flogistic-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-flogistic-400/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-flogistic-500/3 rounded-full blur-3xl" />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-flogistic-500/10 border border-flogistic-500/20 text-flogistic-400 text-xs font-medium mb-8 animate-fade-in">
            <Zap size={14} />
            Digital Transformation Partner
          </div>

          {/* العنوان الدلالي الموجه لمحركات البحث والـ SEO بدون التأثير على المظهر البصري */}
          <h1 className="sr-only">
            We Build Digital Solutions That Drive Real Impact
          </h1>

          {/* شريط النصوص المتعاكس واللانهائي البديل بصرياً */}
          <div className="w-full my-10 md:my-14 overflow-visible">
            <HeroMarquee />
          </div>

          <p className="text-dark-100 text-lg sm:text-xl max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            From custom apps and SaaS platforms to intelligent automation —
            Flogistic Solutions Co transforms your vision into scalable,
            production-ready technology.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <SquircleButton href="/#services" className="inline-flex items-center gap-2">
              Explore Services
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </SquircleButton>
            <SquircleButton href="/#contact">
              Get in Touch
            </SquircleButton>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-dark-300/20 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-flogistic-400">{stat.val}</div>
                <div className="text-dark-200 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent" />
    </section>
  );
}
