import React, { useState } from 'react';
import { BookOpen, Search, ArrowRight, Clock } from 'lucide-react';
import { IslamicPattern } from '../components/common/IslamicPattern';
import { BookmarkButton } from '../components/common/BookmarkButton';

const MOCK_ARTICLES = [
  {
    id: 'art-1',
    title: 'The Prophetic Mercy: Understanding Compassion in Islam',
    category: 'Seerah',
    author: 'Imam Khalid',
    readTime: '5 min read',
    date: '12 Rabi-ul-Awwal 1445',
    excerpt: 'An exploration of how the Prophet Muhammad ﷺ exemplified mercy not just to humanity, but to animals, the environment, and his enemies.',
    imageUrl: 'https://images.unsplash.com/photo-1597933100693-559d81d6f519?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'art-2',
    title: 'The Significance of Sending Salawat',
    category: 'Spirituality',
    author: 'Shaykh Hamza',
    readTime: '7 min read',
    date: '10 Rabi-ul-Awwal 1445',
    excerpt: 'Discover the profound spiritual benefits and historical context of sending blessings upon the Prophet ﷺ in our daily lives.',
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'art-3',
    title: 'Sunnahs of Daily Life: A Practical Guide',
    category: 'Lifestyle',
    author: 'Ustadha Maryam',
    readTime: '4 min read',
    date: '5 Rabi-ul-Awwal 1445',
    excerpt: 'Simple, actionable ways to incorporate the beautiful habits of the Prophet ﷺ into our modern, fast-paced routines.',
    imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=800&auto=format&fit=crop'
  },
];

export const ArticlesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Seerah', 'Spirituality', 'Lifestyle', 'History'];

  const filteredArticles = MOCK_ARTICLES.filter(art => {
    const matchesCategory = activeCategory === 'All' || art.category === activeCategory;
    const matchesSearch = art.title.toLowerCase().includes(search.toLowerCase()) || art.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-islamic-deep text-islamic-cream pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="font-serif text-xs font-bold text-islamic-gold uppercase tracking-widest">Islamic Literature</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-gold-gradient">Islamic Articles</h1>
          <p className="font-sans text-sm text-islamic-cream/80 max-w-2xl mx-auto">
            Deepen your knowledge with insightful articles on Seerah, spirituality, and Islamic lifestyle.
          </p>
          <IslamicPattern />
        </div>

        {/* Search & Filters */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-islamic-gold" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-12 py-3 rounded-2xl bg-islamic-primary/50 border border-islamic-gold/30 text-islamic-cream placeholder-islamic-cream/50 text-sm focus:outline-none focus:border-islamic-gold shadow-lg"
            />
          </div>

          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-serif font-bold whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'btn-premium' 
                    : 'bg-islamic-deep/50 backdrop-blur-md text-islamic-cream/80 hover:text-islamic-gold border border-islamic-gold/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {filteredArticles.map((article) => (
            <div key={article.id} className="glass-card-premium rounded-[2rem] overflow-hidden border border-islamic-gold/30 flex flex-col group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.3)] transition-all duration-500">
              
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-islamic-deep/20 group-hover:bg-transparent transition-colors z-10" />
                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-islamic-deep/80 backdrop-blur-md text-islamic-gold text-[10px] font-bold uppercase tracking-wider border border-islamic-gold/30">
                  {article.category}
                </span>
                <div className="absolute top-4 right-4 z-20">
                  <BookmarkButton id={article.id} />
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-[10px] text-islamic-cream/60 font-serif mb-3">
                  <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {article.author}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-islamic-gold mb-3 line-clamp-2 group-hover:text-gold-gradient transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-sm text-islamic-cream/70 line-clamp-3 mb-6 flex-1 font-light">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-islamic-gold/15">
                  <span className="text-[10px] text-islamic-cream/50">{article.date}</span>
                  <button className="flex items-center gap-1 text-xs text-islamic-gold font-bold hover:gap-2 transition-all">
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="py-12 text-center text-islamic-cream/60 font-serif">
            No articles found matching your search.
          </div>
        )}

      </div>
    </div>
  );
};
