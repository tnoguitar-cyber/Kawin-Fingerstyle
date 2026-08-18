import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, X, Share2, Search, Sparkles, ChevronRight, ChevronUp, ChevronDown, CheckCircle2, Lightbulb, Music } from 'lucide-react';
import { ARTICLES } from '../data/mockData';
import { Article } from '../types';

interface ArticlesSectionProps {
  isHomepage?: boolean;
  onNavigate?: (tab: string) => void;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({ isHomepage = false, onNavigate }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('ทั้งหมด');
  const [expanded, setExpanded] = useState<boolean>(false);

  const categories = ['ทั้งหมด', ...Array.from(new Set(ARTICLES.map((a) => a.category)))];

  const filteredArticles = ARTICLES.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'ทั้งหมด' || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const displayedArticles = isHomepage && !expanded ? filteredArticles.slice(0, 2) : filteredArticles;
  const hasMore = isHomepage && filteredArticles.length > 2;

  const handleShare = (article: Article) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('คัดลอกลิงก์เรียบร้อยแล้ว!');
    }
  };

  return (
    <section id="articles" className="py-12 sm:py-16 bg-stone-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300/60 dark:border-amber-700/50 text-amber-800 dark:text-amber-300 text-xs font-bold tracking-wide uppercase mb-3 shadow-xs">
            <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>GUITAR TIPS & KNOWLEDGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            บทความเกร็ดความรู้
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-slate-300 leading-relaxed">
            รวบรวมเทคนิค เทคนิคการใช้นิ้ว PIMA, แบบฝึกหัดแก้ปัญหานิ้วสะดุด, การควบคุมจังหวะ และเคล็ดลับการเล่น Fingerstyle ให้ไพเราะจาก Kawin Fingerstyle
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition ${
                  activeCategory === category
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-stone-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800 border border-stone-200 dark:border-slate-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="ค้นหาบทความ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer bg-white dark:bg-slate-900/90 rounded-2xl border border-stone-200/80 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col h-full"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/9] overflow-hidden bg-stone-100 dark:bg-slate-950">
                <img
                  src={article.coverUrl}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-lg bg-stone-900/80 backdrop-blur-md text-amber-300 text-[11px] font-semibold border border-amber-400/30">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-[11px] text-stone-500 dark:text-slate-400 mb-2.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    {article.readTime}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    {article.publishedDate}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition line-clamp-2 mb-2 leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4 flex-1">
                  {article.excerpt}
                </p>

                <div className="pt-3 border-t border-stone-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400">
                  <span className="flex items-center gap-1">
                    อ่านบทความฉบับเต็ม
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                  </span>
                  <span className="text-[11px] text-stone-400 dark:text-slate-500 font-normal">
                    {article.author}
                  </span>
                </div>
              </div>
            </article>
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
                  <span>ย่อบทความ (Show Less)</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>ดูบทความเพิ่มเติม (See More +{filteredArticles.length - 2} เรื่อง)</span>
                  <ChevronDown className="w-4 h-4 text-amber-500" />
                </>
              )}
            </button>

            {onNavigate && (
              <button
                onClick={() => onNavigate('articles')}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center gap-2 shadow-md hover:shadow-amber-500/20 cursor-pointer"
              >
                <span>ดูคลังบทความทั้งหมด ({ARTICLES.length} บทความ)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {filteredArticles.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-900/60 rounded-2xl border border-stone-200 dark:border-slate-800">
            <BookOpen className="w-12 h-12 text-stone-400 mx-auto mb-3" />
            <p className="text-stone-600 dark:text-slate-300 font-medium text-sm">
              ไม่พบบทความที่ค้นหา ลองค้นหาด้วยคำอื่นนะครับ
            </p>
          </div>
        )}

      </div>

      {/* Full Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex justify-center p-3 sm:p-6 md:p-10 animate-fade-in">
          <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-stone-200 dark:border-slate-800 overflow-hidden shadow-2xl my-auto text-stone-900 dark:text-slate-100">
            
            {/* Modal Header Bar */}
            <div className="sticky top-0 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-5 py-4 border-b border-stone-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 font-bold">
                <BookOpen className="w-4 h-4" />
                <span>{selectedArticle.category}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare(selectedArticle)}
                  className="p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-600 dark:text-slate-300 transition"
                  title="แชร์บทความ"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 rounded-xl bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-stone-700 dark:text-slate-200 transition"
                  title="ปิด"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content Scrollable Container */}
            <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-6">
              
              {/* Article Hero Banner */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-stone-100 dark:bg-slate-950 shadow-md">
                <img
                  src={selectedArticle.coverUrl}
                  alt={selectedArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Metadata */}
              <div>
                <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-slate-400 mb-2">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    {selectedArticle.readTime}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    {selectedArticle.publishedDate}
                  </span>
                  <span>•</span>
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">
                    โดย {selectedArticle.author}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-snug">
                  {selectedArticle.title}
                </h1>
              </div>

              {/* Excerpt Lead Paragraph */}
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500 text-stone-700 dark:text-amber-100 text-sm leading-relaxed font-medium">
                {selectedArticle.excerpt}
              </div>

              {/* Article Sections */}
              <div className="space-y-6 pt-2">
                {selectedArticle.sections.map((section, idx) => (
                  <div key={idx} className="space-y-3">
                    {section.heading && (
                      <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 pt-2 border-t border-stone-100 dark:border-slate-800">
                        <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>{section.heading}</span>
                      </h3>
                    )}

                    {section.body && (
                      <p className="text-sm text-stone-700 dark:text-slate-300 leading-relaxed">
                        {section.body}
                      </p>
                    )}

                    {section.quote && (
                      <div className="p-4 rounded-xl bg-stone-100 dark:bg-slate-800/80 italic text-stone-800 dark:text-slate-200 text-xs sm:text-sm border border-stone-200 dark:border-slate-700">
                        "{section.quote}"
                      </div>
                    )}

                    {section.list && section.list.length > 0 && (
                      <ul className="space-y-2.5 pl-1">
                        {section.list.map((item, lIdx) => (
                          <li key={lIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 dark:text-slate-300 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.exercises && section.exercises.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {section.exercises.map((ex, eIdx) => (
                          <div
                            key={eIdx}
                            className="p-3.5 rounded-xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200 dark:border-slate-700 space-y-1.5"
                          >
                            <div className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                              <Music className="w-3.5 h-3.5" />
                              <span>{ex.title}</span>
                            </div>
                            <div className="text-xs font-mono bg-white dark:bg-slate-950 p-2 rounded-lg border border-stone-200 dark:border-slate-800 text-stone-800 dark:text-slate-200 space-y-1">
                              <div>{ex.strings}</div>
                              <div className="text-amber-600 dark:text-amber-400 font-bold">{ex.fingers}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Key Takeaway Box */}
                {selectedArticle.keyTakeaway && (
                  <div className="p-5 rounded-2xl bg-amber-400 text-slate-950 dark:bg-amber-400 dark:text-slate-950 shadow-md space-y-2 mt-6">
                    <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wide">
                      <Lightbulb className="w-5 h-5 fill-slate-950" />
                      <span>สรุปบทเรียนสำคัญ (Key Takeaway)</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold leading-relaxed whitespace-pre-line">
                      {selectedArticle.keyTakeaway}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer Modal Action Bar */}
              <div className="pt-6 border-t border-stone-200 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2.5 rounded-xl bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-stone-800 dark:text-slate-200 font-bold text-xs transition"
                >
                  ปิดหน้าร่ามอ่าน
                </button>

                <button
                  onClick={() => handleShare(selectedArticle)}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition flex items-center gap-2 shadow-xs"
                >
                  <Share2 className="w-4 h-4" />
                  <span>แชร์บทความนี้</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};
