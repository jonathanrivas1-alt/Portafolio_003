'use client';

/**
 * Hero — Sección protagónica estilo editorial premium.
 *
 *  Layout (desktop):
 *  ┌────────────────────────────────────────────────────────────┐
 *  │   eyebrow                                                  │
 *  │                                                            │
 *  │   JONATHAN                  ╭──────────╮                   │
 *  │   RIVAS                     │   FOTO   │                   │
 *  │                             │  GRANDE  │                   │
 *  │   Software Engineer         │ CIRCULAR │                   │
 *  │   AI · Systems · Automation ╰──────────╯                   │
 *  │                                                            │
 *  │   tagline ─────────                                        │
 *  └────────────────────────────────────────────────────────────┘
 */

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowDown, MapPin } from 'lucide-react';
import { IDENTITY } from '@/lib/data';

export function Hero() {
  const src = '/profile.PNG';
  const displayedTagline = IDENTITY.tagline;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden"
    >
      <div className="container-editorial w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ── Columna textual ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
className="lg:col-span-7 order-2 lg:order-1 max-w-[620px]"
          >
            {/* Eyebrow, para poner portafolio si se ncesita 
            <div className="eyebrow mb-8">
              <span>algún texto</span>
            </div>*/}

            {/* Nombre — display titánico */}
  <h1 className="font-display text-[5rem] md:text-[7rem] leading-[0.88] tracking-[-0.04em]">
              <span className="block">Jonathan Rivas</span>
            </h1>

            {/* Rol */}
<div className="mt-6 flex flex-wrap items-center gap-2 text-mist/85">
              <span className="text-sm md:text-base tracking-[0.18em] uppercase">
                Software Engineer  
              </span>
              <span className="text-silver/40">·</span>
              {IDENTITY.specialties.map((s, i) => (
                <span key={s} className="inline-flex items-center gap-3">
                  <span className="text-xs md:text-sm tracking-[0.18em] uppercase text-silver">
                    {s}
                  </span>
                  {i < IDENTITY.specialties.length - 1 && (
                    <span className="text-silver/40">·</span>
                  )}
                </span>
              ))}
            </div>

            {/* Tagline */}
<p className="mt-8 max-w-[540px] text-[17px] md:text-[19px] text-mist/65 leading-[1.8]">
              {displayedTagline}
            </p>

            {/* Meta + CTAs */}
 <div className="mt-10 flex flex-wrap items-center gap-5">
              <a href="#projects" className="btn-premium">
                <span>View Work</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <a href="#contact" className="btn-ghost">
                Get in touch <span aria-hidden>↗</span>
              </a>
            </div>

<div className="mt-10 flex items-center gap-6 text-xs text-silver/70">
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                {IDENTITY.location}
              </span>
              <span className="hairline w-12 hidden sm:block" />
              <span className="font-mono">{IDENTITY.university}</span>
            </div>
          </motion.div>

          {/* ── Columna imagen — círculo grande premium ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-center"
          >
            <div className="relative">
              {/* Anillos orbitales decorativos */}
              <div
                aria-hidden
                className="absolute -inset-6 rounded-full border border-mist/8 animate-spin"
                style={{ animationDuration: '60s' }}
              />
              <div
                aria-hidden
                className="absolute -inset-12 rounded-full border border-mist/[0.04]"
              />

              {/* Glow detrás */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-full blur-3xl opacity-40"
                style={{
                  background:
                    'radial-gradient(circle, rgba(200,200,220,0.25), transparent 70%)',
                }}
              />

              {/* Container circular de la foto */}
              <div className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] lg:w-[380px] lg:h-[380px] rounded-full overflow-hidden border border-mist/15 shadow-2xl">
                {/* Vignette interno */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-full z-10 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 30%, transparent 50%, rgba(0,0,0,0.35) 100%)',
                  }}
                />

                {/* La foto en sí */}
                <Image
                  src={src}
                  alt={IDENTITY.fullName}
                  fill
                  priority
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 380px, 380px"
                  className="object-cover scale-[1.35] translate-y-6 brightness-[0.92] contrast-[1.08] grayscale-[15%]"
                />
              </div>

              {/* Etiqueta flotante */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 glass-strong rounded-full px-5 py-2 text-[10px] tracking-[0.28em] uppercase text-mist/80 z-20 text-center flex items-center justify-center min-w-[170px]">
                {IDENTITY.fullName}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-silver/60"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-silver/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
