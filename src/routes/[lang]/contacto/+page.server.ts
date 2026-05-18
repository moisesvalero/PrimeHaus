import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { env } from '$env/dynamic/private';
import { siteConfig } from '$lib/site-config';
import { sendContactEmail } from '$lib/server/email';
import { checkRateLimit } from '$lib/server/rate-limit';
import type { Actions } from './$types';

type ContactLang = 'es' | 'en' | 'fr' | 'de';

const messages: Record<
  ContactLang,
  {
    rateLimit: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    emailFail: string;
    success: string;
  }
> = {
  es: {
    rateLimit: 'Demasiadas solicitudes. Por favor, intente de nuevo en unos minutos.',
    name: 'El nombre debe tener al menos 2 caracteres.',
    email: 'Por favor, ingrese un email válido.',
    phone: 'Número de teléfono inválido.',
    message: 'El mensaje debe tener al menos 10 caracteres.',
    emailFail: 'No pudimos enviar su solicitud. Por favor, inténtelo de nuevo en unos minutos.',
    success:
      'Gracias por su mensaje. Un asesor senior se pondrá en contacto en un plazo de 4 horas hábiles.'
  },
  en: {
    rateLimit: 'Too many requests. Please try again in a few minutes.',
    name: 'Name must contain at least 2 characters.',
    email: 'Please enter a valid email address.',
    phone: 'Invalid phone number.',
    message: 'Message must contain at least 10 characters.',
    emailFail: 'We could not send your enquiry. Please try again in a few minutes.',
    success:
      'Thank you for your message. A senior curator will contact you within 4 business hours.'
  },
  fr: {
    rateLimit: 'Trop de demandes. Veuillez réessayer dans quelques minutes.',
    name: 'Le nom doit contenir au moins 2 caractères.',
    email: 'Veuillez saisir une adresse email valide.',
    phone: 'Numéro de téléphone invalide.',
    message: 'Le message doit contenir au moins 10 caractères.',
    emailFail:
      'Nous n’avons pas pu envoyer votre demande. Veuillez réessayer dans quelques minutes.',
    success:
      'Merci pour votre message. Un curateur senior vous contactera dans un délai de 4 heures ouvrables.'
  },
  de: {
    rateLimit: 'Zu viele Anfragen. Bitte versuchen Sie es in einigen Minuten erneut.',
    name: 'Der Name muss mindestens 2 Zeichen enthalten.',
    email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    phone: 'Ungültige Telefonnummer.',
    message: 'Die Nachricht muss mindestens 10 Zeichen enthalten.',
    emailFail:
      'Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es in einigen Minuten erneut.',
    success:
      'Vielen Dank für Ihre Nachricht. Ein Senior Curator meldet sich innerhalb von 4 Geschäftsstunden.'
  }
};

function normalizeLang(lang: string | undefined): ContactLang {
  return lang === 'en' || lang === 'fr' || lang === 'de' ? lang : 'es';
}

function schemaFor(lang: ContactLang) {
  const msg = messages[lang];

  return z.object({
    name: z.string().trim().min(2, msg.name),
    email: z.string().trim().email(msg.email),
    phone: z
      .string()
      .trim()
      .optional()
      .refine((value) => !value || /^[+\d\s().-]{7,}$/.test(value), msg.phone),
    subject: z.string().trim().optional(),
    message: z.string().trim().min(10, msg.message),
    website: z.string().trim().max(0, 'Bot detected').optional()
  });
}

function fieldErrors(error: z.ZodError): Record<string, string> {
  const flattened = error.flatten().fieldErrors as Record<string, string[] | undefined>;
  return Object.fromEntries(
    Object.entries(flattened)
      .map(([key, value]) => [key, value?.[0]])
      .filter((entry): entry is [string, string] => typeof entry[1] === 'string')
  );
}

export const actions = {
  default: async ({ request, params }) => {
    const lang = normalizeLang(params.lang);
    const copy = messages[lang];
    const rate = checkRateLimit(request);
    if (!rate.allowed) {
      return fail(429, {
        success: false,
        error: copy.rateLimit
      });
    }

    const formData = await request.formData();
    const data: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      data[key] = typeof value === 'string' ? value : '';
    }

    const parsed = schemaFor(lang).safeParse(data);
    const values = {
      name: data.name?.trim() || '',
      email: data.email?.trim() || '',
      phone: data.phone?.trim() || '',
      subject: data.subject?.trim() || '',
      message: data.message?.trim() || ''
    };

    if (!parsed.success) {
      return fail(400, { success: false, errors: fieldErrors(parsed.error), values });
    }

    const to = env.CONTACT_TO_EMAIL?.trim() || siteConfig.contact.email;
    const emailResult = await sendContactEmail(
      {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || '',
        subject: parsed.data.subject || '',
        message: parsed.data.message
      },
      to
    );

    if (!emailResult.success) {
      console.error('[contact] Email failed:', emailResult.error);
      return fail(502, {
        success: false,
        error: copy.emailFail,
        values
      });
    }

    return {
      success: true,
      message: copy.success
    };
  }
} satisfies Actions;
