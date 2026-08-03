import React, { useState } from 'react';
import { ShoppingBag, Check, X, Sparkles, ExternalLink, Store } from 'lucide-react';
import { PRODUCTS, ARTIST_INFO } from '../data/mockData';
import { Product } from '../types';

interface MerchSectionProps {
  onAddToCart: (product: Product) => void;
}

export const MerchSection: React.FC<MerchSectionProps> = ({ onAddToCart }) => {
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setAddedNotice(product.name);
    setTimeout(() => {
      setAddedNotice(null);
    }, 2000);
  };

  return (
    <section className="py-14 bg-slate-950 text-slate-100 border-b border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-800 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
              OFFICIAL STORE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              ร้านค้า Kawin Fingerstyle
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              หนังสือรวม TAB พร้อมลายเซ็น, คาโป้ premium, ปิ๊ก และอุปกรณ์ดูแลกีตาร์
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
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition shadow-lg hover:shadow-amber-500/20 border border-amber-300/50"
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
              className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-amber-500/40 transition duration-300 shadow-xl"
            >
              <div>
                <div className="relative h-60 bg-slate-950 border-b border-slate-800 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-slate-950/90 backdrop-blur-md border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold rounded-lg shadow-md">
                      {product.badge}
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                    {product.category}
                  </span>
                  <h3 className="text-base font-bold text-white">{product.thaiName}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-800/80 mt-2 space-y-3">
                <div className="flex items-center justify-between pt-3 font-mono">
                  {product.externalUrl ? (
                    <>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black text-amber-400">฿{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-slate-500 line-through">฿{product.originalPrice}</span>
                        )}
                      </div>
                      <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>พร้อมใช้งาน</span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-base font-extrabold text-amber-400 tracking-wide">Coming Soon</span>
                      <span className="text-[11px] font-bold text-amber-400/90 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                        <span>เร็วๆ นี้</span>
                      </span>
                    </>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDetailProduct(product)}
                    className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono font-bold text-slate-200 rounded-xl transition"
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
                      disabled
                      className="px-3 py-2.5 bg-slate-800/80 text-amber-300 font-bold text-xs font-mono rounded-xl border border-amber-500/30 cursor-not-allowed opacity-90 flex items-center justify-center gap-1 shadow-sm"
                    >
                      <span>Coming Soon</span>
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
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl shadow-amber-950/50 space-y-4">
            <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
              <h3 className="text-base font-bold text-white">{detailProduct.thaiName}</h3>
              <button
                onClick={() => setDetailProduct(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="h-52 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-md">
                <img
                  src={detailProduct.imageUrl}
                  alt={detailProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                {detailProduct.description}
              </p>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-amber-300 font-sans">
                {(detailProduct.specifications || detailProduct.details || []).map((spec, idx) => (
                  <div key={idx} className="leading-snug">{spec.startsWith('✅') || spec.startsWith('•') ? spec : `• ${spec}`}</div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                {detailProduct.externalUrl ? (
                  <>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black font-mono text-amber-400">฿{detailProduct.price}</span>
                      {detailProduct.originalPrice && (
                        <span className="text-xs text-slate-500 line-through">฿{detailProduct.originalPrice}</span>
                      )}
                    </div>
                    <a
                      href={detailProduct.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl font-mono shadow-lg transition flex items-center gap-1.5"
                    >
                      <span>เข้าสู่เว็บไซต์ (฿{detailProduct.price})</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </>
                ) : (
                  <>
                    <span className="text-xl font-black font-mono text-amber-400">Coming Soon</span>
                    <button
                      disabled
                      className="px-5 py-2.5 bg-slate-800 text-amber-300 font-bold text-xs rounded-xl font-mono border border-amber-500/30 cursor-not-allowed opacity-90 shadow-md"
                    >
                      Coming Soon (เร็วๆ นี้)
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
