import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, Share2, ChevronRight } from 'lucide-react';
import { MOCK_ARTICLES } from '../data/mockArticles';
import { IslamicPattern } from '../components/common/IslamicPattern';
import { ShareModal } from '../components/common/ShareModal';
import { BookmarkButton } from '../components/common/BookmarkButton';

export const ArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isShareOpen, setIsShareOpen] = useState(false);

  const article = MOCK_ARTICLES.find(a => a.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen bg-islamic-deep text-islamic-cream flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-serif font-bold text-islamic-gold mb-4">Article Not Found</h1>
        <p className="mb-8">The article you are looking for does not exist.</p>
        <button onClick={() => navigate('/articles')} className="btn-premium px-6 py-3 rounded-full flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-islamic-deep text-islamic-cream pb-20">
      
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full mt-16 flex items-end">
        <div className="absolute inset-0 z-0">
          <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-islamic-deep via-islamic-deep/80 to-transparent" />
          <div className="absolute inset-0 bg-islamic-deep/30" />
        </div>
        
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 pb-12">
          <div className="flex items-center gap-2 mb-6 text-sm">
            <Link to="/articles" className="text-islamic-cream/60 hover:text-islamic-gold transition-colors">Articles</Link>
            <ChevronRight className="w-4 h-4 text-islamic-gold" />
            <span className="text-islamic-gold font-serif">{article.category}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gold-gradient mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-islamic-cream/80 font-serif">
            <span className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-islamic-gold/20 flex items-center justify-center border border-islamic-gold/40">
                <BookOpen className="w-4 h-4 text-islamic-gold" />
              </div>
              By {article.author}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-islamic-gold" /> {article.readTime}
            </span>
            <span className="text-islamic-cream/50">•</span>
            <span>{article.date}</span>
          </div>
        </div>
      </div>

      <IslamicPattern className="my-8" />

      {/* Action Bar */}
      <div className="max-w-3xl mx-auto px-4 flex items-center justify-between py-4 border-y border-islamic-gold/10 mb-12">
        <button 
          onClick={() => navigate('/articles')}
          className="flex items-center gap-2 text-sm text-islamic-cream/60 hover:text-islamic-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </button>
        <div className="flex items-center gap-4">
          <BookmarkButton id={article.id} />
          <button 
            onClick={() => setIsShareOpen(true)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-islamic-gold/10 hover:bg-islamic-gold/20 text-islamic-gold border border-islamic-gold/30 transition-all"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-4 prose prose-invert prose-gold">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>

      <ShareModal 
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title={article.title}
        text={article.excerpt}
      />
    </div>
  );
};
