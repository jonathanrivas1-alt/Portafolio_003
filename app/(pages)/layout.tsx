/**
 * Inner Layout — Para todas las páginas excepto home
 * Reutiliza navbar, footer, effectos visuales
 * NO muestra intro cinematográfica (ya fue mostrada en home)
 */

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AmbientBackground } from '@/components/effects/AmbientBackground';
import { GrainOverlay } from '@/components/effects/GrainOverlay';

export default function InnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
