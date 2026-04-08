'use client';
import { useRef, useState } from 'react';
import { useEditorStore } from './store/editorStore';
import { CanvasEditor } from './CanvasEditor';
import { Toolbar } from './Toolbar';
import { SidePanel } from './SidePanel';
import { QuoteModal } from './QuoteModal';
import type { useFabricCanvas } from './hooks/useFabricCanvas';
import type { ProductId, ToolType } from './types/editor.types';

export default function PackageEditor() {
  const store = useEditorStore();
  const hookRef = useRef<ReturnType<typeof useFabricCanvas> | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedProps, setSelectedProps] = useState<ReturnType<
    ReturnType<typeof useFabricCanvas>['getActiveObjectProps']
  >>(null);

  const templateOpts = {
    pkgColor: store.pkgColor,
    labelBg: store.labelBg,
    labelTextColor: store.labelTextColor,
  };

  const handleToolChange = (tool: ToolType) => {
    store.setActiveTool(tool);
    hookRef.current?.setTool(tool);
  };

  const handlePkgColorChange = (color: string) => {
    store.setPkgColor(color);
    hookRef.current?.updateTemplateColors(color, store.labelBg, store.labelTextColor);
  };

  const handleLabelBgChange = (color: string) => {
    store.setLabelBg(color);
    hookRef.current?.updateObjects('label-rect', { fill: color, stroke: color });
  };

  const handleLabelTextColorChange = (color: string) => {
    store.setLabelTextColor(color);
    hookRef.current?.updateObjects('brand-text', { fill: color });
  };

  const handleLabelTextChange = (text: string) => {
    hookRef.current?.updateObjects('brand-text', { text });
  };

  const handleLogoUpload = (dataUrl: string) => {
    hookRef.current?.addImage(dataUrl);
  };

  const handleExport = () => {
    const png = hookRef.current?.exportPNG();
    if (!png) return;
    const link = document.createElement('a');
    link.download = `softpower-paket-tasarim-${Date.now()}.png`;
    link.href = png;
    link.click();
  };

  const handleBrushColor = (c: string) => {
    store.setBrushColor(c);
    hookRef.current?.setBrushColor(c);
  };

  const handleBrushSize = (s: number) => {
    store.setBrushSize(s);
    hookRef.current?.setBrushSize(s);
  };

  const handleObjectPropChange = (props: Record<string, unknown>) => {
    hookRef.current?.setActiveObjectProp(props);
    const fresh = hookRef.current?.getActiveObjectProps() ?? null;
    setSelectedProps(fresh);
  };

  const handleProductSelect = (p: ProductId) => {
    store.setProduct(p);
  };

  return (
    <div
      className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden flex flex-col"
      style={{ minHeight: 560 }}
    >
      {/* Toolbar */}
      <Toolbar
        activeTool={store.activeTool}
        onToolChange={handleToolChange}
        brushColor={store.brushColor}
        brushSize={store.brushSize}
        onBrushColor={handleBrushColor}
        onBrushSize={handleBrushSize}
        onLogoUpload={handleLogoUpload}
        onExport={handleExport}
        onQuote={() => setQuoteOpen(true)}
      />

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
        {/* Side panel */}
        <div className="lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto max-h-64 lg:max-h-none">
          <SidePanel
            pkgColor={store.pkgColor}
            labelBg={store.labelBg}
            labelTextColor={store.labelTextColor}
            activeTool={store.activeTool}
            selectedProps={selectedProps}
            onProductSelect={handleProductSelect}
            onPkgColorChange={handlePkgColorChange}
            onLabelBgChange={handleLabelBgChange}
            onLabelTextChange={handleLabelTextChange}
            onLabelTextColorChange={handleLabelTextColorChange}
            onObjectPropChange={handleObjectPropChange}
          />
        </div>

        {/* Canvas */}
        <CanvasEditor
          product={store.product}
          templateOpts={templateOpts}
          hookRef={hookRef}
        />
      </div>

      {/* Quote modal */}
      <QuoteModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        canvasPng={quoteOpen ? hookRef.current?.exportPNG() : undefined}
        product={store.product}
      />
    </div>
  );
}
