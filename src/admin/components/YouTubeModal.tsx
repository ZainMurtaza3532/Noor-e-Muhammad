import React, { useState, useEffect } from 'react';
import { X, Video, CheckCircle2, AlertCircle, Play } from 'lucide-react';
import { getYouTubeMetadata } from '../../utils/youtube';
import { useAppStore } from '../../store/useAppStore';
import type { MediaType } from '../../types';

interface YouTubeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const YouTubeModal: React.FC<YouTubeModalProps> = ({ isOpen, onClose }) => {
  const { addMediaItem } = useAppStore();

  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [category, setCategory] = useState('Naat Shareef');
  const [mediaType, setMediaType] = useState<MediaType>('Naat');
  const [featured, setFeatured] = useState(true);

  const [metadata, setMetadata] = useState(getYouTubeMetadata(''));

  useEffect(() => {
    const meta = getYouTubeMetadata(url);
    setMetadata(meta);
  }, [url]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!metadata.isValid || !metadata.videoId) return;

    addMediaItem({
      youtubeUrl: url,
      youtubeId: metadata.videoId,
      title: title || 'Islamic Video Content',
      description,
      thumbnail: metadata.thumbnailUrl || '',
      channelName: speaker || 'Islamic Channel',
      speaker,
      mediaType,
      category,
      tags: ['Islamic', mediaType, 'Noor-e-Muhammad'],
      featured,
      status: 'published'
    });

    setUrl('');
    setTitle('');
    setDescription('');
    setSpeaker('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl p-6 glass-card rounded-3xl border border-islamic-gold/40 shadow-2xl text-islamic-cream overflow-y-auto max-h-[90vh]">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-islamic-cream/60 hover:text-islamic-gold rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
          <div className="p-3 rounded-2xl bg-islamic-gold/20 text-islamic-gold border border-islamic-gold/30">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-gold-gradient">Add YouTube Media</h3>
            <p className="text-xs text-islamic-cream/70 font-serif">Automatically extracts Video ID & HD thumbnails</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-serif">
          
          <div>
            <label className="block text-islamic-gold mb-1 font-semibold">Paste YouTube Video URL *</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="e.g. https://www.youtube.com/watch?v=0h6Q5XJqQ08 or https://youtu.be/..."
              required
              className="w-full p-3 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none focus:border-islamic-gold font-sans"
            />
          </div>

          {url && (
            <div className={`p-4 rounded-2xl border transition-all ${metadata.isValid ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-red-950/30 border-red-500/40 text-red-300'}`}>
              <div className="flex items-center gap-2 mb-2 font-semibold text-xs">
                {metadata.isValid ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Valid YouTube Video ID: {metadata.videoId}</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <span>Invalid YouTube URL. Please check watch link format.</span>
                  </>
                )}
              </div>

              {metadata.isValid && metadata.thumbnailUrl && (
                <div className="relative aspect-video w-full max-w-sm mx-auto rounded-xl overflow-hidden border border-islamic-gold/30 mt-3 shadow-lg">
                  <img src={metadata.thumbnailUrl} alt="Thumbnail Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Play className="w-10 h-10 text-islamic-gold fill-current" />
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-islamic-gold mb-1 font-semibold">Content Type</label>
              <select
                value={mediaType}
                onChange={(e: any) => setMediaType(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
              >
                <option value="Naat">Naat Shareef</option>
                <option value="Bayan">Bayan / Lecture</option>
                <option value="Seerah">Seerah Video</option>
                <option value="Quran">Quran Recitation</option>
                <option value="Reminder">Islamic Reminder</option>
                <option value="RabiUlAwwal">12 Rabi-ul-Awwal Special</option>
              </select>
            </div>

            <div>
              <label className="block text-islamic-gold mb-1 font-semibold">Category Tag</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Naat Shareef / Seerah Lecture"
                className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-islamic-gold mb-1 font-semibold">Video Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title..."
                required
                className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-islamic-gold mb-1 font-semibold">Reciter / Speaker / Channel</label>
              <input
                type="text"
                value={speaker}
                onChange={(e) => setSpeaker(e.target.value)}
                placeholder="e.g. Qari Waheed Zafar Qasmi"
                className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-islamic-gold mb-1 font-semibold">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Short description of the content..."
              className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
            />
          </div>

          <div className="flex items-center space-x-2 rtl:space-x-reverse pt-2">
            <input
              type="checkbox"
              id="featured"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 rounded text-islamic-gold focus:ring-0 accent-islamic-gold"
            />
            <label htmlFor="featured" className="text-xs text-islamic-cream/90 cursor-pointer">
              Feature on Home Page Carousel
            </label>
          </div>

          <div className="pt-4 flex items-center justify-end space-x-3 rtl:space-x-reverse">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-islamic-primary/60 text-islamic-cream/80 border border-islamic-gold/20"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!metadata.isValid}
              className="px-6 py-2.5 rounded-xl bg-islamic-gold text-islamic-deep font-bold shadow-gold-glow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Publish to Website
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
