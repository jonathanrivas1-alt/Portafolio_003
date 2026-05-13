'use client';

/**
 * AmbientBackground
 * Gradientes radiales suaves que se desplazan lentamente con el scroll
 * y el mouse. Crea la atmósfera "cinemática" sin sobrecargar performance.
 */

import { useEffect, useRef } from 'react';

export function AmbientBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let mx = 50;
    let my = 50;

    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth) * 100;
      my = (e.clientY / window.innerHeight) * 100;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.setProperty('--mx', `${mx}%`);
          el.style.setProperty('--my', `${my}%`);
          raf = 0;
        });
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={
        {
          '--mx': '50%',
          '--my': '40%',
          background: `
            radial-gradient(800px circle at var(--mx) var(--my),
              rgba(255,255,255,0.045),
              transparent 50%),
            radial-gradient(1200px circle at 80% 10%,
              rgba(180,180,200,0.025),
              transparent 60%),
            radial-gradient(900px circle at 20% 90%,
              rgba(255,255,255,0.02),
              transparent 60%)
          `,
        } as React.CSSProperties
      }
    />
  );
}
