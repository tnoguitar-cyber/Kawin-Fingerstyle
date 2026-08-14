import React, { useState } from 'react';
import { Sparkles, Sliders, Layers, Guitar, Award, Trophy, ExternalLink, Image as ImageIcon, X } from 'lucide-react';
import { ARTIST_INFO, ARTIST_GEARS, ARTIST_ACHIEVEMENTS } from '../data/mockData';
import { Achievement } from '../types';

export const ArtistBioSection: React.FC = () => {
  const [selectedAch, setSelectedAch] = useState<Achievement | null>(null);

  const techniques = [
    {
      title: 'Slap & Natural Harmonics',
      desc: 'การสแลปฝ่ามือลงบนเฟรต 12, 7 และ 5 เพื่อสร้างเสียงฮาร์โมนิกส์กังวานดังก้อง',
      icon: Sparkles,
    },
    {
      title: 'Percussive Body Hits',
      desc: 'การใช้ส้นมือขวาเคาะ Wrist Thump เลียนแบบเสียงเบสและจังหวะกลองอะคูสติก',
      icon: Guitar,
    },
    {
      title: 'Standard Fingerstyle',
      desc: 'การเรียบเรียงและบรรเลงทำนองด้วยสายมาตรฐาน (Standard Tuning) ได้อย่างลื่นไหลละมุนหู',
      icon: Sliders,
    },
    {
      title: 'Two-Handed Tapping',
      desc: 'การใช้นิ้วมือตบลงบนคอกีตาร์ เพื่อบรรเลงแนวทำนองและคอร์ดพร้อมกัน',
      icon: Layers,
    },
  ];

  return (
    <section className="py-12 bg-stone-50 dark:bg-slate-950 text-stone-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold block mb-1">
              ARTIST BIOGRAPHY & PLAYING STYLE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
              เกี่ยวกับ Kawin Fingerstyle
            </h2>
            <p className="text-stone-500 dark:text-slate-400 text-sm mt-1">
              มือกีตาร์บรรเลง Fingerstyle 
            </p>
          </div>
        </div>

        {/* Bio & Techniques Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Bio Story with Kawin's Photo & Qualifications */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900/40 border border-stone-200/50 dark:border-none rounded-2xl p-6 shadow-sm dark:shadow-md space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-500/20 shadow-lg shadow-amber-950/20 bg-stone-100 dark:bg-slate-950 shrink-0">
                <img
                  src={ARTIST_INFO.profileImageUrl}
                  alt="Kawin"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-white">{ARTIST_INFO.stageName}</h3>
                <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">{ARTIST_INFO.realName}</p>
                <div className="inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-xs font-bold text-amber-700 dark:text-amber-300 border border-amber-500/20">
                  <Award className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                  <span>Acoustic Fingerstyle Artist & Educator</span>
                </div>
              </div>
            </div>

            {/* Bio Introduction */}
            <p className="text-stone-700 dark:text-slate-200 leading-relaxed text-sm font-medium">
              {ARTIST_INFO.bio}
            </p>

            {/* Education & Qualifications */}
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-slate-950/80 border border-stone-200/60 dark:border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-stone-900 dark:text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                🎓 วุฒิการศึกษาและความเชี่ยวชาญทางดนตรี
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-600 dark:text-slate-300 leading-relaxed">
                {ARTIST_INFO.education?.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Works & Teaching System */}
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-slate-950/80 border border-stone-200/60 dark:border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-stone-900 dark:text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                🏆 ผลงานด้านดนตรีและสื่อการสอน
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-600 dark:text-slate-300 leading-relaxed">
                {ARTIST_INFO.worksAndMedia?.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Teaching Philosophy */}
            <div className="p-4 rounded-xl bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/20 space-y-1.5">
              <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300 font-bold text-xs">
                <span>💡 ปรัชญาการสอน</span>
              </div>
              <p className="text-xs text-stone-700 dark:text-amber-200/90 italic leading-relaxed">
                "{ARTIST_INFO.teachingPhilosophy}"
              </p>
            </div>

            <div className="pt-2 border-t border-stone-200 dark:border-slate-800/60 flex flex-wrap gap-2 text-xs text-amber-700 dark:text-amber-300/80 font-medium">
              <span className="px-3 py-1 bg-amber-500/5 rounded-lg">#KawinFingerstyle</span>
              <span className="px-3 py-1 bg-amber-500/5 rounded-lg">#KawinFingerstyleStudio</span>
              <span className="px-3 py-1 bg-amber-500/5 rounded-lg">#April</span>
              <span className="px-3 py-1 bg-amber-500/5 rounded-lg">#FirstStep</span>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900/40 border border-stone-200/50 dark:border-none rounded-2xl p-6 shadow-sm dark:shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                <h3 className="text-base font-bold text-stone-900 dark:text-white">ACHIEVEMENTS & HONORS</h3>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
                {ARTIST_ACHIEVEMENTS.length} รายการ
              </span>
            </div>
            
            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-stone-200 dark:scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {ARTIST_ACHIEVEMENTS.map((ach, idx) => (
                <div
                  key={idx}
                  onClick={() => (ach.imageUrl || ach.fbUrl) && setSelectedAch(ach)}
                  className={`p-3 bg-stone-50 dark:bg-slate-950/40 border border-stone-200/40 dark:border-none rounded-xl flex items-start justify-between gap-3 hover:bg-stone-100 dark:hover:bg-slate-950/80 transition group ${
                    ach.imageUrl || ach.fbUrl ? 'cursor-pointer' : ''
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="px-2.5 py-1 bg-amber-500/10 rounded-lg text-amber-600 dark:text-amber-300 font-extrabold text-xs font-mono shrink-0">
                      {ach.year}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-stone-900 dark:text-white leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-300 transition">{ach.title}</h4>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-[10px] text-amber-600 dark:text-amber-400/80 font-medium">{ach.category}</span>
                      </div>
                    </div>
                  </div>

                  {ach.imageUrl && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAch(ach);
                      }}
                      title="ดูรูปภาพผลงาน / หลักฐาน"
                      className="px-2 py-1 rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20 text-amber-600 dark:text-amber-300 group-hover:text-amber-700 dark:group-hover:text-amber-200 text-[10px] font-bold flex items-center gap-1 shrink-0 transition"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                      <span className="hidden sm:inline">รูปภาพ</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Achievement Image / Media Modal */}
        {selectedAch && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setSelectedAch(null)}
          >
            <div
              className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-amber-500/40 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedAch(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-stone-500 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white flex items-center justify-center transition border border-stone-200 dark:border-slate-700"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="space-y-1.5 pr-8">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30 font-bold text-[10px] font-mono">
                    {selectedAch.year}
                  </span>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400/90 font-semibold px-2 py-0.5 rounded bg-stone-100 dark:bg-slate-800 border border-stone-200 dark:border-slate-700">
                    {selectedAch.category}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-white leading-snug">
                  {selectedAch.title}
                </h3>
              </div>

              {/* Image Preview */}
              {selectedAch.imageUrl ? (
                <div className="rounded-xl overflow-hidden border border-stone-200 dark:border-slate-800 bg-stone-100 dark:bg-slate-950 relative group">
                  <img
                    src={selectedAch.imageUrl}
                    alt={selectedAch.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback if local image not found
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80';
                    }}
                    className="w-full h-auto max-h-[60vh] object-contain bg-black/40"
                  />
                </div>
              ) : (
                <div className="p-8 rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-center text-stone-500 dark:text-slate-400 text-xs">
                  📷 ไม่มีรูปภาพพรีวิว
                </div>
              )}

              {/* Caption / Description text */}
              {selectedAch.caption && (
                <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 leading-relaxed bg-stone-50 dark:bg-slate-950/80 p-3.5 rounded-xl border border-stone-200 dark:border-slate-800">
                  💡 {selectedAch.caption}
                </p>
              )}

              {/* Actions */}
              <div className="pt-2">
                <button
                  onClick={() => setSelectedAch(null)}
                  className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition shadow-md"
                >
                  ปิดหน้าต่าง
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Techniques Grid */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold mb-4">
            PLAYING TECHNIQUES & STYLES
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {techniques.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900/40 border border-stone-200/50 dark:border-none rounded-2xl p-5 space-y-2 hover:bg-stone-50 dark:hover:bg-slate-900/60 transition duration-300 shadow-sm dark:shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/5 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-stone-900 dark:text-white">{tech.title}</h4>
                  <p className="text-xs text-stone-500 dark:text-slate-400 leading-relaxed">{tech.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Guitars & Gear List */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold mb-4">
            GUITARS & EQUIPMENT
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {ARTIST_GEARS.map((gear, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900/40 border border-stone-200/50 dark:border-none rounded-2xl p-5 flex flex-col justify-between hover:bg-stone-50 dark:hover:bg-slate-900/60 transition shadow-sm dark:shadow-md"
              >
                <div>
                  <span className="text-xs px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 font-medium">
                    {gear.category}
                  </span>
                  <h4 className="text-sm font-bold text-stone-900 dark:text-white mt-2.5 mb-2">{gear.name}</h4>
                  
                  {gear.items && gear.items.length > 0 ? (
                    <ul className="space-y-1.5 text-xs text-stone-600 dark:text-slate-300">
                      {gear.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-center gap-2">
                          {item.url ? (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 font-semibold underline decoration-amber-500/40 hover:decoration-amber-300 transition group"
                            >
                              <span>{item.name}</span>
                              <ExternalLink className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                              {item.badge && (
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-600/30 text-blue-600 dark:text-blue-300 no-underline font-normal">
                                  {item.badge}
                                </span>
                              )}
                            </a>
                          ) : (
                            <span className="text-stone-600 dark:text-slate-300">{item.name}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-stone-500 dark:text-slate-400 mt-1 leading-relaxed whitespace-pre-line">{gear.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
