import { createBrowserClient, createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

/**
 * Cliente Supabase — 3 sabores:
 *   1. browser  → para client components
 *   2. server   → para server components / route handlers (con cookies)
 *   3. admin    → para tareas privilegiadas (service role, solo servidor)
 *
 * Si las env vars no están configuradas, los clientes retornan null y la app
 * cae graciosamente al fallback estático en `lib/data.ts`.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

// ── Browser ────────────────────────────────────────────────────────────────
export function getBrowserClient() {
  if (!url || !anonKey) return null;
  return createBrowserClient(url, anonKey);
}

// ── Server (con cookies para auth en server components) ────────────────────
export function getServerClient() {
  if (!url || !anonKey) return null;
  const cookieStore = cookies();
  return createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set() { /* read-only en server components */ },
      remove() { /* read-only en server components */ },
    },
  });
}

// ── Admin (solo servidor — bypasea RLS) ────────────────────────────────────
export function getAdminClient() {
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// ── Buckets de Storage ─────────────────────────────────────────────────────
export const STORAGE_BUCKETS = {
  hero: 'hero',           // imagen del hero
  projects: 'projects',   // previews de proyectos
  certificates: 'certificates',
  cv: 'cv',               // PDF del CV
} as const;

/**
 * Genera URL pública para un asset de Storage.
 */
export function getPublicUrl(bucket: keyof typeof STORAGE_BUCKETS, path: string) {
  if (!url) return null;
  return `${url}/storage/v1/object/public/${STORAGE_BUCKETS[bucket]}/${path}`;
}
