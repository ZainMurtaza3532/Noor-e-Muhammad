import React, { useState } from 'react';
import { Play, ExternalLink, Search, Disc } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { BookmarkButton } from '../components/common/BookmarkButton';
import { IslamicPattern } from '../components/common/IslamicPattern';

export const NaatPage: React.FC = () => {
  const { naats, playAudio } = useAppStore();
  const [search, setSearch] = useState('');

  const filteredNaats = naats.filter(
    (n) => n.title.toLowerCase().includes(search.toLowerCase()) || (n.speaker && n.speaker.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-islamic-deep text-islamic-cream pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="font-serif text-xs font-bold text-islamic-gold uppercase tracking-widest">Auditory Devotion</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-gold-gradient">نَعْتِ شَرِيفٌ - Naat Shareef</h1>
          <p className="font-sans text-sm text-islamic-cream/80 max-w-2xl mx-auto">
            Listen to heartfelt Naat recitals in praise and love of Prophet Muhammad ﷺ.
          </p>
          <IslamicPattern />
        </div>

        {/* Search Input */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 rtl:right-4 rtl:left-auto top-3.5 w-5 h-5 text-islamic-gold" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Naat by title or reciter..."
            className="w-full pl-12 rtl:pr-12 rtl:pl-4 py-3 rounded-2xl bg-islamic-primary/50 border border-islamic-gold/30 text-islamic-cream placeholder-islamic-cream/50 text-sm focus:outline-none focus:border-islamic-gold shadow-lg"
          />
        </div>

        {/* Naat Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNaats.map((n) => (
            <div key={n.id} className="glass-card-premium rounded-[2rem] overflow-hidden border border-islamic-gold/30 flex flex-col justify-between group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.3)] transition-all duration-500">
              
              {/* Thumbnail Container */}
              <div className="relative aspect-video">
                <img src={n.thumbnail} alt={n.title} className="w-full h-full object-cover" />
                <a
                  href={n.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/40 flex items-center justify-center group"
                >
                  <div className="w-14 h-14 rounded-full bg-islamic-gold text-islamic-deep flex items-center justify-center shadow-gold-glow group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </div>
                </a>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-islamic-cream">
                  {n.duration || 'YouTube'}
                </span>
              </div>

              {/* Card Meta */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-islamic-gold/20 text-islamic-gold text-[10px] font-serif font-bold uppercase border border-islamic-gold/30">
                      {n.category}
                    </span>
                    <BookmarkButton id={n.id} />
                  </div>
                  <h3 className="font-serif text-base font-bold text-islamic-cream line-clamp-2">{n.title}</h3>
                  <p className="text-xs text-islamic-cream/70">Reciter: <strong className="text-islamic-gold">{n.speaker || n.channelName}</strong></p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => playAudio(n.title, n.speaker || n.channelName, 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3')}
                    className="py-2.5 rounded-xl bg-islamic-deep/60 hover:bg-islamic-deep text-islamic-goldLight border border-islamic-gold/30 text-[11px] font-serif font-bold flex items-center justify-center gap-1.5 transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
                  >
                    <Disc className="w-3.5 h-3.5 text-emerald-400 group-hover:animate-spin" />
                    <span>Quick Listen</span>
                  </button>

                  <a
                    href={n.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 rounded-xl btn-premium text-[11px] text-center flex items-center justify-center gap-1.5"
                  >
                    <span>Watch Video</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
