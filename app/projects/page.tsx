/**
 * Projects — Página dedicada
 * Server Component que fetchea datos y renderiza la sección con transición.
 */

'use client';

import { motion } from 'framer-motion';
import { InnerPageShell } from '@/components/InnerPageShell';
import { useEffect, useState } from 'react';
import { fetchProjects } from '@/lib/queries';
import { Projects } from '@/components/sections/Projects';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects().then(data => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <InnerPageShell>
        <div className="pt-32 flex items-center justify-center min-h-screen">
          <p className="text-mist/60">Loading...</p>
        </div>
      </InnerPageShell>
    );
  }

  return (
    <InnerPageShell>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen"
      >
        <div className="pt-32">
          <Projects projects={projects} />
        </div>
      </motion.div>
    </InnerPageShell>
  );
}
