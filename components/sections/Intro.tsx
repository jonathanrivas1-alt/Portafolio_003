'use client';

/**
 * Intro cinematográfica fullscreen.
 *
 * Secuencia:
 *  1. Pantalla negra absoluta
 *  2. Fade-in del cursor
 *  3. Typing: INITIALIZING SYSTEM
 *  4. Typing: LOADING INTERFACE
 *  5. Typing: ACCESS GRANTED  (con glow sutil)
 *  6. Reveal del botón ENTER
 *  7. Al click → fade-out con blur cinematográfico
 *
 * Persistencia: una vez visto en la sesión, no se vuelve a mostrar.
 */

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const LINES = [
  { text: 'INITIALIZING SYSTEM', delay: 0,   typingMs: 38 },
  { text: 'LOADING INTERFACE',   delay: 600, typingMs: 38 },
  { text: 'ACCESS GRANTED',      delay: 1300, typingMs: 50, accent: true },
];

const SESSION_KEY = '__jr_intro_seen__';

export function Intro({ onDone }: { onDone?: () => void }) {
  const [visible, setVisible] = useState(true);
  const [lines, setLines] = useState<string[]>(['', '', '']);
  const [showEnter, setShowEnter] = useState(false);
  const [exiting, setExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // No mostrar la intro si ya se vio en esta sesión
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(SESSION_KEY) === '1') {
      setVisible(false);
      onDone?.();
    }
  }, [onDone]);

  // Secuencia de typing
  useEffect(() => {
    if (!visible) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    LINES.forEach((line, idx) => {
      timers.push(
        setTimeout(() => {
          let i = 0;
          const t = setInterval(() => {
            i++;
            setLines(prev => {
              const next = [...prev];
              next[idx] = line.text.slice(0, i);
              return next;
            });
            if (i >= line.text.length) clearInterval(t);
          }, line.typingMs);
          timers.push(t as unknown as ReturnType<typeof setTimeout>);
        }, line.delay),
      );
    });

    timers.push(setTimeout(() => setShowEnter(true), 2400));
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  const handleEnter = () => {
    setExiting(true);
    setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1');
      setVisible(false);
      onDone?.();
    }, 1200);
  };

  // Permitir entrar con teclado
  useEffect(() => {
    if (!showEnter) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') handleEnter();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showEnter]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          animate={
            exiting
              ? { opacity: 0, filter: 'blur(24px)', scale: 1.04 }
              : { opacity: 1, filter: 'blur(0px)', scale: 1 }
          }
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Glow ambient detrás del texto */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              background:
                'radial-gradient(ellipse 60% 40% at center, rgba(255,255,255,0.06), transparent 70%)',
            }}
          />
          {/* Grain interno */}
          <div className="grain-overlay opacity-[0.08]" />

          <div className="relative font-mono text-mist/85 tracking-[0.18em] text-[11px] md:text-sm">
            {LINES.map((line, i) => (
              <div
                key={i}
                className={`mb-3 ${line.accent ? 'text-metal text-base md:text-xl tracking-[0.24em] mt-6' : ''}`}
              >
                <span className="text-silver/60 mr-3">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={lines[i] && lines[i].length < line.text.length ? 'caret' : ''}>
                  {lines[i]}
                </span>
              </div>
            ))}

            <AnimatePresence>
              {showEnter && (
                <motion.button
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  onClick={handleEnter}
                  className="group relative mt-12 inline-flex items-center gap-4 px-7 py-3 rounded-full border border-mist/15 hover:border-mist/40 transition-all duration-700"
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-mist animate-pulse-soft" />
                  <span className="tracking-[0.4em] text-mist/90 text-[11px]">ENTER</span>
                  <span className="text-silver/60 text-[10px] tracking-widest hidden md:inline">
                    ↵
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
