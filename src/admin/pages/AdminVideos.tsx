import React, { useState } from 'react';
import { Plus, Trash2, ExternalLink, Video } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { YouTubeModal } from '../components/YouTubeModal';

export const AdminVideos: React.FC = () => {
  const { videos, deleteMediaItem } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-gold-gradient">YouTube Media Management</h1>
          <p className="text-xs text-islamic-cream/70 font-serif">Add, publish, feature, or delete YouTube Naats & Bayans</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-islamic-gold text-islamic-deep font-serif font-bold text-xs shadow-gold-glow flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add YouTube Video</span>
        </button>
      </div>

      {/* Videos Data Table */}
      <div className="glass-card rounded-3xl border border-islamic-gold/30 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right text-xs font-serif">
            <thead className="bg-islamic-primary/80 text-islamic-gold uppercase border-b border-islamic-gold/20">
              <tr>
                <th className="p-4">Thumbnail</th>
                <th className="p-4">Title</th>
                <th className="p-4">Type</th>
                <th className="p-4">Channel / Speaker</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-islamic-gold/15 text-islamic-cream">
              {videos.map((v) => (
                <tr key={v.id} className="hover:bg-islamic-primary/30 transition-colors">
                  <td className="p-3 w-28">
                    <img src={v.thumbnail} alt={v.title} className="w-24 h-14 object-cover rounded-lg border border-islamic-gold/20" />
                  </td>
                  <td className="p-4 max-w-xs font-bold truncate">
                    {v.title}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-islamic-gold/20 text-islamic-gold border border-islamic-gold/30 text-[10px] uppercase font-bold">
                      {v.mediaType || v.category}
                    </span>
                  </td>
                  <td className="p-4 text-islamic-cream/80">
                    {v.speaker || v.channelName}
                  </td>
                  <td className="p-4">
                    <span className="text-emerald-400 font-semibold">Published</span>
                  </td>
                  <td className="p-4 text-center space-x-2 rtl:space-x-reverse">
                    <a
                      href={v.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-islamic-primary/60 text-islamic-gold inline-block"
                      title="View on YouTube"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => deleteMediaItem(v.id)}
                      className="p-2 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/60 inline-block"
                      title="Delete Video"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <YouTubeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
