'use client';

/**
 * Skills — Tarjetas glassmorphism premium con hover elegante.
 * Cada categoría se revela en stagger al entrar al viewport.
 */

import { motion } from 'framer-motion';
import {
  Layout, Server, Sparkles, Network, Database, Shield,
  type LucideIcon,
} from 'lucide-react';
import { SKILL_CATEGORIES } from '@/lib/data';

const ICONS: Record<string, LucideIcon> = {
  Layout, Server, Sparkles, Network, Database, Shield,
};

export function Skills() {
  return (
    <section id="skills" className="relative py-32 md:py-48">
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
            <div className="eyebrow mb-6">Capabilities</div>
            <h2 className="font-display text-display-lg max-w-2xl text-balance">
              A <span className="text-metal italic">full-stack</span> mind.
            </h2>
          </div>
          <p className="text-mist/55 max-w-md text-pretty">
            From frontend craft to AI tooling and infrastructure — the toolkit
            for shipping modern systems end-to-end.
          </p>
        </motion.div>

        {/* Grid de skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = ICONS[cat.icon] ?? Sparkles;
            return (
              <motion.article
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.9,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="card-premium group overflow-hidden"
              >
                {/* Hover glow */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(400px circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,0.05), transparent 50%)',
                  }}
                />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl border border-mist/10 flex items-center justify-center bg-mist/[0.025]">
                      <Icon className="w-4 h-4 text-mist/80" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-mist text-lg tracking-tight">{cat.title}</h3>
                  </div>

                  <p className="text-sm text-mist/55 leading-relaxed mb-6">
                    {cat.description}
                  </p>

                  <ul className="flex flex-wrap gap-2">
                    {cat.items.map(item => (
                      <li
                        key={item}
                        className="text-[11px] tracking-wider uppercase px-2.5 py-1 rounded-md bg-mist/[0.03] border border-mist/[0.06] text-mist/70"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
