const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC = path.join(__dirname, '..', 'public', 'logo-transparent.png');
const APP_DIR = path.join(__dirname, '..', 'app');

(async () => {
  const meta = await sharp(SRC).metadata();
  const { width, height } = meta;
  const squareSize = Math.max(width, height);

  // Square canvas with transparent bg, logo centered
  const squareBuffer = await sharp({
    create: {
      width: squareSize,
      height: squareSize,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    },
  })
    .composite([{ input: SRC, gravity: 'center' }])
    .png()
    .toBuffer();

  // app/icon.png — Next.js auto-favicon (32x32)
  await sharp(squareBuffer).resize(64, 64).png().toFile(path.join(APP_DIR, 'icon.png'));

  // app/apple-icon.png — iOS bookmark icon (180x180)
  await sharp(squareBuffer)
    .resize(180, 180)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .png()
    .toFile(path.join(APP_DIR, 'apple-icon.png'));

  // public/favicon.ico (PNG-based 32x32 — modern browsers accept this)
  await sharp(squareBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(__dirname, '..', 'public', 'favicon.ico'));

  console.log('done:');
  console.log('  app/icon.png (64x64)');
  console.log('  app/apple-icon.png (180x180)');
  console.log('  public/favicon.ico (32x32)');
})();
