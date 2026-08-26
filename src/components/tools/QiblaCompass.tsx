import React, { useState, useEffect } from 'react';
import { Compass, Navigation, MapPin } from 'lucide-react';

export const QiblaCompass: React.FC = () => {
  const [heading, setHeading] = useState<number | null>(null);
  const [qiblaBearing, setQiblaBearing] = useState<number | null>(null);
  const [locationStatus, setLocationStatus] = useState<string>('Press below to calibrate');

  // Kaaba Coordinates
  const KAABA_LAT = 21.422487;
  const KAABA_LNG = 39.826208;

  // Haversine/Spherical Trigonometry to calculate Qibla direction
  const calculateQibla = (lat: number, lng: number) => {
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const toDeg = (rad: number) => (rad * 180) / Math.PI;

    const phiK = toRad(KAABA_LAT);
    const lambdaK = toRad(KAABA_LNG);
    const phi = toRad(lat);
    const lambda = toRad(lng);

    const y = Math.sin(lambdaK - lambda);
    const x = Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda);

    let qibla = toDeg(Math.atan2(y, x));
    qibla = (qibla + 360) % 360; // Normalize to 0-360
    
    setQiblaBearing(Math.round(qibla * 10) / 10);
  };

  const requestCompassAndLocation = () => {
    setLocationStatus('Locating...');
    
    // 1. Get GPS Location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          calculateQibla(pos.coords.latitude, pos.coords.longitude);
          setLocationStatus(`Lat: ${pos.coords.latitude.toFixed(2)}, Lon: ${pos.coords.longitude.toFixed(2)}`);
          
          // 2. Request Compass Sensor
          if (typeof (DeviceOrientationEvent as any)?.requestPermission === 'function') {
            (DeviceOrientationEvent as any).requestPermission().then((state: string) => {
              if (state === 'granted') {
                window.addEventListener('deviceorientation', handleOrientation);
              }
            });
          } else if ('ondeviceorientation' in window) {
            window.addEventListener('deviceorientation', handleOrientation);
          } else {
            alert('Compass sensor not available on this device. Manual bearing generated.');
          }
        },
        (error) => {
          setLocationStatus('Location access denied');
          alert('Please allow location access to calculate accurate Qibla direction.');
        }
      );
    } else {
      setLocationStatus('Geolocation unsupported');
    }
  };

  const handleOrientation = (e: DeviceOrientationEvent) => {
    // iOS requires webkitCompassHeading, Android uses absolute alpha
    let dir = (e as any).webkitCompassHeading || e.alpha;
    if (dir !== null) {
      // If alpha, it's counter-clockwise from north, so 360 - alpha is bearing
      if (!(e as any).webkitCompassHeading) {
        dir = 360 - dir;
      }
      setHeading(Math.round(dir));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 glass-card rounded-3xl border border-islamic-gold/40 shadow-2xl text-center text-islamic-cream space-y-6">
      <div className="space-y-1">
        <div className="inline-flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1 rounded-full bg-islamic-gold/15 border border-islamic-gold/30 text-islamic-gold text-xs font-serif font-bold uppercase">
          <Compass className="w-3.5 h-3.5" />
          <span>Live Qibla Direction</span>
        </div>
        <h3 className="font-serif text-xl font-bold text-gold-gradient">Direction to Al-Masjid Al-Haram</h3>
        <p className="text-xs text-islamic-cream/70">Holy Kaaba, Makkah Al-Mukarramah</p>
      </div>

      {/* Compass Visual Dial */}
      <div className="relative w-52 h-52 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-islamic-gold/40 bg-islamic-deep/80 shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center justify-center transition-transform duration-500 ease-out"
             style={{ transform: `rotate(${-(heading || 0)}deg)` }}>
          
          {/* Cardinal Directions */}
          <span className="absolute top-2 text-xs font-bold text-islamic-gold">N</span>
          <span className="absolute right-3 text-xs font-bold text-islamic-cream/60">E</span>
          <span className="absolute bottom-2 text-xs font-bold text-islamic-cream/60">S</span>
          <span className="absolute left-3 text-xs font-bold text-islamic-cream/60">W</span>

          {/* Qibla Indicator Marker */}
          {qiblaBearing !== null && (
            <div 
              className="absolute w-full h-full"
              style={{ transform: `rotate(${qiblaBearing}deg)` }}
            >
              <div className="w-2 h-2 rounded-full bg-islamic-emerald absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_10px_rgba(16,185,129,1)]"></div>
            </div>
          )}
        </div>
        
        {/* Needle pointing to Qibla (Phone orientation relative) */}
        <div className="absolute z-10 w-full h-full flex items-center justify-center transition-transform duration-500 ease-out"
             style={{ transform: `rotate(${(qiblaBearing || 0) - (heading || 0)}deg)` }}>
          <div className="flex flex-col items-center">
            <Navigation className={`w-10 h-10 filter drop-shadow-md transition-colors ${Math.abs((qiblaBearing || 0) - (heading || 0)) < 5 ? 'text-islamic-emerald fill-islamic-emerald' : 'text-islamic-gold fill-islamic-gold'}`} />
            <span className="text-[10px] font-bold text-islamic-gold uppercase mt-1">Kaaba</span>
          </div>
        </div>
      </div>

      {/* Degree Meta & Sensor Action */}
      <div className="space-y-3 pt-2 border-t border-islamic-gold/20 text-xs font-serif">
        <div className="flex items-center justify-between px-4">
          <span className="text-islamic-cream/70">Calculated Angle:</span>
          <span className="font-bold text-islamic-gold">{qiblaBearing ? `${qiblaBearing}°` : '--°'}</span>
        </div>
        <div className="flex items-center justify-between px-4">
          <span className="text-islamic-cream/70">Current GPS:</span>
          <span className="font-bold text-islamic-cream">{locationStatus}</span>
        </div>

        <button
          onClick={requestCompassAndLocation}
          className="w-full py-2.5 rounded-xl bg-islamic-gold/20 hover:bg-islamic-gold/30 text-islamic-gold border border-islamic-gold/40 font-bold transition-all flex items-center justify-center gap-2"
        >
          <MapPin className="w-4 h-4" />
          <span>Calibrate Location & Compass</span>
        </button>
      </div>
    </div>
  );
};
