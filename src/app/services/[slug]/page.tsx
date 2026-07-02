import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, CheckCircle2, Cpu, ShieldAlert, Settings, Cloud, Zap } from "lucide-react";

interface ServiceProfile {
  title: string;
  description: string;
  fullDescription: string;
  features: string[];
  techStack: string[];
  icon: any;
}

const serviceProfiles: Record<string, ServiceProfile> = {
  "app-development": {
    title: "App Development",
    description: "Native & cross-platform mobile and web apps built with modern architectures, clean code, and intuitive UX.",
    fullDescription: "At Flogistic Solutions, we design and construct premium, high-performance application suites. Our engineering process spans across iOS native, Android native, and universal Progressive Web Applications (PWA). By prioritizing clean code architecture, type-safety, and modular components, we ensure your app scales to millions of active users without architectural friction.",
    features: [
      "Native iOS (Swift) & Android (Kotlin) development",
      "Universal Cross-Platform frameworks (React Native & Flutter)",
      "High-Fidelity custom interactive UX/UI design assets",
      "Robust state management and offline capability optimization",
      "Seamless integration with native hardware features (GPS, Camera, Push notifications)",
    ],
    techStack: ["React Native", "Flutter", "Swift", "Kotlin", "TypeScript", "Next.js", "Tailwind CSS"],
    icon: Cpu,
  },
  "saas-platforms": {
    title: "SaaS B2B Platforms",
    description: "Scalable multi-tenant SaaS products with subscription billing, team management, and enterprise-grade security.",
    fullDescription: "We build cloud-native, multi-tenant B2B Software-as-a-Service platforms engineered for high throughput. From relational database isolation schemas to secure role-based access control (RBAC), we provide the infrastructure needed to support multiple organizations (tenants) seamlessly. We handle subscription logic, seat management, billing cycles, and security protocols out-of-the-box.",
    features: [
      "Secure multi-tenant database isolation (logical schemas & separate instances)",
      "Flexible subscription billing architectures (Stripe, Lemon Squeezy, Merchant of Record)",
      "Granular team role-based access control (RBAC) and seat provisioning",
      "Enterprise security compliance (SSO, SAML, Multi-factor Authentication)",
      "Developer-friendly webhook dispatchers and public developer APIs",
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Stripe API", "Auth0", "AWS Cognito"],
    icon: Cloud,
  },
  "internal-systems": {
    title: "Internal Systems",
    description: "ERP, CRM, inventory, HR, and operations systems that streamline workflows and eliminate bottlenecks.",
    fullDescription: "Maximize your operational efficiency by replacing messy spreadsheets with integrated internal enterprise systems. We design customized ERPs, Customer Relationship Management (CRM) portals, automated inventory trackers, and HR hubs configured to solve specific workflow inefficiencies. We focus on dashboard usability, fast search indexes, and custom reporting modules.",
    features: [
      "Custom ERP & CRM development tailored to bespoke organizational workflows",
      "Real-time inventory and supply-chain logging systems",
      "Advanced administrative dashboards with responsive data filters and exports",
      "Legacy database integrations and automated cron ETL synchronization pipelines",
      "Detailed activity log auditing for enterprise security compliance",
    ],
    techStack: ["React", "TypeScript", "NestJS", "PostgreSQL", "Redis", "Docker", "Apache Kafka"],
    icon: Settings,
  },
  "automation": {
    title: "Automation Solutions",
    description: "Intelligent workflow automation — from RPA bots to AI-driven pipelines — saving hours of manual work daily.",
    fullDescription: "Transform manual processes into lightning-fast background routines. Our automation engineers develop AI-powered data pipelines, web scrapers, and Robotic Process Automation (RPA) systems. By integrating advanced Language Models (LLMs) and workflow orchestrators, we eliminate administrative bottlenecks, reduce error rates, and free up critical human resources.",
    features: [
      "Intelligent Document Processing (IDP) utilizing OCR and LLMs",
      "RPA bot deployment for automated form-filling and database syncs",
      "Event-driven workflow orchestration (n8n, Zapier, custom engines)",
      "Automated marketing, communication, and notification loops",
      "Data extraction pipelines and scheduled background sync batches",
    ],
    techStack: ["Python", "Node.js", "LangChain", "OpenAI API", "n8n", "Zapier", "Docker"],
    icon: Zap,
  },
  "consulting": {
    title: "Digital Consulting",
    description: "Strategic technology consulting to help you choose the right stack, architecture, and roadmap for your goals.",
    fullDescription: "Avoid costly tech debt and architecture mistakes before writing code. We provide strategic consulting to align your business objectives with modern tech stacks. We conduct deep reviews of your existing infrastructure, model target-state server topologies, write detailed development roadmaps, and guide team training on best practices in cloud migration and security.",
    features: [
      "Comprehensive software architecture review and system audits",
      "Cloud topology optimization and cost reduction strategies",
      "Step-by-step product roadmap and engineering blueprints",
      "DevOps consulting, CI/CD pipeline automation, and container strategies",
      "Security posture analysis and WCAG accessibility compliance checkups",
    ],
    techStack: ["AWS", "Google Cloud Platform", "Terraform", "Kubernetes", "Docker", "GitLab CI/CD"],
    icon: Cloud,
  },
  "problem-solving": {
    title: "Problem Solving",
    description: "Deep-dive technical analysis to diagnose, debug, and resolve complex challenges in existing systems.",
    fullDescription: "When systems crash, lag, or fail to scale, our specialized engineering response unit steps in. We analyze bottlenecked databases, trace memory leaks in complex runtimes, secure vulnerability holes in APIs, and rewrite critical microservices for performance. We provide high-stress troubleshooting and root-cause analysis reports.",
    features: [
      "Database query plan analyzing and indexing performance optimizations",
      "Runtime memory leak detection and CPU profiling",
      "Penetration testing audits and API security patches",
      "Monolith decomposition and legacy system microservices refactoring",
      "24/7 high-priority emergency technical incident response",
    ],
    techStack: ["PostgreSQL", "Redis", "Node.js", "Go", "Python", "Datadog", "AWS CloudWatch"],
    icon: ShieldAlert,
  },
};

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const profile = serviceProfiles[params.slug];
  if (!profile) {
    return {
      title: "Service Not Found | Flogistic Solutions Co",
      description: "The requested digital service could not be located in our catalog.",
    };
  }

  return {
    title: `${profile.title} Services | Flogistic Solutions Co`,
    description: profile.description,
    keywords: [...profile.techStack, "digital services", "app development", "Flogistic Solutions"],
  };
}

