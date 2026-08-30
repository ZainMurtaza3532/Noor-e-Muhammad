import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bookmark,
  Menu,
  X,
  ChevronDown,
  BookOpen,
  GraduationCap,
  Users,
  Video,
  Layers,
  User,
  Settings,
  ArrowRight,
  BookMarked
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const Navbar: React.FC = () => {
  const { setSearchOpen, bookmarks, authUser, logoutUser } = useAppStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const directLinks = [
    { name: 'About Us', path: '/about', icon: Users },
  ];

  const navigationGroups = useMemo(() => [
    {
      id: 'resources',
      label: 'Islamic Resources',
      icon: BookMarked,
      links: [
        { name: 'Quran', path: '/quran', desc: 'Read & Listen to the Holy Quran' },
        { name: 'Hadith', path: '/ahadith', desc: 'Authentic Prophetic Traditions' },
        { name: 'Duas', path: '/duas', desc: 'Supplications for daily life' }
      ]
    },
    {
      id: 'media',
      label: 'Media & Tools',
      icon: Video,
      links: [
        { name: 'Live TV', path: '/live-tv', desc: 'Madani Channel Live' },
        { name: 'Islamic Videos', path: '/videos', desc: 'Educational Video Library' },
        { name: 'Seerah Timeline', path: '/timeline', desc: 'Life of the Prophet ﷺ' },
        { name: 'Prayer Times', path: '/prayer-times', desc: 'Local Namaz Timings' },
        { name: 'Digital Tasbeeh', path: '/tools', desc: 'Counter Tool' }
      ]
    }
  ], []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-islamic-deep/98 backdrop-blur-md border-b border-islamic-gold/20 shadow-md py-3 px-4 lg:px-10'
          : 'bg-islamic-deep py-6 px-4 lg:px-10'
        }`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">

          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse group shrink-0 outline-none">
            <div className="w-10 h-10 rounded-lg bg-islamic-gold flex items-center justify-center shadow-gold-glow">
              <BookOpen className="w-6 h-6 text-islamic-deep" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl text-islamic-cream tracking-wide leading-none">
                Noor-e-Muhammad
              </span>
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-islamic-gold mt-1">
                Online Islamic Academy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center space-x-1 xl:space-x-2 rtl:space-x-reverse shrink-0">
            <Link
              to="/"
              className={`px-3 xl:px-4 py-2 text-[13px] xl:text-[14px] font-sans font-medium transition-all duration-300 whitespace-nowrap border-b-2 ${location.pathname === '/'
                  ? 'text-islamic-gold border-islamic-gold'
                  : 'text-islamic-cream/80 hover:text-islamic-gold border-transparent hover:border-islamic-gold/30'
                }`}
            >
              Home
            </Link>

            {directLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 xl:px-4 py-2 text-[13px] xl:text-[14px] font-sans font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-2 border-b-2 ${isActive
                      ? 'text-islamic-gold border-islamic-gold'
                      : 'text-islamic-cream/80 hover:text-islamic-gold border-transparent hover:border-islamic-gold/30'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {navigationGroups.map((group) => {
              const hasActiveChild = group.links.some(l => location.pathname === l.path);
              const isActiveDropdown = activeDropdown === group.id;

              return (
                <div
                  key={group.id}
                  className="relative group/nav"
                  onMouseEnter={() => setActiveDropdown(group.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    aria-expanded={isActiveDropdown}
                    className={`px-3 xl:px-4 py-2 text-[13px] xl:text-[14px] font-sans font-medium transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap border-b-2 ${hasActiveChild
                        ? 'text-islamic-gold border-islamic-gold'
                        : 'text-islamic-cream/80 hover:text-islamic-gold border-transparent hover:border-islamic-gold/30'
                      }`}
                  >
                    <span>{group.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isActiveDropdown ? 'rotate-180 text-islamic-gold' : hasActiveChild ? 'text-islamic-gold' : 'text-islamic-cream/60'}`} />
                  </button>

                  <AnimatePresence>
                    {isActiveDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 pt-2 w-[340px] z-50"
                      >
                        <div className="bg-white rounded-2xl p-4 shadow-2xl border border-islamic-border flex flex-col gap-2 relative overflow-hidden">
                          {group.links.map((sub) => {
                            const isSubActive = location.pathname === sub.path;
                            return (
                              <Link
                                key={sub.path}
                                to={sub.path}
                                className={`p-3.5 rounded-xl block text-left rtl:text-right transition-all duration-300 group/link relative overflow-hidden z-10 ${isSubActive
                                    ? 'bg-islamic-accent border border-islamic-gold/20'
                                    : 'border border-transparent hover:bg-islamic-cream'
                                  }`}
                              >
                                <div className="font-serif text-[15px] font-bold text-islamic-deep flex items-center justify-between relative z-10">
                                  <span className={`transition-colors ${isSubActive ? 'text-islamic-gold' : 'group-hover/link:text-islamic-primary'}`}>{sub.name}</span>
                                  <ArrowRight className={`w-4 h-4 transition-all duration-300 ${isSubActive ? 'text-islamic-gold' : 'text-transparent group-hover/link:text-islamic-gold/80 -translate-x-3 group-hover/link:translate-x-0'}`} />
                                </div>
                                <p className="text-xs text-gray-500 font-sans mt-1.5 relative z-10">{sub.desc}</p>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4 rtl:space-x-reverse shrink-0">

            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-full bg-white/10 text-islamic-cream hover:bg-white/20 transition-all duration-300"
              aria-label="Search"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            <Link
              to="/bookmarks"
              className="relative p-2.5 rounded-full bg-white/10 text-islamic-cream hover:bg-white/20 transition-all duration-300"
              aria-label="View Bookmarks"
            >
              <Bookmark className="w-4.5 h-4.5" />
              {bookmarks.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 border-2 border-islamic-deep text-white text-[10px] font-bold flex items-center justify-center">
                  {bookmarks.length}
                </span>
              )}
            </Link>

            {authUser ? (
              <div className="relative group/profile ml-2">
                <button className="flex items-center gap-2 p-1.5 pl-4 pr-1.5 rounded-full bg-white/10 border border-transparent hover:border-islamic-gold/50 transition-all">
                  <span className="text-[13px] font-medium font-sans hidden sm:block text-islamic-cream">{authUser.name.split(' ')[0]}</span>
                  <div className="w-8 h-8 rounded-full bg-islamic-gold flex items-center justify-center text-islamic-deep font-bold text-sm">
                    {authUser.name.charAt(0).toUpperCase()}
                  </div>
                </button>
                <div className="absolute right-0 top-full pt-4 w-64 opacity-0 translate-y-3 group-hover/profile:opacity-100 group-hover/profile:translate-y-0 pointer-events-none group-hover/profile:pointer-events-auto transition-all duration-300 z-50">
                  <div className="bg-white rounded-2xl p-3 border border-islamic-border shadow-xl">
                    <div className="px-5 py-4 border-b border-gray-100 mb-2 text-center">
                      <p className="text-base font-bold text-islamic-deep truncate font-serif">{authUser.name}</p>
                      <p className="text-xs text-gray-500 truncate font-sans mt-0.5">{authUser.email}</p>
                    </div>
                    <Link
                      to="/settings"
                      className="flex items-center gap-3 w-full text-left px-4 py-2.5 rounded-xl text-[13px] font-sans font-medium text-gray-700 hover:text-islamic-primary hover:bg-islamic-cream transition-all"
                    >
                      <Settings className="w-4 h-4" />
                      Account Settings
                    </Link>
                    <button
                      onClick={() => logoutUser()}
                      className="flex items-center gap-3 w-full text-left px-4 py-2.5 rounded-xl text-[13px] font-sans font-medium text-red-600 hover:bg-red-50 transition-all mt-1"
                    >
                      <X className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/auth"
                className="hidden sm:flex btn-primary text-[14px]"
              >
                Sign In
              </Link>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full bg-white/10 text-islamic-cream lg:hidden transition-all duration-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden absolute top-[calc(100%+1rem)] left-4 right-4 bg-white border border-islamic-border rounded-3xl p-6 shadow-2xl overflow-y-auto space-y-7 z-50"
            style={{ maxHeight: 'calc(100vh - 130px)' }}
          >
            <Link
              to="/"
              className={`block p-4 rounded-xl font-serif text-[15px] font-bold text-center transition-all duration-300 ${location.pathname === '/'
                  ? 'bg-islamic-accent text-islamic-primary border border-islamic-gold/30'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
            >
              Home
            </Link>

            {navigationGroups.map((group) => (
              <div key={group.id} className="space-y-3">
                <h4 className="flex items-center gap-2 font-sans text-[12px] font-bold text-gray-400 uppercase tracking-wider px-2">
                  <group.icon className="w-4 h-4" />
                  {group.label}
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {group.links.map((sub) => {
                    const isSubActive = location.pathname === sub.path;
                    return (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className={`p-4 rounded-xl text-left rtl:text-right transition-all duration-300 flex items-center justify-between ${isSubActive
                            ? 'bg-islamic-accent text-islamic-primary border border-islamic-gold/20'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                          }`}
                      >
                        <div>
                          <div className="font-serif text-[14px] font-bold">{sub.name}</div>
                          <div className="text-[11px] text-gray-500 mt-1 font-sans">{sub.desc}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {!authUser && (
              <div className="pt-4 mt-2">
                <Link
                  to="/auth"
                  className="flex items-center justify-center gap-2 w-full p-4 rounded-xl btn-primary font-serif"
                >
                  <User className="w-5 h-5" />
                  Sign In
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};