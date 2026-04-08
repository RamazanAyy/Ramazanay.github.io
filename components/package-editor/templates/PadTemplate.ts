import type { Canvas } from 'fabric/fabric-impl';
import { adjustColor } from './colorUtils';

export function loadPadTemplate(
  canvas: Canvas,
  options: { pkgColor: string; labelBg: string; labelTextColor: string }
): void {
  const { pkgColor, labelBg, labelTextColor } = options;
  const dark = adjustColor(pkgColor, -40);
  const light = adjustColor(pkgColor, 60);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const f = (window as any).fabric as typeof import('fabric').fabric;

  canvas.clear();
  canvas.backgroundColor = '#f0f4f8';

  // 1. Main pad body — tall narrow rect
  const body = new f.Rect({
    left: 90,
    top: 30,
    width: 160,
    height: 300,
    rx: 40,
    ry: 40,
    fill: pkgColor,
    stroke: dark,
    strokeWidth: 1.5,
    selectable: false,
    evented: false,
    name: 'body',
  });

  // 2. Left wing
  const wingLeft = new f.Path('M90 140 Q40 150 55 190 Q90 185 90 190 Z', {
    fill: dark,
    selectable: false,
    evented: false,
    name: 'wing-left',
  });

  // 3. Right wing
  const wingRight = new f.Path('M250 140 Q300 150 285 190 Q250 185 250 190 Z', {
    fill: dark,
    selectable: false,
    evented: false,
    name: 'wing-right',
  });

  // 4. Top flap hint
  const flap = new f.Path('M90 30 Q170 10 250 30 Q170 50 90 30 Z', {
    fill: light,
    opacity: 0.5,
    selectable: false,
    evented: false,
    name: 'flap-top',
  });

  // 5. Sheen highlight
  const sheen = new f.Path('M100 38 Q170 22 240 38 L236 80 Q170 64 104 80 Z', {
    fill: light,
    opacity: 0.28,
    selectable: false,
    evented: false,
    name: 'sheen',
  });

  // 6. Label rect
  const labelRect = new f.Rect({
    left: 105,
    top: 120,
    width: 130,
    height: 80,
    rx: 8,
    ry: 8,
    fill: labelBg,
    stroke: adjustColor(labelBg, -30),
    strokeWidth: 1,
    selectable: false,
    evented: false,
    name: 'label-rect',
  });

  // 7. Brand text — SELECTABLE
  const brandText = new f.IText('MARKA ADINIZ', {
    left: 170,
    top: 150,
    originX: 'center',
    originY: 'center',
    fontFamily: 'Arial Black, sans-serif',
    fontWeight: '900',
    fontSize: 12,
    fill: labelTextColor,
    editable: true,
    name: 'brand-text',
  });

  // 8. Product name — SELECTABLE
  const productName = new f.IText('Hijyen Pedi', {
    left: 170,
    top: 180,
    originX: 'center',
    originY: 'center',
    fontFamily: 'Georgia, serif',
    fontStyle: 'italic',
    fontSize: 13,
    fill: light,
    editable: true,
    name: 'product-name',
  });

  // 9. Bottom shadow
  const shadow = new f.Ellipse({
    left: 60,
    top: 315,
    rx: 110,
    ry: 8,
    fill: '#000000',
    opacity: 0.12,
    selectable: false,
    evented: false,
    name: 'shadow',
  });

  [
    body,
    wingLeft,
    wingRight,
    flap,
    sheen,
    labelRect,
    brandText,
    productName,
    shadow,
  ].forEach(obj => canvas.add(obj));
  canvas.renderAll();
}
