import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { ISLAMIC_CONFIG } from '../../config/islamicConfig';
import { IslamicPattern } from './IslamicPattern';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-islamic-deep overflow-hidden text-islamic-cream mt-20 pb-8">
      
      {/* Top Separator Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-islamic-gold/50 to-transparent shadow-[0_0_30px_rgba(212,175,55,1)]" />
      
      {/* Background Mesh & Glow */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="absolute -top-64 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-islamic-gold/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-islamic-emerald/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
        
        {/* Top Salawat Banner - Enhanced */}
        <div className="text-center mb-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-islamic-gold/10 to-transparent blur-3xl pointer-events-none" />
          <span className="relative z-10 font-arabic text-4xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFF9E8] via-[#D4AF37] to-[#997A15] font-bold block mb-6 leading-relaxed drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            {ISLAMIC_CONFIG.salawatDua}
          </span>
          <p className="relative z-10 font-serif text-lg text-islamic-goldLight/90 italic max-w-2xl mx-auto drop-shadow-md">
            "{ISLAMIC_CONFIG.salawatTranslation}"
          </p>
          <IslamicPattern className="my-8 opacity-60" />
        </div>

        {/* Links Grid - Premium Style */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-12 mb-12 border-b border-islamic-gold/20 pb-16 text-[13px] font-sans">
          
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 space-y-6 lg:pr-8">
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse group shrink-0 w-max">
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-islamic-gold/20 to-islamic-gold/5 border border-islamic-gold/40 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] group-hover:scale-110 transition-all duration-500 ease-out overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat opacity-[0.2] pointer-events-none group-hover:rotate-12 transition-transform duration-700" />
                <span className="relative font-arabic text-2xl text-islamic-gold group-hover:-rotate-6 transition-transform duration-500 drop-shadow-md">🌙</span>
              </div>
              <div className="flex flex-col">
                <span className="font-arabic font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-islamic-goldLight via-islamic-gold to-yellow-600 tracking-wider group-hover:brightness-125 transition-all duration-300">
                  نورِ محمد ﷺ
                </span>
                <span className="font-serif text-[10px] font-bold uppercase tracking-[0.3em] text-islamic-cream/60">
                  The Light of Mercy
                </span>
              </div>
            </Link>
            <p className="text-islamic-cream/60 leading-loose max-w-sm font-light">
              A premium authentic Islamic platform dedicated to celebrating 12 Rabi-ul-Awwal, the Seerah, Sunnah, Hadith, Quran, and the timeless mercy of Prophet Muhammad ﷺ.
            </p>
          </div>

          {/* Links Renderer Helper */}
          {[
            {
              title: "Knowledge",
              links: [
                { name: 'Seerah Timeline', path: '/seerah' },
                { name: 'Sunnah Hub', path: '/sunnah' },
                { name: 'Ahadith Library', path: '/ahadith' },
                { name: 'Quran Reader', path: '/quran' },
                { name: 'Masnoon Duas', path: '/duas' }
              ]
            },
            {
              title: "Media & Tools",
              links: [
                { name: 'Naat Shareef', path: '/naat' },
                { name: 'Bayan & Lectures', path: '/bayan' },
                { name: 'Islamic Video Hub', path: '/videos' },
                { name: 'Digital Tasbeeh', path: '/tools' },
                { name: 'Islamic Gallery', path: '/gallery' }
              ]
            },
            {
              title: "Platform",
              links: [
                { name: 'Rabi-ul-Awwal Events', path: '/events' },
                { name: 'Saved Bookmarks', path: '/bookmarks' },
                { name: 'Admin Dashboard', path: '/admin/login' }
              ]
            }
          ].map((column, idx) => (
            <div key={idx} className="space-y-6 relative">
              <h4 className="text-islamic-gold text-xs uppercase tracking-[0.2em] font-serif font-bold flex items-center gap-2">
                <div className="w-4 h-[1px] bg-islamic-gold/50" />
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link to={link.path} className="group flex items-center text-islamic-cream/70 hover:text-islamic-gold transition-colors duration-300">
                      <span className="text-[14px] font-bold group-hover:translate-x-1.5 transition-transform duration-300">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Tribute & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left rtl:md:text-right">
          <div className="p-4 rounded-2xl glass-card border-islamic-gold/20 flex-1 max-w-2xl">
            <p className="font-serif italic text-[13px] text-islamic-cream/80 leading-relaxed">
              "May the mercy, character and teachings of the Messenger ﷺ continue to inspire hearts and transform lives."
            </p>
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse bg-islamic-gold/10 border border-islamic-gold/20 px-5 py-2.5 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <span className="font-sans text-xs font-medium text-islamic-cream/80 uppercase tracking-widest">Devoted to</span>
            <span className="font-arabic font-bold text-lg text-islamic-gold ml-1">نورِ محمد ﷺ</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
