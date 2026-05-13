/**
 * GridBackdrop — grid sutil tipo Linear/Vercel.
 * Aparece detrás de secciones específicas (no global).
 */

import { cn } from '@/lib/utils';

export function GridBackdrop({
  className,
  fade = true,
}: {
  className?: string;
  fade?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        'absolute inset-0 -z-10 grid-bg',
        fade &&
          '[mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]',
        className,
      )}
    />
  );
}
