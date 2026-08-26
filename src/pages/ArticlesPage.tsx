import React, { useState } from 'react';
import { BookOpen, Search, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IslamicPattern } from '../components/common/IslamicPattern';
import { BookmarkButton } from '../components/common/BookmarkButton';
import { MOCK_ARTICLES } from '../data/mockArticles';

export const ArticlesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Seerah', 'Spirituality', 'Lifestyle', 'History'];

  const filteredArticles = MOCK_ARTICLES.filter(art => {
    const matchesCategory = activeCategory === 'All' || art.category === activeCategory;
    const matchesSearch = art.title.toLowerCase().includes(search.toLowerCase()) || art.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = filteredArticles.length > 0 ? filteredArticles[0] : null;
  const recentArticles = filteredArticles.slice(1);

  return (
    <div className="min-h-screen bg-islamic-deep text-islamic-cream pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="font-serif text-xs font-bold text-islamic-gold uppercase tracking-widest">Islamic Literature</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-gold-gradient">Islamic Articles</h1>
          <p className="font-sans text-sm text-islamic-cream/80 max-w-2xl mx-auto">
            Deepen your knowledge with insightful articles on Seerah, spirituality, and Islamic lifestyle.
          </p>
          <IslamicPattern />
        </div>

        {/* Search & Filters */}
        <div className="space-y-6 max-w-3xl mx-auto">
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

        {/* Featured Article */}
        {featuredArticle && search === '' && activeCategory === 'All' && (
          <div className="relative rounded-[2.5rem] overflow-hidden glass-card-premium border border-islamic-gold/40 group mb-12">
            <div className="absolute inset-0 bg-islamic-deep/40 z-10" />
            <img src={featuredArticle.imageUrl} alt={featuredArticle.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            
            <div className="relative z-20 p-8 md:p-12 lg:p-16 flex flex-col justify-end min-h-[500px] bg-gradient-to-t from-islamic-deep via-islamic-deep/80 to-transparent">
              <div className="max-w-3xl">
                <span className="inline-block px-4 py-1.5 rounded-full bg-islamic-gold/20 backdrop-blur-md text-islamic-gold text-xs font-bold uppercase tracking-widest border border-islamic-gold/40 mb-6">
                  Featured
                </span>
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-islamic-cream mb-4 leading-tight group-hover:text-islamic-goldLight transition-colors">
                  {featuredArticle.title}
                </h2>
                <p className="text-lg text-islamic-cream/80 font-light mb-8 max-w-2xl line-clamp-3">
                  {featuredArticle.excerpt}
                </p>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-6 text-xs text-islamic-cream/70 font-serif">
                    <span className="flex items-center gap-1.5">
                      <div className="w-8 h-8 rounded-full bg-islamic-gold/20 flex items-center justify-center">
                        <BookOpen className="w-3.5 h-3.5 text-islamic-gold" />
                      </div>
                      By {featuredArticle.author}
                    </span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-islamic-gold" /> {featuredArticle.readTime}</span>
                  </div>
                  
                  <Link to={`/articles/${featuredArticle.id}`} className="btn-premium px-8 py-3 rounded-full flex items-center gap-2 w-max">
                    Read Full Article <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section Title */}
        {recentArticles.length > 0 && (
          <div className="flex items-center gap-4 mb-8">
            <h3 className="font-serif text-2xl font-bold text-islamic-gold">Latest Articles</h3>
            <div className="h-[1px] flex-1 bg-islamic-gold/20" />
          </div>
        )}

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(search === '' && activeCategory === 'All' ? recentArticles : filteredArticles).map((article) => (
            <div key={article.id} className="glass-card-premium rounded-[2rem] overflow-hidden border border-islamic-gold/30 flex flex-col group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.3)] transition-all duration-500">
              
              <Link to={`/articles/${article.id}`} className="relative h-56 overflow-hidden block">
                <div className="absolute inset-0 bg-islamic-deep/20 group-hover:bg-transparent transition-colors z-10" />
                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-islamic-deep/80 backdrop-blur-md text-islamic-gold text-[10px] font-bold uppercase tracking-wider border border-islamic-gold/30">
                  {article.category}
                </span>
                <div className="absolute top-4 right-4 z-20" onClick={e => e.preventDefault()}>
                  <BookmarkButton id={article.id} />
                </div>
              </Link>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-[10px] text-islamic-cream/60 font-serif mb-3">
                  <span className="flex items-center gap-1"><BookOpen className="w-3 h-3 text-islamic-gold" /> {article.author}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-islamic-gold" /> {article.readTime}</span>
                </div>

                <Link to={`/articles/${article.id}`}>
                  <h3 className="font-serif text-xl font-bold text-islamic-gold mb-3 line-clamp-2 group-hover:text-goldLight transition-colors">
                    {article.title}
                  </h3>
                </Link>
                
                <p className="text-sm text-islamic-cream/70 line-clamp-3 mb-6 flex-1 font-light">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-islamic-gold/15">
                  <span className="text-[10px] text-islamic-cream/50">{article.date}</span>
                  <Link to={`/articles/${article.id}`} className="flex items-center gap-1 text-xs text-islamic-gold font-bold hover:gap-2 transition-all">
                    Read More <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
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
