export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  category: 'birth' | 'revelation' | 'migration' | 'battle' | 'major';
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 't1',
    year: '570 CE',
    title: 'Birth of Prophet Muhammad ﷺ',
    description: 'Born in Makkah on the 12th of Rabi-ul-Awwal in the Year of the Elephant.',
    category: 'birth'
  },
  {
    id: 't2',
    year: '576 CE',
    title: 'Passing of His Mother',
    description: 'His blessed mother, Aminah bint Wahb, passes away when he is six years old. He is placed in the care of his grandfather, Abdul Muttalib.',
    category: 'major'
  },
  {
    id: 't3',
    year: '595 CE',
    title: 'Marriage to Khadijah (RA)',
    description: 'At the age of 25, he marries the noble and wealthy merchant, Sayyidah Khadijah bint Khuwaylid.',
    category: 'major'
  },
  {
    id: 't4',
    year: '610 CE',
    title: 'First Revelation (Wahy)',
    description: 'At age 40, in the Cave of Hira, the Angel Jibreel brings the first revelation from Allah: "Iqra" (Read).',
    category: 'revelation'
  },
  {
    id: 't5',
    year: '613 CE',
    title: 'Public Preaching Begins',
    description: 'After three years of secret preaching, Allah commands the Prophet ﷺ to openly call the people of Makkah to Islam.',
    category: 'major'
  },
  {
    id: 't6',
    year: '620 CE',
    title: 'Al-Isra wal-Mi\'raj',
    description: 'The miraculous Night Journey to Jerusalem and the Ascension to the heavens.',
    category: 'revelation'
  },
  {
    id: 't7',
    year: '622 CE',
    title: 'The Hijrah (Migration)',
    description: 'The migration from Makkah to Madinah, marking the beginning of the Islamic Hijri calendar.',
    category: 'migration'
  },
  {
    id: 't8',
    year: '624 CE',
    title: 'Battle of Badr',
    description: 'The first major military victory for the Muslims against the Quraysh of Makkah.',
    category: 'battle'
  },
  {
    id: 't9',
    year: '630 CE',
    title: 'Conquest of Makkah (Fath Makkah)',
    description: 'The peaceful conquest of Makkah. The Kaaba is cleansed of idols.',
    category: 'major'
  },
  {
    id: 't10',
    year: '632 CE',
    title: 'Farewell Pilgrimage & Passing',
    description: 'The Prophet ﷺ delivers his Farewell Sermon. He passes away in Madinah at the age of 63.',
    category: 'major'
  }
];
