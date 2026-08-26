import React, { useState } from 'react';
import { X, Copy, Check, Share2 } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text: string;
  url?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  text,
  url = window.location.href,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareData = `${title}\n\n"${text}"\n\nRead more at Noor-e-Muhammad ﷺ: ${url}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareData)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md p-6 glass-card rounded-2xl border border-islamic-gold/40 shadow-2xl text-islamic-cream">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-islamic-cream/60 hover:text-islamic-gold transition-colors rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
          <div className="p-2.5 rounded-xl bg-islamic-gold/20 text-islamic-gold border border-islamic-gold/30">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg text-islamic-gold font-bold">Share Content</h3>
            <p className="text-xs text-islamic-cream/70">Spread the blessings & knowledge</p>
          </div>
        </div>

        <div className="p-3 mb-5 bg-islamic-deep/80 rounded-xl border border-islamic-gold/10 text-xs leading-relaxed text-islamic-cream/90 italic max-h-32 overflow-y-auto">
          "{text}"
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 rtl:space-x-reverse p-3 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-300 transition-all"
          >
            <span className="font-medium text-xs">WhatsApp</span>
          </a>

          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 rtl:space-x-reverse p-3 rounded-xl bg-sky-600/30 hover:bg-sky-600/50 border border-sky-500/40 text-sky-300 transition-all"
          >
            <span className="font-medium text-xs">Telegram</span>
          </a>

          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 rtl:space-x-reverse p-3 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-300 transition-all"
          >
            <span className="font-medium text-xs">Facebook</span>
          </a>

          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 rtl:space-x-reverse p-3 rounded-xl bg-slate-700/50 hover:bg-slate-700 border border-slate-600 text-slate-200 transition-all"
          >
            <span className="font-medium text-xs">X (Twitter)</span>
          </a>
        </div>

        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse py-3 px-4 rounded-xl bg-islamic-gold/20 hover:bg-islamic-gold/30 border border-islamic-gold/40 text-islamic-gold font-medium text-sm transition-all"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied to Clipboard!' : 'Copy Shareable Text & Link'}</span>
        </button>
      </div>
    </div>
  );
};
