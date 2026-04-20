/*
 * Print the playbook to playbook.pdf using Playwright's headless Chromium.
 *
 * Reads:   index.html (the pretty source, which references styles.css + script.js)
 * Writes:  playbook.pdf
 *
 * Usage:
 *   node tools/make-pdf.js
 *
 * Requires: `npm install playwright` and `npx playwright install chromium`.
 *
 * Notes
 * -----
 * - We render the root `index.html` (not dist/) because the print CSS lives
 *   in the external stylesheet and Playwright loads it via file:// just fine.
 * - Page margins, page breaks, and cover-page behavior are handled entirely
 *   by the `@media print` block in styles.css — don't override them here.
 */

const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const fileUrl = 'file://' + path.resolve(__dirname, '..', 'index.html');
  const outPath = path.resolve(__dirname, '..', 'playbook.pdf');

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  // Give webfonts a beat to load so the print output uses Cormorant, Fraunces,
  // and Inter rather than the fallback system serif/sans.
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(500);

  await page.pdf({
    path: outPath,
    format: 'Letter',
    printBackground: true,
    preferCSSPageSize: true,
  });

  await browser.close();
  console.log('wrote', outPath);
})();
