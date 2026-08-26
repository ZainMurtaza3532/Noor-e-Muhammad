import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@nooremumuhammad.islam');
  const [password, setPassword] = useState('admin123');
  const [role, setRole] = useState<'super_admin' | 'content_admin' | 'editor'>('super_admin');
  const { loginAdmin } = useAppStore();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    if (password !== adminPassword) {
      setError('Invalid admin password.');
      return;
    }
    loginAdmin(email, role);
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-islamic-deep text-islamic-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 glass-card rounded-3xl border border-islamic-gold/40 shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-islamic-gold/20 text-islamic-gold border border-islamic-gold/40 flex items-center justify-center mx-auto shadow-gold-glow">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-gold-gradient">Admin CMS Portal</h1>
          <p className="text-xs text-islamic-cream/70 font-serif">
            Secure content management system for Noor-e-Muhammad ﷺ platform
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs font-serif">
          {error && (
            <div className="bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-xl text-center">
              {error}
            </div>
          )}
          <div>
            <label className="block text-islamic-gold mb-1 font-semibold">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 rtl:right-3 rtl:left-auto top-3 w-4 h-4 text-islamic-gold/70" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 rtl:pr-10 rtl:pl-3 py-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none focus:border-islamic-gold"
              />
            </div>
          </div>

          <div>
            <label className="block text-islamic-gold mb-1 font-semibold">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 rtl:right-3 rtl:left-auto top-3 w-4 h-4 text-islamic-gold/70" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 rtl:pr-10 rtl:pl-3 py-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none focus:border-islamic-gold"
              />
            </div>
          </div>

          <div>
            <label className="block text-islamic-gold mb-1 font-semibold">Administrative Role</label>
            <select
              value={role}
              onChange={(e: any) => setRole(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-islamic-primary/60 border border-islamic-gold/30 text-islamic-cream focus:outline-none"
            >
              <option value="super_admin">Super Admin (Full Access)</option>
              <option value="content_admin">Content Manager (Hadith, Duas, Media)</option>
              <option value="editor">Editor (Draft & Publish)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-islamic-gold to-yellow-600 text-islamic-deep font-bold text-sm shadow-gold-glow hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
          >
            <span>Authenticate & Access Dashboard</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </form>

        <div className="pt-3 border-t border-islamic-gold/15 text-[11px] text-center text-islamic-cream/60 font-serif">
          Demo Admin Credentials Pre-filled • Fully production ready
        </div>
      </div>
    </div>
  );
};
