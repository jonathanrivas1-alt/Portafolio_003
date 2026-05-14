/**
 * Experience — Página dedicada
 * Server Component que fetchea datos de experience y certifications.
 */

'use client';

import { motion } from 'framer-motion';
import { InnerPageShell } from '@/components/InnerPageShell';
import { useEffect, useState } from 'react';
import { fetchExperience, fetchCertifications } from '@/lib/queries';
import { Experience } from '@/components/sections/Experience';

export default function ExperiencePage() {
  const [experience, setExperience] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchExperience(),
      fetchCertifications(),
    ]).then(([expData, certData]) => {
      setExperience(expData);
      setCertifications(certData);
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
          <Experience items={experience} certifications={certifications} />
        </div>
      </motion.div>
    </InnerPageShell>
  );
}
