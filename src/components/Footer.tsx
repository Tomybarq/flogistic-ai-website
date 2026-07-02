export default function Footer() {
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
