/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Heart,
  MapPin,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Moon,
} from "lucide-react";

const BASE = import.meta.env.BASE_URL;
const MEETING = new Date("2026-04-16T22:00:00-04:00");

const StarMap = () => {
  const reduceMotion = useReducedMotion();
  const [stars, setStars] = useState<{ x: number; y: number; size: number; opacity: number }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[450px] mx-auto group">
      <div className="absolute inset-0 rounded-full border border-gold/20 flex items-center justify-center p-4">
        <div className="w-full h-full rounded-full border-[0.5px] border-gold/10 bg-[#0c1e3d44] relative overflow-hidden shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]">
          <div className="absolute inset-x-0 top-1/4 h-32 bg-white/5 blur-3xl -rotate-12 transform-gpu" />

          {stars.map((star, i) => (
            <motion.div
              key={i}
              initial={{ opacity: star.opacity }}
              animate={reduceMotion ? { opacity: star.opacity } : { opacity: [star.opacity, star.opacity * 0.4, star.opacity] }}
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

          {/* Crux constellation — 4 connected stars in the south sky */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
            <g stroke="rgba(255,255,255,0.35)" strokeWidth="0.25" fill="white">
              <line x1="36" y1="22" x2="40" y2="34" />
              <line x1="40" y1="34" x2="44" y2="46" />
              <line x1="32" y1="32" x2="48" y2="36" />
              <circle cx="36" cy="22" r="0.9" />
              <circle cx="40" cy="34" r="0.9" />
              <circle cx="44" cy="46" r="1.1" />
              <circle cx="32" cy="32" r="0.7" />
              <circle cx="48" cy="36" r="0.7" />
            </g>
          </svg>
          <div className="absolute top-[24%] left-[34%] -translate-x-1/2 text-[11px] opacity-70 uppercase tracking-[0.25em] font-sans gold-text">
            Crux
          </div>

          {/* Alpha Centauri */}
          <div className="absolute bottom-[28%] right-[22%] flex flex-col items-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]" />
            <span className="text-[10px] mt-1 opacity-60 uppercase tracking-[0.2em] font-sans">α Centauri</span>
          </div>

          {/* Vega — northern sky, low on this latitude */}
          <div className="absolute top-[18%] right-[20%] flex flex-col items-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />
            <span className="text-[10px] mt-1 opacity-60 uppercase tracking-[0.2em] font-sans">Vega</span>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] gold-text/70 opacity-70 uppercase tracking-[0.4em] font-sans font-medium whitespace-nowrap">
            Cielo del Sur
          </div>

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

const photos = [
  { src: `${BASE}photos/01-motorcycle-milkyway.jpg`, caption: "La noche en que el cielo nos vio llegar", rotation: -5 },
  { src: `${BASE}photos/02-selfie-jacket.jpg`, caption: "La primera sonrisa que fue solo nuestra", rotation: 4 },
  { src: `${BASE}photos/03-table-curtain.jpg`, caption: "Brindis tímido, corazón valiente", rotation: -2 },
  { src: `${BASE}photos/04-cheek-kiss.jpg`, caption: "Tu mejilla, mi lugar favorito del mundo", rotation: 3 },
];

const Slideshow = () => {
  const [index, setIndex] = useState(0);
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
          role="button"
          aria-label="Siguiente foto"
        >
          <div className="polaroid-inner bg-[#1a2b4b]">
            <img
              src={photos[index].src}
              alt={photos[index].caption}
              className="w-full h-full object-cover transition-opacity duration-700"
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes("unsplash.com")) {
                  target.src = "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=800&q=80";
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
        <button onClick={prev} aria-label="Foto anterior" className="p-3 rounded-full border border-gold/20 text-gold hover:bg-gold/10 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <button onClick={next} aria-label="Foto siguiente" className="p-3 rounded-full border border-gold/20 text-gold hover:bg-gold/10 transition-colors">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

const Playlist = () => (
  <div className="glass-panel p-5 md:p-6 shadow-2xl">
    <div className="mb-3 flex items-center justify-between">
      <span className="text-[11px] uppercase tracking-[0.3em] gold-text font-sans font-bold">
        Nuestra playlist
      </span>
      <span className="text-[11px] uppercase tracking-[0.2em] opacity-60 font-sans italic">
        En Spotify
      </span>
    </div>
    <iframe
      title="Nuestra playlist en Spotify"
      src="https://open.spotify.com/embed/playlist/4UM1r4r2Yi3ZPt9Qntwnk5?utm_source=generator&theme=0"
      width="100%"
      height={152}
      frameBorder={0}
      loading="lazy"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      className="rounded-[12px]"
    />
    <p className="mt-3 text-center text-[11px] uppercase tracking-[0.3em] opacity-70 font-sans italic">
      Las canciones que nos cuentan
    </p>
  </div>
);

const Memory = () => (
  <div className="glass-panel p-4 md:p-5 shadow-2xl">
    <video
      className="w-full rounded-[12px] aspect-[9/16] md:aspect-video object-cover bg-black"
      controls
      playsInline
      preload="metadata"
      poster={`${BASE}photos/01-motorcycle-milkyway.jpg`}
    >
      <source src={`${BASE}video/nuestra-noche.mp4`} type="video/mp4" />
    </video>
    <p className="mt-4 text-center text-[12px] uppercase tracking-[0.3em] gold-text/80 opacity-80 font-sans">
      Un fragmento de nuestra noche
    </p>
  </div>
);

const useElapsed = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);
  const ms = Math.max(0, now.getTime() - MEETING.getTime());
  const totalMinutes = Math.floor(ms / 60_000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
  return { days, hours, minutes };
};

export default function App() {
  const [horoscope, setHoroscope] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const elapsed = useElapsed();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    fetch(`${BASE}horoscope.json`)
      .then((r) => r.json())
      .then((data) => setHoroscope(data.text))
      .catch(() =>
        setHoroscope(
          "El desierto nos vio encontrarnos y desde entonces el cielo es nuestro testigo. Que cada luna nos siga encontrando juntos."
        )
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-sky-gradient overflow-x-hidden relative selection:bg-gold/30">
      <div className="fixed inset-0 pointer-events-none opacity-30">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full w-0.5 h-0.5"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.5,
            }}
          />
        ))}
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-8 py-16 lg:py-24 grid lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-24 items-center">
        <div className="space-y-16 lg:space-y-24">
          <header className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="uppercase tracking-[0.5em] text-[11px] gold-text opacity-80 mb-3 block font-sans font-semibold">
                Un mes bajo las estrellas
              </span>
              <h1
                className="gold-text mb-6 leading-none tracking-tighter"
                style={{ fontSize: "clamp(3rem, 12vw, 9rem)" }}
              >
                Patricia <span className="font-sans font-light">&</span> Amick
              </h1>
              <div className="flex flex-col gap-2 border-l border-gold/40 pl-6">
                <p className="text-lg md:text-xl italic opacity-90 font-serif">
                  Nos encontramos el 16 de Abril de 2026 · 22:00h
                </p>
                <div className="flex items-center gap-2 text-white/70">
                  <MapPin size={14} />
                  <p className="text-xs uppercase tracking-widest font-sans">
                    San Pedro de Atacama, Chile
                  </p>
                </div>
                <p
                  className="mt-3 text-sm md:text-base font-serif italic gold-text/90"
                  aria-live="polite"
                >
                  Hace {elapsed.days} {elapsed.days === 1 ? "día" : "días"}, {elapsed.hours}h y {elapsed.minutes}min · y contando.
                </p>
                <div className="mt-4">
                  <span className="text-[11px] uppercase tracking-[0.3em] gold-text opacity-80 font-sans italic">
                    De Patricia, con todo mi amor
                  </span>
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pt-8 border-t border-white/5"
          >
            <Playlist />
          </motion.div>
        </div>

        <div className="space-y-12 lg:space-y-16 flex flex-col justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Slideshow />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Memory />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-10 md:p-14 relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] transition-opacity group-hover:opacity-[0.07]">
              <Sparkles size={128} className="text-gold" />
            </div>

            <div className="relative z-10 space-y-10">
              <div className="space-y-4">
                <h2 className="gold-text text-3xl font-serif italic tracking-wide">
                  Una carta para ti, mi amor
                </h2>
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
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="text-xl md:text-2xl leading-relaxed text-[#f8f9fa] opacity-95 font-serif italic text-center"
                >
                  {horoscope}
                </motion.p>
              )}

              <footer className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
                <div className="space-y-1">
                  <span className="text-[11px] uppercase tracking-[0.3em] opacity-70 font-sans block">
                    Con todo mi amor, Patricia
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.2em] opacity-60 font-sans italic">
                    San Pedro de Atacama · Mayo 2026
                  </span>
                </div>
                <div className="flex gap-4 text-gold/70">
                  <motion.div
                    animate={reduceMotion ? {} : { rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles size={16} />
                  </motion.div>
                  <Moon size={16} />
                  <Heart size={16} fill="currentColor" className="text-gold/60" />
                </div>
              </footer>
            </div>
          </motion.div>
        </div>
      </main>

      <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />

      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-4 opacity-40">
        <p className="text-[11px] uppercase tracking-[0.6em] font-sans">Eternidad</p>
        <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
      </div>
    </div>
  );
}
