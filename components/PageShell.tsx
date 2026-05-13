'use client';

/**
 * PageShell — Cascarón cliente que envuelve la home.
 *
 * Responsabilidades:
 *  - Mostrar la Intro cinematográfica una vez por sesión
 *  - Mantener el contenido oculto hasta que la intro termine
 *  - Renderizar Navbar, efectos de fondo, Footer
 */

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Intro } from '@/components/sections/Intro';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AmbientBackground } from '@/components/effects/AmbientBackground';
import { GrainOverlay } from '@/components/effects/GrainOverlay';

export function PageShell({ children }: { children: React.ReactNode }) {
  // Asumimos intro visible hasta que se monte y revise sessionStorage
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    // Si la intro ya fue vista en esta sesión, mostrar contenido inmediatamente
    if (sessionStorage.getItem('__jr_intro_seen__') === '1') {
      setIntroDone(true);
    }
  }, []);

  return (
    <>
      <AmbientBackground />
      <GrainOverlay />

      <AnimatePresence>
        {!introDone && <Intro onDone={() => setIntroDone(true)} />}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </motion.div>
    </>
  );
}
