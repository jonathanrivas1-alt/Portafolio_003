'use client';

/**
 * About — Estilo editorial híbrido:
 *  Izquierda: bloque terminal minimalista con whoami
 *  Derecha:   párrafo editorial con stats premium
 */

import { motion } from 'framer-motion';
import { ABOUT_BLOCK, STATS, IDENTITY } from '@/lib/data';
import { GridBackdrop } from '@/components/effects/GridBackdrop';

export function About() {
  return (
    <section id="about" className="relative py-32 md:py-48">
      <GridBackdrop />

      <div className="container-editorial">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="eyebrow mb-6">About</div>
          <h2 className="font-display text-display-lg max-w-3xl text-balance">
            An engineer building <span className="text-metal italic">intelligent</span> systems.
          </h2>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* ── Terminal block ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="card-premium font-mono text-sm">
              {/* Window chrome */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-mist/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-mist/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-mist/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-mist/15" />
                </div>
                <span className="text-[10px] tracking-[0.3em] text-silver/60 uppercase">
                  ~/about
                </span>
              </div>

              {/* Prompt */}
              <div className="flex items-baseline gap-2 text-mist/95">
                <span className="text-silver/60">$</span>
                <span className="caret">{ABOUT_BLOCK.prompt}</span>
              </div>

              {/* Intro */}
              <p className="mt-6 text-mist/75 leading-relaxed">
                {ABOUT_BLOCK.intro}
              </p>

              {/* Focus areas */}
              <div className="mt-8">
                <div className="text-silver/70 text-xs tracking-[0.25em] uppercase mb-4">
                  // focus areas
                </div>
                <ul className="space-y-2">
                  {ABOUT_BLOCK.focusAreas.map((area, i) => (
                    <li key={area} className="flex items-baseline gap-3 text-mist/80">
                      <span className="text-silver/50 text-xs">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* ── Editorial paragraph + stats ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            <p className="text-mist/70 text-base leading-relaxed text-pretty">
              {ABOUT_BLOCK.paragraph}
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map(stat => (
                <div
                  key={stat.label}
                  className="card-premium py-6 px-5 text-center"
                >
                  <div className="font-display text-3xl md:text-4xl text-metal">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-[10px] tracking-[0.25em] uppercase text-silver/80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick info */}
            <div className="text-xs text-silver/70 font-mono space-y-1.5 pt-4 border-t border-mist/[0.06]">
              <div>name      → {IDENTITY.fullName}</div>
              <div>career    → {IDENTITY.career}</div>
              <div>location  → {IDENTITY.location}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
