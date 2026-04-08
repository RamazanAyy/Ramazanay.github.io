'use client';
import { useEffect } from 'react';
import { useFabricCanvas } from './hooks/useFabricCanvas';
import type { TemplateOptions, ProductId } from './types/editor.types';

interface CanvasEditorProps {
  product: ProductId | null;
  templateOpts: TemplateOptions;
  hookRef: React.MutableRefObject<ReturnType<typeof useFabricCanvas> | null>;
}

export function CanvasEditor({ product, templateOpts, hookRef }: CanvasEditorProps) {
  const hook = useFabricCanvas('pkg-canvas');

  // Expose hook to parent
  useEffect(() => {
    hookRef.current = hook;
  }, [hook, hookRef]);

  // Load template when product changes
  useEffect(() => {
    if (product) {
      hook.loadTemplate(product, templateOpts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  // Update colors when they change
  useEffect(() => {
    hook.updateTemplateColors(
      templateOpts.pkgColor,
      templateOpts.labelBg,
      templateOpts.labelTextColor
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateOpts.pkgColor, templateOpts.labelBg, templateOpts.labelTextColor]);

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 overflow-hidden p-4">
      <div
        className="shadow-2xl rounded-xl overflow-hidden"
        style={{ transform: 'scale(1)', transformOrigin: 'center' }}
      >
        <canvas id="pkg-canvas" />
      </div>
    </div>
  );
}
