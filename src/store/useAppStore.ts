import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  Language, 
  HadithItem, 
  DuaItem, 
  SunnahItem, 
  MediaItem, 
  ReminderItem, 
  SiteSettings, 
  AdminUser,
  FrontendUser
} from '../types';

import { initialHadiths } from '../data/hadith';
import { initialDuas } from '../data/duas';
import { initialSunnahs } from '../data/sunnah';
import { initialBayans } from '../data/bayans';
import { initialVideos } from '../data/videos';
import { initialReminders } from '../data/reminders';
import { ISLAMIC_CONFIG } from '../config/islamicConfig';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

interface AudioState {
  title: string;
  reciter: string;
  audioUrl: string;
  isPlaying: boolean;
  playlist?: string[];
  playlistIndex?: number;
}

interface AppStore {
  // Config & UI State
  language: Language;
  theme: 'dark' | 'night';
  isSearchOpen: boolean;
  searchQuery: string;
  
  // Audio Player State
  currentAudio: AudioState | null;

  // Bookmarks & Counters
  bookmarks: string[];
  completedSunnahDays: number[];
  tasbeehCount: number;
  salawatCount: number;

  // Content Repositories (Managed by CMS)
  hadiths: HadithItem[];
  duas: DuaItem[];
  sunnahs: SunnahItem[];
  bayans: MediaItem[];
  videos: MediaItem[];
  reminders: ReminderItem[];

  // Admin & Settings State
  adminUser: AdminUser | null;
  authUser: FrontendUser | null;
  siteSettings: SiteSettings;

  // Actions
  setLanguage: (lang: Language) => void;
  setTheme: (theme: 'dark' | 'night') => void;
  setSearchOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;

  // Audio Actions
  playAudio: (title: string, reciter: string, audioUrl: string) => void;
  playPlaylist: (title: string, reciter: string, playlist: string[]) => void;
  playNextInPlaylist: () => void;
  pauseAudio: () => void;
  stopAudio: () => void;

  // Bookmark Actions
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;

  // Sunnah Challenge Actions
  toggleSunnahDay: (day: number) => void;

  // Tasbeeh & Salawat Actions
  incrementTasbeeh: () => void;
  decrementTasbeeh: () => void;
  resetTasbeeh: () => void;
  incrementSalawat: () => void;
  resetSalawat: () => void;

  // Admin CMS Actions
  loginAdmin: (email: string, role: AdminUser['role']) => void;
  logoutAdmin: () => void;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;

  // Frontend Auth Actions
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (name: string, email: string, password: string) => Promise<void>;
  logoutUser: () => void;

  // CMS Content Mutations
  addHadith: (item: Omit<HadithItem, 'id' | 'createdAt'>) => void;
  updateHadith: (id: string, item: Partial<HadithItem>) => void;
  deleteHadith: (id: string) => void;

  addDua: (item: Omit<DuaItem, 'id'>) => void;
  updateDua: (id: string, item: Partial<DuaItem>) => void;
  deleteDua: (id: string) => void;

  addSunnah: (item: Omit<SunnahItem, 'id'>) => void;
  updateSunnah: (id: string, item: Partial<SunnahItem>) => void;
  deleteSunnah: (id: string) => void;

  addMediaItem: (item: Omit<MediaItem, 'id' | 'publishedAt'>) => void;
  updateMediaItem: (id: string, item: Partial<MediaItem>) => void;
  deleteMediaItem: (id: string) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Defaults
      language: 'en',
      theme: 'dark',
      isSearchOpen: false,
      searchQuery: '',

      currentAudio: null,

      bookmarks: [],
      completedSunnahDays: [1, 2],
      tasbeehCount: 33,
      salawatCount: 100,

      // Initial Seeds
      hadiths: initialHadiths,
      duas: initialDuas,
      sunnahs: initialSunnahs,
      bayans: initialBayans,
      videos: initialVideos,
      reminders: initialReminders,

