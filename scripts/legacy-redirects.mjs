// mdBook published pages as `interesting/food.html`; the site now uses
// `interesting/food/`. Leave a small redirect at each old address so existing
// links keep working. (mdBook's `photo/index.html` style needs nothing: it still exists.)
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';

const pages = readdirSync('content/docs', { recursive: true })
  .map(String)
  .filter((file) => file.endsWith('.md') && basename(file) !== 'index.md');

for (const file of pages) {
  const slug = file.replace(/\.md$/, '');
  const target = `./${basename(slug)}/`;
  const output = join('out', `${slug}.html`);

  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(
    output,
    `<!doctype html>
<meta charset="utf-8">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${target}">
<script>location.replace(${JSON.stringify(target)} + location.hash)</script>
<a href="${target}">${target}</a>
`,
  );
}

console.log(`Wrote ${pages.length} legacy redirects`);
