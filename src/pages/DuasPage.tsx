import React, { useState, useEffect } from 'react';
import { Search, Copy, Check, Share2, Loader2, HeartHandshake } from 'lucide-react';
import { duaApi, type Dua } from '../services/api/duaApi';
import { BookmarkButton } from '../components/common/BookmarkButton';
import { ShareModal } from '../components/common/ShareModal';

export const DuasPage: React.FC = () => {
  const [duas, setDuas] = useState<Dua[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [shareData, setShareData] = useState<{ isOpen: boolean; title: string; text: string }>({
    isOpen: false,
    title: '',
    text: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDuas = async () => {
      try {
        const data = await duaApi.getDuas();
        const cats = await duaApi.getCategories();
        setDuas(data);
        setCategories(['All', ...cats]);
      } catch (err) {
        setError('Failed to load Duas.');
      } finally {
        setLoading(false);
      }
    };
    fetchDuas();
  }, []);

  const filteredDuas = duas.filter((d) => {
    const matchesCategory = categoryFilter === 'All' || d.category === categoryFilter;
    const matchesSearch =
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.translation.toLowerCase().includes(search.toLowerCase()) ||
      d.transliteration.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const copyDua = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-islamic-cream text-gray-800 pt-28 pb-20 px-4 font-sans relative overflow-hidden">
      
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat opacity-[0.02] mix-blend-overlay pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">

        {/* Header */}
        <div className="text-center space-y-4 mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-islamic-gold/10 to-transparent blur-3xl pointer-events-none" />
          <span className="relative z-10 inline-block px-6 py-2 rounded-full bg-islamic-primary/10 border border-islamic-primary/20 text-islamic-deep font-serif text-[11px] font-bold uppercase tracking-[0.3em] backdrop-blur-xl">
            <HeartHandshake className="w-3 h-3 inline-block mr-1" />
            Prophetic Supplications
          </span>
          <h1 className="relative z-10 font-arabic text-4xl sm:text-6xl font-extrabold text-islamic-deep pb-2">
            الأَدْعِيَةُ وَالأَذْكَارُ
          </h1>
          <h2 className="relative z-10 font-serif text-2xl text-islamic-gold font-bold italic tracking-wide">
            Dua Center
          </h2>
          <div className="w-24 h-[2px] bg-islamic-gold mx-auto my-4 opacity-70" />
          <p className="relative z-10 font-sans text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Authentic Quranic and Prophetic Duas featuring Arabic text, transliteration for pronunciation, and English translation.
          </p>
        </div>

        {error && (
          <div className="text-red-400 text-center p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
            {error}
          </div>
        )}

        {/* Search & Category Filter */}
        <div className="space-y-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-5 rtl:right-5 rtl:left-auto top-4 w-5 h-5 text-islamic-gold" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Duas by title, meaning, or transliteration..."
              className="w-full pl-14 rtl:pr-14 rtl:pl-4 py-4 rounded-2xl bg-white border border-gray-200 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-islamic-primary focus:ring-1 focus:ring-islamic-primary transition-all shadow-sm"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-[13px] font-serif transition-all duration-300 shadow-sm ${
                  categoryFilter === cat
                    ? 'bg-islamic-primary text-white font-bold shadow-md scale-105 border border-transparent'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-islamic-primary hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
           <div className="flex justify-center py-20 text-islamic-gold">
             <Loader2 className="w-12 h-12 animate-spin" />
           </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 pt-8 max-w-4xl mx-auto">
            {filteredDuas.map((item) => (
              <div key={item.id} className="p-8 sm:p-12 bg-white border border-gray-200 rounded-3xl space-y-6 flex flex-col justify-between group shadow-sm transition-all duration-300">

                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <span className="px-4 py-1.5 rounded-full bg-islamic-gold/10 border border-islamic-gold/20 text-islamic-deep text-xs font-sans font-bold uppercase tracking-widest shadow-sm">
                    {item.category}
                  </span>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <BookmarkButton id={`dua-${item.id}`} />
                    <button
                      onClick={() => copyDua(item.id, `${item.title}\n\n${item.arabic}\n\n${item.transliteration}\n\n${item.translation}`)}
                      className="p-2.5 rounded-full text-gray-400 hover:text-islamic-deep hover:bg-gray-50 transition-colors"
                    >
                      {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setShareData({ isOpen: true, title: item.title, text: `${item.arabic}\n\n${item.translation}` })}
                      className="p-2.5 rounded-full text-gray-400 hover:text-islamic-deep hover:bg-gray-50 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-bold text-islamic-deep pt-2">{item.title}</h3>

                <div className="py-4">
                  <p className="font-arabic text-4xl sm:text-5xl text-islamic-deep text-right rtl:text-left leading-[2] sm:leading-[2.2] font-bold">
                    {item.arabic}
                  </p>
                </div>

                <div className="space-y-6 pt-6 border-t border-gray-100">
                  {/* Transliteration */}
                  <div className="relative">
                    <p className="text-[15px] sm:text-base font-sans text-gray-500 italic pl-3 leading-relaxed tracking-wide border-l-2 border-gray-200">
                      <span className="font-bold text-gray-400 uppercase text-[10px] tracking-widest not-italic block mb-1">Pronunciation</span>
                      {item.transliteration}
                    </p>
                  </div>

                  {/* Translation */}
                  <div className="relative pt-4">
                    <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-serif pl-3 border-l-2 border-islamic-gold/40 font-light">
                      <span className="font-bold text-islamic-gold uppercase text-[10px] tracking-widest block mb-1">Meaning</span>
                      "{item.translation}"
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-gray-50 text-[11px] text-gray-400 font-sans uppercase tracking-widest flex items-center justify-between">
                  <span>Ref: {item.reference}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredDuas.length === 0 && !loading && (
          <div className="py-16 text-center text-islamic-cream/50 bg-islamic-primary/20 rounded-2xl border border-islamic-gold/10 max-w-2xl mx-auto">
            <p className="font-serif text-lg">No supplications found for this category.</p>
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
