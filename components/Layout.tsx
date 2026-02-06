import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  // ✅ Default LIGHT theme: only use localStorage "dark" to enable dark mode.
  // No system prefers-color-scheme auto-detection.
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#020617] transition-colors duration-300">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] sm:w-[50%] h-[50%] bg-indigo-500/5 dark:bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] sm:w-[50%] h-[50%] bg-pink-500/5 dark:bg-pink-500/10 blur-[120px] rounded-full" />
      </div>

      <header className="relative z-50 sticky top-0 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md border-b border-slate-100 dark:border-white/5">
        <nav className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-tr from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
              <span className="font-syne font-bold text-white text-lg sm:text-xl italic">Q</span>
            </div>
            <span className="font-syne font-bold text-lg sm:text-xl tracking-tight hidden xs:block text-slate-900 dark:text-white">
              SMART<span className="text-indigo-600 dark:text-indigo-400">QR</span>
            </span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-4">
            <div className="hidden sm:flex items-center gap-1">
              <NavLink to="/" active={location.pathname === '/'}>Generator</NavLink>
              <NavLink to="/scan" active={location.pathname === '/scan'}>Scanner</NavLink>
            </div>

            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all border border-transparent hover:border-indigo-500/20 shadow-sm"
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            <Link
              to="/about"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all border border-transparent hover:border-indigo-500/20 sm:hidden"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile nav indicator for non-desktop */}
      <div className="sm:hidden sticky top-20 z-40 bg-white/50 dark:bg-[#020617]/50 backdrop-blur-md border-b border-slate-100 dark:border-white/5 px-4 py-2 flex justify-center gap-2">
        <NavLink to="/" active={location.pathname === '/'}>Generator</NavLink>
        <NavLink to="/scan" active={location.pathname === '/scan'}>Scanner</NavLink>
        <NavLink to="/about" active={location.pathname === '/about'}>About</NavLink>
      </div>

      <main className="relative z-10 flex-grow max-w-6xl mx-auto w-full px-4 py-6 sm:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="relative z-10 border-t border-slate-100 dark:border-white/5 bg-white/50 dark:bg-black/20 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 text-center text-slate-500 dark:text-slate-400">
          <p className="font-mono text-xs sm:text-sm font-medium uppercase tracking-widest">
            &copy; {new Date().getFullYear()} DESIGNED BY Ahamed Masry
          </p>
          <div className="mt-4 flex justify-center gap-4 sm:gap-8">
            <a href="https://github.com/iamahamedmasry" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-mono text-[10px] sm:text-xs">
              GITHUB
            </a>
            <a href="https://iamahamedmasry.github.io/Portfolio/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-mono text-[10px] sm:text-xs">
              PORTFOLIO 
            </a>
            <a href="https://www.linkedin.com/in/ahamedmasry-cs/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-mono text-[10px] sm:text-xs">
              LINKEDIN 
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const NavLink: React.FC<{ to: string; active: boolean; children: React.ReactNode }> = ({ to, active, children }) => (
  <Link
    to={to}
    className={`px-3 sm:px-4 py-2 rounded-lg font-syne text-xs sm:text-sm font-bold transition-all duration-300 ${
      active
        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-white/5 shadow-sm'
        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
    }`}
  >
    {children}
  </Link>
);