/**
 * Footer minimalista editorial.
 * Sin redundancia: cierre limpio con monograma y copyright.
 */

import { IDENTITY } from '@/lib/data';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-mist/[0.06] py-12 mt-20">
      <div className="container-editorial flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs tracking-[0.3em] text-metal">JR</span>
          <span className="hairline w-10" />
          <span className="text-xs text-silver/70 font-mono">
            {IDENTITY.fullName}
          </span>
        </div>

        <div className="text-[10px] tracking-[0.28em] uppercase text-silver/60">
          © {year} · Crafted with motion in {IDENTITY.location}
        </div>
      </div>
    </footer>
  );
}
