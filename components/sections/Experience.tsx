'use client';

/**
 * Experience & Leadership — Timeline editorial minimalista.
 * Línea vertical fina con nodos, animaciones de reveal en cascada.
 */

import { motion } from 'framer-motion';
import { Award, Code2, GraduationCap } from 'lucide-react';
import type { ExperienceItem } from '@/lib/types';

const TYPE_META = {
  leadership: { label: 'Leadership', Icon: Award },
  tech:       { label: 'Engineering', Icon: Code2 },
  academic:   { label: 'Academic',   Icon: GraduationCap },
} as const;

export function Experience({ items }: { items: ExperienceItem[] }) {
  return (
    <section id="experience" className="relative py-32 md:py-48">
      <div className="container-editorial">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="mb-20"
        >
          <div className="eyebrow mb-6">Trajectory</div>
          <h2 className="font-display text-display-lg max-w-3xl text-balance">
            Experience & <span className="text-metal italic">Leadership</span>.
          </h2>
          <p className="mt-6 text-mist/55 max-w-xl text-pretty">
            De la dirección estudiantil nacional al cofounding de DataDuck —
            coordinando equipos, sistemas y soluciones tecnológicas reales.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Línea vertical */}
          <div
            aria-hidden
            className="absolute left-[15px] md:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-mist/15 to-transparent md:-translate-x-1/2"
          />

          <div className="space-y-16">
            {items.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              const meta = TYPE_META[item.type];
              const Icon = meta.Icon;
              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 ${
                    isLeft ? '' : 'md:[direction:rtl]'
                  }`}
                >
                  {/* Nodo en la línea */}
                  <div
                    aria-hidden
                    className="absolute left-[7px] md:left-1/2 top-6 w-4 h-4 -translate-x-0 md:-translate-x-1/2 rounded-full border border-mist/30 bg-ink z-10 flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-mist/80" />
                  </div>

                  {/* Card */}
                  <div className={`pl-10 md:pl-0 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 [direction:ltr]'}`}>
                    <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.28em] uppercase text-silver/80 mb-3">
                      <Icon className="w-3 h-3" strokeWidth={1.5} />
                      <span>{meta.label}</span>
                      <span className="text-silver/40">·</span>
                      <span>{item.period}</span>
                    </div>

                    <h3 className="font-display text-2xl md:text-3xl text-mist text-balance leading-tight">
                      {item.role}
                    </h3>
                    <div className="mt-2 text-silver text-sm tracking-wide">
                      {item.organization}
                    </div>
                    <p className="mt-4 text-mist/65 leading-relaxed text-pretty">
                      {item.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className={`pl-10 md:pl-0 [direction:ltr] ${isLeft ? 'md:pl-12' : 'md:pr-12'}`}>
                    <ul className="space-y-2.5">
                      {item.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="flex items-baseline gap-3 text-sm text-mist/70"
                        >
                          <span className="text-silver/40 text-xs font-mono">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-pretty">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
