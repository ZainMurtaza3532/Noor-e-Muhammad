import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Star, Heart, Users, ShieldCheck, ChevronDown, Feather } from 'lucide-react';
import { IslamicPattern } from '../components/common/IslamicPattern';

const sections = [
  {
    id: 'names',
    title: 'Asma-un-Nabi',
    subtitle: 'The Blessed Names & Titles',
    icon: <Star className="w-6 h-6" />,
    content: (
      <div className="space-y-4">
        <p className="text-islamic-cream/80 leading-relaxed">
          The Holy Prophet ﷺ is known by many beautiful names and titles that reflect his exalted status, noble character, and divine mission.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "Muhammad", meaning: "The Most Praised One" },
            { name: "Ahmad", meaning: "The One Who Praises Highly" },
            { name: "Al-Amin", meaning: "The Trustworthy" },
            { name: "As-Sadiq", meaning: "The Truthful" },
            { name: "Rahmat-lil-Alameen", meaning: "Mercy for all Worlds" },
            { name: "Khatam an-Nabiyyin", meaning: "Seal of the Prophets" }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-islamic-gold/10 border border-islamic-gold/20 flex flex-col items-center justify-center text-center">
              <span className="font-arabic text-2xl text-islamic-gold font-bold mb-1">{item.name}</span>
              <span className="text-xs text-islamic-cream/60">{item.meaning}</span>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'hilya',
    title: 'Hilya Mubarak',
    subtitle: 'The Noble Physical Appearance',
    icon: <Feather className="w-6 h-6" />,
    content: (
      <div className="space-y-4">
        <p className="text-islamic-cream/80 leading-relaxed">
          The Sahaba (Companions) described the Holy Prophet ﷺ as the most handsome of all people, with a face that shone like the full moon.
        </p>
        <div className="space-y-3 pl-4 border-l-2 border-islamic-gold/30">
          <p className="text-sm"><strong>His Face:</strong> Radiant, luminous, and shining like a full moon. When he was pleased, his face illuminated even more.</p>
          <p className="text-sm"><strong>His Stature:</strong> Neither overly tall nor short, but of medium, perfectly proportioned height.</p>
          <p className="text-sm"><strong>His Eyes:</strong> Large and beautiful, with a deep contrast between the white and dark parts, and long eyelashes.</p>
          <p className="text-sm"><strong>His Seal of Prophethood:</strong> A raised area of skin between his shoulders, signifying he was the final messenger.</p>
        </div>
      </div>
    )
  },
  {
    id: 'miracles',
    title: 'Mu\'jizat',
    subtitle: 'The Greatest Miracles',
    icon: <ShieldCheck className="w-6 h-6" />,
    content: (
      <div className="space-y-4">
        <p className="text-islamic-cream/80 leading-relaxed">
          Allah granted the Prophet ﷺ numerous miracles to prove his prophethood, the greatest of which is the Holy Quran.
        </p>
        <ul className="space-y-4">
          <li className="p-4 rounded-xl bg-islamic-primary/30 border border-islamic-gold/10">
            <h4 className="font-bold text-islamic-gold mb-1">The Holy Quran</h4>
            <p className="text-xs text-islamic-cream/70">The eternal, living miracle whose linguistic perfection and scientific truths remain unchallenged.</p>
          </li>
          <li className="p-4 rounded-xl bg-islamic-primary/30 border border-islamic-gold/10">
            <h4 className="font-bold text-islamic-gold mb-1">Al-Isra wal Mi\'raj</h4>
            <p className="text-xs text-islamic-cream/70">The miraculous night journey from Makkah to Jerusalem, and the ascension through the heavens to meet Allah.</p>
          </li>
          <li className="p-4 rounded-xl bg-islamic-primary/30 border border-islamic-gold/10">
            <h4 className="font-bold text-islamic-gold mb-1">Splitting of the Moon</h4>
            <p className="text-xs text-islamic-cream/70">When the disbelievers of Makkah demanded a sign, he pointed to the moon, and it split into two distinct halves.</p>
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 'family',
    title: 'Ahl al-Bayt',
    subtitle: 'The Blessed Family',
    icon: <Users className="w-6 h-6" />,
    content: (
      <div className="space-y-4">
        <p className="text-islamic-cream/80 leading-relaxed">
          The family of the Prophet ﷺ holds a highly revered status in Islam. Loving them is a sign of faith.
        </p>
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-islamic-gold mb-2 border-b border-islamic-gold/20 inline-block pb-1">Ummahat al-Mu\'minin (Mothers of Believers)</h4>
            <p className="text-xs text-islamic-cream/70">Including Sayyidah Khadijah, Sayyidah Aishah, and others, who were models of piety and passed on vast knowledge of the Sunnah.</p>
          </div>
          <div>
            <h4 className="font-bold text-islamic-gold mb-2 border-b border-islamic-gold/20 inline-block pb-1">His Children</h4>
            <p className="text-xs text-islamic-cream/70">He had three sons (Qasim, Abdullah, Ibrahim) who passed away in childhood, and four daughters (Zainab, Ruqayyah, Umm Kulthum, Fatimah).</p>
          </div>
          <div>
            <h4 className="font-bold text-islamic-gold mb-2 border-b border-islamic-gold/20 inline-block pb-1">The Pure Household</h4>
            <p className="text-xs text-islamic-cream/70">Specifically Sayyidah Fatimah, Ali, Hasan, and Husain (peace be upon them all), known as the People of the Cloak (Ahl al-Kisa).</p>
          </div>
        </div>
      </div>
    )
  }
];

export const AboutProphetPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);

  return (
    <div className="min-h-screen bg-islamic-deep text-islamic-cream pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-islamic-gold/10 rounded-full blur-[80px] -z-10" />
          <span className="font-serif text-sm font-bold text-islamic-gold tracking-[0.2em] uppercase">Who is He?</span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-gold-gradient">The Holy Prophet ﷺ</h1>
          <p className="font-sans text-lg text-islamic-cream/80 max-w-2xl mx-auto">
            Explore the beautiful character, miraculous life, and noble lineage of the Final Messenger of Allah.
          </p>
          <IslamicPattern />
        </div>

        {/* Content Layout */}
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <div className="w-full md:w-1/3 space-y-3">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left p-4 rounded-2xl flex items-center gap-4 transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-islamic-gold to-yellow-600 text-islamic-deep shadow-gold-glow scale-[1.02]'
                    : 'bg-islamic-deep/60 border border-islamic-gold/20 text-islamic-cream/70 hover:border-islamic-gold/60'
                }`}
              >
                <div className={`p-2 rounded-xl ${activeSection === section.id ? 'bg-islamic-deep/20' : 'bg-islamic-gold/10 text-islamic-gold'}`}>
                  {section.icon}
                </div>
                <div>
                  <h3 className="font-serif font-bold">{section.title}</h3>
                  <p className="text-[10px] opacity-80 uppercase tracking-widest">{section.subtitle}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="w-full md:w-2/3">
            <AnimatePresence mode="wait">
              {sections.map((section) => (
                section.id === activeSection && (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card p-8 rounded-3xl border border-islamic-gold/30 h-full shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                  >
                    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-islamic-gold/20">
                      <div className="p-3 bg-islamic-gold/10 rounded-2xl text-islamic-gold border border-islamic-gold/30 shadow-gold-glow">
                        {section.icon}
                      </div>
                      <div>
                        <h2 className="text-3xl font-serif font-bold text-gold-gradient">{section.title}</h2>
                        <span className="text-sm text-islamic-gold/80">{section.subtitle}</span>
                      </div>
                    </div>
                    {section.content}
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};
