const fs = require('fs');
const path = require('path');

function walk(dir, list = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, list);
    else list.push(p);
  }
  return list;
}

function scanCode(dir, refs = new Set()) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.next') continue;
      scanCode(p, refs);
    } else if (/\.(tsx|ts|jsx|js)$/.test(e.name)) {
      const content = fs.readFileSync(p, 'utf8');
      // Boşluk içeren dosya isimlerini ("SP_X (2).webp") yakala — sadece tırnaklara kadar
      const matches = content.match(/\/images\/[^"']*?\.(png|jpg|jpeg|webp)/g);
      if (matches) matches.forEach(m => refs.add(m));
    }
  }
  return refs;
}

const refs = new Set();
['app', 'components', 'lib'].forEach(d => scanCode(d, refs));
console.log('Kod referanslarındaki dosya sayısı:', refs.size);

const allFiles = walk('public/images').filter(f => /\.(png|jpg|jpeg|webp)$/.test(f));
console.log('Disk dosya sayısı:', allFiles.length);

const orphans = [];
for (const f of allFiles) {
  const url = '/' + f.replace(/\\/g, '/').replace(/^public\//, '');
  if (!refs.has(url)) orphans.push(f);
}

console.log('\nKodda referansı OLMAYAN dosyalar (' + orphans.length + ' adet):');
let totalOrphan = 0;
for (const o of orphans) {
  const sz = fs.statSync(o).size;
  totalOrphan += sz;
  console.log('  ' + Math.round(sz / 1024) + 'KB  ' + o);
}
console.log('\nToplam orphan: ' + (totalOrphan / 1024 / 1024).toFixed(1) + ' MB');

// İkinci argüman --delete ise siler
if (process.argv.includes('--delete')) {
  console.log('\nSiliniyor...');
  for (const o of orphans) {
    // Catalog page görsellerini ve PDF'leri silme
    if (o.includes('catalog') || o.endsWith('.pdf')) {
      console.log('  ATLA (catalog/pdf):', o);
      continue;
    }
    fs.unlinkSync(o);
    console.log('  SIL:', o);
  }
  console.log('\nTamamlandı.');
}
