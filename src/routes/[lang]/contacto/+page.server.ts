import { fail } from '@sveltejs/kit';
import { siteConfig } from '$lib/site-config';
import { sendContactEmail } from '$lib/server/email';
import { checkRateLimit } from '$lib/server/rate-limit';
import type { Actions } from './$types';

function validateForm(data: Record<string, string>) {
  const errors: Record<string, string> = {};

  const name = data.name?.trim() || '';
  const email = data.email?.trim() || '';
  const message = data.message?.trim() || '';
  const honeypot = data.website?.trim() || '';

  if (honeypot) {
    errors.honeypot = 'Bot detected';
  }

  if (!name || name.length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres.';
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Por favor, ingrese un email valido.';
  }

  if (!message || message.length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres.';
  }

  if (data.phone && data.phone.length < 7) {
    errors.phone = 'Numero de telefono invalido.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    values: {
      name,
      email,
      phone: data.phone?.trim() || '',
      subject: data.subject?.trim() || '',
      message
    }
  };
}

export const actions = {
  default: async ({ request }) => {
    const rate = checkRateLimit(request);
    if (!rate.allowed) {
      return fail(429, {
        success: false,
        error: 'Demasiadas solicitudes. Por favor, intente de nuevo en unos minutos.'
      });
    }

    const formData = await request.formData();
    const data: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      data[key] = typeof value === 'string' ? value : '';
    }

    const { valid, errors, values } = validateForm(data);
    if (!valid) {
      return fail(400, { success: false, errors, values });
    }

    const emailResult = await sendContactEmail(
      {
        name: values.name,
        email: values.email,
        phone: values.phone,
        subject: values.subject,
        message: values.message
      },
      siteConfig.contact.email
    );

    if (!emailResult.success) {
      console.error('[contact] Email failed:', emailResult.error);
    }

    return {
      success: true,
      message: 'Gracias por su mensaje. Un curador senior se pondra en contacto en un plazo de 4 horas habiles.'
    };
  }
} satisfies Actions;
