import React, { useState } from 'react';
import { ShoppingBag, Check, X, Sparkles, ExternalLink, Store, Play, Film } from 'lucide-react';
import { PRODUCTS, ARTIST_INFO } from '../data/mockData';
import { Product } from '../types';

interface MerchSectionProps {
  onAddToCart: (product: Product) => void;
}

export const MerchSection: React.FC<MerchSectionProps> = ({ onAddToCart }) => {
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [activeVideoModal, setActiveVideoModal] = useState<{ title: string; embedUrl: string } | null>(null);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setAddedNotice(product.name);
    setTimeout(() => {
      setAddedNotice(null);
    }, 2000);
  };

  return (
    <section className="py-14 bg-stone-50 dark:bg-slate-950 text-stone-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold block mb-1">
              OFFICIAL STORE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight">
              ร้านค้า E-BOOK และ อื่นๆ
            </h2>
            <p className="text-stone-500 dark:text-slate-400 text-sm mt-1">
              E-Book สอนเล่น Fingerstyle, แท็บเพลงพร้อม Audio, และอุปกรณ์สำหรับคนรักกีตาร์
            </p>
          </div>

          {/* Toast Notice */}
          {addedNotice && (
            <div className="bg-amber-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 shadow-lg animate-pulse">
              <Check className="w-4 h-4 stroke-[3]" />
              <span>เพิ่ม "{addedNotice}" ลงตะกร้าแล้ว</span>
            </div>
          )}
        </div>

        {/* HappyHome Music Store Banner Link */}
        <div className="mb-8">
          <a
            href={ARTIST_INFO.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition shadow-lg hover:shadow-amber-500/20"
          >
            <Store className="w-4 h-4" />
            <span>ร้านจำหน่ายกีตาร์และอุปกรณ์ (HappyHome Music)</span>
            <ExternalLink className="w-4 h-4 ml-0.5 opacity-80" />
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-slate-900/40 border border-stone-200/50 dark:border-none rounded-2xl overflow-hidden flex flex-col justify-between hover:bg-stone-50 dark:hover:bg-slate-900/60 transition duration-300 shadow-sm dark:shadow-md"
            >
              <div>
                <div className="relative h-60 bg-stone-100 dark:bg-slate-950 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-stone-900/90 dark:bg-slate-950/90 backdrop-blur-md text-amber-300 font-mono text-[10px] font-bold rounded-lg shadow-md">
                      {product.badge}
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider block">
                    {product.category}
                  </span>
                  <h3 className="text-base font-bold text-stone-900 dark:text-white">{product.thaiName}</h3>
                  <p className="text-xs text-stone-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 mt-2 space-y-3">
                {product.youtubeEmbedUrl && (
                  <button
                    onClick={() => setActiveVideoModal({
                      title: '🎬 วิดีโอแนะนำเว็บไซต์ ChordScale Master',
                      embedUrl: product.youtubeEmbedUrl!
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>🎬 ดูวิดีโอแนะนำเว็บไซต์</span>
                  </button>
                )}

                <div className="flex items-center justify-between pt-2 font-mono">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-amber-600 dark:text-amber-400">฿{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-stone-400 dark:text-slate-500 line-through">฿{product.originalPrice}</span>
                    )}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-500/10 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
                    <span>พร้อมสั่งซื้อ</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDetailProduct(product)}
                    className="px-3 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 text-xs font-mono font-bold rounded-xl transition cursor-pointer"
                  >
                    รายละเอียด
                  </button>

                  {product.externalUrl ? (
                    <a
                      href={product.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs font-mono rounded-xl shadow-md hover:shadow-amber-500/20 transition flex items-center justify-center gap-1"
                    >
                      <span>เข้าใช้งาน (฿{product.price})</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  ) : (
                    <button
                      onClick={() => handleAdd(product)}
                      className="px-3 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs font-mono rounded-xl shadow-md hover:shadow-amber-500/20 transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                      <span>สั่งซื้อ / ลงตะกร้า</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Product Detail Modal */}
      {detailProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl space-y-4 border border-stone-200 dark:border-none max-h-[90vh] flex flex-col">
            <div className="p-4 bg-stone-50 dark:bg-slate-950 border-b border-stone-200 dark:border-none flex items-center justify-between shrink-0">
              <h3 className="text-base font-bold text-stone-900 dark:text-white">{detailProduct.thaiName}</h3>
              <button
                onClick={() => setDetailProduct(null)}
                className="p-1.5 rounded-lg bg-stone-200 text-stone-600 hover:text-stone-950 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto">
              {detailProduct.youtubeEmbedUrl ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-800 dark:text-slate-200 flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5 text-red-500 fill-current" />
                      <span>วิดีโอแนะนำเว็บไซต์ (ดูในหน้าเว็บได้ทันที):</span>
                    </span>
                  </div>
                  <div className="w-full max-w-[260px] mx-auto aspect-[9/16] rounded-xl overflow-hidden border border-stone-200 dark:border-slate-800 shadow-lg bg-slate-950">
                    <iframe
                      src={detailProduct.youtubeEmbedUrl}
                      title="ChordScale Master Video Preview"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : (
                <div className="h-52 rounded-xl overflow-hidden bg-stone-100 dark:bg-slate-950 shadow-md">
                  <img
                    src={detailProduct.imageUrl}
                    alt={detailProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {detailProduct.description}
              </p>

              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-slate-950/80 border border-stone-200/50 dark:border-none space-y-2 text-xs text-amber-700 dark:text-amber-300 font-sans">
                {(detailProduct.specifications || detailProduct.details || []).map((spec, idx) => (
                  <div key={idx} className="leading-snug">{spec.startsWith('✅') || spec.startsWith('•') || spec.startsWith('📹') ? spec : `• ${spec}`}</div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-stone-100 dark:border-slate-800">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black font-mono text-amber-600 dark:text-amber-400">฿{detailProduct.price}</span>
                  {detailProduct.originalPrice && (
                    <span className="text-xs text-stone-400 dark:text-slate-500 line-through">฿{detailProduct.originalPrice}</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {detailProduct.externalUrl ? (
                    <a
                      href={detailProduct.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl font-mono shadow-lg transition flex items-center justify-center gap-1.5"
                    >
                      <span>เข้าสู่เว็บไซต์ (฿{detailProduct.price})</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        handleAdd(detailProduct);
                        setDetailProduct(null);
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl font-mono shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>สั่งซื้อ / เพิ่มลงตะกร้า (฿{detailProduct.price})</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Standalone Video Player Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-amber-500/30 rounded-2xl w-full max-w-sm sm:max-w-md overflow-hidden shadow-2xl relative space-y-3">
            <div className="p-3 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2 pr-2 overflow-hidden">
                <Film className="w-4 h-4 text-amber-400 shrink-0" />
                <h3 className="text-xs font-bold text-white truncate">{activeVideoModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
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

    </section>
  );
};
