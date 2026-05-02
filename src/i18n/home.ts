import type { ImageMetadata } from 'astro';

import DeanAndCastiel from '../assets/works/dean-and-castiel.webp';
import DeanAndSam from '../assets/works/dean-and-sam.webp';
import DeanWinchester from '../assets/works/dean-winchester.webp';
import MrBeast from '../assets/works/mr-beast.webp';
import SlyCooper from '../assets/works/sly-cooper.webp';
import Chandler from '../assets/works/chandler.webp';

import SupernaturalWendigo from '../assets/works/supernatural-wendigo.webp';

const icons: Record<string, string> = {
  character: `
    <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
    <path d="M3 14c0-2.8 2.2-4.5 5-4.5s5 1.7 5 4.5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>`,

  loop: `
    <path d="M3.5 8a4.5 4.5 0 0 1 7.5-3.2L13 6M12.5 8a4.5 4.5 0 0 1-7.5 3.2L3 10" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13 3.5V6h-2.5M3 12.5V10h2.5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,

  fanart: `
    <path d="M8 2l1.5 4.5H14l-3.8 2.8L11.7 14 8 11.3 4.3 14l1.5-4.7L2 6.5h4.5L8 2z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/>`,

  oc: `
    <circle cx="7" cy="6" r="2.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
    <path d="M2.5 14c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <path d="M13 2l0.6 1.4L15 4l-1.4 0.6L13 6l-0.6-1.4L11 4l1.4-0.6L13 2z" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/>`,

  vtuber: `
    <rect x="2" y="5" width="10" height="8" rx="1.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
    <path d="M12 8l3-2v6l-3-2" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>`,

  background: `
    <path d="M13 10A6 6 0 0 1 6 4a6 6 0 1 0 7 6z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/>`,
};

interface FeaturedImageWork {
  type?: never;
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

function defineWorks(works: FeaturedWork[]): FeaturedWork[] {
  return works;
}

export const homeContent = {
  "en": {
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
      works: defineWorks([
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
      ])
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
        },
        {
          number: "02",
          title: "Discuss the Details",
          description:
            "We'll align on the scope, style, timeline, and pricing before any work begins.",
        },
        {
          number: "03",
          title: "Sketch Approval",
          description:
            "You'll review an initial sketch and request adjustments before I move to the final rendering.",
        },
        {
          number: "04",
          title: "Final Rendering",
          description:
            "With the sketch approved, I craft the full illustration with colors, lighting, and all details.",
        },
        {
          number: "05",
          title: "Delivery",
          description:
            "You receive the final high-resolution files, ready to use however you'd like.",
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
    hero: {
      eyebrow: "Artista Digital & Ilustradora",
      heading: "Arte Digital e Ilustrações de Personagens Personalizados",
      subheading:
        "Dando vida aos seus personagens, histórias e visões através de ilustração digital expressiva. Aberta para comissões.",
      ctaPrimary: "Ver Portfólio",
      ctaSecondary: "Me Comissionar",
      ctaPrimaryHref: "/pt-br/portfolio",
      ctaSecondaryHref: "https://vgen.co/Spantosicus_",
      imageAlt:
        "Ilustração digital por Danielle Spantosicus — obra em destaque",
      scrollHint: "Role para baixo para ver mais",
    },

    featured: {
      eyebrow: "Trabalhos Selecionados",
      heading: "Minhas Ilustrações",
      body: "Aqui estão algumas das minhas criações pessoais. Para ver mais projetos, visite meu portfólio!",
      cta: "Ver Portfólio Completo",
      ctaHref: "/pt-br/portfolio",
      works: defineWorks([
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
      ])
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
        },
        {
          number: "02",
          title: "Alinhamento",
          description:
            "Definimos escopo, estilo, prazo e preço antes de iniciar.",
        },
        {
          number: "03",
          title: "Aprovação do Esboço",
          description:
            "Você revisa o esboço inicial e pode solicitar ajustes antes da renderização final.",
        },
        {
          number: "04",
          title: "Renderização Final",
          description:
            "Com o esboço aprovado, finalizo a arte com cores, iluminação e todos os detalhes.",
        },
        {
          number: "05",
          title: "Entrega",
          description:
            "Você recebe os arquivos finais em alta resolução, prontos para uso.",
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
} as const;

export type HomeContent = (typeof homeContent)["en"];
export type Lang = keyof typeof homeContent;