import React, { useState, useEffect } from 'react';
import { Lock, Unlock, FileText, Download, ExternalLink, MessageCircle, ShieldAlert, Sparkles, KeyRound, Settings, Plus, Copy, Check, Trash2, ShieldCheck, AlertCircle, Inbox, Mail, Phone, Calendar, MapPin, User, RefreshCw, CheckCircle2, MessageSquare, Filter } from 'lucide-react';
import { ARTIST_INFO } from '../data/mockData';
import { InquiryMessage } from '../types';

export interface OriginalTabItem {
  id: string;
  title: string;
  fileName: string;
  driveUrl: string;
  badge: string;
  description: string;
  price: string;
}

export interface OneTimeCode {
  id: string;
  code: string;
  tabId: string;
  tabTitle: string;
  createdAt: string;
  isUsed: boolean;
  usedAt?: string;
}

export const DEFAULT_INQUIRIES: InquiryMessage[] = [
  {
    id: 'inq-sample-1',
    name: 'คุณสมชาย / บริษัท อีเวนต์ อาร์ต จำกัด',
    phone: '081-234-5678',
    email: 'somchai@eventart.co.th',
    eventType: 'งานแสดงคอนเสิร์ต / อีเวนต์เปิดตัวสินค้า',
    eventDate: '15 ก.ย. 2026',
    location: 'ศูนย์การค้าสยามพารากอน กรุงเทพฯ',
    notes: 'สนใจเชิญคุณกวิน (Kawin Fingerstyle) ร่วมแสดงบรรเลงกีตาร์ฟิงเกอร์สไตล์ช่วงเปิดงานประมาณ 45 นาที รบกวนขอใบเสนอราคาและคิวงานครับ',
    createdAt: '03/08/2026 10:30',
    status: 'unread',
  },
  {
    id: 'inq-sample-2',
    name: 'คุณเมษา (Maysa Acoustic Studio)',
    phone: '089-876-5432',
    email: 'maysa.acoustic@gmail.com',
    eventType: 'คอร์สเรียน Private Online / บรรยายวิทยากร',
    eventDate: '20 ส.ค. 2026',
    location: 'ผ่านระบบ Zoom / Online',
    notes: 'สอบถามรายละเอียดคอร์สเรียนสด Online ตัวต่อตัว เทคนิคการเรียบเรียงเพลง Fingerstyle และการจับคอร์ดสเกลกีตาร์ครับ',
    createdAt: '02/08/2026 15:45',
    status: 'read',
  },
  {
    id: 'inq-sample-3',
    name: 'คุณกิตติศักดิ์ (โรงแรมดุสิตธานี)',
    phone: '086-555-1234',
    email: 'kittisak.d@hotelgroup.com',
    eventType: 'งานแสดงดนตรีบรรเลง Acoustic Dinner',
    eventDate: '01 ต.ค. 2026',
    location: 'Dusit Thani Hotel หัวหิน',
    notes: 'ต้องการสอบถามคิวงานแสดงดนตรีบรรเลงอะคูสติกกีตาร์ต้อนรับแขก VIP ในช่วงมื้อค่ำครับ',
    createdAt: '01/08/2026 18:20',
    status: 'replied',
  },
];

export const ORIGINAL_TABS: OriginalTabItem[] = [
  {
    id: 'tab-1',
    title: 'Run in Space (Original Song By Kawin)',
    fileName: 'Run in space( Original Song By Kawin ).pdf',
    driveUrl: 'https://drive.google.com/file/d/1AdQiPfpFaL1db8aiTnc1ihJLfPTma18j/view?usp=sharing',
    badge: '🚀 Original Song',
    description: 'โน้ตและ TAB กีตาร์ฟิงเกอร์สไตล์ฉบับสมบูรณ์ เพลงบรรเลง Run in space',
    price: '150 บาท',
  },
  {
    id: 'tab-2',
    title: '+ Positive + (Original Song By Kawin)',
    fileName: '+ Positive + ( Original Song By Kawin ).pdf',
    driveUrl: 'https://drive.google.com/file/d/1BNusJT12EnLLnpKYxbusQkB-wfBrnTGV/view?usp=sharing',
    badge: '✨ Original Song',
    description: 'โน้ตและ TAB กีตาร์ฟิงเกอร์สไตล์ฉบับสมบูรณ์ เพลงบรรเลง + Positive +',
    price: '150 บาท',
  },
  {
    id: 'tab-3',
    title: 'Last Rainy Season - ฤดูฝนที่แล้ว (TAB)',
    fileName: 'Last Rainy Season - Kawin Phusrithet (TAB).pdf',
    driveUrl: 'https://drive.google.com/file/d/1qgtJlwm61EPGxmk5Gyu6tscph9dj1Ip3/view?usp=sharing',
    badge: '🌧️ Original Song',
    description: 'โน้ตและ TAB กีตาร์ฟิงเกอร์สไตล์ฉบับสมบูรณ์ เพลงบรรเลง ฤดูฝนที่แล้ว',
    price: '150 บาท',
  },
];

