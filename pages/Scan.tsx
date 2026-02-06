
import React, { useState, useRef } from 'react';
import jsQR from 'jsqr';
import { motion, AnimatePresence } from 'framer-motion';

const Scan: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const applyPreProcessing = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const contrast = avg > 140 ? 255 : 0;
      data[i] = contrast; data[i + 1] = contrast; data[i + 2] = contrast;
    }
    ctx.putImageData(imageData, 0, 0);
    return imageData;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true); setError(null); setResult(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setPreview(event.target?.result as string);
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;
        canvas.width = img.width; canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let code = jsQR(imageData.data, imageData.width, imageData.height);
        if (!code) {
          imageData = applyPreProcessing(ctx, canvas.width, canvas.height);
          code = jsQR(imageData.data, imageData.width, imageData.height);
        }
        if (code) { setResult(code.data); } else { setError("Couldn't find a valid QR code. Try using a simpler module style or increasing the contrast of your QR dots."); }
        setLoading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 sm:space-y-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-syne font-extrabold text-slate-900 dark:text-white">
          SCANNER.
        </h1>
        <p className="font-mono text-slate-500 dark:text-slate-400 text-base sm:text-lg">
          Decode destination IDs from any image file.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:gap-8">
        <div className="glass rounded-[1.5rem] sm:rounded-[2rem] p-8 sm:p-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-white/10 hover:border-indigo-400 dark:hover:border-indigo-400 transition-colors relative group bg-white/40 dark:bg-white/5 shadow-lg shadow-slate-100 dark:shadow-none min-h-[300px] sm:min-h-[400px]">
          <input type="file" accept="image/*" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
          
          <AnimatePresence mode="wait">
            {!preview ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-4">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-indigo-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto text-3xl sm:text-4xl shadow-inner">📸</div>
                <p className="font-syne font-bold text-lg sm:text-xl text-slate-900 dark:text-white">Upload Brand Code</p>
                <p className="font-mono text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest">DRAG & DROP SUPPORTED</p>
              </motion.div>
            ) : (
              <motion.div key="preview" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative w-full max-w-[280px] sm:max-w-sm aspect-square overflow-hidden rounded-2xl border border-slate-100 dark:border-white/5 shadow-lg bg-white dark:bg-slate-900">
                <img src={preview} alt="Preview" className="w-full h-full object-contain p-4" />
                <div className="absolute inset-0 bg-white/20 dark:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <p className="text-white font-bold bg-slate-900 dark:bg-indigo-600 px-6 py-3 rounded-full shadow-xl text-xs uppercase tracking-widest">CHANGE IMAGE</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {loading && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center font-mono text-indigo-600 dark:text-indigo-400 font-bold animate-pulse text-sm">
              DECODING ARCHITECTURE...
            </motion.div>
          )}

          {error && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-6 sm:p-8 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 rounded-2xl sm:rounded-3xl text-amber-800 dark:text-amber-400 font-bold text-center shadow-sm space-y-2 text-sm sm:text-base">
              <p>⚠️ {error}</p>
              <p className="text-[10px] sm:text-xs font-mono font-normal opacity-70">Tip: Check if the code modules are clear and not overly distorted.</p>
            </motion.div>
          )}

          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 space-y-6 sm:space-y-8 shadow-2xl shadow-indigo-100/50 dark:shadow-none border border-indigo-50 dark:border-white/5 bg-white/60 dark:bg-white/5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-sm font-mono text-indigo-600 dark:text-indigo-400 font-bold tracking-widest uppercase">Decoded Payload</span>
                <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-green-50 dark:bg-green-900/20 rounded-full text-green-600 dark:text-green-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">SUCCESSFUL</span>
              </div>
              <div className="bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 font-mono text-base sm:text-xl break-all text-slate-800 dark:text-slate-200 shadow-inner">
                {result}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button onClick={copyToClipboard} className="flex-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-indigo-400 text-slate-700 dark:text-slate-300 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm text-sm">
                  COPY PAYLOAD
                </button>
                {result.startsWith('http') && (
                  <a href={result} target="_blank" rel="noopener noreferrer" className="flex-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white py-4 rounded-xl font-bold text-center transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-100 dark:shadow-none text-sm">
                    FOLLOW DESTINATION
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default Scan;
