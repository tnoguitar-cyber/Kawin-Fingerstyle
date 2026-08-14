import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 transform animate-in fade-in slide-in-from-bottom-4">
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="group flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/60 dark:border-slate-700/50 shadow-lg shadow-black/10 dark:shadow-black/40 text-stone-800 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-white/70 dark:hover:bg-slate-900/70 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        <ChevronUp className="w-4 h-4 text-amber-500 group-hover:-translate-y-0.5 transition-transform duration-200" />
        <span className="text-xs font-bold font-mono tracking-tight">ขึ้นบนสุด</span>
      </button>
    </div>
  );
}
