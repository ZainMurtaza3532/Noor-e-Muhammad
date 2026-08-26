import React, { useState } from 'react';
import { Calculator, DollarSign } from 'lucide-react';

export const ZakatCalculator: React.FC = () => {
  const [cash, setCash] = useState<number>(0);
  const [goldValue, setGoldValue] = useState<number>(0);
  const [silverValue, setSilverValue] = useState<number>(0);
  const [debts, setDebts] = useState<number>(0);

  const totalWealth = Math.max(0, cash + goldValue + silverValue - debts);
  const zakatDue = totalWealth * 0.025; // 2.5% Zakat rate

  return (
    <div className="w-full max-w-xl mx-auto p-6 glass-card rounded-3xl border border-islamic-gold/40 shadow-2xl text-islamic-cream space-y-6">
      <div className="flex items-center space-x-3 rtl:space-x-reverse border-b border-islamic-gold/20 pb-4">
        <div className="p-3 rounded-2xl bg-islamic-gold/20 text-islamic-gold">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold text-gold-gradient">Zakat Calculator</h3>
          <p className="text-xs text-islamic-cream/70">Calculates 2.5% Zakat on eligible wealth above Nisab</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-serif">
        <div>
          <label className="block text-islamic-gold mb-1 font-semibold">Cash & Savings</label>
          <input
            type="number"
            value={cash || ''}
            onChange={(e) => setCash(Number(e.target.value))}
            placeholder="0.00"
            className="w-full p-2.5 rounded-xl bg-islamic-deep border border-islamic-gold/30 text-islamic-cream focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-islamic-gold mb-1 font-semibold">Gold Value</label>
          <input
            type="number"
            value={goldValue || ''}
            onChange={(e) => setGoldValue(Number(e.target.value))}
            placeholder="0.00"
            className="w-full p-2.5 rounded-xl bg-islamic-deep border border-islamic-gold/30 text-islamic-cream focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-islamic-gold mb-1 font-semibold">Silver Value</label>
          <input
            type="number"
            value={silverValue || ''}
            onChange={(e) => setSilverValue(Number(e.target.value))}
            placeholder="0.00"
            className="w-full p-2.5 rounded-xl bg-islamic-deep border border-islamic-gold/30 text-islamic-cream focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-islamic-gold mb-1 font-semibold">Liabilities / Debts</label>
          <input
            type="number"
            value={debts || ''}
            onChange={(e) => setDebts(Number(e.target.value))}
            placeholder="0.00"
            className="w-full p-2.5 rounded-xl bg-islamic-deep border border-islamic-gold/30 text-islamic-cream focus:outline-none"
          />
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-islamic-gold/15 border border-islamic-gold/40 flex items-center justify-between text-islamic-gold font-serif">
        <div>
          <span className="text-[11px] block uppercase text-islamic-cream/70">Total Net Wealth</span>
          <span className="text-lg font-bold">${totalWealth.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="text-right">
          <span className="text-[11px] block uppercase text-islamic-gold">Zakat Payable (2.5%)</span>
          <span className="text-2xl font-extrabold text-gold-gradient">${zakatDue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
      </div>
    </div>
  );
};
