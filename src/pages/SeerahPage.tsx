import React, { useState } from 'react';
import { BookOpen, ShieldCheck, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { IslamicPattern } from '../components/common/IslamicPattern';

export const SeerahPage: React.FC = () => {
  const { seerah } = useAppStore();
  const [selectedPeriod, setSelectedPeriod] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const periods = ['All', 'Birth & Early Life', 'Childhood & Youth', 'First Revelation', 'Hijrah', 'Conquest of Makkah', 'Farewell Sermon'];

  const filteredSeerah = selectedPeriod === 'All' 
    ? seerah 
    : seerah.filter(s => s.period === selectedPeriod);

  return (
    <div className="min-h-screen bg-islamic-deep text-islamic-cream pt-28 pb-20 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Banner */}
        <div className="text-center space-y-4 mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-islamic-gold/10 to-transparent blur-3xl pointer-events-none" />
          <span className="relative z-10 inline-block px-6 py-2 rounded-full bg-islamic-gold/10 border border-islamic-gold/40 text-islamic-gold font-serif text-[11px] font-bold uppercase tracking-[0.3em] backdrop-blur-xl shadow-gold-glow">
            Historical Timeline
          </span>
          <h1 className="relative z-10 font-arabic text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-islamic-cream to-islamic-gold/90 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] pb-2">
            سيرت النبي ﷺ
          </h1>
          <h2 className="relative z-10 font-serif text-2xl text-islamic-gold font-bold italic tracking-wide">
            The Blessed Seerah
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-islamic-gold to-transparent mx-auto my-4 opacity-70" />
          <p className="relative z-10 font-sans text-sm sm:text-base text-islamic-cream/70 max-w-2xl mx-auto leading-relaxed">
            An authentic historical timeline of the life, missions, noble character, and legacy of Prophet Muhammad ﷺ.
          </p>
        </div>

        {/* Period Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-4 h-4 text-islamic-gold shrink-0 mr-1" />
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPeriod(p)}
              className={`px-4 py-2 rounded-xl text-[13px] font-serif font-bold whitespace-nowrap transition-all duration-300 ${
                selectedPeriod === p 
                  ? 'btn-premium' 
                  : 'bg-islamic-deep/50 backdrop-blur-md text-islamic-cream/80 hover:text-islamic-gold border border-islamic-gold/30 shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Interactive Timeline */}
        <div className="relative border-l-2 border-islamic-gold/30 rtl:border-r-2 rtl:border-l-0 ml-4 rtl:mr-4 rtl:ml-0 space-y-12 pl-8 rtl:pr-8">
          {/* Timeline glowing line overlay */}
          <div className="absolute top-0 bottom-0 left-[-2px] rtl:left-auto rtl:right-[-2px] w-[2px] bg-gradient-to-b from-islamic-gold via-yellow-500 to-transparent shadow-[0_0_10px_rgba(212,175,55,0.8)] opacity-50 pointer-events-none" />
          
          {filteredSeerah.map((item, index) => {
            const isExpanded = expandedId === item.id;
            return (
              <div key={item.id} className="relative group perspective-[1000px]">
                
                {/* Timeline Dot Indicator - Animated Pulse */}
                <div className="absolute -left-[41px] rtl:-right-[41px] top-6 w-5 h-5 z-20 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-islamic-gold opacity-40 group-hover:opacity-100 animate-ping" />
                  <div className="relative w-4 h-4 rounded-full bg-islamic-deep border-[3px] border-islamic-gold shadow-[0_0_20px_rgba(212,175,55,1)] group-hover:bg-islamic-gold transition-colors duration-300" />
                </div>

                <div className="p-8 glass-card-premium rounded-[2rem] space-y-5 group-hover:border-islamic-gold/60 transition-colors duration-500">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-islamic-gold/20 pb-4">
                    <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-islamic-gold to-yellow-600 text-islamic-deep text-[11px] font-serif font-bold uppercase tracking-wider shadow-gold-glow">
                      {item.period}
                    </span>
                    <span className="text-xs text-islamic-cream/60 font-serif">
                      {item.yearGregorian} ({item.yearHijri || 'Pre-Hijri'})
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-islamic-gold">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-islamic-cream/85 leading-relaxed">{item.description}</p>

                  {/* Expand / Collapse Button */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="flex items-center gap-1.5 text-xs text-islamic-gold hover:underline font-serif font-semibold"
                  >
                    <span>{isExpanded ? 'Hide Key Lessons & Sources' : 'View Key Lessons & Quran References'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {/* Expanded Lessons & References */}
                  {isExpanded && (
                    <div className="pt-5 border-t border-islamic-gold/20 space-y-4 animate-fadeIn text-sm">
                      <div className="bg-islamic-deep/40 p-5 rounded-2xl border border-islamic-gold/10">
                        <h4 className="font-serif font-bold text-islamic-gold mb-3 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" /> Key Spiritual Lessons
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-islamic-cream/80">
                          {item.keyLessons.map((l, i) => (
                            <li key={i}>{l}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-4 pt-2 text-[11px] text-islamic-cream/70">
                        {item.relatedHadithRef && (
                          <span>Hadith Ref: <strong className="text-islamic-gold">{item.relatedHadithRef}</strong></span>
                        )}
                        {item.relatedQuranRef && (
                          <span>Quran Ref: <strong className="text-islamic-gold">{item.relatedQuranRef}</strong></span>
                        )}
                      </div>

                      <div className="p-2.5 rounded-xl bg-islamic-deep/60 border border-islamic-gold/15 text-[11px] flex items-center justify-between text-emerald-400">
                        <span>Source: {item.historicalSource}</span>
                        <ShieldCheck className="w-4 h-4 shrink-0" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
