import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Video, 
  BookOpen, 
  Heart, 
  Sparkles, 
  History, 
  Calendar, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Globe,
  Home
} from 'lucide-react';

import { useAppStore } from '../../store/useAppStore';

export const AdminLayout: React.FC = () => {
  const { adminUser, logoutAdmin } = useAppStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!adminUser) {
    return (
      <div className="min-h-screen bg-islamic-deep text-islamic-cream flex items-center justify-center p-4">
        <div className="text-center space-y-4 glass-card p-8 rounded-3xl border border-islamic-gold/40">
          <h2 className="font-serif text-xl font-bold text-islamic-gold">Unauthorized Access</h2>
          <p className="text-xs text-islamic-cream/70">Please log in with admin credentials to access the CMS dashboard.</p>
          <Link to="/admin/login" className="inline-block px-5 py-2.5 rounded-xl bg-islamic-gold text-islamic-deep font-bold text-xs">
            Go to Admin Login
          </Link>
        </div>
      </div>
    );
  }

  const sidebarLinks = [
    { name: 'Dashboard Overview', path: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'YouTube Media & Videos', path: '/admin/videos', icon: <Video className="w-4 h-4" /> },
    { name: 'Hadith Management', path: '/admin/hadith', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Dua Management', path: '/admin/duas', icon: <Heart className="w-4 h-4" /> },
    { name: 'Sunnah Management', path: '/admin/sunnah', icon: <Sparkles className="w-4 h-4" /> },
    { name: 'Seerah Management', path: '/admin/seerah', icon: <History className="w-4 h-4" /> },
    { name: 'Events Management', path: '/admin/events', icon: <Calendar className="w-4 h-4" /> },
    { name: 'Gallery Management', path: '/admin/gallery', icon: <ImageIcon className="w-4 h-4" /> },
    { name: 'Site Settings', path: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-islamic-deep text-islamic-cream flex font-sans">
      
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 rtl:right-0 rtl:left-auto z-40 w-64 bg-islamic-primary/95 border-r rtl:border-l rtl:border-r-0 border-islamic-gold/30 p-4 flex flex-col justify-between transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 rtl:translate-x-full rtl:lg:translate-x-0'
      }`}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
              <img src="/crescent.svg" alt="Noor Logo" className="w-7 h-7" />
              <span className="font-arabic font-bold text-lg text-gold-gradient">نورِ محمد Admin</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-islamic-cream/60">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1 text-xs font-serif">
            {sidebarLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-3 rtl:space-x-reverse px-3 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-islamic-gold/20 text-islamic-gold border border-islamic-gold/40 font-bold shadow-gold-glow'
                      : 'text-islamic-cream/80 hover:text-islamic-gold hover:bg-islamic-deep/60'
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Logout */}
        <div className="pt-4 border-t border-islamic-gold/20 space-y-2">
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-xl text-xs text-islamic-cream/70 hover:text-islamic-gold">
            <Home className="w-4 h-4" />
            <span>View Live Website</span>
          </Link>
          <button
            onClick={() => {
              logoutAdmin();
              navigate('/admin/login');
            }}
            className="w-full flex items-center space-x-2 rtl:space-x-reverse px-3 py-2.5 rounded-xl text-xs font-serif font-bold text-red-400 bg-red-950/30 hover:bg-red-900/50 border border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 rtl:lg:pr-64 rtl:lg:pl-0 min-h-screen flex flex-col">
        
        {/* Admin Header */}
        <header className="sticky top-0 z-30 bg-islamic-deep/95 backdrop-blur-md border-b border-islamic-gold/20 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-islamic-cream">
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="font-serif text-sm font-bold text-islamic-gold">
              Role: <span className="uppercase text-islamic-cream font-mono text-xs">{adminUser.role}</span>
            </h2>
          </div>

          <div className="flex items-center space-x-3 rtl:space-x-reverse text-xs text-islamic-cream/80 font-serif">
            <span>{adminUser.email}</span>
          </div>
        </header>

        <main className="p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
