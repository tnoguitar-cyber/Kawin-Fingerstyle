import React from 'react';
import { Youtube, Instagram, Facebook, ExternalLink, Mail, MessageCircle, Send } from 'lucide-react';
import { ARTIST_INFO } from '../data/mockData';
import { RealtimeVisitorCounter } from './RealtimeVisitorCounter';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-amber-500/10 pt-12 pb-10 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Kawin Bio & Social Icons */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-amber-500/40 bg-slate-900 shrink-0">
                <img src={ARTIST_INFO.profileImageUrl} alt="Kawin" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-base font-bold text-white tracking-tight block">
                  {ARTIST_INFO.name}
                </span>
                <span className="text-[11px] text-amber-400 font-medium">Acoustic Fingerstyle Artist</span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              {ARTIST_INFO.bio}
            </p>

            {/* Social & Contact Quick Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {/* Spotify */}
              <a
                href={ARTIST_INFO.socials.spotify}
                target="_blank"
                rel="noreferrer"
                title="Spotify"
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 hover:text-emerald-300 hover:border-emerald-500/30 transition flex items-center gap-1.5 text-xs font-semibold"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 4.38-1.38 9.841-.72 13.56 1.56.36.24.54.84.18 1.261zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z"/>
                </svg>
                <span>Spotify</span>
              </a>

              {/* Apple Music */}
              <a
                href={ARTIST_INFO.socials.appleMusic}
                target="_blank"
                rel="noreferrer"
                title="Apple Music"
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-pink-400 hover:text-pink-300 hover:border-pink-500/30 transition flex items-center gap-1.5 text-xs font-semibold"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.65 1.36-.58.68-1.09 1.77-.95 2.82 1.01.08 2.05-.58 2.67-1.33z"/>
                </svg>
                <span>Apple Music</span>
              </a>

              {/* TikTok */}
              <a
                href={ARTIST_INFO.socials.tiktok}
                target="_blank"
                rel="noreferrer"
                title="TikTok"
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/30 transition flex items-center gap-1.5 text-xs font-semibold"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.29 0 .58.04.86.12V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 003 15.68a6.34 6.34 0 0010.86 4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.04z"/>
                </svg>
                <span>TikTok</span>
              </a>

              {/* Facebook */}
              <a
                href={ARTIST_INFO.socials.facebook}
                target="_blank"
                rel="noreferrer"
                title="Facebook Page"
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-blue-400 hover:text-blue-300 hover:border-blue-500/30 transition flex items-center gap-1.5 text-xs font-semibold"
              >
                <Facebook className="w-3.5 h-3.5" />
                <span>Facebook</span>
              </a>

              {/* Instagram */}
              <a
                href={ARTIST_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                title="Instagram"
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-pink-400 hover:text-pink-300 hover:border-pink-500/30 transition flex items-center gap-1.5 text-xs font-semibold"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>

              {/* LINE OA */}
              <a
                href={ARTIST_INFO.lineOaUrl}
                target="_blank"
                rel="noreferrer"
                title="LINE OA"
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 hover:text-emerald-300 hover:border-emerald-500/30 transition flex items-center gap-1.5 text-xs font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>LINE Official</span>
              </a>

              {/* Email */}
              <a
                href={ARTIST_INFO.socials.email}
                title="Email"
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 hover:text-amber-300 hover:border-amber-500/30 transition flex items-center gap-1.5 text-xs font-semibold"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-amber-400 font-bold uppercase tracking-widest text-[11px]">
              เมนูหลัก
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-amber-300 transition">
                  หน้าแรก (Home)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('albums')} className="hover:text-amber-300 transition">
                  ผลงานเพลง
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tabs')} className="hover:text-amber-300 transition">
                  TAB เพลงแต่ง
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-amber-300 transition">
                  คอร์สเรียนกีตาร์
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-amber-300 transition">
                  ร้านค้า
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tour')} className="hover:text-amber-300 transition">
                  ติดต่องานแสดง
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact Links */}
          <div className="space-y-3">
            <h4 className="text-amber-400 font-bold uppercase tracking-widest text-[11px]">
              ช่องทางติดต่อหลัก
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a
                  href={ARTIST_INFO.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 flex items-center gap-1.5 transition font-semibold"
                >
                  <span className="text-amber-400 font-bold text-[11px]">🛒 ร้านจำหน่ายกีตาร์:</span>
                  <span className="text-white hover:underline">HappyHome Music</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href={ARTIST_INFO.lineOaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 flex items-center gap-1.5 transition"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>LINE: <strong className="text-white">@535pcjno</strong></span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${ARTIST_INFO.email}`}
                  className="hover:text-amber-300 flex items-center gap-1.5 transition"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{ARTIST_INFO.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={ARTIST_INFO.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 flex items-center gap-1.5 transition"
                >
                  <span className="text-cyan-400 font-bold text-[10px]">TikTok</span>
                  <span>@kawinfingerstyle</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href={ARTIST_INFO.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-300 flex items-center gap-1.5 transition"
                >
                  <Facebook className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Kawin Fingerstyle Page</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href={ARTIST_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-300 flex items-center gap-1.5 transition"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                  <span>kawin_phusrithet</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col items-center justify-center text-slate-500 text-[11px] gap-3">
          <RealtimeVisitorCounter />

          <div className="flex flex-col sm:flex-row items-center justify-between w-full text-slate-500 text-[11px] gap-2 pt-1">
            <p>
              © {new Date().getFullYear()} {ARTIST_INFO.name}{' '}
              <span
                onClick={() => window.dispatchEvent(new CustomEvent('open-admin-modal'))}
                className="select-none cursor-default"
              >
                (Kawin Fingerstyle)
              </span>
              . All rights reserved.
            </p>

            <p className="text-slate-500">
              Official Acoustic Fingerstyle Website
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
