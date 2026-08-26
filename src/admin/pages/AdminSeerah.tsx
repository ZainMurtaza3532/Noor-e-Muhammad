import React from 'react';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const AdminSeerah: React.FC = () => {
  const { seerah } = useAppStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-gold-gradient">Seerah Timeline Management</h1>
          <p className="text-xs text-islamic-cream/70 font-serif">Historical entries of the life of Prophet Muhammad ﷺ</p>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-amber-300 text-xs font-serif flex items-center gap-3">
        <ShieldAlert className="w-5 h-5 shrink-0 text-amber-400" />
        <span>Important Warning: All Seerah timeline entries must be verified against authentic historical sources (e.g. Ar-Raheeq Al-Makhtum, Ibn Hisham, Sahih Al-Bukhari). Do not fabricate historical dates or events.</span>
      </div>

      {/* Table */}
      <div className="glass-card rounded-3xl border border-islamic-gold/30 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right text-xs font-serif">
            <thead className="bg-islamic-primary/80 text-islamic-gold uppercase border-b border-islamic-gold/20">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Period</th>
                <th className="p-4">Gregorian / Hijri Year</th>
                <th className="p-4">Historical Source</th>
                <th className="p-4">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-islamic-gold/15 text-islamic-cream">
              {seerah.map((s) => (
                <tr key={s.id} className="hover:bg-islamic-primary/30 transition-colors">
                  <td className="p-4 font-bold text-islamic-gold">{s.title}</td>
                  <td className="p-4">{s.period}</td>
                  <td className="p-4 text-islamic-cream/70">{s.yearGregorian} ({s.yearHijri || 'Pre-Hijri'})</td>
                  <td className="p-4 text-emerald-400 font-semibold">{s.historicalSource}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" /> Verified Source
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
