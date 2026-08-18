import React, { useState } from 'react';
import { BookOpen, CheckCircle, Clock, Video, Sparkles, X, Guitar, Star, Play, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COURSES, ARTIST_INFO } from '../data/mockData';
import { Course } from '../types';

interface CoursesSectionProps {
  onAddToCart: (course: Course) => void;
  isHomepage?: boolean;
  onNavigate?: (tab: string) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({ onAddToCart, isHomepage = false, onNavigate }) => {
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);
  const [enrollSuccessModal, setEnrollSuccessModal] = useState<Course | null>(null);
  const [activeVideoModal, setActiveVideoModal] = useState<{ title: string; embedUrl: string } | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleEnrollNow = (course: Course) => {
    onAddToCart(course);
    setEnrollSuccessModal(course);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const displayedCourses = isHomepage && !expanded ? COURSES.slice(0, 2) : COURSES;
  const hasMore = isHomepage && COURSES.length > 2;

  return (
    <section className="py-12 bg-stone-50 dark:bg-slate-950 text-stone-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Main Title */}
        <div className="pb-4">
          <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold block mb-1">
            KAWIN FINGERSTYLE COURSES
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            คอร์สเรียนกีตาร์ Fingerstyle แบบครบวงจร
          </h2>
          <p className="text-stone-500 dark:text-slate-400 text-sm mt-1">
            เรียนรู้และพัฒนาทักษะการเล่นกีตาร์ฟิงเกอร์สไตล์ ตั้งแต่พื้นฐานจนถึงขั้นสูงและเทคนิคเฉพาะตัว
          </p>
        </div>

        {/* Dynamic Courses Grid */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCourses.map((course) => (
              <div
                key={course.id}
                className="group bg-white dark:bg-slate-900/40 border border-stone-200/50 dark:border-none rounded-2xl overflow-hidden hover:bg-stone-50 dark:hover:bg-slate-900/60 transition duration-300 flex flex-col shadow-sm dark:shadow-md"
              >
                <div className="relative h-48 bg-stone-100 dark:bg-slate-950 overflow-hidden">
                  <img
                    src={course.coverUrl}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <span className="px-3 py-1 bg-stone-900/90 dark:bg-slate-950/90 backdrop-blur-md text-amber-300 text-[11px] font-bold rounded-lg shadow-md w-fit">
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
                  <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400/90 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{course.durationHours === 999 ? 'ใช้งานได้ไม่จำกัด (ตลอดชีพ)' : `${course.durationHours} ชั่วโมง`}</span>
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white leading-snug">
                    {course.thaiTitle}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {course.subtitle}
                  </p>

                  <div className="pt-2 space-y-1.5 text-xs text-stone-600 dark:text-slate-300">
                    {course.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 pt-0 mt-auto space-y-3">
                  <div className="flex items-baseline justify-between pt-3">
                    <div>
                      <span className="text-xl font-extrabold text-stone-900 dark:text-white">
                        ฿{course.discountPrice || course.price}
                      </span>
                      {course.discountPrice && course.discountPrice < course.price && (
                        <span className="text-xs text-stone-400 dark:text-slate-500 line-through ml-2">
                          ฿{course.price}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" /> {course.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {course.youtubeEmbedUrl && (
                    <button
                      onClick={() => setActiveVideoModal({
                        title: `🎬 วิดีโอแนะนำ ${course.thaiTitle}`,
                        embedUrl: course.youtubeEmbedUrl!
                      })}
                      className="w-full px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-700 dark:text-red-300 border border-red-500/20 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 text-red-500 fill-current" />
                      <span>🎬 ดูวิดีโอแนะนำเว็บไซต์</span>
                    </button>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveCourseModal(course)}
                      className="px-3 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition shadow-sm cursor-pointer"
                    >
                      ดูรายละเอียด
                    </button>
                    {course.externalUrl ? (
                      <a
                        href={course.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1 text-center leading-tight"
                      >
                        เข้าสู่เว็บไซต์ <br/> (ไม่ต้องลงแอป)
                      </a>
                    ) : course.id === 'course-vip-premium' ? (
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

          {/* See More Buttons on Homepage */}
          {isHomepage && hasMore && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setExpanded(!expanded)}
                className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-800 dark:text-slate-200 hover:border-amber-500/50 hover:bg-stone-50 dark:hover:bg-slate-800 text-xs font-bold transition flex items-center gap-2 shadow-sm cursor-pointer"
              >
                {expanded ? (
                  <>
                    <span>ย่อคอร์สเรียน (Show Less)</span>
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>ดูคอร์สเรียนเพิ่มเติม (See More +{COURSES.length - 2} คอร์ส)</span>
                    <ChevronDown className="w-4 h-4 text-amber-500" />
                  </>
                )}
              </button>

              {onNavigate && (
                <button
                  onClick={() => onNavigate('courses')}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center gap-2 shadow-md hover:shadow-amber-500/20 cursor-pointer"
                >
                  <span>ดูคอร์สเรียนทั้งหมด ({COURSES.length} คอร์ส)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Course Detail Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-stone-200 dark:border-none">
            
            <div className="p-4 bg-stone-50 dark:bg-slate-950 border-b border-stone-200 dark:border-none flex items-center justify-between">
              <h3 className="text-base font-bold text-stone-900 dark:text-white">{activeCourseModal.thaiTitle}</h3>
              <button
                onClick={() => setActiveCourseModal(null)}
                className="p-1.5 rounded-lg bg-stone-200 text-stone-600 hover:text-stone-950 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              <p className="text-sm text-stone-600 dark:text-slate-300 leading-relaxed">
                {activeCourseModal.description}
              </p>

              {activeCourseModal.youtubeEmbedUrl && (
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>วิดีโอแนะนำ {activeCourseModal.thaiTitle}</span>
                  </h4>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-stone-200 dark:border-slate-800 shadow-md">
                    <iframe
                      src={activeCourseModal.youtubeEmbedUrl}
                      title={activeCourseModal.thaiTitle}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold mb-2">
                  รายละเอียดการเรียน
                </h4>
                <div className="space-y-3">
                  {activeCourseModal.syllabus.map((sec, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-stone-50 dark:bg-slate-950/80 border border-stone-200/50 dark:border-none space-y-2">
                      <div className="text-xs font-bold text-amber-700 dark:text-amber-300">{sec.sectionTitle}</div>
                      <div className="space-y-1.5">
                        {sec.lessons.map((les) => (
                          <div key={les.id} className="flex items-center justify-between text-xs text-stone-600 dark:text-slate-400">
                            <span className="flex items-center gap-2">
                              {les.isFreePreview ? <Video className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> : <BookOpen className="w-3.5 h-3.5 text-stone-400 dark:text-slate-400" />}
                              {les.title}
                            </span>
                            <span className="text-[11px] text-stone-400 dark:text-slate-500">{les.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {activeCourseModal.level === 'เรียนสด Online (Private)' && (
                <div className="p-4 bg-amber-500/10 rounded-xl space-y-2 text-xs text-amber-800 dark:text-amber-200">
                  <p className="font-bold text-amber-700 dark:text-amber-300">📲 ติดต่อสมัครเรียนสด Private Online</p>
                  <p>LINE ID: <span className="font-bold text-stone-900 dark:text-white">{ARTIST_INFO.lineId}</span> (มี @ ด้วยนะครับ)</p>
                  <p>เรียนผ่าน LINE Video Call, Google Meet หรือ Skype ตามที่คุณสะดวก</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-stone-50 dark:bg-slate-950 border-t border-stone-200 dark:border-none flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-lg font-bold text-stone-900 dark:text-white w-full sm:w-auto text-center sm:text-left">
                ฿{activeCourseModal.discountPrice || activeCourseModal.price}
              </div>
              {activeCourseModal.externalUrl ? (
                <a
                  href={activeCourseModal.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 text-white font-bold text-xs rounded-xl hover:bg-emerald-400 shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>เข้าสู่เว็บไซต์ {activeCourseModal.thaiTitle} (ใช้งานได้ทันที)</span>
                </a>
              ) : activeCourseModal.id === 'course-vip-premium' ? (
                <div className="flex w-full sm:w-auto gap-2">
                  <a
                    href="https://vt.tiktok.com/ZSXoSanh8/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-800 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 font-bold text-xs rounded-xl shadow-md text-center"
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
          <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-none rounded-2xl p-6 max-w-md text-center space-y-4 shadow-2xl">
            <CheckCircle className="w-12 h-12 text-emerald-500 dark:text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-stone-900 dark:text-white">เพิ่มลงตะกร้าเรียบร้อยแล้ว!</h3>
            <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed">
              {enrollSuccessModal.thaiTitle} ถูกเพิ่มไปยังตระกร้าสินค้าเรียบร้อยแล้ว สามารถไปที่ตะกร้าเพื่อชำระเงิน หรือติดต่อ LINE <span className="font-bold text-amber-600 dark:text-amber-400">{ARTIST_INFO.lineId}</span>
            </p>
            <button
              onClick={() => setEnrollSuccessModal(null)}
              className="w-full py-2.5 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-300 shadow-md cursor-pointer"
            >
              ตกลง
            </button>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {activeVideoModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveVideoModal(null)}
        >
          <div 
            className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl border border-stone-200 dark:border-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-stone-50 dark:bg-slate-950 border-b border-stone-200 dark:border-none flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2">
                <Play className="w-4 h-4 text-red-500 fill-current" />
                <span>{activeVideoModal.title}</span>
              </h3>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1 rounded-lg bg-stone-200 text-stone-600 hover:text-stone-950 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 bg-black flex items-center justify-center">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                <iframe
                  src={activeVideoModal.embedUrl}
                  title={activeVideoModal.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
