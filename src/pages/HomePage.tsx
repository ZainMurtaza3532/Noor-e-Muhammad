import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  BookOpen,
  Play,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  Share2,
  GraduationCap,
  Users,
  Award,
  Heart,
  Globe,
  Shield,
  Book
} from 'lucide-react';

import { useAppStore } from '../store/useAppStore';
import { TasbeehCounter } from '../components/tools/TasbeehCounter';
import { SalawatCounter } from '../components/tools/SalawatCounter';
import { BookmarkButton } from '../components/common/BookmarkButton';
import { ShareModal } from '../components/common/ShareModal';
import { IslamicPattern } from '../components/common/IslamicPattern';
import { Helmet } from 'react-helmet-async';
import { youtubeApi } from '../services/api/youtubeApi';
import type { MediaItem } from '../types';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const HomePage: React.FC = () => {
  const {
    hadiths,
    duas,
    sunnahs,
    bayans,
  } = useAppStore();

  const [apiVideos, setApiVideos] = useState<MediaItem[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoadingVideos(true);
        // Fetch the 3 latest general Islamic videos
        const data = await youtubeApi.searchVideos('', 3, 'All');
        if (data && data.length > 0) {
          setApiVideos(data.slice(0, 3));
        }
      } catch (err) {
        console.error("API error:", err);
      } finally {
        setLoadingVideos(false);
      }
    };
    
    fetchVideos();
  }, [bayans]);

  const [shareData, setShareData] = useState<{ isOpen: boolean; title: string; text: string }>({
    isOpen: false,
    title: '',
    text: ''
  });

  const openShare = (title: string, text: string) => {
    setShareData({ isOpen: true, title, text });
  };

  const featuredHadith = hadiths.find(h => h.featured) || hadiths[0];

  return (
    <div className="min-h-screen bg-islamic-cream text-gray-800 overflow-hidden font-sans">
      <Helmet>
        <title>Noor-e-Muhammad | Comprehensive Islamic Resources</title>
        <meta name="description" content="Discover the beautiful Seerah of all Prophets and Sahaba, authentic Hadith, Duas, and the Complete Holy Quran." />
      </Helmet>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-20 px-4 bg-hero-gradient overflow-hidden">
        {/* Premium Background Glow Effect (replaces the vertical lines) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex justify-center items-center opacity-30 z-0">
          <div className="absolute w-[600px] h-[600px] bg-islamic-gold/20 rounded-full blur-[100px] animate-pulse-slow mix-blend-multiply" />
          <div className="absolute w-[400px] h-[400px] bg-islamic-primary/10 rounded-full blur-[80px] animate-pulse-slow mix-blend-multiply delay-1000" />
        </div>

        {/* Main Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-5xl mx-auto text-center relative z-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center mt-12"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="mb-8 relative">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white border border-islamic-gold/20 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-islamic-gold animate-pulse"></span>
              <span className="font-sans text-[12px] font-bold text-islamic-deep tracking-widest uppercase">
                Welcome to Noor-e-Muhammad
              </span>
            </div>
          </motion.div>

          {/* Typography */}
          <motion.div variants={fadeInUp} className="relative z-20 space-y-6 max-w-4xl mx-auto">
            <h1 className="font-serif font-bold text-5xl sm:text-6xl lg:text-[5.5rem] leading-tight text-islamic-deep pb-2">
              Comprehensive <span className="text-islamic-gold block mt-2">Islamic Resources</span>
            </h1>
            <p className="font-sans text-lg sm:text-2xl text-gray-700 font-medium tracking-wide pt-4">
              Full Quran, All Hadith, Duas, & Seerah of Prophets
            </p>
            <div className="w-24 h-1 bg-islamic-gold mx-auto rounded-full opacity-80 my-8" />
            <p className="font-sans text-base sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
              Explore the complete Holy Quran with translations, authentic collections of Hadith, daily Duas, and the comprehensive Seerah of all Prophets and noble Sahaba.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12 w-full max-w-2xl mx-auto">


            <Link
              to="/seerah"
              className="w-full sm:w-auto px-10 py-4 rounded-xl btn-primary font-sans font-bold text-lg flex items-center justify-center gap-3"
            >
              <BookOpen className="w-6 h-6" />
              <span>Explore Seerah</span>
            </Link>
          </motion.div>
        </motion.div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px]">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-islamic-cream"></path>
            </svg>
        </div>
      </section>

      {/* 2. WHY CHOOSE US - Repurposed to Features */}
      <section className="py-20 px-4 bg-islamic-cream relative overflow-hidden">
        <IslamicPattern className="mb-12" opacity={0.1} />
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}
          className="max-w-6xl mx-auto text-center space-y-8 relative z-10"
        >
          <motion.div variants={fadeInUp} className="space-y-3">
            <span className="font-sans text-sm font-bold text-islamic-gold uppercase tracking-widest">
              Islamic Knowledge
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-islamic-deep">
              Complete Resources
            </h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 text-left">
            {[
              { icon: BookOpen, title: 'Complete Quran', desc: 'Read and listen to the Holy Quran with comprehensive translations.' },
              { icon: ShieldCheck, title: 'True Ahadith & Duas', desc: 'Access verified collections of Prophetic traditions and daily supplications.' },
              { icon: Play, title: 'Seerah & Videos', desc: 'Learn the Seerah of all Prophets & Sahaba and watch Islamic lectures.' }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="p-8 academy-card group">
                <div className="w-14 h-14 rounded-2xl bg-islamic-accent flex items-center justify-center text-islamic-primary mb-6 group-hover:bg-islamic-gold group-hover:text-white transition-colors duration-300">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl font-bold text-islamic-deep mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>



      {/* 4. ISLAMIC RESOURCES LIBRARY PREVIEW */}
      <section className="py-24 px-4 bg-islamic-cream relative overflow-hidden">
        <div className="absolute inset-0 bg-islamic-pattern-dark opacity-30" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-end justify-between gap-4 mb-12 border-b border-gray-200 pb-6">
              <div className="space-y-2">
                <span className="font-sans text-sm text-islamic-gold font-bold uppercase tracking-widest">Free Knowledge</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-islamic-deep">Islamic Library</h2>
              </div>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Read Quran', path: '/quran', icon: BookOpen, count: '114 Surahs' },
                { title: 'Ahadith', path: '/ahadith', icon: BookOpen, count: 'Authentic Collections' },
                { title: 'Prophetic Duas', path: '/duas', icon: Sparkles, count: 'Daily Supplications' },
                { title: 'Seerah', path: '/seerah', icon: BookOpen, count: 'Life of Prophet ﷺ' },
              ].map((item, idx) => (
                <Link to={item.path} key={idx}>
                  <motion.div variants={fadeInUp} className="p-6 academy-card group text-center flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-islamic-accent text-islamic-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <item.icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-islamic-deep mb-1 group-hover:text-islamic-gold transition-colors">{item.title}</h3>
                    <p className="text-xs text-gray-500 font-sans uppercase tracking-wider">{item.count}</p>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. HADITH OF THE DAY */}
      {featuredHadith && (
        <section className="py-24 px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="p-10 bg-white rounded-3xl border border-gray-200 shadow-xl text-center space-y-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-islamic-gold to-transparent" />

            <span className="inline-block px-6 py-2 rounded-full bg-islamic-accent text-islamic-primary font-sans font-bold text-xs uppercase tracking-widest">
              Hadith of the Day
            </span>

            <div className="space-y-6">
              <p className="font-arabic text-3xl sm:text-5xl text-islamic-deep font-bold leading-loose">
                "{featuredHadith.arabic}"
              </p>
              <p className="font-serif text-lg sm:text-xl text-gray-700 leading-relaxed italic">
                "{featuredHadith.translation}"
              </p>
            </div>

            <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 text-sm font-sans text-gray-500">
              <span className="flex items-center gap-2 font-semibold">
                <ShieldCheck className="w-5 h-5 text-islamic-gold" /> {featuredHadith.source} ({featuredHadith.reference})
              </span>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <BookmarkButton id={featuredHadith.id} />
                <button
                  onClick={() => openShare('Hadith of the Day', `${featuredHadith.translation} — ${featuredHadith.source}`)}
                  className="p-2.5 rounded-full bg-gray-50 text-gray-500 hover:text-islamic-gold hover:bg-islamic-accent transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* 5.5 IN A NUTSHELL */}
      <section className="py-32 px-4 bg-islamic-deep text-white relative overflow-hidden">
        <IslamicPattern className="absolute inset-0 opacity-[0.03] pointer-events-none" />
        
        {/* Background Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-islamic-gold/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-islamic-primary/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 flex flex-col items-center">
            <span className="font-sans text-sm font-bold text-islamic-gold uppercase tracking-[0.3em] mb-4">In A Nutshell</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight">
              The Prophet Muhammad ﷺ
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-islamic-gold to-transparent rounded-full opacity-80 mt-8 mb-6" />
            <p className="font-sans text-gray-300 text-lg max-w-2xl mx-auto font-light">
              Quick facts about the Mercy to the Worlds, showcasing his perfect character and eternal legacy.
            </p>
          </div>
          
          <motion.div 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }} 
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8"
          >
            {[
              { icon: <Heart className="w-8 h-8 text-islamic-gold" />, title: 'His Character', desc: 'Described by Aisha (RA) as "a walking Qur\'an". He was the epitome of truthfulness (Al-Sadiq) and trustworthiness (Al-Amin).' },
              { icon: <Globe className="w-8 h-8 text-islamic-gold" />, title: 'His Mission', desc: 'Sent not just to the Arabs, but as a Mercy to all the worlds (Rahmat lil-Alameen), conveying the final message of Islam.' },
              { icon: <Shield className="w-8 h-8 text-islamic-gold" />, title: 'His Forgiveness', desc: 'Forgave his staunchest enemies upon the Conquest of Makkah, showing unparalleled mercy and leadership.' },
              { icon: <Book className="w-8 h-8 text-islamic-gold" />, title: 'His Legacy', desc: 'Left behind the Holy Qur\'an and his Sunnah, guiding over 2 billion Muslims worldwide today in their daily lives.' }
            ].map((fact, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="group relative bg-white/[0.03] backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/[0.08] transition-all duration-500 overflow-hidden"
              >
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-islamic-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500">
                    {fact.icon}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-4 group-hover:text-islamic-gold transition-colors">{fact.title}</h3>
                  <p className="font-sans text-gray-300 text-sm leading-relaxed font-light">{fact.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. MEDIA & VIDEO PREVIEW */}
      <section className="py-24 px-4 bg-white border-y border-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-20 relative z-10">

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex flex-col sm:flex-row items-end justify-between gap-4 mb-10 border-b border-gray-100 pb-4">
              <div className="space-y-2">
                <span className="font-sans text-sm font-bold text-islamic-gold uppercase tracking-widest">Media Hub</span>
                <h2 className="font-serif text-3xl font-bold text-islamic-deep">Latest Lectures & Bayan</h2>
              </div>
              
              <Link 
                to="/videos" 
                className="flex items-center gap-2 text-islamic-primary font-bold hover:text-islamic-gold transition-colors text-sm uppercase tracking-wider"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {loadingVideos ? (
                <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-center py-10">
                  <div className="w-8 h-8 border-4 border-islamic-gold border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                apiVideos.map((b) => (
                  <motion.div key={b.id} variants={fadeInUp} className="academy-card overflow-hidden flex flex-col group border-0 shadow-md">
                    <div className="relative aspect-video overflow-hidden">
                      <img src={b.thumbnail} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <a
                        href={b.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center"
                      >
                        <div className="w-14 h-14 rounded-full bg-white/90 text-islamic-gold flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-7 h-7 fill-current ml-1" />
                        </div>
                      </a>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-[11px] text-islamic-gold font-sans font-bold uppercase tracking-wider bg-islamic-accent px-2 py-1 rounded">{b.category || b.mediaType}</span>
                        <h3 className="font-serif text-lg font-bold text-islamic-deep line-clamp-2 mt-3" dangerouslySetInnerHTML={{ __html: b.title }}></h3>
                        <p className="text-sm text-gray-500 mt-2">{b.speaker || 'Islamic Channel'}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* 7. DAILY INSPIRATION (HADITH OF THE DAY) */}
      <section className="py-32 px-4 bg-islamic-cream relative overflow-hidden">
        <IslamicPattern className="absolute inset-0 opacity-[0.03] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }} 
            variants={fadeInUp}
            className="relative bg-islamic-deep rounded-[3rem] p-10 md:p-20 shadow-2xl overflow-hidden text-center border border-islamic-gold/20"
          >
            {/* Ambient Background Glow inside the card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-islamic-gold/15 rounded-full blur-[120px] pointer-events-none" />
            <IslamicPattern className="absolute inset-0 opacity-10 pointer-events-none" />
            
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-islamic-gold/20 text-islamic-gold font-bold text-sm uppercase tracking-widest mb-10 border border-islamic-gold/30">
                <Sparkles className="w-5 h-5" />
                Hadith of the Day
              </span>
              <h3 className="font-arabic text-4xl md:text-5xl lg:text-7xl text-islamic-gold mb-10 leading-normal font-bold drop-shadow-md">
                {featuredHadith.arabic}
              </h3>
              
              <p className="font-serif text-2xl md:text-4xl text-white italic mb-12 leading-relaxed font-light">
                "{featuredHadith.translation}"
              </p>
              
              <div className="flex items-center justify-center gap-6 text-gray-300 font-sans">
                <div className="h-[1px] w-16 bg-islamic-gold/50" />
                <span className="text-base font-semibold tracking-wider text-islamic-gold uppercase">{featuredHadith.reference}</span>
                <div className="h-[1px] w-16 bg-islamic-gold/50" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <ShareModal
        isOpen={shareData.isOpen}
        onClose={() => setShareData({ isOpen: false, title: '', text: '' })}
        title={shareData.title}
        text={shareData.text}
      />
    </div>
  );
};
