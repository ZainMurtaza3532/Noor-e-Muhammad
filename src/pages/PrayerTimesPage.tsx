import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Compass, Sun, Moon } from 'lucide-react';
import { IslamicPattern } from '../components/common/IslamicPattern';

interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export const PrayerTimesPage = () => {
  const [times, setTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{city: string, country: string} | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchTimesByCoords = async (lat: number, lng: number) => {
    setLoading(true);
    try {
      // First get times
      const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=1`);
      const data = await res.json();
      setTimes(data.data.timings);

      // Try reverse geocoding for city name (using a free fast api)
      const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
      const geoData = await geoRes.json();
      setLocation({
        city: geoData.city || geoData.locality || "Your Location",
        country: geoData.countryName || ""
      });
      setError(null);
    } catch (err) {
      setError("Failed to fetch prayer times. Please try again.");
    }
    setLoading(false);
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchTimesByCoords(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        setLoading(false);
        setError("Location access denied. Please allow location to get local prayer times.");
      }
    );
  };

  // Format 24h to 12h
  const formatTime = (time: string) => {
    const [h, m] = time.split(':');
    let hours = parseInt(h);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    return `${hours}:${m} ${ampm}`;
  };

  const getPrayerIcon = (name: string) => {
    switch (name) {
      case 'Fajr': return <Moon className="w-6 h-6 text-indigo-400" />;
      case 'Sunrise': return <Sun className="w-6 h-6 text-yellow-500" />;
      case 'Dhuhr': return <Sun className="w-6 h-6 text-yellow-600" />;
      case 'Asr': return <Sun className="w-6 h-6 text-orange-500" />;
      case 'Maghrib': return <Moon className="w-6 h-6 text-indigo-500" />;
      case 'Isha': return <Moon className="w-6 h-6 text-blue-900" />;
      default: return <Clock className="w-6 h-6 text-islamic-gold" />;
    }
  };

  return (
    <div className="min-h-screen bg-islamic-cream text-gray-800 pt-28 pb-20 px-4 relative overflow-hidden">
      <IslamicPattern className="absolute inset-0 opacity-5 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-12">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Compass className="w-8 h-8 text-islamic-gold" />
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-islamic-deep">
              Namaz Timings
            </h1>
          </div>
          <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
            Get accurate daily prayer times for your exact location.
          </p>
        </motion.div>

        {/* Location Request Card */}
        {!times && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-lg mx-auto border border-gray-100"
          >
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-islamic-primary">
              <MapPin className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-islamic-deep mb-4">Find Local Timings</h2>
            <p className="text-gray-600 mb-8">
              Allow location access to instantly calculate the precise prayer times for your city today.
            </p>
            
            {error && <p className="text-red-500 mb-4 text-sm font-semibold">{error}</p>}
            
            <button 
              onClick={handleGetLocation}
              disabled={loading}
              className="bg-islamic-primary hover:bg-islamic-deep text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105 w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
              ) : (
                <>
                  <MapPin className="w-5 h-5" />
                  Detect My Location
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Results Card */}
        {times && location && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="font-serif text-2xl font-bold text-islamic-deep flex items-center justify-center gap-2">
                <MapPin className="w-6 h-6 text-islamic-gold" />
                {location.city}, {location.country}
              </h2>
              <p className="text-gray-500 mt-2 font-medium">{new Date().toDateString()}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((prayer, i) => (
                <motion.div 
                  key={prayer}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-islamic-gold hover:shadow-lg transition-shadow flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-50 rounded-xl">
                      {getPrayerIcon(prayer)}
                    </div>
                    <span className="font-serif font-bold text-xl text-islamic-deep">{prayer}</span>
                  </div>
                  <span className="font-sans font-bold text-lg text-gray-800">
                    {formatTime(times[prayer as keyof PrayerTimes])}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button 
                onClick={() => setTimes(null)}
                className="text-islamic-primary hover:text-islamic-deep font-semibold underline text-sm"
              >
                Change Location
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};
