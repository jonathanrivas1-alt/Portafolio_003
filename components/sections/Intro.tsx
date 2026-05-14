'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SESSION_KEY = '__jr_intro_seen__';

export function Intro({ onDone }: { onDone?: () => void }) {
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (sessionStorage.getItem(SESSION_KEY) === '1') {
      setVisible(false);
      onDone?.();
    }
  }, [onDone]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 14000),
      setTimeout(() => setPhase(2), 20000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleEnter = () => {
    setExiting(true);

    setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1');
      setVisible(false);
      onDone?.();
    }, 1500);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={
          exiting
            ? {
              opacity: 0,
              scale: 1.1,
              filter: 'blur(20px)',
            }
            : {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
            }
        }
        transition={{ duration: 1.4 }}
        className="fixed inset-0 z-[999] overflow-hidden bg-black"
      >

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)]" />

        {phase === 0 && (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >

              <svg
                className="absolute w-[160vw] h-[240px]"
                viewBox="0 0 2200 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >

                <motion.path
                  d="
                  M0 150
                  L350 150
                  L390 150
                  L410 120
                  L430 220
                  L460 40
                  L490 260
                  L520 150
                  L2200 150
                  "
                  stroke="rgba(255,255,255,0.95)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{
                    pathLength: 0,
                    opacity: 0,
                  }}
                  animate={{
                    pathLength: [0, 1],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3.4,
                    ease: 'easeInOut',
                  }}
                  style={{
                    filter: 'drop-shadow(0 0 14px rgba(255,255,255,0.9))',
                  }}
                />

                <motion.path
                  d="
                  M0 150
                  L850 150
                  L890 150
                  L910 120
                  L930 220
                  L960 40
                  L990 260
                  L1020 150

                  L1120 150

                  L1160 120
                  L1180 220
                  L1210 40
                  L1240 260
                  L1270 150

                  L2200 150
                  "
                  stroke="rgba(255,255,255,0.95)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{
                    pathLength: 0,
                    opacity: 0,
                  }}
                  animate={{
                    pathLength: [0, 1],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    delay: 2.8,
                    duration: 3.8,
                    ease: 'easeInOut',
                  }}
                  style={{
                    filter: 'drop-shadow(0 0 14px rgba(255,255,255,0.9))',
                  }}
                />

                <motion.path
                  d="
                  M0 150

                  L1250 150
                  L1290 150
                  L1310 120
                  L1330 220
                  L1360 40
                  L1390 260
                  L1420 150

                  L1500 150

                  L1540 120
                  L1560 220
                  L1590 40
                  L1620 260
                  L1650 150

                  L1730 150

                  L1770 120
                  L1790 220
                  L1820 40
                  L1850 260
                  L1880 150

                  L2200 150
                  "
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{
                    pathLength: 0,
                    opacity: 0,
                  }}
                  animate={{
                    pathLength: [0, 1],
                    opacity: [0, 1, 1, 0.9, 0.7, 0.4, 0.2, 0],
                  }}
                  transition={{
                    delay: 6,
                    duration: 8,
                    ease: 'easeOut',
                    times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
                  }}
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(255,255,255,1))',
                  }}
                />

              </svg>

              <div className="absolute bottom-24 text-center">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-[11px] tracking-[0.5em] text-white/70 font-mono mb-3"
                >
                  INICIALIZANDO SISTEMA
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="text-[10px] tracking-[0.4em] text-white/40 font-mono"
                >
                  03 PULSOS DETECTADOS
                </motion.p>
              </div>

            </motion.div>
          </div>
        )}

        {phase === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 overflow-hidden"
          >

            <div className="absolute inset-0">

              {Array.from({ length: 400 }).map((_, i) => {
                const side = Math.floor(Math.random() * 4);

                let style: any = {
                  animationDelay: `${Math.random() * 3}s`,
                };

                if (side === 0) {
                  style = {
                    ...style,
                    left: '-30px',
                    top: `${Math.random() * 100}%`,
                    animationName: 'fromLeft',
                  };
                }

                if (side === 1) {
                  style = {
                    ...style,
                    right: '-30px',
                    top: `${Math.random() * 100}%`,
                    animationName: 'fromRight',
                  };
                }

                if (side === 2) {
                  style = {
                    ...style,
                    top: '-30px',
                    left: `${Math.random() * 100}%`,
                    animationName: 'fromTop',
                  };
                }

                if (side === 3) {
                  style = {
                    ...style,
                    bottom: '-30px',
                    left: `${Math.random() * 100}%`,
                    animationName: 'fromBottom',
                  };
                }

                return (
                  <span
                    key={i}
                    className="universe-particle"
                    style={style}
                  />
                );
              })}

            </div>

            <div className="absolute bottom-24 w-full text-center">
              <p className="text-[11px] tracking-[0.5em] text-white/60 font-mono">
                GENERANDO ENTORNO
              </p>
            </div>

          </motion.div>
        )}

        {phase === 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >

            <div className="orb-wrapper">
              <div className="orb-core" />
              <div className="orb-ring" />
              <div className="orb-ring delay" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-20 flex flex-col items-center"
            >

              <div className="border border-white/10 bg-white/[0.03] px-10 py-4 backdrop-blur-xl mb-8">
                <h1 className="text-white text-sm md:text-xl tracking-[0.6em] font-light uppercase text-center">
                  Bienvenido a mi mundo
                </h1>
              </div>

              <button
                onClick={handleEnter}
                className="group relative overflow-hidden rounded-full border border-white/20 px-10 py-4 text-[11px] uppercase tracking-[0.5em] text-white transition-all duration-700 hover:border-white/50 hover:bg-white/5"
              >
                <span className="relative z-10">
                  Entrar
                </span>

                <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_70%)]" />
              </button>

            </motion.div>

          </motion.div>
        )}

      </motion.div>
    </AnimatePresence>
  );
}