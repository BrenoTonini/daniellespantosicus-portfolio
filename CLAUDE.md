# CLAUDE.md — Portfólio Danielle Spantosicus

Mapa das decisões técnicas e de conteúdo do projeto.

Documentos irmãos:
- [docs/REDESIGN.md](docs/REDESIGN.md) — o plano de redesign em andamento e suas fases.
- [docs/BASELINE.md](docs/BASELINE.md) — métricas de performance medidas antes do redesign.

> **Estado:** a §24 do plano (limpeza técnica pré-redesign) está concluída. As Fases 2–7 do
> redesign ainda não começaram — o visual é o original, agora sem as dívidas que o mascaravam.

---

## 1. Stack e build

| Peça | Escolha | Observações |
|---|---|---|
| Framework | **Astro 6** | Zero-JS por padrão; nenhum framework de UI |
| CSS | **Tailwind 4** via `@tailwindcss/vite` | Não existe `tailwind.config.*` — configuração CSS-first |
| Tipos | `astro/tsconfigs/strict` + `strictNullChecks` | `npm run typecheck` (`astro check`) — **0 erros / 0 warnings / 0 hints** |
| Deploy | **Vercel** (`@astrojs/vercel`) | |
| Imagens | `astro:assets` + `sharp` | Artes em `.webp`; GIFs como `.webm` |
| Node | `>= 22.12.0` | |

Dependências: `astro`, `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/vercel`, `tailwindcss`,
`@tailwindcss/vite`, `sharp`. Dev: `@astrojs/check`, `typescript`, `playwright` (QA visual, §26 do plano).

### Decisão-chave: `output: 'server'` com páginas pré-renderizadas

[astro.config.mjs](astro.config.mjs) define `output: 'server'`, e **toda** página declara
`export const prerender = true`. O histórico mostra a evolução:

```
0ef4452  alterando astro.config.mjs para servir em modo 'static'
7d3121a  alterando abordagem para output server com páginas pré renderizadas em modo static
```

O motivo é o middleware: o redirect de `/` precisa ler `Accept-Language` em runtime, o que
`static` não permite. O resultado é um híbrido — 6 páginas HTML estáticas + uma função
serverless que só atende `/`.

**Implicação:** qualquer página nova precisa de `export const prerender = true` explícito, senão
vira SSR silenciosamente.

A única exceção é [404.astro](src/pages/404.astro), que declara `prerender = false` — pelo mesmo
motivo do middleware, e explicado no topo do arquivo: só em runtime existe a URL que o visitante
pediu, e é dela que sai o idioma da página. Pré-renderizada, ela serviria inglês para quem errou
o caminho dentro de `/pt-br/`. O `vercel.json` gerado já manda todo caminho não resolvido para a
função com `status: 404`, então a rota SSR entra sem configuração extra.

---

## 2. Internacionalização (implementação própria)

Não usa `astro:i18n`. A camada é manual, em [src/i18n/](src/i18n/):

- [ui.ts](src/i18n/ui.ts) — `languages` (`en`, `pt-br`), `defaultLang = 'en'`,
  `showDefaultLang = true`, e o dicionário `ui` de strings de interface (nav, socials, footer,
  language picker, controles do carrossel).
- [utils.ts](src/i18n/utils.ts) — `getLangFromUrl`, `useTranslations`, `useTranslatedPath`,
  `getPathForLang`, `getLangFromBrowser`.
- [middleware.ts](src/middleware.ts) — em `/`, lê `Accept-Language`, redireciona **302** para
  `/<lang>/` e seta `Vary: Accept-Language` (para a CDN não fixar um idioma no cache).

`showDefaultLang = true` significa que **nenhum idioma é servido na raiz**: todas as páginas
vivem sob prefixo. [src/pages/index.astro](src/pages/index.astro) é um arquivo vazio
proposital, apenas para a rota existir e o middleware interceptá-la.

Interpolação segue o padrão `t('chave').replace('{n}', valor)` — usado em `footer.copyright`
(`{year}`) e `testimonials.goTo` (`{n}`).

### Duplicação de rotas por idioma

Cada página existe duas vezes, copiada:

