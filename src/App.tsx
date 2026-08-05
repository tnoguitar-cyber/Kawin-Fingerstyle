import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ArtistBioSection } from './components/ArtistBioSection';
import { DiscographySection } from './components/DiscographySection';
import { OriginalTabsSection } from './components/OriginalTabsSection';
import { FreeTabsSection } from './components/FreeTabsSection';
import { CoursesSection } from './components/CoursesSection';
import { MerchSection } from './components/MerchSection';
import { TourBookingSection } from './components/TourBookingSection';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { Course, Product, CartItem } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved === 'dark' || saved === 'light') ? saved : 'light';
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.setProperty('--calendar-icon-filter', 'invert(0.8)');
      root.style.setProperty('--scrollbar-track', '#020617');
      root.style.setProperty('--scrollbar-thumb', '#334155');
    } else {
      root.classList.remove('dark');
      root.style.setProperty('--calendar-icon-filter', 'none');
      root.style.setProperty('--scrollbar-track', '#fafaf9');
      root.style.setProperty('--scrollbar-thumb', '#d6d3d1');
    }
  }, [theme]);

  const handleAddToCart = (item: Course | Product) => {
    const itemId = item.id;
    const itemType = 'level' in item ? 'course' : 'product';
    const title = 'thaiTitle' in item ? item.thaiTitle : item.thaiName;
    const price = 'discountPrice' in item && item.discountPrice ? item.discountPrice : item.price;
    const imageUrl = 'coverUrl' in item ? item.coverUrl : item.imageUrl;

    setCartItems((prev) => {
      const existing = prev.find((i) => i.itemId === itemId);
      if (existing) {
        return prev.map((i) => (i.itemId === itemId ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          id: `${itemType}-${itemId}-${Date.now()}`,
          type: itemType,
          itemId,
          title,
          price,
          imageUrl,
          quantity: 1,
        },
      ];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenBooking = () => {
    setActiveTab('tour');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    const handleOpenAdmin = () => {
      setActiveTab((prev) => (prev === 'home' || prev === 'tabs' ? prev : 'tabs'));
    };
    window.addEventListener('open-admin-modal', handleOpenAdmin);
    return () => window.removeEventListener('open-admin-modal', handleOpenAdmin);
  }, []);

  // Dynamic SEO page title and meta description update
  React.useEffect(() => {
    const titleMap: Record<string, string> = {
      home: 'Kawin Fingerstyle | กีตาร์บรรเลง แท็บกีตาร์ คอร์สเรียนออนไลน์ & Official Store',
      albums: 'อัลบั้มเพลง & ผลงานดนตรีบรรเลง | Kawin Fingerstyle',
      tabs: 'แท็บกีตาร์ฟิงเกอร์สไตล์ (Guitar TAB) | Kawin Fingerstyle',
      freetabs: 'แจก TAB กีตาร์ฟรี (Free Guitar TABs) | Kawin Fingerstyle',
      courses: 'คอร์สเรียนกีตาร์ออนไลน์ | Kawin Fingerstyle',
      products: 'สินค้าออฟฟิเชียล & เสื้อยืด | Kawin Fingerstyle Store',
      tour: 'ติดต่องานแสดง & ตารางทัวร์ | Kawin Fingerstyle',
    };

    const descMap: Record<string, string> = {
      home: 'เว็บไซต์อย่างเป็นทางการของ Kawin Fingerstyle รวมผลงานเพลงอัลบั้มกีตาร์บรรเลง แจกและจำหน่ายแท็บกีตาร์ คอร์สเรียนกีตาร์ออนไลน์ และสินค้าออฟฟิเชียล',
      albums: 'ฟังเพลงและดูอัลบั้มผลงานกีตาร์บรรเลงฟิงเกอร์สไตล์ โดย Kawin Fingerstyle พร้อมลิงก์ฟังบน Streaming Platform',
      tabs: 'ดาวน์โหลดและซื้อแท็บกีตาร์ (Guitar TAB) เพลงออริจินัลและเพลงเรียบเรียงฟิงเกอร์สไตล์ คุณภาพสูง รวบรวมโดย Kawin Fingerstyle',
      freetabs: 'คลังโน้ตและแท็บกีตาร์ฟิงเกอร์สไตล์ แจกให้ดาวน์โหลดฟรีเพื่อนำไปใช้ในการฝึกซ้อมและพัฒนาฝีมือการเล่นกีตาร์บรรเลง รวบรวมโดย Kawin Fingerstyle',
      courses: 'เรียนกีตาร์ฟิงเกอร์สไตล์ตั้งแต่พื้นฐานจนถึงระดับสูง คอร์สเรียนออนไลน์แบบวิดีโอเข้าเรียนได้ตลอดชีวิต พร้อมแท็บประกอบ',
      products: 'สินค้าอย่างเป็นทางการจาก Kawin Fingerstyle เสื้อยืดลายเอ็กซ์คลูซีฟ ปิ๊กกีตาร์ และอุปกรณ์สำหรับคนรักกีตาร์',
      tour: 'จองคิวงานแสดง มินิคอนเสิร์ต เวิร์กช็อป หรือติดต่องานดนตรีกับ Kawin Fingerstyle เช็กตารางงานแสดงล่าสุดได้ที่นี่',
    };

    document.title = titleMap[activeTab] || titleMap.home;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', descMap[activeTab] || descMap.home);
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 dark:bg-slate-950 dark:text-slate-100 selection:bg-amber-400 selection:text-slate-950 overflow-x-hidden w-full max-w-full transition-colors duration-300">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBooking={handleOpenBooking}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Page Views */}
      <main className="min-h-[80vh]">
        {activeTab === 'home' && (
          <>
            <HeroSection
              onNavigate={setActiveTab}
            />
            <ArtistBioSection />
            <DiscographySection />
            <OriginalTabsSection />
            <FreeTabsSection />
            <CoursesSection onAddToCart={handleAddToCart} />
            <MerchSection onAddToCart={handleAddToCart} />
            <TourBookingSection />
          </>
        )}

        {activeTab === 'albums' && (
          <div className="pt-4">
            <DiscographySection />
          </div>
        )}

        {activeTab === 'tabs' && (
          <div className="pt-4">
            <OriginalTabsSection />
          </div>
        )}

        {activeTab === 'freetabs' && (
          <div className="pt-4">
            <FreeTabsSection />
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="pt-4">
            <CoursesSection onAddToCart={handleAddToCart} />
          </div>
        )}

        {activeTab === 'products' && (
          <div className="pt-4">
            <MerchSection onAddToCart={handleAddToCart} />
          </div>
        )}

        {activeTab === 'tour' && (
          <div className="pt-4">
            <TourBookingSection />
          </div>
        )}
      </main>

      {/* Shopping Cart Slide-over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Global Footer */}
      <Footer onNavigate={setActiveTab} />
    </div>
  );
}
