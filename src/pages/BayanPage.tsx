import React, { useState, useEffect } from 'react';
import { Play, ExternalLink, Search, Loader2 } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { BookmarkButton } from '../components/common/BookmarkButton';
import { IslamicPattern } from '../components/common/IslamicPattern';
import { youtubeApi } from '../services/api/youtubeApi';
import type { MediaItem } from '../types';

export const BayanPage: React.FC = () => {
  const [bayans, setBayans] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchBayans = async () => {
      setLoading(true);
      try {
        const query = search.trim() ? search.trim() + ' islamic bayan' : 'islamic bayan';
        const data = await youtubeApi.searchVideos(query, 12, 'Bayan');
        setBayans(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    const timeout = setTimeout(() => {
      fetchBayans();
    }, 500);
    return () => clearTimeout(timeout);
  }, [search]);

  const filteredBayans = bayans;

  return (
    <div className="min-h-screen bg-islamic-cream text-gray-800 pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="font-serif text-xs font-bold text-islamic-gold uppercase tracking-widest">Scholarly Guidance</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-islamic-deep">الْمُحَاضَرَاتُ وَالْبَيَانَاتُ - Bayan & Lectures</h1>
          <p className="font-sans text-sm text-gray-600 max-w-2xl mx-auto">
            Inspiring lectures and Bayan sessions from Islamic scholars on the Seerah, Sunnah, and Islamic virtues.
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
            placeholder="Search Bayan by speaker or topic..."
            className="w-full pl-12 rtl:pr-12 rtl:pl-4 py-3 rounded-2xl bg-white border border-gray-200 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-islamic-gold focus:ring-1 focus:ring-islamic-gold shadow-sm"
          />
        </div>

        {/* Bayan Grid */}
        {loading ? (
          <div className="flex justify-center p-12 text-islamic-gold">
            <Loader2 className="w-12 h-12 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBayans.map((b) => (
              <div key={b.id} className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 flex flex-col justify-between group hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
              
              <div className="relative aspect-video">
                <img src={b.thumbnail} alt={b.title} className="w-full h-full object-cover" />
                <a
                  href={b.youtubeUrl}
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
                      {b.category || b.mediaType}
                    </span>
                    <BookmarkButton id={b.id} />
                  </div>
                  <h3 className="font-serif text-base font-bold text-islamic-deep line-clamp-2">{b.title}</h3>
                  <p className="text-xs text-gray-500">Speaker: <strong className="text-islamic-primary">{b.speaker || b.channelName}</strong></p>
                </div>

                <a
                  href={b.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl btn-premium text-[12px] text-center flex items-center justify-center gap-2"
                >
                  <span>Watch Lecture on YouTube</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};
