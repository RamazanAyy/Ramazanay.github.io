'use client';
import { useEffect, useRef, useCallback } from 'react';
import type { Canvas as FabricCanvas, IEvent } from 'fabric/fabric-impl';
import type { ToolType, TemplateOptions } from '../types/editor.types';

export function useFabricCanvas(canvasId: string) {
  const canvasRef = useRef<FabricCanvas | null>(null);
  const toolRef = useRef<ToolType>('select');
  const isDrawingShapeRef = useRef(false);
  const shapeStartRef = useRef<{ x: number; y: number } | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activeShapeRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fabricInstanceRef = useRef<typeof import('fabric').fabric | null>(null);

  useEffect(() => {
    const init = async () => {
      const { fabric } = await import('fabric');
      fabricInstanceRef.current = fabric;

      // Make fabric available on window for templates
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).fabric = fabric;

      const canvas = new fabric.Canvas(canvasId, {
        width: 340,
        height: 400,
        backgroundColor: '#f0f4f8',
        selection: true,
        preserveObjectStacking: true,
      });
      canvasRef.current = canvas;

      // Mouse down handler
      canvas.on('mouse:down', (opt: IEvent) => {
        const pointer = canvas.getPointer(opt.e as MouseEvent);
        const tool = toolRef.current;

        if (tool === 'text') {
          const txt = new fabric.IText('Metin ekleyin', {
            left: pointer.x,
            top: pointer.y,
            fontFamily: 'Arial',
            fontSize: 18,
            fill: '#111827',
            editable: true,
          });
          canvas.add(txt);
          canvas.setActiveObject(txt);
          txt.enterEditing();
          txt.selectAll();
          toolRef.current = 'select';
          canvas.defaultCursor = 'default';
          canvas.selection = true;
          return;
        }

        if (tool === 'line' || tool === 'arrow') {
          isDrawingShapeRef.current = true;
          shapeStartRef.current = { x: pointer.x, y: pointer.y };
          const line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
            stroke: '#111827',
            strokeWidth: 2,
            selectable: false,
            evented: false,
          });
          activeShapeRef.current = line;
          canvas.add(line);
          return;
        }

        if (tool === 'rect') {
          isDrawingShapeRef.current = true;
          shapeStartRef.current = { x: pointer.x, y: pointer.y };
          const rect = new fabric.Rect({
            left: pointer.x,
            top: pointer.y,
            width: 1,
            height: 1,
            fill: 'transparent',
            stroke: '#0EA5E9',
            strokeWidth: 2,
            rx: 4,
            ry: 4,
          });
          activeShapeRef.current = rect;
          canvas.add(rect);
          canvas.selection = false;
          return;
        }

        if (tool === 'circle') {
          isDrawingShapeRef.current = true;
          shapeStartRef.current = { x: pointer.x, y: pointer.y };
          const circle = new fabric.Ellipse({
            left: pointer.x,
            top: pointer.y,
            rx: 1,
            ry: 1,
            fill: 'transparent',
            stroke: '#0EA5E9',
            strokeWidth: 2,
          });
          activeShapeRef.current = circle;
          canvas.add(circle);
          canvas.selection = false;
          return;
        }

        if (tool === 'eraser') {
          const target = canvas.findTarget(opt.e as MouseEvent, false);
          if (
            target &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            !String((target as any).name ?? '').match(
              /^(body|cap|tab|shadow|label-rect|snap|top-|left-|right-|sheen|waist|leg|wing|flap)/
            )
          ) {
            canvas.remove(target);
            canvas.discardActiveObject();
            canvas.renderAll();
          }
        }
      });

      canvas.on('mouse:move', (opt: IEvent) => {
        if (!isDrawingShapeRef.current || !activeShapeRef.current || !shapeStartRef.current) return;
        const pointer = canvas.getPointer(opt.e as MouseEvent);
        const shape = activeShapeRef.current;
        const { x: sx, y: sy } = shapeStartRef.current;
        const tool = toolRef.current;

        if (tool === 'line' || tool === 'arrow') {
          shape.set({ x2: pointer.x, y2: pointer.y });
        } else if (tool === 'rect') {
          shape.set({
            width: Math.abs(pointer.x - sx),
            height: Math.abs(pointer.y - sy),
            left: Math.min(pointer.x, sx),
            top: Math.min(pointer.y, sy),
          });
        } else if (tool === 'circle') {
          const rx = Math.abs(pointer.x - sx) / 2;
          const ry = Math.abs(pointer.y - sy) / 2;
          shape.set({
            rx,
            ry,
            left: Math.min(pointer.x, sx),
            top: Math.min(pointer.y, sy),
          });
        }
        canvas.renderAll();
      });

      canvas.on('mouse:up', (opt: IEvent) => {
        if (!isDrawingShapeRef.current || !activeShapeRef.current) return;
        const pointer = canvas.getPointer(opt.e as MouseEvent);
        const shape = activeShapeRef.current;
        const tool = toolRef.current;
        const fabricInst = fabricInstanceRef.current;

        if (tool === 'arrow' && shapeStartRef.current && fabricInst) {
          shape.set({ selectable: true, evented: true });
          const angle =
            (Math.atan2(
              pointer.y - shapeStartRef.current.y,
              pointer.x - shapeStartRef.current.x
            ) *
              180) /
            Math.PI;
          const arrowHead = new fabricInst.Triangle({
            left: pointer.x,
            top: pointer.y,
            width: 12,
            height: 14,
            fill: '#111827',
            angle: angle + 90,
            originX: 'center',
            originY: 'center',
          });
          canvas.add(arrowHead);
        } else {
          shape.set({ selectable: true, evented: true });
        }

        isDrawingShapeRef.current = false;
        activeShapeRef.current = null;
        shapeStartRef.current = null;
        canvas.selection = true;
        toolRef.current = 'select';
        canvas.defaultCursor = 'default';
        canvas.renderAll();
      });

      // Keyboard delete
      const onKeyDown = (e: KeyboardEvent) => {
        const tag = (document.activeElement as HTMLElement)?.tagName;
        if (
          (e.key === 'Delete' || e.key === 'Backspace') &&
          tag !== 'INPUT' &&
          tag !== 'TEXTAREA'
        ) {
          const active = canvas.getActiveObjects();
          const safe = active.filter(
            o =>
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              !String((o as any).name ?? '').match(
                /^(body|cap|tab|shadow|label-rect|snap|top-|left-|right-|sheen|waist|leg|wing|flap)/
              )
          );
          if (safe.length) {
            canvas.remove(...safe);
            canvas.discardActiveObject();
            canvas.renderAll();
          }
        }
      };
      window.addEventListener('keydown', onKeyDown);

      return () => {
        window.removeEventListener('keydown', onKeyDown);
        try {
          canvas.dispose();
        } catch {
          // Ignore disposal errors (React Strict Mode / re-render race conditions
          // can cause the canvas DOM node to already be detached).
        }
      };
    };

    const cleanupPromise = init();
    return () => {
      cleanupPromise.then(fn => fn && fn()).catch(() => {});
    };
  }, [canvasId]);

  const setTool = useCallback((tool: ToolType) => {
    toolRef.current = tool;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.isDrawingMode = tool === 'draw';
    canvas.selection = tool === 'select';
    canvas.defaultCursor =
      tool === 'text'
        ? 'text'
        : tool === 'eraser'
        ? 'crosshair'
        : tool === 'line' || tool === 'arrow' || tool === 'rect' || tool === 'circle'
        ? 'crosshair'
        : 'default';
  }, []);

  const loadTemplate = useCallback((product: string, opts: TemplateOptions) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    import('../templates').then(({ templates }) => {
      templates[product]?.(canvas, opts);
    });
  }, []);

  const updateObjects = useCallback((name: string, props: Record<string, unknown>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.getObjects().forEach(obj => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((obj as any).name === name) obj.set(props as any);
    });
    canvas.renderAll();
  }, []);

  const updateTemplateColors = useCallback(
    (pkgColor: string, labelBg: string, labelTextColor: string) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      import('../templates/colorUtils').then(({ adjustColor }) => {
        const dark = adjustColor(pkgColor, -40);
        const darkest = adjustColor(pkgColor, -70);
        const light = adjustColor(pkgColor, 60);
        canvas.getObjects().forEach(obj => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const name = String((obj as any).name ?? '');
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (name === 'body') obj.set({ fill: pkgColor, stroke: dark } as any);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (name === 'left-panel') obj.set({ fill: darkest } as any);
          if (name === 'right-panel' || name === 'top-seal')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            obj.set({ fill: dark } as any);
          if (name === 'sheen' || name === 'waistband')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            obj.set({ fill: light } as any);
          if (name === 'label-rect')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            obj.set({ fill: labelBg, stroke: adjustColor(labelBg, -30) } as any);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (name === 'brand-text') obj.set({ fill: labelTextColor } as any);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (name === 'product-name') obj.set({ fill: light } as any);
          if (name === 'tab-left' || name === 'tab-right')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            obj.set({ fill: dark } as any);
        });
        canvas.renderAll();
      });
    },
    []
  );

  const addImage = useCallback((dataUrl: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    import('fabric').then(({ fabric }) => {
      fabric.Image.fromURL(dataUrl, img => {
        img.scaleToWidth(80);
        img.set({
          left: 170,
          top: 150,
          originX: 'center',
          originY: 'center',
          name: 'user-logo',
        });
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      });
    });
  }, []);

  const exportPNG = useCallback((): string | undefined => {
    return canvasRef.current?.toDataURL({ format: 'png', multiplier: 2 });
  }, []);

  const setBrushColor = useCallback((color: string) => {
    const canvas = canvasRef.current;
    if (canvas?.freeDrawingBrush) canvas.freeDrawingBrush.color = color;
  }, []);

  const setBrushSize = useCallback((size: number) => {
    const canvas = canvasRef.current;
    if (canvas?.freeDrawingBrush) canvas.freeDrawingBrush.width = size;
  }, []);

  const getActiveObjectProps = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const obj = canvas.getActiveObject();
    if (!obj) return null;
    return {
      type: obj.type,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fill: (obj as any).fill as string | undefined,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      stroke: (obj as any).stroke as string | undefined,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      strokeWidth: (obj as any).strokeWidth as number | undefined,
      opacity: obj.opacity,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fontFamily: (obj as any).fontFamily as string | undefined,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fontSize: (obj as any).fontSize as number | undefined,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fontWeight: (obj as any).fontWeight as string | undefined,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fontStyle: (obj as any).fontStyle as string | undefined,
    };
  }, []);

  const setActiveObjectProp = useCallback((props: Record<string, unknown>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const obj = canvas.getActiveObject();
    if (obj) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      obj.set(props as any);
      canvas.renderAll();
    }
  }, []);

  const onSelectionChange = useCallback((cb: () => void) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.on('selection:created', cb);
    canvas.on('selection:updated', cb);
    canvas.on('selection:cleared', cb);
    return () => {
      canvas.off('selection:created', cb);
      canvas.off('selection:updated', cb);
      canvas.off('selection:cleared', cb);
    };
  }, []);

  return {
    canvasRef,
    setTool,
    loadTemplate,
    updateObjects,
    updateTemplateColors,
    addImage,
    exportPNG,
    setBrushColor,
    setBrushSize,
    getActiveObjectProps,
    setActiveObjectProp,
    onSelectionChange,
  };
}
