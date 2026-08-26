import React from 'react';
import { Bookmark, Trash2 } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { IslamicPattern } from '../components/common/IslamicPattern';

export const BookmarksPage: React.FC = () => {
  const { bookmarks, hadiths, duas, sunnahs, videos, toggleBookmark } = useAppStore();

  const savedHadiths = hadiths.filter((h) => bookmarks.includes(h.id));
  const savedDuas = duas.filter((d) => bookmarks.includes(d.id));
  const savedSunnahs = sunnahs.filter((s) => bookmarks.includes(s.id));
  const savedVideos = videos.filter((v) => bookmarks.includes(v.id));

  const totalSaved = savedHadiths.length + savedDuas.length + savedSunnahs.length + savedVideos.length;

  return (
    <div className="min-h-screen bg-islamic-deep text-islamic-cream pt-28 pb-20 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="font-serif text-xs font-bold text-islamic-gold uppercase tracking-widest">Personal Saved Library</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-gold-gradient">المَحْفُوظَاتُ - Bookmarks</h1>
          <p className="font-sans text-sm text-islamic-cream/80 max-w-2xl mx-auto">
            Access your saved Hadith, Duas, Sunnah practices, and Islamic videos offline at any time.
          </p>
          <IslamicPattern />
        </div>

        {totalSaved === 0 ? (
          <div className="py-16 text-center space-y-3 glass-card rounded-3xl p-8 border border-islamic-gold/20 max-w-md mx-auto">
            <Bookmark className="w-12 h-12 text-islamic-gold/40 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-islamic-gold">No Bookmarks Saved Yet</h3>
            <p className="text-xs text-islamic-cream/70">
              Click the bookmark icon on any Hadith, Dua, Sunnah, or Video card to save it here for quick offline access.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* Hadiths */}
            {savedHadiths.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-islamic-gold border-b border-islamic-gold/20 pb-2">Saved Ahadith ({savedHadiths.length})</h3>
                <div className="grid grid-cols-1 gap-4">
                  {savedHadiths.map((h) => (
                    <div key={h.id} className="p-5 glass-card rounded-2xl border border-islamic-gold/30 flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <p className="font-arabic text-xl text-islamic-gold font-bold">{h.arabic}</p>
                        <p className="font-serif text-xs text-islamic-cream/90 italic">"{h.translation}"</p>
                        <span className="text-[10px] text-emerald-400 font-semibold block">Source: {h.source}</span>
                      </div>
                      <button onClick={() => toggleBookmark(h.id)} className="p-2 text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Duas */}
            {savedDuas.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-islamic-gold border-b border-islamic-gold/20 pb-2">Saved Duas ({savedDuas.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedDuas.map((d) => (
                    <div key={d.id} className="p-5 glass-card rounded-2xl border border-islamic-gold/30 flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <h4 className="font-serif text-sm font-bold text-islamic-gold">{d.title}</h4>
                        <p className="font-arabic text-lg text-islamic-gold">{d.arabic}</p>
                        <p className="text-xs text-islamic-cream/80 font-serif">"{d.english}"</p>
                      </div>
                      <button onClick={() => toggleBookmark(d.id)} className="p-2 text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
};
