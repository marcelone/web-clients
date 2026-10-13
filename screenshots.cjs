/* eslint-disable */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const out = path.join('C:', 'Users', 'Marcel', 'AppData', 'Local', 'Temp', 'boda-shots');
  fs.mkdirSync(out, { recursive: true });

  const browser = await chromium.launch();

  // Desktop
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await desktop.newPage();
  const url = 'http://127.0.0.1:4321/';
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  const sections = [
    { id: 'top', name: 'hero' },
    { id: 'fecha', name: 'date' },
    { id: 'dresscode', name: 'dresscode' },
    { id: 'ubicacion', name: 'location' },
    { id: 'alojamiento', name: 'accommodation' },
    { id: 'contacto', name: 'contact' },
  ];

  for (const s of sections) {
    const el = await page.$(`#${s.id}`);
    if (!el) continue;
    await page.evaluate((id) => {
      const target = document.getElementById(id);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: Math.max(0, top - 90), behavior: 'instant' });
    }, s.id);
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(out, `desktop-${s.name}.png`) });
  }

  // Footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(out, 'desktop-footer.png'), fullPage: false });

  // Full page (compressed) for review
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(out, 'desktop-full.png'), fullPage: true });

  await desktop.close();

  // Mobile
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const mPage = await mobile.newPage();
  await mPage.goto(url, { waitUntil: 'networkidle' });
  await mPage.waitForTimeout(800);
  for (const s of sections) {
    const el = await mPage.$(`#${s.id}`);
    if (!el) continue;
    await mPage.evaluate((id) => {
      const target = document.getElementById(id);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: Math.max(0, top - 90), behavior: 'instant' });
    }, s.id);
    await mPage.waitForTimeout(600);
    await mPage.screenshot({ path: path.join(out, `mobile-${s.name}.png`) });
  }
  await mPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await mPage.waitForTimeout(500);
  await mPage.screenshot({ path: path.join(out, 'mobile-footer.png'), fullPage: false });
  await mPage.evaluate(() => window.scrollTo(0, 0));
  await mPage.waitForTimeout(400);
  await mPage.screenshot({ path: path.join(out, 'mobile-full.png'), fullPage: true });
  await mobile.close();

  await browser.close();
  console.log('OK — screenshots in', out);
})();
