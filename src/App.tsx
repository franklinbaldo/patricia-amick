/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  MapPin, 
  Pause, 
  Play,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Moon
} from "lucide-react";

/**
 * STAR MAP COMPONENT
 * Stylized representation of the night sky in San Pedro de Atacama
 * Artistic Flair version: Circular map with gold accents
 */
const StarMap = () => {
  const [stars, setStars] = useState<{ x: number; y: number; size: number; opacity: number }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.7 + 0.3
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[450px] mx-auto group">
      <div className="absolute inset-0 rounded-full border border-gold/20 flex items-center justify-center p-4">
        <div className="w-full h-full rounded-full border-[0.5px] border-gold/10 bg-[#0c1e3d44] relative overflow-hidden shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]">
          {/* Milky Way Highlight */}
          <div className="absolute inset-x-0 top-1/4 h-32 bg-white/5 blur-3xl -rotate-12 transform-gpu" />
          
          {/* Stars */}
          {stars.map((star, i) => (
            <motion.div
              key={i}
              initial={{ opacity: star.opacity }}
              animate={{ opacity: [star.opacity, star.opacity * 0.4, star.opacity] }}
              transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
              }}
            />
          ))}

          {/* Constellation Indicators */}
          <div className="absolute top-1/4 left-1/3 flex flex-col items-center">
            <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_12px_white]" />
            <span className="text-[8px] mt-1 opacity-40 uppercase tracking-[0.2em] font-sans">Crux</span>
          </div>
          
          <div className="absolute bottom-1/4 right-1/4 flex flex-col items-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
            <span className="text-[8px] mt-1 opacity-40 uppercase tracking-[0.2em] font-sans">Alpha Centauri</span>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-gold/60 uppercase tracking-[0.4em] font-sans font-medium whitespace-nowrap">
            Horizonte Sul
          </div>
          
          {/* Subtle Grid Lines like a vintage map */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="25" fill="none" stroke="white" strokeWidth="0.1" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="0.1" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.1" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.1" />
          </svg>
        </div>
      </div>
    </div>
  );
};

/**
 * PHOTO SLIDESHOW COMPONENT
 * Artistic Flair version: Polaroid style
 */
const Slideshow = () => {
  const [index, setIndex] = useState(0);
  const photos = [
    { src: "/input_file_0.png", caption: "Nuestro silencio en el desierto", rotation: -5 },
    { src: "/input_file_1.png", caption: "Donde el tiempo se detuvo", rotation: 4 },
    { src: "/input_file_2.png", caption: "El brillo que nos guía", rotation: -2 },
    { src: "/input_file_3.png", caption: "Nuestra constelación particular", rotation: 3 },
  ];

  const next = () => setIndex((prev) => (prev + 1) % photos.length);
  const prev = () => setIndex((prev) => (prev - 1 + photos.length) % photos.length);

  return (
    <div className="relative w-full h-[450px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20, rotate: photos[index].rotation - 10 }}
          animate={{ opacity: 1, x: 0, rotate: photos[index].rotation }}
          exit={{ opacity: 0, x: -20, rotate: photos[index].rotation + 10 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="polaroid w-[260px] md:w-[300px] cursor-pointer hover:scale-105 transition-transform"
          onClick={next}
        >
          <div className="polaroid-inner bg-[#1a2b4b]">
            <img 
              src={photos[index].src} 
              alt={photos[index].caption} 
              className="w-full h-full object-cover grayscale-[0.2] transition-opacity duration-700"
              referrerPolicy="no-referrer"
              onLoad={(e) => (e.target as HTMLImageElement).style.opacity = "1"}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes('picsum.photos')) {
                  target.src = `https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=800&q=80`; // Starry sky fallback
                }
              }}
            />
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-800 font-serif italic text-sm md:text-base">
              {photos[index].caption}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-0 -bottom-4 flex justify-center gap-6">
        <button onClick={prev} className="p-3 rounded-full border border-gold/20 text-gold hover:bg-gold/10 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <button onClick={next} className="p-3 rounded-full border border-gold/20 text-gold hover:bg-gold/10 transition-colors">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

const MusicVisualizer = ({ isPlaying }: { isPlaying: boolean }) => {
  return (
    <div className="flex items-end h-10 gap-1.5 px-2">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <motion.div
          key={i}
          animate={isPlaying ? { height: [12, Math.random() * 28 + 12, 12] } : { height: 4 }}
          transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.1 }}
          className="music-bar w-[4px]"
        />
      ))}
    </div>
  );
};

