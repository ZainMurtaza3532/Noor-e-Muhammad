import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Sword, BookOpen, Heart } from 'lucide-react';
import { timelineEvents, type TimelineEvent } from '../data/timeline';
import { IslamicPattern } from '../components/common/IslamicPattern';

const getIcon = (category: TimelineEvent['category']) => {
  switch (category) {
    case 'birth': return <Star className="w-6 h-6 text-yellow-500" />;
    case 'revelation': return <BookOpen className="w-6 h-6 text-blue-500" />;
    case 'migration': return <MapPin className="w-6 h-6 text-green-500" />;
    case 'battle': return <Sword className="w-6 h-6 text-red-500" />;
    default: return <Heart className="w-6 h-6 text-islamic-primary" />;
  }
};

export const TimelinePage = () => {
  return (
    <div className="min-h-screen bg-islamic-cream text-gray-800 pt-28 pb-20 px-4 relative overflow-hidden">
      <IslamicPattern className="absolute inset-0 opacity-5 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-islamic-deep mb-4">
            Seerah Timeline
          </h1>
          <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
            Journey through the blessed life of the Prophet Muhammad ﷺ, from his miraculous birth to his lasting legacy.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-islamic-gold h-full opacity-30 rounded-full hidden md:block"></div>

          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div 
                  key={event.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col md:flex-row items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  
                  {/* Content Box */}
                  <div className={`w-full md:w-5/12 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 relative group">
                      
                      {/* Mobile Line Connector */}
                      <div className="absolute left-6 -bottom-12 w-0.5 h-12 bg-islamic-gold opacity-30 md:hidden"></div>

                      <div className="flex flex-col gap-2">
                        <span className="font-sans text-sm font-bold text-islamic-gold tracking-widest uppercase">
                          {event.year}
                        </span>
                        <h3 className="font-serif text-2xl font-bold text-islamic-deep">
                          {event.title}
                        </h3>
                        <p className="font-sans text-gray-600 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Icon Center Point */}
                  <div className="w-full md:w-2/12 flex justify-center py-4 md:py-0 relative z-10 hidden md:flex">
                    <div className="w-14 h-14 bg-white rounded-full border-4 border-islamic-gold flex items-center justify-center shadow-md">
                      {getIcon(event.category)}
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="w-full md:w-5/12 hidden md:block"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
