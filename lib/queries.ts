/**
 * Capa de queries — Lee desde Supabase y cae al fallback estático si la DB
 * no está disponible. Mantiene los componentes desacoplados.
 */

import { getServerClient, isSupabaseConfigured } from './supabase';
import {
  PROJECTS_SEED,
  CERTIFICATIONS as CERTS_SEED,
  EXPERIENCE as EXP_SEED,
} from './data';
import type {
  Project,
  Certification,
  ExperienceItem,
  SiteSettings,
} from './types';

export async function fetchProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured) return PROJECTS_SEED;
  const supa = getServerClient();
  if (!supa) return PROJECTS_SEED;

  const { data, error } = await supa
    .from('projects')
    .select('*')
    .order('order_index', { ascending: true });

  if (error || !data || data.length === 0) return PROJECTS_SEED;
  return data as Project[];
}

export async function fetchCertifications(): Promise<Certification[]> {
  if (!isSupabaseConfigured) return CERTS_SEED;
  const supa = getServerClient();
  if (!supa) return CERTS_SEED;

  const { data, error } = await supa
    .from('certifications')
    .select('*')
    .order('year', { ascending: false });

  if (error || !data || data.length === 0) return CERTS_SEED;
  return data as Certification[];
}

export async function fetchExperience(): Promise<ExperienceItem[]> {
  if (!isSupabaseConfigured) return EXP_SEED;
  const supa = getServerClient();
  if (!supa) return EXP_SEED;

  const { data, error } = await supa
    .from('experience')
    .select('*')
    .order('order_index', { ascending: true });

  if (error || !data || data.length === 0) return EXP_SEED;
  return data as ExperienceItem[];
}

export async function fetchSettings(): Promise<SiteSettings | null> {
  if (!isSupabaseConfigured) return null;
  const supa = getServerClient();
  if (!supa) return null;

  const { data, error } = await supa
    .from('site_settings')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;
  return data as SiteSettings;
}