export default function App() {
  const [horoscope, setHoroscope] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetchHoroscope();
  }, []);

  const fetchHoroscope = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/horoscope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: "16-04-2026",
          location: "San Pedro do Atacama",
          names: "Patricia e Amick"
        })
      });
      const data = await response.json();
      setHoroscope(data.text);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-gradient overflow-x-hidden relative selection:bg-gold/30">
      {/* Decorative Stars background */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full w-0.5 h-0.5"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.5
            }}
          />
        ))}
      </div>

      {/* Hidden Music Player */}
      <div className="hidden">
        {isPlaying && (
          <iframe 
            src="https://www.youtube.com/embed/8I_v_v0D9oU?autoplay=1&loop=1&playlist=8I_v_v0D9oU" 
            allow="autoplay"
          />
        )}
      </div>

      <main className="max-w-7xl mx-auto px-8 py-16 lg:py-24 grid lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-24 items-center">
        
        {/* LEFT SECTION: CONTENT & MAP */}
        <div className="space-y-16 lg:space-y-24">
          <header className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="uppercase tracking-[0.5em] text-[11px] gold-text opacity-70 mb-3 block font-sans font-semibold">
                El Encuentro de las Estrellas
              </span>
              <h1 className="text-7xl md:text-9xl gold-text mb-6 leading-none tracking-tighter">
                Patricia <span className="font-sans font-light">&</span> Amick
              </h1>
              <div className="flex flex-col gap-2 border-l border-gold/40 pl-6">
                <p className="text-lg md:text-xl italic opacity-90 font-serif">16 de Abril de 2026 • 22:00h</p>
                <div className="flex items-center gap-2 text-white/50">
                  <MapPin size={14} />
                  <p className="text-xs uppercase tracking-widest font-sans">San Pedro de Atacama, Chile</p>
                </div>
                <div className="mt-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gold/60 font-sans italic">De Patricia, con todo mi amor</span>
                </div>
              </div>
            </motion.div>
          </header>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <StarMap />
          </motion.div>

          <footer className="flex items-center gap-8 pt-8 border-t border-white/5">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-6 group"
            >
              <div className="p-4 rounded-full border border-gold/40 gold-text group-hover:bg-gold/10 transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.2)]">
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </div>
              <div className="space-y-2">
                <MusicVisualizer isPlaying={isPlaying} />
                <div className="text-[11px] uppercase tracking-[0.2em] gold-text font-sans font-bold">
                  {isPlaying ? "Sonando: Clair de Lune" : "Reproducir música"}
                </div>
              </div>
            </button>
          </footer>
        </div>

        {/* RIGHT SECTION: PHOTOS & HOROSCOPE */}
        <div className="space-y-16 lg:space-y-20 flex flex-col justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Slideshow />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-10 md:p-14 relative overflow-hidden group shadow-2xl"
          >
            {/* Corner Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] transition-opacity group-hover:opacity-[0.07]">
              <Sparkles size={128} className="text-gold" />
            </div>

            <div className="relative z-10 space-y-10">
              <div className="space-y-4">
                <h2 className="gold-text text-3xl font-serif italic tracking-wide">El Destino Escrito en el Cosmos</h2>
                <div className="w-16 h-0.5 bg-gold/40" />
              </div>

              {loading ? (
                <div className="space-y-6 animate-pulse">
                  <div className="h-4 w-full bg-white/5 rounded" />
                  <div className="h-4 w-[90%] bg-white/5 rounded" />
                  <div className="h-4 w-[95%] bg-white/5 rounded" />
                  <div className="h-4 w-[80%] bg-white/5 rounded mx-auto" />
                </div>
              ) : (
                <div className="prose prose-invert prose-amber max-w-none">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="space-y-8"
                  >
                    <p className="text-xl md:text-2xl leading-relaxed text-[#f8f9fa] opacity-95 font-serif italic text-center">
                      {horoscope}
                    </p>
                  </motion.div>
                </div>
              )}

              <footer className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.3em] opacity-50 font-sans block">
                    Astral Insight • v.2026
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] opacity-30 font-sans italic">
                    Conexão Atacama-Alma
                  </span>
                </div>
                <div className="flex gap-4 text-gold/60">
                   <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                     <Sparkles size={16} />
                   </motion.div>
                   <Moon size={16} />
                   <Heart size={16} fill="currentColor" className="text-gold/40" />
                </div>
              </footer>
            </div>
          </motion.div>
        </div>

      </main>

      {/* Background Vignette */}
      <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />

      {/* Global Bottom Text */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <p className="text-[10px] uppercase tracking-[0.6em] font-sans">Eternidad</p>
        <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
      </div>
    </div>
  );
}


