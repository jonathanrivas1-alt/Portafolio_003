'use client';

/**
 * Resume / CV — Sección elegante con preview modal y descarga
 * El URL viene desde Supabase (site_settings.cv_pdf_url) con fallback a /CV_Jonathan_Rivas.pdf
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
    <section id="resume" className="relative py-32 md:py-40">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="max-w-2xl">
            <div className="eyebrow mb-4">CV & Resume</div>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-balance">
              Professional <span className="text-metal">experience</span> & <span className="text-silver/80">credentials</span>
            </h2>
          </div>

          {/* CV Card */}
          <div className="mt-12 backdrop-blur-xl border border-white/6 bg-white/[0.02] rounded-[32px] p-8 md:p-10 hover:bg-white/[0.04] transition-all duration-500">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              {/* Left side - icon & text */}
              <div className="flex items-start gap-6 flex-1">
                <div className="w-16 h-16 rounded-3xl border border-mist/15 bg-gradient-to-br from-metal/20 to-silver/5 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <FileText className="w-8 h-8 text-metal" strokeWidth={1.5} />
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-xs tracking-[0.3em] uppercase text-silver/70 mb-1">
                      Complete CV
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl text-mist">
                      My Full Resume
                    </h3>
                  </div>
                  
                  <p className="text-[14px] md:text-[15px] text-mist/65 leading-[1.7] max-w-[420px]">
                    Download my comprehensive CV with education, certifications, professional experience, 
                    technical skills, and selected projects.
                  </p>
                </div>
              </div>

              {/* Right side - CTA buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-shrink-0 w-full md:w-auto">
                <button 
                  onClick={() => setPreviewOpen(true)} 
                  className="w-full sm:w-auto btn-ghost text-center"
                >
                  <span>Preview</span>
                  <span aria-hidden className="text-silver/50">↗</span>
                </button>
                <a 
                  href={url} 
                  download 
                  className="w-full sm:w-auto btn-premium text-center whitespace-nowrap"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          </div>

          {/* Stats highlights */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { value: '5+', label: 'Years in tech' },
              { value: '20+', label: 'Projects shipped' },
              { value: '4+', label: 'Certifications' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="backdrop-blur-lg border border-white/5 bg-white/[0.01] rounded-2xl p-4 md:p-6 text-center hover:bg-white/[0.02] transition-all"
              >
                <div className="font-display text-2xl md:text-3xl text-metal mb-2">
                  {stat.value}
                </div>
                <div className="text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-silver/60">
                  {stat.label}
                </div>
              </motion.div>
            ))}
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
              className="glass-strong rounded-3xl w-full max-w-4xl h-[85vh] overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-mist/[0.06]">
                <div className="text-[11px] tracking-[0.28em] uppercase text-silver/80 font-mono">
                  CV — Jonathan Rivas
                </div>
                <button
                  onClick={() => setPreviewOpen(false)}
                  className="text-mist/60 hover:text-mist transition-colors p-1"
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
