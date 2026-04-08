import type { Canvas } from 'fabric/fabric-impl';
import { adjustColor } from './colorUtils';

export function loadWipeTemplate(
  canvas: Canvas,
  options: { pkgColor: string; labelBg: string; labelTextColor: string }
): void {
  const { pkgColor, labelBg, labelTextColor } = options;
  const dark = adjustColor(pkgColor, -40);
  const darkest = adjustColor(pkgColor, -70);
  const light = adjustColor(pkgColor, 60);

  // Use fabric from window — this function is always called client-side
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const f = (window as any).fabric as typeof import('fabric').fabric;

  canvas.clear();
  canvas.backgroundColor = '#f0f4f8';

  // 1. Body — main pouch shape
  const body = new f.Path('M32 60 Q170 28 308 60 L308 220 Q170 232 32 220 Z', {
    fill: pkgColor,
    stroke: dark,
    strokeWidth: 1,
    selectable: false,
    evented: false,
    name: 'body',
  });

  // 2. Top seal strip
  const topSeal = new f.Path('M14 72 Q170 38 326 72 Q170 62 14 72 Z', {
    fill: dark,
    opacity: 0.35,
    selectable: false,
    evented: false,
    name: 'top-seal',
  });

  // 3. Left side panel (3D perspective)
  const leftPanel = new f.Path('M14 72 L28 64 L28 220 L14 212 Z', {
    fill: darkest,
    selectable: false,
    evented: false,
    name: 'left-panel',
  });

  // 4. Right side panel
  const rightPanel = new f.Path('M312 64 L326 72 L326 212 L312 220 Z', {
    fill: dark,
    selectable: false,
    evented: false,
    name: 'right-panel',
  });

  // 5. Top sheen highlight
  const sheen = new f.Path('M50 70 Q170 44 290 70 L285 110 Q170 88 55 110 Z', {
    fill: light,
    opacity: 0.32,
    selectable: false,
    evented: false,
    name: 'sheen',
  });

  // 6. Flip cap outer
  const capOuter = new f.Rect({
    left: 108,
    top: 44,
    width: 124,
    height: 52,
    rx: 9,
    ry: 9,
    fill: '#e8edf2',
    stroke: '#b0bec8',
    strokeWidth: 1,
    selectable: false,
    evented: false,
    name: 'cap-outer',
  });

  // 7. Cap inner recess
  const capInner = new f.Rect({
    left: 114,
    top: 50,
    width: 112,
    height: 40,
    rx: 6,
    ry: 6,
    fill: '#f0f4f8',
    stroke: '#c8d2da',
    strokeWidth: 1,
    selectable: false,
    evented: false,
    name: 'cap-inner',
  });

  // 8. Snap oval large
  const snapLarge = new f.Ellipse({
    left: 144,
    top: 57,
    rx: 26,
    ry: 8,
    fill: '#dce6ee',
    stroke: '#a8bac8',
    strokeWidth: 1,
    selectable: false,
    evented: false,
    name: 'snap-large',
  });

  // 9. Snap oval small
  const snapSmall = new f.Ellipse({
    left: 163,
    top: 59,
    rx: 7,
    ry: 2,
    fill: '#d0dde7',
    selectable: false,
    evented: false,
    name: 'snap-small',
  });

  // 10. Label area
  const labelRect = new f.Rect({
    left: 95,
    top: 120,
    width: 150,
    height: 70,
    rx: 8,
    ry: 8,
    fill: labelBg,
    stroke: adjustColor(labelBg, -30),
    strokeWidth: 1,
    selectable: false,
    evented: false,
    name: 'label-rect',
  });

  // 11. Brand text — SELECTABLE
  const brandText = new f.IText('MARKA ADINIZ', {
    left: 170,
    top: 148,
    originX: 'center',
    originY: 'center',
    fontFamily: 'Arial Black, sans-serif',
    fontWeight: '900',
    fontSize: 13,
    fill: labelTextColor,
    editable: true,
    name: 'brand-text',
  });

  // 12. Product name — SELECTABLE
  const productName = new f.IText('Islak Mendil', {
    left: 170,
    top: 175,
    originX: 'center',
    originY: 'center',
    fontFamily: 'Georgia, serif',
    fontStyle: 'italic',
    fontSize: 14,
    fill: light,
    editable: true,
    name: 'product-name',
  });

  // 13. Bottom shadow
  const shadow = new f.Ellipse({
    left: 32,
    top: 238,
    rx: 138,
    ry: 10,
    fill: '#000000',
    opacity: 0.12,
    selectable: false,
    evented: false,
    name: 'shadow',
  });

  [
    body,
    topSeal,
    leftPanel,
    rightPanel,
    sheen,
    capOuter,
    capInner,
    snapLarge,
    snapSmall,
    labelRect,
    brandText,
    productName,
    shadow,
  ].forEach(obj => canvas.add(obj));
  canvas.renderAll();
}
