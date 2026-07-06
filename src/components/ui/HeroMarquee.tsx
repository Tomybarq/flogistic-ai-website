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
    <div className="w-full overflow-hidden border-y border-white/10 py-6 flex flex-col gap-2 bg-[#0a0a0a] select-none relative">
      
      {/* تأثير تلاشي الحواف الجانبية (Edge Masking) */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent z-10 pointer-events-none" />

      {/* المسار الأول: يتحرك نحو اليسار (←) */}
      <div className="w-full overflow-hidden flex relative py-1">
        <div className="flex whitespace-nowrap animate-flogistic-left will-change-transform">
          {fullTrackA.map((word, index) => (
            <div 
              key={`trackA-${index}`} 
              className="inline-flex items-center gap-4 px-6 font-sans text-5xl md:text-8xl font-black tracking-wider uppercase"
            >
              <span className="text-[#e8a020] opacity-40 text-3xl md:text-5xl font-light">←</span>
              <span className={index % 2 === 0 ? "text-[#f0ebe0]" : "text-stroke-flogistic"}>
                {word}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#e8a020] opacity-80 ml-6 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* المسار الثاني: يتحرك نحو اليمين (→) خلفية مدمجة وخفيفة */}
      <div className="w-full overflow-hidden flex relative py-1 border-t border-white/5 bg-white/[0.01]">
        <div className="flex whitespace-nowrap animate-flogistic-right will-change-transform">
          {fullTrackB.map((word, index) => (
            <div 
              key={`trackB-${index}`} 
              className="inline-flex items-center gap-4 px-6 font-sans text-5xl md:text-8xl font-black tracking-wider uppercase"
            >
              <span className={index % 2 === 0 ? "text-[#f0ebe0]" : "text-stroke-flogistic"}>
                {word}
              </span>
              <span className="text-[#1ab8a0] opacity-40 text-3xl md:text-5xl font-light">→</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#1ab8a0] opacity-80 ml-6 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
