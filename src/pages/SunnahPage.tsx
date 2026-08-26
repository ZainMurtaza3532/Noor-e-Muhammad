import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Circle, Flame, Award } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { BookmarkButton } from '../components/common/BookmarkButton';
import { IslamicPattern } from '../components/common/IslamicPattern';

export const SunnahPage: React.FC = () => {
  const { sunnahs, completedSunnahDays, toggleSunnahDay } = useAppStore();
  const [activeTab, setActiveTab] = useState<'all' | 'challenge'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const categories = ['All', 'Worship', 'Character', 'Cleanliness', 'Social', 'Manners'];

  const filteredSunnahs = categoryFilter === 'All' 
    ? sunnahs 
    : sunnahs.filter(s => s.category === categoryFilter);

  const completionPercentage = Math.round((completedSunnahDays.length / 30) * 100);

  return (
    <div className="min-h-screen bg-islamic-deep text-islamic-cream pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-islamic-gold/10 to-transparent blur-3xl pointer-events-none" />
          <span className="relative z-10 inline-block px-6 py-2 rounded-full bg-islamic-gold/10 border border-islamic-gold/40 text-islamic-gold font-serif text-[11px] font-bold uppercase tracking-[0.3em] backdrop-blur-xl shadow-gold-glow">
            Living the Prophetic Tradition
          </span>
          <h1 className="relative z-10 font-arabic text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-islamic-cream to-islamic-gold/90 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] pb-2">
            سُنَّة النَّبِيِّ ﷺ
          </h1>
          <h2 className="relative z-10 font-serif text-2xl text-islamic-gold font-bold italic tracking-wide">
            Sunnah Hub
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-islamic-gold to-transparent mx-auto my-4 opacity-70" />
          <p className="relative z-10 font-sans text-sm sm:text-base text-islamic-cream/70 max-w-2xl mx-auto leading-relaxed">
            Discover and revive authentic Sunnah practices in daily life, morality, character, and worship.
          </p>
        </div>

        {/* Top Tabs */}
        <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 rounded-full font-serif text-[13px] font-bold transition-all duration-300 ${
              activeTab === 'all'
                ? 'btn-premium'
                : 'bg-islamic-deep/50 backdrop-blur-md text-islamic-cream/80 hover:text-islamic-gold border border-islamic-gold/30 shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]'
            }`}
          >
            All Prophetic Sunnahs
          </button>
          <button
            onClick={() => setActiveTab('challenge')}
            className={`px-6 py-3 rounded-full font-serif text-[13px] font-bold transition-all duration-300 flex items-center gap-1.5 ${
              activeTab === 'challenge'
                ? 'btn-premium'
                : 'bg-islamic-deep/50 backdrop-blur-md text-islamic-cream/80 hover:text-islamic-gold border border-islamic-gold/30 shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]'
            }`}
          >
            <Flame className="w-4 h-4 text-orange-400" />
            <span>30-Day Sunnah Challenge</span>
          </button>
        </div>

        {/* Tab 1: All Sunnah Cards */}
        {activeTab === 'all' && (
          <div className="space-y-6">
            {/* Category Filter */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-[13px] font-serif font-bold whitespace-nowrap transition-all duration-300 ${
                    categoryFilter === cat 
                      ? 'btn-premium' 
                      : 'bg-islamic-deep/50 backdrop-blur-md text-islamic-cream/80 hover:text-islamic-gold border border-islamic-gold/30 shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
              {filteredSunnahs.map((item) => (
                <div key={item.id} className="p-8 glass-card-premium rounded-3xl space-y-5 flex flex-col justify-between group-hover:border-islamic-gold/60 transition-colors duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.2)]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-islamic-gold/15 pb-3">
                      <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-islamic-gold to-yellow-600 text-islamic-deep text-[10px] font-serif font-bold uppercase tracking-wider shadow-gold-glow">
                        {item.category}
                      </span>
                      <BookmarkButton id={item.id} />
                    </div>

                    <h3 className="font-serif text-xl font-bold text-islamic-gold">{item.title}</h3>
                    {item.arabicUrdu && (
                      <p className="font-arabic text-[17px] text-islamic-goldLight/90 leading-relaxed drop-shadow-sm">{item.arabicUrdu}</p>
                    )}
                    <p className="text-sm text-islamic-cream/80 leading-relaxed font-light">{item.englishExplanation}</p>
                  </div>

                  <div className="pt-4 border-t border-islamic-gold/15 flex items-center justify-between text-[11px] text-islamic-cream/60 font-serif">
                    <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-islamic-gold" /> Ref: {item.reference}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: 30-Day Sunnah Challenge */}
        {activeTab === 'challenge' && (
          <div className="space-y-8">
            {/* Progress Card */}
            <div className="p-6 glass-card rounded-3xl border border-islamic-gold/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left rtl:sm:text-right">
                <div className="flex items-center justify-center sm:justify-start rtl:sm:justify-end gap-2 text-islamic-gold">
                  <Award className="w-5 h-5" />
                  <span className="font-serif font-bold text-sm">30-Day Sunnah Challenge Progress</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-gold-gradient">
                  {completedSunnahDays.length} of 30 Sunnahs Practiced
                </h3>
                <p className="text-xs text-islamic-cream/70 font-serif">
                  Current Active Streak: <strong className="text-islamic-gold">{completedSunnahDays.length} Days</strong> ({completionPercentage}% Completed)
                </p>
              </div>

              {/* Circular / Progress Bar */}
              <div className="w-full sm:w-64 space-y-2">
                <div className="h-3 w-full bg-islamic-deep rounded-full border border-islamic-gold/30 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-islamic-emerald to-islamic-gold transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
                <span className="text-[11px] text-islamic-cream/70 text-right block font-serif">
                  {completionPercentage}% Target Completed
                </span>
              </div>
            </div>

            {/* 30 Day Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 30 }).map((_, index) => {
                const dayNum = index + 1;
                const isCompleted = completedSunnahDays.includes(dayNum);
                const sunnahItem = sunnahs.find(s => s.challengeDay === dayNum) || sunnahs[index % sunnahs.length];

                return (
                  <div
                    key={dayNum}
                    onClick={() => toggleSunnahDay(dayNum)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isCompleted
                        ? 'bg-islamic-gold/20 border-islamic-gold text-islamic-gold shadow-gold-glow'
                        : 'bg-islamic-primary/30 border-islamic-gold/20 text-islamic-cream/80 hover:border-islamic-gold/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3 border-b border-islamic-gold/10 pb-2">
                      <span className={`font-serif text-xs font-bold ${isCompleted ? 'text-islamic-deep' : 'text-islamic-gold'}`}>Day {dayNum}</span>
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-islamic-deep" />
                      ) : (
                        <Circle className="w-5 h-5 text-islamic-cream/40" />
                      )}
                    </div>
                    <h4 className={`font-serif text-[15px] font-bold line-clamp-1 ${isCompleted ? 'text-islamic-deep' : 'text-islamic-cream'}`}>{sunnahItem?.title || `Sunnah Practice Day ${dayNum}`}</h4>
                    <p className={`text-xs line-clamp-2 mt-2 ${isCompleted ? 'text-islamic-deep/80' : 'text-islamic-cream/70'}`}>{sunnahItem?.englishExplanation}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
