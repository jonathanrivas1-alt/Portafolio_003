'use client';

import {
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion';

import { useEffect } from 'react';

export default function CursorOrb() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    damping: 30,
    stiffness: 220,
    mass: 0.5,
  });

  const smoothY = useSpring(mouseY, {
    damping: 30,
    stiffness: 220,
    mass: 0.5,
  });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 40);
      mouseY.set(e.clientY - 40);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        x: smoothX,
        y: smoothY,
      }}
      className="
        pointer-events-none
        fixed
        left-0
        top-0
        z-[9999]
      "
    >

      <div className="relative flex items-center justify-center">

        <div
          className="
            absolute
            h-16
            w-16
            rounded-full
            bg-white/[0.03]
            blur-3xl
          "
        />

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="
            absolute
            h-14
            w-14
            border
            border-white/10
            backdrop-blur-xl
          "
          style={{
            borderRadius:
              '42% 58% 63% 37% / 40% 45% 55% 60%',
          }}
        />

        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="
            absolute
            h-10
            w-11
            border
            border-white/20
          "
          style={{
            borderRadius:
              '58% 42% 30% 70% / 60% 30% 70% 40%',
          }}
        />
                <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="
            absolute
            h-5
            w-5
            border
            border-white/20
          "
          style={{
            borderRadius:
              '58% 42% 30% 70% / 60% 30% 70% 40%',
          }}
        />

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="
            h-5
            w-5
            rounded-full
            bg-white
            blur-[2px]
          "
          style={{
            boxShadow:
              '0 0 40px rgba(255,255,255,0.9)',
          }}
        />

      </div>
    </motion.div>
  );
}