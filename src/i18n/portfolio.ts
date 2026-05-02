import type { ImageMetadata } from 'astro';

import DeanAndCastiel from '../assets/works/dean-and-castiel.png';
import DeanAndSam from '../assets/works/dean-and-sam.png';
import DeanWinchester from '../assets/works/dean-winchester.png';
import MrBeast from '../assets/works/mr-beast.png';
import SlyCooper from '../assets/works/sly-cooper.png';
import GifSly from '../assets/works/gif-sly.gif';
import GifCarmelita from '../assets/works/gif-carmelita.gif';
import Chandler from '../assets/works/chandler.png';
import SupernaturalWendigo from '../assets/works/supernatural-wendigo.png';
import MariaAndJohnny from '../assets/works/maria-and-johnny-commission.png';
import PidgeConcept from '../assets/works/pidge-concept-commission.png';
import Clover from '../assets/works/clover-commission.png';
import TheBoys from '../assets/works/the-boys-commission.png';

type PortfolioLocale = 'en' | 'pt-br';

interface PortfolioSEO {
  title: string;
  description: string;
}

interface PortfolioIntro {
  heading: string;
  description: string;
}

interface PortfolioItem {
  src: ImageMetadata;
  alt: string;
  title: string;
  eager?: boolean;
}

interface PortfolioGallery {
  items: PortfolioItem[];
}

export interface PortfolioPageContent {
  seo: PortfolioSEO;
  ogImage: ImageMetadata;
  intro: PortfolioIntro;
  gallery: PortfolioGallery;
}

export const portfolioContent: Record<PortfolioLocale, PortfolioPageContent> = {
  en: {
    seo: {
      title: 'Portfolio | Danielle Spantosicus - Digital Artist',
      description:
        'Gallery of digital illustrations by Danielle Spantosicus, focused on character art, fanart, and animated pieces.',
    },
    ogImage: SupernaturalWendigo,
    intro: {
      heading: 'Portfolio',
      description:
        'A selection of works focusing on details, a space where the art speaks for itself.',
    },
    gallery: {
      items: [
        {
          src: DeanWinchester,
          alt: 'Illustration of Dean Winchester from Supernatural',
          title: 'Dean Winchester',
          eager: true,
        },
        {
          src: MariaAndJohnny,
          alt: 'Commission: Illustration of Maria and Johnny from the game "The Texas Chain Saw Massacre"',
          title: 'Maria and Johnny',
        },
        {
          src: Chandler,
          alt: 'Portrait illustration of Chandler Hallow from the MrBeast team',
          title: 'Chandler Hallow',
        },
        {
          src: SupernaturalWendigo,
          alt: 'Scene illustration with Dean and Sam facing a Wendigo',
          title: 'Supernatural Wendigo',
        },
        {
          src: DeanAndSam,
          alt: 'Illustration of Dean and Sam Winchester together',
          title: 'Dean and Sam',
          eager: true,
        },
        {
          src: PidgeConcept,
          alt: 'Commission: Character concept illustration of Pidgeonotte',
          title: 'Pidge concept art',
        },
        {
          src: GifSly,
          alt: 'Animated GIF of Sly Cooper',
          title: 'GIF Sly Cooper',
        },
        {
          src: SlyCooper,
          alt: 'Character illustration of Sly Cooper',
          title: 'Sly Cooper',
        },
        {
          src: DeanAndCastiel,
          alt: 'Illustration of Dean Winchester and Castiel',
          title: 'Dean and Castiel',
        },
        {
          src: MrBeast,
          alt: 'Fanart portrait of MrBeast',
          title: 'Mr. Beast',
          eager: true,
        },
        {
          src: TheBoys,
          alt: 'Commission: Illustration of soldier boy from the series "The boys" and Mia',
          title: 'The Boys Commission',
        },
        {
          src: GifCarmelita,
          alt: 'Animated GIF of Carmelita Fox',
          title: 'GIF Carmelita Fox',
        },
        {
          src: Clover,
          alt: 'Focus illustration of Clover from pidgeonotte commission',
          title: 'Clover, The conure'
        },
      ],
    },
  },
  'pt-br': {
    seo: {
      title: 'Portfólio | Danielle Spantosicus - Artista Digital',
      description:
        'Galeria de ilustrções digitais de Danielle Spantosicus, com foco em personagens, fanarts e peças animadas.',
    },
    ogImage: SupernaturalWendigo,
    intro: {
      heading: 'Portfólio',
      description:
        'Uma seleção de trabalhos focando nos detalhes, um espaço onde a arte fala por si só.',
    },
    gallery: {
      items: [
        {
          src: DeanWinchester,
          alt: 'Ilustração do Dean Winchester de Supernatural',
          title: 'Dean Winchester',
          eager: true,
        },
        {
          src: MariaAndJohnny,
          alt: 'Comissão: Ilustração de Maria e Johnny do jogo "The Texas Chain Saw Massacre"',
          title: 'Maria e Johnny'
        },
        {
          src: Chandler,
          alt: 'Ilustração retrato do Chandler Hallow da equipe MrBeast',
          title: 'Chandler Hallow',
        },
        {
          src: SupernaturalWendigo,
          alt: 'Ilustração de cena com Dean e Sam enfrentando um Wendigo',
          title: 'Supernatural Wendigo',
        },
        {
          src: DeanAndSam,
          alt: 'Ilustração de Dean e Sam Winchester juntos',
          title: 'Dean e Sam',
          eager: true,
        },
        {
          src: PidgeConcept,
          alt: 'Comissão: Concept art do personagem de Pidgeonotte',
          title: 'Pidge concept art'
        },
        {
          src: GifSly,
          alt: 'GIF animado do Sly Cooper',
          title: 'GIF Sly Cooper',
        },
        {
          src: SlyCooper,
          alt: 'Ilustração de personagem do Sly Cooper',
          title: 'Sly Cooper',
        },
        {
          src: DeanAndCastiel,
          alt: 'Ilustração de Dean Winchester e Castiel',
          title: 'Dean e Castiel',
        },
        {
          src: MrBeast,
          alt: 'Retrato fanart do MrBeast',
          title: 'Mr. Beast',
          eager: true,
        },
        {
          src: TheBoys,
          alt: 'Comissão: Ilustração de Soldier Boy da série "The Boys" e Mia',
          title: 'The boys Commission'
        },
        {
          src: GifCarmelita,
          alt: 'GIF animado da Carmelita Fox',
          title: 'GIF Carmelita Fox',
        },
        {
          src: Clover,
          alt: 'Foco na ilustração de Clover da comissão da Pidgeonotte',
          title: 'Clover, O papagaio'
        }
        
      ],
    },
  },
};

export type PortfolioLang = keyof typeof portfolioContent;
