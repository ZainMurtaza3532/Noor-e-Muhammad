import { useState } from 'react';
import { RotateCcw, Volume2, VolumeX, Award } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const PRESETS = [
  { name: 'SubhanAllah', arabic: 'سُبْحَانَ اللَّهِ', target: 33 },
  { name: 'Alhamdulillah', arabic: 'الْحَمْدُ لِلَّهِ', target: 33 },
  { name: 'Allahu Akbar', arabic: 'اللَّهُ أَكْبَرُ', target: 34 },
  { name: 'Astaghfirullah', arabic: 'أَسْتَغْفِرُ اللَّهَ', target: 100 },
  { name: 'Salawat Shareef', arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ', target: 100 },
];

export const TasbeehCounter = () => {
  const { tasbeehCount, incrementTasbeeh, decrementTasbeeh, resetTasbeeh } = useAppStore();
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const preset = PRESETS[selectedPreset];

  const handleClick = () => {
    incrementTasbeeh();

    if (soundEnabled && window.navigator.vibrate) {
      window.navigator.vibrate(40);
    }
  };

  const progressPercent = Math.min(100, Math.round((tasbeehCount / preset.target) * 100));

  return (
    <div className="w-full max-w-md mx-auto glass-card-premium p-6 rounded-[2.5rem] border border-islamic-gold/40 shadow-[0_20px_50px_rgba(0,0,0,0.4)] text-center space-y-6 relative group overflow-hidden">
      {/* Background ambient glow inside card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-islamic-gold/10 rounded-full blur-[60px] pointer-events-none" />
      
      {/* Preset Selector Tabs */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2 scrollbar-none">
        {PRESETS.map((p, idx) => (
          <button
            key={p.name}
            onClick={() => {
              setSelectedPreset(idx);
              resetTasbeeh();
            }}
            className={`px-3 py-1.5 rounded-xl text-[12px] font-serif font-bold whitespace-nowrap transition-all duration-300 ${
              selectedPreset === idx 
                ? 'btn-premium'
                : 'bg-islamic-deep/50 backdrop-blur-md text-islamic-cream/80 hover:text-islamic-gold border border-islamic-gold/30 shadow-[0_4px_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Preset Arabic Title */}
      <div className="space-y-1">
        <h3 className="font-arabic text-3xl font-bold text-islamic-gold drop-shadow-md">
          {preset.arabic}
        </h3>
        <p className="text-xs text-islamic-cream/60 font-serif">
          Target Goal: <span className="text-islamic-gold font-bold">{preset.target}</span> Recitations
        </p>
      </div>

      {/* Progress Ring & Clicker Button */}
      <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
        {/* SVG Progress Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="84"
            className="stroke-islamic-primary/60"
            strokeWidth="10"
            fill="transparent"
          />
          <circle
            cx="96"
            cy="96"
            r="84"
            className="stroke-islamic-gold transition-all duration-300"
            strokeWidth="10"
            strokeDasharray={527}
            strokeDashoffset={527 - (527 * progressPercent) / 100}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center Clickable Disc */}
        <button
          onClick={handleClick}
          className="absolute inset-4 rounded-full bg-gradient-to-br from-[#063B2E] via-[#021C16] to-[#087A5B] border-[3px] border-islamic-gold/60 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:shadow-[0_0_50px_rgba(212,175,55,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 group-active:border-islamic-gold"
        >
          {/* Inner Light Reflection */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
          
          <span className="font-serif text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-islamic-goldLight via-islamic-gold to-yellow-600 drop-shadow-lg z-10">
            {tasbeehCount}
          </span>
          <span className="text-[10px] text-islamic-gold/60 uppercase tracking-widest mt-1 z-10">
            Tap to Count
          </span>
        </button>
      </div>

      {/* Action Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-islamic-gold/20">
        <button
          onClick={decrementTasbeeh}
          className="px-3 py-1.5 rounded-xl bg-islamic-primary/60 hover:bg-islamic-primary text-islamic-cream/80 text-xs font-serif border border-islamic-gold/20"
        >
          - 1
        </button>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-2 rounded-xl bg-islamic-primary/60 text-islamic-gold border border-islamic-gold/20"
          title="Toggle Feedback"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        <button
          onClick={resetTasbeeh}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30 text-xs font-serif"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Completion Milestone */}
      {tasbeehCount >= preset.target && (
        <div className="p-3 rounded-2xl bg-islamic-gold/20 border border-islamic-gold/40 text-islamic-gold text-xs font-serif flex items-center justify-center gap-2 animate-bounce">
          <Award className="w-4 h-4 text-islamic-gold" />
          <span>MashaAllah! Target Goal of {preset.target} Completed!</span>
        </div>
      )}
    </div>
  );
};
