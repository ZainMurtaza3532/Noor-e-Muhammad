import type { MediaItem } from '../types';
import { initialNaats } from './naats';
import { initialBayans } from './bayans';

export const initialVideos: MediaItem[] = [
  ...initialNaats,
  ...initialBayans,
  {
    id: 'v-1',
    youtubeUrl: 'https://www.youtube.com/watch?v=wX78V9N2kY8',
    youtubeId: 'wX78V9N2kY8',
    title: 'Surah Ar-Rahman Recitation | Heart Soothing',
    description: 'Soulful Quran recitation of Surah Ar-Rahman with English & Urdu translation.',
    thumbnail: 'https://img.youtube.com/vi/wX78V9N2kY8/hqdefault.jpg',
    channelName: 'Mercy Recitations',
    speaker: 'Qari Mishary Rashid Alafasy',
    mediaType: 'Quran',
    category: 'Quran Recitation',
    tags: ['Quran', 'SurahRahman', 'Recitation'],
    duration: '18:20',
    featured: true,
    status: 'published',
    publishedAt: '2026-08-02'
  },
  {
    id: 'v-2',
    youtubeUrl: 'https://www.youtube.com/watch?v=m7H0V1N5kB4',
    youtubeId: 'm7H0V1N5kB4',
    title: 'Stories of the Prophets for Children - Prophet Muhammad ﷺ',
    description: 'Educational animated story introducing young learners to the life of Prophet Muhammad ﷺ with respect and reverence.',
    thumbnail: 'https://img.youtube.com/vi/m7H0V1N5kB4/hqdefault.jpg',
    channelName: 'Muslim Kids Learning',
    speaker: 'Islamic Kids Media',
    mediaType: 'Seerah',
    category: 'Kids Islamic Content',
    tags: ['Kids', 'Seerah', 'Education'],
    duration: '12:15',
    featured: false,
    status: 'published',
    publishedAt: '2026-08-06'
  }
];
