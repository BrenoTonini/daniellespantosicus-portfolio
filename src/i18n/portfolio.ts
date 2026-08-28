import type { ImageMetadata } from 'astro';

import DeanAndCastiel from '../assets/works/dean-and-castiel.webp';
import DeanAndSam from '../assets/works/dean-and-sam.webp';
import DeanWinchester from '../assets/works/dean-winchester.webp';
import MrBeast from '../assets/works/mr-beast.webp';
import SlyCooper from '../assets/works/sly-cooper.webp';
import Chandler from '../assets/works/chandler.webp';
import SupernaturalWendigo from '../assets/works/supernatural-wendigo.webp';
import MariaAndJohnny from '../assets/works/maria-and-johnny-commission.webp';
import PidgeConcept from '../assets/works/pidge-concept-commission.webp';
import Clover from '../assets/works/clover-commission.webp';
import TheBoys from '../assets/works/the-boys-commission.webp';
import TylerAndIvyHalfbody from '../assets/works/tyler-and-ivy-halfbody-commission.webp';
import JennyDate from '../assets/works/jenny-date-commission.webp';
import SammyPool from '../assets/works/sammy-pool-commission.webp';
import TylerAndIvyBustUp from '../assets/works/tyler-and-ivy-bust-up-commission.webp';
import PidgeonotteSummer from '../assets/works/pidgeonotte-summer-commission.webp';
import SammyPicnic from '../assets/works/sammy-picnic-commission.webp';
import TylerAndIvyFullbody from '../assets/works/tyler-and-ivy-fullbody-commission.webp';
import CassidAndNicole from '../assets/works/cassid-and-nicole-commission.webp';

type PortfolioLocale = 'en' | 'pt-br';

interface PortfolioSEO {
  title: string;
  description: string;
}

interface PortfolioIntro {
  heading: string;
  description: string;
}

interface PortfolioImageItem {
  type?: 'image'; // opcional, default
  src: ImageMetadata;
  alt: string;
  title: string;
  eager?: boolean;
}

interface PortfolioVideoItem {
  type: 'video';
  src: string;
  poster?: string;
  alt: string;
  title: string;
  eager?: boolean;
}

export type PortfolioItem = PortfolioImageItem | PortfolioVideoItem;

