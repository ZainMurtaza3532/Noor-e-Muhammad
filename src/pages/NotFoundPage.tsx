import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';
import { IslamicPattern } from '../components/common/IslamicPattern';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-islamic-deep text-islamic-cream flex items-center justify-center p-4">
      <div className="max-w-md w-full p-8 glass-card rounded-3xl border border-islamic-gold/40 shadow-2xl text-center space-y-6">
        
        <div className="w-16 h-16 rounded-full bg-islamic-gold/20 text-islamic-gold border border-islamic-gold/40 flex items-center justify-center mx-auto shadow-gold-glow">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-arabic text-4xl text-islamic-gold font-bold block">٤٠٤</span>
          <h1 className="font-serif text-2xl font-bold text-gold-gradient">Page Not Found</h1>
          <p className="text-xs text-islamic-cream/70 font-serif leading-relaxed">
            The page or content resource you are looking for is not found or has been moved.
          </p>
        </div>

        <IslamicPattern />

        <Link
          to="/"
          className="inline-flex items-center space-x-2 rtl:space-x-reverse px-6 py-3 rounded-2xl bg-islamic-gold text-islamic-deep font-serif font-bold text-sm shadow-gold-glow hover:scale-105 transition-transform"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
};
