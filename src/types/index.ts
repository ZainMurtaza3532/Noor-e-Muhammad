export type Language = 'en' | 'ur' | 'ar';

export type ContentCategory = 
  | 'Faith'
  | 'Prayer'
  | 'Character'
  | 'Mercy'
  | 'Knowledge'
  | 'Family'
  | 'Patience'
  | 'Forgiveness'
  | 'Brotherhood'
  | 'Charity'
  | 'Manners'
  | 'Worship'
  | 'Cleanliness'
  | 'Social'
  | 'Business Ethics'
  | 'Morning'
  | 'Evening'
  | 'Sleep'
  | 'Travel'
  | 'Parents'
  | 'Protection'
  | 'Guidance'
  | 'General';

export type MediaType = 'Naat' | 'Bayan' | 'Lecture' | 'Seerah' | 'Quran' | 'Hadith' | 'Sunnah' | 'Reminder' | 'RabiUlAwwal';

export interface HadithItem {
  id: string;
  arabic: string;
  translation: string;
  urdu?: string;
  source: string;
  reference: string;
  category: ContentCategory;
  verified: boolean;
  featured?: boolean;
  status: 'published' | 'draft' | 'archived';
  createdAt?: string;
}

export interface DuaItem {
  id: string;
  title: string;
  arabic: string;
  transliteration: string;
  english: string;
  urdu?: string;
  reference: string;
  category: ContentCategory;
  audioUrl?: string;
  featured?: boolean;
  status: 'published' | 'draft' | 'archived';
}

export interface SunnahItem {
  id: string;
  title: string;
  arabicUrdu?: string;
  englishExplanation: string;
  reference: string;
  category: ContentCategory;
  challengeDay?: number;
  featured?: boolean;
  status: 'published' | 'draft' | 'archived';
}

export interface SeerahItem {
  id: string;
  title: string;
  period: 'Birth & Early Life' | 'Childhood & Youth' | 'First Revelation' | 'Makkan Period' | 'Hijrah' | 'Madinan Period' | 'Conquest of Makkah' | 'Farewell Sermon' | 'Legacy';
  yearHijri?: string;
  yearGregorian?: string;
  description: string;
  location?: string;
  historicalSource: string;
  relatedHadithRef?: string;
  relatedQuranRef?: string;
  keyLessons: string[];
  featured?: boolean;
  status: 'published' | 'draft' | 'archived';
}

export interface MediaItem {
  id: string;
  youtubeUrl: string;
  youtubeId: string;
  title: string;
  description: string;
  thumbnail: string;
  channelName: string;
  speaker?: string;
  mediaType: MediaType;
  category: string;
  tags: string[];
  duration?: string;
  featured?: boolean;
  status: 'published' | 'draft' | 'archived';
  publishedAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'Madinah' | 'Makkah' | 'Masjid' | 'Geometric Art' | 'Quran' | 'Moon' | 'Lanterns';
  source: string;
  attribution: string;
  featured?: boolean;
  status: 'published' | 'draft' | 'archived';
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  speaker: string;
  mapLink?: string;
  registrationLink?: string;
  imageUrl?: string;
  featured?: boolean;
  status: 'published' | 'draft' | 'archived';
}

export interface SpeakerItem {
  id: string;
  name: string;
  photoUrl: string;
  biography: string;
  topic: string;
  socialLink?: string;
  featured?: boolean;
}

export interface ReminderItem {
  id: string;
  text: string;
  arabic?: string;
  translation?: string;
  type: 'Quran' | 'Hadith' | 'Sunnah' | 'Dua' | 'Dhikr' | 'Salawat' | 'General';
  reference: string;
  active: boolean;
}

export interface QuranSurah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: QuranAyah[];
}

export interface QuranAyah {
  number: number;
  text: string;
  translation: string;
  numberInSurah: number;
  juz: number;
  audioUrl?: string;
}

export interface SiteSettings {
  siteTitle: string;
  subtitle: string;
  rabiUlAwwalTargetDate: string;
  announcementBanner?: string;
  showBanner: boolean;
  primaryLanguage: Language;
  defaultTheme: 'dark' | 'night' | 'light';
  contactEmail: string;
  socialLinks: {
    youtube?: string;
    facebook?: string;
    twitter?: string;
    telegram?: string;
  };
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'content_admin' | 'editor';
  token: string;
}

export interface FrontendUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  token?: string; // JWT token simulation
  joinedAt: string;
}
