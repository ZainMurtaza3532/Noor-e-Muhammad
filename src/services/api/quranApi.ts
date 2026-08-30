import axios from 'axios';

const BASE_URL = import.meta.env.VITE_QURAN_API_URL || 'https://api.alquran.cloud/v1';

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | object;
  audio?: string;
  translation?: string; // English
  urduTranslation?: string; // Urdu
  surah?: Surah;
}

export interface Juz {
  number: number;
  ayahs: Ayah[];
  surahs: { [key: string]: Surah };
}

export const quranApi = {
  // Fetch all Surahs metadata
  getSurahs: async (): Promise<Surah[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/surah`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching Surahs:', error);
      throw error;
    }
  },

  // Fetch a specific Surah with Ayahs (Arabic text + English + Urdu + Audio)
  getSurah: async (surahNumber: number): Promise<{ surah: Surah; ayahs: Ayah[] }> => {
    try {
      // Fetch metadata and arabic
      const [surahRes, arRes] = await Promise.all([
        axios.get(`${BASE_URL}/surah/${surahNumber}`),
        axios.get(`${BASE_URL}/surah/${surahNumber}/ar.alafasy`)
      ]);
      
      const surahData = surahRes.data.data;
      const arAyahs = arRes.data.data.ayahs;
      
      let enAyahs: any[] = [];
      let urAyahs: any[] = [];

      // Try fetching English, fallback to empty array on failure
      try {
        const enRes = await axios.get(`${BASE_URL}/surah/${surahNumber}/en.asad`);
        enAyahs = enRes.data.data.ayahs;
      } catch (err) {
        console.warn('English translation failed to load.');
      }

      // Try fetching Urdu, fallback to empty array on failure
      try {
        const urRes = await axios.get(`${BASE_URL}/surah/${surahNumber}/ur.jalandhry`);
        urAyahs = urRes.data.data.ayahs;
      } catch (err) {
        console.warn('Urdu translation failed to load.');
      }

      const ayahs: Ayah[] = [];
      for (let i = 0; i < arAyahs.length; i++) {
        ayahs.push({
          ...arAyahs[i],
          translation: enAyahs[i] ? enAyahs[i].text : "Translation unavailable",
          urduTranslation: urAyahs[i] ? urAyahs[i].text : "اردو ترجمہ دستیاب نہیں",
          audio: arAyahs[i].audio
        });
      }

      return {
        surah: {
          number: surahData.number,
          name: surahData.name,
          englishName: surahData.englishName,
          englishNameTranslation: surahData.englishNameTranslation,
          numberOfAyahs: surahData.numberOfAyahs,
          revelationType: surahData.revelationType,
        },
        ayahs
      };
    } catch (error) {
      console.error(`Error fetching Surah ${surahNumber}:`, error);
      throw error;
    }
  },

  getJuz: async (juzNumber: number): Promise<Juz> => {
    try {
      // Fetch Juz metadata and Arabic text
      const [juzRes, arRes] = await Promise.all([
        axios.get(`${BASE_URL}/juz/${juzNumber}`),
        axios.get(`${BASE_URL}/juz/${juzNumber}/ar.alafasy`)
      ]);
      
      const arAyahs = arRes.data.data.ayahs;
      const surahs = juzRes.data.data.surahs;
      
      let enAyahs: any[] = [];
      let urAyahs: any[] = [];

      try {
        const enRes = await axios.get(`${BASE_URL}/juz/${juzNumber}/en.asad`);
        enAyahs = enRes.data.data.ayahs;
      } catch (err) {
        console.warn('English translation failed to load.');
      }

      try {
        const urRes = await axios.get(`${BASE_URL}/juz/${juzNumber}/ur.jalandhry`);
        urAyahs = urRes.data.data.ayahs;
      } catch (err) {
        console.warn('Urdu translation failed to load.');
      }

      const ayahs: Ayah[] = [];
      for (let i = 0; i < arAyahs.length; i++) {
        ayahs.push({
          ...arAyahs[i],
          translation: enAyahs[i] ? enAyahs[i].text : "Translation unavailable",
          urduTranslation: urAyahs[i] ? urAyahs[i].text : "اردو ترجمہ دستیاب نہیں",
          audio: arAyahs[i].audio
        });
      }

      return {
        number: juzNumber,
        ayahs,
        surahs
      };
    } catch (error) {
      console.error(`Error fetching Juz ${juzNumber}:`, error);
      throw error;
    }
  }
};
