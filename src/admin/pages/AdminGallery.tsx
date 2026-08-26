import React, { useState } from 'react';
import { Plus, Trash2, ShieldAlert } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const AdminGallery: React.FC = () => {
  const { gallery, addGalleryItem, deleteGalleryItem } = useAppStore();
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<'Madinah' | 'Makkah' | 'Masjid' | 'Geometric Art' | 'Lanterns'>('Madinah');
  const [attribution, setAttribution] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return;

    addGalleryItem({
      title,
      description,
      imageUrl,
      category,
      source: 'Admin Media Upload',
      attribution: attribution || 'Islamic Architecture Archives',
      featured: true,
      status: 'published'
    });

    setTitle('');
    setImageUrl('');
    setDescription('');
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-gold-gradient">Gallery Management</h1>
          <p className="text-xs text-islamic-cream/70 font-serif">Add Islamic architecture & calligraphy images</p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2.5 rounded-xl bg-islamic-gold text-islamic-deep font-serif font-bold text-xs shadow-gold-glow flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>{showForm ? 'Close Form' : 'Add Gallery Image'}</span>
        </button>
      </div>

      <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/40 text-red-300 text-xs font-serif flex items-center gap-3">
        <ShieldAlert className="w-5 h-5 shrink-0 text-red-400" />
        <span>Strict Religious Policy: NEVER upload or publish any depiction, portrait, avatar, or AI illustration representing Prophet Muhammad ﷺ. Upload only respectful Islamic architecture, mosques, calligraphic art, lanterns, or landscapes.</span>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="p-6 glass-card rounded-3xl border border-islamic-gold/40 space-y-4 text-xs font-serif animate-fadeIn">
          <h3 className="font-serif text-base font-bold text-islamic-gold">Add Image Entry</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-islamic-gold mb-1 font-semibold">Image Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g. Al-Masjid an-Nabawi Courtyard"
                className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-islamic-gold mb-1 font-semibold">Image URL *</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
                placeholder="https://images.unsplash.com/..."
                className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-islamic-gold mb-1 font-semibold">Category</label>
              <select
                value={category}
                onChange={(e: any) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
              >
                <option value="Madinah">Madinah Al-Munawwarah</option>
                <option value="Makkah">Makkah Al-Mukarramah</option>
                <option value="Masjid">Masjid Architecture</option>
                <option value="Geometric Art">Geometric Art</option>
                <option value="Lanterns">Lanterns & Illumination</option>
              </select>
            </div>

            <div>
              <label className="block text-islamic-gold mb-1 font-semibold">Attribution / Copyright Note</label>
              <input
                type="text"
                value={attribution}
                onChange={(e) => setAttribution(e.target.value)}
                placeholder="Photo by Unsplash / Licensed Archive"
                className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-islamic-gold text-islamic-deep font-bold shadow-gold-glow">
              Publish Gallery Image
            </button>
          </div>
        </form>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {gallery.map((g) => (
          <div key={g.id} className="relative aspect-square rounded-2xl overflow-hidden border border-islamic-gold/30 group">
            <img src={g.imageUrl} alt={g.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
              <span className="text-[10px] text-islamic-gold font-bold">{g.category}</span>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white truncate">{g.title}</span>
                <button
                  onClick={() => deleteGalleryItem(g.id)}
                  className="p-1.5 rounded-full bg-red-600 text-white"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
