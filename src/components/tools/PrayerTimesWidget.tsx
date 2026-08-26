import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Sun, Moon, Sunset, Compass } from 'lucide-react';

interface PrayerTime {
  name: string;
  time: string;
  time24: string;
  icon: React.ReactNode;
  isNext?: boolean;
}

export const PrayerTimesWidget: React.FC = () => {
  const [city, setCity] = useState('Madinah');
  const [country, setCountry] = useState('Saudi Arabia');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  
  const [prayers, setPrayers] = useState<PrayerTime[]>([]);
  const [nextPrayer, setNextPrayer] = useState<{name: string, time: string, timeDiffStr: string} | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPrayerTimes = async (useCoords: boolean = false) => {
    setIsLoading(true);
    try {
      let url = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=4`; // Method 4: Umm Al-Qura
      
      if (useCoords && userLocation) {
        url = `https://api.aladhan.com/v1/timings?latitude=${userLocation.lat}&longitude=${userLocation.lng}&method=2`; // ISNA for generic coords
      }

      const res = await fetch(url);
      const data = await res.json();
      
      if (data && data.data && data.data.timings) {
        const t = data.data.timings;
        
        // Format to 12h
        const format12h = (time24: string) => {
          const [h, m] = time24.split(':');
          const hours = parseInt(h);
          const ampm = hours >= 12 ? 'PM' : 'AM';
          const h12 = hours % 12 || 12;
          return `${h12.toString().padStart(2, '0')}:${m} ${ampm}`;
        };

        const prayerList: PrayerTime[] = [
          { name: 'Fajr', time: format12h(t.Fajr), time24: t.Fajr, icon: <Moon className="w-4 h-4 text-sky-400" /> },
          { name: 'Sunrise', time: format12h(t.Sunrise), time24: t.Sunrise, icon: <Sun className="w-4 h-4 text-amber-300" /> },
          { name: 'Dhuhr', time: format12h(t.Dhuhr), time24: t.Dhuhr, icon: <Sun className="w-4 h-4 text-yellow-400" /> },
          { name: 'Asr', time: format12h(t.Asr), time24: t.Asr, icon: <Sun className="w-4 h-4 text-orange-400" /> },
          { name: 'Maghrib', time: format12h(t.Maghrib), time24: t.Maghrib, icon: <Sunset className="w-4 h-4 text-rose-400" /> },
          { name: 'Isha', time: format12h(t.Isha), time24: t.Isha, icon: <Moon className="w-4 h-4 text-indigo-400" /> },
        ];

        // Determine Next Prayer
        const now = new Date();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();
        const currentTotalMinutes = currentHours * 60 + currentMinutes;

        let foundNext = false;
        for (let p of prayerList) {
          const [pH, pM] = p.time24.split(':').map(Number);
          const pTotalMinutes = pH * 60 + pM;
          
          if (pTotalMinutes > currentTotalMinutes) {
            p.isNext = true;
            foundNext = true;
            
            const diffMinutes = pTotalMinutes - currentTotalMinutes;
            const h = Math.floor(diffMinutes / 60);
            const m = diffMinutes % 60;
            setNextPrayer({
              name: p.name,
              time: p.time,
              timeDiffStr: `${h > 0 ? h + ' hr ' : ''}${m} mins`
            });
            break;
          }
        }
        
        // If all prayers passed today, Fajr tomorrow is next
        if (!foundNext && prayerList.length > 0) {
          prayerList[0].isNext = true;
          setNextPrayer({
            name: prayerList[0].name,
            time: prayerList[0].time,
            timeDiffStr: `Tomorrow`
          });
        }

        setPrayers(prayerList);
      }
    } catch (e) {
      console.error('Failed to fetch prayer times', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrayerTimes(false);
  }, [city, country]);

  useEffect(() => {
    if (userLocation) {
      fetchPrayerTimes(true);
    }
  }, [userLocation]);

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setCity('Current GPS');
          setCountry('Location');
        },
        () => alert('Location permission denied.')
      );
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setUserLocation(null);
    if (val === 'Madinah') { setCity('Madinah'); setCountry('Saudi Arabia'); }
    else if (val === 'Makkah') { setCity('Makkah'); setCountry('Saudi Arabia'); }
    else if (val === 'Karachi') { setCity('Karachi'); setCountry('Pakistan'); }
    else if (val === 'London') { setCity('London'); setCountry('UK'); }
    else if (val === 'New York') { setCity('New York'); setCountry('USA'); }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 glass-card rounded-3xl border border-islamic-gold/40 shadow-2xl text-islamic-cream space-y-6">
      
      {/* Header & Location Selection */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-islamic-gold/20 pb-4">
        <div>
          <h3 className="font-serif text-xl text-gold-gradient font-bold">Islamic Prayer Times</h3>
          <p className="text-xs text-islamic-cream/70 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-islamic-gold" />
            <span>{city}{country ? `, ${country}` : ''}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={city}
            onChange={handleCityChange}
            className="bg-islamic-deep text-islamic-gold text-xs font-serif px-3 py-1.5 rounded-xl border border-islamic-gold/30 focus:outline-none"
          >
            <option value="Madinah">Madinah Al-Munawwarah</option>
            <option value="Makkah">Makkah Al-Mukarramah</option>
            <option value="Karachi">Karachi, Pakistan</option>
            <option value="London">London, UK</option>
            <option value="New York">New York, USA</option>
            {userLocation && <option value="Current GPS">Current GPS Location</option>}
          </select>

          <button
            onClick={requestLocation}
            className="p-2 rounded-xl bg-islamic-gold/20 hover:bg-islamic-gold/30 text-islamic-gold border border-islamic-gold/40 transition-colors"
            title="Use My Location"
          >
            <Compass className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Next Prayer Highlight */}
      {nextPrayer && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-islamic-emerald/40 to-islamic-deep border border-islamic-gold/40 flex items-center justify-between shadow-gold-glow animate-pulse-slow">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="p-3 rounded-xl bg-islamic-gold/20 text-islamic-gold">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-serif uppercase tracking-widest text-islamic-gold">Next Prayer</span>
              <h4 className="font-serif text-lg font-bold text-islamic-cream">{nextPrayer.name} — {nextPrayer.time}</h4>
            </div>
          </div>
          <div className="text-right rtl:text-left">
            <span className="text-xs text-islamic-cream/70 font-serif block">Starts in</span>
            <span className="font-serif text-sm font-bold text-islamic-gold">{nextPrayer.timeDiffStr}</span>
          </div>
        </div>
      )}

      {/* Prayer Grid */}
      <div className={`grid grid-cols-2 sm:grid-cols-3 gap-3 transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
        {prayers.map((p) => (
          <div
            key={p.name}
            className={`p-3.5 rounded-2xl border transition-all ${
              p.isNext
                ? 'bg-islamic-gold/20 border-islamic-gold text-islamic-gold shadow-[0_0_15px_rgba(212,175,55,0.3)] scale-[1.02]'
                : 'bg-islamic-primary/30 border-islamic-gold/15 text-islamic-cream'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-serif font-semibold">{p.name}</span>
              {p.icon}
            </div>
            <span className="font-serif text-base font-bold tracking-tight block">
              {p.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
