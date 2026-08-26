import React from 'react';

interface IslamicPatternProps {
  className?: string;
}

export const IslamicPattern: React.FC<IslamicPatternProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center my-6 opacity-60 ${className}`}>
      <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-islamic-gold/50 to-transparent"></div>
      <div className="mx-3 text-islamic-gold text-xs tracking-widest font-serif flex items-center gap-1.5">
        <span className="inline-block w-1.5 h-1.5 rotate-45 bg-islamic-gold"></span>
        <span>❖</span>
        <span className="font-arabic text-sm text-islamic-goldLight">ﷺ</span>
        <span>❖</span>
        <span className="inline-block w-1.5 h-1.5 rotate-45 bg-islamic-gold"></span>
      </div>
      <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-islamic-gold/50 to-transparent"></div>
    </div>
  );
};
