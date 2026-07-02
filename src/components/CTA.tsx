import ContactForm from "./ContactForm";

export default function CTA() {
  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-800/50 to-dark-900" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          Ready to Build Something{" "}
          <span className="text-gradient">Amazing</span>?
        </h2>
        <p className="text-dark-100 text-lg max-w-2xl mx-auto mb-12">
          Let&apos;s talk about your project. Fill out the form below to get in touch with our engineering team,
          and we&apos;ll get back to you within 24 hours.
        </p>

        <ContactForm />
      </div>
    </section>
  );
}