export async function generateStaticParams() {
  return [
    { slug: "app-development" },
    { slug: "saas-platforms" },
    { slug: "internal-systems" },
    { slug: "automation" },
    { slug: "consulting" },
    { slug: "problem-solving" },
  ];
}

export default function ServicePage({ params }: PageProps) {
  const profile = serviceProfiles[params.slug];

  if (!profile) {
    notFound();
  }

  const IconComponent = profile.icon;

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
            href="/#services"
            className="inline-flex items-center gap-2 text-sm text-dark-100 hover:text-flogistic-400 transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>

          {/* Service Title Area */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-12 border-b border-dark-300/20 mb-12">
            <div className="max-w-3xl">
              <div className="w-14 h-14 rounded-2xl bg-flogistic-500/10 border border-flogistic-500/20 flex items-center justify-center mb-6">
                <IconComponent size={28} className="text-flogistic-400" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
                <span className="text-gradient">{profile.title}</span>
              </h1>
              <p className="text-dark-100 text-lg sm:text-xl leading-relaxed">{profile.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Content - Description & Features */}
            <div className="lg:col-span-2 space-y-10">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Service Overview</h2>
                <p className="text-dark-200 text-base leading-relaxed">{profile.fullDescription}</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Core Capabilities</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-3 text-dark-200 text-sm leading-relaxed">
                      <CheckCircle2 size={18} className="text-flogistic-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Sidebar - Technologies & Call To Action */}
            <div className="space-y-8">
              {/* Tech Stack Box */}
              <div className="glass-card p-6 lg:p-8">
                <h3 className="text-lg font-bold text-white mb-4">Technologies We Use</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-dark-500/30 border border-dark-300/20 text-xs font-semibold text-flogistic-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Box */}
              <div className="glass-card p-6 lg:p-8 border border-flogistic-500/10 bg-gradient-to-br from-dark-800 to-dark-900/60">
                <h3 className="text-lg font-bold text-white mb-2">Need a custom solution?</h3>
                <p className="text-dark-200 text-sm leading-relaxed mb-6">
                  Let’s schedule a technical assessment with our core engineering team to plan your build.
                </p>
                <Link
                  href="/#contact"
                  className="w-full bg-flogistic-600 hover:bg-flogistic-500 text-white py-3 px-4 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-flogistic-600/25 inline-flex items-center justify-center gap-2"
                >
                  Consult Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
