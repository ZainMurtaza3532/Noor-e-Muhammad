import React, { useState } from 'react';
import { Save, Check } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const AdminSettings: React.FC = () => {
  const { siteSettings, updateSiteSettings } = useAppStore();
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    siteTitle: siteSettings.siteTitle,
    subtitle: siteSettings.subtitle,
    rabiUlAwwalTargetDate: siteSettings.rabiUlAwwalTargetDate,
    announcementBanner: siteSettings.announcementBanner || '',
    showBanner: siteSettings.showBanner,
    contactEmail: siteSettings.contactEmail,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-serif text-2xl font-bold text-gold-gradient">Global Site Configuration</h1>
        <p className="text-xs text-islamic-cream/70 font-serif">Modify countdown dates, site title, and announcement banners live</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 glass-card rounded-3xl border border-islamic-gold/40 space-y-6 text-xs font-serif shadow-2xl">
        
        {/* Site Title & Subtitle */}
        <div className="space-y-4">
          <h3 className="font-serif text-sm font-bold text-islamic-gold uppercase border-b border-islamic-gold/20 pb-2">Branding</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-islamic-gold mb-1 font-semibold">Website Title</label>
              <input
                type="text"
                value={form.siteTitle}
                onChange={(e) => setForm({ ...form, siteTitle: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-islamic-gold mb-1 font-semibold">Subtitle</label>
              <input
                type="text"
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 12 Rabi-ul-Awwal Target Date (Moon Sighting Config) */}
        <div className="space-y-4">
          <h3 className="font-serif text-sm font-bold text-islamic-gold uppercase border-b border-islamic-gold/20 pb-2">12 Rabi-ul-Awwal Countdown Target</h3>
          
          <div>
            <label className="block text-islamic-gold mb-1 font-semibold">Target Date & Time (ISO String)</label>
            <input
              type="datetime-local"
              value={form.rabiUlAwwalTargetDate.slice(0, 16)}
              onChange={(e) => setForm({ ...form, rabiUlAwwalTargetDate: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none font-mono text-sm"
            />
            <p className="text-[10px] text-islamic-cream/60 mt-1">
              Adjust this target date based on official regional moon sighting announcements.
            </p>
          </div>
        </div>

        {/* Announcement Banner */}
        <div className="space-y-4">
          <h3 className="font-serif text-sm font-bold text-islamic-gold uppercase border-b border-islamic-gold/20 pb-2">Announcement Banner</h3>
          
          <div>
            <label className="block text-islamic-gold mb-1 font-semibold">Banner Message</label>
            <input
              type="text"
              value={form.announcementBanner}
              onChange={(e) => setForm({ ...form, announcementBanner: e.target.value })}
              placeholder="🌙 Welcome to Noor-e-Muhammad platform..."
              className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.showBanner}
              onChange={(e) => setForm({ ...form, showBanner: e.target.checked })}
              className="accent-islamic-gold"
            />
            <span>Enable Banner Bar across top of site</span>
          </label>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-islamic-gold/20 flex items-center justify-between">
          <span className="text-xs text-emerald-400 font-semibold">{saved && '✓ Settings saved live!'}</span>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-islamic-gold text-islamic-deep font-bold shadow-gold-glow flex items-center gap-2"
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'Saved!' : 'Save Site Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
