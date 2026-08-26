import React, { useState } from 'react';
import { Search, Heart, Copy, Check, Share2, Filter } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { BookmarkButton } from '../components/common/BookmarkButton';
import { ShareModal } from '../components/common/ShareModal';
import { IslamicPattern } from '../components/common/IslamicPattern';

export const DuasPage: React.FC = () => {
  const { duas } = useAppStore();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [shareData, setShareData] = useState<{ isOpen: boolean; title: string; text: string }>({
    isOpen: false,
    title: '',
    text: ''
  });

  const categories = ['All', 'Morning', 'Parents', 'Guidance', 'Forgiveness', 'Protection'];

  const filteredDuas = duas.filter((d) => {
    const matchesCategory = categoryFilter === 'All' || d.category === categoryFilter;
    const matchesSearch =
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.english.toLowerCase().includes(search.toLowerCase()) ||
      d.transliteration.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const copyDua = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-islamic-deep text-islamic-cream pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-4 mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-islamic-gold/10 to-transparent blur-3xl pointer-events-none" />
          <span className="relative z-10 inline-block px-6 py-2 rounded-full bg-islamic-gold/10 border border-islamic-gold/40 text-islamic-gold font-serif text-[11px] font-bold uppercase tracking-[0.3em] backdrop-blur-xl shadow-gold-glow">
            Prophetic Supplications
          </span>
          <h1 className="relative z-10 font-arabic text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-islamic-cream to-islamic-gold/90 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] pb-2">
            الأَدْعِيَةُ وَالأَذْكَارُ
          </h1>
          <h2 className="relative z-10 font-serif text-2xl text-islamic-gold font-bold italic tracking-wide">
            Dua Center
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-islamic-gold to-transparent mx-auto my-4 opacity-70" />
          <p className="relative z-10 font-sans text-sm sm:text-base text-islamic-cream/70 max-w-2xl mx-auto leading-relaxed">
            Authentic Quranic and Prophetic Duas with Arabic text, transliteration, English, Urdu, and verified sources.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="space-y-4">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 rtl:right-4 rtl:left-auto top-3.5 w-5 h-5 text-islamic-gold" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Duas by title, transliteration, or meaning..."
              className="w-full pl-12 rtl:pr-12 rtl:pl-4 py-3 rounded-2xl bg-islamic-primary/50 border border-islamic-gold/30 text-islamic-cream placeholder-islamic-cream/50 text-sm focus:outline-none focus:border-islamic-gold shadow-lg"
            />
          </div>

          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-serif whitespace-nowrap transition-all ${categoryFilter === cat
                    ? 'bg-islamic-gold text-islamic-deep font-bold shadow-gold-glow'
                    : 'bg-islamic-primary/40 text-islamic-cream/80 border border-islamic-gold/15'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dua Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {filteredDuas.map((item) => (
            <div key={item.id} className="p-8 sm:p-10 glass-card-premium rounded-3xl border border-islamic-gold/30 shadow-2xl space-y-5 flex flex-col justify-between hover:border-islamic-gold/60 transition-colors duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.2)]">

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-islamic-gold/15 pb-4">
                  <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-islamic-gold to-yellow-600 text-islamic-deep text-[10px] font-serif font-bold uppercase tracking-wider shadow-gold-glow">
                    {item.category}
                  </span>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <BookmarkButton id={item.id} />
                    <button
                      onClick={() => copyDua(item.id, `${item.title}\n${item.arabic}\n${item.english}`)}
                      className="p-2 rounded-full bg-islamic-primary/60 text-islamic-cream/80 hover:text-islamic-gold"
                    >
                      {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setShareData({ isOpen: true, title: item.title, text: `${item.arabic}\n\n${item.english}` })}
                      className="p-2 rounded-full bg-islamic-primary/60 text-islamic-cream/80 hover:text-islamic-gold"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="font-serif text-xl font-bold text-islamic-gold mt-2">{item.title}</h3>

                <p className="font-arabic text-3xl sm:text-4xl text-islamic-gold text-right rtl:text-left leading-relaxed font-bold py-2 drop-shadow-md">
                  {item.arabic}
                </p>

                <div className="space-y-2 bg-islamic-deep/40 p-4 rounded-xl border border-islamic-gold/10">
                  <p className="text-[13px] font-serif text-islamic-goldLight/80 italic">
                    <span className="font-bold text-islamic-gold uppercase text-[10px] tracking-widest not-italic">Pronunciation:</span><br />
                    {item.transliteration}
                  </p>
                </div>

                <p className="text-sm text-islamic-cream/90 leading-relaxed font-serif font-light pt-2">
                  <span className="font-bold text-islamic-gold uppercase text-[10px] tracking-widest">Meaning:</span><br />
                  "{item.english}"
                </p>

                {item.urdu && (
                  <p className="font-urdu text-sm text-islamic-goldLight/90 leading-relaxed pt-3 border-t border-islamic-gold/10">
                    <span className="font-sans font-bold text-islamic-gold uppercase text-[10px] tracking-widest">Urdu:</span><br />
                    "{item.urdu}"
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-islamic-gold/15 text-[11px] text-islamic-cream/60 font-serif flex items-center justify-between">
                <span>Ref: {item.reference}</span>
              </div>
            </div>
          ))}
        </div>
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
