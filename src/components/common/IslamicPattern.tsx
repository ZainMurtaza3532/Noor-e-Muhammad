import React from 'react';

interface IslamicPatternProps {
  className?: string;
  opacity?: number;
}

export const IslamicPattern: React.FC<IslamicPatternProps> = ({ className = '', opacity }) => {
  return (
    <div 
      className={`flex items-center justify-center my-6 ${className}`}
      style={{ opacity: opacity !== undefined ? opacity : 0.8 }}
    >
      <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-islamic-gold to-transparent"></div>
      <div className="mx-3 text-islamic-gold text-xs tracking-widest font-serif flex items-center gap-2">
        <span className="inline-block w-2 h-2 rotate-45 border border-islamic-gold"></span>
        <span className="inline-block w-1.5 h-1.5 rotate-45 bg-islamic-gold"></span>
        <span className="inline-block w-2 h-2 rotate-45 border border-islamic-gold"></span>
      </div>
      <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-islamic-gold to-transparent"></div>
    </div>
  );
};
