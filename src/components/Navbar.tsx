"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Services", href: "/#services" },
    { label: "How We Work", href: "/#process" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Platform", href: "/dashboard" },
    { label: "Contact", href: "/#contact" },
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
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 relative flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Flogistic Logo"
                fill
                className="object-contain select-none"
              />
            </div>
            <span className="font-semibold text-lg text-dark-50 group-hover:text-white transition-colors">
              Flogistic <span className="text-flogistic-400">Solutions</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-dark-100 hover:text-flogistic-400 transition-colors font-medium"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="bg-flogistic-600 hover:bg-flogistic-500 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-flogistic-600/25"
            >
              Let&apos;s Talk
            </Link>
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
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-dark-100 hover:text-flogistic-400 py-2 text-sm font-medium"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="block text-center bg-flogistic-600 hover:bg-flogistic-500 text-white px-5 py-3 rounded-full text-sm font-semibold"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
