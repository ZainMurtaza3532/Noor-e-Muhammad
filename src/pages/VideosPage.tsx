import React, { useState, useEffect } from 'react';
import { Play, ExternalLink, Search, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { BookmarkButton } from '../components/common/BookmarkButton';
import { IslamicPattern } from '../components/common/IslamicPattern';
import { youtubeApi } from '../services/api/youtubeApi';
import type { MediaItem } from '../types';

export const VideosPage: React.FC = () => {
  const [videos, setVideos] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [mediaTypeFilter, setMediaTypeFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const VIDEOS_PER_PAGE = 12;
  const mediaTypes = ['All', 'Naat', 'Bayan', 'Seerah', 'Quran', 'Kids Islamic Content'];

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const query = search.trim();
        const data = await youtubeApi.searchVideos(query, 12, mediaTypeFilter as any);
        setVideos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    // Add a slight debounce so we don't spam the API on every keystroke
    const timeout = setTimeout(() => {
      fetchVideos();
    }, 500);
    return () => clearTimeout(timeout);
  }, [search, mediaTypeFilter]);

  // Reset to page 1 when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, mediaTypeFilter]);

  const totalPages = Math.ceil(videos.length / VIDEOS_PER_PAGE);
  const paginatedVideos = videos.slice(
    (currentPage - 1) * VIDEOS_PER_PAGE,
    currentPage * VIDEOS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-islamic-cream text-gray-800 pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="font-serif text-xs font-bold text-islamic-gold uppercase tracking-widest">Islamic Video Hub</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-islamic-deep">الْمَقَاطِعُ الإِسْلَامِيَّةُ - Islamic Videos</h1>
          <p className="font-sans text-sm text-gray-600 max-w-2xl mx-auto">
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
              className="w-full pl-12 rtl:pr-12 rtl:pl-4 py-3 rounded-2xl bg-white border border-gray-200 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-islamic-gold focus:ring-1 focus:ring-islamic-gold shadow-sm"
            />
          </div>

          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {mediaTypes.map((type) => (
              <button
                key={type}
                onClick={() => setMediaTypeFilter(type)}
                className={`px-4 py-2 rounded-xl text-xs font-serif whitespace-nowrap transition-all ${
                  mediaTypeFilter === type 
                    ? 'bg-islamic-primary text-white font-bold shadow-md' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-islamic-gold'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        {loading ? (
          <div className="flex justify-center p-12 text-islamic-gold">
            <Loader2 className="w-12 h-12 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedVideos.map((v) => (
            <div key={v.id} className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 flex flex-col justify-between group hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
              
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
                    <span className="px-2.5 py-0.5 rounded-full bg-islamic-accent text-islamic-primary text-[10px] font-serif font-bold uppercase">
                      {v.mediaType || v.category}
                    </span>
                    <BookmarkButton id={v.id} />
                  </div>
                  <h3 className="font-serif text-base font-bold text-islamic-deep line-clamp-2">{v.title}</h3>
                  <p className="text-xs text-gray-500">Channel: <strong className="text-islamic-primary">{v.channelName}</strong></p>
                </div>

                <a
                  href={v.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl btn-primary text-[12px] text-center flex items-center justify-center gap-2"
                >
                  <span>Watch Video on YouTube</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
        )}
        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-white border border-gray-200 text-islamic-deep disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="font-serif text-sm font-bold text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-white border border-gray-200 text-islamic-deep disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
