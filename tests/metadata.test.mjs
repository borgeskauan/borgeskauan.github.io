import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const indexHtml = await readFile(new URL('../src/index.html', import.meta.url), 'utf8');
const siteUrl = 'https://borgeskauan.github.io/';
const imageUrl = `${siteUrl}assets/portrait/kauan-borges.jpg`;

test('production metadata allows indexing', () => {
  assert.doesNotMatch(indexHtml, /noindex|nofollow/i);
  assert.match(indexHtml, new RegExp(`<link rel="canonical" href="${siteUrl}">`));
});

test('production metadata supplies a complete social preview', () => {
  for (const metadata of [
    '<meta property="og:type" content="website">',
    '<meta property="og:title" content="Kauan Borges — Software developer">',
    '<meta property="og:description" content="Software engineering by Kauan Borges. Explore the decisions, tradeoffs and measured results behind the work.">',
    `<meta property="og:url" content="${siteUrl}">`,
    `<meta property="og:image" content="${imageUrl}">`,
    '<meta name="twitter:card" content="summary">',
    '<meta name="twitter:title" content="Kauan Borges — Software developer">',
    '<meta name="twitter:description" content="Software engineering by Kauan Borges. Explore the decisions, tradeoffs and measured results behind the work.">',
    `<meta name="twitter:image" content="${imageUrl}">`,
  ]) {
    assert.ok(indexHtml.includes(metadata), `Missing metadata: ${metadata}`);
  }
});
