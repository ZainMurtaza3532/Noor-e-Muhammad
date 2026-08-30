import React, { useState, useEffect } from 'react';
import { Search, Copy, Check, Share2, ShieldCheck, Loader2, BookOpen } from 'lucide-react';
import { hadithApi, type HadithItem } from '../services/api/hadithApi';
import { BookmarkButton } from '../components/common/BookmarkButton';
import { ShareModal } from '../components/common/ShareModal';

export const HadithPage: React.FC = () => {
  const [hadiths, setHadiths] = useState<HadithItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [shareData, setShareData] = useState<{ isOpen: boolean; title: string; text: string }>({
    isOpen: false,
    title: '',
    text: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHadiths = async () => {
      try {
        const data = await hadithApi.getHadithsByCollection('bukhari', 50); // Using Bukhari as default
        setHadiths(data);
      } catch (err) {
        setError('Failed to load Hadiths. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchHadiths();
  }, []);

  const filteredHadiths = hadiths.filter((h) => {
    const matchesSearch = h.text.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const copyHadith = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-islamic-cream text-gray-800 pt-28 pb-20 px-4 font-sans relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-4 mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-islamic-gold/10 to-transparent blur-3xl pointer-events-none" />
          <span className="relative z-10 inline-block px-6 py-2 rounded-full bg-islamic-primary/10 border border-islamic-primary/20 text-islamic-deep font-serif text-[11px] font-bold uppercase tracking-[0.3em] backdrop-blur-xl flex items-center justify-center gap-2 mx-auto w-fit">
            <BookOpen className="w-3 h-3 inline-block mr-1" />
            Verified Sacred Traditions
          </span>
          <h1 className="relative z-10 font-arabic text-4xl sm:text-6xl font-extrabold text-islamic-deep pb-2">
            الحديث النبوي
          </h1>
          <h2 className="relative z-10 font-serif text-2xl text-islamic-gold font-bold italic tracking-wide">
            Prophetic Traditions
          </h2>
          <div className="w-24 h-[2px] bg-islamic-gold mx-auto my-4 opacity-70" />
          <p className="relative z-10 font-sans text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore authentic sayings and narrations of Prophet Muhammad ﷺ from Sahih Al-Bukhari with Arabic text and English translation.
          </p>
        </div>

        {error && (
          <div className="text-red-600 text-center p-4 bg-red-100 border border-red-200 rounded-xl max-w-2xl mx-auto">
            {error}
          </div>
        )}

        {/* Search Bar */}
        <div className="space-y-4">
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-5 rtl:right-5 rtl:left-auto top-4 w-5 h-5 text-islamic-gold" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Hadiths by keywords or meaning..."
              className="w-full pl-14 rtl:pr-14 rtl:pl-4 py-4 rounded-2xl bg-white border border-gray-200 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-islamic-gold focus:ring-1 focus:ring-islamic-gold transition-all shadow-sm"
            />
          </div>
        </div>

        {loading ? (
           <div className="flex justify-center p-20 text-islamic-gold">
             <Loader2 className="w-12 h-12 animate-spin" />
           </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 pt-8 max-w-4xl mx-auto">
            {filteredHadiths.map((item) => (
              <div key={item.hadithnumber} className="p-8 sm:p-12 bg-white border border-gray-200 rounded-3xl space-y-6 flex flex-col justify-between group shadow-sm transition-all duration-300">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 gap-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-sans font-bold uppercase tracking-widest flex items-center gap-1.5 border border-emerald-100/50">
                      <ShieldCheck className="w-3.5 h-3.5" /> Sahih
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <BookmarkButton id={`hadith-bukhari-${item.hadithnumber}`} />
                    <button
                      onClick={() => copyHadith(item.hadithnumber, `"${item.text}" — Sahih Al-Bukhari`)}
                      className="p-2 rounded-full text-gray-400 hover:text-islamic-gold hover:bg-gray-50 transition-colors"
                      title="Copy Hadith"
                    >
                      {copiedId === item.hadithnumber ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setShareData({ isOpen: true, title: 'Authentic Hadith', text: `"${item.text}" — Sahih Al-Bukhari` })}
                      className="p-2 rounded-full text-gray-400 hover:text-islamic-gold hover:bg-gray-50 transition-colors"
                      title="Share Hadith"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-center sm:text-left rtl:sm:text-right py-4">
                  <p className="font-arabic text-3xl sm:text-4xl text-islamic-deep leading-[2] sm:leading-[2.2] font-bold">
                    {item.text}
                  </p>
                </div>
                
                {/* English Translation */}
                <div className="pt-6 border-t border-gray-100">
                  <p className="font-serif text-lg sm:text-xl text-gray-600 leading-relaxed font-light border-l-2 border-islamic-gold/30 pl-4 rtl:pl-0 rtl:border-l-0 rtl:border-r-2 rtl:pr-4 text-left rtl:text-right">
                    "{item.translation}"
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-gray-50 text-xs text-gray-400 font-sans uppercase tracking-widest flex flex-wrap gap-4 items-center justify-between">
                  <span>Sahih Al-Bukhari</span>
                  <span>Hadith <span className="text-islamic-gold font-bold">{item.hadithnumber}</span></span>
                </div>
              </div>
            ))}

            {filteredHadiths.length === 0 && !loading && (
              <div className="col-span-1 md:col-span-2 py-12 text-center text-islamic-cream/50 bg-islamic-primary/20 rounded-2xl border border-islamic-gold/10">
                <p className="font-serif text-lg">No Hadith matches your search term.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <ShareModal
        isOpen={shareData.isOpen}
        onClose={() => setShareData({ isOpen: false, title: '', text: '' })}
        title={shareData.title}
        text={shareData.text}
      />
    </div>
  );
};
