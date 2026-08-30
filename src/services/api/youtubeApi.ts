import axios from 'axios';
import type { MediaItem } from '../../types';
import { initialVideos } from '../../data/videos';

// Use an environment variable for the API key, or a fallback if not provided yet.
// NOTE: For real usage, a valid YOUTUBE_API_KEY must be placed in .env
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || '';
const BASE_URL = import.meta.env.VITE_YOUTUBE_API_URL || 'https://www.googleapis.com/youtube/v3';

export const youtubeApi = {
  /**
   * Search YouTube for latest videos related to a specific query
   */
  searchVideos: async (query: string, maxResults: number = 12, category: 'Naat' | 'Bayan' | 'Seerah' | 'Quran' | 'Kids Islamic Content' | string = 'Bayan'): Promise<MediaItem[]> => {
    // Artificial delay for loading indicator
    await new Promise(resolve => setTimeout(resolve, 600));

    // To ensure only high-quality, authentic Islamic content is shown, 
    // we use our locally curated database rather than generic YouTube search, 
    // which often returns irrelevant or inappropriate results.
    let results = initialVideos.filter(v => 
      category === 'All' ? true : (v.mediaType === category || v.category === category)
    );

    if (query) {
      const q = query.toLowerCase();
      results = results.filter(v => 
        v.title.toLowerCase().includes(q) || 
        (v.speaker && v.speaker.toLowerCase().includes(q)) || 
        (v.description && v.description.toLowerCase().includes(q))
      );
    }

    return results;
  },

  /**
   * Fetch details for a specific playlist (e.g., a specific scholar's playlist or 12 Rabi ul Awal playlist)
   */
  getPlaylistVideos: async (playlistId: string, category: 'Naat' | 'Bayan' = 'Bayan'): Promise<MediaItem[]> => {
    if (!YOUTUBE_API_KEY) {
      console.warn('YouTube API Key is missing. Returning empty playlist array.');
      return [];
    }

    try {
      const response = await axios.get(`${BASE_URL}/playlistItems`, {
        params: {
          part: 'snippet',
          playlistId,
          maxResults: 20,
          key: YOUTUBE_API_KEY
        }
      });

      return response.data.items.map((item: any) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        youtubeUrl: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
        mediaType: category as any,
        category: category as string,
        speaker: item.snippet.videoOwnerChannelTitle || 'Islamic Channel',
        publishedAt: item.snippet.publishedAt.split('T')[0]
      }));
    } catch (error) {
      console.error('Error fetching YouTube playlist:', error);
      return [];
    }
  }
};
