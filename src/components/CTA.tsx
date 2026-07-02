import { Rocket } from "lucide-react";

export default function CTA() {
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
