/**
 * Route Transition — Efecto de transición suave entre páginas
 * Muestra una línea de progreso sutil cuando se navega
 */

'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function RouteTransition() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 500);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={isTransitioning ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-metal via-silver to-metal z-50 origin-left"
      style={{ pointerEvents: 'none' }}
    />
  );
}
