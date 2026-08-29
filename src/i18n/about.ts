import type { ImageMetadata } from 'astro';
import AboutHeroImage from "../assets/works/dean-winchester.webp";

export type AboutLang = 'en' | 'pt-br' | 'es';

export interface AboutContent {
  seo: { title: string; description: string };
  hero: { image: ImageMetadata; imageAlt: string };
  story: { title: string; paragraphs: string[] };
}


export const aboutContent: Record<AboutLang, AboutContent> = {
  en: {
    seo: {
      title: "About Danielle Spantosicus | Digital Artist",
      description:
        "Discover the story of Danielle Spantosicus, a Brazilian digital artist, her creative journey, and the evolution of her illustration style.",
    },
    hero: {
      image: AboutHeroImage,
      imageAlt: "Portrait-style digital illustration by Danielle Spantosicus",
    },
    story: {
      title: "My story",
      paragraphs: [
        "Hi! My name is Danielle and I'm a digital artist.",
        "I've been drawing on paper since I was a child, growing up with a deep love for art. Whether it was handmade crafts, clay, sculptures, or working with tape and cardboard, I would use anything I could to bring my ideas to life.",
        "For most of my life, I worked with traditional art. But in 2021, I finally got my first display tablet, something I had always wanted so I could see directly while drawing.",
        "Over the years, I kept practicing until I found my own style. Today, I'm really happy with the progress I've made and where my art is now.",
        "I love my style, but I'm always looking to improve, studying, learning, and pushing myself further. Recently, I've been taking my art much more seriously, especially focusing on painting and environment design.",
        "I feel like I still have a lot to learn, and I'm excited to reach new levels with my art. I hope you enjoy my work as much as I do.",
        "Never stop practicing, that's the key to creating unique and expressive art.",
      ],
    },
  },
  "pt-br": {
    seo: {
      title: "Sobre Danielle Spantosicus | Artista Digital",
      description:
        "Conheça a história de Danielle Spantosicus, artista digital brasileira, suas referências e a construção do seu estilo de ilustração.",
    },
    hero: {
      image: AboutHeroImage,
      imageAlt: "Ilustração digital em estilo retrato feita por Danielle Spantosicus",
    },
    story: {
      title: "Minha história",
      paragraphs: [
        "Oi! Meu nome é Danielle e sou uma artista digital.",
        "Desenho no papel desde criança e cresci com um amor pela arte. Seja ela feita à mão, usando massas de modelar, esculturas, com fita ou papelão, eu usava o que fosse preciso para fazer as minhas ideias artísticas ganharem vida.",
        "Por muito tempo, desenhei na boa e velha maneira tradicional. Em 2021, finalmente consegui a minha primeira mesa digitalizadora com display, porque era a que eu queria para poder ver enquanto desenhava.",
        "Fui praticando durante os anos até encontrar o meu próprio estilo. Hoje estou muito feliz com todo o progresso que consegui criar com a minha arte e com o estado atual dela.",
        "Amo o meu estilo, mas estou sempre em busca de ir além. No momento estou levando meus desenhos muito mais a sério, buscando estudar e me aperfeiçoar, principalmente com a pintura e construção de cenários.",
        "Sinto que ainda tenho muito a aprender e estou bem ansiosa em conquistar novos patamares com meu desenho. Espero que gostem da minha arte assim como eu gosto.",
        "Nunca deixem de praticar pois essa é a chave para uma arte única e cheia de personalidade.",
      ],
    },
  },
  es: {
    seo: {
      title: "Sobre Danielle Spantosicus | Artista Digital",
      description:
        "Conoce la historia de Danielle Spantosicus, artista digital brasileña, su recorrido creativo y la construcción de su estilo de ilustración.",
    },
    hero: {
      image: AboutHeroImage,
      imageAlt: "Ilustración digital en estilo retrato hecha por Danielle Spantosicus",
    },
    story: {
      title: "Mi historia",
      paragraphs: [
        "¡Hola! Me llamo Danielle y soy artista digital.",
        "Dibujo en papel desde niña y crecí con un amor enorme por el arte. Ya fueran manualidades, plastilina, esculturas, cinta o cartón, usaba lo que tuviera a mano para darles vida a mis ideas.",
        "Durante buena parte de mi vida trabajé con arte tradicional. Pero en 2021 por fin conseguí mi primera tableta con pantalla, algo que siempre había querido para poder ver el dibujo mientras lo hacía.",
        "Con los años seguí practicando hasta encontrar mi propio estilo. Hoy estoy muy feliz con el progreso que logré y con el punto en el que está mi arte.",
        "Amo mi estilo, pero siempre busco mejorar, estudiar, aprender y exigirme un poco más. Últimamente me he tomado mi arte mucho más en serio, sobre todo la pintura y la construcción de escenarios.",
        "Siento que todavía tengo mucho por aprender y me entusiasma llegar a nuevos niveles con mi arte. Espero que disfruten mi trabajo tanto como yo.",
        "Nunca dejen de practicar, esa es la clave para crear un arte único y lleno de personalidad.",
      ],
    },
  },
};
