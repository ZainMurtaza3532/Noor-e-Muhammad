import React, { useState } from 'react';
import { 
  BookOpen, 
  Heart, 
  Sparkles, 
  Video, 
  Calendar, 
  Image as ImageIcon, 
  Plus, 
  CheckCircle, 
  Eye, 
  TrendingUp 
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { YouTubeModal } from '../components/YouTubeModal';

export const AdminDashboard: React.FC = () => {
  const { hadiths, duas, sunnahs, seerah, naats, bayans, videos, gallery, events } = useAppStore();
  const [isYouTubeModalOpen, setIsYouTubeModalOpen] = useState(false);

  const stats = [
    { label: 'Total Ahadith', count: hadiths.length, icon: <BookOpen className="w-5 h-5 text-islamic-gold" />, color: 'from-amber-900/40 to-islamic-primary/60' },
    { label: 'Total Duas', count: duas.length, icon: <Heart className="w-5 h-5 text-rose-400" />, color: 'from-rose-950/40 to-islamic-primary/60' },
    { label: 'Total Sunnahs', count: sunnahs.length, icon: <Sparkles className="w-5 h-5 text-emerald-400" />, color: 'from-emerald-950/40 to-islamic-primary/60' },
    { label: 'Seerah Timeline', count: seerah.length, icon: <BookOpen className="w-5 h-5 text-sky-400" />, color: 'from-sky-950/40 to-islamic-primary/60' },
    { label: 'YouTube Naats', count: naats.length, icon: <Video className="w-5 h-5 text-islamic-gold" />, color: 'from-amber-900/40 to-islamic-primary/60' },
    { label: 'YouTube Bayans', count: bayans.length, icon: <Video className="w-5 h-5 text-purple-400" />, color: 'from-purple-950/40 to-islamic-primary/60' },
    { label: 'Gallery Images', count: gallery.length, icon: <ImageIcon className="w-5 h-5 text-teal-400" />, color: 'from-teal-950/40 to-islamic-primary/60' },
    { label: 'Upcoming Events', count: events.length, icon: <Calendar className="w-5 h-5 text-gold-400" />, color: 'from-islamic-gold/20 to-islamic-primary/60' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 glass-card rounded-3xl border border-islamic-gold/30">
        <div>
          <h1 className="font-serif text-2xl font-bold text-gold-gradient">Admin CMS Dashboard Overview</h1>
          <p className="text-xs text-islamic-cream/70 font-serif mt-1">Manage website content without editing code</p>
        </div>

        <button
          onClick={() => setIsYouTubeModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-islamic-gold text-islamic-deep font-serif font-bold text-xs shadow-gold-glow hover:scale-105 transition-transform flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add YouTube Video / Naat</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <div key={idx} className={`p-5 rounded-2xl bg-gradient-to-br ${s.color} border border-islamic-gold/25 space-y-2 shadow-lg`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif font-semibold text-islamic-cream/80">{s.label}</span>
              {s.icon}
            </div>
            <span className="font-serif text-3xl font-extrabold text-gold-gradient block">
              {s.count}
            </span>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
              <CheckCircle className="w-3 h-3" /> Live & Published
            </span>
          </div>
        ))}
      </div>

      {/* Overview Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Most Viewed Content */}
        <div className="p-6 glass-card rounded-3xl border border-islamic-gold/30 space-y-4">
          <div className="flex items-center justify-between border-b border-islamic-gold/20 pb-3">
            <h3 className="font-serif text-base font-bold text-islamic-gold flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Content Engagement Analytics
            </h3>
            <span className="text-[10px] text-islamic-cream/60 uppercase">Real-time</span>
          </div>

          <div className="space-y-3 text-xs font-serif">
            <div className="flex items-center justify-between p-3 rounded-xl bg-islamic-primary/40 border border-islamic-gold/15">
              <span>Hadith of the Day (Musnad Ahmad 8952)</span>
              <span className="text-islamic-gold font-bold">1,420 views</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-islamic-primary/40 border border-islamic-gold/15">
              <span>Faslon Ko Takalluf Hai Humse Agar (Naat)</span>
              <span className="text-islamic-gold font-bold">2,150 clicks</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-islamic-primary/40 border border-islamic-gold/15">
              <span>30-Day Sunnah Challenge Active Users</span>
              <span className="text-islamic-gold font-bold">840 participants</span>
            </div>
          </div>
        </div>

        {/* Quick CMS Management Shortcuts */}
        <div className="p-6 glass-card rounded-3xl border border-islamic-gold/30 space-y-4">
          <h3 className="font-serif text-base font-bold text-islamic-gold border-b border-islamic-gold/20 pb-3">
            Quick Content Shortcuts
          </h3>

          <div className="grid grid-cols-2 gap-3 text-xs font-serif">
            <button
              onClick={() => setIsYouTubeModalOpen(true)}
              className="p-3 rounded-xl bg-islamic-gold/15 hover:bg-islamic-gold/25 border border-islamic-gold/30 text-islamic-gold text-left rtl:text-right font-bold"
            >
              + Import YouTube Naat
            </button>
            <button
              onClick={() => setIsYouTubeModalOpen(true)}
              className="p-3 rounded-xl bg-islamic-gold/15 hover:bg-islamic-gold/25 border border-islamic-gold/30 text-islamic-gold text-left rtl:text-right font-bold"
            >
              + Import YouTube Bayan
            </button>
          </div>
        </div>

      </div>

      <YouTubeModal
        isOpen={isYouTubeModalOpen}
        onClose={() => setIsYouTubeModalOpen(false)}
      />
    </div>
  );
};