```
src/pages/en/{index,about,portfolio}.astro
src/pages/pt-br/{index,about,portfolio}.astro
```

Não há `[lang]` dinâmico nem `getStaticPaths`. Os arquivos diferem apenas em `lang` e no path
passado ao helper de SEO. **Ainda é uma dívida** — adicionar um terceiro idioma custa 3 arquivos
novos. Candidato natural a virar rota dinâmica na Fase 2.

---

## 3. Conteúdo: módulos TS, não content collections

Decisão central: **todo o conteúdo editorial é código TypeScript**, não Markdown.

- [i18n/home.ts](src/i18n/home.ts) — seo, hero, works em destaque, serviços (com SVGs inline
  num mapa `icons`), processo, teaser do sobre, depoimentos, FAQ, CTA final.
- [i18n/portfolio.ts](src/i18n/portfolio.ts) — seo, ogImage, intro e itens da galeria.
- [i18n/about.ts](src/i18n/about.ts) — seo, hero e parágrafos da história.
- [i18n/notFound.ts](src/i18n/notFound.ts) — seo, cópia da 404 e os dois caminhos de volta.

Cada componente de seção recebe uma prop `content` tipada por uma fatia desse objeto. As imagens
são importadas no topo do módulo, o que dá otimização e `ImageMetadata` de graça.

Artes de obra ficam em [src/assets/works/](src/assets/works/); os estágios de produção usados na
seção de processo ficam em [src/assets/process/](src/assets/process/), separados porque não são
peças do portfólio — são a mesma peça em três momentos.

### Padrão de tipagem: `Record<Lang, Content>`

Os três módulos usam interfaces explícitas e são exportados como
`Record<Lang, Conteúdo>`. Isso **força os dois idiomas a ter exatamente a mesma forma** — se uma
chave faltar em `pt-br`, o typecheck falha.

Antes, `home.ts` e `about.ts` usavam `as const` com o tipo derivado do inglês
(`type HomeContent = (typeof homeContent)["en"]`). Como os literais de `pt-br` não eram
estruturalmente compatíveis, `pages/pt-br/index.astro` usava `as any` nas 8 seções — anulando a
checagem exatamente onde ela era mais útil. **Não reintroduzir `as any` aqui.**

---

## 4. SEO

- [BaseHead.astro](src/components/BaseHead.astro) centraliza: `canonical`, `hreflang` por
  alternativa + `x-default` (aponta para `en`), Open Graph (com `og:locale` derivado de `lang`),
  Twitter Card `summary_large_image` e imagem OG de fallback
  (`danielle-spantosicus-banner.webp`).
- [lib/seo.ts](src/lib/seo.ts) — `buildPageUrls(site, origin, lang, path)` monta canonical +
  alternates. Usa `new URL` em vez de template string: `Astro.site` já termina em `/`, e a
  concatenação manual (`${site}/en/about/`) produzia **barra dupla** no canonical, hreflang,
  `og:url` e `twitter:url` das 6 páginas. Sempre montar URL absoluta por aqui.
- **JSON-LD dentro dos componentes**, não no head:
  - `FAQPage` em [FAQ.astro](src/components/home/FAQ.astro)
  - `Product` + `Review[]` + `AggregateRating` em
    [Testimonials.astro](src/components/home/Testimonials.astro)
- Sitemap com filtro que **remove `/`** (a raiz é só redirect, não deve ser indexada). A 404 não
  aparece nele por não ser pré-renderizada.
- `BaseHead` aceita `noindex`, que troca o `<link rel="canonical">` por
  `<meta name="robots" content="noindex, follow">`. É de uso da 404 e de mais nada: uma URL que
  não existe não pode se declarar canônica de si mesma, e a página também não recebe `alternates`
  (não há equivalente em outro idioma de um endereço errado).
- [robots.txt](public/robots.txt) estático + ponteiro para o sitemap.

O SEO de cada página vem de `content.seo` nos módulos de i18n — nada hardcoded na página.

Ponto de atenção: o `AggregateRating` fixa `ratingValue: 5` e conta os depoimentos do array — é
dado declarado à mão, não coletado.

---

## 5. Design system

