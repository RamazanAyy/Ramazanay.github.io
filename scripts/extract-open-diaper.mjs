import sharp from 'sharp';
import path from 'node:path';

const src = path.resolve('public/images/catalog/pages/page-06.jpg');
const out = path.resolve('public/images/products/eco-baby-diapers/SP_BABY_DIAPER_OPEN.png');

const left = 40;
const top = 700;
const width = 430;
const height = 440;

const { data, info } = await sharp(src)
  .extract({ left, top, width, height })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const W = info.width;
const H = info.height;
const buf = Buffer.from(data);

// Flood fill from image edges. Only pixels connected to the frame that
// look "catalog-teal-like" become transparent. This preserves the absorbent
// blue strip inside the diaper even though its color is similar.
const idx = (x, y) => (y * W + x) * 4;
const visited = new Uint8Array(W * H);

// Very loose match so soft edges of the catalog bg are included
const isTealLike = (i) => {
  const r = buf[i];
  const g = buf[i + 1];
  const b = buf[i + 2];
  return g > r && g >= b - 3 && g - r >= 4 && r >= 100 && r <= 245;
};

const stack = [];
for (let x = 0; x < W; x++) {
  stack.push(x, 0);
  stack.push(x, H - 1);
}
for (let y = 0; y < H; y++) {
  stack.push(0, y);
  stack.push(W - 1, y);
}

while (stack.length) {
  const y = stack.pop();
  const x = stack.pop();
  if (x < 0 || y < 0 || x >= W || y >= H) continue;
  const vi = y * W + x;
  if (visited[vi]) continue;
  const bi = vi * 4;
  if (!isTealLike(bi)) continue;
  visited[vi] = 1;
  buf[bi + 3] = 0; // alpha = 0
  stack.push(x + 1, y);
  stack.push(x - 1, y);
  stack.push(x, y + 1);
  stack.push(x, y - 1);
}

// Pad with transparent canvas
const padX = Math.round(width * 0.45);
const padY = Math.round(height * 0.4);

await sharp(buf, { raw: { width: W, height: H, channels: 4 } })
  .extend({
    top: padY,
    bottom: padY,
    left: padX,
    right: padX,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png({ compressionLevel: 9 })
  .toFile(out);

console.log(`wrote ${out}`);
