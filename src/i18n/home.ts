import type { ImageMetadata } from 'astro';

import DeanAndCastiel from '../assets/works/dean-and-castiel.webp';
import DeanAndSam from '../assets/works/dean-and-sam.webp';
import DeanWinchester from '../assets/works/dean-winchester.webp';
import MrBeast from '../assets/works/mr-beast.webp';
import SlyCooper from '../assets/works/sly-cooper.webp';
import Chandler from '../assets/works/chandler.webp';

import SupernaturalWendigo from '../assets/works/supernatural-wendigo.webp';

/** Os três estágios da MESMA arte. Trocar um deles por outra peça
  * quebra a leitura da seção de processo, que é a prancha se preenchendo. */
import SupernaturalSketch from '../assets/process/supernatural-sketch.webp';
import SupernaturalColor from '../assets/process/supernatural-color.webp';
import SupernaturalFinal from '../assets/process/supernatural-final.webp';


/** Fragmentos internos de ícone, no espaço de coordenadas 24x24 (Tabler
  * Icons, outline). Sem atributos de traço: quem renderiza aplica `stroke`,
  * `stroke-width` e `fill` no wrapper — é o que deixa o mesmo fragmento servir
  * ao card em `currentColor` e ao ladrilho do Hero em preto. */
const icons: Record<string, string> = {
  character: `
    <path d="M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" />
    <path d="M7.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    <path d="M11.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    <path d="M15.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />`,

  loop: `
    <path d="M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12" />
    <path d="M8 4l0 16" />
    <path d="M16 4l0 16" />
    <path d="M4 8l4 0" />
    <path d="M4 16l4 0" />
    <path d="M4 12l16 0" />
    <path d="M16 8l4 0" />
    <path d="M16 16l4 0" />`,

  fanart: `
    <path d="M9.73 17.753l-5.23 -5.181a5 5 0 1 1 7.5 -6.566a5 5 0 0 1 8.563 5.041" />
    <path d="M17.8 20.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138" />`,

  oc: `
    <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6" />`,

  vtuber: `
    <path d="M17 14h-10a4 4 0 0 1 -4 -4a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4a4 4 0 0 1 -4 4" />
    <path d="M15 14h-6v4h6v-4" />
    <path d="M17 18h-10" />
    <path d="M12 10.02v.01" />`,

  background: `
    <path d="M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12" />
    <path d="M4 16l16 0" />
    <path d="M4 12l3 -3c.928 -.893 2.072 -.893 3 0l4 4" />
    <path d="M13 12l2 -2c.928 -.893 2.072 -.893 3 0l2 2" />
    <path d="M14 7l.01 0" />`,

  /* Ícones da seção de processo — não entram em `serviceIcons` e portanto não
     aparecem na trama do Hero. */

  bulb: `
    <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
    <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
    <path d="M9.7 17l4.6 0" />`,

  messages: `
    <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
    <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />`,
};

/** Ordem canônica dos ícones de serviço. O Hero usa a mesma lista para montar
  * a trama do fundo, então a textura do site é o traço da artista. É uma lista
  * explícita, e não `Object.values(icons)`: o mapa também guarda os ícones do
  * processo, que não pertencem à trama. */
export const serviceIcons = [
  icons['character'],
  icons['loop'],
  icons['fanart'],
  icons['oc'],
  icons['vtuber'],
  icons['background'],
] as const;

export type Lang = 'en' | 'pt-br' | 'es';

interface Seo {
  title: string;
  description: string;
}

interface FeaturedImageWork {
  type?: 'image';
  src: ImageMetadata;
  alt: string;
  caption: string;
}

interface FeaturedVideoWork {
  type: 'video';
  src: string;
  poster?: string;
  alt: string;
  caption: string;
}

export type FeaturedWork = FeaturedImageWork | FeaturedVideoWork;

interface Hero {
  eyebrow: string;
  heading: string;
  subheading: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaPrimaryHref: string;
  ctaSecondaryHref: string;
  bannerImage: ImageMetadata;
  imageAlt: string;
  scrollHint: string;
}

interface Featured {
  eyebrow: string;
  heading: string;
  body: string;
  cta: string;
  ctaHref: string;
  works: FeaturedWork[];
}

interface Services {
  eyebrow: string;
  heading: string;
  body: string;
  items: { title: string; description: string; icon: string }[];
}

interface ProcessStepBase {
  number: string;
  title: string;
  description: string;
}

interface ProcessArtStep extends ProcessStepBase {
  image: ImageMetadata;
  imageAlt: string;
  icon?: never;
}

