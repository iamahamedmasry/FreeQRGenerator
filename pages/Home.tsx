
import React, { useState, useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { motion } from 'framer-motion';
import { PRESET_COLORS, BRAND_LOGOS } from '../constants';
import { QRStyle, QRConfig, ExportFormat } from '../types';

type DotType = 'square' | 'rounded' | 'extra-rounded' | 'dots' | 'classy' | 'classy-rounded';

const Home: React.FC = () => {
  const [config, setConfig] = useState<QRConfig & { dotType: DotType }>({
    value: 'https://google.com',
    dotColor: '#0f172a',
    bgColor: '#ffffff',
    style: 'default',
    errorCorrection: 'H',
    dotType: 'square'
  });

  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [activeFormat, setActiveFormat] = useState<ExportFormat>('png');
  const qrRef = useRef<HTMLDivElement>(null);
  const qrInstance = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    const logoUrl = config.style === 'custom' ? customLogo : BRAND_LOGOS[config.style];
    qrInstance.current = new QRCodeStyling({
      width: 400,
      height: 400,
      type: 'canvas',
      data: config.value,
      image: logoUrl || undefined,
      dotsOptions: { color: config.dotColor, type: config.dotType },
      backgroundOptions: { color: config.bgColor },
      imageOptions: { crossOrigin: 'anonymous', margin: 8, imageSize: 0.3 },
      qrOptions: { errorCorrectionLevel: 'H' }
    });
    if (qrRef.current) {
      qrRef.current.innerHTML = '';
      qrInstance.current.append(qrRef.current);
    }
  }, []);

  useEffect(() => {
    if (qrInstance.current) {
      const logoUrl = config.style === 'custom' ? customLogo : BRAND_LOGOS[config.style];
      qrInstance.current.update({
        data: config.value,
        image: logoUrl || undefined,
        dotsOptions: { color: config.dotColor, type: config.dotType },
        backgroundOptions: { color: config.bgColor }
      });
    }
  }, [config, customLogo]);

  const handleDownload = () => {
    if (qrInstance.current) {
      qrInstance.current.download({ name: `smartqr-${Date.now()}`, extension: activeFormat });
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomLogo(event.target?.result as string);
        setConfig(prev => ({ ...prev, style: 'custom' }));
      };
      reader.readAsDataURL(file);
    }
  };

  const dotTypes: { id: DotType; label: string }[] = [
    { id: 'square', label: 'Square' },
    { id: 'rounded', label: 'Rounded' },
    { id: 'extra-rounded', label: 'Smooth' },
    { id: 'dots', label: 'Dots' },
    { id: 'classy', label: 'Modern' }
  ];

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 sm:gap-12 items-start">
      {/* Controls Section */}
      <div className="w-full lg:col-span-7 space-y-8 sm:space-y-10">
        <header>
          <motion.h1 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-syne font-extrabold leading-tight text-slate-900 dark:text-white"
          >
            CREATE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400 dark:from-indigo-400 dark:to-indigo-300">DISTINCTION.</span>
          </motion.h1>
          <p className="mt-4 text-slate-500 dark:text-slate-400 font-mono text-base sm:text-lg max-w-md">
            Design professional, brand-aware QR codes optimized for all platforms.
          </p>
        </header>

        <section className="space-y-6 sm:space-y-8">
          {/* Destination URL */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">Destination Destination</label>
            <input 
              type="text"
              value={config.value}
              onChange={(e) => setConfig({ ...config, value: e.target.value })}
              placeholder="https://yourwebsite.com"
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl sm:rounded-2xl px-5 sm:px-6 py-4 sm:py-5 text-lg sm:text-xl font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700 text-slate-900 dark:text-white shadow-sm"
            />
          </div>

          {/* Module Style */}
          <div className="space-y-4">
            <label className="text-xs sm:text-sm font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">Dot Architecture</label>
            <div className="flex flex-wrap gap-2">
              {dotTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setConfig({ ...config, dotType: type.id })}
                  className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all border ${
                    config.dotType === type.id 
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/10' 
                    : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-indigo-400 dark:hover:border-indigo-400'
                  }`}
                >
                  {type.label.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Logo Presets */}
          <div className="space-y-4">
            <label className="text-xs sm:text-sm font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">Brand Identity</label>
            <div className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-7 gap-2 sm:gap-3">
              {(['default', 'facebook', 'instagram', 'youtube', 'tiktok', 'google', 'custom'] as QRStyle[]).map((style) => (
                <button
                  key={style}
                  onClick={() => setConfig({ ...config, style })}
                  className={`aspect-square rounded-xl sm:rounded-2xl flex items-center justify-center border transition-all relative group overflow-hidden ${
                    config.style === style 
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 shadow-md' 
                    : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm'
                  }`}
                >
                  {style === 'default' && <span className="text-[10px] font-bold font-syne text-slate-400 dark:text-slate-500">PLAIN</span>}
                  {style === 'custom' && (
                    <div className="flex flex-col items-center">
                      {customLogo ? <img src={customLogo} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover" /> : <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">SVG/IMG</span>}
                    </div>
                  )}
                  {BRAND_LOGOS[style] && (
                    <img src={BRAND_LOGOS[style]} className={`w-6 h-6 sm:w-8 sm:h-8 object-contain transition-all ${config.style === style ? 'grayscale-0' : 'grayscale opacity-50'}`} />
                  )}
                  {config.style === style && (
                    <motion.div layoutId="style-ring" className="absolute inset-0 border-2 border-indigo-500 rounded-xl sm:rounded-2xl" />
                  )}
                </button>
              ))}
            </div>
            {config.style === 'custom' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-2">
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" id="logo-upload" />
                <label htmlFor="logo-upload" className="block w-full text-center py-3 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-white/5">
                  {customLogo ? 'CHANGE LOGO' : 'UPLOAD PNG/JPG (RECOMMENDED 512x512)'}
                </label>
              </motion.div>
            )}
          </div>

          {/* Color Matrix */}
          <div className="space-y-4">
            <label className="text-xs sm:text-sm font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">Color Palette</label>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => setConfig({ ...config, dotColor: color.hex })}
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 transition-all hover:scale-110 shadow-sm ${
                    config.dotColor === color.hex ? 'border-indigo-600 dark:border-white scale-125' : 'border-white dark:border-slate-800'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              <div className="relative group">
                <input type="color" value={config.dotColor} onChange={(e) => setConfig({ ...config, dotColor: e.target.value })} className="opacity-0 absolute inset-0 w-full h-full cursor-pointer" />
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white dark:border-slate-800 shadow-sm bg-gradient-to-tr from-pink-400 via-purple-400 to-indigo-400 flex items-center justify-center text-lg hover:scale-110 transition-transform">🎨</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Preview Section */}
      <div className="w-full lg:col-span-5 lg:sticky lg:top-24 space-y-6 sm:space-y-8">
        <motion.div layout className="glass rounded-[2rem] p-6 sm:p-10 flex flex-col items-center justify-center relative overflow-hidden group shadow-xl shadow-slate-200/50 dark:shadow-none bg-white/40 dark:bg-white/5 border border-slate-100 dark:border-white/5">
          {/* Responsive container for canvas */}
          <div className="w-full max-w-[280px] sm:max-w-[340px] aspect-square flex items-center justify-center">
            <div 
              ref={qrRef} 
              className="p-3 sm:p-4 bg-white rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] border border-slate-100 [&>canvas]:max-w-full [&>canvas]:h-auto"
            />
          </div>

          <div className="mt-8 flex flex-col items-center gap-2">
            <p className="font-mono text-[10px] sm:text-xs text-indigo-500 dark:text-indigo-400 font-bold tracking-[0.2em] animate-pulse">LIVE GENERATION</p>
            <p className="text-[10px] text-slate-400 font-mono text-center px-4">Styles other than Square may be harder to scan on older devices.</p>
          </div>
        </motion.div>

        <div className="space-y-3 sm:space-y-4">
          <div className="flex bg-slate-100 dark:bg-white/5 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl gap-1 sm:gap-2 shadow-inner">
            {(['png', 'jpeg', 'webp'] as ExportFormat[]).map((fmt) => (
              <button key={fmt} onClick={() => setActiveFormat(fmt)} className={`flex-1 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold uppercase transition-all ${activeFormat === fmt ? 'bg-white dark:bg-indigo-500 text-indigo-600 dark:text-white shadow-sm' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}>
                {fmt}
              </button>
            ))}
          </div>
          
          <button onClick={handleDownload} className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl text-lg sm:text-xl font-syne font-bold transition-all shadow-xl shadow-indigo-100 dark:shadow-none active:scale-[0.98] flex items-center justify-center gap-3">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            EXPORT {activeFormat.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
