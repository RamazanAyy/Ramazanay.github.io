const sharp = require('sharp');
const path = require('path');

const input = path.join(__dirname, '..', 'public', 'logo.png');
const output = path.join(__dirname, '..', 'public', 'logo-transparent.png');

(async () => {
  const img = sharp(input).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.from(data);

  for (let i = 0; i < out.length; i += channels) {
    const r = out[i];
    const g = out[i + 1];
    const b = out[i + 2];
    const minC = Math.min(r, g, b);
    const maxC = Math.max(r, g, b);
    const isNearWhite = minC > 230 && (maxC - minC) < 25;
    if (isNearWhite) {
      out[i + 3] = 0;
    } else if (minC > 200) {
      const t = (minC - 200) / 30;
      out[i + 3] = Math.round(out[i + 3] * (1 - Math.min(1, t) * 0.85));
    }
  }

  await sharp(out, { raw: { width, height, channels } }).png().toFile(output);
  console.log('done →', output);
})();
