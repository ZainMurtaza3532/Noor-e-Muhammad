import React, { useState, useEffect } from 'react';
import { Play, Pause, Loader2, BookOpen, Layers } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { quranApi, type Surah, type Ayah, type Juz } from '../services/api/quranApi';
import { BookmarkButton } from '../components/common/BookmarkButton';

export const QuranPage: React.FC = () => {
  const { playAudio, playPlaylist, pauseAudio, currentAudio } = useAppStore();
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurahData, setSelectedSurahData] = useState<{ surah: Surah; ayahs: Ayah[] } | null>(null);
  const [selectedJuzData, setSelectedJuzData] = useState<Juz | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingList, setLoadingList] = useState(true);
  const [loadingAyahs, setLoadingAyahs] = useState(false);
  const [error, setError] = useState('');
  
  const [activeTab, setActiveTab] = useState<'surah' | 'juz'>('surah');

  // Hardcoded 30 Siparas list for the UI
  const siparas = Array.from({ length: 30 }, (_, i) => i + 1);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const data = await quranApi.getSurahs();
        setSurahs(data);
        if (data.length > 0 && activeTab === 'surah') {
          loadSurah(data[0].number);
        }
      } catch (err) {
        setError('Failed to load Surahs. Please try again later.');
      } finally {
        setLoadingList(false);
      }
    };
    fetchSurahs();
  }, []);

  const loadSurah = async (number: number) => {
    setLoadingAyahs(true);
    setSelectedJuzData(null);
    try {
      const data = await quranApi.getSurah(number);
      setSelectedSurahData(data);
    } catch (err) {
      setError(`Failed to load Surah ${number}.`);
    } finally {
      setLoadingAyahs(false);
    }
  };

  const loadJuz = async (number: number) => {
    setLoadingAyahs(true);
    setSelectedSurahData(null);
    try {
      const data = await quranApi.getJuz(number);
      setSelectedJuzData(data);
    } catch (err) {
      setError(`Failed to load Sipara (Juz) ${number}.`);
    } finally {
      setLoadingAyahs(false);
    }
  };

  const filteredSurahs = surahs.filter(s => 
    s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.name.includes(searchQuery) ||
    s.englishNameTranslation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSiparas = siparas.filter(s => s.toString().includes(searchQuery));

  const ayahsToDisplay = selectedSurahData ? selectedSurahData.ayahs : (selectedJuzData ? selectedJuzData.ayahs : []);

  return (
    <div className="min-h-screen bg-islamic-cream text-gray-800 pt-28 pb-20 px-4 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-islamic-gold/10 to-transparent blur-3xl pointer-events-none" />
          <span className="relative z-10 inline-block px-6 py-2 rounded-full bg-islamic-primary/10 border border-islamic-primary/20 text-islamic-deep font-serif text-[11px] font-bold uppercase tracking-[0.3em] backdrop-blur-xl">
            The Noble Quran
          </span>
          <h1 className="relative z-10 font-arabic text-4xl sm:text-6xl font-extrabold text-islamic-deep pb-2">
            الْقُرْآنُ الْكَرِيمُ
          </h1>
          <h2 className="relative z-10 font-serif text-2xl text-islamic-gold font-bold italic tracking-wide">
            Quran Reader
          </h2>
          <div className="w-24 h-[2px] bg-islamic-gold mx-auto my-4 opacity-70" />
          <p className="relative z-10 font-sans text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Read, reflect upon, and listen to the divine recitation of the Holy Quran with English and Urdu translations.
          </p>
        </div>

        {error && (
          <div className="text-red-400 text-center p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Sidebar: Navigation List */}
          <div className="space-y-4 md:col-span-1 sticky top-32 h-[calc(100vh-8rem)] flex flex-col">
            
            {/* Tabs */}
            <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm shrink-0">
              <button
                onClick={() => {
                  setActiveTab('surah');
                  if (surahs.length > 0 && !selectedSurahData) loadSurah(1);
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-serif font-bold transition-all ${
                  activeTab === 'surah' 
                    ? 'bg-islamic-deep text-white shadow-md' 
                    : 'text-gray-500 hover:text-islamic-deep'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" /> Surahs
              </button>
              <button
                onClick={() => {
                  setActiveTab('juz');
                  if (!selectedJuzData) loadJuz(1);
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-serif font-bold transition-all ${
                  activeTab === 'juz' 
                    ? 'bg-islamic-deep text-white shadow-md' 
                    : 'text-gray-500 hover:text-islamic-deep'
                }`}
              >
                <Layers className="w-3.5 h-3.5" /> Siparas
              </button>
            </div>

            <input 
              type="text" 
              placeholder={activeTab === 'surah' ? "Search Surah..." : "Search Sipara..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl py-2 px-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-islamic-gold focus:ring-1 focus:ring-islamic-gold text-sm shadow-sm shrink-0"
            />

            <div className="space-y-2 overflow-y-auto pr-2 custom-scrollbar flex-1 pb-4">
              {loadingList ? (
                <div className="flex justify-center p-8 text-islamic-gold">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              ) : activeTab === 'surah' ? (
                filteredSurahs.length > 0 ? (
                  filteredSurahs.map((surah) => {
                    const isActive = selectedSurahData?.surah.number === surah.number;
                    return (
                      <button
                        key={surah.number}
                        onClick={() => loadSurah(surah.number)}
                        className={`w-full p-3 rounded-2xl border text-left rtl:text-right transition-all flex items-center justify-between group ${
                          isActive
                            ? 'bg-islamic-accent border-islamic-primary text-islamic-deep font-bold shadow-sm'
                            : 'bg-white border-gray-100 text-gray-700 hover:bg-gray-50 hover:border-gray-200'
                        }`}
                      >
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <span className={`w-7 h-7 rounded-full text-xs flex items-center justify-center font-serif transition-colors ${isActive ? 'bg-islamic-primary text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-islamic-primary'}`}>
                            {surah.number}
                          </span>
                          <div>
                            <h4 className="font-serif text-sm text-islamic-deep">{surah.englishName}</h4>
                            <span className="text-[10px] text-gray-500">{surah.englishNameTranslation}</span>
                          </div>
                        </div>
                        <span className="font-arabic text-base text-islamic-gold">{surah.name}</span>
                      </button>
                    );
                  })
                ) : (
                  <div className="text-center py-4 text-sm text-islamic-cream/50">No Surahs found.</div>
                )
              ) : (
                filteredSiparas.length > 0 ? (
                  filteredSiparas.map((juz) => {
                    const isActive = selectedJuzData?.number === juz;
                    return (
                      <button
                        key={juz}
                        onClick={() => loadJuz(juz)}
                        className={`w-full p-3.5 rounded-2xl border text-left rtl:text-right transition-all flex items-center justify-start group ${
                          isActive
                            ? 'bg-islamic-accent border-islamic-primary text-islamic-deep font-bold shadow-sm'
                            : 'bg-white border-gray-100 text-gray-700 hover:bg-gray-50 hover:border-gray-200'
                        }`}
                      >
                        <span className={`w-8 h-8 mr-3 rounded-full text-xs flex items-center justify-center font-serif transition-colors shrink-0 ${isActive ? 'bg-islamic-primary text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-islamic-primary'}`}>
                          {juz}
                        </span>
                        <span className="font-serif text-[15px]">Sipara {juz}</span>
                      </button>
                    );
                  })
                ) : (
                  <div className="text-center py-4 text-sm text-islamic-cream/50">No Siparas found.</div>
                )
              )}
            </div>
          </div>

          {/* Main Quran Reader Display */}
          <div className="md:col-span-3 space-y-6">
            {loadingAyahs ? (
              <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
                <Loader2 className="w-12 h-12 text-islamic-gold animate-spin" />
                <p className="text-islamic-gold font-serif">Loading verses...</p>
              </div>
            ) : ayahsToDisplay.length > 0 ? (
              <>
                {/* Header Card */}
                <div className="p-10 academy-card rounded-[2.5rem] text-center space-y-5 relative overflow-hidden bg-white border-b-4 border-b-islamic-primary">
                  <div className="absolute inset-0 bg-islamic-pattern opacity-40 pointer-events-none" />
                  
                  {activeTab === 'surah' && selectedSurahData ? (
                    <>
                      <span className="relative z-10 inline-block px-4 py-1 rounded-full bg-islamic-accent text-[11px] font-serif text-islamic-primary uppercase tracking-widest font-bold">
                        {selectedSurahData.surah.revelationType} • {selectedSurahData.surah.numberOfAyahs} Verses
                      </span>
                      <h2 className="relative z-10 font-arabic text-6xl sm:text-7xl font-bold text-islamic-deep pb-2">
                        {selectedSurahData.surah.name}
                      </h2>
                      <h3 className="relative z-10 font-serif text-xl font-bold text-gray-700 tracking-wide">
                        {selectedSurahData.surah.englishName} ({selectedSurahData.surah.englishNameTranslation})
                      </h3>
                      {activeTab === 'surah' && selectedSurahData && (
                        <div className="pt-4 flex justify-center">
                          <button 
                            onClick={() => {
                              const surahNumber = selectedSurahData.surah.number;
                              const formattedNumber = surahNumber.toString().padStart(3, '0');
                              const audioUrl = `https://server8.mp3quran.net/afs/${formattedNumber}.mp3`;
                              const isPlayingThis = Boolean(currentAudio && currentAudio.audioUrl === audioUrl && currentAudio.isPlaying);
                              
                              if (isPlayingThis) {
                                pauseAudio();
                              } else {
                                playAudio(`Surah ${selectedSurahData.surah.englishName}`, 'Qari Mishary Alafasy', audioUrl);
                              }
                            }}
                            className="flex items-center gap-2 px-6 py-3 bg-islamic-deep text-white rounded-full font-serif font-bold text-sm hover:bg-islamic-primary transition-all shadow-md active:scale-95"
                          >
                            {Boolean(currentAudio && currentAudio.audioUrl === `https://server8.mp3quran.net/afs/${selectedSurahData.surah.number.toString().padStart(3, '0')}.mp3` && currentAudio.isPlaying) ? (
                              <>
                                <Pause className="w-4 h-4" /> Pause Full Surah
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4" /> Play Full Surah
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </>
                  ) : selectedJuzData ? (
                    <>
                      <span className="relative z-10 inline-block px-4 py-1 rounded-full bg-islamic-accent text-[11px] font-serif text-islamic-primary uppercase tracking-widest font-bold">
                        Sipara / Juz
                      </span>
                      <h2 className="relative z-10 font-arabic text-5xl sm:text-6xl font-bold text-islamic-deep pb-2">
                        الجزء {selectedJuzData.number}
                      </h2>
                      <h3 className="relative z-10 font-serif text-xl font-bold text-gray-700 tracking-wide mt-2">
                        Sipara {selectedJuzData.number}
                      </h3>
                      <div className="pt-4 flex justify-center">
                        <button 
                          onClick={() => {
                            const isPlayingThis = Boolean(currentAudio && currentAudio.title === `Sipara ${selectedJuzData.number}` && currentAudio.isPlaying);
                            
                            if (isPlayingThis) {
                              pauseAudio();
                            } else {
                              const playlist = selectedJuzData.ayahs.map(a => a.audio).filter(Boolean) as string[];
                              playPlaylist(`Sipara ${selectedJuzData.number}`, 'Qari Mishary Alafasy', playlist);
                            }
                          }}
                          className="flex items-center gap-2 px-6 py-3 bg-islamic-deep text-white rounded-full font-serif font-bold text-sm hover:bg-islamic-primary transition-all shadow-md active:scale-95"
                        >
                          {Boolean(currentAudio && currentAudio.title === `Sipara ${selectedJuzData.number}` && currentAudio.isPlaying) ? (
                            <>
                              <Pause className="w-4 h-4" /> Pause Full Sipara
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" /> Play Full Sipara
                            </>
                          )}
                        </button>
                      </div>
                    </>
                  ) : null}
                  
                  <div className="relative z-10 pt-6 border-t border-gray-100 text-3xl sm:text-4xl text-islamic-gold font-arabic font-bold">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </div>
                </div>

                {/* Continuous Arabic Text Block */}
                <div className="p-8 sm:p-14 bg-white border border-gray-100 rounded-3xl shadow-sm">
                  <p className="font-arabic text-3xl sm:text-5xl text-islamic-deep leading-[2.8] sm:leading-[2.8] font-bold text-center sm:text-justify rtl" dir="rtl">
                    {ayahsToDisplay.map((ayah) => (
                      <span key={`arabic-${ayah.number}`}>
                        {ayah.text}
                        <span className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 mx-2 text-sm sm:text-base text-islamic-gold font-sans font-bold border-[3px] border-islamic-gold/30 rounded-full bg-islamic-gold/5 relative top-[-4px]">
                          {ayah.numberInSurah}
                        </span>
                      </span>
                    ))}
                  </p>
                </div>

                {/* Translation Block (Only for Surah mode) */}
                {activeTab === 'surah' && (
                  <div className="p-8 sm:p-12 bg-white border border-gray-100 rounded-3xl shadow-sm mt-8 space-y-8">
                    <div className="border-b border-gray-100 pb-4 mb-6">
                      <h4 className="text-2xl font-serif font-bold text-islamic-deep">Translations & Audio</h4>
                      <p className="text-sm text-gray-500 font-sans mt-1">Read the meanings and listen to the recitation verse by verse.</p>
                    </div>
                    
                    <div className="space-y-10">
                      {ayahsToDisplay.map((ayah) => {
                        const isPlayingThis = Boolean(currentAudio && currentAudio.audioUrl === ayah.audio && currentAudio.isPlaying);
                        const ayahIdentifier = selectedSurahData?.surah.number;
                        
                        return (
                          <div key={`trans-${ayah.number}`} className="flex flex-col sm:flex-row gap-6 pb-8 border-b border-gray-50 last:border-0 last:pb-0">
                            
                            {/* Controls & Number */}
                            <div className="flex sm:flex-col items-center sm:items-start gap-4 shrink-0 sm:w-16">
                              <span className="w-10 h-10 rounded-full bg-islamic-gold/10 text-islamic-deep text-sm font-bold flex items-center justify-center font-sans border border-islamic-gold/20 shrink-0">
                                {ayah.numberInSurah}
                              </span>
                              
                              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                {ayah.audio && (
                                  <button
                                    onClick={() => {
                                      if (isPlayingThis) pauseAudio();
                                      else playAudio(`Ayah ${ayah.numberInSurah}`, 'Qari Mishary Alafasy', ayah.audio!);
                                    }}
                                    className={`p-2.5 rounded-full transition-all ${isPlayingThis ? 'bg-islamic-gold text-white shadow-md' : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-islamic-deep'}`}
                                    title="Play Ayah Audio"
                                  >
                                    {isPlayingThis ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                                  </button>
                                )}
                                <div className="bg-gray-50 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                                  <BookmarkButton id={`quran-${ayahIdentifier}-${ayah.numberInSurah}`} />
                                </div>
                              </div>
                            </div>
                            
                            {/* Translations */}
                            <div className="space-y-4 flex-1">
                              <p className="font-urdu text-2xl text-gray-800 leading-[2.2] text-right" dir="rtl">
                                {ayah.urduTranslation}
                              </p>
                              <p className="font-serif text-lg text-gray-600 leading-relaxed font-light text-left border-l-2 border-islamic-gold/30 pl-4">
                                "{ayah.translation}"
                              </p>
                            </div>
                            
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            ) : null}
          </div>

        </div>
      </div>
    </div>
  );
};
