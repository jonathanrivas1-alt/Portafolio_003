'use client';

/**
 * Navbar editorial minimalista. Aparece tras scroll con backdrop-blur.
 * - Logo monograma "JR"
 * - Links a secciones (smooth scroll)
 * - Indicador de scroll
 */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const LINKS = [
  { id: 'about',          label: 'About' },
  { id: 'skills',         label: 'Skills' },
  { id: 'experience',     label: 'Experience' },
  { id: 'projects',       label: 'Work' },
  { id: 'certifications', label: 'Awards' },
  { id: 'contact',        label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-700',
        scrolled ? 'py-3' : 'py-6',
      )}
    >
      <div
        className={cn(
          'container-editorial flex items-center justify-between',
          scrolled && 'glass-strong rounded-full px-6 py-2 max-w-5xl mx-auto',
        )}
      >
        {/* Monograma */}
        <a href="#hero" className="group flex items-center gap-3" aria-label="Inicio">
          <span className="text-mist text-xs tracking-[0.3em] font-mono">
            <span className="text-metal">JR</span>
            <span className="text-silver/60 ml-2 hidden sm:inline">/ ENGINEER</span>
          </span>
        </a>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="px-3 py-2 text-[11px] tracking-[0.22em] uppercase text-mist/55 hover:text-mist transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="btn-premium text-[10px] hidden md:inline-flex"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-300/80 animate-pulse-soft" />
          Available
        </a>

        {/* Mobile menu trigger (simple) */}
        <a href="#contact" className="md:hidden text-[11px] tracking-widest text-mist/80">
          Contact ↗
        </a>
      </div>
    </motion.header>
  );
}
