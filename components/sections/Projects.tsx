'use client';

/**
 * Dynamic Project System — Carpetas + grid de proyectos.
 *
 *  ┌─────────────────────────────────────────────────────────┐
 *  │  [WEB] [AI AUTOMATION] [SYSTEMS] [UI/UX LAB]            │
 *  │  ───────────────────────────────────────────────────    │
 *  │  ╭───────╮ ╭───────╮ ╭───────╮                          │
 *  │  │ proj1 │ │ proj2 │ │ proj3 │  (filtered by folder)    │
 *  │  ╰───────╯ ╰───────╯ ╰───────╯                          │
 *  └─────────────────────────────────────────────────────────┘
 *
 *  Los proyectos llegan via props desde el server, ya fetcheados desde
 *  Supabase (o el seed). El filtrado por carpeta es client-side.
 */

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Github, ExternalLink, FolderOpen } from 'lucide-react';
import { PROJECT_FOLDERS } from '@/lib/data';
import type { Project, ProjectCategory } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const [active, setActive] = useState<ProjectCategory>('web');
  const [selected, setSelected] = useState<Project | null>(null);

  // Conteos por carpeta
  const folders = useMemo(
    () =>
      PROJECT_FOLDERS.map(f => ({
        ...f,
        count: projects.filter(p => p.category === f.key).length,
      })),
    [projects],
  );

  const filtered = useMemo(
    () => projects.filter(p => p.category === active),
    [projects, active],
  );

  return (
    <section id="projects" className="relative py-32 md:py-48">
      <div className="container-editorial">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="flex items-end justify-between flex-wrap gap-6 mb-12"
        >
          <div>
            <div className="eyebrow mb-6">Selected Work</div>
            <h2 className="font-display text-display-lg text-balance">
              Projects &amp; <span className="text-metal italic">experiments</span>.
            </h2>
          </div>
          <p className="text-mist/55 max-w-md text-pretty">
            Trabajo organizado en carpetas. Cada proyecto se carga desde
            la base de datos y se administra desde el panel privado.
          </p>
        </motion.div>

        {/* Folder tabs */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-12 border-b border-mist/[0.06] pb-6">
          {folders.map(folder => {
            const isActive = active === folder.key;
            return (
              <button
                key={folder.key}
                onClick={() => setActive(folder.key)}
                className={cn(
                  'group relative flex items-center gap-3 px-5 py-3 rounded-full text-[11px] tracking-[0.22em] uppercase transition-all duration-500',
                  isActive
                    ? 'bg-mist/[0.04] border border-mist/15 text-mist'
                    : 'text-mist/50 hover:text-mist border border-transparent',
                )}
              >
                <FolderOpen
                  className={cn(
                    'w-3.5 h-3.5 transition-colors',
                    isActive ? 'text-mist' : 'text-mist/50',
                  )}
                  strokeWidth={1.5}
                />
                {folder.label}
                <span
                  className={cn(
                    'text-[10px] font-mono px-1.5 py-0.5 rounded-md',
                    isActive
                      ? 'bg-mist/10 text-mist/90'
                      : 'bg-mist/[0.03] text-silver/70',
                  )}
                >
                  {String(folder.count).padStart(2, '0')}
                </span>
              </button>
            );
          })}
        </div>

        {/* Folder description */}
        <div className="mb-10 text-sm text-mist/55 font-mono">
          // {PROJECT_FOLDERS.find(f => f.key === active)?.description}
        </div>

        {/* Grid de proyectos */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filtered.length === 0 ? (
              <div className="col-span-full text-center py-20 text-silver/60 font-mono text-sm">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                No projects yet in this folder. They'll appear here once added from the admin panel.
              </div>
            ) : (
              filtered.map((p, idx) => (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={() => setSelected(p)}
                  className="card-premium group cursor-pointer overflow-hidden"
                >
                  {/* Preview image */}
                  <div className="relative aspect-[16/10] -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-6 overflow-hidden bg-mist/[0.02]">
                    {p.preview_image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.preview_image}
                        alt={p.title}
                        className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-1000"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                    {p.featured && (
                      <span className="absolute top-4 left-4 glass-strong rounded-full px-2.5 py-1 text-[9px] tracking-[0.3em] uppercase text-mist/90">
                        Featured
                      </span>
                    )}
                    <span className="absolute top-4 right-4 font-mono text-[10px] text-silver/80">
                      {p.year}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-2xl text-mist tracking-tight text-balance">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-sm text-mist/60 leading-relaxed line-clamp-2 text-pretty">
                        {p.description}
                      </p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-mist/40 group-hover:text-mist group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-500 flex-shrink-0" />
                  </div>

                  {/* Tech tags */}
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {p.technologies.slice(0, 4).map(t => (
                      <li
                        key={t}
                        className="text-[10px] tracking-wider uppercase px-2 py-0.5 rounded bg-mist/[0.03] border border-mist/[0.06] text-mist/65"
                      >
                        {t}
                      </li>
                    ))}
                    {p.technologies.length > 4 && (
                      <li className="text-[10px] text-silver/60 px-2 py-0.5">
                        +{p.technologies.length - 4}
                      </li>
                    )}
                  </ul>
                </motion.article>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal de detalle */}
      <ProjectDetailModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Modal de detalle del proyecto
// ────────────────────────────────────────────────────────────────────────────
function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] flex items-end md:items-center justify-center p-4 bg-ink/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
            className="glass-strong rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto"
          >
            {project.preview_image && (
              <div className="relative aspect-video overflow-hidden rounded-t-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.preview_image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
              </div>
            )}

            <div className="p-8 md:p-10">
              <div className="flex items-start justify-between gap-6 mb-6">
                <div>
                  <div className="eyebrow mb-3">
                    {project.category.toUpperCase().replace('-', ' · ')}
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl text-mist text-balance">
                    {project.title}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="text-mist/60 hover:text-mist text-xl"
                  aria-label="Cerrar"
                >
                  ✕
                </button>
              </div>

              <p className="text-mist/70 leading-relaxed text-pretty mb-6">
                {project.long_description || project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map(t => (
                  <span
                    key={t}
                    className="text-[11px] tracking-wider uppercase px-2.5 py-1 rounded bg-mist/[0.04] border border-mist/[0.08] text-mist/75"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-premium"
                  >
                    <Github className="w-4 h-4" /> Code
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-premium"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
