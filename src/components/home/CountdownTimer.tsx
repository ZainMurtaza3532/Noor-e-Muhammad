import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAppStore } from '../../store/useAppStore';
import { ISLAMIC_CONFIG } from '../../config/islamicConfig';

export const CountdownTimer: React.FC = () => {
  const { siteSettings } = useAppStore();
  const targetDateStr = ISLAMIC_CONFIG.targetDate;

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isArrived: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      // Islamic dates start at Maghrib (sunset) the evening before the Gregorian date.
      // We assume an approximate Maghrib time of 18:30 (6:30 PM). 
      // Subtracting 5.5 hours (5 hours 30 mins) from midnight (00:00).
      const maghribOffsetMs = 5.5 * 60 * 60 * 1000;
      const target = new Date(targetDateStr).getTime() - maghribOffsetMs;
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isArrived: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isArrived: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F1D98B', '#087A5B', '#FFFFFF'],
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 sm:p-8 glass-card rounded-3xl border border-islamic-gold/40 shadow-gold-glow relative overflow-hidden">
      
      {/* Background Star Particles Accent */}
      <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
        <span className="font-arabic text-6xl text-islamic-gold">ﷺ</span>
      </div>

      <div className="text-center relative z-10 space-y-4">
        
        {/* Badge & Title */}
        <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-4 py-1.5 rounded-full bg-islamic-gold/15 border border-islamic-gold/40 text-islamic-gold text-xs font-serif font-bold uppercase tracking-wider">
          <Calendar className="w-4 h-4 text-islamic-gold" />
          <span>{timeLeft.isArrived ? 'Blessed Day' : '12 Rabi-ul-Awwal Mubarak Countdown'}</span>
        </div>

        {timeLeft.isArrived ? (
          <div className="py-8 sm:py-12 flex flex-col items-center justify-center space-y-6 animate-fade-in">
            <span className="text-6xl sm:text-8xl drop-shadow-2xl">🕌</span>
            <h2 className="font-arabic text-4xl sm:text-6xl text-islamic-gold drop-shadow-lg font-bold">
              عِيد مِيلَادُ النَّبِيِّ ﷺ
            </h2>
            <p className="font-serif text-2xl sm:text-4xl text-islamic-cream font-bold">
              Today is 12 Rabi-ul-Awwal!
            </p>
            <p className="text-sm sm:text-lg text-islamic-cream/80 max-w-xl mx-auto leading-relaxed">
              May the blessings of this holy day fill your heart with peace, joy, and endless mercy. Let us send abundant Salawat upon our beloved Prophet Muhammad ﷺ.
            </p>
            <button
              onClick={triggerCelebration}
              className="mt-6 px-8 py-3.5 rounded-full btn-premium flex items-center gap-2 text-sm sm:text-base font-bold shadow-gold-glow hover:-translate-y-1 transition-transform"
            >
              <Sparkles className="w-5 h-5" />
              <span>Celebrate & Send Salawat</span>
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-gold-gradient">
              Countdown to 12 Rabi-ul-Awwal
            </h3>

            {/* Countdown Grid */}
            <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-2xl mx-auto pt-2">
              
              <div className="p-3 sm:p-5 rounded-2xl bg-islamic-deep/80 border border-islamic-gold/30 shadow-inner flex flex-col items-center hover:scale-105 hover:border-islamic-gold/60 transition-transform duration-300">
                <span className="font-serif text-2xl sm:text-4xl font-extrabold text-islamic-gold">
                  {timeLeft.days}
                </span>
                <span className="text-[10px] sm:text-xs font-serif uppercase tracking-widest text-islamic-cream/70 mt-1">
                  Days
                </span>
              </div>

              <div className="p-3 sm:p-5 rounded-2xl bg-islamic-deep/80 border border-islamic-gold/30 shadow-inner flex flex-col items-center hover:scale-105 hover:border-islamic-gold/60 transition-transform duration-300">
                <span className="font-serif text-2xl sm:text-4xl font-extrabold text-islamic-gold">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-serif uppercase tracking-widest text-islamic-cream/70 mt-1">
                  Hours
                </span>
              </div>

              <div className="p-3 sm:p-5 rounded-2xl bg-islamic-deep/80 border border-islamic-gold/30 shadow-inner flex flex-col items-center hover:scale-105 hover:border-islamic-gold/60 transition-transform duration-300">
                <span className="font-serif text-2xl sm:text-4xl font-extrabold text-islamic-gold">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-serif uppercase tracking-widest text-islamic-cream/70 mt-1">
                  Minutes
                </span>
              </div>

              <div className="p-3 sm:p-5 rounded-2xl bg-islamic-deep/80 border border-islamic-gold/30 shadow-inner flex flex-col items-center hover:scale-105 hover:border-islamic-gold/60 transition-transform duration-300">
                <span className="font-serif text-2xl sm:text-4xl font-extrabold text-islamic-gold animate-pulse">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-serif uppercase tracking-widest text-islamic-cream/70 mt-1">
                  Seconds
                </span>
              </div>
            </div>

            {/* Date Meta & Celebration Button */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-islamic-gold/15 text-xs text-islamic-cream/70 font-serif text-left">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Clock className="w-3.5 h-3.5 text-islamic-gold" />
                  <span>Target: 12 Rabi-ul-Awwal 1448 AH</span>
                </div>
                <span className="text-[10px] text-islamic-cream/50 italic ml-5">
                  * Note: The Islamic date begins at Maghrib (sunset) the evening before the Gregorian date.
                </span>
              </div>
              <button
                onClick={triggerCelebration}
                className="flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1 rounded-lg bg-islamic-gold/20 hover:bg-islamic-gold/30 text-islamic-gold border border-islamic-gold/30 transition-all text-xs font-medium"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Send Salawat Blessings</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
