import React, { useState } from 'react';
import { Compass, Clock, Calendar, Calculator, Heart, Sparkles } from 'lucide-react';
import { TasbeehCounter } from '../components/tools/TasbeehCounter';
import { SalawatCounter } from '../components/tools/SalawatCounter';
import { PrayerTimesWidget } from '../components/tools/PrayerTimesWidget';
import { QiblaCompass } from '../components/tools/QiblaCompass';
import { HijriCalendarWidget } from '../components/tools/HijriCalendarWidget';
import { ZakatCalculator } from '../components/tools/ZakatCalculator';
import { IslamicPattern } from '../components/common/IslamicPattern';

export const ToolsPage: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'tasbeeh' | 'salawat' | 'prayer' | 'qibla' | 'calendar' | 'zakat'>('tasbeeh');

  return (
    <div className="min-h-screen bg-islamic-deep text-islamic-cream pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="font-serif text-xs font-bold text-islamic-gold uppercase tracking-widest">Digital Companion</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-gold-gradient">الأَدَوَاتُ الإِسْلَامِيَّةُ - Islamic Tools</h1>
          <p className="font-sans text-sm text-islamic-cream/80 max-w-2xl mx-auto">
            Digital Tasbeeh clicker, Salawat counter, Prayer times schedule, Qibla compass, Hijri date converter, and Zakat calculator.
          </p>
          <IslamicPattern />
        </div>

        {/* Tools Navigation Bar */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveTool('tasbeeh')}
            className={`px-4 py-2.5 rounded-xl font-serif text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTool === 'tasbeeh' ? 'bg-islamic-gold text-islamic-deep shadow-gold-glow' : 'bg-islamic-primary/40 text-islamic-cream/80 border border-islamic-gold/15'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Digital Tasbeeh</span>
          </button>

          <button
            onClick={() => setActiveTool('salawat')}
            className={`px-4 py-2.5 rounded-xl font-serif text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTool === 'salawat' ? 'bg-islamic-gold text-islamic-deep shadow-gold-glow' : 'bg-islamic-primary/40 text-islamic-cream/80 border border-islamic-gold/15'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Salawat Counter</span>
          </button>

          <button
            onClick={() => setActiveTool('prayer')}
            className={`px-4 py-2.5 rounded-xl font-serif text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTool === 'prayer' ? 'bg-islamic-gold text-islamic-deep shadow-gold-glow' : 'bg-islamic-primary/40 text-islamic-cream/80 border border-islamic-gold/15'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Prayer Times</span>
          </button>

          <button
            onClick={() => setActiveTool('qibla')}
            className={`px-4 py-2.5 rounded-xl font-serif text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTool === 'qibla' ? 'bg-islamic-gold text-islamic-deep shadow-gold-glow' : 'bg-islamic-primary/40 text-islamic-cream/80 border border-islamic-gold/15'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Qibla Compass</span>
          </button>

          <button
            onClick={() => setActiveTool('calendar')}
            className={`px-4 py-2.5 rounded-xl font-serif text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTool === 'calendar' ? 'bg-islamic-gold text-islamic-deep shadow-gold-glow' : 'bg-islamic-primary/40 text-islamic-cream/80 border border-islamic-gold/15'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Hijri Calendar</span>
          </button>

          <button
            onClick={() => setActiveTool('zakat')}
            className={`px-4 py-2.5 rounded-xl font-serif text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTool === 'zakat' ? 'bg-islamic-gold text-islamic-deep shadow-gold-glow' : 'bg-islamic-primary/40 text-islamic-cream/80 border border-islamic-gold/15'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Zakat Calculator</span>
          </button>
        </div>

        {/* Selected Tool Display */}
        <div className="pt-4 animate-fadeIn">
          {activeTool === 'tasbeeh' && <TasbeehCounter />}
          {activeTool === 'salawat' && <SalawatCounter />}
          {activeTool === 'prayer' && <PrayerTimesWidget />}
          {activeTool === 'qibla' && <QiblaCompass />}
          {activeTool === 'calendar' && <HijriCalendarWidget />}
          {activeTool === 'zakat' && <ZakatCalculator />}
        </div>
      </div>
    </div>
  );
};
