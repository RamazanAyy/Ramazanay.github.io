// One-shot image optimizer.
// PNG → WebP (max 1920px, q=82), JPG → re-compress JPG (max 1920px, q=85, mozjpeg).
// Keeps original filename root so refactor of references is mechanical.
//
//   node scripts/optimize-images.js public/images/products
//
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const MAX_DIM = 1920;
const TARGETS = process.argv.slice(2).length ? process.argv.slice(2) : ['public/images/products'];
const PNG_QUALITY = 82;
const JPG_QUALITY = 85;

async function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(p, files);
    else files.push(p);
  }
  return files;
}

async function processOne(file) {
  const ext = path.extname(file).toLowerCase();
  const stat = fs.statSync(file);
  const inSize = stat.size;
  let outFile;
  let outBuf;

  // OneDrive cloud-only dosyaları için path yerine buffer kullan
  const buf = fs.readFileSync(file);
  const meta = await sharp(buf).metadata();
  const needResize = (meta.width || 0) > MAX_DIM || (meta.height || 0) > MAX_DIM;
  let img = sharp(buf);
  if (needResize) {
    img = img.resize(MAX_DIM, MAX_DIM, { fit: 'inside', withoutEnlargement: true });
  }

  // Tüm görselleri WebP'e çevir (PNG ve JPG dahil)
  if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || /\.jpg\.jpeg$/i.test(file)) {
    outFile = file.replace(/\.(png|jpg|jpeg)$/i, '.webp').replace(/\.jpg\.jpeg$/i, '.webp');
    outBuf = await img.webp({ quality: PNG_QUALITY, effort: 5 }).toBuffer();
  } else {
    return null; // skip
  }

  // Only write if smaller (or same path with diff ext)
  if (outFile !== file || outBuf.length < inSize) {
    fs.writeFileSync(outFile, outBuf);
    if (outFile !== file) fs.unlinkSync(file);
  }

  return { file, outFile, inSize, outSize: outBuf.length, resized: needResize };
}

(async () => {
  for (const target of TARGETS) {
    if (!fs.existsSync(target)) {
      console.log('Skip (yok):', target);
      continue;
    }
    const files = (await walk(target)).filter(f => /\.(png|jpe?g)$/i.test(f) || /\.jpg\.jpeg$/i.test(f));
    let totalIn = 0, totalOut = 0, count = 0;
    console.log(`\n${target}: ${files.length} dosya işlenecek`);
    for (const f of files) {
      try {
        const r = await processOne(f);
        if (!r) continue;
        totalIn += r.inSize;
        totalOut += r.outSize;
        count++;
        const arrow = r.outFile !== r.file ? '→' : ' =';
        const inKB = Math.round(r.inSize / 1024);
        const outKB = Math.round(r.outSize / 1024);
        const pct = Math.round((1 - r.outSize / r.inSize) * 100);
        console.log(`  [${count}/${files.length}] ${path.basename(r.file)} (${inKB}KB) ${arrow} ${path.basename(r.outFile)} (${outKB}KB) -${pct}%${r.resized ? ' [resize]' : ''}`);
      } catch (e) {
        console.error('  HATA:', f, e.message);
      }
    }
    console.log(`  ${target} TOPLAM: ${(totalIn/1024/1024).toFixed(1)} MB → ${(totalOut/1024/1024).toFixed(1)} MB (-${Math.round((1-totalOut/totalIn)*100)}%)`);
  }
})();
