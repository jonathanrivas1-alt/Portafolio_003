'use client';

/**
 * /admin/login — Acceso privado al panel.
 * Auth con Supabase (magic link + password). Solo el ADMIN_EMAIL accede.
 */

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Lock, Mail, Loader2 } from 'lucide-react';
import { getBrowserClient, isSupabaseConfigured } from '@/lib/supabase';
import { AmbientBackground } from '@/components/effects/AmbientBackground';
import { GrainOverlay } from '@/components/effects/GrainOverlay';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setMsg(null); setLoading(true);

    if (!isSupabaseConfigured) {
      setErr('Supabase no está configurado. Define NEXT_PUBLIC_SUPABASE_URL y ANON_KEY.');
      setLoading(false);
      return;
    }
    const supa = getBrowserClient();
    if (!supa) { setErr('No se pudo crear el cliente'); setLoading(false); return; }

    // Email + password
    const { error } = await supa.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { setErr(error.message); return; }
    router.push('/admin');
    router.refresh();
  }

  async function sendMagicLink() {
    if (!email) { setErr('Ingresa tu email'); return; }
    const supa = getBrowserClient();
    if (!supa) return;
    setLoading(true);
    const { error } = await supa.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });
    setLoading(false);
    if (error) setErr(error.message);
    else setMsg('✓ Magic link enviado. Revisa tu email.');
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center px-6">
      <AmbientBackground />
      <GrainOverlay />

      <div className="card-premium w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl border border-mist/10 bg-mist/[0.025] flex items-center justify-center">
            <Lock className="w-4 h-4 text-mist/80" strokeWidth={1.5} />
          </div>
          <div>
            <div className="eyebrow !mb-1">Admin</div>
            <div className="text-mist text-lg">Panel privado</div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver/60" />
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="email"
              className="w-full pl-10 pr-4 py-3 bg-mist/[0.02] border border-mist/[0.08] rounded-xl text-mist placeholder:text-silver/40 outline-none focus:border-mist/30 text-sm"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver/60" />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="password"
              className="w-full pl-10 pr-4 py-3 bg-mist/[0.02] border border-mist/[0.08] rounded-xl text-mist placeholder:text-silver/40 outline-none focus:border-mist/30 text-sm"
            />
          </div>

          <button disabled={loading} className="btn-premium w-full !py-3.5 disabled:opacity-60">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign in'}
          </button>

          <button
            type="button"
            onClick={sendMagicLink}
            className="btn-ghost w-full justify-center"
          >
            o usar magic link
          </button>
        </form>

        {msg && <p className="mt-4 text-xs text-emerald-300/80 font-mono">{msg}</p>}
        {err && <p className="mt-4 text-xs text-red-300/80 font-mono">{err}</p>}

        <p className="mt-6 text-[10px] text-silver/50 font-mono tracking-wider">
          // El acceso está restringido. Crea el usuario en Supabase Auth.
        </p>
      </div>
    </main>
  );
}
