import axios from 'axios';

// Using open API for Hadith
const BASE_URL = import.meta.env.VITE_HADITH_API_URL || 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions';

export interface HadithItem {
  hadithnumber: number;
  arabicnumber: number;
  text: string; // Arabic text
  translation: string; // English translation
  grades: { name: string; grade: string }[];
  reference: { book: number; hadith: number };
}

export const hadithApi = {
  getCollections: async (): Promise<{ [key: string]: { name: string, collection: string } }> => {
    try {
      const response = await axios.get(`${BASE_URL}.json`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Hadith collections:', error);
      throw error;
    }
  },

  getHadithsByCollection: async (collectionBase: string = 'bukhari', limit: number = 50): Promise<HadithItem[]> => {
    try {
      // Fetch both Arabic and English simultaneously
      const [arabicRes, englishRes] = await Promise.all([
        axios.get(`${BASE_URL}/ara-${collectionBase}.json`),
        axios.get(`${BASE_URL}/eng-${collectionBase}.json`)
      ]);

      const arabicHadiths = arabicRes.data.hadiths;
      const englishHadiths = englishRes.data.hadiths;

      const mergedHadiths: HadithItem[] = [];

      // Merge based on array index (as both endpoints return matching arrays for the same collection)
      const maxLimit = Math.min(limit, arabicHadiths.length);
      
      for (let i = 0; i < maxLimit; i++) {
        const arabicItem = arabicHadiths[i];
        const englishItem = englishHadiths[i];
        
        mergedHadiths.push({
          hadithnumber: arabicItem.hadithnumber,
          arabicnumber: arabicItem.arabicnumber,
          text: arabicItem.text,
          translation: englishItem ? englishItem.text : "Translation not available.",
          grades: arabicItem.grades || [],
          reference: arabicItem.reference
        });
      }

      return mergedHadiths;
    } catch (error) {
      console.error(`Error fetching Hadiths for ${collectionBase}:`, error);
      throw error;
    }
  }
};
