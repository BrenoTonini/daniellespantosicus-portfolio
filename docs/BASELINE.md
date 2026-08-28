# Baseline — Fase 1 do redesign

Medição feita **antes** de qualquer alteração visual, no commit `5cc62f3`.
Serve como referência para o performance budget da §20 do [plano](REDESIGN.md).

Comando: `npm run build` → medido em `.vercel/output/static`.

---

## Build

`npm run build` conclui sem erros. Server built em ~8.5s (com cache de imagens quente).

`npm run typecheck` (`astro check`, adicionado nesta fase): **0 erros · 0 warnings · 9 hints**
em 39 arquivos.

> Os 0 erros são parcialmente artificiais: os `as any` em `pages/pt-br/index.astro` suprimiam
> exatamente os erros que o typecheck deveria pegar. Corrigido na §24.

Hints relevantes, todos já mapeados como dívida:

- `Services.astro:12` — `icons` declarado e nunca usado (SVGs duplicados)
- `Services.astro:45` / `Testimonials.astro:88` — índice `i` do `.map` nunca usado
- `Base.astro:2` — `LanguagePicker` importado e nunca usado (o bug do `<languagePicker />`)
- 4× `astro(4000)` — os blocos JSON-LD são tratados como `is:inline` (inofensivo, mas poderia
  levar `is:inline` explícito)

---

## Rotas

6 páginas pré-renderizadas + 1 função serverless (apenas para o redirect de `/`):

```
/en/            /en/about/            /en/portfolio/
/pt-br/         /pt-br/about/         /pt-br/portfolio/
```

---

## Payload por página

| Página | HTML | JS inline |
|---|---|---|
| `/en/` | 65.0 KB | 2.77 KB |
| `/pt-br/` | 63.5 KB | 2.77 KB |
| `/en/portfolio/` | 19.2 KB | 0.11 KB |
| `/pt-br/portfolio/` | 19.2 KB | 0.11 KB |
| `/pt-br/about/` | 11.9 KB | 0.11 KB |
| `/en/about/` | 11.7 KB | 0.11 KB |

Valores não comprimidos. JS inline exclui os blocos `application/ld+json`.

## JavaScript

**Zero arquivos `.js` servidos ao cliente.** Todo o JS é inline e cabe em 2.77 KB na página mais
pesada (carrossel de depoimentos + acordeão do FAQ + parallax do About + language picker).

Este é o número mais importante a defender no redesign. A §20 do plano diz "quanto menos, melhor";
a baseline real é **2.77 KB inline, 0 requests**.

## CSS

Um único arquivo: `_astro/PageLayout.*.css` — **40 KB** não comprimido, para todas as páginas.
Inclui o Tailwind gerado + `global.css` (incluindo o bloco `.prose` que nenhuma página usa).

## Fontes

- 2 arquivos WOFF locais pré-carregados em **todas** as páginas: `atkinson-regular.woff`,
  `atkinson-bold.woff` — usados apenas por `.prose`, que não é renderizado em nenhuma página.
  **~2 requests desperdiçados por página.**
- Google Fonts via `<link>` bloqueante: Cormorant Garamond (6 variações) + DM Sans (3 pesos),
  com `preconnect` para `fonts.googleapis.com` e `fonts.gstatic.com`.

## Imagens

`.vercel/output/static` total: **8.6 MB** — dominado pelas 51 variantes WebP geradas pelo Sharp
a partir de 12 obras + assinatura + banner. Todas com `widths` e `sizes` declarados.

`fetchpriority` e `decoding` **não são usados em nenhum lugar** — oportunidade de LCP no Hero
(§20 do plano).

---

## SEO

Sitemap com exatamente 6 URLs, sem a raiz:

```
/en/  /en/about/  /en/portfolio/  /pt-br/  /pt-br/about/  /pt-br/portfolio/
```

JSON-LD: **2 blocos na home** (`FAQPage` + `Product`/`Review`), **0 em about e portfolio**.

`canonical`, `hreflang` (com `x-default` → `en`), Open Graph e Twitter Card presentes em todas as
6 páginas via `BaseHead`.

---

## O que defender no redesign

| Métrica | Baseline | Meta |
|---|---|---|
| Arquivos JS servidos | 0 | 0 |
| JS inline (pior página) | 2.77 KB | não crescer sem justificativa técnica |
| CSS total | 40 KB | ≤ 40 KB (a remoção de `.prose` abre folga) |
| Requests de fonte desperdiçados | 2 | 0 |
| Frameworks de UI | 0 | 0 |
| Erros de typecheck | 0 | 0 |
| URLs no sitemap | 6 | 6 (ou mais, se surgirem páginas) |

---

