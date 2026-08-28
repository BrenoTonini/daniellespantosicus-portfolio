# Plano de Redesign — Portfólio Danielle Spantosicus

> Documento guia do redesign. O levantamento do estado anterior está em [CLAUDE.md](../CLAUDE.md).
> A baseline técnica medida antes de qualquer alteração visual está em [BASELINE.md](BASELINE.md).

---

## 1. Objetivo

Redesenhar o portfólio para que o site tenha uma identidade visual **autoral, editorial e
memorável**, evitando aparência de template ou "site de portfólio genérico".

O redesign deve explorar: composição editorial, uso expressivo das obras, tipografia, texturas,
camadas, assimetria controlada, microinterações, transições, movimento baseado em scroll,
tratamento diferenciado das imagens e elementos gráficos próprios.

Preservar como **requisitos técnicos**: performance, responsividade real, acessibilidade, SEO,
i18n EN/PT-BR, HTML semântico, JavaScript mínimo, arquitetura Astro, conteúdo existente e
otimização automática das imagens.

A stack (Astro 6 zero-JS, Tailwind 4, `astro:assets` + Sharp, Vercel) **não deve ser substituída**.

---

## 2. Direção artística

### Conceito

> Um catálogo/editorial digital de uma artista — não uma landing page de freelancer.

A interface deve parecer construída **ao redor das obras**, e não usar as obras dentro de
componentes pré-fabricados.

A estética atual já segue direção editorial/galeria (Cormorant Garamond + DM Sans, paleta escura
quente, espaço negativo, grain, masonry). O redesign **evolui** essa identidade, não a descarta.

**Manter:** fundo escuro · tons terrosos/quentes · serifada para destaque · sans-serif para
leitura · espaço negativo · imagens protagonistas · ausência de excesso de bordas arredondadas.

**Evoluir:** hierarquia tipográfica · composição das seções · tratamento das imagens · textura ·
movimento · transições · interação · relação texto/imagem · composição desktop/mobile.

---

## 3. Princípio fundamental

**Não adicionar efeitos apenas porque são visualmente interessantes.**

Cada efeito precisa cumprir ao menos uma função: reforçar a identidade da artista, direcionar
atenção, melhorar compreensão, criar profundidade, melhorar a apresentação da obra, ou criar
continuidade entre seções.

**Evitar:** glassmorphism genérico · excesso de blur · gradientes aleatórios · partículas
decorativas sem propósito · excesso de glow · cards SaaS · excesso de border-radius · animações
em todos os elementos · 3D só para "parecer moderno".

---

## 4. Estratégia de tecnologia

Manter Astro. Não introduzir React/Vue/Svelte para o redesign.

Ordem de prioridade para resolver qualquer interação:

```
CSS
  ↓
CSS + Web APIs
  ↓
Vanilla JS
  ↓
biblioteca externa
```

Não adicionar dependências de animação sem justificativa técnica.

---

## 5. Sistema de motion

Linguagem de movimento consistente em três níveis.

**Nível 1 — Microinterações (CSS):** hover, focus, underline, opacity, transform, scale, pequenas
mudanças de cor, máscaras.

```
obra
  ↓ hover
imagem desloca levemente + título aparece + elemento gráfico acompanha
```

**Nível 2 — Motion de composição (JS mínimo):** entrada das seções, reveal de imagens, stagger,
transições entre estados, parallax discreto.

**Nível 3 — Interações especiais:** reservado para Hero, galeria, transições importantes e
navegação especial. Não usar indiscriminadamente.

---

## 6. Texturas

O grain atual (`feTurbulence`) deve virar parte do sistema visual, em camadas:

```
background + grain + textura secundária + gradiente/luz + conteúdo
```

Priorizar SVG procedural, CSS gradients, pseudo-elements, masks, blend modes e pequenos assets
WebP. Evitar texturas rasterizadas grandes quando CSS/SVG resolvem.

Textura é **linguagem visual**, não decoração constante.

---

## 7. Tipografia

Manter Cormorant Garamond + DM Sans inicialmente, mas aumentar a participação da tipografia na
composição: títulos muito grandes, contraste extremo serifada/sans, títulos parcialmente fora do
grid, números, labels editoriais, sobreposição controlada, texto vertical quando fizer sentido,
quebras de linha intencionais.

A tipografia deve funcionar como **elemento gráfico** — não títulos enormes por tendência.

---

## 8. Grid e composição

Abandonar `container + 3 cards + 3 cards + section` como estrutura padrão.

Criar sistema que permita: assimetria, imagens fora do eixo, sobreposição, diferentes proporções,
áreas de respiro, elementos que atravessem o grid, alinhamentos verticais, blocos de texto
deslocados.

