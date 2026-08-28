import { languages } from '../i18n/ui';

/** Código de idioma da rota → valor de `hreflang` (BCP 47). */
const HREFLANG: Record<keyof typeof languages, string> = {
    en: 'en',
    'pt-br': 'pt-BR',
};

export interface PageUrls {
    canonicalURL: string;
    alternates: { lang: string; href: string }[];
}

/**
 * Monta canonical + alternates de uma página.
 *
 * `new URL` em vez de template string: `Astro.site` já termina em `/`, e a
 * concatenação manual (`${site}/en/about/`) gerava barra dupla.
 *
 * @param origin fallback para quando `Astro.site` é undefined (dev)
 * @param path   sem prefixo de idioma, com barras nas pontas: `/`, `/about/`
 */
export function buildPageUrls(
    site: URL | undefined,
    origin: string,
    lang: keyof typeof languages,
    path: string,
): PageUrls {
    const base = site ?? new URL(origin);
    const href = (l: string) => new URL(`/${l}${path}`, base).href;

    return {
        canonicalURL: href(lang),
        alternates: (Object.keys(languages) as (keyof typeof languages)[]).map((l) => ({
            lang: HREFLANG[l],
            href: href(l),
        })),
    };
}
