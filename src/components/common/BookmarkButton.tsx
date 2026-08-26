import React from 'react';
import { Bookmark } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

interface BookmarkButtonProps {
  id: string;
  className?: string;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({ id, className = '' }) => {
  const { isBookmarked, toggleBookmark } = useAppStore();
  const bookmarked = isBookmarked(id);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleBookmark(id);
      }}
      className={`p-2 rounded-full transition-all duration-200 ${
        bookmarked 
          ? 'bg-islamic-gold/20 text-islamic-gold border border-islamic-gold/50 shadow-gold-glow' 
          : 'bg-islamic-deep/60 text-islamic-cream/60 hover:text-islamic-gold hover:bg-islamic-primary/60 border border-islamic-gold/10'
      } ${className}`}
      title={bookmarked ? 'Remove Bookmark' : 'Save Bookmark'}
      aria-label="Bookmark item"
    >
      <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-islamic-gold' : ''}`} />
    </button>
  );
};