// Default pre-seeded single-use codes for testing
const DEFAULT_CODES: OneTimeCode[] = [
  {
    id: 'code-1',
    code: 'RUN-7891-K',
    tabId: 'tab-1',
    tabTitle: 'Run in Space (Original Song By Kawin)',
    createdAt: new Date().toLocaleDateString('th-TH'),
    isUsed: false,
  },
  {
    id: 'code-2',
    code: 'POS-4321-P',
    tabId: 'tab-2',
    tabTitle: '+ Positive + (Original Song By Kawin)',
    createdAt: new Date().toLocaleDateString('th-TH'),
    isUsed: false,
  },
  {
    id: 'code-3',
    code: 'RAIN-9912-L',
    tabId: 'tab-3',
    tabTitle: 'Last Rainy Season - ฤดูฝนที่แล้ว (TAB)',
    createdAt: new Date().toLocaleDateString('th-TH'),
    isUsed: false,
  },
  {
    id: 'code-4',
    code: 'VIP-KAWIN-ALL',
    tabId: 'ALL',
    tabTitle: 'ทุกเพลง (All Original Songs)',
    createdAt: new Date().toLocaleDateString('th-TH'),
    isUsed: false,
  },
];

export const OriginalTabsSection: React.FC = () => {
  const [selectedTabToUnlock, setSelectedTabToUnlock] = useState<OriginalTabItem | null>(null);
  const [inputCode, setInputCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [unlockedTabs, setUnlockedTabs] = useState<string[]>([]);
  const [showCodeInputModal, setShowCodeInputModal] = useState(false);

  // Admin Panel States
  const [codesList, setCodesList] = useState<OneTimeCode[]>([]);
  const [inquiriesList, setInquiriesList] = useState<InquiryMessage[]>([]);
  const [activeAdminTab, setActiveAdminTab] = useState<'inquiries' | 'codes'>('inquiries');
  const [inquiryFilter, setInquiryFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all');

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPinError, setAdminPinError] = useState('');
  const [selectedTabForGen, setSelectedTabForGen] = useState<string>('tab-1');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Load inquiries function
  const loadInquiriesFromStorage = () => {
    try {
      const savedInquiries = localStorage.getItem('kawin_inquiries_v1');
      if (savedInquiries) {
        setInquiriesList(JSON.parse(savedInquiries));
      } else {
        setInquiriesList(DEFAULT_INQUIRIES);
        localStorage.setItem('kawin_inquiries_v1', JSON.stringify(DEFAULT_INQUIRIES));
      }
    } catch (e) {
      console.error('Error loading inquiries:', e);
    }
  };

  // Load admin data from localStorage
  useEffect(() => {
    try {
      localStorage.removeItem('unlocked_original_tabs'); // ensure default locked state on refresh

      const savedCodes = localStorage.getItem('admin_one_time_codes');
      if (savedCodes) {
        setCodesList(JSON.parse(savedCodes));
      } else {
        setCodesList(DEFAULT_CODES);
        localStorage.setItem('admin_one_time_codes', JSON.stringify(DEFAULT_CODES));
      }

      loadInquiriesFromStorage();
    } catch (e) {
      console.error(e);
    }

    const handleOpenAdmin = () => {
      setShowAdminModal(true);
      setAdminPinError('');
      setAdminPinInput('');
      loadInquiriesFromStorage();
    };

    const handleInquirySubmitted = () => {
      loadInquiriesFromStorage();
    };

    window.addEventListener('open-admin-modal', handleOpenAdmin);
    window.addEventListener('inquiry-submitted', handleInquirySubmitted);
    return () => {
      window.removeEventListener('open-admin-modal', handleOpenAdmin);
      window.removeEventListener('inquiry-submitted', handleInquirySubmitted);
    };
  }, []);

  // Save inquiries
  const saveInquiriesToStorage = (updated: InquiryMessage[]) => {
    setInquiriesList(updated);
    try {
      localStorage.setItem('kawin_inquiries_v1', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateInquiryStatus = (id: string, newStatus: 'unread' | 'read' | 'replied') => {
    const updated = inquiriesList.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq);
    saveInquiriesToStorage(updated);
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiriesList.filter(inq => inq.id !== id);
    saveInquiriesToStorage(updated);
  };

  // Save codes to localStorage
  const saveCodesToStorage = (updatedCodes: OneTimeCode[]) => {
    setCodesList(updatedCodes);
    try {
      localStorage.setItem('admin_one_time_codes', JSON.stringify(updatedCodes));
    } catch (e) {
      console.error(e);
    }
  };

  // User unlocks TAB with single-use code
  const handleUnlockWithCode = (targetTabId?: string) => {
    const codeToTest = inputCode.trim().toUpperCase();
    if (!codeToTest) {
      setCodeError('กรุณากรอกรหัสปลดล็อก');
      return;
    }

    // Find code in database
    const codeIndex = codesList.findIndex(c => c.code.toUpperCase() === codeToTest);

    if (codeIndex === -1) {
      setCodeError('❌ ไม่พบรหัสนี้ หรือรหัสไม่ถูกต้อง');
      return;
    }

    const matchedCode = codesList[codeIndex];

    // Check if already used
    if (matchedCode.isUsed) {
      setCodeError(`❌ รหัส "${matchedCode.code}" ถูกใช้งานไปแล้วเมื่อ ${matchedCode.usedAt || ''} (รหัสใช้งานได้เพียงครั้งเดียวเท่านั้น)`);
      return;
    }

    // Check if code applies to target tab or all tabs
    const targetId = targetTabId || selectedTabToUnlock?.id;
    if (matchedCode.tabId !== 'ALL' && targetId && matchedCode.tabId !== targetId) {
      const allowedTabName = ORIGINAL_TABS.find(t => t.id === matchedCode.tabId)?.title || 'เพลงอื่น';
      setCodeError(`❌ รหัสนี้ใช้สำหรับปลดล็อกเพลง "${allowedTabName}" เท่านั้น`);
      return;
    }

    // Determine which tabs to unlock
    let newUnlockedIds: string[] = [];
    if (matchedCode.tabId === 'ALL') {
      newUnlockedIds = ORIGINAL_TABS.map(t => t.id);
    } else if (matchedCode.tabId) {
      newUnlockedIds = [matchedCode.tabId];
    } else if (targetId) {
      newUnlockedIds = [targetId];
    }

    // Mark code as USED (Single-Use Enforcement)!
    const updatedCodesList = [...codesList];
    updatedCodesList[codeIndex] = {
      ...matchedCode,
      isUsed: true,
      usedAt: new Date().toLocaleString('th-TH'),
    };

    saveCodesToStorage(updatedCodesList);

    // Update user's unlocked list (in-memory session state)
    const updatedUnlocked = Array.from(new Set([...unlockedTabs, ...newUnlockedIds]));
    setUnlockedTabs(updatedUnlocked);

    setInputCode('');
    setCodeError('');
    setShowCodeInputModal(false);
    setSelectedTabToUnlock(null);

    alert(`🎉 ปลดล็อกไฟล์ TAB เรียบร้อยแล้ว!\n\nรหัส ${matchedCode.code} ถูกใช้งานแล้ว (ใช้ได้ 1 ครั้ง)\nคุณสามารถดาวน์โหลดไฟล์ PDF ได้ทันที`);
  };

  // Admin login check (PIN: 070809)
  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPinInput.trim() === '070809') {
      setIsAdminAuthenticated(true);
      setAdminPinError('');
    } else {
      setAdminPinError('รหัส PIN แอดมินไม่ถูกต้อง');
    }
  };

  // Generate new single-use code
  const handleGenerateCode = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const randomChars = Math.random().toString(36).substring(2, 5).toUpperCase();

    let prefix = 'TAB';
    if (selectedTabForGen === 'tab-1') prefix = 'RUN';
    if (selectedTabForGen === 'tab-2') prefix = 'POS';
    if (selectedTabForGen === 'tab-3') prefix = 'RAIN';
    if (selectedTabForGen === 'ALL') prefix = 'ALL';

    const newGeneratedCode = `${prefix}-${randomNum}-${randomChars}`;

    const selectedTabObj = ORIGINAL_TABS.find(t => t.id === selectedTabForGen);
    const tabTitle = selectedTabForGen === 'ALL' ? 'ทุกเพลง (All Original Songs)' : (selectedTabObj?.title || 'TAB');

    const newCodeItem: OneTimeCode = {
      id: `code-${Date.now()}`,
      code: newGeneratedCode,
      tabId: selectedTabForGen,
      tabTitle: tabTitle,
      createdAt: new Date().toLocaleString('th-TH'),
      isUsed: false,
    };

    saveCodesToStorage([newCodeItem, ...codesList]);
  };

  // Delete code
  const handleDeleteCode = (id: string) => {
    const updated = codesList.filter(c => c.id !== id);
    saveCodesToStorage(updated);
  };

  // Copy code to clipboard
  const handleCopyCode = (codeItem: OneTimeCode) => {
    navigator.clipboard.writeText(codeItem.code);
    setCopiedCodeId(codeItem.id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const isUnlocked = (id: string) => unlockedTabs.includes(id);

  return (
    <section className="py-12 bg-stone-50 dark:bg-slate-950 text-stone-900 dark:text-slate-100 transition-colors duration-300" id="original-tabs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Title */}
        <div className="pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ORIGINAL GUITAR TABS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            TAB เพลงแต่งของฉัน (Kawin Original Songs)
          </h2>
          <p className="text-stone-500 dark:text-slate-400 text-sm mt-1">
            โน้ตและ TAB บรรเลงกีตาร์ฟิงเกอร์สไตล์ (ไฟล์ .pdf) — ราคาเพลงละ <strong className="text-amber-600 dark:text-amber-400">150 บาท</strong>
          </p>
        </div>

        {/* Contact Payment Bar / Banner */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/40 border border-stone-200 dark:border-none shadow-sm dark:shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>สั่งซื้อและปลดล็อกด้วยรหัสใช้งาน 1 ครั้ง (Single-Use Code System)</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                เมื่อโอนชำระเงินเรียบร้อยแล้ว แอดมินจะส่ง <strong className="text-amber-700 dark:text-amber-300">"รหัสปลดล็อก 1 ครั้ง"</strong> ให้คุณ นำมาระบุในเว็บเพื่อเปิดสิทธิ์ดาวน์โหลดไฟล์ .pdf ได้ทันที (แต่ละรหัสใช้งานได้เพียงครั้งเดียวเท่านั้น)
              </p>
            </div>

            {/* Direct Contact Buttons Bar */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto shrink-0">
              <a
                href={ARTIST_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>ติดต่อ Facebook Page</span>
              </a>

              <a
                href={ARTIST_INFO.lineOaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>LINE: {ARTIST_INFO.lineId}</span>
              </a>
            </div>
          </div>
        </div>

        {/* TAB Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ORIGINAL_TABS.map((tab) => {
            const unlocked = isUnlocked(tab.id);

            return (
              <div
                key={tab.id}
                className={`bg-white dark:bg-slate-900/40 border border-stone-200 dark:border-none rounded-2xl p-6 flex flex-col justify-between transition duration-300 shadow-sm dark:shadow-md group relative overflow-hidden ${
                  unlocked ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300' : 'hover:bg-stone-100 dark:hover:bg-slate-900/60'
                }`}
              >
                {/* Card Watermark Icon */}
                <FileText className="absolute -right-4 -bottom-4 w-28 h-28 text-stone-200/20 dark:text-slate-800/20 group-hover:text-amber-500/10 transition duration-500 pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  {/* Badge & Lock/Unlocked Tag */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs font-bold rounded-lg">
                      {tab.badge}
                    </span>
                    {unlocked ? (
                      <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold rounded-md flex items-center gap-1 shadow">
                        <Unlock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>ปลดล็อกแล้ว</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-400 text-[11px] font-bold rounded-md flex items-center gap-1">
                        <Lock className="w-3 h-3 text-red-500" />
                        <span>Locked PDF</span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-base font-bold text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition leading-snug">
                      {tab.title}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                      {tab.description}
                    </p>
                  </div>

                  {/* File Details Box */}
                  <div className="p-3 rounded-xl bg-stone-50 dark:bg-slate-950/60 border border-stone-200/50 dark:border-none text-xs font-mono text-stone-600 dark:text-slate-300 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-stone-400 dark:text-slate-500 uppercase font-sans font-bold">รูปแบบไฟล์: .pdf</span>
                      <span className="text-amber-700 dark:text-amber-400 font-sans font-extrabold text-sm bg-amber-500/10 px-2 py-0.5 rounded">
                        {tab.price}
                      </span>
                    </div>
                    <div className="truncate font-semibold text-amber-800 dark:text-amber-200/90 text-[11px]">{tab.fileName}</div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="pt-6 mt-6 space-y-2 relative z-10">
                  {unlocked ? (
                    <a
                      href={tab.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition shadow-lg flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4 text-slate-950" />
                      <span>ดาวน์โหลดไฟล์ TAB (PDF) ทันที</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedTabToUnlock(tab);
                        setShowCodeInputModal(true);
                        setCodeError('');
                        setInputCode('');
                      }}
                      className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Lock className="w-4 h-4 text-slate-950" />
                      <span>สั่งซื้อ / กรอกรหัสปลดล็อก ({tab.price})</span>
                    </button>
                  )}

                  <a
                    href={tab.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 font-semibold text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>ดูตัวอย่างใน Google Drive</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Code Input / Unlock Modal */}
      {showCodeInputModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 max-w-md w-full space-y-5 shadow-2xl relative">
            
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {selectedTabToUnlock ? `ปลดล็อก ${selectedTabToUnlock.title}` : 'กรอกรหัสปลดล็อก TAB (Single-Use)'}
                  </h3>
                  <span className="text-xs text-amber-400 font-medium">
                    {selectedTabToUnlock ? selectedTabToUnlock.fileName : 'รหัสใช้งานได้เพียง 1 ครั้งเท่านั้น'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowCodeInputModal(false);
                  setSelectedTabToUnlock(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <p>
                นำรหัส <strong className="text-amber-300">Access Code (1 ครั้ง)</strong> ที่ได้รับจากแอดมินหลังจากสั่งซื้อ (150 บาท) มาวางในช่องด้านล่างเพื่อปลดล็อก
              </p>

              {/* Code Entry Input */}
              <div className="space-y-2">
                <label className="block text-[11px] uppercase font-bold text-slate-400">
                  กรอกรหัสปลดล็อก (Access Code):
                </label>
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => {
                    setInputCode(e.target.value);
                    setCodeError('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleUnlockWithCode();
                  }}
                  placeholder="เช่น RUN-7891-K"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-amber-300 font-mono text-base tracking-wider uppercase focus:outline-none focus:border-amber-400 text-center"
                />
                {codeError && (
                  <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{codeError}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleUnlockWithCode()}
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs transition shadow-lg flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4 text-slate-950" />
                <span>ยืนยันปลดล็อกดาวน์โหลด</span>
              </button>

              <div className="pt-3 border-t border-slate-800 space-y-2">
                <div className="text-[11px] text-slate-400">ยังไม่มีรหัส? ติดต่อสั่งซื้อได้ที่:</div>
                <div className="flex gap-2">
                  <a
                    href={ARTIST_INFO.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] text-center"
                  >
                    Facebook Page
                  </a>
                  <a
                    href={ARTIST_INFO.lineOaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] text-center"
                  >
                    LINE: {ARTIST_INFO.lineId}
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Admin Passcode Generator & Inquiries Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/50 rounded-2xl p-5 sm:p-6 max-w-3xl w-full max-h-[92vh] overflow-y-auto space-y-5 shadow-2xl relative">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">ระบบจัดการหลังบ้านแอดมิน (Kawin Backoffice)</h3>
                  <p className="text-xs text-slate-400">เช็กข้อความติดต่องาน & สร้างรหัสปลดล็อก TAB สำหรับลูกค้า</p>
                </div>
              </div>
              <button
                onClick={() => setShowAdminModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                ✕
              </button>
            </div>

            {!isAdminAuthenticated ? (
              /* PIN Authentication Screen */
              <form onSubmit={handleAdminAuth} className="space-y-4 max-w-xs mx-auto py-8 text-center">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">เข้าสู่ระบบแอดมิน</h4>
                  <p className="text-xs text-slate-400 mt-1">กรอกรหัส PIN เพื่อเข้าใช้งานระบบหลังบ้าน</p>
                </div>

                <input
                  type="password"
                  value={adminPinInput}
                  onChange={(e) => setAdminPinInput(e.target.value)}
                  placeholder="PIN 6 หลัก"
                  maxLength={10}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-center font-mono text-lg text-amber-300 tracking-widest focus:outline-none focus:border-amber-400"
                />

                {adminPinError && <div className="text-red-400 text-xs font-semibold">{adminPinError}</div>}

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition"
                >
                  เข้าสู่ระบบแอดมิน
                </button>
              </form>
            ) : (
              /* Authenticated Admin Dashboard */
              <div className="space-y-5">
                
                {/* Navigation Tabs Header */}
                <div className="flex border-b border-slate-800 gap-2">
                  <button
                    onClick={() => setActiveAdminTab('inquiries')}
                    className={`pb-3 px-4 text-xs font-extrabold transition border-b-2 flex items-center gap-2 relative ${
                      activeAdminTab === 'inquiries'
                        ? 'border-amber-400 text-amber-300'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Inbox className="w-4 h-4" />
                    <span>กล่องข้อความติดต่องาน</span>
                    {inquiriesList.filter(i => i.status === 'unread').length > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-red-500 text-white font-black text-[10px] animate-pulse">
                        {inquiriesList.filter(i => i.status === 'unread').length} ใหม่
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveAdminTab('codes')}
                    className={`pb-3 px-4 text-xs font-extrabold transition border-b-2 flex items-center gap-2 ${
                      activeAdminTab === 'codes'
                        ? 'border-amber-400 text-amber-300'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>สร้างรหัส Access Code (TAB)</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 font-bold text-[10px]">
                      {codesList.filter(c => !c.isUsed).length} พร้อมส่ง
                    </span>
                  </button>
                </div>

                {/* TAB 1: INQUIRIES INBOX */}
                {activeAdminTab === 'inquiries' && (
                  <div className="space-y-4">
                    
                    {/* Header stats & actions */}
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 font-semibold">ข้อความทั้งหมด:</span>
                        <span className="font-bold text-white">{inquiriesList.length}</span>
                        <span className="text-slate-600">|</span>
                        <span className="text-red-400 font-bold">🔴 ยังไม่อ่าน: {inquiriesList.filter(i => i.status === 'unread').length}</span>
                        <span className="text-slate-600">|</span>
                        <span className="text-emerald-400 font-bold">🟢 อ่าน/ตอบแล้ว: {inquiriesList.filter(i => i.status !== 'unread').length}</span>
                      </div>

                      <button
                        onClick={loadInquiriesFromStorage}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-amber-300 text-[11px] font-bold flex items-center gap-1.5 transition"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>รีเฟรชกล่องข้อความ</span>
                      </button>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex items-center gap-2 text-xs overflow-x-auto pb-1">
                      <span className="text-slate-500 font-semibold flex items-center gap-1 text-[11px]">
                        <Filter className="w-3.5 h-3.5" /> ตัวกรอง:
                      </span>
                      <button
                        onClick={() => setInquiryFilter('all')}
                        className={`px-3 py-1.5 rounded-xl transition font-bold text-[11px] ${
                          inquiryFilter === 'all'
                            ? 'bg-amber-400 text-slate-950'
                            : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        ทั้งหมด ({inquiriesList.length})
                      </button>
                      <button
                        onClick={() => setInquiryFilter('unread')}
                        className={`px-3 py-1.5 rounded-xl transition font-bold text-[11px] ${
                          inquiryFilter === 'unread'
                            ? 'bg-red-500 text-white'
                            : 'bg-slate-950 text-red-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        🔴 ยังไม่ได้อ่าน ({inquiriesList.filter(i => i.status === 'unread').length})
                      </button>
                      <button
                        onClick={() => setInquiryFilter('read')}
                        className={`px-3 py-1.5 rounded-xl transition font-bold text-[11px] ${
                          inquiryFilter === 'read'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-950 text-emerald-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        🟢 อ่านแล้ว ({inquiriesList.filter(i => i.status === 'read').length})
                      </button>
                      <button
                        onClick={() => setInquiryFilter('replied')}
                        className={`px-3 py-1.5 rounded-xl transition font-bold text-[11px] ${
                          inquiryFilter === 'replied'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-950 text-blue-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        💙 ตอบแล้ว ({inquiriesList.filter(i => i.status === 'replied').length})
                      </button>
                    </div>

                    {/* Inquiries Cards List */}
                    <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                      {inquiriesList.filter(inq => {
                        if (inquiryFilter === 'unread') return inq.status === 'unread';
                        if (inquiryFilter === 'read') return inq.status === 'read';
                        if (inquiryFilter === 'replied') return inq.status === 'replied';
                        return true;
                      }).length === 0 ? (
                        <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2 text-xs text-slate-500">
                          <Inbox className="w-8 h-8 text-slate-600 mx-auto" />
                          <p>ไม่มีข้อความติดต่องานในหมวดนี้</p>
                        </div>
                      ) : (
                        inquiriesList.filter(inq => {
                          if (inquiryFilter === 'unread') return inq.status === 'unread';
                          if (inquiryFilter === 'read') return inq.status === 'read';
                          if (inquiryFilter === 'replied') return inq.status === 'replied';
                          return true;
                        }).map((inq) => (
                          <div
                            key={inq.id}
                            className={`p-4 rounded-2xl border transition space-y-3 ${
                              inq.status === 'unread'
                                ? 'bg-slate-950 border-red-500/40 shadow-lg shadow-red-950/20'
                                : inq.status === 'replied'
                                ? 'bg-slate-950/70 border-blue-500/30'
                                : 'bg-slate-950/40 border-slate-800'
                            }`}
                          >
                            {/* Card Header row */}
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                              <div className="flex items-center gap-2">
                                {inq.status === 'unread' && (
                                  <span className="px-2.5 py-0.5 rounded-full bg-red-950 border border-red-500/50 text-red-400 text-[10px] font-black tracking-wide flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                                    🔴 ข้อความใหม่ (ยังไม่ได้อ่าน)
                                  </span>
                                )}
                                {inq.status === 'read' && (
                                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold">
                                    🟢 อ่านแล้ว
                                  </span>
                                )}
                                {inq.status === 'replied' && (
                                  <span className="px-2.5 py-0.5 rounded-full bg-blue-950 border border-blue-500/40 text-blue-400 text-[10px] font-bold">
                                    💙 ตอบกลับเรียบร้อย
                                  </span>
                                )}
                                <span className="text-[11px] text-amber-400 font-bold">{inq.eventType}</span>
                              </div>
                              <span className="text-[11px] text-slate-500 font-mono">{inq.createdAt}</span>
                            </div>

                            {/* Contact Info Details Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                              <div className="flex items-center gap-2 text-slate-200">
                                <User className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                <span>ผู้ติดต่อ: <strong className="text-white font-bold">{inq.name}</strong></span>
                              </div>
                              <div className="flex items-center gap-2 text-slate-200">
                                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span>เบอร์โทร: <a href={`tel:${inq.phone}`} className="text-emerald-400 font-mono hover:underline font-bold">{inq.phone}</a></span>
                              </div>
                              <div className="flex items-center gap-2 text-slate-200">
                                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                <span>อีเมล: <a href={`mailto:${inq.email}`} className="text-amber-300 font-mono hover:underline">{inq.email}</a></span>
                              </div>
                              <div className="flex items-center gap-2 text-slate-200">
                                <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                                <span>วันที่จัดงาน: <strong className="text-cyan-300 font-semibold">{inq.eventDate}</strong></span>
                              </div>
                              <div className="col-span-1 sm:col-span-2 flex items-center gap-2 text-slate-300 text-[11px]">
                                <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                                <span>สถานที่: <strong className="text-slate-200">{inq.location}</strong></span>
                              </div>
                            </div>

                            {/* Notes message box */}
                            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-1">
                              <span className="text-[10px] uppercase font-extrabold text-amber-400/80 block">
                                รายละเอียดข้อความ / งานที่ติดต่อ:
                              </span>
                              <p className="whitespace-pre-wrap">{inq.notes}</p>
                            </div>

                            {/* Actions bar */}
                            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800/60">
                              <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                                <a
                                  href={`tel:${inq.phone}`}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 hover:text-emerald-300 font-bold transition flex items-center gap-1"
                                >
                                  <Phone className="w-3 h-3" />
                                  <span>โทร</span>
                                </a>
                                <a
                                  href={`mailto:${inq.email}`}
                                  className="px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-500/40 text-amber-300 hover:text-amber-200 font-bold transition flex items-center gap-1"
                                >
                                  <Mail className="w-3 h-3" />
                                  <span>อีเมล</span>
                                </a>
                                <a
                                  href={ARTIST_INFO.lineOaUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-2.5 py-1 rounded-lg bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 hover:text-white font-bold transition flex items-center gap-1"
                                >
                                  <MessageCircle className="w-3 h-3" />
                                  <span>LINE OA</span>
                                </a>
                              </div>

                              <div className="flex items-center gap-1.5 text-[11px]">
                                {inq.status !== 'read' && (
                                  <button
                                    onClick={() => handleUpdateInquiryStatus(inq.id, 'read')}
                                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition"
                                  >
                                    ทำเป็นอ่านแล้ว
                                  </button>
                                )}
                                {inq.status !== 'replied' && (
                                  <button
                                    onClick={() => handleUpdateInquiryStatus(inq.id, 'replied')}
                                    className="px-2.5 py-1 rounded-lg bg-blue-900/60 border border-blue-500/40 text-blue-300 hover:bg-blue-800 font-bold transition"
                                  >
                                    ทำเป็นตอบแล้ว
                                  </button>
                                )}
                                {inq.status !== 'unread' && (
                                  <button
                                    onClick={() => handleUpdateInquiryStatus(inq.id, 'unread')}
                                    className="px-2 py-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-amber-300 transition"
                                    title="ทำเป็นยังไม่ได้อ่าน"
                                  >
                                    ทำเป็นยังไม่อ่าน
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteInquiry(inq.id);
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-red-950/80 border border-red-500/50 text-red-400 hover:bg-red-600 hover:text-white font-bold transition flex items-center gap-1 text-[11px] cursor-pointer shadow-sm ml-1"
                                  title="ลบข้อความนี้"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>ลบ</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 2: ACCESS CODES GENERATOR */}
                {activeAdminTab === 'codes' && (
                  <div className="space-y-6">
                    {/* Generator Controls Box */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold uppercase text-amber-400 flex items-center gap-2">
                          <Plus className="w-4 h-4" />
                          <span>สร้างรหัสปลดล็อก 1 ครั้ง (Single-Use Code Generator)</span>
                        </h4>
                        <span className="text-[11px] text-slate-500">1 Code = 1 ครั้งเท่านั้น</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1 font-semibold">เลือกเพลง TAB ที่ต้องการ:</label>
                          <select
                            value={selectedTabForGen}
                            onChange={(e) => setSelectedTabForGen(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                          >
                            {ORIGINAL_TABS.map(t => (
                              <option key={t.id} value={t.id}>{t.title} ({t.price})</option>
                            ))}
                            <option value="ALL">🌟 ทุกเพลง (All Original Songs Package)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1 font-semibold">ปุ่มสร้างรหัสด่วน:</label>
                          <button
                            onClick={handleGenerateCode}
                            className="w-full py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs transition shadow flex items-center justify-center gap-1.5"
                          >
                            <Sparkles className="w-4 h-4" />
                            <span>สร้างรหัส Access Code ใหม่</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Generated Codes List Table */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                          รายการรหัสทั้งหมดในระบบ ({codesList.length} รหัส)
                        </h4>
                        <span className="text-[11px] text-emerald-400 font-semibold">
                          คงเหลือยังไม่ได้ใช้: {codesList.filter(c => !c.isUsed).length} รหัส
                        </span>
                      </div>

                      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
                        <div className="max-h-60 overflow-y-auto divide-y divide-slate-800">
                          {codesList.length === 0 ? (
                            <div className="p-6 text-center text-xs text-slate-500">
                              ยังไม่มีรหัสในระบบ กดปุ่ม "สร้างรหัส Access Code ใหม่" ด้านบน
                            </div>
                          ) : (
                            codesList.map((c) => (
                              <div key={c.id} className="p-3 flex items-center justify-between gap-3 hover:bg-slate-900/60 transition">
                                <div className="space-y-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono font-extrabold text-amber-300 text-sm tracking-wider">
                                      {c.code}
                                    </span>
                                    {c.isUsed ? (
                                      <span className="px-2 py-0.5 rounded bg-red-950/80 border border-red-500/40 text-red-400 text-[10px] font-bold">
                                        🔴 ใช้แล้ว ({c.usedAt})
                                      </span>
                                    ) : (
                                      <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold">
                                        🟢 ยังไม่ได้ใช้ (พร้อมส่งลูกค้า)
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[11px] text-slate-400 truncate">
                                    {c.tabTitle} • สร้างเมื่อ {c.createdAt}
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                  <button
                                    onClick={() => handleCopyCode(c)}
                                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold transition flex items-center gap-1"
                                  >
                                    {copiedCodeId === c.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                    <span>{copiedCodeId === c.id ? 'คัดลอกแล้ว!' : 'คัดลอก'}</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteCode(c.id);
                                    }}
                                    className="px-2.5 py-1.5 rounded-lg bg-red-950/80 border border-red-500/50 text-red-400 hover:bg-red-600 hover:text-white font-bold text-xs transition flex items-center gap-1 cursor-pointer shadow-sm"
                                    title="ลบรหัสนี้"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>ลบ</span>
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-[11px] text-amber-200/90 leading-relaxed">
                      💡 <strong>คำแนะนำสำหรับแอดมิน:</strong> เมื่อลูกค้าโอนเงินสั่งซื้อ (150 บาท) ให้กดปุ่ม <strong>"สร้างรหัส Access Code ใหม่"</strong> แล้วคัดลอกรหัสส่งให้ลูกค้าทางแชต เมื่อลูกค้ากรอกรหัสบนเว็บแล้ว รหัสจะเปลี่ยนสถานะเป็น 🔴 "ใช้แล้ว" ทันที และไม่สามารถนำมาใช้ซ้ำได้อีก
                    </div>

                  </div>
                )}

              </div>
            )}

          </div>
        </div>
      )}
    </section>
  );
};
