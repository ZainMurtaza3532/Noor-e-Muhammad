import React from 'react';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { IslamicPattern } from '../components/common/IslamicPattern';

export const EventsPage: React.FC = () => {
  const { events } = useAppStore();

  return (
    <div className="min-h-screen bg-islamic-deep text-islamic-cream pt-28 pb-20 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="font-serif text-xs font-bold text-islamic-gold uppercase tracking-widest">Communal Gatherings</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-gold-gradient">الْفَعَالِيَاتُ وَالْمَحَافِلُ - Rabi-ul-Awwal Events</h1>
          <p className="font-sans text-sm text-islamic-cream/80 max-w-2xl mx-auto">
            Upcoming Mehfil-e-Milad, Seerah conferences, Durood gatherings, and scholarly seminars celebrating 12 Rabi-ul-Awwal.
          </p>
          <IslamicPattern />
        </div>

        {/* Events Grid */}
        <div className="space-y-6">
          {events.map((ev) => (
            <div key={ev.id} className="p-6 sm:p-8 glass-card rounded-3xl border border-islamic-gold/30 shadow-2xl flex flex-col md:flex-row gap-6 items-start">
              
              {ev.imageUrl && (
                <div className="w-full md:w-64 aspect-video rounded-2xl overflow-hidden border border-islamic-gold/20 shrink-0">
                  <img src={ev.imageUrl} alt={ev.title} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-islamic-gold/15 pb-2">
                  <span className="px-3 py-1 rounded-full bg-islamic-gold/15 text-islamic-gold text-xs font-serif font-bold border border-islamic-gold/30">
                    {ev.organizer}
                  </span>
                  <span className="text-xs font-serif text-islamic-cream/70 flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-islamic-gold" /> {ev.date} at {ev.time}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-gold-gradient">{ev.title}</h3>
                <p className="text-xs sm:text-sm text-islamic-cream/80 leading-relaxed">{ev.description}</p>
                <p className="text-xs font-serif text-islamic-gold">Speaker: <strong>{ev.speaker}</strong></p>

                <div className="pt-3 flex flex-wrap items-center justify-between gap-4 text-xs font-serif">
                  <span className="flex items-center gap-1 text-islamic-cream/70">
                    <MapPin className="w-4 h-4 text-islamic-gold" /> {ev.location}
                  </span>

                  <a
                    href={ev.registrationLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-islamic-gold/20 hover:bg-islamic-gold/30 text-islamic-gold border border-islamic-gold/40 font-bold transition-all flex items-center gap-1.5 shadow-gold-glow"
                  >
                    <span>Register / Join Program</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
