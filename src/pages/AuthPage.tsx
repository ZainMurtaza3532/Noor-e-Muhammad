import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useNavigate } from 'react-router-dom';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const { loginUser, registerUser } = useAppStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsLoading(true);
    
    try {
      if (isForgotPassword) {
        // Mock password reset
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSuccessMsg('If an account exists, a password reset link has been sent to your email.');
        setTimeout(() => setIsForgotPassword(false), 3000);
      } else if (isLogin) {
        await loginUser(email, password);
        navigate('/');
      } else {
        await registerUser(name || email.split('@')[0], email, password);
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-islamic-deep bg-islamic-pattern pt-28 pb-20 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Background Glowing Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-islamic-emerald/20 rounded-full blur-[100px]"
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-islamic-gold/20 rounded-full blur-[100px]"
      />

      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 rounded-3xl border border-islamic-gold/30 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-islamic-gold/10 border border-islamic-gold/40 mb-4 shadow-gold-glow">
              <ShieldCheck className="w-8 h-8 text-islamic-gold" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-gold-gradient mb-2">
              {isForgotPassword ? 'Reset Password' : (isLogin ? 'Welcome Back' : 'Join Our Journey')}
            </h2>
            <p className="text-islamic-cream/70 text-sm font-sans">
              {isForgotPassword 
                ? 'Enter your email to receive a password reset link.' 
                : (isLogin ? 'Sign in to access your saved progress and bookmarks.' : 'Create an account to track your daily sunnahs.')}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="mb-6 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm text-center">
              {successMsg}
            </div>
          )}

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {!isLogin && !isForgotPassword && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-islamic-gold/60" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={!isLogin && !isForgotPassword}
                      className="w-full bg-islamic-deep/60 border border-islamic-gold/20 rounded-xl py-3 pl-10 pr-4 text-islamic-cream placeholder:text-islamic-cream/40 focus:outline-none focus:border-islamic-gold focus:ring-1 focus:ring-islamic-gold transition-all"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-islamic-gold/60" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-islamic-deep/60 border border-islamic-gold/20 rounded-xl py-3 pl-10 pr-4 text-islamic-cream placeholder:text-islamic-cream/40 focus:outline-none focus:border-islamic-gold focus:ring-1 focus:ring-islamic-gold transition-all"
              />
            </div>

            <AnimatePresence mode="wait">
              {!isForgotPassword && (
                <motion.div
                  key="password-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-islamic-gold/60" />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required={!isForgotPassword}
                      className="w-full bg-islamic-deep/60 border border-islamic-gold/20 rounded-xl py-3 pl-10 pr-4 text-islamic-cream placeholder:text-islamic-cream/40 focus:outline-none focus:border-islamic-gold focus:ring-1 focus:ring-islamic-gold transition-all"
                    />
                  </div>
                  {isLogin && (
                    <div className="text-right mt-2">
                      <button 
                        type="button" 
                        onClick={() => setIsForgotPassword(true)}
                        className="text-xs text-islamic-gold hover:underline font-sans"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 mt-6 bg-gradient-to-r from-islamic-gold to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-islamic-deep font-bold rounded-xl shadow-gold-glow flex items-center justify-center gap-2 group transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span>{isLoading ? 'Processing...' : (isForgotPassword ? 'Reset Password' : (isLogin ? 'Sign In' : 'Create Account'))}</span>
              {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-islamic-gold/20 pt-6 flex flex-col gap-2">
            {isForgotPassword ? (
              <button
                onClick={() => setIsForgotPassword(false)}
                className="text-sm text-islamic-gold font-bold hover:underline"
              >
                Back to Sign In
              </button>
            ) : (
              <p className="text-sm text-islamic-cream/70">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-islamic-gold font-bold hover:underline"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
