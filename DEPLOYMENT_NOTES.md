# PrimeHaus Deployment Notes

## Vercel environment

Set these variables in Vercel for Preview and Production:

- `PUBLIC_SITE_URL`: final public URL without a trailing slash.
- `SANITY_PROJECT_ID`: Sanity project id.
- `SANITY_DATASET`: usually `production`.
- `SANITY_API_VERSION`: pinned API date, for example `2024-01-01`.
- `SANITY_READ_TOKEN`: only needed if the dataset is private.
- `RESEND_API_KEY`: Resend API key for the contact form.
- `RESEND_FROM_EMAIL`: verified sender, for example `PrimeHaus <contacto@your-domain.com>`.
- `CONTACT_TO_EMAIL`: inbox that receives private enquiries.
- `PUBLIC_SENTRY_DSN`: optional browser error tracking.

Do not commit real secrets. Keep production values in Vercel, not in `.env.example`.

## Sanity

In Sanity project settings, add CORS origins for:

- `http://localhost:5173`
- Vercel preview domains used by the project.
- The final production domain.

If content is private, create a read token and store it as `SANITY_READ_TOKEN`.

## Resend

Verify the sending domain or sender address before production. The contact form can run without Resend in development, but production delivery needs `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `CONTACT_TO_EMAIL`.

## Post-deploy checks

After deployment, verify:

- `/sitemap.xml`
- `/robots.txt`
- `/llms.txt`
- `/llms-full.txt`
- `/es/index.md`
- `/es/blog.md`
- `/es/contacto`
- Contact form delivery and WhatsApp/phone links.
