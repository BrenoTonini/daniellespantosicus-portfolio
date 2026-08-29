/**
 * QA visual e de interação (docs/REDESIGN.md §26 e §27).
 *
 *   npm run dev -- --port 4399
 *   npm run qa:visual
 *
 * Usa o Chrome/Edge instalado no sistema (`channel`), então não baixa browsers.
 * Screenshots vão para `.qa/`, que está no .gitignore.
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = process.env.QA_BASE_URL ?? 'http://localhost:4399';
const OUT = path.resolve('.qa');

const VIEWPORTS = [
  { name: '390-mobile', width: 390, height: 844 },
  { name: '768-tablet', width: 768, height: 1024 },
  { name: '1024-laptop', width: 1024, height: 768 },
  { name: '1440-desktop', width: 1440, height: 900 },
];

/** Rota que não existe de propósito, para a página 404 passar pelas mesmas
  * checagens das outras. */
const NOT_FOUND_ROUTE = '/en/rota-inexistente/';

const PAGES = ['/en/', '/en/about/', '/en/portfolio/', '/pt-br/', '/es/', NOT_FOUND_ROUTE];

async function launch() {
  for (const channel of ['chrome', 'msedge', null]) {
    try {
      return await chromium.launch(channel ? { channel } : {});
    } catch {
      /* tenta o próximo */
    }
  }
  throw new Error('Nenhum browser disponível. Rode `npx playwright install chromium`.');
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await launch();
  let failures = 0;

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();
    const errors = [];
    // O documento da 404 responde 404, e o Chrome loga isso como erro de
    // console. É o comportamento esperado ali — e só ali: um 404 de imagem ou
    // de script em qualquer outra rota continua sendo problema.
    let route = '';
    const expected = (text) =>
      route === NOT_FOUND_ROUTE && /status of 404/.test(text);

    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => {
      if (m.type() === 'error' && !expected(m.text())) errors.push(m.text());
    });

    console.log(`\n=== ${vp.name} ===`);

    for (route of PAGES) {
      await page.goto(BASE + route, { waitUntil: 'networkidle' });

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      if (overflow > 0) {
        console.log(`  ${route} OVERFLOW HORIZONTAL: ${overflow}px`);
        failures++;
      }

      // Todo aria-labelledby precisa apontar para um id existente.
      const dangling = await page.evaluate(() =>
        [...document.querySelectorAll('[aria-labelledby]')]
          .map((el) => el.getAttribute('aria-labelledby'))
          .filter((id) => id && !document.getElementById(id)),
      );
      if (dangling.length) {
        console.log(`  ${route} aria-labelledby sem destino: ${dangling.join(', ')}`);
        failures++;
      }

      const slug = route.replace(/\//g, '_') || '_root';
      await page.screenshot({ path: `${OUT}/${vp.name}${slug}.png`, fullPage: true });
    }

    // Carrossel: as posições de snap têm que casar com o fim do scroll, senão o
    // último card fica inalcançável.
    route = '/en/';
    await page.goto(BASE + '/en/', { waitUntil: 'networkidle' });
    const carousel = await page.evaluate(() => {
      const track = document.querySelector('[data-carousel-track]');
      if (!track) return null;
      const cards = [...track.querySelectorAll('[data-carousel-card]')];
      const step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 0;
      const maxScroll = track.scrollWidth - track.clientWidth;
      return {
        step: Math.round(step),
        maxScroll: Math.round(maxScroll),
        positions: step ? Math.round(maxScroll / step) + 1 : 0,
        aligned: step ? Math.abs(maxScroll % step) <= 2 || Math.abs((maxScroll % step) - step) <= 2 : false,
        dotsVisible: [...document.querySelectorAll('[data-carousel-dot]')].filter(
          (d) => getComputedStyle(d).display !== 'none',
        ).length,
      };
    });
    if (carousel) {
      const ok = carousel.aligned && carousel.positions === carousel.dotsVisible;
      console.log(`  carrossel: ${JSON.stringify(carousel)} ${ok ? 'ok' : '<-- PROBLEMA'}`);
      if (!ok) failures++;
    }

    if (errors.length) {
      console.log('  ERROS DE JS:', errors);
      failures++;
    }

    await ctx.close();
  }

  await browser.close();
  console.log(`\nscreenshots em ${OUT}`);
  console.log(failures ? `${failures} problema(s) encontrado(s)` : 'nenhum problema encontrado');
  process.exit(failures ? 1 : 0);
})();
