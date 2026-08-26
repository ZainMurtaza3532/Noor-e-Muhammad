import React, { useState } from 'react';
import { Play, ExternalLink, Search, Filter } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { BookmarkButton } from '../components/common/BookmarkButton';
import { IslamicPattern } from '../components/common/IslamicPattern';

export const VideosPage: React.FC = () => {
  const { videos } = useAppStore();
  const [search, setSearch] = useState('');
  const [mediaTypeFilter, setMediaTypeFilter] = useState('All');

  const mediaTypes = ['All', 'Naat', 'Bayan', 'Seerah', 'Quran', 'Kids Islamic Content'];

  const filteredVideos = videos.filter((v) => {
    const matchesCategory = mediaTypeFilter === 'All' || v.mediaType === mediaTypeFilter || v.category === mediaTypeFilter;
    const matchesSearch = v.title.toLowerCase().includes(search.toLowerCase()) || v.channelName.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-islamic-deep text-islamic-cream pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="font-serif text-xs font-bold text-islamic-gold uppercase tracking-widest">Islamic Video Hub</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-gold-gradient">الْمَقَاطِعُ الإِسْلَامِيَّةُ - Islamic Videos</h1>
          <p className="font-sans text-sm text-islamic-cream/80 max-w-2xl mx-auto">
            A curated repository of verified Naats, Bayans, Quran recitations, Seerah documentaries, and kids Islamic content.
          </p>
          <IslamicPattern />
        </div>

        {/* Search & Category Filter */}
        <div className="space-y-4">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 rtl:right-4 rtl:left-auto top-3.5 w-5 h-5 text-islamic-gold" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search videos by title or channel..."
              className="w-full pl-12 rtl:pr-12 rtl:pl-4 py-3 rounded-2xl bg-islamic-primary/50 border border-islamic-gold/30 text-islamic-cream placeholder-islamic-cream/50 text-sm focus:outline-none focus:border-islamic-gold shadow-lg"
            />
          </div>

          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {mediaTypes.map((type) => (
              <button
                key={type}
                onClick={() => setMediaTypeFilter(type)}
                className={`px-4 py-2 rounded-xl text-xs font-serif whitespace-nowrap transition-all ${
                  mediaTypeFilter === type 
                    ? 'bg-islamic-gold text-islamic-deep font-bold shadow-gold-glow' 
                    : 'bg-islamic-primary/40 text-islamic-cream/80 border border-islamic-gold/15'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((v) => (
            <div key={v.id} className="glass-card glass-card-hover rounded-3xl overflow-hidden border border-islamic-gold/30 flex flex-col justify-between">
              
              <div className="relative aspect-video">
                <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" />
                <a
                  href={v.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/40 flex items-center justify-center group"
                >
                  <div className="w-14 h-14 rounded-full bg-islamic-gold text-islamic-deep flex items-center justify-center shadow-gold-glow group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </div>
                </a>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-islamic-gold/20 text-islamic-gold text-[10px] font-serif font-bold uppercase border border-islamic-gold/30">
                      {v.mediaType || v.category}
                    </span>
                    <BookmarkButton id={v.id} />
                  </div>
                  <h3 className="font-serif text-base font-bold text-islamic-cream line-clamp-2">{v.title}</h3>
                  <p className="text-xs text-islamic-cream/70">Channel: <strong className="text-islamic-gold">{v.channelName}</strong></p>
                </div>

                <a
                  href={v.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-islamic-gold/20 hover:bg-islamic-gold/30 text-islamic-gold border border-islamic-gold/40 text-xs font-serif font-bold text-center flex items-center justify-center gap-2 shadow-gold-glow transition-all"
                >
                  <span>Watch Video on YouTube</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
