import React, { useEffect, useState } from 'react';
import { Search, X, BookOpen, Heart, Sparkles, Video, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';

export const CommandPalette: React.FC = () => {
  const { isSearchOpen, setSearchOpen, hadiths, duas, sunnahs, videos } = useAppStore();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  if (!isSearchOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const filteredHadiths = cleanQuery 
    ? hadiths.filter(h => h.translation.toLowerCase().includes(cleanQuery) || h.source.toLowerCase().includes(cleanQuery) || (h.urdu && h.urdu.includes(cleanQuery)))
    : hadiths.slice(0, 2);

  const filteredDuas = cleanQuery
    ? duas.filter(d => d.title.toLowerCase().includes(cleanQuery) || d.english.toLowerCase().includes(cleanQuery))
    : duas.slice(0, 2);

  const filteredSunnahs = cleanQuery
    ? sunnahs.filter(s => s.title.toLowerCase().includes(cleanQuery) || s.englishExplanation.toLowerCase().includes(cleanQuery))
    : sunnahs.slice(0, 2);

  const filteredVideos = cleanQuery
    ? videos.filter(v => v.title.toLowerCase().includes(cleanQuery) || v.channelName.toLowerCase().includes(cleanQuery))
    : videos.slice(0, 2);

  const handleSelect = (path: string) => {
    setSearchOpen(false);
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-islamic-deep rounded-2xl border border-islamic-gold/40 shadow-2xl overflow-hidden">
        
        {/* Search Header */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-islamic-gold/20 bg-islamic-primary/40">
          <Search className="w-5 h-5 text-islamic-gold shrink-0 mr-3 rtl:ml-3 rtl:mr-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Quran, Hadith, Duas, Sunnah, Seerah, Videos..."
            className="w-full bg-transparent text-islamic-cream placeholder-islamic-cream/50 text-sm focus:outline-none font-sans"
            autoFocus
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="p-1.5 text-islamic-cream/60 hover:text-islamic-gold transition-colors rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 text-islamic-cream">
          
          {/* Hadiths */}
          {filteredHadiths.length > 0 && (
            <div>
              <h4 className="flex items-center text-xs font-serif font-semibold text-islamic-gold tracking-wider uppercase mb-2">
                <BookOpen className="w-3.5 h-3.5 mr-1.5 rtl:ml-1.5 rtl:mr-0" /> Ahadith
              </h4>
              <div className="space-y-1.5">
                {filteredHadiths.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelect('/ahadith')}
                    className="p-2.5 rounded-xl bg-islamic-primary/30 hover:bg-islamic-emerald/30 border border-islamic-gold/10 hover:border-islamic-gold/30 cursor-pointer transition-all"
                  >
                    <p className="text-xs font-medium line-clamp-1">{item.translation}</p>
                    <span className="text-[10px] text-islamic-gold">{item.source}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Duas */}
          {filteredDuas.length > 0 && (
            <div>
              <h4 className="flex items-center text-xs font-serif font-semibold text-islamic-gold tracking-wider uppercase mb-2">
                <Heart className="w-3.5 h-3.5 mr-1.5 rtl:ml-1.5 rtl:mr-0" /> Duas
              </h4>
              <div className="space-y-1.5">
                {filteredDuas.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelect('/duas')}
                    className="p-2.5 rounded-xl bg-islamic-primary/30 hover:bg-islamic-emerald/30 border border-islamic-gold/10 hover:border-islamic-gold/30 cursor-pointer transition-all"
                  >
                    <p className="text-xs font-medium text-islamic-cream">{item.title}</p>
                    <p className="text-[11px] text-islamic-cream/70 line-clamp-1">{item.english}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sunnahs */}
          {filteredSunnahs.length > 0 && (
            <div>
              <h4 className="flex items-center text-xs font-serif font-semibold text-islamic-gold tracking-wider uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5 mr-1.5 rtl:ml-1.5 rtl:mr-0" /> Sunnah Hub
              </h4>
              <div className="space-y-1.5">
                {filteredSunnahs.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelect('/sunnah')}
                    className="p-2.5 rounded-xl bg-islamic-primary/30 hover:bg-islamic-emerald/30 border border-islamic-gold/10 hover:border-islamic-gold/30 cursor-pointer transition-all"
                  >
                    <p className="text-xs font-medium">{item.title}</p>
                    <p className="text-[11px] text-islamic-cream/70 line-clamp-1">{item.englishExplanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Videos & Naats */}
          {filteredVideos.length > 0 && (
            <div>
              <h4 className="flex items-center text-xs font-serif font-semibold text-islamic-gold tracking-wider uppercase mb-2">
                <Video className="w-3.5 h-3.5 mr-1.5 rtl:ml-1.5 rtl:mr-0" /> Media & Videos
              </h4>
              <div className="space-y-1.5">
                {filteredVideos.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelect('/videos')}
                    className="p-2.5 rounded-xl bg-islamic-primary/30 hover:bg-islamic-emerald/30 border border-islamic-gold/10 hover:border-islamic-gold/30 cursor-pointer transition-all flex items-center space-x-3 rtl:space-x-reverse"
                  >
                    <img src={item.thumbnail} alt={item.title} className="w-10 h-7 object-cover rounded" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium line-clamp-1">{item.title}</p>
                      <p className="text-[10px] text-islamic-gold">{item.channelName}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {cleanQuery && filteredHadiths.length === 0 && filteredDuas.length === 0 && filteredSunnahs.length === 0 && filteredVideos.length === 0 && (
            <div className="py-8 text-center text-islamic-cream/60">
              <p className="text-sm font-serif">No matching content found for "{query}"</p>
              <p className="text-xs text-islamic-gold/80 mt-1">Try searching for Hadith, Duas, Sunnah, or Seerah keywords.</p>
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2 bg-islamic-deep border-t border-islamic-gold/10 flex items-center justify-between text-[11px] text-islamic-cream/50">
          <span>Navigate with mouse or click items</span>
          <span className="bg-islamic-primary/80 px-2 py-0.5 rounded text-islamic-gold border border-islamic-gold/20">ESC to close</span>
        </div>
      </div>
    </div>
  );
};
