import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Public Pages (Lazy Loaded)
const HomePage = React.lazy(() => import('../pages/HomePage').then(module => ({ default: module.HomePage })));
const SeerahPage = React.lazy(() => import('../pages/SeerahPage').then(module => ({ default: module.SeerahPage })));
const SunnahPage = React.lazy(() => import('../pages/SunnahPage').then(module => ({ default: module.SunnahPage })));
const HadithPage = React.lazy(() => import('../pages/HadithPage').then(module => ({ default: module.HadithPage })));
const QuranPage = React.lazy(() => import('../pages/QuranPage').then(module => ({ default: module.QuranPage })));
const DuasPage = React.lazy(() => import('../pages/DuasPage').then(module => ({ default: module.DuasPage })));
const NaatPage = React.lazy(() => import('../pages/NaatPage').then(module => ({ default: module.NaatPage })));
const BayanPage = React.lazy(() => import('../pages/BayanPage').then(module => ({ default: module.BayanPage })));
const VideosPage = React.lazy(() => import('../pages/VideosPage').then(module => ({ default: module.VideosPage })));
const GalleryPage = React.lazy(() => import('../pages/GalleryPage').then(module => ({ default: module.GalleryPage })));
const EventsPage = React.lazy(() => import('../pages/EventsPage').then(module => ({ default: module.EventsPage })));
const ToolsPage = React.lazy(() => import('../pages/ToolsPage').then(module => ({ default: module.ToolsPage })));
const ArticlesPage = React.lazy(() => import('../pages/ArticlesPage').then(module => ({ default: module.ArticlesPage })));
const ArticleDetailPage = React.lazy(() => import('../pages/ArticleDetailPage').then(module => ({ default: module.ArticleDetailPage })));
const BookmarksPage = React.lazy(() => import('../pages/BookmarksPage').then(module => ({ default: module.BookmarksPage })));
const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));
const AuthPage = React.lazy(() => import('../pages/AuthPage').then(module => ({ default: module.AuthPage })));
const SettingsPage = React.lazy(() => import('../pages/SettingsPage').then(module => ({ default: module.SettingsPage })));
const AboutProphetPage = React.lazy(() => import('../pages/AboutProphetPage').then(module => ({ default: module.AboutProphetPage })));

// Admin CMS Pages & Layout (Lazy Loaded)
const AdminLogin = React.lazy(() => import('../admin/pages/AdminLogin').then(module => ({ default: module.AdminLogin })));
const AdminLayout = React.lazy(() => import('../admin/layouts/AdminLayout').then(module => ({ default: module.AdminLayout })));
const AdminDashboard = React.lazy(() => import('../admin/pages/AdminDashboard').then(module => ({ default: module.AdminDashboard })));
const AdminVideos = React.lazy(() => import('../admin/pages/AdminVideos').then(module => ({ default: module.AdminVideos })));
const AdminHadith = React.lazy(() => import('../admin/pages/AdminHadith').then(module => ({ default: module.AdminHadith })));
const AdminDuas = React.lazy(() => import('../admin/pages/AdminDuas').then(module => ({ default: module.AdminDuas })));
const AdminSunnah = React.lazy(() => import('../admin/pages/AdminSunnah').then(module => ({ default: module.AdminSunnah })));
const AdminSeerah = React.lazy(() => import('../admin/pages/AdminSeerah').then(module => ({ default: module.AdminSeerah })));
const AdminEvents = React.lazy(() => import('../admin/pages/AdminEvents').then(module => ({ default: module.AdminEvents })));
const AdminGallery = React.lazy(() => import('../admin/pages/AdminGallery').then(module => ({ default: module.AdminGallery })));
const AdminSettings = React.lazy(() => import('../admin/pages/AdminSettings').then(module => ({ default: module.AdminSettings })));

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
        <Route path="/seerah" element={<SeerahPage />} />
        <Route path="/sunnah" element={<SunnahPage />} />
        <Route path="/ahadith" element={<HadithPage />} />
        <Route path="/quran" element={<QuranPage />} />
        <Route path="/duas" element={<DuasPage />} />
        <Route path="/naat" element={<NaatPage />} />
        <Route path="/bayan" element={<BayanPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/prayer-times" element={<ToolsPage />} />
        <Route path="/calendar" element={<ToolsPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:id" element={<ArticleDetailPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/about-prophet" element={<AboutProphetPage />} />

        {/* Admin Login (Public) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin CMS Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="videos" element={<AdminVideos />} />
          <Route path="hadith" element={<AdminHadith />} />
          <Route path="duas" element={<AdminDuas />} />
          <Route path="sunnah" element={<AdminSunnah />} />
          <Route path="seerah" element={<AdminSeerah />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};
