import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, CreditCard, QrCode, CheckCircle2, MessageCircle, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';
import { ARTIST_INFO } from '../data/mockData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onClearCart,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'promptpay' | 'credit'>('promptpay');
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
  });

  if (!isOpen) return null;

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
    });
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-end">
      <div className="bg-white dark:bg-slate-900 border-l border-stone-200 dark:border-amber-500/20 w-full max-w-md h-full flex flex-col text-stone-900 dark:text-slate-100 shadow-2xl relative transition-colors duration-300">
        
        {/* Header */}
        <div className="p-4 border-b border-stone-200 dark:border-slate-800 flex items-center justify-between bg-stone-50 dark:bg-slate-950">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <h3 className="text-sm font-bold text-stone-900 dark:text-white font-mono">
              {step === 'cart' && 'ตะกร้าสินค้า'}
              {step === 'checkout' && 'ชำระเงิน'}
              {step === 'success' && 'สั่งซื้อสำเร็จ'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {step === 'cart' && (
            <>
              {cartItems.length === 0 ? (
                <div className="text-center py-20 space-y-3">
                  <ShoppingBag className="w-12 h-12 text-stone-300 dark:text-slate-700 mx-auto" />
                  <p className="text-sm font-bold text-stone-900 dark:text-white">ยังไม่มีสินค้าในตะกร้า</p>
                  <p className="text-xs text-stone-500 dark:text-slate-400">
                    เลือกคอร์สเรียน หรือสินค้าออฟฟิเชียล Kawin Fingerstyle แล้วกดสั่งซื้อได้เลย
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 rounded-xl flex items-center justify-between gap-3 shadow-sm dark:shadow-md"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-12 h-14 rounded-lg object-contain p-0.5 shrink-0 border border-stone-200 dark:border-slate-800 bg-stone-100 dark:bg-slate-900"
                      />
                      <div className="flex-1 overflow-hidden">
                        <h4 className="text-xs font-bold text-stone-900 dark:text-white truncate">{item.title}</h4>
                        <span className="text-xs text-amber-700 dark:text-amber-300 font-mono font-bold">
                          ฿{item.price} {item.quantity > 1 && `(x${item.quantity})`}
                        </span>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 text-stone-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {step === 'checkout' && (
            <form id="checkout-form" onSubmit={handleCompleteOrder} className="space-y-4 text-xs">
              {/* LINE OA Direct Payment Callout */}
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-white text-xs">
                  <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>ชำระเงินและแจ้งสลิปผ่าน LINE OA</span>
                </div>
                <p className="text-[11px] text-stone-600 dark:text-slate-300 leading-relaxed">
                  กดปุ่มด้านล่างเพื่อติดต่อแอดมินและชำระเงินผ่าน LINE OA <strong className="text-emerald-600 dark:text-emerald-400">{ARTIST_INFO.lineId}</strong> ได้สะดวกและรวดเร็วที่สุด
                </p>
                <a
                  href={ARTIST_INFO.lineOaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl transition flex items-center justify-center gap-1.5 shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>ชำระเงิน / แจ้งสลิปที่ LINE OA ({ARTIST_INFO.lineId})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="space-y-2 font-mono">
                <label className="block text-amber-700 dark:text-amber-400 font-bold">หรือเลือกช่องทางชำระเงินอื่น</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('promptpay')}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition ${
                      paymentMethod === 'promptpay'
                        ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md'
                        : 'bg-stone-50 dark:bg-slate-950 text-stone-500 dark:text-slate-400 border-stone-200 dark:border-slate-800'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span>PromptPay QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit')}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition ${
                      paymentMethod === 'credit'
                        ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md'
                        : 'bg-stone-50 dark:bg-slate-950 text-stone-500 dark:text-slate-400 border-stone-200 dark:border-slate-800'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>บัตรเครดิต</span>
                  </button>
                </div>
              </div>

              {paymentMethod === 'promptpay' && (
                <div className="p-4 bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 rounded-xl text-center space-y-2">
                  <span className="text-[11px] text-stone-500 dark:text-slate-400 block font-semibold">สแกน QR Code ชำระเงิน</span>
                  <div className="w-36 h-36 bg-white mx-auto p-2 rounded-xl flex items-center justify-center shadow-lg">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=KawinFingerstylePayment"
                      alt="PromptPay QR"
                      className="w-full h-full"
                    />
                  </div>
                  <span className="text-sm font-black text-amber-700 dark:text-amber-300 block">ยอดชำระ: ฿{totalPrice}</span>
                </div>
              )}

              <div className="space-y-2 font-mono">
                <label className="block text-amber-700 dark:text-amber-400 font-bold">ข้อมูลจัดส่ง / ติดต่อ</label>
                <input
                  type="text"
                  required
                  value={shippingInfo.name}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                  placeholder="ชื่อ-นามสกุล"
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 rounded-xl text-stone-900 dark:text-white focus:outline-none focus:border-amber-500/50"
                />
                <input
                  type="tel"
                  required
                  value={shippingInfo.phone}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                  placeholder="เบอร์โทรศัพท์"
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 rounded-xl text-stone-900 dark:text-white focus:outline-none focus:border-amber-500/50"
                />
                <input
                  type="email"
                  required
                  value={shippingInfo.email}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                  placeholder="อีเมล (เพื่อรับลิงก์คอร์ส/TAB)"
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 rounded-xl text-stone-900 dark:text-white focus:outline-none focus:border-amber-500/50"
                />
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold text-stone-900 dark:text-white">ชำระเงินและสั่งซื้อเรียบร้อย!</h4>
              <p className="text-xs text-stone-600 dark:text-slate-300">
                ขอบคุณที่สนับสนุน Kawin Fingerstyle ทีมงานจะจัดส่งสินค้าและส่งลิงก์เข้าเรียนผ่านอีเมลที่คุณระบุไว้
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950 space-y-2">
          {step === 'cart' && cartItems.length > 0 && (
            <>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-stone-500 dark:text-slate-400">ราคารวมทั้งหมด:</span>
                <span className="text-lg font-black text-amber-700 dark:text-amber-300">฿{totalPrice}</span>
              </div>
              <div className="space-y-2">
                <a
                  href={ARTIST_INFO.lineOaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>ชำระเงินผ่าน LINE OA ({ARTIST_INFO.lineId})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </>
          )}

          {step === 'checkout' && (
            <div className="flex gap-2 font-mono">
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="w-1/3 py-3 bg-stone-200 text-stone-700 dark:bg-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl"
              >
                ย้อนกลับ
              </button>
              <button
                type="submit"
                form="checkout-form"
                className="w-2/3 py-3 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-300 shadow-md"
              >
                ยืนยันชำระ ฿{totalPrice}
              </button>
            </div>
          )}

          {step === 'success' && (
            <button
              onClick={() => {
                setStep('cart');
                onClose();
              }}
              className="w-full py-3 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl font-mono hover:bg-amber-300 shadow-md"
            >
              ปิดหน้าต่าง
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
