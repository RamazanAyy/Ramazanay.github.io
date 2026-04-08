import type { Canvas } from 'fabric/fabric-impl';
import { adjustColor } from './colorUtils';

export function loadDiaperTemplate(
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

  // 1. Main body
  const body = new f.Rect({
    left: 30,
    top: 50,
    width: 280,
    height: 220,
    rx: 30,
    ry: 30,
    fill: pkgColor,
    stroke: dark,
    strokeWidth: 1.5,
    selectable: false,
    evented: false,
    name: 'body',
  });

  // 2. Left ear tab
  const tabLeft = new f.Ellipse({
    left: 5,
    top: 90,
    rx: 28,
    ry: 40,
    fill: dark,
    selectable: false,
    evented: false,
    name: 'tab-left',
  });

  // 3. Right ear tab
  const tabRight = new f.Ellipse({
    left: 307,
    top: 90,
    rx: 28,
    ry: 40,
    fill: dark,
    selectable: false,
    evented: false,
    name: 'tab-right',
  });

  // 4. Waistband strip
  const waistband = new f.Rect({
    left: 30,
    top: 50,
    width: 280,
    height: 40,
    rx: 12,
    ry: 12,
    fill: light,
    opacity: 0.5,
    selectable: false,
    evented: false,
    name: 'waistband',
  });

  // 5. Leg curve left
  const legLeft = new f.Path('M30 200 Q80 240 30 270', {
    stroke: dark,
    strokeWidth: 2,
    fill: 'transparent',
    selectable: false,
    evented: false,
    name: 'leg-left',
  });

  // 6. Leg curve right
  const legRight = new f.Path('M310 200 Q260 240 310 270', {
    stroke: dark,
    strokeWidth: 2,
    fill: 'transparent',
    selectable: false,
    evented: false,
    name: 'leg-right',
  });

  // 7. Sheen highlight
  const sheen = new f.Path('M60 58 Q170 42 280 58 L275 90 Q170 76 65 90 Z', {
    fill: light,
    opacity: 0.28,
    selectable: false,
    evented: false,
    name: 'sheen',
  });

  // 8. Label rect
  const labelRect = new f.Rect({
    left: 95,
    top: 130,
    width: 150,
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

  // 9. Brand text — SELECTABLE
  const brandText = new f.IText('MARKA ADINIZ', {
    left: 170,
    top: 160,
    originX: 'center',
    originY: 'center',
    fontFamily: 'Arial Black, sans-serif',
    fontWeight: '900',
    fontSize: 13,
    fill: labelTextColor,
    editable: true,
    name: 'brand-text',
  });

  // 10. Product name — SELECTABLE
  const productName = new f.IText('Bebek Bezi', {
    left: 170,
    top: 190,
    originX: 'center',
    originY: 'center',
    fontFamily: 'Georgia, serif',
    fontStyle: 'italic',
    fontSize: 14,
    fill: light,
    editable: true,
    name: 'product-name',
  });

  // 11. Bottom shadow
  const shadow = new f.Ellipse({
    left: 30,
    top: 285,
    rx: 140,
    ry: 10,
    fill: '#000000',
    opacity: 0.12,
    selectable: false,
    evented: false,
    name: 'shadow',
  });

  [
    tabLeft,
    tabRight,
    body,
    waistband,
    legLeft,
    legRight,
    sheen,
    labelRect,
    brandText,
    productName,
    shadow,
  ].forEach(obj => canvas.add(obj));
  canvas.renderAll();
}
