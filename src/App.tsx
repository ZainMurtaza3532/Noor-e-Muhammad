import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppRoutes } from './routes/AppRoutes';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { AudioPlayerBar } from './components/common/AudioPlayerBar';
import { CommandPalette } from './components/common/CommandPalette';
import { useAppStore } from './store/useAppStore';
import { ScrollToTop } from './components/common/ScrollToTop';

import { HelmetProvider } from 'react-helmet-async';

const AppContent: React.FC = () => {
  const location = useLocation();
  const { siteSettings } = useAppStore();

  return (
    <div className="min-h-screen overflow-x-hidden bg-islamic-deep text-islamic-cream flex flex-col font-sans w-full max-w-[100vw]">
      
      {/* Top Banner Removed as requested */}

      <Navbar />

      <main className="flex-1">
        <AppRoutes />
      </main>

      <Footer />

      <AudioPlayerBar />
      <CommandPalette />
    </div>
  );
};

export function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
