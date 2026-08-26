import type { GalleryItem } from '../types';

export const initialGallery: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'The Green Dome (Al-Qubbat al-Khadra) - Madinah Al-Munawwarah',
    description: 'Serene nocturnal view of the Green Dome of Al-Masjid an-Nabawi in Madinah under the starry sky.',
    imageUrl: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1200&q=80',
    category: 'Madinah',
    source: 'Islamic Heritage Archive',
    attribution: 'Photo by Unsplash License / Respectful Islamic Heritage',
    featured: true,
    status: 'published'
  },
  {
    id: 'g-2',
    title: 'Al-Masjid an-Nabawi Courtyard Umbrellas',
    description: 'Magnificent architectural shade umbrellas expanding across the marbled courtyard of the Prophet\'s Mosque.',
    imageUrl: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80',
    category: 'Masjid',
    source: 'Unsplash Photography',
    attribution: 'Madinah Architecture Collection',
    featured: true,
    status: 'published'
  },
  {
    id: 'g-3',
    title: 'Holy Kaaba & Al-Masjid al-Haram at Night',
    description: 'Spiritual illumination surrounding the Kaaba in Makkah Mukarramah.',
    imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=80',
    category: 'Makkah',
    source: 'Makkah Sanctuary Archives',
    attribution: 'Unsplash License',
    featured: true,
    status: 'published'
  },
  {
    id: 'g-4',
    title: 'Traditional Islamic Geometric Arch & Tilework',
    description: 'Intricate golden and turquoise zellij geometric mosaic patterns handcrafted in traditional Islamic architecture.',
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
    category: 'Geometric Art',
    source: 'Islamic Art Collection',
    attribution: 'Geometric Craftsmanship Archive',
    featured: true,
    status: 'published'
  },
  {
    id: 'g-5',
    title: 'Crescent Moon & Fanous Lantern Illumination',
    description: 'Warm glowing golden Islamic lantern under the crescent moon of 12 Rabi-ul-Awwal.',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    category: 'Lanterns',
    source: 'Milad Digital Art',
    attribution: 'Noor Digital Assets',
    featured: true,
    status: 'published'
  },
  {
    id: 'g-6',
    title: 'Golden Calligraphy of Salawat',
    description: 'Exquisite classic Arabic Thuluth calligraphy rendering of peace and blessings upon Prophet Muhammad ﷺ.',
    imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1200&q=80',
    category: 'Quran',
    source: 'Sacred Calligraphy Guild',
    attribution: 'Calligraphy Masterworks',
    featured: true,
    status: 'published'
  }
];
