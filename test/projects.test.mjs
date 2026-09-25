import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { PROJECTS } from "../lib/cv.ts";

test("every project has a status and a unique art identity", () => {
  assert.equal(PROJECTS.length, 7);

  for (const project of PROJECTS) {
    assert.ok(project.status, `${project.id} is missing a status`);
  }

  assert.deepEqual(
    PROJECTS.map((project) => [project.id, project.art]),
    [
      ["portfolio", "portfolio"],
      ["nfpshop", "nfp"],
      ["enerpro", "enerpro"],
      ["bandmanager", "bandmanager"],
      ["htmlcss", "htmlcss"],
      ["apuntes", "upgrade"],
      ["suscripscan", "suscripscan"],
    ],
  );
});

test("only the featured illustration uses a preview image", () => {
  assert.deepEqual(
    PROJECTS.filter((project) => "preview" in project).map((project) => project.id),
    ["nfpshop"],
  );
});

test("projects with an iconic identity use their own artwork asset", () => {
  assert.deepEqual(
    PROJECTS.filter((project) => ["bandmanager", "htmlcss", "suscripscan"].includes(project.id)).map((project) => [project.id, "logo" in project ? project.logo : null]),
    [
      ["bandmanager", "/logos/bandmanager-emblem.png"],
      ["htmlcss", "/logos/html-css-emblem.png"],
      ["suscripscan", "/logos/suscripscan-emblem.png"],
    ],
  );
});

test("project image assets match their file extensions", async () => {
  for (const project of PROJECTS) {
    const assets = ["preview" in project ? project.preview : null, "logo" in project ? project.logo : null].filter(Boolean);

    for (const asset of assets) {
      assert.match(asset, /^\/(proyectos|logos)\/.+\.(jpe?g|png|webp|svg)$/);

      const bytes = await readFile(new URL(`../public${asset}`, import.meta.url));
      const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
      const isPng = bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
      const isWebp = bytes.subarray(0, 4).toString() === "RIFF" && bytes.subarray(8, 12).toString() === "WEBP";
      const isSvg = bytes.subarray(0, 200).toString().includes("<svg");
      const extension = asset.split(".").at(-1);

      assert.equal(isJpeg, extension === "jpg" || extension === "jpeg", `${asset} has a mismatched JPEG signature`);
      assert.equal(isPng, extension === "png", `${asset} has a mismatched PNG signature`);
      assert.equal(isWebp, extension === "webp", `${asset} has a mismatched WebP signature`);
      assert.equal(isSvg, extension === "svg", `${asset} has a mismatched SVG signature`);
    }
  }
});
