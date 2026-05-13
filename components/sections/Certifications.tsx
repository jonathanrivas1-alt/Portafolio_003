'use client';

/**
 * Certifications — Cards minimalistas en grid.
 * Cada card tiene nombre, organización, año y botón verify si hay URL.
 */

import { motion } from 'framer-motion';
import { BadgeCheck, ExternalLink } from 'lucide-react';
import type { Certification } from '@/lib/types';

export function Certifications({ items }: { items: Certification[] }) {
  return (
    <section id="certifications" className="relative py-32 md:py-48">
      <div className="container-editorial">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="flex items-end justify-between flex-wrap gap-6 mb-16"
        >
          <div>
            <div className="eyebrow mb-6">Credentials</div>
            <h2 className="font-display text-display-lg max-w-2xl text-balance">
              Certifications &amp; <span className="text-metal italic">awards</span>.
            </h2>
          </div>
          <p className="text-mist/55 max-w-sm text-pretty">
            {items.length}+ certificaciones técnicas y reconocimientos por
            liderazgo en los últimos años.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((c, idx) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.7, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="card-premium group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl border border-mist/10 flex items-center justify-center bg-mist/[0.02]">
                  <BadgeCheck className="w-4 h-4 text-mist/80" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-mist text-base leading-snug text-balance">
                    {c.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-xs text-silver/70">
                    <span>{c.organization}</span>
                    <span className="text-silver/30">·</span>
                    <span className="font-mono">{c.year}</span>
                  </div>
                  {c.verify_url && (
                    <a
                      href={c.verify_url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-[10px] tracking-[0.22em] uppercase text-mist/60 hover:text-mist transition-colors"
                    >
                      Verify <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
