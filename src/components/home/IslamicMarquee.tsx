import React from 'react';
import { motion } from 'framer-motion';

const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1572889613146-291775fa05fc?auto=format&fit=crop&w=400&q=80', label: 'Kaaba, Makkah' },
  { src: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=400&q=80', label: 'Sacred Architecture' },
  { src: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=400&q=80', label: 'Islamic Heritage' },
  { src: 'https://images.unsplash.com/photo-1597933100693-559d81d6f519?auto=format&fit=crop&w=400&q=80', label: 'Geometric Art' },
  { src: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=400&q=80', label: 'Holy Quran' },
  { src: 'https://images.unsplash.com/photo-1519817914152-2a6416625b06?auto=format&fit=crop&w=400&q=80', label: 'Calligraphy' },
];

export const IslamicMarquee: React.FC = () => {
  return (
    <div className="w-full overflow-hidden bg-islamic-deep/50 py-12 border-y border-islamic-gold/15 relative">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-islamic-deep to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-islamic-deep to-transparent z-10 pointer-events-none" />
      
      <div className="flex overflow-hidden group">
        <div className="flex gap-6 w-max animate-marquee group-hover:[animation-play-state:paused] pl-6">
          {[...IMAGES, ...IMAGES].map((img, i) => (
            <div 
              key={i} 
              className="relative w-64 h-40 rounded-2xl overflow-hidden border border-islamic-gold/20 flex-shrink-0 cursor-pointer"
            >
              <img src={img.src} alt={img.label} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-islamic-deep/40 hover:bg-islamic-deep/20 transition-colors pointer-events-none" />
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-islamic-deep/80 backdrop-blur-md rounded-full border border-islamic-gold/30 pointer-events-none">
                <span className="text-xs font-serif font-bold text-islamic-gold">{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