      adminUser: null,
      authUser: null,
      siteSettings: {
        siteTitle: ISLAMIC_CONFIG.titleEnglish,
        subtitle: ISLAMIC_CONFIG.subtitle,
        showBanner: true,
        announcementBanner: 'Welcome to Noor-e-Muhammad ﷺ — Online Islamic Academy.',
        primaryLanguage: 'en',
        defaultTheme: 'dark',
        contactEmail: 'contact@nooremumuhammad.islam',
        socialLinks: {
          youtube: 'https://youtube.com',
          facebook: 'https://facebook.com'
        }
      },

      // Config Setters
      setLanguage: (lang) => {
        const root = document.documentElement;
        if (lang === 'ur' || lang === 'ar') {
          root.setAttribute('dir', 'rtl');
        } else {
          root.setAttribute('dir', 'ltr');
        }
        root.setAttribute('lang', lang);
        set({ language: lang });
      },

      setTheme: (theme) => set({ theme }),
      setSearchOpen: (open) => set({ isSearchOpen: open }),
      setSearchQuery: (query) => set({ searchQuery: query }),

      // Audio Actions
      playAudio: (title, reciter, audioUrl) => {
        set({ currentAudio: { title, reciter, audioUrl, isPlaying: true } });
      },
      playPlaylist: (title, reciter, playlist) => {
        if (playlist.length === 0) return;
        set({
          currentAudio: {
            title,
            reciter,
            audioUrl: playlist[0],
            isPlaying: true,
            playlist,
            playlistIndex: 0
          }
        });
      },
      playNextInPlaylist: () => {
        const audio = get().currentAudio;
        if (audio?.playlist && audio.playlistIndex !== undefined) {
          const nextIndex = audio.playlistIndex + 1;
          if (nextIndex < audio.playlist.length) {
            set({
              currentAudio: {
                ...audio,
                audioUrl: audio.playlist[nextIndex],
                playlistIndex: nextIndex,
                isPlaying: true
              }
            });
            return;
          }
        }
        get().pauseAudio();
      },
      pauseAudio: () => {
        const audio = get().currentAudio;
        if (audio) {
          set({ currentAudio: { ...audio, isPlaying: false } });
        }
      },
      stopAudio: () => set({ currentAudio: null }),

      // Bookmark Actions
      toggleBookmark: (id) => {
        const bookmarks = get().bookmarks;
        if (bookmarks.includes(id)) {
          set({ bookmarks: bookmarks.filter(bId => bId !== id) });
        } else {
          set({ bookmarks: [...bookmarks, id] });
        }
      },
      isBookmarked: (id) => get().bookmarks.includes(id),

      // Sunnah Challenge
      toggleSunnahDay: (day) => {
        const days = get().completedSunnahDays;
        if (days.includes(day)) {
          set({ completedSunnahDays: days.filter(d => d !== day) });
        } else {
          set({ completedSunnahDays: [...days, day] });
        }
      },

      // Counters
      incrementTasbeeh: () => set(state => ({ tasbeehCount: state.tasbeehCount + 1 })),
      decrementTasbeeh: () => set(state => ({ tasbeehCount: Math.max(0, state.tasbeehCount - 1) })),
      resetTasbeeh: () => set({ tasbeehCount: 0 }),

      incrementSalawat: () => set(state => ({ salawatCount: state.salawatCount + 1 })),
      resetSalawat: () => set({ salawatCount: 0 }),

      // Admin Auth
      loginAdmin: (email, role) => {
        set({
          adminUser: {
            id: 'admin-1',
            email,
            name: 'Content Administrator',
            role,
            token: 'mock-jwt-token-noor-e-muhammad-2026'
          }
        });
      },
      logoutAdmin: () => set({ adminUser: null }),

      updateSiteSettings: (newSettings) => set(state => ({
        siteSettings: { ...state.siteSettings, ...newSettings }
      })),

