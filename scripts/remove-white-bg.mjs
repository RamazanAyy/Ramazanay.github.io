import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const dirs = [
  'public/images/products/eco-baby-diapers',
  'public/images/products/mega-baby-diapers',
];

for (const dir of dirs) {
  const abs = path.resolve(dir);
  const files = await fs.readdir(abs);
  const jpgs = files.filter((f) => /\.jpg$/i.test(f) && /BABY_DIAPERS/i.test(f));

  for (const file of jpgs) {
    const src = path.join(abs, file);
    const out = path.join(abs, file.replace(/\.jpg$/i, '.png'));

    const { data, info } = await sharp(src)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const W = info.width;
    const H = info.height;
    const buf = Buffer.from(data);

    // Flood fill from image edges, making near-white pixels transparent.
    const isWhiteLike = (i) => {
      const r = buf[i];
      const g = buf[i + 1];
      const b = buf[i + 2];
      // Near white: all channels >= 235 and within 15 of each other
      return r >= 235 && g >= 235 && b >= 235 &&
             Math.abs(r - g) < 15 && Math.abs(g - b) < 15 && Math.abs(r - b) < 15;
    };

    const visited = new Uint8Array(W * H);
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
      if (!isWhiteLike(bi)) continue;
      visited[vi] = 1;
      buf[bi + 3] = 0;
      stack.push(x + 1, y);
      stack.push(x - 1, y);
      stack.push(x, y + 1);
      stack.push(x, y - 1);
    }

    await sharp(buf, { raw: { width: W, height: H, channels: 4 } })
      .png({ compressionLevel: 9 })
      .toFile(out);

    console.log(`${dir}/${file} -> ${path.basename(out)}`);
  }
}

console.log('done');
