import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("the hero uses the optimized fw7 portrait", async () => {
  const page = await read("app/[lang]/page.tsx");

  assert.match(page, /src="\/fotos\/fw7\.jpg"/);
  assert.doesNotMatch(page, /src="\/fotos\/retrato\.jpg"/);

  const portrait = await stat(new URL("../public/fotos/fw7.jpg", import.meta.url));
  assert.ok(portrait.size < 1_000_000, "the hero portrait should stay below 1 MB");
});

test("social cards use a dedicated 1200 by 630 brand image", async () => {
  const layout = await read("app/[lang]/layout.tsx");
  const socialImage = await read("app/[lang]/opengraph-image.tsx");

  assert.match(layout, /summary_large_image/);
  assert.doesNotMatch(layout, /images:\s*\["\/fotos\//);
  assert.match(socialImage, /width:\s*1200/);
  assert.match(socialImage, /height:\s*630/);
  assert.match(socialImage, />ml</);
  assert.match(socialImage, />_<\/span>/);
});
