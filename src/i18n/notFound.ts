import type { Lang } from './home';

/** Conteúdo da página 404. Segue o mesmo padrão dos outros módulos (§3 do
  * CLAUDE.md): `Record<Lang, ...>` com interface explícita, para os dois
  * idiomas serem obrigados a ter a mesma forma. */

interface Seo {
  title: string;
  description: string;
}

export interface NotFoundContent {
  seo: Seo;
  /** Os dígitos da prancha. Decorativos - o `h1` é quem carrega o significado. */
  code: string;
  eyebrow: string;
  heading: string;
  body: string;
  /** Legenda de galeria sob a prancha, no tom de etiqueta de exposição. */
  plateCaption: string;
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
}

export const notFoundContent: Record<Lang, NotFoundContent> = {
  "en": {
    seo: {
      title: "Page Not Found - Danielle Spantosicus",
      description:
        "This page doesn't exist. Head back to the portfolio of Danielle Spantosicus, digital artist and character illustrator.",
    },

    code: "404",
    eyebrow: "Error 404",
    heading: "This page never made it off the sketch",
    body: "The link is broken, the address changed, or this page was never drawn. The illustrations are all still there. Pick a way back:",
    plateCaption: "Untitled - plate not found",
    ctaPrimary: "Back to Home",
    ctaPrimaryHref: "/en/",
    ctaSecondary: "See Portfolio",
    ctaSecondaryHref: "/en/portfolio",
  },

  "pt-br": {
    seo: {
      title: "Página Não Encontrada - Danielle Spantosicus",
      description:
        "Esta página não existe. Volte para o portfólio de Danielle Spantosicus, artista digital e ilustradora de personagens.",
    },

    code: "404",
    eyebrow: "Erro 404",
    heading: "Esta página nunca saiu do esboço",
    body: "O link quebrou, o endereço mudou, ou esta página nunca foi desenhada. As ilustrações continuam todas lá. Escolha um caminho de volta:",
    plateCaption: "Sem título - prancha não encontrada",
    ctaPrimary: "Voltar para o Início",
    ctaPrimaryHref: "/pt-br/",
    ctaSecondary: "Ver Portfólio",
    ctaSecondaryHref: "/pt-br/portfolio",
  },

  "es": {
    seo: {
      title: "Página No Encontrada - Danielle Spantosicus",
      description:
        "Esta página no existe. Vuelve al portafolio de Danielle Spantosicus, artista digital e ilustradora de personajes.",
    },

    code: "404",
    eyebrow: "Error 404",
    heading: "Esta página nunca pasó del boceto",
    body: "El enlace se rompió, la dirección cambió, o esta página nunca llegó a dibujarse. Las ilustraciones siguen todas ahí. Elige un camino de vuelta:",
    plateCaption: "Sin título - lámina no encontrada",
    ctaPrimary: "Volver al Inicio",
    ctaPrimaryHref: "/es/",
    ctaSecondary: "Ver Portafolio",
    ctaSecondaryHref: "/es/portfolio",
  },
};
