import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, X, Disc } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const AudioPlayerBar: React.FC = () => {
  const { currentAudio, pauseAudio, playAudio, stopAudio } = useAppStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!currentAudio || !currentAudio.audioUrl) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
      return;
    }

    if (!audioRef.current) {
      audioRef.current = new Audio(currentAudio.audioUrl);
    } else if (audioRef.current.src !== currentAudio.audioUrl) {
      audioRef.current.src = currentAudio.audioUrl;
    }

    const audio = audioRef.current;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (currentAudio.playlist) {
        useAppStore.getState().playNextInPlaylist();
      } else {
        setIsPlaying(false);
        pauseAudio();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    if (currentAudio.isPlaying) {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      audio.pause();
      setIsPlaying(false);
    }

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentAudio]);

  if (!currentAudio) return null;

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      pauseAudio();
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      playAudio(currentAudio.title, currentAudio.reciter, currentAudio.audioUrl);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-islamic-deep/95 backdrop-blur-xl border-t border-islamic-gold/40 shadow-2xl p-3 px-4 transition-all animate-slideUp">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        
        {/* Track Title & Reciter */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse min-w-0 max-w-xs">
          <div className="w-10 h-10 rounded-full bg-islamic-gold/20 text-islamic-gold border border-islamic-gold/40 flex items-center justify-center shrink-0 animate-spin-slow">
            <Disc className="w-5 h-5" />
          </div>
          <div className="truncate text-left rtl:text-right">
            <h4 className="font-serif text-xs font-bold text-islamic-gold truncate">{currentAudio.title}</h4>
            <p className="text-[10px] text-islamic-cream/70 font-sans truncate">{currentAudio.reciter}</p>
          </div>
        </div>

        {/* Player Controls & Scrubber */}
        <div className="flex-1 max-w-md flex flex-col items-center space-y-1">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-islamic-gold text-islamic-deep flex items-center justify-center shadow-gold-glow hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
          </div>

          <div className="w-full flex items-center space-x-2 rtl:space-x-reverse text-[10px] font-mono text-islamic-gold">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-islamic-primary/60 rounded-lg appearance-none cursor-pointer accent-islamic-gold"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume & Close */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <button
            onClick={toggleMute}
            className="p-2 text-islamic-cream/80 hover:text-islamic-gold rounded-full"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              if (audioRef.current) audioRef.current.pause();
              stopAudio();
            }}
            className="p-2 text-islamic-cream/60 hover:text-red-400 rounded-full transition-colors"
            title="Close Player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
