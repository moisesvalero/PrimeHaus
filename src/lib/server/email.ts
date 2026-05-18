import { Resend } from 'resend';
import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';

let resend: Resend | null = null;

function getResend(): Resend | null {
  if (resend) return resend;
  const apiKey = env.RESEND_API_KEY?.trim();
  if (!apiKey || apiKey.startsWith('re_placeholder')) return null;
  resend = new Resend(apiKey);
  return resend;
}

export interface ContactEmailData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(
  data: ContactEmailData,
  to: string
): Promise<{ success: boolean; error?: string }> {
  const client = getResend();

  if (dev) {
    console.log('[email dev] Contact form submission:', data);
  }

  if (!client) {
    if (dev) {
      console.log('[email dev] No RESEND_API_KEY configured. Email not sent.');
      return { success: true };
    }
    return { success: true };
  }

  try {
    await client.emails.send({
      from: 'PrimeHaus <contacto@primehaus.vercel.app>',
      to,
      subject: data.subject || 'Nueva consulta desde PrimeHaus',
      replyTo: data.email,
      html: `
        <h2>Nueva consulta de contacto</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Telefono:</strong> ${escapeHtml(data.phone || 'No proporcionado')}</p>
        <p><strong>Asunto:</strong> ${escapeHtml(data.subject || 'Sin asunto')}</p>
        <hr />
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(data.message).replace(/\n/g, '<br />')}</p>
      `
    });
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('[email] Failed to send:', message);
    return { success: false, error: message };
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
