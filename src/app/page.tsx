"use client";

import { useEffect, useRef, useState } from "react";
import {
  Menu, X, Code2, Building2, Cog, Repeat, CheckCircle, ArrowRight,
  ChevronRight, Globe, Smartphone, Rocket, Shield, BarChart3, Zap
} from "lucide-react";

/* ===== Navbar ===== */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "How We Work", href: "#process" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark-900/90 backdrop-blur-xl border-b border-dark-300/20 shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-flogistic-500 to-flogistic-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="font-semibold text-lg text-dark-50 group-hover:text-white transition-colors">
              Flogistic <span className="text-flogistic-400">Solutions</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-dark-100 hover:text-flogistic-400 transition-colors font-medium"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-flogistic-600 hover:bg-flogistic-500 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-flogistic-600/25"
            >
              Let&apos;s Talk
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-dark-50 p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-dark-800/95 backdrop-blur-xl border-t border-dark-300/20">
          <div className="px-4 py-4 space-y-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-dark-100 hover:text-flogistic-400 py-2 text-sm font-medium"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block text-center bg-flogistic-600 hover:bg-flogistic-500 text-white px-5 py-3 rounded-full text-sm font-semibold"
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ===== Hero ===== */
function Hero() {
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

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-slide-up">
            We Build{" "}
            <span className="text-gradient">Digital Solutions</span>
            <br />
            That Drive Real Impact
          </h1>

          <p className="text-dark-100 text-lg sm:text-xl max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            From custom apps and SaaS platforms to intelligent automation —
            Flogistic Solutions Co transforms your vision into scalable,
            production-ready technology.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <a
              href="#services"
              className="group bg-flogistic-600 hover:bg-flogistic-500 text-white px-8 py-3.5 rounded-full text-base font-semibold transition-all hover:shadow-xl hover:shadow-flogistic-600/30 inline-flex items-center gap-2"
            >
              Explore Services
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="border border-dark-300/40 hover:border-flogistic-500/50 text-dark-50 hover:text-flogistic-400 px-8 py-3.5 rounded-full text-base font-semibold transition-all"
            >
              Get in Touch
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-dark-300/20 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            {[["50+", "Projects Delivered"], ["98%", "Client Satisfaction"], ["4+", "Years Experience"], ["12+", "Industries Served"]].map(([val, label], i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-flogistic-400">{val}</div>
                <div className="text-dark-200 text-sm mt-1">{label}</div>
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

/* ===== Services ===== */
const services = [
  {
    icon: Code2,
    title: "App Development",
    desc: "Native & cross-platform mobile and web apps built with modern architectures, clean code, and intuitive UX.",
  },
  {
    icon: Building2,
    title: "SaaS B2B Platforms",
    desc: "Scalable multi-tenant SaaS products with subscription billing, team management, and enterprise-grade security.",
  },
  {
    icon: Cog,
    title: "Internal Systems",
    desc: "ERP, CRM, inventory, HR, and operations systems that streamline workflows and eliminate bottlenecks.",
  },
  {
    icon: Repeat,
    title: "Automation Solutions",
    desc: "Intelligent workflow automation — from RPA bots to AI-driven pipelines — saving hours of manual work daily.",
  },
  {
    icon: Globe,
    title: "Digital Consulting",
    desc: "Strategic technology consulting to help you choose the right stack, architecture, and roadmap for your goals.",
  },
  {
    icon: Shield,
    title: "Problem Solving",
    desc: "Deep-dive technical analysis to diagnose, debug, and resolve complex challenges in existing systems.",
  },
];

function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-flogistic-400 text-sm font-semibold tracking-widest uppercase">What We Do</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Full-Spectrum{" "}
            <span className="text-gradient">Digital Services</span>
          </h2>
          <p className="text-dark-100 text-lg">
            End-to-end capabilities to take your idea from concept to launch — and your business from
            chaotic to optimized.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className="group glass-card p-6 lg:p-8 hover:bg-dark-500/50 transition-all duration-300 hover:border-flogistic-500/30 hover:shadow-lg hover:shadow-flogistic-500/5"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-flogistic-500/10 border border-flogistic-500/20 flex items-center justify-center mb-5 group-hover:bg-flogistic-500/20 transition-colors">
                <s.icon size={24} className="text-flogistic-400" />
              </div>
              <h3 className="text-xl font-semibold text-dark-50 mb-3">{s.title}</h3>
              <p className="text-dark-200 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Process ===== */
const steps = [
  { num: "01", title: "Listen & Analyze", desc: "We dig deep into your business needs, pain points, and goals before writing a single line of code." },
  { num: "02", title: "Design & Plan", desc: "Architecture, wireframes, and a clear roadmap — no surprises, just a transparent plan you approve." },
  { num: "03", title: "Build & Iterate", desc: "Agile development with regular check-ins. You see progress every step of the way." },
  { num: "04", title: "Deploy & Scale", desc: "Production deployment, monitoring, and ongoing optimization to keep your solution running smoothly." },
];

function Process() {
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

/* ===== CTA ===== */
function CTA() {
  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-800/50 to-dark-900" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          Ready to Build Something{" "}
          <span className="text-gradient">Amazing</span>?
        </h2>
        <p className="text-dark-100 text-lg max-w-2xl mx-auto mb-10">
          Let&apos;s talk about your project. Whether it&apos;s an app, a SaaS platform,
          or an automation overhaul — we&apos;re here to make it happen.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:hello@flogistic.com"
            className="group bg-flogistic-600 hover:bg-flogistic-500 text-white px-8 py-3.5 rounded-full text-base font-semibold transition-all hover:shadow-xl hover:shadow-flogistic-600/30 inline-flex items-center gap-2"
          >
            Start Your Project
            <Rocket size={18} className="group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ===== Footer ===== */
function Footer() {
  return (
    <footer className="relative border-t border-dark-300/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-flogistic-500 to-flogistic-700 flex items-center justify-center">
              <span className="text-white font-bold text-xs">F</span>
            </div>
            <span className="text-sm text-dark-200">
              Flogistic Solutions Co &copy; {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-dark-300">
            <span>Digital Services</span>
            <span className="w-1 h-1 rounded-full bg-dark-300/40" />
            <span>App Development</span>
            <span className="w-1 h-1 rounded-full bg-dark-300/40" />
            <span>SaaS B2B</span>
            <span className="w-1 h-1 rounded-full bg-dark-300/40" />
            <span>Automation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ===== Main Page ===== */
export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <div className="glow-line" />
      <Services />
      <div className="glow-line" />
      <Process />
      <div className="glow-line" />
      <CTA />
      <Footer />
    </main>
  );
}
