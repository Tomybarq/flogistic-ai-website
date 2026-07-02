import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

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