/** As etapas 01 e 02 são ideia e conversa: não produzem arte, e a prancha
  * recebe um ícone decorativo — o sentido está no título. */
interface ProcessMarkStep extends ProcessStepBase {
  icon: string;
  image?: never;
  imageAlt?: never;
}

/** São os `?: never` acima que tornam a união exclusiva, e é isso que fecha
  * dois furos no typecheck: prancha sem conteúdo e imagem sem nome acessível. */
type ProcessStep = ProcessArtStep | ProcessMarkStep;

interface Process {
  eyebrow: string;
  heading: string;
  body: string;
  steps: ProcessStep[];
}

interface AboutTeaser {
  eyebrow: string;
  heading: string;
  body: string;
  cta: string;
  ctaHref: string;
  parallaxImage: ImageMetadata;
  imageAlt: string;
}

interface Testimonials {
  eyebrow: string;
  heading: string;
  items: { quote: string; author: string; context: string }[];
}

interface Faq {
  eyebrow: string;
  heading: string;
  items: { question: string; answer: string }[];
}

interface FinalCta {
  heading: string;
  body: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaPrimaryHref: string;
  ctaSecondaryHref: string;
}

export interface HomeContent {
  seo: Seo;
  hero: Hero;
  featured: Featured;
  services: Services;
  process: Process;
  about: AboutTeaser;
  testimonials: Testimonials;
  faq: Faq;
  finalCta: FinalCta;
}

