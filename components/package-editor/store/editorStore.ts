import { create } from 'zustand';
import type { EditorState, ProductId, ToolType } from '../types/editor.types';

export const useEditorStore = create<EditorState>((set) => ({
  product: null,
  pkgColor: '#1a5fa8',
  labelBg: '#ffffff',
  labelTextColor: '#0d2d5e',
  activeTool: 'select',
  brushColor: '#111827',
  brushSize: 3,

  setProduct: (p: ProductId) => set({ product: p }),
  setPkgColor: (c: string) => set({ pkgColor: c }),
  setLabelBg: (c: string) => set({ labelBg: c }),
  setLabelTextColor: (c: string) => set({ labelTextColor: c }),
  setActiveTool: (t: ToolType) => set({ activeTool: t }),
  setBrushColor: (c: string) => set({ brushColor: c }),
  setBrushSize: (s: number) => set({ brushSize: s }),
}));
