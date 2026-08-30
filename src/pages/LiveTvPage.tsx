import React from 'react';
import { motion } from 'framer-motion';
import { Tv, Radio, Info } from 'lucide-react';
import { IslamicPattern } from '../components/common/IslamicPattern';

export const LiveTvPage = () => {
  return (
    <div className="min-h-screen bg-islamic-cream text-gray-800 pt-28 pb-20 px-4 relative overflow-hidden">
      <IslamicPattern className="absolute inset-0 opacity-5 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Tv className="w-8 h-8 text-islamic-gold" />
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-islamic-deep">
              Madani Channel Live
            </h1>
          </div>
          <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
            Watch the official 24/7 live transmission of Madani Channel.
          </p>
        </motion.div>

        {/* Video Player Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-islamic-deep p-4 sm:p-6 rounded-3xl shadow-2xl relative"
        >
          {/* "LIVE" Badge */}
          <div className="absolute top-8 left-8 z-20 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse shadow-lg">
            <Radio className="w-4 h-4" /> LIVE
          </div>
          
          <div className="relative pt-[56.25%] rounded-2xl overflow-hidden bg-black shadow-inner">
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/5a2xQyIeHjQ?autoplay=1&mute=1" 
              title="Madani Channel Live Stream" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        </motion.div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-start gap-4"
          >
            <div className="bg-green-50 p-3 rounded-full text-green-600 shrink-0">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-islamic-deep mb-2">About Madani Channel</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Madani Channel is a renowned Islamic television network, broadcasting 100% pure Islamic content, including Bayans, Qasida Burdah, Naats, and Madani Muzakara, totally free from music and advertisements.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
