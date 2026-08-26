import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const AdminEvents: React.FC = () => {
  const { events, addEvent, deleteEvent } = useAppStore();
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('2026-09-15');
  const [time, setTime] = useState('18:00');
  const [location, setLocation] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [speaker, setSpeaker] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;

    addEvent({
      title,
      description,
      date,
      time,
      location: location || 'Online Live Stream',
      organizer: organizer || 'Noor-e-Muhammad Foundation',
      speaker: speaker || 'Guest Scholars',
      featured: true,
      status: 'published'
    });

    setTitle('');
    setDescription('');
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-gold-gradient">Rabi-ul-Awwal Events Management</h1>
          <p className="text-xs text-islamic-cream/70 font-serif">Create and publish communal gatherings & lectures</p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2.5 rounded-xl bg-islamic-gold text-islamic-deep font-serif font-bold text-xs shadow-gold-glow flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>{showForm ? 'Close Form' : 'Add New Event'}</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="p-6 glass-card rounded-3xl border border-islamic-gold/40 space-y-4 text-xs font-serif animate-fadeIn">
          <h3 className="font-serif text-base font-bold text-islamic-gold">Create Rabi-ul-Awwal Event</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-islamic-gold mb-1 font-semibold">Event Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g. Mehfil-e-Milad & Seerah Conference"
                className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-islamic-gold mb-1 font-semibold">Organizer Name</label>
              <input
                type="text"
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
                placeholder="e.g. Noor-e-Muhammad Foundation"
                className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-islamic-gold mb-1 font-semibold">Event Date *</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-islamic-gold mb-1 font-semibold">Time</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="18:30 GMT+5"
                className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-islamic-gold mb-1 font-semibold">Venue / Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Grand Auditorium / Online Stream"
                className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-islamic-gold mb-1 font-semibold">Event Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Detailed description of the program..."
              className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end">
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-islamic-gold text-islamic-deep font-bold shadow-gold-glow">
              Publish Event Entry
            </button>
          </div>
        </form>
      )}

      {/* Table */}
      <div className="glass-card rounded-3xl border border-islamic-gold/30 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right text-xs font-serif">
            <thead className="bg-islamic-primary/80 text-islamic-gold uppercase border-b border-islamic-gold/20">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Organizer</th>
                <th className="p-4">Location</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-islamic-gold/15 text-islamic-cream">
              {events.map((ev) => (
                <tr key={ev.id} className="hover:bg-islamic-primary/30 transition-colors">
                  <td className="p-4 font-bold text-islamic-gold">{ev.title}</td>
                  <td className="p-4">{ev.date} at {ev.time}</td>
                  <td className="p-4">{ev.organizer}</td>
                  <td className="p-4 text-islamic-cream/80">{ev.location}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => deleteEvent(ev.id)}
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
