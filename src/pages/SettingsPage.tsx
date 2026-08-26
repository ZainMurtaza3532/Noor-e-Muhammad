import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Globe, Moon, Sun, User, LogOut, Bell } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useNavigate } from 'react-router-dom';

export const SettingsPage: React.FC = () => {
  const { authUser, logoutUser, language, setLanguage, theme, setTheme, siteSettings } = useAppStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  if (!authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-islamic-deep text-islamic-cream px-4">
        <div className="text-center space-y-4">
          <Settings className="w-12 h-12 text-islamic-gold mx-auto opacity-50" />
          <h2 className="text-2xl font-serif">Sign in to access Settings</h2>
          <button onClick={() => navigate('/auth')} className="px-6 py-2 bg-islamic-gold text-islamic-deep rounded-xl font-bold">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-islamic-deep text-islamic-cream pt-28 pb-20 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-islamic-gold/20 pb-6">
          <div className="p-4 rounded-full bg-islamic-gold/10 border border-islamic-gold/30">
            <Settings className="w-8 h-8 text-islamic-gold" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-gold-gradient">Account Settings</h1>
            <p className="text-sm text-islamic-cream/70">Manage your preferences and language settings</p>
          </div>
        </div>

        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-3xl border border-islamic-gold/30 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-islamic-emerald to-islamic-gold flex items-center justify-center text-3xl font-bold text-islamic-deep shadow-gold-glow">
            {authUser.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 text-center sm:text-left space-y-2">
            <h2 className="text-2xl font-serif font-bold">{authUser.name}</h2>
            <p className="text-islamic-gold text-sm flex items-center justify-center sm:justify-start gap-2">
              <User className="w-4 h-4" /> {authUser.email}
            </p>
            <p className="text-islamic-cream/50 text-xs">Member since {new Date(authUser.joinedAt).toLocaleDateString()}</p>
          </div>
          <button onClick={handleLogout} className="px-5 py-2 rounded-xl border border-red-500/50 text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </motion.div>

        {/* Preferences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Language Settings */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 rounded-3xl border border-islamic-gold/20 space-y-4"
          >
            <div className="flex items-center gap-3 text-islamic-gold font-serif font-bold text-lg mb-4">
              <Globe className="w-5 h-5" />
              <h3>Language / زبان / لغة</h3>
            </div>
            
            <div className="space-y-3">
              {[
                { code: 'en', label: 'English', desc: 'Default Site Language' },
                { code: 'ur', label: 'اردو', desc: 'Urdu (Right to Left)' },
                { code: 'ar', label: 'العربية', desc: 'Arabic (Right to Left)' }
              ].map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as any)}
                  className={`w-full text-left flex items-center justify-between p-4 rounded-xl border transition-all ${
                    language === lang.code 
                      ? 'bg-islamic-gold/20 border-islamic-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]' 
                      : 'bg-islamic-deep/50 border-islamic-gold/10 hover:border-islamic-gold/40'
                  }`}
                >
                  <div>
                    <span className={`block font-bold ${lang.code === 'ur' ? 'font-urdu text-lg' : lang.code === 'ar' ? 'font-arabic text-lg' : 'font-sans'}`}>
                      {lang.label}
                    </span>
                    <span className="text-xs text-islamic-cream/60">{lang.desc}</span>
                  </div>
                  {language === lang.code && <div className="w-3 h-3 rounded-full bg-islamic-gold shadow-gold-glow" />}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Theme Settings */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 rounded-3xl border border-islamic-gold/20 space-y-4"
          >
            <div className="flex items-center gap-3 text-islamic-gold font-serif font-bold text-lg mb-4">
              <Moon className="w-5 h-5" />
              <h3>Theme Preferences</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTheme('dark')}
                className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                  theme === 'dark' 
                    ? 'bg-islamic-gold/20 border-islamic-gold shadow-[0_0_15px_rgba(212,175,55,0.2)] text-islamic-gold' 
                    : 'bg-islamic-deep/50 border-islamic-gold/10 hover:border-islamic-gold/40 text-islamic-cream/70'
                }`}
              >
                <Moon className="w-6 h-6" />
                <span className="text-sm font-bold">Dark Mode</span>
              </button>
              
              <button
                onClick={() => setTheme('night')}
                className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                  theme === 'night' 
                    ? 'bg-islamic-gold/20 border-islamic-gold shadow-[0_0_15px_rgba(212,175,55,0.2)] text-islamic-gold' 
                    : 'bg-islamic-deep/50 border-islamic-gold/10 hover:border-islamic-gold/40 text-islamic-cream/70'
                }`}
              >
                <Sun className="w-6 h-6" />
                <span className="text-sm font-bold">Night Mode</span>
              </button>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 rounded-3xl border border-islamic-gold/20 md:col-span-2 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-islamic-gold/10 rounded-xl">
                <Bell className="w-6 h-6 text-islamic-gold" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg">Push Notifications</h3>
                <p className="text-sm text-islamic-cream/70">Receive daily sunnah and prayer reminders</p>
              </div>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-islamic-primary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] rtl:after:right-[2px] rtl:after:left-auto after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-gold"></div>
            </label>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
