import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { sampleSurahs } from '../data/quran';
import { BookmarkButton } from '../components/common/BookmarkButton';
import { IslamicPattern } from '../components/common/IslamicPattern';

export const QuranPage: React.FC = () => {
  const { playAudio, pauseAudio, currentAudio } = useAppStore();
  const [selectedSurahIndex, setSelectedSurahIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSurahs = sampleSurahs.filter(s => 
    s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.name.includes(searchQuery) ||
    s.englishNameTranslation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentSurah = sampleSurahs[selectedSurahIndex];

  return (
    <div className="min-h-screen bg-islamic-deep text-islamic-cream pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-islamic-gold/10 to-transparent blur-3xl pointer-events-none" />
          <span className="relative z-10 inline-block px-6 py-2 rounded-full bg-islamic-gold/10 border border-islamic-gold/40 text-islamic-gold font-serif text-[11px] font-bold uppercase tracking-[0.3em] backdrop-blur-xl shadow-gold-glow">
            The Noble Quran
          </span>
          <h1 className="relative z-10 font-arabic text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-islamic-cream to-islamic-gold/90 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] pb-2">
            الْقُرْآنُ الْكَرِيمُ
          </h1>
          <h2 className="relative z-10 font-serif text-2xl text-islamic-gold font-bold italic tracking-wide">
            Quran Reader
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-islamic-gold to-transparent mx-auto my-4 opacity-70" />
          <p className="relative z-10 font-sans text-sm sm:text-base text-islamic-cream/70 max-w-2xl mx-auto leading-relaxed">
            Read, reflect upon, and listen to the divine recitation of the Holy Quran revealed to Prophet Muhammad ﷺ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Sidebar: Surah Selector List */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="font-serif text-sm font-bold text-islamic-gold uppercase tracking-wider">Surah List</h3>
            
            <input 
              type="text" 
              placeholder="Search Surah..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-islamic-deep/60 border border-islamic-gold/20 rounded-xl py-2.5 px-4 text-islamic-cream placeholder:text-islamic-cream/40 focus:outline-none focus:border-islamic-gold text-sm transition-all shadow-inner"
            />

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredSurahs.length > 0 ? (
                filteredSurahs.map((surah) => {
                  const idx = sampleSurahs.findIndex(s => s.number === surah.number);
                  return (
                    <button
                      key={surah.number}
                      onClick={() => setSelectedSurahIndex(idx)}
                      className={`w-full p-3 rounded-2xl border text-left rtl:text-right transition-all flex items-center justify-between group ${
                        selectedSurahIndex === idx
                          ? 'bg-islamic-gold/20 border-islamic-gold text-islamic-gold font-bold shadow-gold-glow'
                          : 'bg-islamic-primary/30 border-islamic-gold/15 text-islamic-cream hover:bg-islamic-primary/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className={`w-7 h-7 rounded-full text-xs flex items-center justify-center font-serif transition-colors ${selectedSurahIndex === idx ? 'bg-islamic-gold text-islamic-deep' : 'bg-islamic-gold/20 text-islamic-gold group-hover:bg-islamic-gold/30'}`}>
                          {surah.number}
                        </span>
                        <div>
                          <h4 className="font-serif text-sm">{surah.englishName}</h4>
                          <span className="text-[10px] text-islamic-cream/60">{surah.englishNameTranslation}</span>
                        </div>
                      </div>
                      <span className="font-arabic text-base text-islamic-gold">{surah.name}</span>
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-4 text-sm text-islamic-cream/50">No Surahs found.</div>
              )}
            </div>
          </div>

          {/* Main Quran Reader Display */}
          <div className="md:col-span-3 space-y-6">
            
            {/* Surah Header Card */}
            <div className="p-10 glass-card-premium rounded-[2.5rem] text-center space-y-5 shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat opacity-[0.02] mix-blend-overlay pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-islamic-gold/10 rounded-full blur-[60px] pointer-events-none" />
              
              <span className="relative z-10 inline-block px-4 py-1 rounded-full bg-islamic-deep/50 border border-islamic-gold/30 text-[11px] font-serif text-islamic-gold uppercase tracking-widest backdrop-blur-md">
                {currentSurah.revelationType} • {currentSurah.numberOfAyahs} Verses
              </span>
              <h2 className="relative z-10 font-arabic text-6xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-islamic-goldLight to-islamic-gold drop-shadow-md pb-2">
                {currentSurah.name}
              </h2>
              <h3 className="relative z-10 font-serif text-xl font-bold text-islamic-cream/90 tracking-wide">
                {currentSurah.englishName} ({currentSurah.englishNameTranslation})
              </h3>
              
              <div className="relative z-10 pt-6 border-t border-islamic-gold/20 text-2xl sm:text-3xl text-islamic-gold font-arabic font-bold drop-shadow-md">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
            </div>

            {/* Ayah List */}
            <div className="space-y-4">
              {currentSurah.ayahs.map((ayah) => {
                const isPlayingThis = Boolean(currentAudio && currentAudio.audioUrl === ayah.audioUrl && currentAudio.isPlaying);

                return (
                  <div key={ayah.number} className="p-8 sm:p-10 glass-card-premium rounded-3xl space-y-8 hover:border-islamic-gold/60 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] group relative">
                    <div className="flex items-center justify-between border-b border-islamic-gold/20 pb-4 relative z-10">
                      <span className="w-10 h-10 rounded-full bg-gradient-to-br from-islamic-gold to-yellow-600 text-islamic-deep text-sm font-bold flex items-center justify-center font-serif shadow-gold-glow">
                        {ayah.numberInSurah}
                      </span>
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        {ayah.audioUrl && (
                          <button
                            onClick={() => {
                              if (isPlayingThis) {
                                pauseAudio();
                              } else {
                                playAudio(`${currentSurah.englishName} - Ayah ${ayah.numberInSurah}`, 'Qari Mishary Alafasy', ayah.audioUrl!);
                              }
                            }}
                            className={`p-3 rounded-full transition-all shadow-lg ${isPlayingThis ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)] scale-110' : 'bg-islamic-deep border border-islamic-gold/40 text-islamic-gold hover:bg-islamic-gold/20'}`}
                            title="Play Ayah Audio"
                          >
                            {isPlayingThis ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                          </button>
                        )}
                        <div className="bg-islamic-deep border border-islamic-gold/40 rounded-full">
                          <BookmarkButton id={`quran-${currentSurah.number}-${ayah.numberInSurah}`} />
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10">
                      <p className="font-arabic text-3xl sm:text-5xl text-islamic-gold text-right rtl:text-left leading-[2.2] font-bold drop-shadow-md">
                        {ayah.text}
                      </p>
                    </div>
                    <div className="relative z-10 pt-4">
                      <p className="font-serif text-lg sm:text-xl text-islamic-cream/90 italic leading-relaxed font-light">
                        "{ayah.translation}"
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
