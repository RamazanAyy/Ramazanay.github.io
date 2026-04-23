import { PDFDocument } from 'pdf-lib';
import fs from 'node:fs/promises';
import path from 'node:path';

const pagesDir = path.resolve('public/images/catalog/pages');
const outPath = path.resolve('public/images/catalog/softpower-katalog.pdf');

const files = (await fs.readdir(pagesDir))
  .filter((f) => /^page-\d+\.jpg$/i.test(f))
  .sort();

if (files.length === 0) {
  console.error('No page-XX.jpg files found in', pagesDir);
  process.exit(1);
}

const pdf = await PDFDocument.create();

for (const file of files) {
  const bytes = await fs.readFile(path.join(pagesDir, file));
  const img = await pdf.embedJpg(bytes);
  const page = pdf.addPage([img.width, img.height]);
  page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
  console.log(`added ${file} (${img.width}x${img.height})`);
}

const out = await pdf.save();
await fs.writeFile(outPath, out);
console.log(`wrote ${outPath} (${(out.length / 1024 / 1024).toFixed(2)} MB, ${files.length} pages)`);
