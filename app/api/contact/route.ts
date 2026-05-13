/**
 * POST /api/contact
 *
 * 1. Valida el payload con Zod
 * 2. Guarda el mensaje en Supabase (tabla contact_messages)
 * 3. Si hay RESEND_API_KEY configurado, envía email de notificación
 *
 * Funciona con cualquier combinación: solo Supabase, solo Resend, o ambos.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getAdminClient } from '@/lib/supabase';

const ContactSchema = z.object({
  name:    z.string().min(2).max(120),
  email:   z.string().email(),
  subject: z.string().max(200).optional().nullable(),
  message: z.string().min(5).max(5000),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload', details: parsed.error.flatten() }, { status: 400 });
  }
  const { name, email, subject, message } = parsed.data;

  // 1) Persistir en Supabase si está configurado
  const admin = getAdminClient();
  if (admin) {
    const { error } = await admin
      .from('contact_messages')
      .insert({ name, email, subject: subject ?? null, message });
    if (error) {
      console.error('[contact] supabase insert error', error);
    }
  }

  // 2) Notificación por email (Resend)
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (resendKey && to && from) {
    try {
      // Import dinámico para no forzar la dependencia en runtime si no se usa
      const { Resend } = await import('resend');
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from,
        to,
        reply_to: email,
        subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] Nuevo mensaje de ${name}`,
        text: `De: ${name} <${email}>\n\n${message}`,
      });
    } catch (err) {
      console.error('[contact] resend error', err);
      // No fallar la request por esto — el mensaje ya quedó guardado
    }
  }

  return NextResponse.json({ ok: true });
}