## Depois da limpeza técnica (§24)

Mesma medição, após a limpeza. Nenhuma alteração visual intencional — mas duas correções
mudam a aparência, porque eram estilos que **silenciosamente não aplicavam** (ver
[CLAUDE.md](../CLAUDE.md) §7).

| Métrica | Antes | Depois |
|---|---|---|
| Arquivos JS servidos | 0 | 0 |
| JS inline (home) | 2.77 KB | 2.77 KB |
| CSS total | 40 KB | **36 KB** |
| HTML home (en) | 65.0 KB | 64.9 KB |
| Requests de fonte desperdiçados | 2 | **0** |
| Typecheck | não existia | **0 erros / 0 warnings / 0 hints** |
| URLs no sitemap | 6 | 6 |
| JSON-LD na home | 2 | 2 |
| Canonical com barra dupla | 6 páginas | **0** |

O CSS caiu 4 KB com a remoção do bloco `.prose`, apesar de duas regras novas terem sido
promovidas para escopo global (`.font-display`, `.grain-overlay`).

### Mudanças visuais esperadas

1. **Cormorant Garamond passou a renderizar.** `.font-display` só existia escopada em
   `PageLayout.astro`, então nunca alcançava os 10 componentes filhos que a usam — todos os
   headings do site renderizavam em DM Sans. A fonte serifada era baixada do Google Fonts e
   descartada.
2. **O grain passou a aparecer.** Mesma causa, em `Hero` e `FinalCTA`.
3. **Texto de corpo escureceu** para `#b8a7a4`: `--color-foreground-muted` não existia, e
   `color` inválido cai para herança — o corpo herdava o branco do `body`.
4. **Divisórias e hairlines escureceram** para `#45332e`: `--color-primary-pale` não existia,
   e `border-color` inválido cai para `currentColor` — as divisórias de Services, Process e
   FAQ estavam sendo desenhadas na cor do texto.

Ou seja: a identidade tipográfica e a textura que o plano manda "evoluir" (§2, §6, §7) só
agora estão de fato visíveis. **Vale revisar o site rodando antes da Fase 2**, porque a
referência visual mudou.

---

## Parallax e carrossel (pré-Fase 2)

Revisão pontual dos dois componentes interativos, antes do design system.

| Métrica | Pós-§24 | Agora |
|---|---|---|
| HTML home (en) | 64.9 KB | **62.1 KB** |
| JS inline (home) | 2.77 KB | **2.46 KB** |
| Arquivos JS servidos | 0 | 0 |
| CSS total | 36 KB | 36 KB |
| Cards no DOM do carrossel | 12 (6 + 6 clones) | **6** |
| Listeners de scroll na main thread | 2 | **1** (0 onde há scroll-driven animations) |

O ganho de runtime é maior que o de bytes: o parallax deixou de existir como
JavaScript nos navegadores com `animation-timeline`, e o carrossel deixou de medir
e escrever largura em 12 elementos na hidratação.

### Orçamento a defender daqui pra frente

| Métrica | Alvo |
|---|---|
| Arquivos JS servidos | 0 |
| JS inline (pior página) | ≤ 2.5 KB |
| CSS total | ≤ 40 KB |
| Overflow horizontal em 390/768/1024/1440 | 0 |
| `aria-labelledby` sem destino | 0 |
| Erros de typecheck | 0 |

`npm run qa:visual` verifica as três últimas linhas automaticamente.

---

## Hero: trama de ícones revelada pelo ponteiro

Primeira interação de identidade do Hero (adiantando parte da Fase 3).

| Métrica | Antes | Agora |
|---|---|---|
| HTML home (en) | 62.1 KB | 63.0 KB |
| CSS da home | 36 KB | 38.3 KB |
| CSS das outras 4 páginas | 36 KB | **32.9 KB** |
| JS inline (home) | 2.46 KB | 3.1 KB |
| Arquivos JS servidos | 0 | 0 |
| Imagens do hero baixadas no desktop | 2 (480w + 960w) | **1** (480w) |

A home paga ~1 KB de HTML, 2.3 KB de CSS e 0.6 KB de JS. Em troca, o desktop
deixa de baixar ~85 KB de arte que nunca aparece, e as outras quatro páginas
ficaram 3 KB de CSS mais leves (o CSS específico da home saiu do bundle
compartilhado).

Frame timing durante movimento contínuo do ponteiro, medido em 45 amostras:
**mediana 5.6 ms, p95 6.0 ms, pior 6.1 ms** — folga confortável nos 16.7 ms.

### Decisões

- **A trama é máscara, não imagem colorida.** A cor sai de `--color-primary`, então
  ela acompanha a paleta e não há hex duplicado em TypeScript.
