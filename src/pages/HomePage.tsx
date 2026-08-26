import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  BookOpen,
  Heart,
  Play,
  ExternalLink,
  ShieldCheck,
  Calendar,
  ArrowRight,
  Share2
} from 'lucide-react';

import { useAppStore } from '../store/useAppStore';
import { CountdownTimer } from '../components/home/CountdownTimer';
import { TasbeehCounter } from '../components/tools/TasbeehCounter';
import { SalawatCounter } from '../components/tools/SalawatCounter';
import { BookmarkButton } from '../components/common/BookmarkButton';
import { ShareModal } from '../components/common/ShareModal';
import { IslamicPattern } from '../components/common/IslamicPattern';
import { ISLAMIC_CONFIG } from '../config/islamicConfig';

// High-Performance Hero Background
const HeroBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-radial-gradient from-islamic-gold/10 to-transparent opacity-40 translate-x-1/3 -translate-y-1/3" />
    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-radial-gradient from-emerald-500/10 to-transparent opacity-40 -translate-x-1/3 translate-y-1/3" />
  </div>
);

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } }
};

import { Helmet } from 'react-helmet-async';

export const HomePage: React.FC = () => {
  const {
    hadiths,
    duas,
    sunnahs,
    seerah,
    naats,
    bayans,
    gallery,
    events
  } = useAppStore();

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
    <div className="min-h-screen bg-islamic-deep text-islamic-cream overflow-hidden">
      <Helmet>
        <title>Noor-e-Muhammad ﷺ | 12 Rabi-ul-Awwal Platform</title>
        <meta name="description" content="A comprehensive premium Islamic digital platform celebrating the birth, life, Seerah, Sunnah, authentic Ahadith, and timeless teachings of Prophet Muhammad ﷺ." />
        <meta name="keywords" content="Rabi-ul-Awwal, Prophet Muhammad, Seerah, Sunnah, Hadith, Naat, Bayan, Islamic" />
        <meta property="og:title" content="Noor-e-Muhammad ﷺ | 12 Rabi-ul-Awwal Platform" />
        <meta property="og:description" content="A comprehensive premium Islamic digital platform celebrating the birth, life, and teachings of Prophet Muhammad ﷺ." />
      </Helmet>

      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-4 bg-islamic-deep overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2000&auto=format&fit=crop"
            alt="Islamic Background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-islamic-deep/70" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-islamic-deep to-transparent" />
        </div>

        {/* Dynamic Light Rays */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex justify-center items-center opacity-30 z-0">
          <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-islamic-gold to-transparent absolute left-[20%]" />
          <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-islamic-gold to-transparent absolute right-[20%]" />
        </div>

        {/* Main Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-6xl mx-auto text-center relative z-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center mt-12"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="mb-8 relative">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-islamic-deep/80 backdrop-blur-md border border-islamic-gold/40 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <span className="w-2 h-2 rounded-full bg-islamic-gold animate-pulse"></span>
              <span className="font-serif text-[12px] font-bold text-islamic-gold tracking-[0.2em] uppercase">
                Welcome to the Light of Mercy
              </span>
            </div>
          </motion.div>

          {/* Typography */}
          <motion.div variants={fadeInUp} className="relative z-20 space-y-6 max-w-4xl mx-auto">
            <h2 className="font-arabic text-3xl sm:text-4xl lg:text-5xl text-islamic-gold font-bold drop-shadow-lg pb-4">
              مُحَمَّدٌ رَّسُولُ اللَّهِ ﷺ
            </h2>
            <h1 className="font-serif font-bold text-5xl sm:text-7xl lg:text-[5.5rem] leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-islamic-cream to-islamic-gold drop-shadow-2xl pb-2">
              Noor-e-Muhammad
            </h1>
            <p className="font-sans text-lg sm:text-2xl text-islamic-goldLight/90 font-medium tracking-[0.2em] uppercase pt-4">
              {ISLAMIC_CONFIG.subtitle}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-islamic-gold to-transparent mx-auto rounded-full opacity-80 my-8" />
            <p className="font-sans text-base sm:text-xl text-islamic-cream/80 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md">
              A comprehensive premium Islamic platform celebrating the Seerah, Sunnah, and timeless teachings of the Prophet ﷺ.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-16 w-full max-w-2xl mx-auto">
            <Link
              to="/seerah"
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-islamic-gold text-islamic-deep font-serif font-bold text-lg hover:bg-yellow-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              <BookOpen className="w-6 h-6" />
              <span className="tracking-widest uppercase text-sm">Explore Seerah</span>
            </Link>

            <Link
              to="/sunnah"
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-islamic-deep text-islamic-gold border-2 border-islamic-gold/40 font-serif font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 hover:bg-islamic-gold/10 hover:border-islamic-gold shadow-md hover:shadow-lg hover:-translate-y-1 group"
            >
              <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span className="tracking-widest uppercase text-sm">Discover Sunnah</span>
            </Link>
          </motion.div>
        </motion.div>

      </section>

      {/* 3. 12 RABI-UL-AWWAL COUNTDOWN */}
      <section className="py-16 px-4">
        <CountdownTimer />
      </section>

      {/* 4. WELCOME / WHY WE REMEMBER */}
      <section className="py-20 px-4 bg-islamic-primary/20 border-y border-islamic-gold/15 relative overflow-hidden">
        <IslamicPattern />
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}
          className="max-w-6xl mx-auto text-center space-y-8 relative z-10"
        >
          <motion.div variants={fadeInUp} className="space-y-3">
            <span className="font-serif text-xs font-bold text-islamic-gold uppercase tracking-[0.2em]">
              The Light of Mercy
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gold-gradient">
              Why We Remember The Messenger ﷺ
            </h2>
            <p className="font-sans text-base sm:text-lg text-islamic-cream/80 leading-relaxed max-w-3xl mx-auto pt-4">
              Allah sent Prophet Muhammad ﷺ as a universal mercy to all mankind (Rahmatan lil-'Alamin). Remembering his birth, studying his noble character, practicing his Sunnah, and sending Salawat upon him illuminates the heart with faith, peace, and spiritual tranquility.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 text-left rtl:text-right">
            {[
              { num: '01', title: 'Mercy & Compassion', desc: 'Embodying grace, kindness, and forgiveness towards all creatures, family, neighbors, and humanity.' },
              { num: '02', title: 'Noble Character', desc: '"And indeed, you are of a great moral character." (Surah Al-Qalam 68:4)' },
              { num: '03', title: 'Timeless Guidance', desc: 'Following the authentic Quran and Sunnah as the ultimate blueprint for inner peace and eternal success.' }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="p-8 bg-islamic-deep/40 backdrop-blur-xl rounded-[2rem] space-y-4 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] transition-all duration-500 border border-islamic-gold/10 hover:border-islamic-gold/30">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-islamic-gold/20 to-islamic-gold/5 flex items-center justify-center text-islamic-gold font-bold font-serif text-xl border border-islamic-gold/20 shadow-inner">
                  {item.num}
                </div>
                <h3 className="font-serif text-xl font-bold text-islamic-cream">{item.title}</h3>
                <p className="text-sm text-islamic-cream/70 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* 6. SEERAH PREVIEW */}
      <section className="py-24 px-4 bg-islamic-deep relative overflow-hidden">
        <IslamicPattern opacity={0.03} />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-end justify-between gap-4 mb-12 border-b border-islamic-gold/20 pb-6">
              <div className="space-y-2">
                <span className="font-serif text-xs text-islamic-gold font-bold uppercase tracking-[0.2em]">Historical Journey</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gold-gradient">The Blessed Seerah</h2>
              </div>
              <Link to="/seerah" className="flex items-center gap-2 text-sm font-serif text-islamic-gold hover:text-islamic-goldLight transition-colors group">
                <span>Explore Full Timeline</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {seerah.slice(0, 3).map((item) => (
                <motion.div key={item.id} variants={fadeInUp} className="p-8 glass-card-premium rounded-[2rem] space-y-5 flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.3)] transition-all duration-500 border border-islamic-gold/20">
                  <div className="space-y-3">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-islamic-gold/10 text-islamic-gold border border-islamic-gold/20 text-[11px] font-serif font-bold uppercase tracking-wider">
                      {item.period}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-islamic-cream">{item.title}</h3>
                    <p className="text-sm text-islamic-cream/75 line-clamp-3 leading-relaxed">{item.description}</p>
                  </div>
                  <div className="pt-4 border-t border-islamic-gold/15 flex items-center justify-between text-xs text-islamic-gold">
                    <span className="truncate max-w-[200px]">Source: {item.historicalSource}</span>
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 7. SUNNAH PREVIEW */}
      <section className="py-24 px-4 bg-islamic-primary/20 border-y border-islamic-gold/15 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-islamic-deep to-transparent opacity-50" />
        <IslamicPattern opacity={0.05} />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-end justify-between gap-4 mb-12 border-b border-islamic-gold/20 pb-6">
              <div className="space-y-2">
                <span className="font-serif text-xs text-islamic-gold font-bold uppercase tracking-[0.2em]">Living the Sunnah</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gold-gradient">Prophetic Traditions</h2>
              </div>
              <Link to="/sunnah" className="flex items-center gap-2 text-sm font-serif text-islamic-gold hover:text-islamic-goldLight transition-colors group">
                <span>View All Sunnahs</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sunnahs.slice(0, 3).map((item) => (
                <motion.div key={item.id} variants={fadeInUp} className="p-8 glass-card-premium rounded-[2rem] space-y-4 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.3)] transition-all duration-500 border border-islamic-gold/20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-serif text-islamic-gold font-bold tracking-wider uppercase">{item.category}</span>
                    <BookmarkButton id={item.id} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-islamic-cream">{item.title}</h3>
                  <p className="text-sm text-islamic-cream/80 leading-relaxed">{item.englishExplanation}</p>
                  <div className="pt-3 border-t border-islamic-gold/15 text-[11px] text-islamic-cream/60 italic">
                    Reference: {item.reference}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 8. QURAN & DUAS PREVIEWS */}
      <section className="py-24 px-4 bg-islamic-deep border-y border-islamic-gold/15 relative overflow-hidden">
        <IslamicPattern opacity={0.03} />
        <div className="max-w-7xl mx-auto space-y-20 relative z-10">

          {/* Quran Highlights */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex flex-col sm:flex-row items-end justify-between gap-4 mb-10 border-b border-islamic-gold/20 pb-4">
              <div className="space-y-2">
                <span className="font-serif text-xs text-islamic-gold font-bold uppercase tracking-[0.2em]">The Final Revelation</span>
                <h2 className="font-serif text-3xl font-bold text-gold-gradient">Noble Quran</h2>
              </div>
              <Link to="/quran" className="text-sm font-serif text-islamic-gold hover:text-islamic-goldLight flex items-center gap-1 group">
                Read Noble Quran <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { id: '1', englishName: 'Al-Fatihah', arabicName: 'الفاتحة', revelationType: 'Meccan', numberOfAyahs: 7 },
                { id: '36', englishName: 'Ya-Sin', arabicName: 'يس', revelationType: 'Meccan', numberOfAyahs: 83 },
                { id: '55', englishName: 'Ar-Rahman', arabicName: 'الرحمن', revelationType: 'Medinan', numberOfAyahs: 78 }
              ].map((s) => (
                <Link to={`/quran?surah=${s.id}`} key={s.id}>
                  <motion.div variants={fadeInUp} className="p-8 glass-card-premium rounded-[2rem] space-y-4 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.3)] transition-all duration-500 border border-islamic-gold/20 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-islamic-gold/10 border border-islamic-gold/30 flex items-center justify-center text-islamic-gold font-serif font-bold text-xl mb-2">
                      {s.id}
                    </div>
                    <h3 className="font-arabic text-3xl font-bold text-islamic-gold drop-shadow-md">{s.arabicName}</h3>
                    <h4 className="font-serif text-xl font-bold text-islamic-cream">{s.englishName}</h4>
                    <p className="text-xs text-islamic-cream/60 uppercase tracking-wider">{s.revelationType} • {s.numberOfAyahs} Verses</p>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </motion.div>

          {/* Duas Highlights */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex flex-col sm:flex-row items-end justify-between gap-4 mb-10 border-b border-islamic-gold/20 pb-4">
              <div className="space-y-2">
                <span className="font-serif text-xs text-islamic-gold font-bold uppercase tracking-[0.2em]">Daily Supplications</span>
                <h2 className="font-serif text-3xl font-bold text-gold-gradient">Prophetic Duas</h2>
              </div>
              <Link to="/duas" className="text-sm font-serif text-islamic-gold hover:text-islamic-goldLight flex items-center gap-1 group">
                View All Duas <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {duas.slice(0, 2).map((d) => (
                <motion.div key={d.id} variants={fadeInUp} className="p-8 glass-card-premium rounded-[2.5rem] space-y-6 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.3)] transition-all duration-500 border border-islamic-gold/20 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-serif text-islamic-gold font-bold tracking-wider uppercase bg-islamic-gold/10 px-3 py-1 rounded-full">{d.category}</span>
                    <BookmarkButton id={d.id} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-islamic-cream">{d.title}</h3>
                  <p className="font-arabic text-2xl md:text-3xl text-islamic-gold leading-loose text-right drop-shadow-sm">{d.arabic}</p>
                  <p className="font-serif text-[15px] text-islamic-cream/80 italic">"{d.english}"</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* 9. HADITH OF THE DAY */}
      {featuredHadith && (
        <section className="py-24 px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="p-10 glass-card-premium rounded-[2.5rem] border border-islamic-gold/40 shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-center space-y-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-islamic-gold to-transparent" />

            <span className="inline-block px-6 py-2 rounded-full bg-islamic-gold/10 text-islamic-gold border border-islamic-gold/40 text-xs font-serif font-bold uppercase tracking-[0.2em]">
              Hadith of the Day
            </span>

            <div className="space-y-6">
              <p className="font-arabic text-3xl sm:text-5xl text-islamic-gold font-bold leading-loose drop-shadow-md">
                "{featuredHadith.arabic}"
              </p>
              <p className="font-serif text-lg sm:text-xl text-islamic-cream/90 leading-relaxed italic">
                "{featuredHadith.translation}"
              </p>
              {featuredHadith.urdu && (
                <p className="font-urdu text-base sm:text-lg text-islamic-goldLight/80 leading-relaxed">
                  "{featuredHadith.urdu}"
                </p>
              )}
            </div>

            <div className="pt-6 border-t border-islamic-gold/20 flex flex-wrap items-center justify-between gap-4 text-sm font-serif text-islamic-cream/70">
              <span className="flex items-center gap-2 text-emerald-400">
                <ShieldCheck className="w-5 h-5" /> {featuredHadith.source} ({featuredHadith.reference})
              </span>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <BookmarkButton id={featuredHadith.id} />
                <button
                  onClick={() => openShare('Hadith of the Day', `${featuredHadith.translation} — ${featuredHadith.source}`)}
                  className="p-3 rounded-xl bg-islamic-primary/60 text-islamic-cream/80 hover:text-islamic-gold hover:bg-islamic-primary transition-colors border border-islamic-gold/20"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* 10 & 11. NAAT & BAYAN HIGHLIGHTS */}
      <section className="py-24 px-4 bg-islamic-primary/20 border-y border-islamic-gold/15 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-islamic-deep opacity-60" />
        <IslamicPattern opacity={0.05} />
        <div className="max-w-7xl mx-auto space-y-20 relative z-10">

          {/* Naat Grid */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex flex-col sm:flex-row items-end justify-between gap-4 mb-10 border-b border-islamic-gold/20 pb-4">
              <div className="space-y-2">
                <span className="font-serif text-xs text-islamic-gold font-bold uppercase tracking-[0.2em]">Auditory Devotion</span>
                <h2 className="font-serif text-3xl font-bold text-gold-gradient">Featured Naat Shareef</h2>
              </div>
              <Link to="/naat" className="text-sm font-serif text-islamic-gold hover:text-islamic-goldLight flex items-center gap-1 group">
                View All Naats <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {naats.slice(0, 3).map((n) => (
                <motion.div key={n.id} variants={fadeInUp} className="glass-card-premium rounded-[2.5rem] overflow-hidden flex flex-col group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.3)] transition-all duration-500 border border-islamic-gold/20">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={n.thumbnail} alt={n.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <a
                      href={n.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center"
                    >
                      <div className="w-14 h-14 rounded-full bg-islamic-gold text-islamic-deep flex items-center justify-center shadow-gold-glow group-hover:scale-110 transition-transform">
                        <Play className="w-7 h-7 fill-current ml-1" />
                      </div>
                    </a>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[11px] text-islamic-gold font-serif font-bold uppercase tracking-wider">{n.category}</span>
                      <h3 className="font-serif text-lg font-bold text-islamic-cream line-clamp-2 mt-1">{n.title}</h3>
                      <p className="text-sm text-islamic-cream/60 mt-2">{n.speaker || n.channelName}</p>
                    </div>
                    <a
                      href={n.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-islamic-gold/10 hover:bg-islamic-gold/20 text-islamic-gold border border-islamic-gold/30 text-sm font-serif font-bold text-center flex items-center justify-center gap-2 transition-colors"
                    >
                      <span>Listen on YouTube</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Bayan Grid */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex flex-col sm:flex-row items-end justify-between gap-4 mb-10 border-b border-islamic-gold/20 pb-4">
              <div className="space-y-2">
                <span className="font-serif text-xs text-islamic-gold font-bold uppercase tracking-[0.2em]">Scholarly Wisdom</span>
                <h2 className="font-serif text-3xl font-bold text-gold-gradient">Featured Bayan & Lectures</h2>
              </div>
              <Link to="/bayan" className="text-sm font-serif text-islamic-gold hover:text-islamic-goldLight flex items-center gap-1 group">
                View All Lectures <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {bayans.slice(0, 3).map((b) => (
                <motion.div key={b.id} variants={fadeInUp} className="glass-card-premium rounded-[2.5rem] overflow-hidden flex flex-col group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.3)] transition-all duration-500 border border-islamic-gold/20">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={b.thumbnail} alt={b.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <a
                      href={b.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center"
                    >
                      <div className="w-14 h-14 rounded-full bg-islamic-gold text-islamic-deep flex items-center justify-center shadow-gold-glow group-hover:scale-110 transition-transform">
                        <Play className="w-7 h-7 fill-current ml-1" />
                      </div>
                    </a>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[11px] text-islamic-gold font-serif font-bold uppercase tracking-wider">{b.category}</span>
                      <h3 className="font-serif text-lg font-bold text-islamic-cream line-clamp-2 mt-1">{b.title}</h3>
                      <p className="text-sm text-islamic-cream/60 mt-2">{b.speaker || b.channelName}</p>
                    </div>
                    <a
                      href={b.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-islamic-gold/10 hover:bg-islamic-gold/20 text-islamic-gold border border-islamic-gold/30 text-sm font-serif font-bold text-center flex items-center justify-center gap-2 transition-colors"
                    >
                      <span>Watch on YouTube</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* 14 & 15. DHIKR & SALAWAT INTERACTIVE COUNTERS */}
      <section className="py-24 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeInUp}>
          <TasbeehCounter />
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeInUp}>
          <SalawatCounter />
        </motion.div>
      </section>

      {/* 16. ISLAMIC GALLERY HIGHLIGHTS */}
      <section className="py-24 px-4 bg-islamic-deep border-y border-islamic-gold/15 relative overflow-hidden">
        <IslamicPattern opacity={0.03} />
        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          <div className="flex flex-col sm:flex-row items-end justify-between gap-4 border-b border-islamic-gold/20 pb-4">
            <div className="space-y-2">
              <span className="font-serif text-xs text-islamic-gold font-bold uppercase tracking-[0.2em]">Sacred Architecture</span>
              <h2 className="font-serif text-3xl font-bold text-gold-gradient">Islamic Gallery</h2>
            </div>
            <Link to="/gallery" className="text-sm font-serif text-islamic-gold hover:text-islamic-goldLight flex items-center gap-1 group">
              Explore Full Gallery <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
          >
            {gallery.slice(0, 6).map((img) => (
              <motion.div key={img.id} variants={fadeInUp} className="relative aspect-square rounded-3xl overflow-hidden border border-islamic-gold/25 group cursor-pointer shadow-lg">
                <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                  <span className="text-[11px] text-islamic-gold font-serif font-bold tracking-wider">{img.category}</span>
                  <h4 className="font-serif text-lg font-bold text-white line-clamp-1 mt-1">{img.title}</h4>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 17. UPCOMING EVENTS */}
      <section className="py-24 px-4 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="font-serif text-xs text-islamic-gold font-bold uppercase tracking-[0.2em]">Rabi-ul-Awwal 1448 AH</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gold-gradient">Upcoming Program Gatherings</h2>
        </div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {events.map((ev) => (
            <motion.div key={ev.id} variants={fadeInUp} className="p-8 glass-card-premium rounded-[2.5rem] space-y-5 relative overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.3)] transition-all duration-500 border border-islamic-gold/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-islamic-gold/5 rounded-bl-full pointer-events-none" />
              <div className="flex items-center justify-between text-sm text-islamic-gold font-serif font-bold">
                <span className="flex items-center gap-2 bg-islamic-deep/50 px-3 py-1 rounded-full border border-islamic-gold/20">
                  <Calendar className="w-4 h-4" /> {ev.date} at {ev.time}
                </span>
                <span className="px-3 py-1 rounded-full bg-islamic-gold/20 border border-islamic-gold/40 text-[11px] uppercase tracking-wider">{ev.organizer}</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-islamic-cream">{ev.title}</h3>
              <p className="text-sm text-islamic-cream/80 leading-relaxed">{ev.description}</p>
              <div className="pt-5 border-t border-islamic-gold/15 flex items-center justify-between text-sm font-serif">
                <span className="text-islamic-cream/70 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-islamic-gold animate-pulse" /> {ev.location}</span>
                <a
                  href={ev.registrationLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full btn-premium font-serif font-bold text-[13px]"
                >
                  Join Gathering
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 20. FINAL DUA */}
      <section className="py-32 px-4 bg-gradient-to-b from-islamic-primary/30 to-islamic-deep text-center border-t border-islamic-gold/20 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto space-y-8 relative z-10"
        >
          <IslamicPattern />
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gold-gradient">Final Blessing & Dua</h2>
          <div className="p-12 glass-card-premium rounded-[3rem] border border-islamic-gold/40 shadow-[0_20px_60px_rgba(0,0,0,0.5)] space-y-6 relative overflow-hidden">
            <p className="font-arabic text-4xl sm:text-5xl text-islamic-gold font-bold leading-loose drop-shadow-lg">
              اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ عَلَى نَبِيِّنَا مُحَمَّدٍ ﷺ
            </p>
            <p className="font-serif text-base sm:text-xl text-islamic-cream/90 italic leading-relaxed max-w-2xl mx-auto">
              "O Allah, send peace, blessings, and divine light upon our beloved Prophet Muhammad ﷺ, his noble family, his companions, and all who follow his guidance until the Day of Judgement."
            </p>
          </div>
        </motion.div>
      </section>

      {/* Share Modal Trigger */}
      <ShareModal
        isOpen={shareData.isOpen}
        onClose={() => setShareData({ isOpen: false, title: '', text: '' })}
        title={shareData.title}
        text={shareData.text}
      />
    </div>
  );
};
