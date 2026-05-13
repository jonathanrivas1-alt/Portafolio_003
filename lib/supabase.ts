import { createBrowserClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

// Browser Client
export function getBrowserClient() {
  if (!url || !anonKey) return null;

  return createBrowserClient(url, anonKey);
}

// Admin Client
export function getAdminClient() {
  if (!url || !serviceKey) return null;

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Storage Buckets
export const STORAGE_BUCKETS = {
  hero: 'hero',
  projects: 'projects',
  certificates: 'certificates',
  cv: 'cv',
} as const;

// Public URL helper
export function getPublicUrl(
  bucket: keyof typeof STORAGE_BUCKETS,
  path: string
) {
  if (!url) return null;

  return `${url}/storage/v1/object/public/${STORAGE_BUCKETS[bucket]}/${path}`;
}