Assimetria **controlada** — sem sacrificar legibilidade ou navegação.

---

## 9. Hero

Uma das áreas mais trabalhadas. Deve comunicar imediatamente quem é a artista e estabelecer a
linguagem visual do site.

**Evitar:** título → subtítulo → botão → imagem.

**Explorar:** artwork em grande escala, tipografia sobreposta, assinatura, elementos editoriais,
número/data/categoria, recortes, movimento sutil, textura.

O CTA de comissão continua apontando para VGen (fluxo de conversão atual).

---

## 10. Featured Works

Cada obra deve parecer peça de galeria. Interações possíveis: transformação da obra, metadados
aparecendo, tipografia mudando de posição, elemento gráfico acompanhando o cursor.

**No mobile: não depender de hover.** A informação deve estar disponível naturalmente ou por toque.

---

## 11. Services

Evitar cards tradicionais. Composição mais editorial:

```
01   Illustration                descrição
02   Character Design            descrição
03   ...
```

A interação pode fazer a imagem correspondente aparecer/mudar conforme o item ativo — interface
rica sem muito JavaScript.

Manter o modelo de conteúdo (`home.ts`) separado da apresentação.

---

## 12. Process

Narrativa visual, não cards.

```
01 ───────────── Sketch
02 ───────────── Refinement
03 ───────────── Final Art
```

Usar linhas, números, imagens, transições, mudanças de escala, movimento durante scroll.

---

## 13. About

Deve funcionar como **mudança de ritmo**: depois de várias obras, uma área muito mais tipográfica.

Explorar texto grande, arte parcialmente cortada, assinatura, elementos editoriais, composição
assimétrica. O objetivo é criar pausas visuais.

---

## 14. Testimonials

O carousel atual é a parte mais complexa do site (clonagem de cards, cálculo de largura, touch,
responsivo). **Não aumentar essa complexidade sem necessidade.**

Avaliar substituí-lo por apresentação editorial mais simples. Se mantido, exige: suporte completo
a teclado, foco visível, `aria-label` correto, `prefers-reduced-motion`, comportamento correto em
resize, touch e ausência de layout shift.

> **Feito (pré-Fase 2).** Reimplementado sobre `scroll-snap` nativo: sem clones, sem medição de
> largura em JS, sem layout shift. Teclado, foco visível, reduced motion e loop nas setas
> cobertos. A decisão de trocá-lo por uma apresentação editorial continua aberta para a Fase 4 —
> o que existe hoje é uma base correta, não uma escolha final de design.

---

## 15. FAQ

Manter semanticamente simples. Corrigir o `max-height` que não é recalculado após resize/
orientação — priorizar implementação que não dependa de valores fixos.

Garantir teclado, foco, `aria-expanded`, `aria-controls` e reduced motion.

---

## 16. Portfolio

A página mais visual do projeto. Manter galeria sem container rígido (full-width + masonry).

Explorar diferentes escalas e proporções, espaços negativos, títulos entre obras, agrupamentos,
números. Filtros **somente** se houver necessidade real.

Evitar transformar o portfólio numa grade uniforme de thumbnails.

---

## 17. Header

Reavaliar completamente a composição. Objetivo: **navegação discreta que não compete com a arte.**

Possibilidades: header minimalista, assinatura, menu tipográfico, indicador de página, navegação
que muda durante scroll.

No mobile, criar composição específica — não empilhar o desktop.

---

## 18. Cursor

Cursor customizado só com justificativa visual. Se implementado: desktop only, não substituir
completamente o cursor nativo sem necessidade, não afetar acessibilidade, sem lógica pesada,
desativar em touch, respeitar reduced motion.

---

## 19. Mobile como composição própria

Não apenas `media query → empilhar tudo`. Para cada seção, definir **composição tablet** e
**composição mobile**.

Elementos que atravessam o grid no desktop podem voltar ao fluxo normal no mobile. Interações de
hover precisam de equivalente para touch.

---

## 20. Performance budget

**JavaScript:** quanto menos, melhor. Não instalar biblioteca para o que o CSS resolve.

**Imagens:** continuar com `astro:assets` + Sharp + WebP. Verificar `width`/`height`, `loading`,
`fetchpriority`, `decoding`, responsive images, lazy loading.

**Fontes:** remover as não utilizadas (Atkinson é pré-carregada mas só serve `.prose`, que não
aparece em nenhuma página).

**Animações:** priorizar propriedades de compositor (`opacity`, `transform`). Evitar animações
contínuas desnecessárias.

---

## 21. SEO

**Preservar:** canonical, hreflang, x-default, Open Graph, Twitter Card, sitemap, robots, JSON-LD.

