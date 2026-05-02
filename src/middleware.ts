import { defineMiddleware } from 'astro:middleware';
import { getLangFromBrowser } from './i18n/utils';

export const onRequest = defineMiddleware((context, next) => {
  if (context.url.pathname === '/') {
    const acceptLanguage = context.request.headers.get('accept-language') ?? '';
    const redirectLang = getLangFromBrowser(acceptLanguage);
    const response = context.redirect(`/${redirectLang}/`, 302);
    response.headers.set('Vary', 'Accept-Language');
    return response;
  }
  return next();
});
