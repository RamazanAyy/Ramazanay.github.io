import type { Canvas } from 'fabric/fabric-impl';
import { adjustColor } from './colorUtils';

export function loadAdultTemplate(
  canvas: Canvas,
  options: { pkgColor: string; labelBg: string; labelTextColor: string }
): void {
  const { pkgColor, labelBg, labelTextColor } = options;
  const dark = adjustColor(pkgColor, -40);
  const darkest = adjustColor(pkgColor, -70);
  const light = adjustColor(pkgColor, 60);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const f = (window as any).fabric as typeof import('fabric').fabric;

  canvas.clear();
  canvas.backgroundColor = '#f0f4f8';

  // 1. Main body — wider and taller than baby diaper
  const body = new f.Rect({
    left: 20,
    top: 40,
    width: 300,
    height: 250,
    rx: 25,
    ry: 25,
    fill: pkgColor,
    stroke: dark,
    strokeWidth: 1.5,
    selectable: false,
    evented: false,
    name: 'body',
  });

  // 2. Left ear tab — larger than baby
  const tabLeft = new f.Ellipse({
    left: -15,
    top: 80,
    rx: 35,
    ry: 55,
    fill: dark,
    selectable: false,
    evented: false,
    name: 'tab-left',
  });

  // 3. Right ear tab
  const tabRight = new f.Ellipse({
    left: 320,
    top: 80,
    rx: 35,
    ry: 55,
    fill: dark,
    selectable: false,
    evented: false,
    name: 'tab-right',
  });

  // 4. Waistband — bigger than baby
  const waistband = new f.Rect({
    left: 20,
    top: 40,
    width: 300,
    height: 50,
    rx: 15,
    ry: 15,
    fill: light,
    opacity: 0.55,
    selectable: false,
    evented: false,
    name: 'waistband',
  });

  // 5. Waistband dark accent line
  const waistAccent = new f.Rect({
    left: 20,
    top: 86,
    width: 300,
    height: 4,
    fill: darkest,
    opacity: 0.18,
    selectable: false,
    evented: false,
    name: 'body',
  });

  // 6. Leg curve left
  const legLeft = new f.Path('M20 218 Q78 258 20 290', {
    stroke: dark,
    strokeWidth: 2.5,
    fill: 'transparent',
    selectable: false,
    evented: false,
    name: 'leg-left',
  });

  // 7. Leg curve right
  const legRight = new f.Path('M320 218 Q262 258 320 290', {
    stroke: dark,
    strokeWidth: 2.5,
    fill: 'transparent',
    selectable: false,
    evented: false,
    name: 'leg-right',
  });

  // 8. Sheen highlight
  const sheen = new f.Path('M50 48 Q170 32 290 48 L285 90 Q170 74 55 90 Z', {
    fill: light,
    opacity: 0.30,
    selectable: false,
    evented: false,
    name: 'sheen',
  });

  // 9. Side texture lines left
  const texLeft = new f.Path('M22 110 Q40 115 22 130 Q40 135 22 150 Q40 155 22 170', {
    stroke: light,
    strokeWidth: 1.5,
    fill: 'transparent',
    opacity: 0.4,
    selectable: false,
    evented: false,
    name: 'body',
  });

  // 10. Side texture lines right
  const texRight = new f.Path('M318 110 Q300 115 318 130 Q300 135 318 150 Q300 155 318 170', {
    stroke: light,
    strokeWidth: 1.5,
    fill: 'transparent',
    opacity: 0.4,
    selectable: false,
    evented: false,
    name: 'body',
  });

  // 11. Label rect — centered and larger
  const labelRect = new f.Rect({
    left: 85,
    top: 130,
    width: 170,
    height: 90,
    rx: 10,
    ry: 10,
    fill: labelBg,
    stroke: adjustColor(labelBg, -30),
    strokeWidth: 1,
    selectable: false,
    evented: false,
    name: 'label-rect',
  });

  // 12. Brand text — SELECTABLE
  const brandText = new f.IText('MARKA ADINIZ', {
    left: 170,
    top: 163,
    originX: 'center',
    originY: 'center',
    fontFamily: 'Arial Black, sans-serif',
    fontWeight: '900',
    fontSize: 14,
    fill: labelTextColor,
    editable: true,
    name: 'brand-text',
  });

  // 13. Product name — SELECTABLE
  const productName = new f.IText('Yetişkin Bezi', {
    left: 170,
    top: 196,
    originX: 'center',
    originY: 'center',
    fontFamily: 'Georgia, serif',
    fontStyle: 'italic',
    fontSize: 14,
    fill: light,
    editable: true,
    name: 'product-name',
  });

  // 14. Bottom shadow
  const shadow = new f.Ellipse({
    left: 20,
    top: 302,
    rx: 150,
    ry: 12,
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
    waistAccent,
    legLeft,
    legRight,
    sheen,
    texLeft,
    texRight,
    labelRect,
    brandText,
    productName,
    shadow,
  ].forEach(obj => canvas.add(obj));
  canvas.renderAll();
}
