import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { PROJECTS } from "../lib/cv.ts";

test("every project has a status and visual source", () => {
  assert.equal(PROJECTS.length, 6);

  for (const project of PROJECTS) {
    assert.ok(project.status, `${project.id} is missing a status`);
    assert.ok(project.preview || project.logo, `${project.id} is missing a preview or logo`);
  }
});

test("project previews use local optimized assets", async () => {
  for (const project of PROJECTS) {
    if (project.preview) {
      assert.match(project.preview, /^\/proyectos\/.+\.(jpe?g|png|webp)$/);

      const bytes = await readFile(new URL(`../public${project.preview}`, import.meta.url));
      const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
      const isPng = bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
      const isWebp = bytes.subarray(0, 4).toString() === "RIFF" && bytes.subarray(8, 12).toString() === "WEBP";
      const extension = project.preview.split(".").at(-1);

      assert.equal(isJpeg, extension === "jpg" || extension === "jpeg", `${project.preview} has a mismatched JPEG signature`);
      assert.equal(isPng, extension === "png", `${project.preview} has a mismatched PNG signature`);
      assert.equal(isWebp, extension === "webp", `${project.preview} has a mismatched WebP signature`);
    }
  }
});
