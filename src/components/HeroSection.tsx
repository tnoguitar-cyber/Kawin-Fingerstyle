import React from 'react';
import { Play, Music, ArrowRight, Youtube, Sparkles, Guitar } from 'lucide-react';
import { ARTIST_INFO, TRACKS } from '../data/mockData';

interface HeroSectionProps {
  onNavigate: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative bg-gradient-to-b from-slate-950 via-zinc-900 to-slate-950 text-slate-100 py-12 lg:py-16 border-b border-amber-500/10 overflow-hidden">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Vibrant Profile & Intro Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Avatar Profile Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden border-2 border-amber-500/30 shadow-2xl shadow-amber-950/50 bg-slate-900 group">
              <img
                src={ARTIST_INFO.profileImageUrl}
                alt={ARTIST_INFO.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5 text-left space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 backdrop-blur-md text-amber-300 text-xs font-semibold">
                  <Guitar className="w-3.5 h-3.5" />
                  <span>Acoustic Fingerstyle</span>
                </div>
                <h3 className="text-2xl font-bold text-white drop-shadow-md">{ARTIST_INFO.stageName}</h3>
              </div>
            </div>
          </div>

          {/* Bio & Official Links Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span>OFFICIAL ARTIST PROFILE & MUSIC</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {ARTIST_INFO.name}
              </h1>
              <p className="text-lg sm:text-xl font-medium text-amber-400/90 mt-2">
                {ARTIST_INFO.shortTagline}
              </p>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              {ARTIST_INFO.bio}
            </p>

            {/* Action Buttons & Streaming Links */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('albums')}
                  className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center gap-2"
                >
                  <Music className="w-4 h-4 fill-slate-950" />
                  <span>ฟังเพลงทั้งหมด</span>
                </button>

                <button
                  onClick={() => onNavigate('courses')}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-sm rounded-xl transition flex items-center gap-2"
                >
                  <span>ดูคอร์สเรียนกีตาร์</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>

              {/* Streaming Platforms Badges */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <span className="text-xs text-slate-400 font-medium">ฟังเพลงได้ทาง:</span>
                
                {/* Spotify */}
                <a
                  href={ARTIST_INFO.socials.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1.5 text-xs font-bold shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 4.38-1.38 9.841-.72 13.56 1.56.36.24.54.84.18 1.261zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z"/>
                  </svg>
                  <span>Spotify</span>
                </a>

                {/* Apple Music */}
                <a
                  href={ARTIST_INFO.socials.appleMusic}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-pink-950/60 border border-pink-500/30 text-pink-400 hover:text-pink-300 transition flex items-center gap-1.5 text-xs font-bold shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.65 1.36-.58.68-1.09 1.77-.95 2.82 1.01.08 2.05-.58 2.67-1.33z"/>
                  </svg>
                  <span>Apple Music</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Music Videos Section */}
        <div className="mt-14 pt-8 border-t border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h2 className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                FEATURED MUSIC VIDEOS
              </h2>
            </div>
            <button
              onClick={() => onNavigate('albums')}
              className="text-xs text-slate-300 hover:text-amber-400 transition flex items-center gap-1 font-semibold"
            >
              <span>ดูผลงานทั้งหมด</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRACKS.map((track) => (
              <div
                key={track.id}
                className="group rounded-2xl bg-slate-900/80 border border-slate-800 p-3.5 hover:border-amber-500/40 transition duration-300 flex flex-col justify-between shadow-lg shadow-slate-950/50"
              >
                <div>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 mb-3 border border-slate-800">
                    <img
                      src={track.thumbnailUrl}
                      alt={track.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-center justify-center">
                      <a
                        href={track.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center hover:scale-110 transition shadow-lg shadow-red-600/30"
                      >
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </a>
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition line-clamp-1">
                    {track.title}
                  </h4>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <a
                    href={track.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold"
                  >
                    <Youtube className="w-4 h-4" />
                    <span>รับชมบน YouTube</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
