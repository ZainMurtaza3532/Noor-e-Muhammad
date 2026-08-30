import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Send, MapPin, Mail, Phone, Globe, Share2, Video, MessageCircle } from 'lucide-react';
import { IslamicPattern } from './IslamicPattern';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-islamic-deep text-islamic-cream overflow-hidden font-sans border-t border-islamic-gold/20">
      
      {/* Background Ambient */}
      <IslamicPattern className="absolute inset-0 opacity-[0.03] pointer-events-none" />

      {/* Top Newsletter / Join Section */}
      <div className="bg-white/5 border-b border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white mb-2">Join Our Islamic Community</h3>
            <p className="text-gray-400 text-sm">Stay updated with the latest Bayans, articles, and features.</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input 
              type="email" 
              placeholder="Enter your email address..." 
              className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:border-islamic-gold w-full md:w-80"
            />
            <button className="bg-islamic-gold hover:bg-yellow-500 text-islamic-deep font-bold px-6 py-3 rounded-full transition-colors flex items-center gap-2">
              <Send className="w-4 h-4" /> Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 pb-12">
        
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-islamic-gold rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <BookOpen className="w-6 h-6 text-islamic-deep" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl tracking-wide text-white">Noor-e-Muhammad</span>
                <span className="font-sans text-[10px] tracking-widest text-islamic-gold uppercase font-bold">Islamic Library</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your authentic digital platform for the Holy Quran, authentic Ahadith, the beautiful Seerah, and daily Islamic tools.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-islamic-gold hover:text-islamic-deep transition-all text-gray-400">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-islamic-gold hover:text-islamic-deep transition-all text-gray-400">
                <Video className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-islamic-gold hover:text-islamic-deep transition-all text-gray-400">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-islamic-gold hover:text-islamic-deep transition-all text-gray-400">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white text-sm uppercase tracking-widest font-sans font-bold">Explore</h4>
            <ul className="space-y-3">
              <li><Link to="/quran" className="text-gray-400 hover:text-islamic-gold text-sm transition-colors block">Holy Quran</Link></li>
              <li><Link to="/ahadith" className="text-gray-400 hover:text-islamic-gold text-sm transition-colors block">Ahadith Collection</Link></li>
              <li><Link to="/timeline" className="text-gray-400 hover:text-islamic-gold text-sm transition-colors block">Seerah Timeline</Link></li>
              <li><Link to="/videos" className="text-gray-400 hover:text-islamic-gold text-sm transition-colors block">Islamic Videos</Link></li>
              <li><Link to="/live-tv" className="text-gray-400 hover:text-islamic-gold text-sm transition-colors block">Live Madani Channel</Link></li>
            </ul>
          </div>

          {/* Tools & Resources */}
          <div className="space-y-6">
            <h4 className="text-white text-sm uppercase tracking-widest font-sans font-bold">Tools & Pages</h4>
            <ul className="space-y-3">
              <li><Link to="/prayer-times" className="text-gray-400 hover:text-islamic-gold text-sm transition-colors block">Prayer Times (Namaz)</Link></li>
              <li><Link to="/tools" className="text-gray-400 hover:text-islamic-gold text-sm transition-colors block">Digital Tasbeeh</Link></li>
              <li><Link to="/duas" className="text-gray-400 hover:text-islamic-gold text-sm transition-colors block">Masnoon Duas</Link></li>
              <li><Link to="/bookmarks" className="text-gray-400 hover:text-islamic-gold text-sm transition-colors block">My Bookmarks</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-islamic-gold text-sm transition-colors block">About Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-white text-sm uppercase tracking-widest font-sans font-bold">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-5 h-5 text-islamic-gold shrink-0" />
                <span>Faizan-e-Madina, Global Islamic Center</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-5 h-5 text-islamic-gold shrink-0" />
                <span>+92 111 222 333</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-5 h-5 text-islamic-gold shrink-0" />
                <span>info@nooremuhammad.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Noor-e-Muhammad. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
};
