import React, { useState } from 'react';
import { Youtube, ExternalLink, Play, Sparkles } from 'lucide-react';
import { POPULAR_VIDEOS, ARTIST_INFO } from '../data/mockData';

export const DiscographySection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'youtube' | 'tiktok'>('all');

  const filteredVideos = POPULAR_VIDEOS.filter((v) => {
    if (filter === 'all') return true;
    return v.platform === filter;
  });

  return (
    <section className="py-12 bg-stone-50 dark:bg-slate-950 text-stone-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>POPULAR VIDEO GALLERY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
              คลัง Video ยอดนิยม (Kawin Fingerstyle)
            </h2>
            <p className="text-stone-500 dark:text-slate-400 text-sm mt-1">
              รวมคลิปการเล่นกีตาร์ Fingerstyle ยอดนิยม ทั้งบน YouTube และ TikTok
            </p>
          </div>

          {/* Social Quick Channel Links */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <a
              href={ARTIST_INFO.socials.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1.5 font-bold shadow-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 4.38-1.38 9.841-.72 13.56 1.56.36.24.54.84.18 1.261zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z"/>
              </svg>
              <span>Spotify Artist</span>
            </a>
            <a
              href={ARTIST_INFO.socials.appleMusic}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-pink-50 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400 hover:text-pink-300 transition flex items-center gap-1.5 font-bold shadow-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.65 1.36-.58.68-1.09 1.77-.95 2.82 1.01.08 2.05-.58 2.67-1.33z"/>
              </svg>
              <span>Apple Music</span>
            </a>
            <a
              href={ARTIST_INFO.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 hover:text-red-300 transition flex items-center gap-1.5 font-bold shadow-sm"
            >
              <Youtube className="w-4 h-4" />
              <span>YouTube</span>
            </a>
            <a
              href={ARTIST_INFO.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400 hover:text-cyan-300 transition flex items-center gap-1.5 font-bold shadow-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.29 0 .58.04.86.12V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 003 15.68a6.34 6.34 0 0010.86 4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.04z"/>
              </svg>
              <span>TikTok</span>
            </a>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              filter === 'all'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            ทั้งหมด ({POPULAR_VIDEOS.length})
          </button>
          <button
            onClick={() => setFilter('youtube')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              filter === 'youtube'
                ? 'bg-red-500 text-white shadow-md'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Youtube className="w-3.5 h-3.5" />
            <span>YouTube Videos</span>
          </button>
          <button
            onClick={() => setFilter('tiktok')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              filter === 'tiktok'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.29 0 .58.04.86.12V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 003 15.68a6.34 6.34 0 0010.86 4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.04z"/>
            </svg>
            <span>TikTok Viral Clips</span>
          </button>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white dark:bg-slate-900/40 rounded-2xl overflow-hidden flex flex-col justify-between hover:bg-stone-50 dark:hover:bg-slate-900/60 border border-stone-200/50 dark:border-none transition duration-300 shadow-sm dark:shadow-md group"
            >
              <div>
                {/* Media Container */}
                <div className="relative aspect-video bg-stone-100 dark:bg-slate-950 overflow-hidden">
                  {video.platform === 'youtube' && video.embedId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${video.embedId}`}
                      title={video.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    /* TikTok Video Card with Play Action */
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-full relative group/tt"
                    >
                      <img
                        src={video.thumbnailUrl || ARTIST_INFO.profileImageUrl}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover/tt:scale-105 transition duration-500 opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-lg group-hover/tt:scale-110 transition duration-300">
                          <Play className="w-7 h-7 fill-current ml-1" />
                        </div>
                      </div>
                      {/* TikTok Badge */}
                      <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-cyan-400 flex items-center gap-1">
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.29 0 .58.04.86.12V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 003 15.68a6.34 6.34 0 0010.86 4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.04z"/>
                        </svg>
                        <span>TikTok Video</span>
                      </div>
                    </a>
                  )}
                </div>

                {/* Info Container */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-amber-600 dark:text-amber-300 font-bold bg-amber-500/10 px-2 py-0.5 rounded-md">
                      {video.tag}
                    </span>
                    {video.views && <span className="text-stone-500 dark:text-slate-400 font-mono">{video.views}</span>}
                  </div>

                  <h4 className="text-sm font-bold text-stone-900 dark:text-white line-clamp-2 leading-snug">
                    {video.title}
                  </h4>
                </div>
              </div>

              {/* Action Footer */}
              <div className="px-4 py-3 bg-stone-50 dark:bg-slate-950/30 border-t border-stone-100 dark:border-none flex items-center justify-between text-xs">
                {video.platform === 'youtube' ? (
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-bold flex items-center gap-1.5 transition"
                  >
                    <Youtube className="w-4 h-4" />
                    <span>รับชมบน YouTube</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                ) : (
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 font-bold flex items-center gap-1.5 transition"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.29 0 .58.04.86.12V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 003 15.68a6.34 6.34 0 0010.86 4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.04z"/>
                    </svg>
                    <span>คลิกรับชมบน TikTok</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
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

