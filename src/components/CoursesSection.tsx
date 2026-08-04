import React, { useState } from 'react';
import { BookOpen, CheckCircle, Clock, Video, Sparkles, X, Guitar, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COURSES, ARTIST_INFO } from '../data/mockData';
import { Course } from '../types';

interface CoursesSectionProps {
  onAddToCart: (course: Course) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({ onAddToCart }) => {
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);
  const [enrollSuccessModal, setEnrollSuccessModal] = useState<Course | null>(null);

  const handleEnrollNow = (course: Course) => {
    onAddToCart(course);
    setEnrollSuccessModal(course);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <section className="py-12 bg-slate-950 text-slate-100 border-b border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Main Title */}
        <div className="border-b border-slate-800 pb-4">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
            KAWIN FINGERSTYLE COURSES
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            คอร์สเรียนกีตาร์ Fingerstyle แบบครบวงจร
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            เรียนรู้และพัฒนาทักษะการเล่นกีตาร์ฟิงเกอร์สไตล์ ตั้งแต่พื้นฐานจนถึงขั้นสูงและเทคนิคเฉพาะตัว
          </p>
        </div>

        {/* Dynamic Courses Grid */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.map((course) => (
              <div
                key={course.id}
                className="group bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/30 transition duration-300 flex flex-col shadow-xl"
              >
                <div className="relative h-48 bg-slate-950 border-b border-slate-800 overflow-hidden">
                  <img
                    src={course.coverUrl}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <span className="px-3 py-1 bg-slate-950/90 backdrop-blur-md border border-amber-500/30 text-amber-300 text-[11px] font-bold rounded-lg shadow-md w-fit">
                      {course.level}
                    </span>
                    {course.badge && (
                      <span className="px-3 py-1 bg-red-600/90 backdrop-blur-md text-white text-[11px] font-bold rounded-lg shadow-md w-fit">
                        {course.badge}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-amber-400/90 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{course.durationHours} ชั่วโมง</span>
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {course.thaiTitle}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {course.subtitle}
                  </p>

                  <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs text-slate-300">
                    {course.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-800/80 mt-auto space-y-3">
                  <div className="flex items-baseline justify-between pt-3">
                    <div>
                      <span className="text-xl font-extrabold text-white">
                        ฿{course.discountPrice || course.price}
                      </span>
                      {course.discountPrice && course.discountPrice < course.price && (
                        <span className="text-xs text-slate-500 line-through ml-2">
                          ฿{course.price}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" /> {course.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveCourseModal(course)}
                      className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 rounded-xl transition shadow-md"
                    >
                      ดูรายละเอียด
                    </button>
                    {course.id === 'course-vip-premium' ? (
                      <a
                        href="https://kawin-fingerstyle-studio.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1 text-center leading-tight"
                      >
                        เข้าสู่เว็บไซต์ <br/> (ไม่ต้องลงแอป)
                      </a>
                    ) : (
                      <a
                        href={ARTIST_INFO.lineOaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1 text-center"
                      >
                        <span>สมัครเรียน (LINE OA)</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Detail Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl shadow-amber-950/50">
            
            <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
              <h3 className="text-base font-bold text-white">{activeCourseModal.thaiTitle}</h3>
              <button
                onClick={() => setActiveCourseModal(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              <p className="text-sm text-slate-300 leading-relaxed">
                {activeCourseModal.description}
              </p>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-2">
                  รายละเอียดการเรียน
                </h4>
                <div className="space-y-3">
                  {activeCourseModal.syllabus.map((sec, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="text-xs font-bold text-amber-300">{sec.sectionTitle}</div>
                      <div className="space-y-1.5">
                        {sec.lessons.map((les) => (
                          <div key={les.id} className="flex items-center justify-between text-xs text-slate-400">
                            <span className="flex items-center gap-2">
                              {les.isFreePreview ? <Video className="w-3.5 h-3.5 text-emerald-400" /> : <BookOpen className="w-3.5 h-3.5" />}
                              {les.title}
                            </span>
                            <span className="text-[11px] text-slate-500">{les.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {activeCourseModal.level === 'เรียนสด Online (Private)' && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-2 text-xs text-amber-200">
                  <p className="font-bold text-amber-300">📲 ติดต่อสมัครเรียนสด Private Online</p>
                  <p>LINE ID: <span className="font-bold text-white">{ARTIST_INFO.lineId}</span> (มี @ ด้วยนะครับ)</p>
                  <p>เรียนผ่าน LINE Video Call, Google Meet หรือ Skype ตามที่คุณสะดวก</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-lg font-bold text-white w-full sm:w-auto text-center sm:text-left">
                ฿{activeCourseModal.discountPrice || activeCourseModal.price}
              </div>
              {activeCourseModal.id === 'course-vip-premium' ? (
                <div className="flex w-full sm:w-auto gap-2">
                  <a
                    href="https://vt.tiktok.com/ZSXoSanh8/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-800 text-white font-bold text-xs rounded-xl hover:bg-slate-700 shadow-md text-center border border-slate-700"
                  >
                    วิธีสมัครสมาชิก
                  </a>
                  <a
                    href="https://kawin-fingerstyle-studio.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-emerald-500 text-white font-bold text-xs rounded-xl hover:bg-emerald-400 shadow-md text-center"
                  >
                    เข้าสู่เว็บไซต์
                  </a>
                </div>
              ) : (
                <a
                  href={ARTIST_INFO.lineOaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-300 shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>สมัครเรียนผ่าน LINE OA ({ARTIST_INFO.lineId})</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {enrollSuccessModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 max-w-md text-center space-y-4 shadow-2xl">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">เพิ่มลงตะกร้าเรียบร้อยแล้ว!</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {enrollSuccessModal.thaiTitle} ถูกเพิ่มไปยังตระกร้าสินค้าเรียบร้อยแล้ว สามารถไปที่ตะกร้าเพื่อชำระเงิน หรือติดต่อ LINE <span className="font-bold text-amber-400">{ARTIST_INFO.lineId}</span>
            </p>
            <button
              onClick={() => setEnrollSuccessModal(null)}
              className="w-full py-2.5 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-300 shadow-md font-bold"
            >
              ตกลง
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
