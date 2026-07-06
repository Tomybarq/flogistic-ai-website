import React from 'react';

// تقسيم الجملة الأولى إلى كلمات فردية للتناوب البصري
const trackAWords = ["WE", "BUILD", "DIGITAL", "SOLUTIONS", "WE", "BUILD", "DIGITAL", "SOLUTIONS"];
// تقسيم الجملة الثانية المكملة
const trackBWords = ["THAT", "DRIVE", "REAL", "IMPACT", "THAT", "DRIVE", "REAL", "IMPACT"];

export default function HeroMarquee() {
  // مضاعفة المصفوفات برمجياً بنسبة 50% لضمان التكرار السلس دون انقطاع (Seamless Loop)
  const fullTrackA = [...trackAWords, ...trackAWords];
  const fullTrackB = [...trackBWords, ...trackBWords];

  return (
    <div className="w-full overflow-hidden border-y border-flogistic-500/10 py-6 flex flex-col gap-2 bg-dark-900/10 backdrop-blur-xl select-none relative">
      
      {/* تأثير تلاشي الحواف الجانبية (Edge Masking) المتناسق مع المظهر الداكن للموقع */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-dark-900 via-dark-900/60 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-dark-900 via-dark-900/60 to-transparent z-10 pointer-events-none" />

      {/* المسار الأول: يتحرك نحو اليسار (←) بألوان زجاجية مضيئة زرقاء */}
      <div className="w-full overflow-hidden flex relative py-1">
        <div className="flex whitespace-nowrap animate-flogistic-left will-change-transform">
          {fullTrackA.map((word, index) => (
            <div 
              key={`trackA-${index}`} 
              className="inline-flex items-center gap-4 px-6 font-sans text-5xl md:text-8xl font-black tracking-wider uppercase"
            >
              <span className="text-flogistic-400 drop-shadow-[0_0_8px_rgba(92,124,250,0.6)] opacity-70 text-3xl md:text-5xl font-light">←</span>
              <span className={index % 2 === 0 ? "text-[#f0f4ff] drop-shadow-[0_0_15px_rgba(92,124,250,0.35)]" : "text-stroke-flogistic-blue"}>
                {word}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-flogistic-500 shadow-[0_0_10px_#5c7cfa] opacity-80 ml-6 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* المسار الثاني: يتحرك نحو اليمين (→) بألوان زجاجية مضيئة سيان */}
      <div className="w-full overflow-hidden flex relative py-1 border-t border-flogistic-500/5 bg-white/[0.005]">
        <div className="flex whitespace-nowrap animate-flogistic-right will-change-transform">
          {fullTrackB.map((word, index) => (
            <div 
              key={`trackB-${index}`} 
              className="inline-flex items-center gap-4 px-6 font-sans text-5xl md:text-8xl font-black tracking-wider uppercase"
            >
              <span className={index % 2 === 0 ? "text-[#f0f9ff] drop-shadow-[0_0_15px_rgba(6,182,212,0.35)]" : "text-stroke-flogistic-cyan"}>
                {word}
              </span>
              <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] opacity-70 text-3xl md:text-5xl font-light">→</span>
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4] opacity-80 ml-6 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
