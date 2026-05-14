'use client';

/**
 * Experience & Leadership — Timeline editorial minimalista + Certificaciones integradas.
 * Línea vertical fina con nodos, animaciones de reveal en cascada.
 * Las certificaciones se muestran como validación técnica después del timeline.
 */

import { motion } from 'framer-motion';
import { Award, Code2, GraduationCap, BadgeCheck } from 'lucide-react';
import type { ExperienceItem, Certification } from '@/lib/types';

const TYPE_META = {
  leadership: { label: 'Leadership', Icon: Award },
  tech:       { label: 'Engineering', Icon: Code2 },
  academic:   { label: 'Academic',   Icon: GraduationCap },
} as const;

interface ExperienceProps {
  items: ExperienceItem[];
  certifications?: Certification[];
}

export function Experience({ items, certifications = [] }: ExperienceProps) {
  // Mostrar solo las 6-7 certificaciones más relevantes (ordenadas por índice)
  const topCertifications = certifications.slice(0, 7);

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

        {/* Certifications Section — Integrated elegantly */}
        {topCertifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-32 md:mt-40 max-w-4xl mx-auto"
          >
            {/* Divider */}
            <div className="flex items-center gap-4 mb-12">
              <div className="flex-1 h-px bg-gradient-to-r from-mist/20 via-mist/10 to-transparent" />
              <div className="text-[10px] tracking-[0.3em] uppercase text-silver/60 font-mono">
                Credentials
              </div>
              <div className="flex-1 h-px bg-gradient-to-l from-mist/20 via-mist/10 to-transparent" />
            </div>

            {/* Certifications Header */}
            <div className="mb-10">
              <h3 className="font-display text-2xl md:text-3xl text-mist mb-3">
                Technical <span className="text-metal">Credentials</span>
              </h3>
              <p className="text-mist/60 text-sm max-w-2xl">
                Certifications and credentials validating technical expertise and professional development.
              </p>
            </div>

            {/* Certifications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topCertifications.map((cert, idx) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.7, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="group backdrop-blur-lg border border-white/5 bg-white/[0.01] rounded-2xl p-5 md:p-6 hover:bg-white/[0.03] hover:border-white/10 transition-all duration-500"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl border border-metal/20 bg-metal/5 flex items-center justify-center group-hover:bg-metal/10 transition-colors">
                      <BadgeCheck className="w-5 h-5 text-metal/80" strokeWidth={1.5} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-mist text-sm leading-snug text-balance font-medium group-hover:text-metal transition-colors">
                        {cert.name}
                      </h4>
                      <div className="mt-2 flex flex-col gap-1">
                        <div className="text-[11px] text-silver/70">
                          {cert.organization}
                        </div>
                        <div className="text-[10px] text-silver/50 font-mono">
                          {cert.year}
                        </div>
                      </div>

                      {/* Verify link if available */}
                      {cert.verify_url && (
                        <a
                          href={cert.verify_url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-flex items-center gap-1.5 text-[10px] tracking-[0.22em] uppercase text-metal/60 hover:text-metal transition-colors"
                        >
                          <span>Verify</span>
                          <span aria-hidden>↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
