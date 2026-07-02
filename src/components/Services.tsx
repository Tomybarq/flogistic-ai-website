import { Code2, Building2, Cog, Repeat, Globe, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    slug: "app-development",
    icon: Code2,
    title: "App Development",
    desc: "Native & cross-platform mobile and web apps built with modern architectures, clean code, and intuitive UX.",
  },
  {
    slug: "saas-platforms",
    icon: Building2,
    title: "SaaS B2B Platforms",
    desc: "Scalable multi-tenant SaaS products with subscription billing, team management, and enterprise-grade security.",
  },
  {
    slug: "internal-systems",
    icon: Cog,
    title: "Internal Systems",
    desc: "ERP, CRM, inventory, HR, and operations systems that streamline workflows and eliminate bottlenecks.",
  },
  {
    slug: "automation",
    icon: Repeat,
    title: "Automation Solutions",
    desc: "Intelligent workflow automation — from RPA bots to AI-driven pipelines — saving hours of manual work daily.",
  },
  {
    slug: "consulting",
    icon: Globe,
    title: "Digital Consulting",
    desc: "Strategic technology consulting to help you choose the right stack, architecture, and roadmap for your goals.",
  },
  {
    slug: "problem-solving",
    icon: Shield,
    title: "Problem Solving",
    desc: "Deep-dive technical analysis to diagnose, debug, and resolve complex challenges in existing systems.",
  },
];

export default function Services() {
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
              className="group glass-card p-6 lg:p-8 hover:bg-dark-500/50 transition-all duration-300 hover:border-flogistic-500/30 hover:shadow-lg hover:shadow-flogistic-500/5 flex flex-col justify-between"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-flogistic-500/10 border border-flogistic-500/20 flex items-center justify-center mb-5 group-hover:bg-flogistic-500/20 transition-colors">
                  <s.icon size={24} className="text-flogistic-400" />
                </div>
                <h3 className="text-xl font-semibold text-dark-50 mb-3">{s.title}</h3>
                <p className="text-dark-200 text-sm leading-relaxed mb-6">{s.desc}</p>
              </div>
              <Link
                href={`/services/${s.slug}`}
                className="inline-flex items-center gap-1 text-sm font-semibold text-flogistic-400 hover:text-flogistic-300 transition-colors group/link"
              >
                Learn More
                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
