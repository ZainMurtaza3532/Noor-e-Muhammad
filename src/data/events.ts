import type { EventItem } from '../types';

export const initialEvents: EventItem[] = [
  {
    id: 'e-1',
    title: 'Global Seerah Conference & Mehfil-e-Milad ﷺ',
    description: 'Join renowned Islamic scholars, reciters, and qaris for a soulful evening celebrating the birth and mercy of Prophet Muhammad ﷺ.',
    date: '2026-09-14',
    time: '18:30 GMT+5',
    location: 'Grand Auditorium & Online Live Stream',
    organizer: 'Noor-e-Muhammad International Foundation',
    speaker: 'Shaykh Dr. Umar Al-Qadri & Guest Qaris',
    mapLink: 'https://maps.google.com',
    registrationLink: 'https://example.com/register',
    imageUrl: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=600&q=80',
    featured: true,
    status: 'published'
  },
  {
    id: 'e-2',
    title: '12 Rabi-ul-Awwal Dawn Salawat Gathering',
    description: 'Special early morning prayer and communal recitations of Durood Shareef and Khatam al-Quran on 12 Rabi-ul-Awwal.',
    date: '2026-09-15',
    time: '04:30 AM',
    location: 'Al-Madinah Islamic Center',
    organizer: 'Community Islamic League',
    speaker: 'Qari Muhammad Hassan',
    mapLink: 'https://maps.google.com',
    registrationLink: 'https://example.com/register-dawn',
    imageUrl: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=600&q=80',
    featured: true,
    status: 'published'
  }
];
