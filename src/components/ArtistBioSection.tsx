import React from 'react';
import { Sparkles, Sliders, Layers, Guitar, Award, Trophy, ExternalLink } from 'lucide-react';
import { ARTIST_INFO, ARTIST_GEARS, ARTIST_ACHIEVEMENTS } from '../data/mockData';

export const ArtistBioSection: React.FC = () => {
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
    <section className="py-12 bg-slate-950 text-slate-100 border-b border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-slate-800 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
              ARTIST BIOGRAPHY & PLAYING STYLE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              เกี่ยวกับ Kawin Fingerstyle
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              มือกีตาร์บรรเลง Fingerstyle 
            </p>
          </div>
        </div>

        {/* Bio & Techniques Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Bio Story with Kawin's Photo */}
          <div className="lg:col-span-6 bg-slate-900/90 border border-amber-500/20 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-500/40 shadow-lg shadow-amber-950/40 bg-slate-950 shrink-0">
                <img
                  src={ARTIST_INFO.profileImageUrl}
                  alt="Kawin"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{ARTIST_INFO.stageName}</h3>
                <p className="text-xs text-amber-400/90 font-medium">{ARTIST_INFO.realName}</p>
                <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded bg-amber-500/10 text-xs font-semibold text-amber-300">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Acoustic Fingerstyle Artist</span>
                </div>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed text-sm">
              {ARTIST_INFO.bio}
            </p>

            <div className="pt-3 border-t border-slate-800 flex flex-wrap gap-2 text-xs text-amber-300/80 font-medium">
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg">#KawinFingerstyle</span>
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg">#TheCloud</span>
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg">#ฤดูฝนที่แล้ว</span>
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg">#April</span>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">ACHIEVEMENTS & HONORS</h3>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-medium">
                {ARTIST_ACHIEVEMENTS.length} รายการ
              </span>
            </div>
            
            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {ARTIST_ACHIEVEMENTS.map((ach, idx) => (
                <div key={idx} className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex items-start gap-3 hover:border-amber-500/30 transition">
                  <div className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 font-extrabold text-xs font-mono shrink-0">
                    {ach.year}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-snug">{ach.title}</h4>
                    <span className="text-[10px] text-amber-400/80 font-medium">{ach.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Techniques Grid */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-4">
            PLAYING TECHNIQUES & STYLES
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {techniques.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2 hover:border-amber-500/40 transition duration-300 shadow-lg"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">{tech.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{tech.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Guitars & Gear List */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-4">
            GUITARS & EQUIPMENT
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {ARTIST_GEARS.map((gear, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition"
              >
                <div>
                  <span className="text-xs px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 font-medium">
                    {gear.category}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-2.5 mb-2">{gear.name}</h4>
                  
                  {gear.items && gear.items.length > 0 ? (
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {gear.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-center gap-2">
                          {item.url ? (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold underline decoration-amber-500/40 hover:decoration-amber-300 transition group"
                            >
                              <span>{item.name}</span>
                              <ExternalLink className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                              {item.badge && (
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-600/30 border border-blue-500/40 text-blue-300 no-underline font-normal">
                                  {item.badge}
                                </span>
                              )}
                            </a>
                          ) : (
                            <span className="text-slate-300">{item.name}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed whitespace-pre-line">{gear.description}</p>
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
