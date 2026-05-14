/**
 * Home Page — Premium cinematic landing
 *
 * Contiene:
 *  - Intro cinematográfica
 *  - Hero Section premium
 *  - Resume / CV elegante
 *  - Brief introduction elegante
 *  - CTA principal hacia otras páginas
 *
 * El contenido detallado está en páginas separadas.
 */

import { PageShell } from '@/components/PageShell';
import { Hero } from '@/components/sections/Hero';
import { Resume } from '@/components/sections/Resume';
import { fetchSettings } from '@/lib/queries';

export default async function HomePage() {
  const settings = await fetchSettings();

  return (
    <PageShell>
      <Hero />
      
      {/* Resume / CV Section */}
      <Resume cvUrl={settings?.cv_pdf_url} />
      
      {/* Breve introducción elegante */}
      <section className="relative py-24 md:py-32">
        <div className="container-editorial">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[15px] md:text-[17px] leading-[1.8] text-mist/75 text-balance mb-12">
              I'm a software engineer specializing in AI systems, automation, and digital infrastructure. 
              Explore my work, experience, and the technologies I'm passionate about.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/about" className="btn-premium">
                Learn More
              </a>
              <a href="/projects" className="btn-ghost">
                See My Work <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
