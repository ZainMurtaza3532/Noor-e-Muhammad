const fs = require('fs');
const https = require('https');

const queries = [
  { q: 'Darulifta AhleSunnat', channel: 'Darulifta AhleSunnat', speaker: 'Mufti AhleSunnat', type: 'Bayan' },
  { q: 'Maulana Ilyas Qadri bayan', channel: 'Madani Channel', speaker: 'Maulana Ilyas Qadri', type: 'Bayan' },
  { q: 'Peer Ajmal Raza Qadri bayan', channel: 'Ajmal Raza Qadri Official', speaker: 'Peer Ajmal Raza Qadri', type: 'Bayan' },
  { q: 'Abdul Habib Attari bayan', channel: 'Madani Channel', speaker: 'Haji Abdul Habib Attari', type: 'Bayan' },
  { q: 'Soban Attari bayan', channel: 'Soban Attari Official', speaker: 'Soban Attari', type: 'Bayan' },
  { q: 'Dr Muhammad Suleman Misbahi bayan', channel: 'Islamic Knowledge', speaker: 'Dr. Suleman Misbahi', type: 'Bayan' },
  { q: 'Muhammad Raza SaQib Mustafai bayan', channel: 'Idara Tul Mustafa', speaker: 'Muhammad Raza SaQib Mustafai', type: 'Bayan' },
  { q: 'Kids Madani Channel cartoon', channel: 'Kids Madani Channel', speaker: 'Madani Kids', type: 'Kids Islamic Content' },
  { q: 'Naat Production new', channel: 'Naat Production', speaker: 'Naat Khawan', type: 'Naat' },
  { q: 'Old is Gold Naatein', channel: 'Old is Gold Naatein', speaker: 'Classic Naat Khawan', type: 'Naat' }
];

function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function scrape() {
  let allVideos = [];
  let videoIdCounter = 1;

  for (const item of queries) {
    console.log(`Scraping for ${item.q}...`);
    const data = await fetchHTML('https://www.youtube.com/results?search_query=' + encodeURIComponent(item.q));
    
    const regex = /watch\?v=([a-zA-Z0-9_-]{11})/g;
    const matches = [...data.matchAll(regex)];
    const uniqueIds = [...new Set(matches.map(m => m[1]))].slice(0, 10);
    
    for (let i = 0; i < uniqueIds.length; i++) {
      allVideos.push({
        id: `v-${videoIdCounter++}`,
        youtubeUrl: `https://www.youtube.com/watch?v=${uniqueIds[i]}`,
        youtubeId: uniqueIds[i],
        title: `${item.speaker} - Video ${i + 1}`,
        description: `Islamic content featuring ${item.speaker}.`,
        thumbnail: `https://img.youtube.com/vi/${uniqueIds[i]}/hqdefault.jpg`,
        channelName: item.channel,
        speaker: item.speaker,
        mediaType: item.type,
        category: item.type === 'Naat' ? 'Naat' : (item.type === 'Kids Islamic Content' ? 'Kids Islamic Content' : 'Islamic Reminders'),
        tags: [item.type.replace(/\s+/g, ''), 'AhleSunnat', item.channel.replace(/\s+/g, '')],
        duration: '10:00',
        featured: i === 0,
        status: 'published',
        publishedAt: '2026-08-30'
      });
    }
  }

  const tsContent = `import type { MediaItem } from '../types';

export const initialVideos: MediaItem[] = ${JSON.stringify(allVideos, null, 2)};
`;

  fs.writeFileSync('src/data/videos.ts', tsContent);
  console.log('Successfully generated src/data/videos.ts with ' + allVideos.length + ' videos.');
}

scrape().catch(console.error);
