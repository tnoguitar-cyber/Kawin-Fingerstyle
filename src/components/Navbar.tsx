import React, { useState } from 'react';
import { Music, ShoppingBag, Send, Menu, X, BookOpen, User, FileText, Gift } from 'lucide-react';
import { ARTIST_INFO } from '../data/mockData';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
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
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-amber-500/10 text-slate-100 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Kawin Avatar */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-amber-500/40 overflow-hidden group-hover:border-amber-400 transition shadow-md shadow-amber-950/40">
              <img
                src={ARTIST_INFO.profileImageUrl}
                alt="Kawin"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-white block group-hover:text-amber-300 transition">
                Kawin Fingerstyle
              </span>
              <span className="text-[11px] text-amber-400/90 font-medium block -mt-0.5 tracking-wide">
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
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Cart Button & Mobile Menu Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-100 transition flex items-center justify-center shadow-md"
              title="ตะกร้าสินค้า"
            >
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-400 text-slate-950 font-bold text-xs rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-900'
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
