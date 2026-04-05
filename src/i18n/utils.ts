import { ui, defaultLang, showDefaultLang } from './ui';

export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split('/');
    if (lang in ui) return lang as keyof typeof ui;
    return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
    return function t(key: keyof typeof ui[typeof defaultLang]) {
        return ui[lang][key] || ui[defaultLang][key];
    }
}

export function getLangFromBrowser(acceptLanguage: string): keyof typeof ui {
    // Accept-Language será algo assim: "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7"
    const langs = acceptLanguage
        .split(',')
        .map(entry => entry.split(';')[0].trim().toLowerCase());

    for (const lang of langs) {
        if (lang === 'pt-br') return 'pt-br';
        if (lang.startsWith('pt')) return 'pt-br';
        if (lang === 'en' || lang.startsWith('en')) return 'en';
    }

    return defaultLang;
}

export function useTranslatedPath(lang: keyof typeof ui) {
    return function translatedPath(path: string, l: string = lang) {
        return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`;
    }
}

export function getPathForLang(url: URL, targetLang: keyof typeof ui): string {
    const parts = url.pathname.split('/').filter(Boolean);
    const firstPart = parts[0];

    const pathWithoutLang = (firstPart in ui)
        ? '/' + parts.slice(1).join('/')
        : url.pathname;

    const cleanPath = pathWithoutLang === '' ? '/' : pathWithoutLang;
    const ensureTrailingSlash = cleanPath.endsWith('/') ? cleanPath : cleanPath + '/';

    return !showDefaultLang && targetLang === defaultLang
        ? ensureTrailingSlash
        : `/${targetLang}${cleanPath === '/' ? '' : cleanPath}/`;
}