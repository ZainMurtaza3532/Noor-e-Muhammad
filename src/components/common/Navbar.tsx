import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bookmark,
  Menu,
  X,
  Shield,
  Globe,
  ChevronDown,
  BookOpen,
  Sparkles,
  Heart,
  Video,
  Calendar,
  Layers,
  Image as ImageIcon,
  User,
  Settings,
  ArrowRight
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { getTranslation } from '../../i18n';

export const Navbar: React.FC = () => {
  const { language, setLanguage, setSearchOpen, bookmarks, authUser, logoutUser } = useAppStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hijriDate, setHijriDate] = useState('');

  const location = useLocation();
  const t = getTranslation(language);

  // Scroll and Date Initialization
  useEffect(() => {
    const handleScroll = () => {
      // React automatically bails out if the boolean value hasn't changed
      setScrolled(window.scrollY > 20);
    };

    // { passive: true } offloads scrolling to the browser's compositor thread for 60fps performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Set Islamic Date securely
    try {
      const today = new Date();
      const formatter = new Intl.DateTimeFormat('en-US-u-ca-islamic', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
      const formattedDate = formatter.format(today);
      // Ensure 'AH' is only appended if not already present
      setHijriDate(formattedDate.includes('AH') ? formattedDate : `${formattedDate} AH`);
    } catch (e) {
      // Fallback in case a specific browser doesn't support the islamic calendar format
      setHijriDate('');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Define direct links and dropdowns
  const directLinks = [
    { name: t.nav?.quran || 'Quran', path: '/quran', icon: BookOpen },
    { name: t.nav?.ahadith || 'Hadith', path: '/ahadith', icon: BookOpen },
    { name: t.nav?.duas || 'Duas', path: '/duas', icon: Heart },
  ];

  const navigationGroups = useMemo(() => [
    {
      id: 'media',
      label: 'Media',
      icon: Video,
      links: [
        { name: t.nav?.naat || 'Naat', path: '/naat', desc: 'Auditory Praises' },
        { name: t.nav?.videos || 'Islamic Videos', path: '/videos', desc: 'Video Hub' },
        { name: t.nav?.bayan || 'Bayan', path: '/bayan', desc: 'Lectures' },
        { name: t.nav?.gallery || 'Gallery', path: '/gallery', desc: 'Islamic Art' }
      ]
    },
    {
      id: 'more',
      label: 'More',
      icon: Layers,
      links: [
        { name: t.nav?.seerah || 'Seerah', path: '/seerah', desc: 'Life of Prophet ﷺ' },
        { name: 'About Prophet ﷺ', path: '/about-prophet', desc: 'Lineage & Character' },
        { name: t.nav?.sunnah || 'Sunnah', path: '/sunnah', desc: 'Prophetic Habits' },
        { name: t.nav?.events || 'Events', path: '/events', desc: 'Islamic Calendar' },
        { name: t.nav?.tools || 'Tasbeeh & Tools', path: '/tools', desc: 'Digital Tasbeeh' },
        { name: 'Articles', path: '/articles', desc: 'Islamic Literature' }
      ]
    }
  ], [t.nav]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-islamic-deep/95 backdrop-blur-md border-b border-islamic-gold/20 shadow-md py-3 px-4 lg:px-10'
          : 'bg-transparent py-6 px-4 lg:px-10'
        }`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">

          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse group shrink-0 outline-none">
            <span className="font-arabic text-3xl text-islamic-gold drop-shadow-md pb-1">🌙</span>
            <div className="flex flex-col">
              <span className="font-arabic font-bold text-lg text-islamic-gold tracking-wide leading-none">
                نورِ محمد ﷺ
              </span>
              <span className="font-serif text-[9px] font-bold uppercase tracking-[0.2em] text-islamic-cream/80 mt-1">
                The Light of Mercy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center space-x-1 xl:space-x-2 rtl:space-x-reverse shrink-0">
            <Link
              to="/"
              className={`px-3 xl:px-4 py-2 text-[13px] xl:text-[14px] font-serif font-bold transition-all duration-300 whitespace-nowrap border-b-2 ${location.pathname === '/'
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
                  className={`px-3 xl:px-4 py-2 text-[13px] xl:text-[14px] font-serif font-bold transition-all duration-300 whitespace-nowrap flex items-center gap-2 border-b-2 ${isActive
                      ? 'text-islamic-gold border-islamic-gold'
                      : 'text-islamic-cream/80 hover:text-islamic-gold border-transparent hover:border-islamic-gold/30'
                    }`}
                >
                  <link.icon className={`w-4 h-4 ${isActive ? 'text-islamic-gold' : 'text-islamic-gold/60'}`} />
                  {link.name}
                </Link>
              );
            })}

            {navigationGroups.map((group) => {
              const GroupIcon = group.icon;
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
                    className={`px-3 xl:px-4 py-2 text-[13px] xl:text-[14px] font-serif font-bold transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap border-b-2 ${hasActiveChild
                        ? 'text-islamic-gold border-islamic-gold'
                        : 'text-islamic-cream/80 hover:text-islamic-gold border-transparent hover:border-islamic-gold/30'
                      }`}
                  >
                    <GroupIcon className={`w-4 h-4 transition-colors ${hasActiveChild ? 'text-islamic-deep' : 'text-islamic-gold/80 group-hover/nav:text-islamic-gold'}`} />
                    <span>{group.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isActiveDropdown ? 'rotate-180 text-islamic-gold' : hasActiveChild ? 'text-islamic-deep/80' : 'text-islamic-gold/60'}`} />
                  </button>

                  {/* Mega Dropdown Panel */}
                  <AnimatePresence>
                    {isActiveDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 pt-2 w-[340px] z-50"
                      >
                        <div className="bg-islamic-deep rounded-[2rem] p-4 shadow-2xl border border-islamic-gold/20 flex flex-col gap-2 relative overflow-hidden">
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-islamic-gold/40" />

                          {group.links.map((sub) => {
                            const isSubActive = location.pathname === sub.path;
                            return (
                              <Link
                                key={sub.path}
                                to={sub.path}
                                className={`p-3.5 rounded-2xl block text-left rtl:text-right transition-all duration-300 group/link relative overflow-hidden z-10 ${isSubActive
                                    ? 'bg-islamic-gold/20 border border-islamic-gold/40'
                                    : 'border border-transparent hover:bg-islamic-gold/10'
                                  }`}
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-islamic-gold/0 via-islamic-gold/10 to-islamic-gold/0 -translate-x-full group-hover/link:translate-x-full transition-transform duration-700 ease-in-out" />
                                <div className="font-serif text-[15px] font-bold text-islamic-cream flex items-center justify-between relative z-10">
                                  <span className={`transition-colors ${isSubActive ? 'text-islamic-gold' : 'group-hover/link:text-islamic-gold'}`}>{sub.name}</span>
                                  {isSubActive ? (
                                    <span className="w-2 h-2 rounded-full bg-islamic-gold shadow-[0_0_10px_rgba(212,175,55,1)] animate-pulse" />
                                  ) : (
                                    <ArrowRight className="w-4 h-4 text-islamic-gold/0 group-hover/link:text-islamic-gold/80 -translate-x-3 group-hover/link:translate-x-0 transition-all duration-300" />
                                  )}
                                </div>
                                <p className="text-xs text-islamic-cream/60 font-sans mt-1.5 relative z-10 group-hover/link:text-islamic-cream/80 transition-colors">{sub.desc}</p>
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
          <div className="flex items-center space-x-1 sm:space-x-3 rtl:space-x-reverse shrink-0">

            <button
              onClick={() => setSearchOpen(true)}
              className="p-3 rounded-full bg-islamic-primary/40 text-islamic-cream/90 hover:text-islamic-deep hover:bg-gradient-to-tr hover:from-islamic-gold hover:to-yellow-500 border border-islamic-gold/20 hover:border-islamic-gold transition-all duration-300 flex items-center justify-center group shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]"
              aria-label="Search"
              title="Search Ctrl+K"
            >
              <Search className="w-4.5 h-4.5 group-hover:scale-110 transition-transform duration-300" />
            </button>

            <Link
              to="/bookmarks"
              className="relative p-3 rounded-full bg-islamic-primary/40 text-islamic-cream/90 hover:text-islamic-deep hover:bg-gradient-to-tr hover:from-islamic-gold hover:to-yellow-500 border border-islamic-gold/20 hover:border-islamic-gold transition-all duration-300 flex items-center justify-center group shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]"
              aria-label="View Bookmarks"
              title="View Bookmarks"
            >
              <Bookmark className="w-4.5 h-4.5 group-hover:scale-110 transition-transform duration-300" />
              {bookmarks.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 border-2 border-islamic-deep text-white text-[10px] font-bold flex items-center justify-center shadow-[0_0_10px_rgba(239,68,68,0.6)] animate-bounce">
                  {bookmarks.length}
                </span>
              )}
            </Link>

            {/* Auth / Profile Switcher */}
            {authUser ? (
              <div className="relative group/profile ml-2">
                <button
                  className="flex items-center gap-2 p-1.5 pl-4 pr-1.5 rounded-full bg-islamic-primary/50 border border-islamic-gold/30 hover:border-islamic-gold hover:bg-islamic-primary/70 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                  title="User Profile"
                >
                  <span className="text-[13px] font-bold font-serif hidden sm:block text-islamic-cream">{authUser.name.split(' ')[0]}</span>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-islamic-gold to-yellow-500 flex items-center justify-center text-islamic-deep font-bold text-sm shadow-inner">
                    {authUser.name.charAt(0).toUpperCase()}
                  </div>
                </button>
                <div className="absolute right-0 top-full pt-4 w-64 opacity-0 translate-y-3 group-hover/profile:opacity-100 group-hover/profile:translate-y-0 pointer-events-none group-hover/profile:pointer-events-auto transition-all duration-300 z-50">
                  <div className="bg-islamic-deep/98 backdrop-blur-3xl rounded-3xl p-3 border border-islamic-gold/30 shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
                    <div className="px-5 py-4 border-b border-islamic-gold/15 mb-3 text-center">
                      <p className="text-base font-bold text-islamic-gold truncate font-serif">{authUser.name}</p>
                      <p className="text-xs text-islamic-cream/60 truncate font-sans mt-0.5">{authUser.email}</p>
                    </div>
                    <Link
                      to="/settings"
                      className="flex items-center gap-3 w-full text-left rtl:text-right px-5 py-3 rounded-2xl text-[13px] font-sans font-medium text-islamic-cream/90 hover:text-islamic-gold hover:bg-islamic-gold/15 transition-all"
                    >
                      <Settings className="w-4 h-4" />
                      Account Settings
                    </Link>
                    <button
                      onClick={() => logoutUser()}
                      className="flex items-center gap-3 w-full text-left rtl:text-right px-5 py-3 rounded-2xl text-[13px] font-sans font-medium text-red-400 hover:text-white hover:bg-red-500/20 transition-all mt-1"
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
                className="hidden sm:flex px-6 py-3 rounded-full bg-gradient-to-r from-islamic-gold to-yellow-500 hover:from-yellow-400 hover:to-islamic-gold text-islamic-deep font-bold text-[14px] shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.7)] transition-all duration-300 items-center gap-2 hover:-translate-y-0.5 ml-2 font-serif tracking-wide whitespace-nowrap shrink-0"
              >
                <User className="w-4 h-4 shrink-0" />
                <span>Sign In</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 rounded-full bg-islamic-primary/50 text-islamic-cream hover:text-islamic-deep hover:bg-islamic-gold border border-islamic-gold/30 lg:hidden transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.3)]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden absolute top-[calc(100%+1rem)] left-4 right-4 bg-islamic-deep border border-islamic-gold/20 rounded-[2.5rem] p-6 shadow-2xl overflow-y-auto space-y-7 z-50"
            style={{ maxHeight: 'calc(100vh - 130px)' }}
          >
            <Link
              to="/"
              className={`block p-4 rounded-2xl font-serif text-[15px] font-bold text-center border transition-all duration-300 ${location.pathname === '/'
                  ? 'bg-gradient-to-r from-islamic-gold/20 to-islamic-gold/10 text-islamic-gold border-islamic-gold/50 shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                  : 'bg-islamic-primary/20 text-islamic-cream border-transparent hover:bg-islamic-primary/40'
                }`}
            >
              Home
            </Link>

            {navigationGroups.map((group) => (
              <div key={group.id} className="space-y-4">
                <h4 className="flex items-center gap-2 font-serif text-[12px] font-bold text-islamic-gold/80 uppercase tracking-widest px-2 border-b border-islamic-gold/10 pb-2">
                  <group.icon className="w-4 h-4" />
                  {group.label}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {group.links.map((sub) => {
                    const isSubActive = location.pathname === sub.path;
                    return (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className={`p-4 rounded-2xl text-left rtl:text-right border transition-all duration-300 flex items-center justify-between group/mob ${isSubActive
                            ? 'bg-islamic-gold/15 text-islamic-gold border-islamic-gold/40 shadow-inner'
                            : 'bg-islamic-primary/20 text-islamic-cream border-transparent hover:bg-islamic-gold/10 hover:border-islamic-gold/20'
                          }`}
                      >
                        <div>
                          <div className={`font-serif text-[14px] font-bold transition-colors ${isSubActive ? '' : 'group-hover/mob:text-islamic-goldLight'}`}>{sub.name}</div>
                          <div className="text-[11px] opacity-60 mt-1.5 font-sans leading-tight">{sub.desc}</div>
                        </div>
                        {isSubActive && <div className="w-2 h-2 rounded-full bg-islamic-gold animate-pulse shadow-[0_0_10px_rgba(212,175,55,1)] shrink-0" />}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {!authUser && (
              <div className="pt-6 border-t border-islamic-gold/20 mt-2">
                <Link
                  to="/auth"
                  className="flex items-center justify-center gap-2 w-full p-4 rounded-2xl bg-gradient-to-r from-islamic-gold to-yellow-500 text-islamic-deep font-bold text-[15px] shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all font-serif"
                >
                  <User className="w-5 h-5" />
                  Sign In to Platform
                </Link>
              </div>
            )}

            <div className="pt-4 pb-2 flex flex-col items-center justify-center opacity-40">
              <span className="text-[12px] text-islamic-gold font-arabic tracking-widest drop-shadow-md mb-1">نورِ محمد ﷺ</span>
              {hijriDate && <span className="text-[10px] text-islamic-cream font-serif">{hijriDate}</span>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};