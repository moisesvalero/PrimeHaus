import * as Sentry from '@sentry/sveltekit';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/public';
import type { ClientInit, HandleClientError } from '@sveltejs/kit';

Sentry.init({
  dsn: env.PUBLIC_SENTRY_DSN || '',
  enabled: !dev && !!env.PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1
});

export const handleError: HandleClientError = ({ error }) => {
  Sentry.captureException(error);
};

export const init: ClientInit = () => {};

export { Sentry };
