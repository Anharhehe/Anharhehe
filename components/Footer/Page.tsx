'use client';

const QUICK_LINKS = [
  { label: 'Home',       href: '#home' },
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
];

const SERVICES = [
  'Web Development (MERN Stack)',
  'Mobile App Development (React Native)',
  'AI / Machine Learning Engineering',
  'Database Design & Management',
  'REST API Development',
  'Embedded System Development',
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.getElementById(href.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="bg-[#060a14] border-t border-white/8">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-10 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* ── Col 1: Brand ── */}
        <div className="flex flex-col gap-5">
          <div className="text-2xl font-extrabold text-white tracking-tight">
            Anhar Munir<span className="text-blue-400"></span>
            <span className="text-blue-400"></span>
          </div>
          <p className="text-gray-400 text-sm leading-7 max-w-xs">
            Full Stack Developer &amp; AI/ML Engineer building production-ready systems
            and shipping clean, efficient code.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3 mt-1">
            <a
              href="https://www.linkedin.com/in/m-anhar-munir-b736252b9/"
              target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:bg-blue-600/20 hover:border-blue-500 hover:text-blue-400 transition-all duration-200 hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://github.com/Anharhehe"
              target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:border-white/30 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/anharhehe/"
              target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:bg-pink-600/20 hover:border-pink-500 hover:text-pink-400 transition-all duration-200 hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>

        {/* ── Col 2: Quick Links ── */}
        <div>
          <h4 className="text-white-400 font-semibold text-sm tracking-widest uppercase mb-6">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-3">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200 cursor-pointer"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Col 3: Services ── */}
        <div>
          <h4 className="text-white-400 font-semibold text-sm tracking-widest uppercase mb-6">
            Services
          </h4>
          <ul className="flex flex-col gap-3">
            {SERVICES.map((service) => (
              <li key={service} className="flex items-start gap-2 text-gray-400 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                {service}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/6">
        <div className="max-w-7xl mx-auto px-10 py-5 flex items-center justify-center">
          <p className="text-gray-600 text-xs text-center">
            © 2026 Anhar Munir. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