Tokens em `:root` de [global.css](src/styles/global.css) — **não usa `@theme` do Tailwind 4**.
Consequência: os componentes acessam os tokens por valor arbitrário, `bg-(--color-surface)`,
`text-(--color-foreground)`, e não por classes semânticas (`bg-surface`).

> A Fase 2 do redesign deve migrar para `@theme`, para que os tokens gerem utilities reais e
> entrem no IntelliSense. O comentário no topo do `global.css` marca isso.

**Paleta** — dark-only, terrosa/quente, sem tema claro:

```
background #141411   surface #1d1818       surface-alt  #261f1f
foreground #f3e7e4   foreground-muted #b8a7a4   muted #b8a7a4   muted-soft #948181
primary    #c4826c   primary-dark #8c5042  primary-soft #5c3d37   primary-pale #45332e
sparkle    #3d0c0c   border  #3a2c2c       border-hover #5c4340
```

`foreground-muted`, `primary-pale` e `border-hover` eram usados por 20 declarações mas **nunca
foram definidos** — os valores acima são provisórios, escolhidos para tornar honesto o que o CSS
já tentava fazer. A Fase 2 redefine a paleta inteira.

**Tipografia** — `Cormorant Garamond` (display) + `DM Sans` (corpo), do Google Fonts com
`preconnect`.

### Regra de escopo: utilities globais vão em `global.css`

`.font-display`, `.font-sans` e `.grain-overlay` **precisam** viver em `global.css`. Estavam no
`<style>` de `PageLayout.astro`, e os estilos de componente do Astro são escopados por
`data-astro-cid-*` — uma regra declarada no layout não alcança os componentes filhos. Como
`font-display` é usada por 10 componentes filhos (todos os headings) e `grain-overlay` por 2,
**nenhuma das duas aplicava**: os headings renderizavam em DM Sans e o grain era invisível.

Ao criar uma classe utilitária consumida por mais de um componente, ela vai em `global.css`.

**Linguagem visual** — editorial/galeria: cantos retos, muito espaço vertical
(`py-24 lg:py-32`), `max-w-7xl`, eyebrow em maiúsculas com `tracking-[0.25em]`, overlay de grão
(SVG `feTurbulence` inline), blobs radiais desfocados, galerias em masonry
(`columns-2 lg:columns-3`).

Exceção proposital: as páginas de portfólio não usam container — `PortfolioIntro` e
`PortfolioGallery` são `w-full`, então a galeria vai de ponta a ponta.

---

## 6. Componentes e interatividade

```
layouts/PageLayout.astro    BaseHead + Header + main + Footer (único layout)
lib/seo.ts                  buildPageUrls — canonical + alternates

components/BaseHead, Header, Nav, Footer, LanguagePicker, SocialLinks
components/home/            Hero, FeaturedWorks, Services, Process, AboutTeaser,
                            Testimonials, FAQ, FinalCTA, SectionHeading
components/about/           AboutHero, AboutText
components/portfolio/       PortfolioIntro, PortfolioGallery
components/notfound/        NotFound
```

**Interatividade é toda vanilla JS em `<script>` inline** — nenhuma ilha de framework, nenhum
arquivo `.js` servido ao cliente:

- **Carrossel de depoimentos**: `scroll-snap` nativo. A pista É o scroll container, as
  larguras vêm de `flex-basis` em CSS e o JS só faz `scrollTo`, sincroniza os dots e trata
  as setas/teclado. Não há clones, nem medição de largura, nem flag `animating`.
- **FAQ**: acordeão que anima `max-height` a partir de `scrollHeight` medido no clique.
- **Parallax do AboutTeaser**: `animation-timeline` (scroll-driven animation) resolvido pelo
  compositor, com fallback em `requestAnimationFrame` + `IntersectionObserver` para
  navegadores sem suporte.
- **LanguagePicker**: `<select>` nativo estilizado que navega no `change`.

### Regras aprendidas nestes dois componentes

- **Largura de item de carrossel vive no CSS.** Medir e escrever `style.width` em JS deixa o
  layout errado até a hidratação. `flex: 0 0 calc((100% - gap * (n - 1)) / n)` resolve, e a
  porcentagem se ancora na largura visível do scroll container.
