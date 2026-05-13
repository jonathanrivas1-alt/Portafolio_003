/**
 * Tipos compartidos del dominio.
 * Reflejan el esquema de Supabase (ver /supabase/schema.sql).
 */

export type ProjectCategory =
  | 'web'
  | 'ai-automation'
  | 'systems'
  | 'ui-ux';

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  long_description?: string | null;
  preview_image: string;
  technologies: string[];
  github_url?: string | null;
  live_url?: string | null;
  category: ProjectCategory;
  featured: boolean;
  year: number;
  created_at?: string;
  order_index?: number;
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  year: number;
  verify_url?: string | null;
  badge_url?: string | null;
  order_index?: number;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  highlights: string[];
  type: 'leadership' | 'tech' | 'academic';
  order_index?: number;
}

export interface SiteSettings {
  id: string;
  hero_image_url: string | null;
  hero_image_alt: string | null;
  cv_pdf_url: string | null;
  hero_tagline: string | null;
  about_text: string | null;
  updated_at?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  description: string;
  items: string[];
}

export interface ProjectFolder {
  key: ProjectCategory;
  label: string;
  description: string;
  count?: number;
}