- **Duas máscaras aninhadas** em vez de `mask-composite: intersect`, que só chegou
  no Chrome 120: a de fora é o holofote que segue o ponteiro, a de dentro recorta
  os ícones.
- **A trama é gerada de `serviceIcons`** em `home.ts`. Quando os ícones definitivos
  da artista chegarem, a textura do site passa a ser o traço dela sem tocar no
  mecanismo.
- **Jitter determinístico** (±10°, ±1.5 px por célula) para o ladrilho não se ler
  como grade. Determinístico porque o mesmo build tem que gerar o mesmo SVG.
- **Só a partir de 1024 px com `hover: hover` e `pointer: fine`.** O efeito depende
  de um cursor; deixá-lo ligado sem cursor sujava a arte no mobile, então lá ele
  não existe.
- **A arte nunca recebe textura em cima.** Sobre a ilustração a trama fica atrás
  dela, e o retorno visual vem da moldura deslocada, que só usa `transform`.
- **Nada de `blur` no Hero.** Os dois blobs de 55vw e 30vw com `blur-3xl`/`blur-2xl`
  viraram dois `radial-gradient` estáticos — mesmo brilho, sem filtro.
- **A arte de fundo do mobile virou background CSS.** Um `<img>` dentro de
  `display:none` é baixado de qualquer forma; um background, não.

### Em aberto

No mobile o `<img>` da placa desktop (480w, ~35 KB) ainda é baixado sem aparecer —
o inverso do problema já corrigido. A solução é unificar as duas versões da arte num
único `<img>` reposicionado por CSS, o que faz parte da recomposição do Hero na
Fase 3.

---

## Revisão do hover do hero (custo de renderização)

A primeira versão do efeito engasgava com throttle de CPU. Reimplementada.

### O que estava errado

A trama era uma camada do tamanho da seção com
`mask-image: radial-gradient(... at var(--px) var(--py))`, e o centro da máscara
mudava a cada frame. Além disso o handler de `pointermove` chamava
`getBoundingClientRect()` a cada evento — e `pointermove` dispara na taxa de
polling do mouse (125–1000 Hz), não a 60 Hz.

### O que era o gargalo (e não era o que eu supus)

Supus paint. O tracing mostrou **recálculo de estilo** como custo dominante:
mudar uma propriedade customizada recompõe o estilo do elemento e de todo
descendente que a herda, e aqui isso alimentava um `mask-image` que precisava
ser re-resolvido.

Custo por frame com throttle de 4x:

| | estilo | paint+raster | total |
|---|---|---|---|
| máscara móvel + `gBCR` por evento | 7.17 ms | 0.89 ms | **8.06 ms** |
| lente de duas transformações, via `var()` | 2.45 ms | 0.68 ms | 3.13 ms |
| lente + `transform` inline (atual) | **1.65 ms** | **0.51 ms** | **2.16 ms** |

### A solução: lente de duas transformações

```
.hero-lens        janela de 2R, máscara ESTÁTICA centrada nela mesma,
                  translate3d até o ponteiro
  .hero-*-tile    contra-translate3d pelo resto da divisão da posição
                  pelo tamanho do ladrilho
```

Como a trama é um ladrilho perfeito, deslocá-la por múltiplos exatos dele é
invisível: o padrão parece cravado na seção enquanto só a janela anda. Nenhuma
máscara muda durante o movimento.

Três detalhes que valeram mais que a arquitetura:

- **`transform` inline em vez de custom property** — cortou o estilo pela metade
  (2.45 → 1.65 ms). Propriedade customizada não tem caminho rápido de compositor.
- **`getBoundingClientRect` uma vez por frame, nunca no handler.** O handler só
  guarda `clientX/clientY`; o rect é lido dentro do rAF e invalidado em
  `scroll`/`resize`.
- **`will-change: transform`** nas duas camadas, que só existem acima de 1024 px.

### A lição de medição

Minhas duas primeiras medições foram inúteis, por motivos diferentes:

1. A primeira rodou **sem throttle** — a CPU da máquina escondia o problema.
2. A segunda contava **deltas de `requestAnimationFrame`**. Num browser sob CDP o
   rAF não está travado no vsync, então a mediana mede "quanto a main thread leva
   por ciclo", não "o quadro saiu a tempo". Ela chegou a mostrar a versão nova como
   *pior*, porque conta o script e ignora estilo e raster.

O instrumento certo é o tracing do próprio Chrome, somando `UpdateLayoutTree`,
`Layout`, `Paint` e `RasterTask` por frame. É o que `npm run qa:perf` faz, com
orçamento de 4 ms/frame a 4x — para esta classe de erro não passar de novo.
