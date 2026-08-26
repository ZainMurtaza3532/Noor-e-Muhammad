import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const HijriCalendarWidget: React.FC = () => {
  const [hijriDateEnglish, setHijriDateEnglish] = useState('');
  const [hijriDateArabic, setHijriDateArabic] = useState('');

  useEffect(() => {
    const today = new Date();
    
    // Format in English (e.g., 9 Safar 1448 AH)
    const enFormatter = new Intl.DateTimeFormat('en-US-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    setHijriDateEnglish(enFormatter.format(today) + ' AH');

    // Format in Arabic
    const arFormatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    setHijriDateArabic(arFormatter.format(today));
  }, []);

  const hijriEvents = [
    { day: 1, event: '1st Rabi-ul-Awwal 1448 AH', highlight: false },
    { day: 12, event: '12th Rabi-ul-Awwal — Milad-un-Nabi ﷺ', highlight: true },
    { day: 17, event: '17th Rabi-ul-Awwal Mubarak', highlight: false },
    { day: 27, event: '27th Rabi-ul-Awwal', highlight: false },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto p-8 glass-card rounded-[2.5rem] border border-islamic-gold/40 shadow-2xl text-islamic-cream space-y-8 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-islamic-gold/5 rounded-bl-full pointer-events-none" />

      <div className="flex items-center justify-between border-b border-islamic-gold/20 pb-6 relative z-10">
        <div className="space-y-1">
          <span className="text-[10px] font-serif uppercase tracking-widest text-islamic-gold">Today's Islamic Date</span>
          <h3 className="font-arabic text-3xl font-bold text-gold-gradient py-1">
            {hijriDateArabic || 'ربيع الأول ١٤٤٨ هـ'}
          </h3>
          <p className="text-sm text-islamic-cream/80 font-serif font-medium">
            {hijriDateEnglish || 'Rabi-ul-Awwal 1448 AH'}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-islamic-gold/10 text-islamic-gold border border-islamic-gold/30 shadow-gold-glow">
          <CalendarIcon className="w-8 h-8" />
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        <h4 className="font-serif text-xs font-semibold text-islamic-gold uppercase tracking-[0.2em]">Upcoming Significant Dates</h4>
        <div className="space-y-3">
          {hijriEvents.map((e) => (
            <div
              key={e.day}
              className={`p-4 rounded-2xl border flex items-center justify-between text-sm font-serif transition-all ${
                e.highlight
                  ? 'bg-islamic-gold/20 border-islamic-gold text-islamic-gold shadow-[0_0_15px_rgba(212,175,55,0.3)] font-bold scale-[1.02]'
                  : 'bg-islamic-primary/30 border-islamic-gold/15 text-islamic-cream/90 hover:bg-islamic-primary/50'
              }`}
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                {e.highlight && <Sparkles className="w-4 h-4 text-islamic-gold animate-pulse" />}
                <span>{e.event}</span>
              </div>
              <span className="px-3 py-1 rounded-lg bg-islamic-deep/80 border border-islamic-gold/30 text-[11px] whitespace-nowrap">
                {e.day} Rabi-ul-Awwal
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
