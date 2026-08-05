import React, { useState } from 'react';
import { Music, ShoppingBag, Send, Menu, X, BookOpen, User, FileText, Gift, Sun, Moon } from 'lucide-react';
import { ARTIST_INFO } from '../data/mockData';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenBooking: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  theme,
  toggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'หน้าแรก', icon: User },
    { id: 'albums', label: 'ผลงานเพลง', icon: Music },
    { id: 'tabs', label: 'TAB เพลงแต่ง', icon: FileText },
    { id: 'freetabs', label: 'แจก TAB ฟรี', icon: Gift },
    { id: 'courses', label: 'คอร์สเรียน', icon: BookOpen },
    { id: 'products', label: 'ร้านค้า', icon: ShoppingBag },
    { id: 'tour', label: 'ติดต่องาน', icon: Send },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-stone-200/60 dark:border-amber-500/10 text-stone-900 dark:text-slate-100 shadow-sm dark:shadow-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Kawin Avatar */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-slate-900 border-2 border-amber-500/40 group-hover:border-amber-400 transition shadow-md dark:shadow-amber-950/40 overflow-hidden">
              <img
                src={ARTIST_INFO.profileImageUrl}
                alt="Kawin"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-stone-900 dark:text-white block group-hover:text-amber-600 dark:group-hover:text-amber-300 transition">
                Kawin Fingerstyle
              </span>
              <span className="text-[11px] text-amber-500 dark:text-amber-400/90 font-medium block -mt-0.5 tracking-wide">
                Acoustic Fingerstyle Artist
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                      : 'text-stone-600 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Controls: Theme Toggle, Cart Button & Mobile Menu Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200/60 text-stone-800 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800 dark:text-slate-100 transition flex items-center justify-center shadow-sm dark:shadow-md"
              title={theme === 'dark' ? 'เปลี่ยนเป็นโหมดสว่าง' : 'เปลี่ยนเป็นโหมดมืด'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600" />
              )}
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200/60 text-stone-800 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800 dark:text-slate-100 transition flex items-center justify-center shadow-sm dark:shadow-md"
              title="ตะกร้าสินค้า"
            >
              <ShoppingBag className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-400 text-slate-950 font-bold text-xs rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-500 hover:text-stone-900 dark:text-slate-400 dark:hover:text-white transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-b border-stone-200 dark:border-slate-800 px-4 pt-2 pb-4 space-y-1.5 transition-colors duration-300">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive ? 'bg-amber-400 text-slate-950 font-bold shadow-sm' : 'text-stone-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-900'
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