**Corrigir durante o redesign:** SEO hardcoded da Home, `aria-label` em português na versão
inglesa, `aria-current`, dados estruturados inconsistentes.

Não criar texto visualmente escondido apenas para SEO. O conteúdo precisa continuar
semanticamente legítimo.

---

## 22. Internacionalização

Manter o comportamento atual: `/en/` e `/pt-br/` como URLs públicas, raiz redirecionando por
`Accept-Language`.

Durante o redesign: toda string nova nos dois idiomas, `aria-label` traduzido, textos de
interação traduzidos, metadata correta, **nenhuma string hardcoded nos componentes**.

---

## 23. Conteúdo e componentes

Não misturar conteúdo com apresentação. `src/i18n/` permanece a fonte dos dados editoriais, e os
componentes recebem conteúdo por props tipadas.

Corrigir os `as any` das oito seções da Home em pt-br. **O redesign não deve usar `as any`** para
contornar tipagem.

---

## 24. Limpeza técnica pré-redesign

Antes de alterar o visual:

- [x] instalar `@astrojs/check`
- [x] corrigir tokens CSS inexistentes
- [x] remover componentes mortos
- [x] remover `@astrojs/rss`
- [x] remover content collection `blog`
- [x] remover fontes Atkinson
- [x] remover CSS `.prose`
- [x] remover `consts.ts` placeholder
- [x] eliminar SVGs duplicados
- [x] corrigir `as any`
- [x] corrigir i18n dos atributos de acessibilidade

---

## 25. Estrutura de desenvolvimento

| Fase | Escopo | Status |
|---|---|---|
| **1 — Baseline** | build, typecheck, páginas EN/PT-BR, SEO, sitemap, imagens, links, a11y básica, baseline de performance | ✅ concluída — ver [BASELINE.md](BASELINE.md) |
| **2 — Design System** | cores, tipografia, spacing, grid, texturas, borders, sombras, motion, breakpoints, estados | ⬜ |
| **3 — Hero + Header** | Header, Hero, sistema de textura, sistema de motion — estabelecem a linguagem do site | ⬜ |
| **4 — Home** | Featured Works, Services, Process, About, Testimonials, FAQ, CTA | ⬜ |
| **5 — Portfolio** | experiência de galeria (imagens, composição, navegação, performance) | ⬜ |
| **6 — About** | composição editorial específica | ⬜ |
| **7 — Responsive** | testar cada seção em 390 / 768 / 1024 / 1440+ | ⬜ |

Não começar implementando seções aleatoriamente. Cada seção reutiliza o design system, mas não
necessariamente o mesmo layout.

"Responsivo" não é apenas ausência de overflow horizontal.

---

## 26. QA visual

Playwright para verificar screenshots, navegação, links, menu, language picker, carousel, FAQ,
hover, focus, mobile, tablet, desktop — visualmente em **cada breakpoint**.

## 27. QA de acessibilidade

HTML semântico, heading hierarchy, landmarks, keyboard navigation, focus, contrast, `aria-*`,
alt text, reduced motion, touch targets. Especialmente os problemas conhecidos de i18n dos
`aria-label` e do `aria-current`.

## 28. QA de performance

Tamanho total da página, JS executado, imagens carregadas, fontes, layout shift, animações,
repaint, requests, cache.

Nenhuma animação é aceita simplesmente porque "parece legal".

---

## 29. Critérios de aceitação

**Visual** — não parecer template genérico · identidade consistente entre páginas · obras
protagonistas · texturas como linguagem visual · interações significativas mas não excessivas ·
tipografia participando da composição.

**UX** — navegação intuitiva · tudo funciona em touch · tudo funciona via teclado · reduced
motion funciona · mobile com composição própria.

**Performance** — sem framework de UI desnecessário · JS mínimo · imagens otimizadas · fontes não
usadas removidas · animações priorizando compositor · sem layout shift evitável.

**SEO** — metadata, canonical, hreflang, sitemap, robots e JSON-LD corretos · HTML semântico ·
headings corretos.

**Código** — nenhum `as any` introduzido · nenhum conteúdo hardcoded em componente · EN/PT-BR
completos · sem componentes mortos · sem dependências desnecessárias · build sem erros.

---

## 30. Regra geral

```
IDENTIDADE → COMPOSIÇÃO → USABILIDADE → ACESSIBILIDADE → PERFORMANCE → SEO
```

E não: *"qual biblioteca posso instalar para deixar isso bonito?"*

A oportunidade principal é transformar a linguagem editorial existente em um sistema visual e
interativo mais sofisticado, sem abandonar a filosofia do Astro: HTML rápido, JavaScript apenas
onde agrega valor.
