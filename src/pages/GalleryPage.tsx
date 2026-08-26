import React, { useState } from 'react';
import { X, ZoomIn, Share2, Image as ImageIcon } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { IslamicPattern } from '../components/common/IslamicPattern';

export const GalleryPage: React.FC = () => {
  const { gallery } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<any | null>(null);

  const categories = ['All', 'Madinah', 'Makkah', 'Masjid', 'Geometric Art', 'Lanterns', 'Quran'];

  const filteredGallery = selectedCategory === 'All' 
    ? gallery 
    : gallery.filter(g => g.category === selectedCategory);

  return (
    <div className="min-h-screen bg-islamic-deep text-islamic-cream pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="font-serif text-xs font-bold text-islamic-gold uppercase tracking-widest">Sacred Visuals</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-gold-gradient">الْمَعْرَضُ الإِسْلَامِيُّ - Islamic Gallery</h1>
          <p className="font-sans text-sm text-islamic-cream/80 max-w-2xl mx-auto">
            High-resolution photography of Al-Masjid an-Nabawi, Makkah Mukarramah, traditional geometric tilework, and Islamic calligraphy.
          </p>
          <IslamicPattern />
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-serif whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-islamic-gold text-islamic-deep font-bold shadow-gold-glow' 
                  : 'bg-islamic-primary/40 text-islamic-cream/80 border border-islamic-gold/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage(item)}
              className="group relative aspect-square rounded-3xl overflow-hidden border border-islamic-gold/30 cursor-pointer shadow-xl"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-between">
                <div className="flex justify-end">
                  <div className="p-2 rounded-full bg-islamic-gold/30 text-islamic-gold backdrop-blur-sm">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-serif font-bold text-islamic-gold uppercase tracking-wider">{item.category}</span>
                  <h3 className="font-serif text-sm font-bold text-white line-clamp-1">{item.title}</h3>
                  <p className="text-[11px] text-islamic-cream/70 line-clamp-2 mt-0.5">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-4xl w-full bg-islamic-deep rounded-3xl overflow-hidden border border-islamic-gold/40 shadow-2xl">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 p-2 text-islamic-cream/80 hover:text-islamic-gold bg-black/60 rounded-full z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative aspect-video sm:aspect-[16/9] w-full bg-black">
              <img src={lightboxImage.imageUrl} alt={lightboxImage.title} className="w-full h-full object-contain" />
            </div>

            <div className="p-6 space-y-2 text-islamic-cream">
              <span className="text-xs font-serif font-bold text-islamic-gold uppercase">{lightboxImage.category}</span>
              <h3 className="font-serif text-xl font-bold text-gold-gradient">{lightboxImage.title}</h3>
              <p className="text-xs text-islamic-cream/80 leading-relaxed">{lightboxImage.description}</p>
              <div className="pt-2 text-[10px] text-islamic-cream/50 italic border-t border-islamic-gold/15">
                Attribution: {lightboxImage.attribution}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
