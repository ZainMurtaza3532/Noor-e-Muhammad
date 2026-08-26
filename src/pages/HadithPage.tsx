import React, { useState } from 'react';
import { Search, Copy, Check, Share2, ShieldCheck, Filter } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { BookmarkButton } from '../components/common/BookmarkButton';
import { ShareModal } from '../components/common/ShareModal';
import { IslamicPattern } from '../components/common/IslamicPattern';

export const HadithPage: React.FC = () => {
  const { hadiths } = useAppStore();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [shareData, setShareData] = useState<{ isOpen: boolean; title: string; text: string }>({
    isOpen: false,
    title: '',
    text: ''
  });

  const categories = ['All', 'Faith', 'Character', 'Mercy', 'Knowledge', 'Charity', 'Patience', 'Manners'];

  const filteredHadiths = hadiths.filter((h) => {
    const matchesCategory = categoryFilter === 'All' || h.category === categoryFilter;
    const matchesSearch =
      h.translation.toLowerCase().includes(search.toLowerCase()) ||
      h.source.toLowerCase().includes(search.toLowerCase()) ||
      (h.urdu && h.urdu.includes(search));
    return matchesCategory && matchesSearch;
  });

  const copyHadith = (id: string, text: string) => {
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
            Verified Sacred Traditions
          </span>
          <h1 className="relative z-10 font-arabic text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-islamic-cream to-islamic-gold/90 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] pb-2">
            الْأَحَادِيثُ النَّبَوِيَّةُ
          </h1>
          <h2 className="relative z-10 font-serif text-2xl text-islamic-gold font-bold italic tracking-wide">
            Hadith Library
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-islamic-gold to-transparent mx-auto my-4 opacity-70" />
          <p className="relative z-10 font-sans text-sm sm:text-base text-islamic-cream/70 max-w-2xl mx-auto leading-relaxed">
            Explore authentic sayings and narrations of Prophet Muhammad ﷺ from Sahih Al-Bukhari, Sahih Muslim, and major Hadith collections.
          </p>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="space-y-4">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 rtl:right-4 rtl:left-auto top-3.5 w-5 h-5 text-islamic-gold" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Hadith by keywords, reference, or source..."
              className="w-full pl-12 rtl:pr-12 rtl:pl-4 py-3 rounded-2xl bg-islamic-primary/50 border border-islamic-gold/30 text-islamic-cream placeholder-islamic-cream/50 text-sm focus:outline-none focus:border-islamic-gold shadow-lg"
            />
          </div>

          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-xl text-[13px] font-serif font-bold whitespace-nowrap transition-all duration-300 ${categoryFilter === cat
                    ? 'btn-premium'
                    : 'bg-islamic-deep/50 backdrop-blur-md text-islamic-cream/80 hover:text-islamic-gold border border-islamic-gold/30 shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Hadith Cards Grid */}
        <div className="space-y-10 pt-4">
          {filteredHadiths.map((item) => (
            <div key={item.id} className="p-8 sm:p-12 glass-card-premium rounded-[2.5rem] group hover:border-islamic-gold/60 transition-colors duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.3)] space-y-8 relative overflow-hidden">

              <div className="absolute top-0 right-0 w-64 h-64 bg-islamic-gold/5 rounded-full blur-[80px] pointer-events-none" />

              <div className="flex items-center justify-between relative z-10">
                <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-islamic-gold to-yellow-600 text-islamic-deep text-[11px] font-serif font-bold uppercase tracking-wider shadow-gold-glow">
                  {item.category}
                </span>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <BookmarkButton id={item.id} />
                  <button
                    onClick={() => copyHadith(item.id, `"${item.translation}" — ${item.source}`)}
                    className="p-2 rounded-full bg-islamic-primary/60 text-islamic-cream/80 hover:text-islamic-gold transition-colors"
                    title="Copy Hadith"
                  >
                    {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setShareData({ isOpen: true, title: 'Authentic Hadith', text: `"${item.translation}" — ${item.source}` })}
                    className="p-2 rounded-full bg-islamic-primary/60 text-islamic-cream/80 hover:text-islamic-gold transition-colors"
                    title="Share Hadith"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Text Bodies */}
              <div className="space-y-6 text-center sm:text-left rtl:sm:text-right relative z-10 py-4">
                <p className="font-arabic text-3xl sm:text-4xl text-islamic-gold font-bold leading-relaxed drop-shadow-md">
                  "{item.arabic}"
                </p>
                <p className="font-serif text-lg sm:text-xl text-islamic-cream/95 leading-relaxed italic font-medium">
                  "{item.translation}"
                </p>
                {item.urdu && (
                  <p className="font-urdu text-base sm:text-lg text-islamic-goldLight/90 leading-relaxed pt-4 border-t border-islamic-gold/10">
                    "{item.urdu}"
                  </p>
                )}
              </div>

              {/* Source Attribution */}
              <div className="pt-4 border-t border-islamic-gold/20 flex items-center justify-between text-xs text-islamic-cream/70 font-serif">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" /> {item.source}
                </span>
                <span>Ref: {item.reference}</span>
              </div>
            </div>
          ))}

          {filteredHadiths.length === 0 && (
            <div className="py-12 text-center text-islamic-cream/60">
              <p className="font-serif text-base">No Hadith matches your search term.</p>
            </div>
          )}
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
