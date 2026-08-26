import React, { useState } from 'react';
import { Plus, Trash2, ShieldCheck } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import type { ContentCategory } from '../../types';

export const AdminHadith: React.FC = () => {
  const { hadiths, addHadith, deleteHadith } = useAppStore();
  const [showAddForm, setShowAddForm] = useState(false);

  const [arabic, setArabic] = useState('');
  const [translation, setTranslation] = useState('');
  const [urdu, setUrdu] = useState('');
  const [source, setSource] = useState('');
  const [reference, setReference] = useState('');
  const [category, setCategory] = useState<ContentCategory>('Character');
  const [featured, setFeatured] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!arabic || !translation || !source) return;

    addHadith({
      arabic,
      translation,
      urdu,
      source,
      reference,
      category,
      verified: true,
      featured,
      status: 'published'
    });

    setArabic('');
    setTranslation('');
    setUrdu('');
    setSource('');
    setReference('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-gold-gradient">Hadith Content Management</h1>
          <p className="text-xs text-islamic-cream/70 font-serif">Add verified Ahadith with authentic source references</p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2.5 rounded-xl bg-islamic-gold text-islamic-deep font-serif font-bold text-xs shadow-gold-glow flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Close Form' : 'Add New Hadith'}</span>
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="p-6 glass-card rounded-3xl border border-islamic-gold/40 space-y-4 text-xs font-serif animate-fadeIn">
          <h3 className="font-serif text-base font-bold text-islamic-gold">Create Verified Hadith Entry</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-islamic-gold mb-1 font-semibold">Arabic Text *</label>
              <textarea
                value={arabic}
                onChange={(e) => setArabic(e.target.value)}
                required
                rows={3}
                placeholder="إِنَّمَا بُعِثْتُ لِأُتَمِّمَ صَالِحَ الْأَخْلَاقِ"
                className="w-full p-3 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream font-arabic text-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-islamic-gold mb-1 font-semibold">English Translation *</label>
              <textarea
                value={translation}
                onChange={(e) => setTranslation(e.target.value)}
                required
                rows={3}
                placeholder="I have only been sent to perfect good character."
                className="w-full p-3 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-islamic-gold mb-1 font-semibold">Urdu Translation (Optional)</label>
              <input
                type="text"
                value={urdu}
                onChange={(e) => setUrdu(e.target.value)}
                placeholder="اردو ترجمہ"
                className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream font-urdu focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-islamic-gold mb-1 font-semibold">Authentic Source *</label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="e.g. Sahih al-Bukhari 6018"
                required
                className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-islamic-gold mb-1 font-semibold">Reference Details</label>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="Book 78, Hadith 49"
                className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="accent-islamic-gold"
              />
              <span>Feature on Home Page</span>
            </label>

            <button type="submit" className="px-6 py-2.5 rounded-xl bg-islamic-gold text-islamic-deep font-bold shadow-gold-glow">
              Publish Hadith Entry
            </button>
          </div>
        </form>
      )}

      <div className="glass-card rounded-3xl border border-islamic-gold/30 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right text-xs font-serif">
            <thead className="bg-islamic-primary/80 text-islamic-gold uppercase border-b border-islamic-gold/20">
              <tr>
                <th className="p-4">Arabic</th>
                <th className="p-4">English Translation</th>
                <th className="p-4">Source</th>
                <th className="p-4">Verification</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-islamic-gold/15 text-islamic-cream">
              {hadiths.map((h) => (
                <tr key={h.id} className="hover:bg-islamic-primary/30 transition-colors">
                  <td className="p-4 font-arabic text-base max-w-xs truncate text-islamic-gold font-bold">{h.arabic}</td>
                  <td className="p-4 max-w-sm truncate italic">"{h.translation}"</td>
                  <td className="p-4 text-emerald-400 font-semibold">{h.source}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => deleteHadith(h.id)}
                      className="p-2 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/60"
                      title="Delete Hadith"
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
    </div>
  );
};