      // Frontend Auth
      loginUser: async (email, password) => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          
          set({
            authUser: {
              id: user.uid,
              email: user.email || '',
              name: user.displayName || email.split('@')[0],
              token: await user.getIdToken(),
              joinedAt: user.metadata.creationTime || new Date().toISOString()
            }
          });
        } catch (error: any) {
          console.error('Firebase login error:', error);
          throw new Error(error.message || 'Login failed');
        }
      },
      registerUser: async (name, email, password) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          
          set({
            authUser: {
              id: user.uid,
              email: user.email || '',
              name: name || email.split('@')[0],
              token: await user.getIdToken(),
              joinedAt: new Date().toISOString()
            }
          });
        } catch (error: any) {
          console.error('Firebase register error:', error);
          throw new Error(error.message || 'Registration failed');
        }
      },
      logoutUser: async () => {
        try {
          await signOut(auth);
          set({ authUser: null });
        } catch (error) {
          console.error('Logout error:', error);
        }
      },

      // Content Mutations
      addHadith: (item) => {
        const newHadith: HadithItem = {
          ...item,
          id: `h-${Date.now()}`,
          createdAt: new Date().toISOString().split('T')[0]
        };
        set(state => ({ hadiths: [newHadith, ...state.hadiths] }));
      },
      updateHadith: (id, item) => {
        set(state => ({
          hadiths: state.hadiths.map(h => h.id === id ? { ...h, ...item } : h)
        }));
      },
      deleteHadith: (id) => {
        set(state => ({ hadiths: state.hadiths.filter(h => h.id !== id) }));
      },

      addDua: (item) => {
        const newDua: DuaItem = { ...item, id: `d-${Date.now()}` };
        set(state => ({ duas: [newDua, ...state.duas] }));
      },
      updateDua: (id, item) => {
        set(state => ({
          duas: state.duas.map(d => d.id === id ? { ...d, ...item } : d)
        }));
      },
      deleteDua: (id) => {
        set(state => ({ duas: state.duas.filter(d => d.id !== id) }));
      },

      addSunnah: (item) => {
        const newSunnah: SunnahItem = { ...item, id: `s-${Date.now()}` };
        set(state => ({ sunnahs: [newSunnah, ...state.sunnahs] }));
      },
      updateSunnah: (id, item) => {
        set(state => ({
          sunnahs: state.sunnahs.map(s => s.id === id ? { ...s, ...item } : s)
        }));
      },
      deleteSunnah: (id) => {
        set(state => ({ sunnahs: state.sunnahs.filter(s => s.id !== id) }));
      },

      addMediaItem: (item) => {
        const newItem: MediaItem = {
          ...item,
          id: `m-${Date.now()}`,
          publishedAt: new Date().toISOString().split('T')[0]
        };
        set(state => {
          const updatedVideos = [newItem, ...state.videos];
          const updatedBayans = item.mediaType === 'Bayan' ? [newItem, ...state.bayans] : state.bayans;
          return { videos: updatedVideos, bayans: updatedBayans };
        });
      },
      updateMediaItem: (id, item) => {
        set(state => ({
          videos: state.videos.map(v => v.id === id ? { ...v, ...item } : v),
          bayans: state.bayans.map(b => b.id === id ? { ...b, ...item } : b)
        }));
      },
      deleteMediaItem: (id) => {
        set(state => ({
          videos: state.videos.filter(v => v.id !== id),
          bayans: state.bayans.filter(b => b.id !== id)
        }));
      }


    }),
    {
      name: 'noor-e-muhammad-storage',
      partialize: (state) => ({
        bookmarks: state.bookmarks,
        completedSunnahDays: state.completedSunnahDays,
        tasbeehCount: state.tasbeehCount,
        salawatCount: state.salawatCount,
        language: state.language,
        theme: state.theme,
        hadiths: state.hadiths,
        duas: state.duas,
        sunnahs: state.sunnahs,
        videos: state.videos,
        bayans: state.bayans,
        reminders: state.reminders,
        siteSettings: state.siteSettings,
        adminUser: state.adminUser,
        authUser: state.authUser,
      })
    }
  )
);
