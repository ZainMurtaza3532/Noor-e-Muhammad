import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import type { ContentCategory } from '../../types';

export const AdminSunnah: React.FC = () => {
  const { sunnahs, addSunnah, deleteSunnah } = useAppStore();
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState('');
  const [arabicUrdu, setArabicUrdu] = useState('');
  const [englishExplanation, setEnglishExplanation] = useState('');
  const [reference, setReference] = useState('');
  const [category, setCategory] = useState<ContentCategory>('Character');
  const [challengeDay, setChallengeDay] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !englishExplanation) return;

    addSunnah({
      title,
      arabicUrdu,
      englishExplanation,
      reference,
      category,
      challengeDay,
      featured: true,
      status: 'published'
    });

    setTitle('');
    setArabicUrdu('');
    setEnglishExplanation('');
    setReference('');
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-gold-gradient">Sunnah Hub Management</h1>
          <p className="text-xs text-islamic-cream/70 font-serif">Add Sunnah practices & 30-day challenge mappings</p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2.5 rounded-xl bg-islamic-gold text-islamic-deep font-serif font-bold text-xs shadow-gold-glow flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>{showForm ? 'Close Form' : 'Add New Sunnah'}</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="p-6 glass-card rounded-3xl border border-islamic-gold/40 space-y-4 text-xs font-serif animate-fadeIn">
          <h3 className="font-serif text-base font-bold text-islamic-gold">Create Sunnah Entry</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-islamic-gold mb-1 font-semibold">Sunnah Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g. Smiling at Others"
                className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-islamic-gold mb-1 font-semibold">Arabic / Urdu Heading</label>
              <input
                type="text"
                value={arabicUrdu}
                onChange={(e) => setArabicUrdu(e.target.value)}
                placeholder="التَّبَسُّمُ فِي وَجْهِ الأَخِ"
                className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream font-arabic focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-islamic-gold mb-1 font-semibold">30-Day Challenge Day #</label>
              <input
                type="number"
                min={1}
                max={30}
                value={challengeDay}
                onChange={(e) => setChallengeDay(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-islamic-gold mb-1 font-semibold">English Explanation *</label>
            <textarea
              value={englishExplanation}
              onChange={(e) => setEnglishExplanation(e.target.value)}
              required
              rows={2}
              placeholder="Meeting your brothers, sisters, and neighbors with a warm smile is an act of charity..."
              className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Reference e.g. Sunan al-Tirmidhi 1956"
              className="w-1/2 p-2 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
            />

            <button type="submit" className="px-6 py-2.5 rounded-xl bg-islamic-gold text-islamic-deep font-bold shadow-gold-glow">
              Publish Sunnah Entry
            </button>
          </div>
        </form>
      )}

      <div className="glass-card rounded-3xl border border-islamic-gold/30 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right text-xs font-serif">
            <thead className="bg-islamic-primary/80 text-islamic-gold uppercase border-b border-islamic-gold/20">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Explanation</th>
                <th className="p-4">Category</th>
                <th className="p-4">Challenge Day</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-islamic-gold/15 text-islamic-cream">
              {sunnahs.map((s) => (
                <tr key={s.id} className="hover:bg-islamic-primary/30 transition-colors">
                  <td className="p-4 font-bold text-islamic-gold">{s.title}</td>
                  <td className="p-4 max-w-sm truncate text-islamic-cream/80">{s.englishExplanation}</td>
                  <td className="p-4 text-emerald-400 font-semibold">{s.category}</td>
                  <td className="p-4 font-bold">Day {s.challengeDay || '-'}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => deleteSunnah(s.id)}
                      className="p-2 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/60"
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
