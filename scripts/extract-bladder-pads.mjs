import sharp from 'sharp';
import path from 'node:path';

const src = path.resolve('public/images/catalog/pages/page-22.jpg');
const outDir = path.resolve('public/images/products/bladder-pads');

// page-22.jpg is 1182x1182
// Three packages on bottom half: green (left), blue (center), purple (right)
const crops = [
  { name: 'SP_PADS_UNISEX_PURPLE.png', left: 700, top: 430, width: 280, height: 440 }, // purple = 8 damlacık
];

for (const c of crops) {
  const out = path.join(outDir, c.name);
  const { data, info } = await sharp(src)
    .extract({ left: c.left, top: c.top, width: c.width, height: c.height })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const W = info.width;
  const H = info.height;
  const buf = Buffer.from(data);

  // Catalog bg is purple ~rgb(160, 161, 225). Flood-fill from edges.
  const isBg = (i) => {
    const r = buf[i];
    const g = buf[i + 1];
    const b = buf[i + 2];
    // purple bg: b dominant by 30+, g close to r
    return b - g >= 30 && b - r >= 30 && r >= 130 && r <= 220 && Math.abs(r - g) < 20;
  };

  const visited = new Uint8Array(W * H);
  const stack = [];
  for (let x = 0; x < W; x++) { stack.push(x, 0); stack.push(x, H - 1); }
  for (let y = 0; y < H; y++) { stack.push(0, y); stack.push(W - 1, y); }

  while (stack.length) {
    const y = stack.pop();
    const x = stack.pop();
    if (x < 0 || y < 0 || x >= W || y >= H) continue;
    const vi = y * W + x;
    if (visited[vi]) continue;
    const bi = vi * 4;
    if (!isBg(bi)) continue;
    visited[vi] = 1;
    buf[bi + 3] = 0;
    stack.push(x + 1, y);
    stack.push(x - 1, y);
    stack.push(x, y + 1);
    stack.push(x, y - 1);
  }

  // Pad with transparent canvas to give product some breathing room
  const padX = Math.round(c.width * 0.15);
  const padY = Math.round(c.height * 0.12);

  await sharp(buf, { raw: { width: W, height: H, channels: 4 } })
    .extend({
      top: padY, bottom: padY, left: padX, right: padX,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toFile(out);

  console.log(`wrote ${out}`);
}
