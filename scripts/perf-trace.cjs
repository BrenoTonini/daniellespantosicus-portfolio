/**
 * Custo de renderização das interações contínuas (docs/REDESIGN.md §28).
 *
 *   npm run build
 *   npm run qa:perf
 *
 * Lê o tracing do Chrome e soma as durações reais de estilo, layout, paint e
 * raster por frame, com a CPU estrangulada. Contar deltas de
 * `requestAnimationFrame` no lugar disso NÃO funciona: sob CDP o rAF não está
 * travado no vsync, então a mediana mede o ciclo da main thread e ignora
 * estilo e raster — que é justamente onde este efeito custa.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.resolve('.vercel/output/static');
const PORT = 4401;
const THROTTLE = [1, 4, 6];

// Por frame a 4x, em ms. O quadro inteiro a 60 Hz é 16.7; 4 deixa margem para
// o resto da página.
const BUDGET_4X = 4;

const STYLE = ['UpdateLayoutTree', 'Layout'];
const PAINT = ['Paint', 'PaintImage', 'RasterTask'];

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png',
  '.ico': 'image/x-icon', '.xml': 'application/xml', '.webm': 'video/webm',
};

function serve() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let file = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
      try {
        if (fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
      } catch {
        if (fs.existsSync(`${file}.html`)) file = `${file}.html`;
      }
      if (!fs.existsSync(file)) {
        res.writeHead(404);
        return res.end('404');
      }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(PORT, () => resolve(server));
  });
}

/** Move o ponteiro em círculo sobre o hero e devolve o custo por frame. */
async function measure(page, client, rate) {
  await client.send('Emulation.setCPUThrottlingRate', { rate });
  await page.goto(`http://localhost:${PORT}/en/`, { waitUntil: 'load' });
  await page.waitForTimeout(500);

  const events = [];
  const collect = (d) => events.push(...d.value);
  client.on('Tracing.dataCollected', collect);
  await client.send('Tracing.start', {
    categories: 'disabled-by-default-devtools.timeline,blink,cc',
    transferMode: 'ReportEvents',
  });

  const frames = await page.evaluate(async () => {
    const hero = document.querySelector('[data-hero]');
    if (!hero) return 0;
    const box = hero.getBoundingClientRect();
    hero.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true }));
    await new Promise((r) => setTimeout(r, 450));

    let n = 0;
    await new Promise((done) => {
      const step = () => {
        const t = (n / 70) * Math.PI * 2;
        // Mouses reais fazem polling acima de 60 Hz, e um handler que trabalha
        // por evento em vez de por frame só aparece quando o teste imita isso.
        for (let k = 0; k < 3; k++) {
          const tt = t + k * 0.004;
          hero.dispatchEvent(
            new PointerEvent('pointermove', {
              bubbles: true,
              clientX: box.left + box.width * (0.5 + 0.42 * Math.cos(tt)),
              clientY: box.top + box.height * (0.5 + 0.34 * Math.sin(tt)),
            }),
          );
        }
        if (++n < 75) requestAnimationFrame(step);
        else done();
      };
      requestAnimationFrame(step);
    });
    return n;
  });

  const complete = new Promise((r) => client.once('Tracing.tracingComplete', r));
  await client.send('Tracing.end');
  await complete;
  client.off('Tracing.dataCollected', collect);
  await client.send('Emulation.setCPUThrottlingRate', { rate: 1 });

  const sum = (names) =>
    events
      .filter((e) => e.ph === 'X' && typeof e.dur === 'number' && names.includes(e.name))
      .reduce((a, e) => a + e.dur, 0) / 1000;

  const style = sum(STYLE);
  const paint = sum(PAINT);
  return { frames, style, paint, total: style + paint };
}

(async () => {
  if (!fs.existsSync(ROOT)) {
    console.error(`${ROOT} não existe — rode \`npm run build\` primeiro.`);
    process.exit(1);
  }

  const server = await serve();
  const browser = await chromium.launch({ channel: 'chrome' }).catch(() => chromium.launch());
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const client = await ctx.newCDPSession(page);

  console.log('hero — trama revelada pelo ponteiro, custo por frame\n');
  console.log('throttle |  estilo  |  paint   |  total');

  let over = null;
  for (const rate of THROTTLE) {
    const r = await measure(page, client, rate);
    const per = (v) => (v / r.frames).toFixed(2).padStart(6);
    console.log(`   ${rate}x    | ${per(r.style)}ms | ${per(r.paint)}ms | ${per(r.total)}ms`);
    if (rate === 4) over = r.total / r.frames;
  }

  await browser.close();
  server.close();

  if (over !== null && over > BUDGET_4X) {
    console.log(`\nacima do orçamento: ${over.toFixed(2)}ms/frame a 4x (limite ${BUDGET_4X}ms)`);
    process.exit(1);
  }
  console.log(`\ndentro do orçamento (limite ${BUDGET_4X}ms/frame a 4x)`);
})();
