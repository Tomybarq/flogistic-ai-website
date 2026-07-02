const steps = [
  { num: "01", title: "Listen & Analyze", desc: "We dig deep into your business needs, pain points, and goals before writing a single line of code." },
  { num: "02", title: "Design & Plan", desc: "Architecture, wireframes, and a clear roadmap — no surprises, just a transparent plan you approve." },
  { num: "03", title: "Build & Iterate", desc: "Agile development with regular check-ins. You see progress every step of the way." },
  { num: "04", title: "Deploy & Scale", desc: "Production deployment, monitoring, and ongoing optimization to keep your solution running smoothly." },
];

export default function Process() {
  return (
    <section id="process" className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-800/30" />
      <div className="glow-line absolute top-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-flogistic-400 text-sm font-semibold tracking-widest uppercase">How We Work</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            From Idea to{" "}
            <span className="text-gradient">Impact</span>
          </h2>
          <p className="text-dark-100 text-lg">
            A proven, transparent process that turns your rough concept into a polished, working solution.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-flogistic-500/40 to-transparent" />
              )}
              {/* Step number */}
              <div className="text-5xl lg:text-6xl font-bold text-flogistic-500/15 mb-4">{s.num}</div>
              <h3 className="text-xl font-semibold text-dark-50 mb-3">{s.title}</h3>
              <p className="text-dark-200 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