export const homeContent: Record<Lang, HomeContent> = {
  "en": {
    seo: {
      title: "Danielle Spantosicus — Digital Artist & Character Illustrator",
      description:
        "Custom digital art and character illustrations by Danielle Spantosicus. Open for commissions — characters, portraits, fanart, VTuber art, and more.",
    },

    hero: {
      eyebrow: "Digital Artist & Illustrator",
      heading: "Custom Digital Art & Character Illustrations",
      subheading: "Bringing your characters, stories, and visions to life through expressive digital illustration. Open for commissions.",
      ctaPrimary: "View Portfolio",
      ctaSecondary: "Commission Me",
      ctaPrimaryHref: "/en/portfolio",
      ctaSecondaryHref: "https://vgen.co/Spantosicus_",
      bannerImage: DeanWinchester,
      imageAlt: "Digital illustration by Danielle Spantosicus — featured artwork",
      scrollHint: "Scroll down to see more",
    },

    featured: {
      eyebrow: "Selected Works",
      heading: "My Illustrations",
      body: "Here are some of my personal creations. To see more of my projects, visit my portfolio!",
      cta: "Browse Full Portfolio",
      ctaHref: "/en/portfolio",
      works: [
        {
          src: DeanWinchester,
          alt: 'Dean Winchester fan art illustration — character portrait from Supernatural',
          caption: 'Dean Winchester',
        },
        {
          src: Chandler,
          alt: 'Chandler Hallow fan art illustration — YouTuber portrait from MrBeast crew',
          caption: 'Chandler Hallow',
        },
        {
          src: DeanAndSam,
          alt: 'Dean and Sam Winchester fan art illustration — the Winchester brothers from Supernatural',
          caption: 'Dean & Sam',
        },
        {
          type: 'video',
          src: '/works/gif-sly.webm',
          alt: 'Sly Cooper animated pixel art GIF — video game character illustration',
          caption: 'Gif Sly Cooper',
        },
        {
          src: SlyCooper,
          alt: 'Sly Cooper fan art illustration — video game character portrait from Sly Cooper series',
          caption: 'Sly Cooper',
        },
        {
          src: MrBeast,
          alt: 'MrBeast fan art illustration — famous YouTuber portrait',
          caption: 'Mr. Beast',
        },
        {
          type: 'video',
          src: '/works/gif-carmelita.webm',
          alt: 'Carmelita Fox animated pixel art GIF — video game character illustration from Sly Cooper series',
          caption: 'Gif Carmelita Fox',
        },
        {
          src: DeanAndCastiel,
          alt: 'Dean Winchester and Castiel fan art illustration — Supernatural character portrait',
          caption: 'Dean & Castiel',
        },
      ],
    },

    services: {
      eyebrow: "What I Create",
      heading: "Illustration Services",
      body: "Every commission is crafted with care, from the first sketch to the final render. Here's what I specialize in.",
      items: [
        {
          title: "Character Illustration",
          description:
            "Bust, Halfbody and Full-body render Illustrations of your character, emotes and banners.",
          icon: icons["character"],
        },
        {
          title: "Looping Animations",
          description:
            "Your character coming to life with expressive and unique movements.",
          icon: icons["loop"],
        },
        {
          title: "Fanart",
          description:
            "Your favorite characters from games, movies, shows, or any media with a personal artistic touch.",
          icon: icons["fanart"],
        },
        {
          title: "Original Characters (OC)",
          description:
            "Custom character design and illustration for your OCs, including reference sheets.",
          icon: icons["oc"],
        },
        {
          title: "VTuber & PNGTuber Art",
          description:
            "Expressive, camera-ready character art designed for VTuber models and PNGTuber Models, I can make the art and Rig.",
          icon: icons["vtuber"],
        },
        {
          title: "Background Illustration",
          description:
            "Rich atmospheric scenes from your character's universe.",
          icon: icons["background"],
        },
      ],
    },

    process: {
      eyebrow: "How It Works",
      heading: "From Idea to Final Art",
      body: "A clear, collaborative process designed to make commissioning easy and enjoyable for both of us.",
      steps: [
        {
          number: "01",
          title: "Send Your Idea",
          description:
            "Fill out the commission form or reach out directly. Share your concept, references, and any specific requirements.",
          icon: icons["bulb"],
        },
        {
          number: "02",
          title: "Discuss the Details",
          description:
            "We'll align on the scope, style, timeline, and pricing before any work begins.",
          icon: icons["messages"],
        },
        {
          number: "03",
          title: "Sketch Approval",
          description:
            "You'll review an initial sketch and request adjustments before I move to the final rendering.",
          image: SupernaturalSketch,
          imageAlt:
            "Sketch stage of a Supernatural fan art illustration — Dean and Sam Winchester in loose teal linework, seen from above",
        },
        {
          number: "04",
          title: "Final Rendering",
          description:
            "With the sketch approved, I craft the full illustration with colors, lighting, and all details.",
          image: SupernaturalColor,
          imageAlt:
            "Rendering stage of the same illustration — the sketch filled in with color, shading and lighting",
        },
        {
          number: "05",
          title: "Delivery",
          description:
            "You receive the final high-resolution files, ready to use however you'd like.",
          image: SupernaturalFinal,
          imageAlt:
            "Final stage of the same illustration — Dean and Sam Winchester against a smoke and ember background, signed by Danielle Spantosicus",
        },
      ],
    },

    about: {
      eyebrow: "About the Artist",
      heading: "Hi, I'm Danielle.",
      body: "I'm a Brazilian digital artist with a love for expressive characters. Every illustration I create is a vision that I bring to life through my style.",
      cta: "Read My Full Story",
      ctaHref: "/en/about",
      parallaxImage: SupernaturalWendigo,
      imageAlt: "Dean and Sam getting ready to fight a Wendigo — digital illustration by Danielle Spantosicus",
    },

    testimonials: {
      eyebrow: "Client Words",
      heading: "What People Say",
      items: [
        {
          quote: "They were very fast to respond when i was wondering about something and they were good to ask if they should add a thing and be sure that they didnt forget anything etc.I loved chatting with Danielle they were very helpful and understanding ♥️",
          author: "Majascreationss",
          context: "Fullbody of Your Character",
        },
        {
          quote: `I always get my art from Danielle and they never disappoint, if I can recommend an artist definitely would with Danielle. Not only are they communicating frequently, they actively make sure I'm content with the final product, makes changes if requested, and brings my characters to life by the end of it.`,
          author: "L3thargicx",
          context: "Reference Sheet of Your Character",
        },
        {
          quote: "Amazing and talented artist! Very kind and quick with updates and responses. Loved commissioning them and talking with them. Thank you so much ♥️♥️♥️",
          author: "sammy_2496",
          context: "Bust-Up of Your Character (PFP)",
        },
        {
          quote: "I had an amazing experience working with Danielle. I was shown steps by steps process and through their amazing skills was able to bring my vision to life. I am very satisfied with my commission and would recommend anyone to work with them!",
          author: "Desi",
          context: "Fullbody of Your Character",
        },
        {
          quote: "A very talented artist with good communication skills, and works hard to deliver great quality work to clients. Would highly recommend!",
          author: "epgs30",
          context: "YCH - Emotes",
        },
        {
          quote: "As usual, a wonderful person and artist to work with. Their art is beautiful and you wont be disappointed~",
          author: "Pidgeonotte",
          context: "YCH - Merry Christmas Card"
        },
      ],
    },

    faq: {
      eyebrow: "FAQ",
      heading: "Common Questions",
      items: [
        {
          question: "What kinds of commissions do you accept?",
          answer:
            "I work with character Illustrations, Fanart, OC designs, Looping Animations, Emotes, VTuber art, background scenes and more. Check on my Vgen website for the full list or ask me about it if you want to know about a specific service.",
        },
        {
          question: "What kinds of commissions do you NOT accept?",
          answer:
            "I do not accept NSFW, explicit content, or too much gore (I can do It but It has a limit). I reserve the right to decline any commission that I am not comfortable with.",
        },
        {
          question: "How long does a commission take?",
          answer:
            "Most commissions are completed within 5-8 days depending on complexity and my current queue. I'll give you an estimate during our initial discussion, but you have a 30-day delivery guarantee.",
        },
        {
          question: "Do you work with references?",
          answer:
            "Yes, references are very welcome and help ensure the final result matches your vision. You can share images, mood boards, color palettes, or written descriptions.",
        },
        {
          question: "Can the artwork be used commercially?",
          answer:
            "Personal use is included in all commissions. Commercial licensing is available at an additional fee, please mention your intended use when requesting a quote.",
        },
        {
          question: "Do you offer revisions?",
          answer:
            "Yes. I offer revisions and some changes during the process. Major changes after final rendering may incur an additional fee.",
        },
      ],
    },

    finalCta: {
      heading: "Ready to Commission?",
      body: "Whether you have a fully formed idea or just a feeling... Let's start a conversation!",
      ctaPrimary: "Request a Commission",
      ctaSecondary: "See My Portfolio",
      ctaPrimaryHref: "https://vgen.co/Spantosicus_",
      ctaSecondaryHref: "/en/portfolio",
    },
  },

  "pt-br": {
    seo: {
      title: "Danielle Spantosicus — Artista Digital e Ilustradora de Personagens",
      description:
        "Ilustrações digitais personalizadas e arte de personagens por Danielle Spantosicus. Aberta para comissões - personagens, retratos, fanart, arte para VTubers e mais.",
    },

    hero: {
      eyebrow: "Artista Digital & Ilustradora",
      heading: "Arte Digital e Ilustrações de Personagens Personalizados",
      subheading:
        "Dando vida aos seus personagens, histórias e visões através de ilustração digital expressiva. Aberta para comissões.",
      ctaPrimary: "Ver Portfólio",
      ctaSecondary: "Me Comissionar",
      ctaPrimaryHref: "/pt-br/portfolio",
      ctaSecondaryHref: "https://vgen.co/Spantosicus_",
      bannerImage: DeanWinchester,
      imageAlt: "Ilustração digital por Danielle Spantosicus — obra em destaque",
      scrollHint: "Role para baixo para ver mais",
    },

    featured: {
      eyebrow: "Trabalhos Selecionados",
      heading: "Minhas Ilustrações",
      body: "Aqui estão algumas das minhas criações pessoais. Para ver mais projetos, visite meu portfólio!",
      cta: "Ver Portfólio Completo",
      ctaHref: "/pt-br/portfolio",
      works: [
        {
          src: DeanWinchester,
          alt: 'Ilustração fan art do Dean Winchester — retrato do personagem de Supernatural',
          caption: 'Dean Winchester',
        },
        {
          src: Chandler,
          alt: 'Ilustração fan art do Chandler Hallow — retrato do youtuber do grupo do MrBeast',
          caption: 'Chandler Hallow',
        },
        {
          src: DeanAndSam,
          alt: 'Ilustração fan art de Dean e Sam Winchester — os irmãos Winchester de Supernatural',
          caption: 'Dean & Sam',
        },
        {
          type: 'video',
          src: '/works/gif-sly.webm',
          alt: 'GIF animado do Sly Cooper — ilustração do personagem de videogame',
          caption: 'Gif Sly Cooper',
        },
        {
          src: SlyCooper,
          alt: 'Ilustração fan art do Sly Cooper — retrato do personagem da série de jogos Sly Cooper',
          caption: 'Sly Cooper',
        },
        {
          src: MrBeast,
          alt: 'Ilustração fan art do MrBeast — retrato do famoso youtuber',
          caption: 'Mr. Beast',
        },
        {
          type: 'video',
          src: '/works/gif-carmelita.webm',
          alt: 'GIF animado da Carmelita Fox — ilustração da personagem da série Sly Cooper',
          caption: 'Gif Carmelita Fox',
        },
        {
          src: DeanAndCastiel,
          alt: 'Ilustração fan art de Dean Winchester e Castiel — retrato dos personagens de Supernatural',
          caption: 'Dean & Castiel',
        },
      ],
    },

    services: {
      eyebrow: "O Que Eu Faço",
      heading: "Serviços de Ilustração",
      body: "Cada comissão é feita com cuidado, do primeiro esboço até o resultado final. Veja no que eu me especializo.",
      items: [
        {
          title: "Ilustração de Personagem",
          description: "Os tipos de Ilustrações disponiveis são Icons, Da cintura cima, Corpo Inteiro, Emotes e Banners.",
          icon: icons["character"],
        },
        {
          title: "Animações em Loop",
          description:
            "Seu personagem ganhando vida com movimentos expressivos e únicos.",
          icon: icons["loop"],
        },
        {
          title: "Fanart",
          description:
            "Seu personagem favorito de Jogos, Filmes, Séries, ou qualquer outra mídia com um toque artístico pessoal.",
          icon: icons["fanart"],
        },
        {
          title: "Personagens Originais (OC)",
          description:
            "Design e ilustração de personagens para os seus OCs, incluindo reference sheets.",
          icon: icons["oc"],
        },
        {
          title: "Arte para VTuber e PNGTuber",
          description:
            "Arte expressiva e pronta para câmera, desenvolvida para modelos VTuber e PNGTuber, eu faço a Arte e o Rig.",
          icon: icons["vtuber"],
        },
        {
          title: "Ilustração de Cenários",
          description:
            "Cenas ricas e atmosféricas para RPGs de mesa, projetos de worldbuilding ou coleções pessoais.",
          icon: icons["background"],
        },
      ],
    },

    process: {
      eyebrow: "Como Funciona",
      heading: "Da Ideia à Arte Final",
      body: "Um processo claro e colaborativo para tornar a encomenda simples e agradável para ambos.",
      steps: [
        {
          number: "01",
          title: "Envie Sua Ideia",
          description:
            "Preencha o formulário de comissão ou entre em contato direto. Compartilhe seu conceito, referências e requisitos.",
          icon: icons["bulb"],
        },
        {
          number: "02",
          title: "Alinhamento",
          description:
            "Definimos escopo, estilo, prazo e preço antes de iniciar.",
          icon: icons["messages"],
        },
        {
          number: "03",
          title: "Aprovação do Esboço",
          description:
            "Você revisa o esboço inicial e pode solicitar ajustes antes da renderização final.",
          image: SupernaturalSketch,
          imageAlt:
            "Etapa de esboço de uma ilustração fan art de Supernatural — Dean e Sam Winchester em traço solto verde-azulado, vistos de cima",
        },
        {
          number: "04",
          title: "Renderização Final",
          description:
            "Com o esboço aprovado, finalizo a arte com cores, iluminação e todos os detalhes.",
          image: SupernaturalColor,
          imageAlt:
            "Etapa de renderização da mesma ilustração — o esboço preenchido com cor, sombreamento e iluminação",
        },
        {
          number: "05",
          title: "Entrega",
          description:
            "Você recebe os arquivos finais em alta resolução, prontos para uso.",
          image: SupernaturalFinal,
          imageAlt:
            "Etapa final da mesma ilustração — Dean e Sam Winchester sobre fundo de fumaça e brasas, assinada por Danielle Spantosicus",
        },
      ],
    },

    about: {
      eyebrow: "Sobre a Artista",
      heading: "Oi, eu sou Danielle.",
      body: "Sou uma artista digital brasileira apaixonada por personagens expressivos. Cada ilustração que crio é uma visão que transformo em realidade através do meu estilo.",
      cta: "Ler Minha História",
      ctaHref: "/pt-br/about",
      parallaxImage: SupernaturalWendigo,
      imageAlt: "Dean e Sam se preparando para enfrentar um Wendigo — ilustração digital de Danielle Spantosicus",
    },

    testimonials: {
      eyebrow: "Feedback dos clientes",
      heading: "O Que Dizem",
      items: [
        {
          quote: "Respondeu super rápido sempre que eu tive dúvidas, e ainda perguntava antes de adicionar detalhes pra garantir que nada fosse esquecido. Adorei conversar com a Danielle, muito atenciosa e compreensiva ♥️",
          author: "Majascreationss",
          context: "Fullbody do Personagem",
        },
        {
          quote: "Sempre faço minhas artes com a Danielle e nunca me decepciono. Se eu pudesse recomendar uma artista, seria ela. Comunicação constante, preocupação com o resultado final e dá vida aos personagens.",
          author: "L3thargicx",
          context: "Reference sheet do Personagem",
        },
        {
          quote: "Artista incrível e muito talentosa! Muito gentil e rápida nas respostas. Amei a experiência de encomendar e conversar. Muito obrigada ♥️",
          author: "sammy_2496",
          context: "Bust (Foto de Perfil)",
        },
        {
          quote: "Experiência incrível trabalhar com a Danielle. Acompanhei todo o processo passo a passo e o resultado final trouxe minha ideia à vida. Recomendo demais!",
          author: "Desi",
          context: "Fullbody do Personagem",
        },
        {
          quote: "Artista muito talentosa, com ótima comunicação e entrega trabalhos de alta qualidade. Recomendo!",
          author: "epgs30",
          context: "YCH - Emotes",
        },
        {
          quote: "Como sempre, uma pessoa e artista maravilhosa de trabalhar. A arte é linda, você não vai se arrepender~",
          author: "Pidgeonotte",
          context: "YCH - Cartão de Natal"
        },
      ],
    },

    faq: {
      eyebrow: "FAQ",
      heading: "Perguntas Frequentes",
      items: [
        {
          question: "Que tipos de comissão você aceita?",
          answer:
            "Trabalho com ilustrações de personagens, fanarts, OCs, animações em loop, emotes, arte para VTuber, cenários e mais. Veja a lista completa no meu VGen ou me pergunte diretamente.",
        },
        {
          question: "O que você NÃO aceita?",
          answer:
            "Não aceito conteúdo NSFW, explícito ou gore excessivo (eu posso fazer mas há um limite). Também me reservo no direito de recusar qualquer pedido com o qual não me sinta confortável.",
        },
        {
          question: "Quanto tempo leva?",
          answer:
            "A maioria das comissões leva de 5 a 8 dias, dependendo da complexidade e da fila. Você também tem garantia de entrega em até 30 dias.",
        },
        {
          question: "Você trabalha com referências?",
          answer:
            "Sim, referências são muito bem-vindas! Pode enviar imagens, paletas, moodboards ou descrições.",
        },
        {
          question: "Posso usar comercialmente?",
          answer:
            "Uso pessoal já está incluso. Licença comercial é cobrada à parte, informe o uso ao pedir orçamento.",
        },
        {
          question: "Há revisões?",
          answer:
            "Sim, há revisões durante o processo. Mudanças grandes após finalização podem ter custo adicional.",
        },
      ],
    },

    finalCta: {
      heading: "Pronta para Comissionar?",
      body: "Seja uma ideia bem definida ou apenas um sentimento... Vamos começar uma conversa!",
      ctaPrimary: "Solicitar Comissão",
      ctaSecondary: "Ver Portfólio",
      ctaPrimaryHref: "https://vgen.co/Spantosicus_",
      ctaSecondaryHref: "/pt-br/portfolio",
    },
  },

  "es": {
    seo: {
      title: "Danielle Spantosicus - Artista Digital e Ilustradora de Personajes",
      description:
        "Arte digital personalizado e ilustraciones de personajes por Danielle Spantosicus. Abierta para comisiones: personajes, retratos, fanart, arte para VTuber y más.",
    },

    hero: {
      eyebrow: "Artista Digital e Ilustradora",
      heading: "Arte Digital e Ilustraciones de Personajes Personalizadas",
      subheading:
        "Le doy vida a tus personajes, tus historias y tus ideas a través de la ilustración digital expresiva. Abierta para comisiones.",
      ctaPrimary: "Ver Portafolio",
      ctaSecondary: "Pídeme una Comisión",
      ctaPrimaryHref: "/es/portfolio",
      ctaSecondaryHref: "https://vgen.co/Spantosicus_",
      bannerImage: DeanWinchester,
      imageAlt: "Ilustración digital de Danielle Spantosicus, obra destacada",
      scrollHint: "Desplázate para ver más",
    },

    featured: {
      eyebrow: "Trabajos Seleccionados",
      heading: "Mis Ilustraciones",
      body: "Estas son algunas de mis creaciones personales. ¡Para ver más proyectos, visita mi portafolio!",
      cta: "Ver Portafolio Completo",
      ctaHref: "/es/portfolio",
      works: [
        {
          src: DeanWinchester,
          alt: 'Ilustración fanart de Dean Winchester, retrato del personaje de Supernatural',
          caption: 'Dean Winchester',
        },
        {
          src: Chandler,
          alt: 'Ilustración fanart de Chandler Hallow, retrato del youtuber del equipo de MrBeast',
          caption: 'Chandler Hallow',
        },
        {
          src: DeanAndSam,
          alt: 'Ilustración fanart de Dean y Sam Winchester, los hermanos Winchester de Supernatural',
          caption: 'Dean & Sam',
        },
        {
          type: 'video',
          src: '/works/gif-sly.webm',
          alt: 'GIF animado de Sly Cooper, ilustración del personaje de videojuego',
          caption: 'Gif Sly Cooper',
        },
        {
          src: SlyCooper,
          alt: 'Ilustración fanart de Sly Cooper, retrato del personaje de la saga de videojuegos Sly Cooper',
          caption: 'Sly Cooper',
        },
        {
          src: MrBeast,
          alt: 'Ilustración fanart de MrBeast, retrato del famoso youtuber',
          caption: 'Mr. Beast',
        },
        {
          type: 'video',
          src: '/works/gif-carmelita.webm',
          alt: 'GIF animado de Carmelita Fox, ilustración de la personaje de la saga Sly Cooper',
          caption: 'Gif Carmelita Fox',
        },
        {
          src: DeanAndCastiel,
          alt: 'Ilustración fanart de Dean Winchester y Castiel, retrato de los personajes de Supernatural',
          caption: 'Dean & Castiel',
        },
      ],
    },

    services: {
      eyebrow: "Lo Que Hago",
      heading: "Servicios de Ilustración",
      body: "Cada comisión se hace con cuidado, desde el primer boceto hasta el render final. Esto es en lo que me especializo.",
      items: [
        {
          title: "Ilustración de Personaje",
          description:
            "Ilustraciones de tu personaje en busto, medio cuerpo y cuerpo entero, además de emotes y banners.",
          icon: icons["character"],
        },
        {
          title: "Animaciones en Loop",
          description:
            "Tu personaje cobrando vida con movimientos expresivos y únicos.",
          icon: icons["loop"],
        },
        {
          title: "Fanart",
          description:
            "Tus personajes favoritos de juegos, películas, series o cualquier otro medio, con un toque artístico personal.",
          icon: icons["fanart"],
        },
        {
          title: "Personajes Originales (OC)",
          description:
            "Diseño e ilustración de personajes para tus OCs, incluyendo reference sheets.",
          icon: icons["oc"],
        },
        {
          title: "Arte para VTuber y PNGTuber",
          description:
            "Arte de personaje expresivo y listo para cámara, pensado para modelos de VTuber y PNGTuber. Hago el arte y el rig.",
          icon: icons["vtuber"],
        },
        {
          title: "Ilustración de Fondos",
          description:
            "Escenas ricas y atmosféricas del universo de tu personaje.",
          icon: icons["background"],
        },
      ],
    },

    process: {
      eyebrow: "Cómo Funciona",
      heading: "De la Idea al Arte Final",
      body: "Un proceso claro y colaborativo, pensado para que encargar una comisión sea simple y agradable para los dos.",
      steps: [
        {
          number: "01",
          title: "Envía Tu Idea",
          description:
            "Completa el formulario de comisión o escríbeme directamente. Comparte tu concepto, tus referencias y cualquier requisito específico.",
          icon: icons["bulb"],
        },
        {
          number: "02",
          title: "Definimos los Detalles",
          description:
            "Nos ponemos de acuerdo sobre el alcance, el estilo, el plazo y el precio antes de empezar.",
          icon: icons["messages"],
        },
        {
          number: "03",
          title: "Aprobación del Boceto",
          description:
            "Revisas el boceto inicial y puedes pedir ajustes antes de que pase al render final.",
          image: SupernaturalSketch,
          imageAlt:
            "Etapa de boceto de una ilustración fanart de Supernatural: Dean y Sam Winchester en trazo suelto azul verdoso, vistos desde arriba",
        },
        {
          number: "04",
          title: "Render Final",
          description:
            "Con el boceto aprobado, termino la ilustración con color, iluminación y todos los detalles.",
          image: SupernaturalColor,
          imageAlt:
            "Etapa de render de la misma ilustración: el boceto relleno de color, sombreado e iluminación",
        },
        {
          number: "05",
          title: "Entrega",
          description:
            "Recibes los archivos finales en alta resolución, listos para usar como quieras.",
          image: SupernaturalFinal,
          imageAlt:
            "Etapa final de la misma ilustración: Dean y Sam Winchester sobre un fondo de humo y brasas, firmada por Danielle Spantosicus",
        },
      ],
    },

    about: {
      eyebrow: "Sobre la Artista",
      heading: "Hola, soy Danielle.",
      body: "Soy una artista digital brasileña enamorada de los personajes expresivos. Cada ilustración que creo es una idea que hago realidad a través de mi estilo.",
      cta: "Leer Mi Historia",
      ctaHref: "/es/about",
      parallaxImage: SupernaturalWendigo,
      imageAlt: "Dean y Sam preparándose para enfrentar a un Wendigo, ilustración digital de Danielle Spantosicus",
    },

    testimonials: {
      eyebrow: "Opiniones de Clientes",
      heading: "Lo Que Dicen",
      items: [
        {
          quote: "Respondió súper rápido cada vez que tuve alguna duda, y siempre preguntaba antes de agregar un detalle para asegurarse de que nada quedara afuera. Me encantó hablar con Danielle, muy atenta y comprensiva ♥️",
          author: "Majascreationss",
          context: "Fullbody de Tu Personaje",
        },
        {
          quote: "Siempre le encargo mis artes a Danielle y nunca me decepciona. Si tuviera que recomendar a una artista, sería ella. Se comunica todo el tiempo, se asegura de que quedes contento con el resultado final, hace cambios si se los pides y termina dándoles vida a mis personajes.",
          author: "L3thargicx",
          context: "Reference Sheet de Tu Personaje",
        },
        {
          quote: "¡Artista increíble y muy talentosa! Muy amable y rápida con las respuestas y las actualizaciones. Me encantó encargarle un trabajo y conversar con ella. ¡Muchísimas gracias! ♥️♥️♥️",
          author: "sammy_2496",
          context: "Bust-Up de Tu Personaje (PFP)",
        },
        {
          quote: "Tuve una experiencia increíble trabajando con Danielle. Me mostró el proceso paso a paso y con su talento logró hacer realidad lo que yo tenía en mente. Quedé muy satisfecha con mi comisión y le recomiendo a cualquiera trabajar con ella.",
          author: "Desi",
          context: "Fullbody de Tu Personaje",
        },
        {
          quote: "Una artista muy talentosa, con muy buena comunicación, que se esfuerza para entregar trabajos de gran calidad. ¡La recomiendo muchísimo!",
          author: "epgs30",
          context: "YCH - Emotes",
        },
        {
          quote: "Como siempre, una persona y una artista maravillosa para trabajar. Su arte es hermoso y no te vas a arrepentir~",
          author: "Pidgeonotte",
          context: "YCH - Tarjeta de Navidad"
        },
      ],
    },

    faq: {
      eyebrow: "FAQ",
      heading: "Preguntas Frecuentes",
      items: [
        {
          question: "¿Qué tipos de comisión aceptas?",
          answer:
            "Trabajo con ilustraciones de personajes, fanart, diseño de OCs, animaciones en loop, emotes, arte para VTuber, escenarios y más. Mira la lista completa en mi VGen, o pregúntame directamente si te interesa un servicio específico.",
        },
        {
          question: "¿Qué tipos de comisión NO aceptas?",
          answer:
            "No acepto contenido NSFW, explícito ni gore en exceso (puedo hacerlo, pero tiene un límite). También me reservo el derecho de rechazar cualquier pedido con el que no me sienta cómoda.",
        },
        {
          question: "¿Cuánto tiempo lleva una comisión?",
          answer:
            "La mayoría se entrega entre 5 y 8 días, según la complejidad y la fila del momento. Te doy una estimación en nuestra primera conversación, y además tienes garantía de entrega en hasta 30 días.",
        },
        {
          question: "¿Trabajas con referencias?",
          answer:
            "Sí, las referencias son muy bienvenidas y ayudan a que el resultado final coincida con lo que tienes en mente. Puedes enviarme imágenes, moodboards, paletas de color o descripciones escritas.",
        },
        {
          question: "¿El arte se puede usar comercialmente?",
          answer:
            "El uso personal ya está incluido en todas las comisiones. La licencia comercial tiene un costo aparte, así que cuéntame qué uso le vas a dar cuando pidas un presupuesto.",
        },
        {
          question: "¿Ofreces revisiones?",
          answer:
            "Sí. Ofrezco revisiones y algunos cambios durante el proceso. Los cambios grandes después del render final pueden tener un costo adicional.",
        },
      ],
    },

    finalCta: {
      heading: "¿Empezamos tu Comisión?",
      body: "Ya sea que tengas una idea bien definida o apenas una sensación... ¡Empecemos a conversar!",
      ctaPrimary: "Solicitar una Comisión",
      ctaSecondary: "Ver Mi Portafolio",
      ctaPrimaryHref: "https://vgen.co/Spantosicus_",
      ctaSecondaryHref: "/es/portfolio",
    },
  },
};
