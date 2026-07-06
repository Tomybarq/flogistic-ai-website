import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative border-t border-dark-300/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 relative flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Flogistic Logo"
                fill
                className="object-contain select-none"
              />
            </div>
            <span className="text-sm text-dark-200">
              Flogistic Solutions Co &copy; {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-dark-300">
            <Link href="/portfolio" className="hover:text-flogistic-400 transition-colors">
              Portfolio
            </Link>
            <span className="w-1 h-1 rounded-full bg-dark-300/40" />
            <Link href="/services/app-development" className="hover:text-flogistic-400 transition-colors">
              App Development
            </Link>
            <span className="w-1 h-1 rounded-full bg-dark-300/40" />
            <Link href="/services/saas-platforms" className="hover:text-flogistic-400 transition-colors">
              SaaS B2B
            </Link>
            <span className="w-1 h-1 rounded-full bg-dark-300/40" />
            <Link href="/services/automation" className="hover:text-flogistic-400 transition-colors">
              Automation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
