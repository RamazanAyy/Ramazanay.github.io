export type ProductId = 'wipe' | 'diaper' | 'pad' | 'adult';

export interface TemplateOptions {
  pkgColor: string;
  labelBg: string;
  labelTextColor: string;
}

export type ToolType = 'select' | 'text' | 'line' | 'arrow' | 'rect' | 'circle' | 'draw' | 'eraser';

export interface EditorState {
  product: ProductId | null;
  pkgColor: string;
  labelBg: string;
  labelTextColor: string;
  activeTool: ToolType;
  brushColor: string;
  brushSize: number;
  setProduct: (p: ProductId) => void;
  setPkgColor: (c: string) => void;
  setLabelBg: (c: string) => void;
  setLabelTextColor: (c: string) => void;
  setActiveTool: (t: ToolType) => void;
  setBrushColor: (c: string) => void;
  setBrushSize: (s: number) => void;
}
