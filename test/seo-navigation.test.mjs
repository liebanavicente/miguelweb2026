import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("sitemap.ts is configured for all locales and alternates", async () => {
  const sitemap = await read("app/sitemap.ts");
  assert.match(sitemap, /baseUrl\s*=\s*"https:\/\/www\.miguelliebana\.com"/);
  assert.match(sitemap, /LOCALES\.map/);
  assert.match(sitemap, /alternates:\s*\{\s*languages:/);
});

test("robots.ts allows root and references sitemap.xml", async () => {
  const robots = await read("app/robots.ts");
  assert.match(robots, /userAgent:\s*"\*"/);
  assert.match(robots, /allow:\s*"\/"/);
  assert.match(robots, /https:\/\/www\.miguelliebana\.com\/sitemap\.xml/);
});

test("Header includes all 8 sections including competencias", async () => {
  const header = await read("components/Header.tsx");
  assert.match(header, /"competencias"/);
  assert.match(header, /className="btn btn-ink mobile-cta"/);
});

test("all language dictionaries have navigation labels for competencias", async () => {
  const es = await read("lib/dictionaries/es.ts");
  const ca = await read("lib/dictionaries/ca.ts");
  const en = await read("lib/dictionaries/en.ts");
  const de = await read("lib/dictionaries/de.ts");

  assert.match(es, /competencias:\s*"Competencias"/);
  assert.match(ca, /competencias:\s*"Competències"/);
  assert.match(en, /competencias:\s*"Skills"/);
  assert.match(de, /competencias:\s*"Kompetenzen"/);
});
