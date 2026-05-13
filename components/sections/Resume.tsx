'use client';

/**
 * Resume / CV — Botón Download + preview modal con iframe del PDF.
 * El URL viene desde Supabase (site_settings.cv_pdf_url) y cae a /CV.pdf.
 */

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Download, FileText, X } from 'lucide-react';

interface ResumeProps {
  cvUrl?: string | null;
}

const FALLBACK_CV = '/CV_Jonathan_Rivas.pdf';

export function Resume({ cvUrl }: ResumeProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const url = cvUrl || FALLBACK_CV;

  return (
    <section id="resume" className="relative py-24 md:py-32">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="card-premium flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10"
        >
          <div className="w-14 h-14 rounded-2xl border border-mist/10 bg-mist/[0.02] flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 text-mist/80" strokeWidth={1.5} />
          </div>

          <div className="flex-1">
            <div className="eyebrow mb-3">Resume</div>
            <h3 className="font-display text-2xl md:text-3xl text-mist text-balance">
              Mi CV completo.
            </h3>
            <p className="mt-2 text-sm text-mist/60 text-pretty">
              Educación, experiencia, certificaciones y proyectos en un PDF
              listo para imprimir o adjuntar.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => setPreviewOpen(true)} className="btn-ghost">
              Preview
            </button>
            <a href={url} download className="btn-premium">
              <Download className="w-4 h-4" />
              Download CV
            </a>
          </div>
        </motion.div>
      </div>

      {/* Modal preview */}
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-ink/85 backdrop-blur-md"
            onClick={() => setPreviewOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              className="glass-strong rounded-3xl w-full max-w-4xl h-[85vh] overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-mist/[0.06]">
                <div className="text-[11px] tracking-[0.28em] uppercase text-silver">
                  CV — Jonathan Rivas
                </div>
                <button
                  onClick={() => setPreviewOpen(false)}
                  className="text-mist/60 hover:text-mist"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <iframe
                src={url}
                title="CV preview"
                className="flex-1 w-full bg-white"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
