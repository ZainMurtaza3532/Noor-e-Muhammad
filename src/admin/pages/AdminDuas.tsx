import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import type { ContentCategory } from '../../types';

export const AdminDuas: React.FC = () => {
  const { duas, addDua, deleteDua } = useAppStore();
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState('');
  const [arabic, setArabic] = useState('');
  const [transliteration, setTransliteration] = useState('');
  const [english, setEnglish] = useState('');
  const [reference, setReference] = useState('');
  const [category, setCategory] = useState<ContentCategory>('Morning');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !arabic || !english) return;

    addDua({
      title,
      arabic,
      transliteration,
      english,
      reference,
      category,
      featured: true,
      status: 'published'
    });

    setTitle('');
    setArabic('');
    setTransliteration('');
    setEnglish('');
    setReference('');
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-gold-gradient">Dua & Supplications Management</h1>
          <p className="text-xs text-islamic-cream/70 font-serif">Add and manage authentic Quranic & Prophetic Duas</p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2.5 rounded-xl bg-islamic-gold text-islamic-deep font-serif font-bold text-xs shadow-gold-glow flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>{showForm ? 'Close Form' : 'Add New Dua'}</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="p-6 glass-card rounded-3xl border border-islamic-gold/40 space-y-4 text-xs font-serif animate-fadeIn">
          <h3 className="font-serif text-base font-bold text-islamic-gold">Create Dua Entry</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-islamic-gold mb-1 font-semibold">Dua Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g. Dua for Morning & Evening Protection"
                className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-islamic-gold mb-1 font-semibold">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e: any) => setCategory(e.target.value)}
                placeholder="Morning / Evening / Guidance"
                className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-islamic-gold mb-1 font-semibold">Arabic Text *</label>
            <textarea
              value={arabic}
              onChange={(e) => setArabic(e.target.value)}
              required
              rows={2}
              placeholder="بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ..."
              className="w-full p-3 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream font-arabic text-lg focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-islamic-gold mb-1 font-semibold">Transliteration</label>
              <textarea
                value={transliteration}
                onChange={(e) => setTransliteration(e.target.value)}
                rows={2}
                placeholder="Bismillahil-ladhi la yadurru..."
                className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-islamic-gold mb-1 font-semibold">English Translation *</label>
              <textarea
                value={english}
                onChange={(e) => setEnglish(e.target.value)}
                required
                rows={2}
                placeholder="In the name of Allah with Whose name..."
                className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Reference e.g. Sunan Abu Dawud 5088"
              className="w-1/2 p-2 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
            />

            <button type="submit" className="px-6 py-2.5 rounded-xl bg-islamic-gold text-islamic-deep font-bold shadow-gold-glow">
              Publish Dua Entry
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
                <th className="p-4">Arabic</th>
                <th className="p-4">Translation</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-islamic-gold/15 text-islamic-cream">
              {duas.map((d) => (
                <tr key={d.id} className="hover:bg-islamic-primary/30 transition-colors">
                  <td className="p-4 font-bold text-islamic-gold">{d.title}</td>
                  <td className="p-4 font-arabic text-base max-w-xs truncate">{d.arabic}</td>
                  <td className="p-4 max-w-sm truncate italic">"{d.english}"</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => deleteDua(d.id)}
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
