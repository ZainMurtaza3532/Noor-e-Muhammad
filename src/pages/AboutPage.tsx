import React from 'react';
import { Helmet } from 'react-helmet-async';
import { IslamicPattern } from '../components/common/IslamicPattern';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-islamic-cream pt-24 pb-20">
      <Helmet>
        <title>About Us | Noor-e-Muhammad Academy</title>
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <span className="text-islamic-gold font-sans font-bold uppercase tracking-widest text-sm">Our Mission</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-islamic-deep">About The Academy</h1>
        </div>

        <div className="prose prose-lg mx-auto text-gray-700">
          <p className="lead text-2xl font-serif text-islamic-deep text-center mb-12 italic">
            "Spreading the light of Quran and Sunnah to every corner of the world."
          </p>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-8">
            <h2 className="text-2xl font-serif font-bold text-islamic-deep mb-4">Who We Are</h2>
            <p className="mb-4">
              Noor-e-Muhammad Academy is a premier online Islamic educational platform dedicated to providing authentic, accessible, and high-quality Islamic education to students worldwide. We believe that learning the Quran and understanding the life of Prophet Muhammad ﷺ is a journey that transforms lives.
            </p>
            <p>
              Our academy bridges the gap between traditional Islamic scholarship and modern online learning, ensuring that students of all ages can connect with the Book of Allah from the comfort of their homes.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-8">
            <h2 className="text-2xl font-serif font-bold text-islamic-deep mb-4">Our Vision</h2>
            <p>
              To cultivate a generation of Muslims who are deeply connected to the Quran, embodying its teachings in their daily lives, and sharing the beautiful character of the Prophet ﷺ with the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-islamic-accent/30 p-6 rounded-2xl">
              <h3 className="text-xl font-serif font-bold text-islamic-primary mb-3">Qualified Teachers</h3>
              <p className="text-sm">Our male and female instructors are carefully selected, holding Ijazah in Quranic recitation and possessing years of teaching experience.</p>
            </div>
            <div className="bg-islamic-accent/30 p-6 rounded-2xl">
              <h3 className="text-xl font-serif font-bold text-islamic-primary mb-3">Interactive Learning</h3>
              <p className="text-sm">We utilize modern teaching tools and one-on-one sessions to ensure every student receives personalized attention and rapid progress.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
