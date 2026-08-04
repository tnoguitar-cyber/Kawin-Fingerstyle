import React from 'react';
import { Gift, Download, Youtube } from 'lucide-react';
import { FREE_TABS } from '../data/mockData';

export const FreeTabsSection: React.FC = () => {
  const getDifficultyColor = (diff: string) => {
    if (diff.includes('ง่าย')) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (diff.includes('ปานกลาง')) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-red-400 bg-red-500/10 border-red-500/30';
  };

  const getDifficultyStars = (diff: string) => {
    if (diff.includes('ง่าย')) return '★☆☆';
    if (diff.includes('ปานกลาง')) return '★★☆';
    return '★★★';
  };

  return (
    <section className="py-12 bg-slate-950 text-slate-100 border-b border-amber-500/10" id="free-tabs">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Title */}
        <div className="border-b border-slate-800 pb-6 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">
              <Gift className="w-3.5 h-3.5" />
              <span>FREE GUITAR TABS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              แจก TAB กีตาร์ฟรี (Free TABs)
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl leading-relaxed">
              โน้ตและ TAB กีตาร์คุณภาพดี แจกให้ดาวน์โหลดฟรีเพื่อนำไปใช้ในการฝึกซ้อมและพัฒนาทักษะการเล่นกีตาร์
            </p>
          </div>
        </div>

        {/* TAB Items Grid */}
        <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto md:mx-0">
          {FREE_TABS.map((tab) => (
            <div
              key={tab.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/40 transition duration-300 relative overflow-hidden group"
            >
              {/* Decorative background gift watermark */}
              <Gift className="absolute -right-4 -bottom-4 w-28 h-28 text-slate-800/10 group-hover:text-emerald-500/5 transition duration-500 pointer-events-none" />
              
              <div className="space-y-4 relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">
                    {tab.badge}
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${getDifficultyColor(tab.difficulty)}`}>
                      {tab.difficulty} <span className="font-mono">{getDifficultyStars(tab.difficulty)}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-400 font-bold font-mono">
                      FREE
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-400 transition leading-snug">
                    {tab.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                    {tab.description}
                  </p>
                </div>

                {/* Meta Specifications Box */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs font-mono text-slate-300 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[11px] text-slate-500 uppercase font-sans font-bold">การตั้งสาย (Tuning):</span>
                    <span className="text-amber-400 font-bold">{tab.tuning}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[11px] text-slate-500 uppercase font-sans font-bold">คาโป้ (Capo):</span>
                    <span className="text-slate-300 font-bold">{tab.capo || 'No Capo'}</span>
                  </div>
                  <div className="border-t border-slate-900 pt-2 mt-2 truncate text-[11px] font-semibold text-slate-400">
                    📄 {tab.fileName}
                  </div>
                </div>
              </div>

              {/* Actions Row */}
              <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center gap-3 relative z-10">
                <a
                  href={tab.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition shadow-lg flex items-center justify-center gap-2 border border-emerald-400/20"
                >
                  <Download className="w-4 h-4 text-slate-950" />
                  <span>ดาวน์โหลด PDF (Google Drive)</span>
                </a>

                {tab.youtubeUrl && (
                  <a
                    href={tab.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 hover:text-rose-300 font-bold text-xs transition border border-slate-700 flex items-center justify-center gap-1.5"
                  >
                    <Youtube className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>ฟัง / ดูวิดีโอสอน</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
