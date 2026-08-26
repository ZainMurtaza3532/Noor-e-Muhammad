import React from 'react';

export const CardSkeleton = () => (
  <div className="glass-card p-6 rounded-3xl border border-islamic-gold/10 animate-pulse">
    <div className="w-1/3 h-4 bg-islamic-primary/30 rounded-full mb-4"></div>
    <div className="w-3/4 h-6 bg-islamic-primary/30 rounded-full mb-2"></div>
    <div className="w-full h-24 bg-islamic-primary/30 rounded-xl mt-4"></div>
    <div className="w-1/4 h-4 bg-islamic-primary/30 rounded-full mt-4"></div>
  </div>
);

export const ListSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex items-center space-x-4 p-4 glass-card rounded-2xl animate-pulse">
        <div className="w-12 h-12 rounded-full bg-islamic-primary/30 shrink-0"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-islamic-primary/30 rounded-full w-1/3"></div>
          <div className="h-3 bg-islamic-primary/30 rounded-full w-2/3"></div>
        </div>
      </div>
    ))}
  </div>
);
