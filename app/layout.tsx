/**
 * Root layout.
 * Carga tipografías premium vía next/font:
 *   - Instrument Serif (display editorial)
 *   - Inter (sans body)
 *   - JetBrains Mono (terminal/mono)
 */

import type { Metadata, Viewport } from 'next';
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jonathanrivas.dev'),
  title: {
    default: 'Jonathan Rivas — Software Engineer · AI · Systems · Automation',
    template: '%s · Jonathan Rivas',
  },
  description:
    'Cinematic portfolio of Jonathan Rivas — Software Engineer focused on AI, automation, and digital infrastructure.',
  keywords: ['Jonathan Rivas', 'Software Engineer', 'AI', 'Automation', 'Next.js', 'El Salvador'],
  authors: [{ name: 'Jonathan Rivas' }],
  openGraph: {
    title: 'Jonathan Rivas — Software Engineer',
    description: 'Building intelligent digital systems with modern technologies.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jonathan Rivas — Software Engineer',
  },
};

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body className="bg-ink text-mist antialiased">
        {children}
      </body>
    </html>
  );
}