interface PortfolioGallery {
  ariaLabel: string;
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
      ariaLabel: 'Gallery of illustrations by Danielle Spantosicus',
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
          src: TylerAndIvyBustUp,
          alt: 'Commission: Three-panel illustration of Tyler and Ivy from the chest up, each panel in a different mood',
          title: 'Tyler and Ivy, three panels',
        },
        {
          src: CassidAndNicole,
          alt: 'Commission: Chibi illustration of Cassid and Nicole on a pink background with hearts',
          title: 'Cassid and Nicole, chibi',
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
          src: SlyCooper,
          alt: 'Character illustration of Sly Cooper',
          title: 'Sly Cooper',
        },
        {
          type: 'video',
          src: '/works/gif-carmelita.webm',
          alt: 'Animated GIF of Carmelita Fox',
          title: 'GIF Carmelita Fox',
        },
        {
          type: 'video',
          src: '/works/gif-sly.webm',
          alt: 'Animated GIF of Sly Cooper',
          title: 'GIF Sly Cooper',
        },
        {
          src: TylerAndIvyFullbody,
          alt: "Commission: Full-body illustration of Tyler and Ivy, with Ivy sitting on Tyler's shoulders",
          title: 'Tyler and Ivy, full body',
        },
        {
          src: PidgeonotteSummer,
          alt: 'Commission: Illustration of Pidgeonotte, an elf with green hair and a sunflower, in a swimming pool',
          title: 'Pidgeonotte, summer',
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
          src: SammyPicnic,
          alt: 'Commission: Illustration of Johnny and Maria at a picnic under a tree by a lake',
          title: 'Johnny and Maria, the picnic',
        },
        {
          src: JennyDate,
          alt: 'Commission: Illustration of Johnny and Maria running hand in hand through sunlit woods',
          title: 'Johnny and Maria, the date',
        },
        {
          src: SammyPool,
          alt: 'Commission: Illustration of Johnny and Maria leaning over a pool table in a bar',
          title: 'Johnny and Maria, the pool table',
        },
        {
          src: TylerAndIvyHalfbody,
          alt: 'Commission: Illustration of Tyler and Ivy embracing, shown from the waist up',
          title: 'Tyler and Ivy, half body',
        },
        {
          src: Clover,
          alt: 'Focus illustration of Clover from pidgeonotte commission',
          title: 'Clover, The conure',
        },
        {
          src: DeanAndCastiel,
          alt: 'Illustration of Dean Winchester and Castiel',
          title: 'Dean and Castiel',
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
      ariaLabel: 'Galeria de ilustrações de Danielle Spantosicus',
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
          title: 'Maria e Johnny',
        },
        {
          src: Chandler,
          alt: 'Ilustração retrato do Chandler Hallow da equipe MrBeast',
          title: 'Chandler Hallow',
        },
        {
          src: TylerAndIvyBustUp,
          alt: 'Comissão: Ilustração em três quadros de Tyler e Ivy do peito para cima, cada quadro em um clima diferente',
          title: 'Tyler e Ivy, três quadros',
        },
        {
          src: CassidAndNicole,
          alt: 'Comissão: Ilustração chibi de Cassid e Nicole sobre fundo rosa com corações',
          title: 'Cassid e Nicole, chibi',
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
          title: 'Pidge concept art',
        },
        {
          src: SlyCooper,
          alt: 'Ilustração de personagem do Sly Cooper',
          title: 'Sly Cooper',
        },
        {
          type: 'video',
          src: '/works/gif-carmelita.webm',
          alt: 'GIF animado da Carmelita Fox',
          title: 'GIF Carmelita Fox',
        },
        {
          type: 'video',
          src: '/works/gif-sly.webm',
          alt: 'GIF animado do Sly Cooper',
          title: 'GIF Sly Cooper',
        },
        {
          src: TylerAndIvyFullbody,
          alt: 'Comissão: Ilustração de corpo inteiro de Tyler e Ivy, com Ivy sentada nos ombros de Tyler',
          title: 'Tyler e Ivy, corpo inteiro',
        },
        {
          src: PidgeonotteSummer,
          alt: 'Comissão: Ilustração de Pidgeonotte, uma elfa de cabelo verde com um girassol, em uma piscina',
          title: 'Pidgeonotte, verão',
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
          title: 'The boys Commission',
        },
        {
          src: SammyPicnic,
          alt: 'Comissão: Ilustração de Johnny e Maria em um piquenique sob uma árvore à beira de um lago',
          title: 'Johnny and Maria, o piquenique',
        },
        {
          src: JennyDate,
          alt: 'Comissão: Ilustração de Johnny e Maria correndo de mãos dadas por uma mata ensolarada',
          title: 'Johnny and Maria, o encontro',
        },
        {
          src: SammyPool,
          alt: 'Comissão: Ilustração de Johnny e Maria debruçados sobre uma mesa de sinuca em um bar',
          title: 'Johnny and Maria, a mesa de sinuca',
        },
        {
          src: TylerAndIvyHalfbody,
          alt: 'Comissão: Ilustração de Tyler e Ivy abraçados, da cintura para cima',
          title: 'Tyler e Ivy, meio corpo',
        },
        {
          src: Clover,
          alt: 'Foco na ilustração de Clover da comissão da Pidgeonotte',
          title: 'Clover, O papagaio',
        },
        {
          src: DeanAndCastiel,
          alt: 'Ilustração de Dean Winchester e Castiel',
          title: 'Dean e Castiel',
        },
      ],
    },
  },
};

export type PortfolioLang = keyof typeof portfolioContent;
