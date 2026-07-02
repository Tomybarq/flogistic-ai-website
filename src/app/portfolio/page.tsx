import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, ExternalLink, ShieldCheck, TrendingUp, Cpu, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio | Flogistic Solutions Co",
  description: "Explore our software deliverables, custom enterprise B2B applications, and advanced workflow automations.",
};

interface Project {
  title: string;
  category: string;
  scope: string;
  outcome: string;
  technologies: string[];
  metrics: string;
  icon: any;
}

const projects: Project[] = [
  {
    title: "Apex Logistics ERP",
    category: "Internal Systems / Enterprise",
    scope: "Engineered a custom supply chain and fleet operations management platform for a global logistics firm to replace fragmented spreadsheets.",
    outcome: "Successfully automated route scheduling, reduced shipment processing delays by 24%, and centralized multi-warehouse tracking databases.",
    technologies: ["Next.js", "TypeScript", "Node.js", "Go", "PostgreSQL", "AWS"],
    metrics: "24% delay reduction",
    icon: Cpu,
  },
  {
    title: "QuantTrade Analytics",
    category: "SaaS B2B Platforms",
    scope: "Architected a secure, high-performance backtesting and portfolio optimization engine for proprietary financial trading firms.",
    outcome: "Enabled simultaneous execution of 10,000+ complex historical market simulation queries with sub-second data streaming rendering.",
    technologies: ["React", "TypeScript", "Rust", "Python", "Redis", "Docker"],
    metrics: "10k+ concurrent backtests",
    icon: TrendingUp,
  },
  {
    title: "OmniChannel Retail AI",
    category: "Automation / AI Pipelines",
    scope: "Deployed an event-driven AI workflow system that parses multi-channel customer communications, extracting intent and sentiments.",
    outcome: "Cut baseline customer response times by 40%, automating support triage and CRM ticket creation utilizing LLM orchestration.",
    technologies: ["Python", "LangChain", "OpenAI API", "n8n", "PostgreSQL"],
    metrics: "40% support speedup",
    icon: Award,
  },
  {
    title: "Starlight EHR Portal",
    category: "Healthcare SaaS",
    scope: "Built a fully HIPAA-compliant multi-tenant Electronic Health Record database system with encrypted fields and document uploads.",
    outcome: "Delivered medical record exchange with zero downtime deployment, audit trails, and biometric signature workflows.",
    technologies: ["Next.js", "NestJS", "MongoDB", "Auth0", "Docker", "GCP"],
    metrics: "100% HIPAA Compliance",
    icon: ShieldCheck,
  },
];

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-dark-900 text-dark-50 flex flex-col justify-between">
      <Navbar />

      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32 flex-grow">
        {/* Background glow effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-flogistic-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-flogistic-400/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-dark-100 hover:text-flogistic-400 transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Page Header */}
          <div className="max-w-3xl mb-16">
            <span className="text-flogistic-400 text-sm font-semibold tracking-widest uppercase">Our Work</span>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mt-4 mb-6">
              Case Studies & <span className="text-gradient">Portfolio</span>
            </h1>
            <p className="text-dark-100 text-lg sm:text-xl leading-relaxed">
              Explore how Flogistic Solutions transforms business bottlenecks into premium production-ready systems, custom SaaS applications, and intelligent AI automations.
            </p>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, idx) => {
              const IconComponent = project.icon;
              return (
                <div
                  key={idx}
                  className="group glass-card p-6 sm:p-8 hover:bg-dark-500/50 transition-all duration-300 hover:border-flogistic-500/30 hover:shadow-lg hover:shadow-flogistic-500/5 flex flex-col justify-between border border-dark-300/20"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-semibold text-flogistic-400 uppercase tracking-widest bg-flogistic-500/10 px-3 py-1.5 rounded-full border border-flogistic-500/20">
                        {project.category}
                      </span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                        <IconComponent size={14} />
                        {project.metrics}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-flogistic-300 transition-colors flex items-center gap-2">
                      {project.title}
                    </h2>

                    {/* Scope & Outcome */}
                    <div className="space-y-4 mb-8">
                      <div>
                        <h4 className="text-xs font-bold text-dark-100 uppercase tracking-wider mb-1.5">Client Scope</h4>
                        <p className="text-dark-200 text-sm leading-relaxed">{project.scope}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-dark-100 uppercase tracking-wider mb-1.5">Business Outcome</h4>
                        <p className="text-dark-200 text-sm leading-relaxed">{project.outcome}</p>
                      </div>
                    </div>
                  </div>

                  {/* Tech stack & Action */}
                  <div className="pt-6 border-t border-dark-300/15">
                    <h4 className="text-xs font-bold text-dark-100 uppercase tracking-wider mb-3">Technologies Utilized</h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md bg-dark-600 border border-dark-300/30 text-xs font-medium text-dark-100"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
