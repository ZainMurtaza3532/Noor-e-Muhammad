import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Public Pages (Lazy Loaded)
const HomePage = React.lazy(() => import('../pages/HomePage').then(module => ({ default: module.HomePage })));
const SunnahPage = React.lazy(() => import('../pages/SunnahPage').then(module => ({ default: module.SunnahPage })));
const HadithPage = React.lazy(() => import('../pages/HadithPage').then(module => ({ default: module.HadithPage })));
const QuranPage = React.lazy(() => import('../pages/QuranPage').then(module => ({ default: module.QuranPage })));
const DuasPage = React.lazy(() => import('../pages/DuasPage').then(module => ({ default: module.DuasPage })));

const VideosPage = React.lazy(() => import('../pages/VideosPage').then(module => ({ default: module.VideosPage })));
const TimelinePage = React.lazy(() => import('../pages/TimelinePage').then(module => ({ default: module.TimelinePage })));
const LiveTvPage = React.lazy(() => import('../pages/LiveTvPage').then(module => ({ default: module.LiveTvPage })));
const PrayerTimesPage = React.lazy(() => import('../pages/PrayerTimesPage').then(module => ({ default: module.PrayerTimesPage })));
const ToolsPage = React.lazy(() => import('../pages/ToolsPage').then(module => ({ default: module.ToolsPage })));
const BookmarksPage = React.lazy(() => import('../pages/BookmarksPage').then(module => ({ default: module.BookmarksPage })));
const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));
const AuthPage = React.lazy(() => import('../pages/AuthPage').then(module => ({ default: module.AuthPage })));
const SettingsPage = React.lazy(() => import('../pages/SettingsPage').then(module => ({ default: module.SettingsPage })));
const AboutPage = React.lazy(() => import('../pages/AboutPage').then(module => ({ default: module.AboutPage })));



const SuspenseFallback = () => (
  <div className="min-h-screen bg-islamic-deep flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-islamic-gold border-t-transparent rounded-full animate-spin"></div>
      <p className="text-islamic-gold font-serif text-sm animate-pulse">Loading...</p>
    </div>
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/sunnah" element={<SunnahPage />} />
        <Route path="/ahadith" element={<HadithPage />} />
        <Route path="/quran" element={<QuranPage />} />
        <Route path="/duas" element={<DuasPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/live-tv" element={<LiveTvPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/prayer-times" element={<PrayerTimesPage />} />
        <Route path="/calendar" element={<ToolsPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/settings" element={<SettingsPage />} />



        {/* 404 Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};
