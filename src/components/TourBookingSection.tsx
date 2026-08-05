import React, { useState } from 'react';
import { Send, CheckCircle2, Mail, Phone, Calendar, User, MessageCircle, ExternalLink, Facebook, Youtube, Sparkles, Music2, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ARTIST_INFO, CHILL_GROOVE_BAND } from '../data/mockData';
import { InquiryMessage } from '../types';

export const TourBookingSection: React.FC = () => {
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'วง Chill Groove รูปแบบ 1 (กีตาร์ + นักร้องหญิง 5,000฿/6,000฿)',
    eventDate: '',
    location: '',
    notes: '',
  });

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();

    // Create inquiry object
    const newInquiry: InquiryMessage = {
      id: `inq-${Date.now()}`,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      eventType: formData.eventType,
      eventDate: formData.eventDate || 'ไม่ระบุ',
      location: formData.location || 'ไม่ระบุ',
      notes: formData.notes || '-',
      createdAt: new Date().toLocaleString('th-TH'),
      status: 'unread',
    };

    // Save to localStorage
    try {
      const existingStr = localStorage.getItem('kawin_inquiries_v1');
      const existing: InquiryMessage[] = existingStr ? JSON.parse(existingStr) : [];
      const updated = [newInquiry, ...existing];
      localStorage.setItem('kawin_inquiries_v1', JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('inquiry-submitted'));
    } catch (err) {
      console.error('Error saving inquiry:', err);
    }

    setBookingSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  return (
    <section className="py-12 bg-stone-50 dark:bg-slate-950 text-stone-900 dark:text-slate-100 max-w-full overflow-hidden transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 min-w-0 max-w-full">
        
        {/* Section Header */}
        <div className="text-center pb-4 space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold block">
            WORK & BAND INQUIRIES
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            ติดต่องานแสดง {ARTIST_INFO.name} & วง {CHILL_GROOVE_BAND.name}
          </h2>
          <p className="text-stone-500 dark:text-slate-400 text-sm max-w-xl mx-auto">
            ติดต่องานแสดงคอนเสิร์ต Solo Acoustic Fingerstyle และวงโฟร์คซอง Chill Groove สำหรับงานแต่งงาน งานอีเวนต์
          </p>
        </div>

        {/* Official Contact Badges Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs min-w-0 max-w-full">
          {/* LINE OA */}
          <a
            href={ARTIST_INFO.lineOaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white hover:bg-emerald-50 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/60 border border-stone-200/50 dark:border-none transition flex items-center justify-between group shadow-sm dark:shadow-md min-w-0"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-stone-500 dark:text-slate-400 text-[10px] block font-semibold">LINE Official</span>
                <span className="text-stone-900 dark:text-white font-bold truncate block">{ARTIST_INFO.lineId}</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-emerald-600/60 dark:text-emerald-400/60 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 shrink-0 ml-1" />
          </a>

          {/* Email */}
          <a
            href={`mailto:${ARTIST_INFO.email}`}
            className="p-4 rounded-2xl bg-white hover:bg-amber-50 dark:bg-amber-950/40 dark:hover:bg-amber-950/60 border border-stone-200/50 dark:border-none transition flex items-center justify-between group shadow-sm dark:shadow-md min-w-0"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-stone-500 dark:text-slate-400 text-[10px] block font-semibold">Email</span>
                <span className="text-stone-900 dark:text-white font-bold truncate block">{ARTIST_INFO.email}</span>
              </div>
            </div>
          </a>

          {/* Chill Groove YouTube */}
          <a
            href={CHILL_GROOVE_BAND.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white hover:bg-red-50 dark:bg-red-950/40 dark:hover:bg-red-950/60 border border-stone-200/50 dark:border-none transition flex items-center justify-between group shadow-sm dark:shadow-md min-w-0"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                <Youtube className="w-5 h-5 fill-current" />
              </div>
              <div className="min-w-0">
                <span className="text-stone-500 dark:text-slate-400 text-[10px] block font-semibold">วง Chill Groove</span>
                <span className="text-stone-900 dark:text-white font-bold truncate block">@chillgroove-th</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-red-600/60 dark:text-red-400/60 group-hover:text-red-700 dark:group-hover:text-red-300 shrink-0 ml-1" />
          </a>

          {/* Facebook */}
          <a
            href={ARTIST_INFO.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white hover:bg-blue-50 dark:bg-blue-950/40 dark:hover:bg-blue-950/60 border border-stone-200/50 dark:border-none transition flex items-center justify-between group shadow-sm dark:shadow-md min-w-0"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-stone-500 dark:text-slate-400 text-[10px] block font-semibold">Facebook Page</span>
                <span className="text-stone-900 dark:text-white font-bold truncate block">Kawin Fingerstyle</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-blue-600/60 dark:text-blue-400/60 group-hover:text-blue-700 dark:group-hover:text-blue-300 shrink-0 ml-1" />
          </a>
        </div>

        {/* Chill Groove Band Info & Rate Card */}
        <div className="p-4 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/40 border border-stone-200/50 dark:border-none space-y-6 shadow-sm dark:shadow-md relative overflow-hidden max-w-full min-w-0">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

          {/* Band Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 min-w-0">
            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-extrabold text-[11px] flex items-center gap-1">
                  <Music2 className="w-3.5 h-3.5 shrink-0" />
                  <span>วงโฟร์คซอง Acoustic Folk Band</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-red-950/80 text-red-400 font-bold text-[11px] flex items-center gap-1">
                  <Youtube className="w-3.5 h-3.5 text-red-500 fill-current shrink-0" />
                  <span>@chillgroove-th</span>
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight">
                ข้อมูลวง <span className="text-amber-600 dark:text-amber-400">{CHILL_GROOVE_BAND.name}</span>
              </h3>
              <p className="text-xs text-stone-600 dark:text-slate-300">
                {CHILL_GROOVE_BAND.tagline}
              </p>
            </div>

            <a
              href={CHILL_GROOVE_BAND.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs transition flex items-center gap-2 shadow-lg shadow-red-950/40 shrink-0"
            >
              <Youtube className="w-4 h-4 fill-white" />
              <span>ฟังเพลง & ชมคลิปวง Chill Groove</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Rates Grid */}
          <div className="space-y-3 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>เรทราคาวงโฟร์คซอง (อัตราค่าบริการงานแต่งงาน / งานเลี้ยงอีเวนต์)</span>
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-w-0">
              {CHILL_GROOVE_BAND.rates.map((rate, idx) => (
                <div
                  key={rate.id}
                  className="p-4 sm:p-5 rounded-2xl bg-stone-50 dark:bg-slate-950/60 hover:bg-stone-100 dark:hover:bg-slate-950/90 border border-stone-200/50 dark:border-none transition flex flex-col justify-between space-y-4 shadow-sm dark:shadow-md group min-w-0"
                >
                  <div className="space-y-3 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300">
                        {rate.badge}
                      </span>
                      <span className="text-[10px] text-stone-400 dark:text-slate-500 font-mono">OPTION 0{idx + 1}</span>
                    </div>

                    <div className="min-w-0">
                      <h5 className="text-sm font-black text-stone-900 group-hover:text-amber-700 dark:text-white dark:group-hover:text-amber-300 transition">
                        {rate.title}
                      </h5>
                      <p className="text-xs text-amber-800 dark:text-amber-300 font-bold mt-2 leading-relaxed bg-white dark:bg-slate-900/60 border border-stone-200/40 dark:border-none p-3 rounded-xl">
                        {rate.lineup}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-3 text-xs font-mono">
                    <div className="flex items-center justify-between text-stone-600 dark:text-slate-300">
                      <span className="text-[11px] font-sans font-semibold">ในจังหวัด:</span>
                      <span className="text-base font-black text-emerald-600 dark:text-emerald-400">{rate.priceLocal}</span>
                    </div>
                    <div className="flex items-center justify-between text-stone-600 dark:text-slate-300">
                      <span className="text-[11px] font-sans font-semibold">นอกจังหวัด:</span>
                      <span className="text-base font-black text-amber-600 dark:text-amber-300">{rate.priceOutstation}</span>
                    </div>
                    <p className="text-[10px] text-stone-400 dark:text-slate-400 font-sans text-right font-medium">
                      {rate.notes}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Notice */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 text-xs text-amber-800 dark:text-amber-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 min-w-0 max-w-full">
            <span className="min-w-0 break-words">💡 ต้องการสอบถามรายละเอียดเพิ่มเติมหรือล็อกคิวงานวง <strong>Chill Groove</strong> ติดต่อทาง LINE OA ได้เลยครับ</span>
            <a
              href={ARTIST_INFO.lineOaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-xs transition flex items-center gap-1.5 shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white dark:fill-slate-950 shrink-0" />
              <span>แชต LINE ID {ARTIST_INFO.lineId}</span>
            </a>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="bg-white dark:bg-slate-900/40 border border-stone-200/50 dark:border-none rounded-2xl p-4 sm:p-8 shadow-sm dark:shadow-md space-y-6 max-w-full min-w-0 overflow-hidden">
          <div className="pb-3 min-w-0">
            <h3 className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="truncate">แบบฟอร์มส่งข้อความติดต่องานแสดง (Inquiry Form)</span>
            </h3>
            <p className="text-xs text-stone-500 dark:text-slate-400 mt-0.5">
              กรอกข้อมูลงานของคุณ ทีมงานจะติดต่อกลับเพื่อยืนยันคิวแสดงโดยเร็วที่สุด
            </p>
          </div>

          {bookingSubmitted ? (
            <div className="p-6 sm:p-8 rounded-xl bg-stone-50 dark:bg-slate-950/60 text-center space-y-4 min-w-0">
              <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
              <h4 className="text-lg font-bold text-stone-900 dark:text-white">ส่งข้อมูลติดต่องานเรียบร้อยแล้ว</h4>
              <p className="text-xs text-stone-600 dark:text-slate-300 max-w-md mx-auto">
                ขอบคุณสำหรับการติดต่อ ทีมงานจะติดต่อกลับไปยังเบอร์โทรศัพท์หรืออีเมลที่คุณระบุไว้โดยเร็วที่สุด
              </p>
              <button
                onClick={() => setBookingSubmitted(false)}
                className="px-5 py-2.5 bg-stone-200 hover:bg-stone-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs text-stone-950 dark:text-white font-bold rounded-xl"
              >
                ส่งข้อความเพิ่มเติม
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitBooking} className="space-y-4 text-xs min-w-0 max-w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
                <div className="min-w-0 max-w-full">
                  <label className="block text-stone-600 dark:text-slate-300 mb-1.5 font-bold flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>ชื่อผู้ติดต่อ / หน่วยงาน / บ่าวสาว</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น คุณกอล์ฟ / เจ้าสาว"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full min-w-0 max-w-full box-border px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-slate-950 text-stone-900 dark:text-white border border-stone-200 dark:border-none focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                <div className="min-w-0 max-w-full">
                  <label className="block text-stone-600 dark:text-slate-300 mb-1.5 font-bold flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>เบอร์โทรศัพท์</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="08X-XXX-XXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full min-w-0 max-w-full box-border px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-slate-950 text-stone-900 dark:text-white border border-stone-200 dark:border-none focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
                <div className="min-w-0 max-w-full">
                  <label className="block text-stone-600 dark:text-slate-300 mb-1.5 font-bold flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>อีเมล</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full min-w-0 max-w-full box-border px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-slate-950 text-stone-900 dark:text-white border border-stone-200 dark:border-none focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                <div className="min-w-0 max-w-full">
                  <label className="block text-stone-600 dark:text-slate-300 mb-1.5 font-bold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>วันที่เสนอจัดงาน</span>
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full block min-w-0 max-w-full box-border px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-slate-950 text-stone-900 dark:text-white border border-stone-200 dark:border-none focus:outline-none focus:ring-2 focus:ring-amber-500/30 [color-scheme:light] dark:[color-scheme:dark] min-h-[42px] appearance-none"
                  />
                </div>
              </div>

              <div className="min-w-0 max-w-full">
                <label className="block text-stone-600 dark:text-slate-300 mb-1.5 font-bold">เลือกรูปแบบวง / ประเภทงานแสดง</label>
                <div className="relative w-full min-w-0 max-w-full">
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full block min-w-0 max-w-full box-border truncate pl-3.5 pr-10 py-2.5 rounded-xl bg-stone-50 dark:bg-slate-950 text-amber-800 dark:text-amber-300 font-bold border border-stone-200 dark:border-none focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-xs appearance-none"
                  >
                    <option value="วง Chill Groove รูปแบบ 1 (กีตาร์ + นักร้องหญิง 5,000฿/6,000฿)" className="bg-white dark:bg-slate-900 text-stone-900 dark:text-white">
                      🎸 วง Chill Groove รูปแบบ 1 (กีตาร์โปร่ง + นักร้องหญิง)
                    </option>
                    <option value="วง Chill Groove รูปแบบ 2 (กีตาร์ + นักร้องหญิง + แซกโซโฟน 6,000฿/7,500฿)" className="bg-white dark:bg-slate-900 text-stone-900 dark:text-white">
                      🎷 วง Chill Groove รูปแบบ 2 (กีตาร์ + นักร้องหญิง + แซก)
                    </option>
                    <option value="วง Chill Groove รูปแบบ 3 (กีตาร์ + นักร้องหญิง + Pad drum 6,000฿/7,500฿)" className="bg-white dark:bg-slate-900 text-stone-900 dark:text-white">
                      🥁 วง Chill Groove รูปแบบ 3 (กีตาร์ + นักร้องหญิง + กลอง)
                    </option>
                    <option value="แสดง Solo Acoustic Fingerstyle (Kawin)" className="bg-white dark:bg-slate-900 text-stone-900 dark:text-white">
                      🎵 แสดง Solo Acoustic Fingerstyle (Kawin)
                    </option>
                    <option value="สอบถามรายละเอียดคอร์สเรียน / งานอื่นๆ" className="bg-white dark:bg-slate-900 text-stone-900 dark:text-white">
                      ❓ สอบถามคอร์สเรียน / งานอื่นๆ
                    </option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400 dark:text-slate-400">
                    ▼
                  </div>
                </div>
              </div>

              <div className="min-w-0 max-w-full">
                <label className="block text-stone-600 dark:text-slate-300 mb-1.5 font-bold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-pink-500 dark:text-pink-400 shrink-0" />
                  <span>สถานที่จัดงาน (จังหวัด / โรงแรม / สถานที่)</span>
                </label>
                <input
                  type="text"
                  placeholder="เช่น โรงแรม... จ.เชียงใหม่"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full min-w-0 max-w-full box-border px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-slate-950 text-stone-900 dark:text-white border border-stone-200 dark:border-none focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>

              <div className="min-w-0 max-w-full">
                <label className="block text-stone-600 dark:text-slate-300 mb-1.5 font-bold">รายละเอียดเพิ่มเติม / ช่วงเวลาที่ต้องการแสดง</label>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="ระบุเวลา สถานที่ ธีมงาน หรือเพลงพิเศษที่ต้องการให้ร้อง"
                  className="w-full min-w-0 max-w-full box-border px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-slate-950 text-stone-900 dark:text-white border border-stone-200 dark:border-none focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>ส่งข้อความติดต่องานแสดง</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};

