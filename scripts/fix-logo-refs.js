// Hızlı düzeltme: src=$0" patternini gerçek logo .webp referansıyla değiştir
const fs = require('fs');

const fixes = {
  'app/[locale]/not-found.tsx': ['/logo-transparent.webp'],
  'app/[locale]/page.tsx': ['/logo-wide.webp'],
  'components/Footer.tsx': ['/logo-transparent.webp'],
  // Navbar 2 logo: önce /logo.webp (header), sonra /logo-transparent.webp (mobile overlay)
  'components/Navbar.tsx': ['/logo.webp', '/logo-transparent.webp'],
  'components/ui/CatalogWidget.tsx': ['/logo.webp'],
};

for (const [file, targets] of Object.entries(fixes)) {
  if (!fs.existsSync(file)) {
    console.log('Yok:', file);
    continue;
  }
  let content = fs.readFileSync(file, 'utf8');
  let i = 0;
  content = content.replace(/src=\$0"/g, () => {
    const v = targets[i] || targets[targets.length - 1];
    i++;
    return 'src="' + v + '"';
  });
  fs.writeFileSync(file, content);
  console.log('  düzeltildi:', file, '(' + i + ' yer)');
}
