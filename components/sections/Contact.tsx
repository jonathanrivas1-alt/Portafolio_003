'use client';

/**
 * Contact — Layout editorial split.
 *  Izquierda: marca + redes + email directo
 *  Derecha:   formulario funcional (envía a /api/contact)
 */

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Github, Linkedin, Mail, Loader2, Check } from 'lucide-react';
import { IDENTITY } from '@/lib/data';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export function Contact() {
  const [state, setState] = useState<FormState>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name:    String(fd.get('name')    || ''),
      email:   String(fd.get('email')   || ''),
      subject: String(fd.get('subject') || ''),
      message: String(fd.get('message') || ''),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Error sending message');
      setState('success');
      form.reset();
    } catch (err) {
      setState('error');
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }

  return (
    <section id="contact" className="relative py-32 md:py-48">
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* ── Brand side ────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
            className="lg:col-span-6"
          >
            <div className="eyebrow mb-6">Contact</div>
            <h2 className="font-display text-display-lg leading-[0.95] text-balance">
              <span className="block">Let&apos;s build</span>
              <span className="block text-metal italic">something.</span>
            </h2>

            <p className="mt-8 text-mist/65 max-w-md text-pretty leading-relaxed">
              Hablemos de proyectos, colaboraciones o ideas tecnológicas.
              Respondo a todos los mensajes en menos de 48 horas.
            </p>

            {/* Direct email — large */}
            <a
              href={IDENTITY.social.email}
              className="mt-10 group inline-flex items-center gap-3 text-2xl md:text-3xl text-mist hover:text-metal transition-colors duration-500"
            >
              <Mail className="w-5 h-5 text-mist/60 group-hover:text-mist transition-colors" strokeWidth={1.5} />
              <span className="underline-offset-8 decoration-mist/20 group-hover:underline">
                {IDENTITY.email}
              </span>
            </a>

            {/* Social row */}
            <div className="mt-12 flex flex-wrap items-center gap-3">
              <a
                href={IDENTITY.social.github}
                target="_blank"
                rel="noreferrer"
                className="card-premium !p-4 group hover:!border-mist/30"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-mist/80 group-hover:text-mist" strokeWidth={1.5} />
              </a>
              <a
                href={IDENTITY.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="card-premium !p-4 group hover:!border-mist/30"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-mist/80 group-hover:text-mist" strokeWidth={1.5} />
              </a>
              <span className="hairline w-12" />
              <span className="text-xs text-silver/70 font-mono">
                {IDENTITY.location}
              </span>
            </div>
          </motion.div>

          {/* ── Form ──────────────────────────────────────────────────── */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.15 }}
            className="lg:col-span-6 card-premium space-y-5"
          >
            <Field label="Name"    name="name"    type="text"  required />
            <Field label="Email"   name="email"   type="email" required />
            <Field label="Subject" name="subject" type="text" />
            <Field label="Message" name="message" textarea required />

            <button
              type="submit"
              disabled={state === 'loading'}
              className="btn-premium w-full !py-4 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {state === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
              {state === 'success' && <Check className="w-4 h-4" />}
              {state === 'idle'    && 'Send Message'}
              {state === 'loading' && 'Sending…'}
              {state === 'success' && 'Sent — Thanks'}
              {state === 'error'   && 'Try again'}
            </button>

            {state === 'success' && (
              <p className="text-xs text-emerald-300/80 text-center font-mono">
                ✓ Mensaje recibido. Te responderé pronto.
              </p>
            )}
            {state === 'error' && (
              <p className="text-xs text-red-300/80 text-center font-mono">
                ✕ {error || 'Hubo un error. Intenta de nuevo.'}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Field reutilizable — input premium con label flotante minimalista
// ────────────────────────────────────────────────────────────────────────────
interface FieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}

function Field({ label, name, type = 'text', required, textarea }: FieldProps) {
  const baseClass =
    'peer w-full bg-transparent text-mist placeholder-transparent border-b border-mist/15 focus:border-mist/50 outline-none transition-colors pt-6 pb-2 text-sm';
  return (
    <div className="relative">
      {textarea ? (
        <textarea
          name={name}
          required={required}
          placeholder={label}
          rows={4}
          className={baseClass + ' resize-none'}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={label}
          className={baseClass}
        />
      )}
      <label className="absolute left-0 top-1 text-[10px] tracking-[0.28em] uppercase text-silver/80 pointer-events-none">
        {label}
      </label>
    </div>
  );
}
