import React from 'react';
import { Heart, RotateCcw, Share2, Sparkles } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const SalawatCounter: React.FC = () => {
  const { salawatCount, incrementSalawat, resetSalawat } = useAppStore();

  const handleShare = () => {
    const text = `I have sent ${salawatCount} Salawat upon Prophet Muhammad ﷺ today on Noor-e-Muhammad platform! 🌙\n\n"اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ عَلَى نَبِيِّنَا مُحَمَّدٍ ﷺ"`;
    if (navigator.share) {
      navigator.share({ title: 'Salawat Milestone', text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert('Salawat achievement copied to clipboard!');
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 sm:p-8 glass-card rounded-3xl border border-islamic-gold/40 shadow-gold-glow text-center space-y-6">
      
      <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-4 py-1 rounded-full bg-islamic-gold/15 border border-islamic-gold/40 text-islamic-gold text-xs font-serif font-bold uppercase">
        <Sparkles className="w-3.5 h-3.5 text-islamic-gold" />
        <span>Send Salawat ﷺ</span>
      </div>

      <div className="space-y-2">
        <h3 className="font-arabic text-3xl sm:text-4xl text-gold-gradient font-bold drop-shadow">
          اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ عَلَى نَبِيِّنَا مُحَمَّدٍ ﷺ
        </h3>
        <p className="text-xs text-islamic-cream/80 font-serif italic max-w-md mx-auto">
          "Whoever sends one blessing upon me, Allah will send ten blessings upon him." — Sahih Muslim 408
        </p>
      </div>

      {/* Interactive Salawat Heart Button */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <button
          onClick={incrementSalawat}
          className="relative w-36 h-36 rounded-full bg-gradient-to-br from-islamic-gold via-yellow-600 to-islamic-emerald p-1 shadow-gold-glow hover:scale-105 active:scale-95 transition-transform group"
        >
          <div className="w-full h-full rounded-full bg-islamic-deep flex flex-col items-center justify-center space-y-1">
            <Heart className="w-8 h-8 text-islamic-gold group-hover:scale-125 transition-transform fill-islamic-gold" />
            <span className="font-serif text-3xl font-extrabold text-islamic-gold">
              {salawatCount}
            </span>
            <span className="text-[9px] uppercase tracking-widest text-islamic-cream/70 font-serif">
              Tap Salawat
            </span>
          </div>
        </button>
      </div>

      {/* Controls & Milestone Share */}
      <div className="flex items-center justify-between pt-4 border-t border-islamic-gold/20 text-xs font-serif">
        <button
          onClick={resetSalawat}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-islamic-primary/60 hover:bg-islamic-primary text-islamic-cream/80 border border-islamic-gold/20"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Counter</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-islamic-gold/20 hover:bg-islamic-gold/30 text-islamic-gold border border-islamic-gold/40 font-bold"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Achievement</span>
        </button>
      </div>
    </div>
  );
};
