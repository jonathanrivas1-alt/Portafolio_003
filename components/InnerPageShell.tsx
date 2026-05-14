/**
 * InnerPageShell — Para páginas interiores (sin Intro cinematográfica)
 *
 * Responsabilidades:
 *  - Renderizar Navbar, efectos de fondo, Footer
 *  - NO mostrar intro (ya fue mostrada en home)
 */

'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AmbientBackground } from '@/components/effects/AmbientBackground';
import { GrainOverlay } from '@/components/effects/GrainOverlay';

export function InnerPageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AmbientBackground />
      <GrainOverlay />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
