import fs from 'fs';
import path from 'path';

function getImages(folder: string): string[] {
  const dir = path.join(process.cwd(), 'public/images/products', folder);
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
      .map((f) => `/images/products/${folder}/${f}`);
  } catch {
    return [];
  }
}

export const imageMap: Record<string, string[]> = {
  'eco-baby-diapers': getImages('eco-baby-diapers'),
  'mega-baby-diapers': getImages('mega-baby-diapers'),
  'adult-diapers-10': getImages('adult-diapers-10'),
  'adult-diapers-30': getImages('adult-diapers-30'),
  'adult-pants-10': getImages('adult-pants-10'),
  'adult-pants-30': getImages('adult-pants-30'),
  'adult-underpad': getImages('adult-underpad'),
  'baby-wet-wipes': getImages('baby-wet-wipes'),
  'wet-wipes': getImages('wet-wipes'),
  'bladder-pads': getImages('bladder-pads'),
  'home-care-wet-towels': getImages('home-care-wet-towels'),
  'baby-underpad': getImages('baby-underpad'),
};

export function getProductImage(key: string, index = 0): string {
  return imageMap[key]?.[index] ?? '';
}

export function getAllProductImages(key: string): string[] {
  return imageMap[key] ?? [];
}