- **Um valor de layout não pode existir em CSS e JS ao mesmo tempo.** O gap era `gap-5` na
  classe e `GAP_PX = 20` no script; o JS agora deriva o passo de `offsetLeft`.
- **`view()` não funciona dentro de `overflow: hidden`.** A seção com overflow escondido é um
  scroll container, então o timeline tem que ser nomeado no ancestral que realmente rola.
- **Sem `backdrop-filter` sobre camada em movimento.** Além do glassmorphism que o plano §3
  rejeita, obriga o compositor a refazer o blur a cada frame.

`SocialLinks.astro` concentra os três links sociais e o padrão de `mask-image` que estava
duplicado entre Header e Footer. Os ícones são SVGs aplicados como máscara, para herdarem cor
via `background-color`. As URLs vêm de [lib/links.ts](src/lib/links.ts) — o VGen é o único caminho
de conversão do site e aparece em mais de um lugar.

O ícone tem 24px, que é exatamente o mínimo do WCAG 2.5.8 e sem folga nenhuma. O alvo cresce para
32px por **pseudo-elemento absoluto**, não por `padding`: o header em 390px não tem os ~40px extras
que o padding custaria, e a QA visual falharia com overflow horizontal. O recuo (`inset: -0.25rem`)
é metade do `gap`, então os alvos vizinhos se encostam sem se sobrepor — sobreposição vira toque
errado.

### `Process.astro`: a prancha é constante, o conteúdo dela não

A seção de processo mostra **uma única arte** em três estágios (esboço → cor → final), não três
peças diferentes. É essa constância que faz a fileira ser lida como uma peça se formando. Trocar
uma das três por arte de outra obra quebra a leitura, e é por isso que os imports ficam agrupados
e comentados no topo de `home.ts`.

A peça é uma **fan art autoral de Supernatural, não uma comissão** — os `imageAlt` dizem
"ilustração fan art" / "fan art illustration", nunca "comissão". A seção descreve o fluxo de
comissão; as imagens só ilustram os estágios. Não confundir os dois nos textos alternativos.

As etapas 01 e 02 são ideia e conversa, não desenho — **não existe arte para elas, e isso é o
dado**. Elas recebem um ícone do mapa `icons` (`bulb` e `messages`) dentro da mesma moldura, com
marcas de corte nos cantos. Não inventar ilustração para essas duas: competiria com as três que
são arte de verdade. As marcas de corte não são enfeite — sem elas o ícone flutua num retângulo
vazio, que é lido como imagem que falhou ao carregar.

O tipo é uma **união exclusiva** (`ProcessArtStep | ProcessMarkStep`): ou a etapa tem
`image` + `imageAlt`, ou tem `icon`, nunca os dois nem nenhum. Isso fecha dois furos de uma vez —
prancha sem conteúdo e imagem sem nome acessível — no typecheck, antes de virar layout quebrado.

O mapa `icons` em `home.ts` passou a servir dois consumidores. `serviceIcons` continua sendo lista
explícita justamente por isso: `bulb` e `messages` não pertencem à trama do Hero.

Regras de layout que valem a pena não redescobrir:

- **A linha do tempo atravessa a fileira inteira** porque cada coluna desenha sua própria régua
  com `-mx-2`, anulando o `lg:px-2` do `li` — as réguas de colunas vizinhas se encostam. O número
  interrompe a régua no lugar de morar num medalhão, e é `aria-hidden`: a ordem já vem do `<ol>`.
- **A divisória da pilha mobile está em CSS escopado, não em `border-t lg:border-0`.** As duas
  classes disputam a mesma propriedade, e a ordem de saída do Tailwind entre variante de
  pseudo-classe e media query não é algo em que valha apostar.
- **`PLATE_SIZES` tem que acompanhar as classes `w-*` da prancha.** É o `sizes` do `srcset`; se
  divergirem, o browser baixa a candidata errada — grande demais no mobile ou borrada no desktop.
  No grid, `prancha = min(1280, 100vw − 128) / 5 − 16`, o que satura em **240px a partir de
  1408px** de viewport (não 1280 — o `px-16` da seção adianta a saturação). Medir no navegador
  antes de mexer: a primeira versão declarava 218px e errava toda a faixa acima de 1024.
