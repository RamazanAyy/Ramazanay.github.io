// One-time script: rename TR slugs to EN canonical across the codebase.
// Mapping (old TR → new EN). Order matters: longer slugs first to avoid
// partial matches (e.g. 'bebek-bezi' inside 'bebek-bezi-...').
const fs = require('fs');
const path = require('path');

const MAP = [
  // Product slugs (longer first)
  ['yetiskin-bezi-m', 'adult-diaper-m'],
  ['yetiskin-bezi-l', 'adult-diaper-l'],
  ['yetiskin-bezi-xl', 'adult-diaper-xl'],
  ['kulot-bezi-m', 'adult-pant-m'],
  ['kulot-bezi-l', 'adult-pant-l'],
  ['kulot-bezi-xl', 'adult-pant-xl'],
  ['alt-serme-60x90', 'adult-underpad-60x90'],
  ['bebek-alt-serme-60x60', 'baby-underpad-60x60'],
  ['mesane-pedi-4-damla', 'bladder-pad-4-drops'],
  ['mesane-pedi-6-damla', 'bladder-pad-6-drops'],
  ['mesane-pedi-8-damla', 'bladder-pad-8-drops'],
  ['hijyenik-ped-4-damla', 'sanitary-pad-4-drops'],
  ['hijyenik-ped-5-damla', 'sanitary-pad-5-drops'],
  ['hijyenik-ped-6-damla', 'sanitary-pad-6-drops'],
  ['islak-mendil-bebek-72', 'baby-wipe-72'],
  ['islak-mendil-bebek-90', 'baby-wipe-90'],
  ['islak-mendil-bebek-120', 'baby-wipe-120'],
  ['islak-mendil-fresh-splash-120', 'wet-wipe-fresh-splash-120'],
  ['islak-mendil-fresh-splash-90', 'wet-wipe-fresh-splash-90'],
  ['islak-mendil-aloe-vera', 'wet-wipe-aloe-vera'],
  ['islak-mendil-papatya', 'wet-wipe-chamomile'],
  ['islak-mendil-gul', 'wet-wipe-rose'],
  ['islak-mendil-lavanta', 'wet-wipe-lavender'],
  ['yuzey-temizleme-havlusu-100', 'cleaning-towel-100'],
  // Category slugs (longer first)
  ['yetiskin-alt-serme-ortusu', 'adult-underpads'],
  ['bebek-alt-serme-ortusu', 'baby-underpads'],
  ['yetiskin-kulot-bezi', 'adult-pants'],
  ['yuzey-temizleme-havlusu', 'cleaning-towels'],
  ['yetiskin-bezi', 'adult-diapers'],
  ['bebek-bezi', 'baby-diapers'],
  ['mesane-pedi', 'bladder-pads'],
  ['hijyenik-ped', 'sanitary-pads'],
  ['islak-mendil', 'wet-wipes'],
  // Path segments
  ['/urunler', '/products'],
  ['/iletisim', '/contact'],
  ['/ozel-etiket', '/private-label'],
  ['/kurumsal/hakkimizda', '/about/about-us'],
  ['/kurumsal/sertifikalar', '/about/certificates'],
  ['/kurumsal/uretim', '/about/production'],
  ['/kurumsal/ihracat', '/about/export'],
];

function walk(dir, list = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.next' || e.name === '.git') continue;
      walk(p, list);
    } else if (/\.(tsx|ts|jsx|js|json|md)$/.test(e.name)) list.push(p);
  }
  return list;
}

const targets = process.argv.slice(2);
if (!targets.length) {
  console.error('Kullanım: node scripts/migrate-slugs.js <dosya|klasör> [...]');
  process.exit(1);
}

const files = [];
for (const t of targets) {
  if (!fs.existsSync(t)) continue;
  const stat = fs.statSync(t);
  if (stat.isDirectory()) walk(t, files);
  else files.push(t);
}

let edited = 0;
for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  const before = content;
  for (const [from, to] of MAP) {
    // Sadece "string" veya 'string' içinde, slug pattern olarak (kelime sınırı)
    // Bu, kategoryAdı vb. değişken adlarını korur, sadece slug değerlerini değiştirir
    const re = new RegExp('([\\\'\"`/])' + from.replace(/[-/\\\\^$*+?.()|[\\]{}]/g, '\\\\$&') + '([\\\'\"`/])', 'g');
    content = content.replace(re, '$1' + to + '$2');
  }
  if (before !== content) {
    fs.writeFileSync(f, content);
    edited++;
    console.log('  ✓', f);
  }
}
console.log('\\nToplam ' + edited + ' dosya güncellendi.');
