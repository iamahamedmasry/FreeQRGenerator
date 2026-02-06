
import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
      <header className="space-y-4">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-syne font-extrabold tracking-tighter text-slate-900 dark:text-white">
          THE <span className="text-indigo-600 dark:text-indigo-400">MISSION.</span>
        </h1>
        <p className="text-xl sm:text-2xl text-slate-500 dark:text-slate-400 font-syne font-bold leading-relaxed max-w-2xl">
          Empowering digital creators with bespoke, scan-safe physical identification codes.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        <motion.div whileHover={{ y: -5 }} className="glass rounded-[1.5rem] sm:rounded-[2rem] p-8 sm:p-10 space-y-4 bg-white/60 dark:bg-white/5 shadow-lg shadow-slate-100 dark:shadow-none border border-slate-100 dark:border-white/5">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-inner">💡</div>
          <h3 className="text-lg sm:text-xl font-syne font-bold text-slate-900 dark:text-white">Why SmartQR?</h3>
          <p className="text-slate-500 dark:text-slate-400 font-mono text-xs sm:text-sm leading-relaxed">
            Standard QR codes are utilitarian and forgettable. SmartQR bridges the gap between digital identity and physical touchpoints, turning every scan into a branded experience.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="glass rounded-[1.5rem] sm:rounded-[2rem] p-8 sm:p-10 space-y-4 bg-white/60 dark:bg-white/5 shadow-lg shadow-slate-100 dark:shadow-none border border-slate-100 dark:border-white/5">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-50 dark:bg-pink-900/20 rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-inner">🛠️</div>
          <h3 className="text-lg sm:text-xl font-syne font-bold text-slate-900 dark:text-white">Tech Foundation</h3>
          <p className="text-slate-500 dark:text-slate-400 font-mono text-xs sm:text-sm leading-relaxed">
            Engineered with React 19, Tailwind CSS v4, and Framer Motion. We utilize high-fidelity vector rendering for crisp codes and computer vision algorithms for reliable scanning.
          </p>
        </motion.div>
      </section>

      <section className="space-y-6 sm:space-y-8">
        <h2 className="text-3xl sm:text-4xl font-syne font-bold text-slate-900 dark:text-white">Studio Capability</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {[
            'Bespoke Pixel Architecture',
            'Social Identity Integration',
            'Multi-Platform Vector Exports',
            'Contrast-Aware Scan Logic',
            'Asynchronous Asset Rendering',
            'Cross-Device UI Synchronicity'
          ].map((feature, i) => (
            <li key={i} className="flex items-center gap-4 bg-white dark:bg-white/5 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-100 dark:border-white/5 font-mono text-[10px] sm:text-xs text-slate-700 dark:text-slate-300 shadow-sm">
              <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] sm:text-xs font-bold shadow-md shadow-indigo-100 dark:shadow-none flex-shrink-0">{i+1}</span>
              {feature.toUpperCase()}
            </li>
          ))}
        </ul>
      </section>

      <section className="glass rounded-[2rem] sm:rounded-[3rem] p-10 sm:p-16 text-center space-y-8 overflow-hidden relative shadow-2xl shadow-indigo-100/30 dark:shadow-none bg-white/40 dark:bg-white/5 border border-slate-100 dark:border-white/5">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 bg-indigo-50/50 dark:bg-indigo-500/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
        
        <h2 className="text-4xl sm:text-5xl font-syne font-extrabold relative z-10 text-slate-900 dark:text-white tracking-tighter uppercase">THE STUDIO.</h2>
        <p className="font-mono text-slate-500 dark:text-slate-400 relative z-10 text-base sm:text-lg">Collaborate with us to build the next generation of physical web tools.</p>
        
        <div className="flex flex-col xs:flex-row justify-center gap-4 sm:gap-6 relative z-10 pt-4">
          <a href="#" className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold font-syne hover:scale-105 transition-transform shadow-xl shadow-slate-200 dark:shadow-none text-sm">LINKEDIN</a>
          <a href="#" className="bg-indigo-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold font-syne hover:scale-105 transition-transform shadow-xl shadow-indigo-100 dark:shadow-none text-sm">GITHUB</a>
          <a href="#" className="bg-white dark:bg-transparent border-2 border-slate-100 dark:border-white/10 px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold font-syne hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-slate-900 dark:text-white shadow-sm text-sm">EMAIL US</a>
        </div>
      </section>
    </div>
  );
};

export default About;