- **Os ícones usam `vector-effect: non-scaling-stroke`, aplicado via `:global(path)`.** A mesma
  marca vai de 36px no mobile a 64px no desktop; sem isso o traço escalaria com ela (3px → 5.3px).
  O `:global()` é obrigatório: os `path` vêm de `set:html`, que o Astro não marca com
  `data-astro-cid-*`, então um seletor escopado não encontraria nada. E `vector-effect` não é
  herdado — pôr no `<svg>` não resolve.
- O grid de 5 colunas só entra em `lg`. Em `md` cinco pranchas dariam ~120px cada e a legenda
  caberia em duas palavras por linha, então até 1024px a seção é uma lista de linhas.

### `NotFound.astro`: a prancha fora de registro

A 404 reusa a linguagem da home inteira — gradientes estáticos do Hero, grão, eyebrow em
maiúsculas, os dois botões do Hero, e a prancha com marcas de corte de `Process.astro`. O que ela
tem de próprio é o efeito: **três cópias de "404" fora de registro**, como uma tiragem que saiu
torta. A de cima é opaca; as outras duas são chapas de cor (`primary-dark` e `primary`).

O gesto é o que amarra o efeito ao conteúdo: **passar o ponteiro (ou o foco) no botão de voltar
para a home acerta o registro** — as chapas voltam ao lugar e o "404" fica limpo. O caminho que
resolve o erro é o que conserta a imagem. Vale no `focus` também, senão quem navega por teclado
não veria a resposta.

Regras que valem não redescobrir:

- **`translate` (a propriedade) guarda o desalinhamento de base; `transform` é do script.** São
  duas propriedades independentes que compõem, então o parallax por frame não apaga o desvio
  inicial. Escrever tudo em `transform` obrigaria a recompor a string a cada frame.
- **Estilo inline ganha de folha de estilo, então `.is-aligned` só funciona depois de limpar o
  `style.transform`.** É o que o `setAligned(true)` faz antes de devolver o controle ao CSS, e o
  motivo de `apply()` sair cedo enquanto a classe está posta.
- **A deriva de repouso e o parallax disputam a mesma propriedade** — dois movimentos em
  `transform` não somam, um vence. Daí `.is-live` desligar a `animation` quando o ponteiro assume.
  A deriva existe para o toque, onde não há ponteiro para reagir.
- **Mesma disciplina de `pointermove` do Hero**: rect lido no máximo uma vez por frame, nunca no
  handler, invalidado por resize/scroll.
- **A prancha é retrato, então a largura precisa ser contida no mobile** (`max-w-[13rem]`). Em
  largura cheia ela empurra os botões para fora da primeira tela — numa 404 o caminho de volta é
  o conteúdo, não pode ficar abaixo da dobra. Os espaçamentos verticais do mobile também são
  menores que os do resto do site por isso.

**Header**: sticky, sem hamburger. No mobile a navegação vira uma segunda faixa
(`sm:hidden border-t`), e a assinatura usa `height: 4.5rem; margin-top: 1rem` dentro de um
header de `h-16` — transborda de propósito (daí o `overflow-visible`).

**Footer**: o par do header, e escrito como ele — Tailwind com `bg-(--color-surface)`, `max-w-6xl`,
`px-4 sm:px-6` e `min-h-16`, não `<style>` escopado com `var(--color-*)`. **Ele não é uma segunda
navegação**: os links de página ficam só no header, e o rodapé carrega copyright e ícones sociais e
nada mais (decisão registrada em [docs/REDESIGN.md](docs/REDESIGN.md) §17). Sem colunas, sem menu,
sem CTA — o VGen já está ali como ícone social. Se a moldura do header mudar, a do rodapé muda
junto.

O ano do copyright é o caso raro em que o valor do build não serve: as páginas são
`prerender = true`, então em 1º de janeiro o site passa a servir o ano anterior até o próximo
deploy — e diverge da 404, que é SSR e acerta. Por isso a string traduzida é **quebrada no
marcador** (`.split('{year}')`) em vez de interpolada de uma vez: o ano fica num
`<span data-current-year>` que um script de três linhas corrige no cliente. Sem JS, o valor do
build continua no lugar e a frase nunca fica vazia.

