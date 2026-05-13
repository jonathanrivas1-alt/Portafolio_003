/**
 * Página raíz — orquesta todas las secciones del portfolio.
 *
 * Server Component: fetchea datos desde Supabase (con fallback estático)
 * y los pasa como props al cliente. Esto da:
 *   - SEO óptimo (HTML rendered)
 *   - Hidratación rápida
 *   - Componentes interactivos donde se necesitan
 */

import {
  fetchProjects, fetchCertifications, fetchExperience, fetchSettings,
} from '@/lib/queries';

import { PageShell } from '@/components/PageShell';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Certifications } from '@/components/sections/Certifications';
import { Resume } from '@/components/sections/Resume';
import { Contact } from '@/components/sections/Contact';

export default async function HomePage() {
  // Fetch en paralelo
  const [projects, certifications, experience, settings] = await Promise.all([
    fetchProjects(),
    fetchCertifications(),
    fetchExperience(),
    fetchSettings(),
  ]);

  return (
    <PageShell>
      <Hero
        imageUrl={settings?.hero_image_url}
        tagline={settings?.hero_tagline}
      />
      <About />
      <Skills />
      <Experience items={experience} />
      <Projects projects={projects} />
      <Certifications items={certifications} />
      <Resume cvUrl={settings?.cv_pdf_url} />
      <Contact />
    </PageShell>
  );
}
