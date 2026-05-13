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
 *
 *  La foto se descarga desde Supabase Storage si está configurado;
 *  si no, usa /profile.jpg como fallback local.
 */

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowDown, MapPin } from 'lucide-react';
import { IDENTITY } from '@/lib/data';

interface HeroProps {
  imageUrl?: string | null;
  tagline?: string | null;
}

const FALLBACK_IMAGE = '/profile.jpg';

export function Hero({ imageUrl, tagline }: HeroProps) {
  const src = imageUrl || FALLBACK_IMAGE;
  const displayedTagline = tagline || IDENTITY.tagline;

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
            className="lg:col-span-7 order-2 lg:order-1"
          >
            {/* Eyebrow */}
            <div className="eyebrow mb-8">
              <span>Portfolio · 2026</span>
            </div>

            {/* Nombre — display titánico */}
            <h1 className="font-display text-display-xl leading-[0.92] tracking-tightest text-balance">
              <span className="block">Jonathan</span>
              <span className="block text-metal italic">Rivas</span>
            </h1>

            {/* Rol */}
            <div className="mt-8 flex flex-wrap items-center gap-3 text-mist/85">
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
            <p className="mt-10 max-w-xl text-lg md:text-xl text-mist/65 leading-relaxed text-pretty">
              {displayedTagline}
            </p>

            {/* Meta + CTAs */}
            <div className="mt-12 flex flex-wrap items-center gap-4">
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
            className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end"
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
              <div className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] lg:w-[440px] lg:h-[440px] rounded-full overflow-hidden border border-mist/15 shadow-2xl">
                {/* Vignette interno */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-full z-10 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 30%, transparent 50%, rgba(0,0,0,0.45) 100%)',
                  }}
                />

                {/* La foto en sí */}
                <Image
                  src={src}
                  alt={IDENTITY.fullName}
                  fill
                  priority
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 380px, 440px"
                  className="object-cover grayscale-[15%] contrast-[1.05]"
                />
              </div>

              {/* Etiqueta flotante */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 glass-strong rounded-full px-4 py-1.5 text-[10px] tracking-[0.3em] uppercase text-mist/80">
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