`Nav.astro` renderiza o próprio `<nav>` e recebe `ariaLabel` como prop. Antes o Header envolvia
`<Nav />` em outro `<nav>`, criando landmarks aninhados.

### Acessibilidade: nomes de seção

Seções com heading visível usam `aria-labelledby` apontando para o `id` do heading — assim o
nome acessível vem do conteúdo já traduzido, em vez de um `aria-label` hardcoded. `SectionHeading`
aceita `headingId` para isso. Seções sem heading (`PortfolioGallery`) recebem `aria-label` vindo
do módulo de conteúdo. `AboutHero` não tem nome: é um banner decorativo, não um landmark.

Strings de interface (`aria-label` de controles, `sr-only`) vêm sempre de
[ui.ts](src/i18n/ui.ts). **Nunca hardcodar texto voltado ao usuário em componente.**

---

## 7. Dívidas conhecidas

Resolvido na §24 do plano: tokens CSS inexistentes · escopo de `.font-display`/`.grain-overlay` ·
componentes mortos (`Base.astro`, `BlogPost.astro`, `FormattedDate.astro`, `consts.ts`,
`content.config.ts`) · `@astrojs/rss` · fontes Atkinson · CSS `.prose` · SVGs duplicados em
`Services.astro` · `as any` · `aria-current` · i18n dos atributos de acessibilidade · SEO
hardcoded na home · barra dupla no canonical · ausência de typecheck.

Em aberto:

- **Rotas duplicadas por idioma** (§2). Candidato a rota dinâmica.
- **FAQ**: o `max-height` calculado no clique não é recalculado no resize — item aberto corta o
  texto ao girar o dispositivo. O plano (§15) pede uma implementação que não dependa de valores
  fixos.
- **Carrossel**: sem autoplay, por escolha — o plano (§14) pede para não aumentar a
  complexidade. Setas, dots, teclado (`ArrowLeft`/`ArrowRight`), swipe e reduced motion
  funcionam.
- **`@theme` do Tailwind 4** (§5): tokens ainda não geram utilities.
- **`AggregateRating` declarado à mão** (§4).

---

## 8. Links externos e conversão

O site **não tem formulário próprio**. Todo CTA de comissão aponta para
`https://vgen.co/Spantosicus_` com `target="_blank" rel="noopener noreferrer"`.
Redes: Instagram `@spantosicus`, X `@Spantosicus_` — centralizados em `SocialLinks.astro`.

---

## 9. Comandos

```bash
npm install
npm run dev        # astro dev
npm run build      # astro build
npm run preview    # astro preview
npm run typecheck  # astro check — deve ficar em 0/0/0

# QA visual/a11y em 390 / 768 / 1024 / 1440 (docs/REDESIGN.md §26)
npm run dev -- --port 4399
npm run qa:visual  # screenshots em .qa/, sai com código 1 se achar problema

# Custo de renderização das interações contínuas (§28) — precisa de build antes
npm run build
npm run qa:perf    # tracing do Chrome com CPU estrangulada, orçamento 4ms/frame a 4x
```

O `qa:visual` usa o Chrome/Edge do sistema, então não baixa browsers. Ele falha se houver
overflow horizontal, `aria-labelledby` sem destino, erro de JS no console, ou se as posições de
snap do carrossel não casarem com o número de dots visíveis.

A lista de rotas inclui uma que **não existe de propósito** (`NOT_FOUND_ROUTE`), para a 404 passar
pelas mesmas checagens. Só ali o script ignora o `status of 404` que o Chrome loga no console — é o
comportamento esperado do documento; um 404 de imagem ou de script em qualquer outra rota continua
sendo problema.

---

## 10. Licença — restrição relevante

`CC BY-NC-SA 4.0` (Attribution-NonCommercial-ShareAlike). As artes em
[src/assets/](src/assets/) são de autoria exclusiva da artista e **não podem ser reproduzidas ou
redistribuídas** sem autorização. Vale para qualquer coisa derivada delas.
