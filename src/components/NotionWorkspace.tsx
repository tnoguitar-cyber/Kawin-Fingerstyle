import React, { useState } from 'react';
import { 
  FileText, Music, BookOpen, ShoppingBag, Send, User, Gift, 
  ChevronRight, ExternalLink, Play, Calendar, Mail, Phone, 
  MapPin, Clock, Award, Star, Info, ListFilter, Grid, Search, 
  SlidersHorizontal, Check, Compass, Book, ArrowRight, Sparkles
} from 'lucide-react';
import { 
  ARTIST_INFO, ARTIST_ACHIEVEMENTS, TRACKS, FREE_TABS, 
  COURSES, PRODUCTS, CONCERT_DATES, CHILL_GROOVE_BAND 
} from '../data/mockData';
import { Course, Product, CartItem } from '../types';

interface NotionWorkspaceProps {
  onAddToCart: (item: Course | Product) => void;
  activeSubPage?: string;
  onNavigateSubPage?: (page: string) => void;
}

export const NotionWorkspace: React.FC<NotionWorkspaceProps> = ({ 
  onAddToCart,
}) => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tabFilter, setTabFilter] = useState<'all' | 'original' | 'freetab'>('all');
  const [expandedSyllabus, setExpandedSyllabus] = useState<string | null>(null);
  const [activeVideoModal, setActiveVideoModal] = useState<{ title: string; embedUrl: string } | null>(null);

  // Filter free and store tabs based on query
  const filteredFreeTabs = FREE_TABS.filter(tab => 
    tab.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tab.tuning.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#191919] font-sans selection:bg-[#E3E2E0] transition-colors duration-300 pb-20">
      
      {/* Cover Image Banner */}
      <div className="relative h-48 sm:h-64 md:h-72 w-full overflow-hidden bg-[#ECECED]">
        <img 
          src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1600&q=80" 
          alt="Kawin Cover" 
          className="w-full h-full object-cover opacity-90 filter brightness-[0.97] contrast-[1.01]"
        />
        <div className="absolute top-4 right-4 bg-white/85 hover:bg-white text-xs font-semibold px-2.5 py-1.5 rounded border border-[#E9E9E6] shadow-sm cursor-default transition flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Notion Workspace Template</span>
        </div>
      </div>

      {/* Profile & Header Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-16 sm:-mt-20 mb-8">
        
        {/* Overlapping Avatar */}
        <div className="relative inline-block">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-[4px] border-[#FBFBFA] bg-[#F1F1F0] shadow-md">
            <img 
              src={ARTIST_INFO.profileImageUrl} 
              alt="Kawin Profile" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="absolute bottom-1 right-1 text-2xl bg-white rounded-lg p-0.5 shadow-sm border border-[#E9E9E6]">🎸</span>
        </div>

        {/* Title Block */}
        <div className="mt-4 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#191919]">
            {ARTIST_INFO.name}
          </h1>
          <p className="text-[#5F5E5B] text-lg font-medium leading-relaxed max-w-2xl">
            {ARTIST_INFO.shortTagline}
          </p>
        </div>

        {/* Notion Style Properties Section */}
        <div className="mt-6 border-t border-[#E9E9E6] pt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5 text-[14px]">
          <div className="flex items-center gap-4 py-1">
            <span className="text-[#9B9A97] w-28 flex items-center gap-1.5">
              <User className="w-4 h-4" /> Role
            </span>
            <span className="text-[#191919] font-medium">Acoustic Fingerstyle Artist & Educator</span>
          </div>
          <div className="flex items-center gap-4 py-1">
            <span className="text-[#9B9A97] w-28 flex items-center gap-1.5">
              <Award className="w-4 h-4" /> Endorsement
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#ECF8F6] text-[#1C5D51] px-2 py-0.5 rounded text-xs font-semibold">
              Mayson Guitars Thailand
            </span>
          </div>
          <div className="flex items-center gap-4 py-1">
            <span className="text-[#9B9A97] w-28 flex items-center gap-1.5">
              <Mail className="w-4 h-4" /> Email
            </span>
            <a href={`mailto:${ARTIST_INFO.email}`} className="text-[#2383E2] hover:underline">
              {ARTIST_INFO.email}
            </a>
          </div>
          <div className="flex items-center gap-4 py-1">
            <span className="text-[#9B9A97] w-28 flex items-center gap-1.5">
              <Compass className="w-4 h-4" /> Channels
            </span>
            <div className="flex gap-2">
              <a href={ARTIST_INFO.socials.youtube} target="_blank" rel="noopener" className="text-[#2383E2] hover:underline font-semibold">YouTube</a>
              <span className="text-[#D3D2D0]">/</span>
              <a href={ARTIST_INFO.socials.facebook} target="_blank" rel="noopener" className="text-[#2383E2] hover:underline font-semibold">Facebook</a>
              <span className="text-[#D3D2D0]">/</span>
              <a href={ARTIST_INFO.socials.tiktok} target="_blank" rel="noopener" className="text-[#2383E2] hover:underline font-semibold">TikTok</a>
            </div>
          </div>
        </div>

        {/* Callout Box */}
        <div className="mt-6 p-4 rounded-lg bg-[#F2F1EE]/60 border border-[#E9E9E6] flex gap-3 text-[14px] text-[#37352F] leading-relaxed">
          <span className="text-xl select-none">💡</span>
          <div>
            <strong className="block font-semibold mb-0.5">ยินดีต้อนรับสู่คลังข้อมูล Kawin Fingerstyle</strong>
            หน้าเว็บบรรเลงฉบับมินิมอลนี้ถูกออกแบบตามสไตล์ Notion เพื่อความเป็นระเบียบและเข้าถึงง่ายที่สุด คุณสามารถดาวน์โหลดคลังแท็บฟรี, ค้นหาแท็บแต่ง, สมัครคอร์สเรียน หรือจองคิวแสดงสดได้อย่างสมบูรณ์แบบในหน้าเดียว
          </div>
        </div>

        {/* Database Views Navigation */}
        <div className="mt-8 border-b border-[#E9E9E6] flex flex-wrap gap-1">
          {[
            { id: 'home', label: '🏠 Dashboard', desc: 'ข้อมูลรวม' },
            { id: 'bio', label: '🏆 Bio & Gallery', desc: 'ประวัติและผลงาน' },
            { id: 'discography', label: '🎵 Discography', desc: 'ผลงานเพลง' },
            { id: 'tabs', label: '📝 Guitar TABs', desc: 'แท็บกีตาร์' },
            { id: 'courses', label: '🎓 Courses', desc: 'คอร์สออนไลน์' },
            { id: 'merch', label: '🛍️ Store', desc: 'สินค้าสะสม' },
            { id: 'tour', label: '📅 Tour & Contact', desc: 'ตารางแสดงสด' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 text-[14px] font-medium border-b-2 transition flex items-center gap-1.5 ${
                activeTab === tab.id 
                  ? 'border-[#37352F] text-[#37352F] font-semibold' 
                  : 'border-transparent text-[#5F5E5B] hover:text-[#191919] hover:bg-[#F2F1EE]/30'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Workspace Body */}
        <div className="mt-8">
          
          {/* ==================== DASHBOARD TAB ==================== */}
          {activeTab === 'home' && (
            <div className="space-y-8">
              
              {/* Introduction Profile Info */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                
                {/* Left Profile Detail */}
                <div className="md:col-span-7 space-y-4">
                  <h3 className="text-lg font-bold text-[#191919] pb-1.5 border-b border-[#E9E9E6] flex items-center gap-2">
                    <Info className="w-4 h-4 text-slate-500" />
                    <span>เกี่ยวกับกวิน (Kawin Fingerstyle)</span>
                  </h3>
                  <p className="text-sm text-[#37352F] leading-relaxed">
                    {ARTIST_INFO.bio}
                  </p>
                  <p className="text-sm text-[#37352F] leading-relaxed">
                    สร้างชื่อเสียงในฐานะมือกีตาร์ฟิงเกอร์สไตล์จากการชนะเลิศการประกวดระดับประเทศสองรายการใหญ่อย่าง <strong className="font-semibold">Crafter Guitar Contest</strong> และ <strong className="font-semibold">Overdrive Acoustic Guitar Contest</strong> นอกเหนือจากงานดนตรีบรรเลงแล้ว เขายังอุทิศตัวให้กับการแนะแนวและสอนเพื่อพัฒนาคอมมูนิตี้คนรักกีตาร์ฟิงเกอร์สไตล์ในประเทศไทยอย่างเป็นกันเอง
                  </p>
                  
                  {/* Social Buttons Block */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <a 
                      href={ARTIST_INFO.socials.youtube} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FEF2F2] border border-[#FCA5A5]/30 text-[#DC2626] text-xs font-semibold hover:bg-red-100 transition"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>YouTube Channel</span>
                    </a>
                    <a 
                      href={ARTIST_INFO.socials.lineOa} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0]/30 text-[#059669] text-xs font-semibold hover:bg-emerald-100 transition"
                    >
                      <span>Line OA: @535pcjno</span>
                    </a>
                  </div>
                </div>

                {/* Right Quick stats & Gear */}
                <div className="md:col-span-5 space-y-4 bg-[#F7F7F5] p-5 rounded-xl border border-[#E9E9E6]">
                  <h4 className="font-bold text-sm text-[#37352F] uppercase tracking-wider">🎸 My Main Gear (อุปกรณ์คู่ใจ)</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex gap-2">
                      <span className="text-[#9B9A97]">🏷️ Guitar:</span>
                      <span className="font-medium text-[#191919]">Mayson MS5 (Thailand Artist Endorser)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#9B9A97]">🔌 Strings:</span>
                      <span className="font-medium text-[#191919]">Rotosound Guitar Strings</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#9B9A97]">🎵 Tunings:</span>
                      <span className="font-medium text-[#191919]">Standard, DADGAD, CGDGAD, Open G</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#9B9A97]">🎓 Students:</span>
                      <span className="font-medium text-[#191919]">1,200+ online & on-site class students</span>
                    </li>
                  </ul>
                  
                  <div className="pt-2 border-t border-[#E9E9E6] text-xs text-[#5F5E5B] italic leading-relaxed">
                    "{ARTIST_INFO.featuredQuote}"
                  </div>
                </div>

              </div>

              {/* YouTube Showcase Row */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#191919] pb-1.5 border-b border-[#E9E9E6] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>วิดีโอบรรเลงแนะนำ (Featured Videos)</span>
                  </div>
                  <button 
                    onClick={() => setActiveTab('discography')}
                    className="text-xs text-[#2383E2] hover:underline"
                  >
                    ดูวิดีโอทั้งหมด →
                  </button>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {TRACKS.slice(0, 3).map((track) => (
                    <div key={track.id} className="bg-white border border-[#E9E9E6] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                      <div className="relative aspect-video bg-[#ECECED]">
                        <img 
                          src={track.thumbnailUrl} 
                          alt={track.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                          <a 
                            href={track.youtubeUrl} 
                            target="_blank" 
                            rel="noopener" 
                            className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center hover:scale-105 transition shadow-md"
                          >
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </a>
                        </div>
                      </div>
                      <div className="p-3">
                        <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded uppercase tracking-wider">
                          Acoustic Performance
                        </span>
                        <h4 className="text-sm font-bold text-[#191919] mt-1.5 line-clamp-1">{track.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ==================== BIO & ACHIEVEMENTS TAB ==================== */}
          {activeTab === 'bio' && (
            <div className="space-y-6">
              <div className="p-4 bg-amber-50/50 border border-amber-200/50 rounded-lg text-sm text-[#78350F] flex items-start gap-2.5">
                <Info className="w-4 h-4 mt-0.5" />
                <div>
                  <strong>คลังเกียรติประวัติ & ภาพถ่ายทางการ</strong>
                  คุณสามารถคลิกชมภาพบรรยากาศการแข่งขัน ภาพคณะกรรมการตัดสิน และภาพถ่ายออฟฟิเชียลงานต่าง ๆ ที่ส่งตรงจากคลัง Google Drive ของกวินได้ทันทีโดยการคลิกที่รายการเกียรติประวัติ
                </div>
              </div>

              {/* Achievements Table */}
              <div className="border border-[#E9E9E6] rounded-xl overflow-hidden bg-white shadow-sm">
                <div className="bg-[#F7F7F5] border-b border-[#E9E9E6] px-4 py-2 text-xs font-bold uppercase text-[#5F5E5B] grid grid-cols-12 gap-4">
                  <div className="col-span-2">ปี (Year)</div>
                  <div className="col-span-6">รายการและรางวัล (Award / Role)</div>
                  <div className="col-span-4">ประเภท (Category)</div>
                </div>
                
                <div className="divide-y divide-[#E9E9E6]">
                  {ARTIST_ACHIEVEMENTS.map((ach, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => ach.imageUrl && setSelectedAchievement(ach)}
                      className={`px-4 py-3 text-sm grid grid-cols-12 gap-4 items-center transition ${
                        ach.imageUrl ? 'cursor-pointer hover:bg-amber-50/20 group' : ''
                      }`}
                    >
                      {/* Year */}
                      <div className="col-span-2 text-amber-600 font-bold">{ach.year}</div>
                      
                      {/* Title */}
                      <div className="col-span-6 font-semibold text-[#191919]">
                        <div className="flex items-center gap-1.5">
                          <span>{ach.title}</span>
                          {ach.imageUrl && (
                            <span className="text-[11px] text-amber-600 font-medium px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200/50 opacity-80 group-hover:opacity-100 transition">
                              📷 ดูรูปจริง
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Category */}
                      <div className="col-span-4">
                        <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${
                          ach.category === 'Artist & Jury' ? 'bg-[#ECF8F6] text-[#1C5D51]' :
                          ach.category === 'Contest Winner' ? 'bg-[#FEF2F2] text-[#991B1B]' :
                          ach.category === 'Brand Endorser' ? 'bg-[#EFF6FF] text-[#1E40AF]' :
                          'bg-[#F3F4F6] text-[#374151]'
                        }`}>
                          {ach.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* High Fidelity Gallery of Official Images */}
              <div className="space-y-4 pt-4">
                <h3 className="text-base font-bold text-[#191919] flex items-center gap-2">
                  <Award className="w-4.5 h-4.5 text-amber-500" />
                  <span>ภาพผลงานเด่นที่ได้รับการตรวจสอบแล้ว (Verified Career Showcase)</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {ARTIST_ACHIEVEMENTS.filter(a => a.imageUrl).slice(0, 4).map((ach, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white border border-[#E9E9E6] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div className="aspect-[4/3] bg-slate-900 overflow-hidden relative group">
                        <img 
                          src={ach.imageUrl} 
                          alt={ach.title}
                          className="w-full h-full object-cover transition duration-300 group-hover:scale-102"
                          onError={(e) => {
                            // Fallback inside image logic
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition" />
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-amber-600">{ach.year}</span>
                          <span className="bg-[#F2F1EE] px-2 py-0.5 rounded text-[#37352F]">{ach.category}</span>
                        </div>
                        <h4 className="text-sm font-bold text-[#191919] leading-tight">{ach.title}</h4>
                        <p className="text-xs text-[#5F5E5B] leading-relaxed italic">{ach.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievement Image Modal Overlay */}
              {selectedAchievement && (
                <div 
                  className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4"
                  onClick={() => setSelectedAchievement(null)}
                >
                  <div 
                    className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-2xl w-full border border-[#E9E9E6] relative animate-in fade-in zoom-in duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="relative aspect-video bg-black flex items-center justify-center">
                      <img 
                        src={selectedAchievement.imageUrl} 
                        alt={selectedAchievement.title}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80';
                        }}
                      />
                      <button 
                        onClick={() => setSelectedAchievement(null)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="p-5 bg-[#FBFBFA]">
                      <span className="text-xs font-bold text-amber-600">{selectedAchievement.year} • {selectedAchievement.category}</span>
                      <h4 className="text-base font-extrabold text-[#191919] mt-1 leading-tight">{selectedAchievement.title}</h4>
                      <p className="text-sm text-[#37352F] mt-2 italic border-l-2 border-amber-400 pl-3 leading-relaxed">
                        {selectedAchievement.caption}
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ==================== DISCOGRAPHY TAB ==================== */}
          {activeTab === 'discography' && (
            <div className="space-y-6">
              
              {/* Albums Gallery */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {TRACKS.map((track) => (
                  <div key={track.id} className="bg-white border border-[#E9E9E6] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
                    <div>
                      <div className="relative aspect-video bg-slate-900">
                        <img 
                          src={track.thumbnailUrl} 
                          alt={track.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                          <a 
                            href={track.youtubeUrl} 
                            target="_blank" 
                            rel="noopener" 
                            className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center hover:scale-105 transition shadow-md"
                          >
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </a>
                        </div>
                      </div>
                      
                      <div className="p-4 space-y-2">
                        <div className="flex gap-2 text-[11px] font-bold">
                          <span className="text-[#3b82f6] uppercase">Acoustic Single</span>
                          <span className="text-[#9B9A97]">•</span>
                          <span className="text-[#37352F]">Key: {track.key}</span>
                        </div>
                        <h4 className="text-sm font-bold text-[#191919] line-clamp-1">{track.title}</h4>
                        <p className="text-xs text-[#5F5E5B] italic">Tuning: {track.tuning}</p>
                      </div>
                    </div>

                    <div className="px-4 py-3 border-t border-[#E9E9E6] bg-[#F7F7F5] flex justify-between items-center text-xs">
                      <span className="text-[#5F5E5B]">⏱️ {track.duration} Mins</span>
                      <a 
                        href={track.youtubeUrl} 
                        target="_blank" 
                        rel="noopener" 
                        className="font-bold text-red-600 hover:underline flex items-center gap-1"
                      >
                        <span>ชมบน YouTube</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ==================== GUITAR TABS TAB ==================== */}
          {activeTab === 'tabs' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E9E9E6]">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="ค้นหาชื่อเพลง หรือตั้งสาย (เช่น DADGAD, Standard)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-[#E9E9E6] rounded-lg pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-[#191919]"
                  />
                </div>
                
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => setTabFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                      tabFilter === 'all' 
                        ? 'bg-amber-100 text-amber-800 border-amber-300' 
                        : 'bg-white border-[#E9E9E6] text-[#37352F] hover:bg-[#F2F1EE]'
                    }`}
                  >
                    ทั้งหมด
                  </button>
                  <button 
                    onClick={() => setTabFilter('original')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                      tabFilter === 'original' 
                        ? 'bg-amber-100 text-amber-800 border-amber-300' 
                        : 'bg-white border-[#E9E9E6] text-[#37352F] hover:bg-[#F2F1EE]'
                    }`}
                  >
                    TAB เพลงแต่ง
                  </button>
                  <button 
                    onClick={() => setTabFilter('freetab')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                      tabFilter === 'freetab' 
                        ? 'bg-amber-100 text-amber-800 border-amber-300' 
                        : 'bg-white border-[#E9E9E6] text-[#37352F] hover:bg-[#F2F1EE]'
                    }`}
                  >
                    แจก TAB ฟรี
                  </button>
                </div>
              </div>

              {/* Free Guitar TABs Database style Table */}
              {(tabFilter === 'all' || tabFilter === 'freetab') && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase text-[#5F5E5B] tracking-wider flex items-center gap-1.5">
                    <Gift className="w-4 h-4 text-emerald-600" />
                    <span>คลังแท็บแจกฟรีดาวน์โหลด (Free Download Tabs DB)</span>
                  </h3>
                  
                  <div className="border border-[#E9E9E6] rounded-xl overflow-hidden bg-white shadow-sm">
                    <div className="bg-[#F7F7F5] border-b border-[#E9E9E6] px-4 py-2 text-xs font-bold uppercase text-[#5F5E5B] grid grid-cols-12 gap-3">
                      <div className="col-span-5 sm:col-span-6">ชื่อเพลง (Title)</div>
                      <div className="col-span-3 sm:col-span-2">การตั้งสาย (Tuning)</div>
                      <div className="col-span-2">ระดับ (Difficulty)</div>
                      <div className="col-span-2">การกระทำ (Action)</div>
                    </div>
                    
                    <div className="divide-y divide-[#E9E9E6]">
                      {filteredFreeTabs.map((item) => (
                        <div key={item.id} className="px-4 py-3.5 text-sm grid grid-cols-12 gap-3 items-center hover:bg-slate-50 transition">
                          <div className="col-span-5 sm:col-span-6 font-bold text-[#191919]">
                            <div>{item.title}</div>
                            <span className="text-xs text-[#5F5E5B] font-normal">{item.description}</span>
                          </div>
                          
                          <div className="col-span-3 sm:col-span-2 text-xs font-medium text-[#37352F]">{item.tuning}</div>
                          
                          <div className="col-span-2">
                            <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded ${
                              item.difficulty.includes('ง่าย') ? 'bg-emerald-50 text-emerald-700' :
                              item.difficulty.includes('ปานกลาง') ? 'bg-amber-50 text-amber-700' :
                              'bg-red-50 text-red-700'
                            }`}>
                              {item.difficulty.replace(/\s*\(.*\)/, '')}
                            </span>
                          </div>
                          
                          <div className="col-span-2">
                            <a 
                              href={item.driveUrl} 
                              target="_blank" 
                              rel="noopener" 
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#ECF8F6] text-[#1C5D51] text-xs font-bold hover:bg-[#DDF3F0] transition"
                            >
                              <span>โหลดฟรี</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Store Products */}
              {(tabFilter === 'all' || tabFilter === 'original') && (
                <div className="space-y-4 pt-4">
                  <h3 className="text-sm font-bold uppercase text-[#5F5E5B] tracking-wider flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-amber-600" />
                    <span>หนังสือคอลเลกชัน TAB และโน้ตเพลงแต่งลิขสิทธิ์</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {PRODUCTS.filter(p => p.category.includes('TAB')).map((item) => (
                      <div key={item.id} className="bg-white border border-[#E9E9E6] rounded-xl overflow-hidden p-4 shadow-sm hover:shadow-md transition flex gap-4">
                        <div className="w-24 h-32 sm:w-28 sm:h-36 rounded-lg overflow-hidden bg-[#F7F7F5] border border-[#E9E9E6] p-1.5 flex-shrink-0 flex items-center justify-center">
                          <img 
                            src={item.imageUrl} 
                            alt={item.thaiName} 
                            className="w-full h-full object-contain drop-shadow-sm"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded uppercase tracking-wide">
                              {item.category}
                            </span>
                            <h4 className="text-sm font-bold text-[#191919] mt-1.5 leading-tight">{item.thaiName}</h4>
                            <p className="text-xs text-[#5F5E5B] mt-1 line-clamp-2">{item.description}</p>
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <span className="font-extrabold text-[#191919] text-base">{item.price} ฿</span>
                            <button 
                              onClick={() => onAddToCart(item)}
                              className="px-3 py-1.5 rounded-lg bg-[#37352F] hover:bg-[#2C2A26] text-white text-xs font-bold transition flex items-center gap-1"
                            >
                              <span>หยิบลงตะกร้า</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ==================== COURSES TAB ==================== */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {COURSES.map((course) => (
                  <div key={course.id} className="bg-white border border-[#E9E9E6] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
                    <div>
                      <div className="relative aspect-video bg-[#ECECED]">
                        <img 
                          src={course.coverUrl} 
                          alt={course.thaiTitle} 
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 left-3 bg-white/90 border border-[#E9E9E6] text-[10px] font-bold text-[#37352F] px-2 py-1 rounded">
                          {course.level}
                        </span>
                      </div>

                      <div className="p-4 space-y-3">
                        <div>
                          <h4 className="text-base font-extrabold text-[#191919] leading-tight">{course.thaiTitle}</h4>
                          <p className="text-xs text-[#5F5E5B] mt-1">{course.subtitle}</p>
                        </div>

                        <p className="text-xs text-[#37352F] leading-relaxed line-clamp-3">
                          {course.description}
                        </p>

                        {/* Expandable Syllabus preview */}
                        <div className="border border-[#E9E9E6] rounded-lg overflow-hidden text-xs">
                          <button 
                            onClick={() => setExpandedSyllabus(expandedSyllabus === course.id ? null : course.id)}
                            className="w-full px-3 py-2 bg-[#F7F7F5] flex justify-between items-center font-bold text-[#37352F]"
                          >
                            <span>📖 ดูรายละเอียดบทเรียนภายในคอร์ส</span>
                            <ChevronRight className={`w-3.5 h-3.5 transition ${expandedSyllabus === course.id ? 'rotate-90' : ''}`} />
                          </button>
                          
                          {expandedSyllabus === course.id && (
                            <div className="p-3 bg-white space-y-2.5 max-h-48 overflow-y-auto divide-y divide-slate-100">
                              {course.syllabus.map((sect, sIdx) => (
                                <div key={sIdx} className="pt-2 first:pt-0">
                                  <h5 className="font-bold text-[#191919] text-[11px]">{sect.sectionTitle}</h5>
                                  <ul className="list-disc pl-4 space-y-0.5 mt-1 text-[#5F5E5B]">
                                    {sect.lessons.map((les, lIdx) => (
                                      <li key={lIdx}>{les.title} ({les.duration})</li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Features bullet points */}
                        <div className="flex flex-wrap gap-1.5">
                          {course.features.slice(0, 3).map((feat, idx) => (
                            <span key={idx} className="bg-slate-100 text-[#37352F] text-[10px] font-medium px-2 py-0.5 rounded">
                              ✓ {feat}
                            </span>
                          ))}
                        </div>

                        {course.youtubeEmbedUrl && (
                          <button
                            onClick={() => setActiveVideoModal({
                              title: `🎬 วิดีโอแนะนำ ${course.thaiTitle}`,
                              embedUrl: course.youtubeEmbedUrl!
                            })}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-800 border border-red-200 text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer mt-2"
                          >
                            <Play className="w-3.5 h-3.5 text-red-600 fill-current" />
                            <span>🎬 ดูวิดีโอแนะนำเว็บไซต์</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="px-4 py-3 border-t border-[#E9E9E6] bg-[#F7F7F5] flex justify-between items-center">
                      <div>
                        {course.discountPrice ? (
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-extrabold text-base text-[#191919]">{course.discountPrice} ฿</span>
                            <span className="text-xs text-[#9B9A97] line-through">{course.price} ฿</span>
                          </div>
                        ) : (
                          <span className="font-extrabold text-base text-[#191919]">{course.price} ฿</span>
                        )}
                        {course.durationHours === 999 ? (
                          <span className="block text-[10px] text-[#5F5E5B]">⏱️ ใช้งานได้ไม่จำกัด (ตลอดชีพ)</span>
                        ) : (
                          <span className="block text-[10px] text-[#5F5E5B]">⏱️ รวม {course.durationHours} ชั่วโมง ({course.totalLessons} บทเรียน)</span>
                        )}
                      </div>
                      
                      {course.externalUrl ? (
                        <a
                          href={course.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold rounded-lg transition shadow-sm flex items-center gap-1"
                        >
                          <span>เข้าใช้งานเครื่องมือ</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <button 
                          onClick={() => onAddToCart(course)}
                          className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-lg transition shadow-sm cursor-pointer"
                        >
                          สมัครเรียนด่วน
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ==================== MERCHANDISE TAB ==================== */}
          {activeTab === 'merch' && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {PRODUCTS.map((item) => (
                  <div key={item.id} className="bg-white border border-[#E9E9E6] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
                    <div>
                      <div className="relative aspect-[3/4] bg-[#F7F7F5] border-b border-[#E9E9E6] p-3 flex items-center justify-center">
                        <img 
                          src={item.imageUrl} 
                          alt={item.thaiName} 
                          className="w-full h-full object-contain rounded-lg drop-shadow-sm"
                        />
                        {item.badge && (
                          <div className="absolute top-2 left-2 right-2 px-2 py-0.5 bg-[#191919]/90 backdrop-blur-md text-amber-300 font-mono text-[9px] font-bold rounded shadow text-center">
                            {item.badge}
                          </div>
                        )}
                        {!item.inStock && (
                          <span className="absolute inset-0 bg-white/70 flex items-center justify-center font-bold text-[#9B9A97]">
                            สินค้าหมดชั่วคราว
                          </span>
                        )}
                      </div>

                      <div className="p-4 space-y-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{item.category}</span>
                        <h4 className="text-sm font-bold text-[#191919] leading-tight">{item.thaiName}</h4>
                        <p className="text-xs text-[#5F5E5B] line-clamp-3 leading-relaxed whitespace-pre-line">{item.description}</p>

                        {item.youtubeEmbedUrl && (
                          <button
                            onClick={() => setActiveVideoModal({
                              title: `🎬 วิดีโอตัวอย่าง ${item.thaiName}`,
                              embedUrl: item.youtubeEmbedUrl!
                            })}
                            className="mt-2 w-full px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>🎬 ดูวิดีโอตัวอย่างประกอบ</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="px-4 py-3 border-t border-[#E9E9E6] bg-[#F7F7F5] flex justify-between items-center">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-extrabold text-[#191919] text-base">{item.price} ฿</span>
                        {item.originalPrice && (
                          <span className="text-xs text-stone-400 line-through">{item.originalPrice} ฿</span>
                        )}
                      </div>
                      <button 
                        onClick={() => onAddToCart(item)}
                        disabled={!item.inStock}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                          item.inStock 
                            ? 'bg-[#37352F] hover:bg-[#2C2A26] text-white' 
                            : 'bg-[#ECECED] text-[#9B9A97] cursor-not-allowed'
                        }`}
                      >
                        <span>หยิบลงตะกร้า</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ==================== TOUR & BOOKING TAB ==================== */}
          {activeTab === 'tour' && (
            <div className="space-y-8">
              
              {/* Chill Groove band description and pricing table */}
              <div className="bg-[#F7F7F5] border border-[#E9E9E6] rounded-xl p-5 md:p-6 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-extrabold text-[#191919]">{CHILL_GROOVE_BAND.name} (Acoustic Folk Band)</h3>
                    <p className="text-xs text-[#5F5E5B] mt-0.5">{CHILL_GROOVE_BAND.tagline}</p>
                  </div>
                  <a 
                    href={CHILL_GROOVE_BAND.youtubeUrl} 
                    target="_blank" 
                    rel="noopener" 
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FEF2F2] border border-red-200 text-[#DC2626] text-xs font-semibold hover:bg-red-100 transition w-fit"
                  >
                    <span>ชมคลิปการแสดงสด</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Rate Table */}
                <div className="border border-[#E9E9E6] rounded-lg overflow-hidden bg-white text-xs">
                  <div className="bg-[#F2F1EE] border-b border-[#E9E9E6] px-3.5 py-2 font-bold uppercase text-[#37352F] grid grid-cols-12 gap-2">
                    <div className="col-span-4">รูปแบบวงดนตรี (Lineup)</div>
                    <div className="col-span-5">รายละเอียดสมาชิก</div>
                    <div className="col-span-3">ราคาเริ่มต้น (กรุงเทพ / ต่างจังหวัด)</div>
                  </div>
                  <div className="divide-y divide-[#E9E9E6]">
                    {CHILL_GROOVE_BAND.rates.map((rate: any) => (
                      <div key={rate.id} className="px-3.5 py-2.5 grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-4 font-bold text-[#191919]">
                          <div>{rate.title}</div>
                          <span className="text-[10px] text-amber-700 font-medium px-1.5 py-0.2 bg-amber-50 rounded mt-1 inline-block">{rate.badge}</span>
                        </div>
                        <div className="col-span-5 text-[#37352F]">{rate.lineup}</div>
                        <div className="col-span-3 text-right">
                          <strong className="text-[#191919] font-bold">{rate.priceLocal}</strong>
                          <span className="text-[#9B9A97] block text-[10px]">ต่างจังหวัด: {rate.priceOutstation}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Concert Dates List */}
              <div className="space-y-4">
                <h3 className="text-base font-extrabold text-[#191919] border-b border-[#E9E9E6] pb-2 flex items-center gap-2">
                  <Calendar className="w-4.5 h-4.5 text-amber-500" />
                  <span>ตารางการแสดงคอนเสิร์ต & ทัวร์แสดงสด (Concert Tour Dates)</span>
                </h3>

                <div className="divide-y divide-[#E9E9E6] border border-[#E9E9E6] rounded-xl overflow-hidden bg-white shadow-sm">
                  {CONCERT_DATES.map((show) => (
                    <div key={show.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-50 transition">
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                          📅 {show.date}
                        </span>
                        <h4 className="text-sm font-bold text-[#191919] pt-1">{show.eventTitle}</h4>
                        <div className="flex items-center gap-1.5 text-xs text-[#5F5E5B]">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{show.venue} • {show.city}</span>
                        </div>
                      </div>

                      <div>
                        <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                          show.ticketStatus === 'เปิดขายบัตร' ? 'bg-[#ECF8F6] text-[#1C5D51]' :
                          show.ticketStatus === 'เหลือน้อย' ? 'bg-[#FFFBEB] text-[#92400E] animate-pulse' :
                          show.ticketStatus === 'เข้าชมฟรี' ? 'bg-[#EFF6FF] text-[#1E40AF]' :
                          'bg-[#F3F4F6] text-[#9B9A97]'
                        }`}>
                          {show.ticketStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information & Inquiry Instructions */}
              <div className="p-5 bg-white border border-[#E9E9E6] rounded-xl shadow-sm space-y-4">
                <h4 className="font-extrabold text-sm text-[#191919] uppercase tracking-wider">📞 ติดต่อเพื่อจองคิวงานแสดง (Tour & Booking Info)</h4>
                <p className="text-xs text-[#5F5E5B] leading-relaxed">
                  สามารถติดต่องานแสดงคอนเสิร์ตเดี่ยว Fingerstyle, มินิคอนเสิร์ต, เวิร์กช็อปสัมมนา หรือวงโฟล์คซองอะคูสติก <strong className="font-semibold">Chill Groove</strong> สำหรับงานแต่งงานหรืองานเลี้ยงอีเวนต์ต่าง ๆ ได้โดยตรงผ่านช่องทางเหล่านี้
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                  <div className="flex items-center gap-3 p-3 bg-[#F7F7F5] border border-[#E9E9E6] rounded-lg">
                    <Phone className="w-4 h-4 text-amber-600" />
                    <div>
                      <span className="text-[#5F5E5B] block font-medium">เบอร์โทรศัพท์ติดต่อ</span>
                      <strong className="text-[#191919] text-sm">082-535-xxxx (หรือ LINE OA)</strong>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F7F7F5] border border-[#E9E9E6] rounded-lg">
                    <Mail className="w-4 h-4 text-amber-600" />
                    <div>
                      <span className="text-[#5F5E5B] block font-medium">อีเมลผู้จัดการ</span>
                      <strong className="text-[#191919] text-sm">{ARTIST_INFO.email}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <a 
                    href={ARTIST_INFO.lineOaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#059669] text-white font-bold text-xs hover:bg-[#047857] transition shadow-md"
                  >
                    <span>คุยรายละเอียดผ่านไลน์ LINE OA (@535pcjno)</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Standalone Video Player Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-amber-500/30 rounded-2xl w-full max-w-sm sm:max-w-md overflow-hidden shadow-2xl relative space-y-3">
            <div className="p-3 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2 pr-2 overflow-hidden">
                <Play className="w-4 h-4 text-amber-400 fill-current shrink-0" />
                <h3 className="text-xs font-bold text-white truncate">{activeVideoModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition cursor-pointer shrink-0"
              >
                ✕
              </button>
            </div>
            <div className="p-4 flex justify-center bg-black">
              <div className="w-full max-w-[320px] aspect-[9/16] rounded-xl overflow-hidden border border-stone-800 bg-stone-950 shadow-2xl">
                <iframe
                  src={activeVideoModal.embedUrl}
                  title={activeVideoModal.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="p-3 pt-0 text-center flex justify-center">
              <button
                onClick={() => setActiveVideoModal(null)}
                className="px-5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                ปิดวิดีโอ
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
