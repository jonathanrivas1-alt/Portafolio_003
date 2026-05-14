/**
 * About — Página dedicada
 * Contiene solo la sección About con transición suave.
 */

'use client';

import { motion } from 'framer-motion';
import { InnerPageShell } from '@/components/InnerPageShell';
import { About } from '@/components/sections/About';

export default function AboutPage() {
  return (
    <InnerPageShell>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen"
      >
        <div className="pt-32">
          <About />
        </div>
      </motion.div>
    </InnerPageShell>
  );
}
