import React, { useState } from 'react';
import { Music, ShoppingBag, Send, Menu, X, BookOpen, User, FileText, Gift, Sun, Moon, Monitor } from 'lucide-react';
import { ARTIST_INFO } from '../data/mockData';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenBooking: () => void;
  themeMode: 'system' | 'light' | 'dark';
  effectiveTheme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  themeMode,
  effectiveTheme,
  toggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'หน้าแรก', icon: User },
    { id: 'albums', label: 'ผลงานเพลง', icon: Music },
    { id: 'tabs', label: 'TAB เพลงแต่ง', icon: FileText },
    { id: 'freetabs', label: 'แจก TAB ฟรี', icon: Gift },
    { id: 'courses', label: 'คอร์สเรียน', icon: BookOpen },
    { id: 'articles', label: 'บทความเกร็ดความรู้', icon: BookOpen },
    { id: 'products', label: 'ร้านค้า', icon: ShoppingBag },
    { id: 'tour', label: 'ติดต่องาน', icon: Send },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-stone-200/60 dark:border-amber-500/10 text-stone-900 dark:text-slate-100 shadow-xs dark:shadow-xl transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3 sm:gap-4">
          
          {/* Logo & Kawin Avatar */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-100 dark:bg-slate-900 border-2 border-amber-500/40 group-hover:border-amber-400 transition shadow-md dark:shadow-amber-950/40 overflow-hidden shrink-0">
              <img
                src={ARTIST_INFO.profileImageUrl}
                alt="Kawin"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="shrink-0 min-w-0">
              <span className="text-sm sm:text-base font-extrabold tracking-tight text-stone-900 dark:text-white block group-hover:text-amber-600 dark:group-hover:text-amber-300 transition whitespace-nowrap">
                Kawin Fingerstyle
              </span>
              <span className="text-[10px] sm:text-[11px] text-amber-500 dark:text-amber-400/90 font-medium block -mt-0.5 tracking-wide whitespace-nowrap">
                Acoustic Fingerstyle Artist
              </span>
            </div>
          </button>

          {/* Desktop Navigation (Scrollable when screen width narrows) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 overflow-x-auto min-w-0 max-w-full py-1.5 px-1 scroll-smooth nav-scrollbar flex-nowrap">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2.5 xl:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-stone-600 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100/80 dark:hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0" />
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Controls: Theme Toggle, Cart Button & Mobile Menu Toggle */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={toggleTheme}
              className="px-2.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200/60 text-stone-800 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800 dark:text-slate-100 transition flex items-center gap-1.5 shadow-xs dark:shadow-md text-xs font-semibold shrink-0"
              title={
                themeMode === 'system'
                  ? 'โหมดธีม: อัตโนมัติ (ตามการตั้งค่าเครื่อง) - คลิกเพื่อเปลี่ยน'
                  : themeMode === 'light'
                  ? 'โหมดธีม: สว่าง - คลิกเพื่อเปลี่ยน'
                  : 'โหมดธีม: มืด - คลิกเพื่อเปลี่ยน'
              }
            >
              {themeMode === 'system' ? (
                <>
                  <Monitor className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="hidden sm:inline text-[11px] text-amber-600 dark:text-amber-400 font-bold whitespace-nowrap">Auto</span>
                </>
              ) : themeMode === 'light' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="hidden sm:inline text-[11px] text-amber-600 dark:text-amber-400 font-bold whitespace-nowrap">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span className="hidden sm:inline text-[11px] text-indigo-400 font-bold whitespace-nowrap">Dark</span>
                </>
              )}
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200/60 text-stone-800 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800 dark:text-slate-100 transition flex items-center justify-center shadow-xs dark:shadow-md shrink-0"
              title="ตะกร้าสินค้า"
            >
              <ShoppingBag className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-400 text-slate-950 font-bold text-xs rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile/Tablet menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-500 hover:text-stone-900 dark:text-slate-400 dark:hover:text-white transition rounded-xl bg-stone-100 dark:bg-slate-900"
              aria-label="เปิดเมนู"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-950 border-b border-stone-200 dark:border-slate-800 px-4 pt-2 pb-4 space-y-1.5 transition-colors duration-300">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive ? 'bg-amber-400 text-slate-950 font-bold shadow-xs' : 'text-stone-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
