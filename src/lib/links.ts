/** Endereços externos do chrome do site, num lugar só.
  *
  * O site não tem formulário próprio: o VGen é o único caminho de conversão que
  * existe, e ele aparece tanto nos ícones sociais (header e rodapé) quanto nos
  * CTAs da home. Se a artista trocar de plataforma, é este arquivo que muda.
  *
  * Os `ctaPrimaryHref`/`ctaSecondaryHref` de `i18n/home.ts` ainda repetem a URL
  * à mão — são conteúdo editorial por idioma, não chrome, e por isso ficaram
  * fora daqui. Trocar de plataforma exige mexer nos dois lugares.
  */
export const COMMISSION_URL = 'https://vgen.co/Spantosicus_';
export const INSTAGRAM_URL = 'https://www.instagram.com/spantosicus/';
export const X_URL = 'https://x.com/Spantosicus_';
