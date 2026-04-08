'use client';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import type { ToolType } from './types/editor.types';

interface ToolbarProps {
  activeTool: ToolType;
  onToolChange: (t: ToolType) => void;
  brushColor: string;
  brushSize: number;
  onBrushColor: (c: string) => void;
  onBrushSize: (s: number) => void;
  onLogoUpload: (dataUrl: string) => void;
  onExport: () => void;
  onQuote: () => void;
}

const TOOLS: { id: ToolType; label: string; icon: string }[] = [
  { id: 'select', label: 'Seç', icon: '↖' },
  { id: 'text', label: 'Metin', icon: 'T' },
  { id: 'line', label: 'Çizgi', icon: '—' },
  { id: 'arrow', label: 'Ok', icon: '→' },
  { id: 'rect', label: 'Kutu', icon: '▭' },
  { id: 'circle', label: 'Daire', icon: '○' },
  { id: 'draw', label: 'Kalem', icon: '✏' },
  { id: 'eraser', label: 'Silgi', icon: '⌫' },
];

export function Toolbar({
  activeTool,
  onToolChange,
  brushColor,
  brushSize,
  onBrushColor,
  onBrushSize,
  onLogoUpload,
  onExport,
  onQuote,
}: ToolbarProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) {
        alert('Dosya boyutu 2MB\'ı geçemez.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          onLogoUpload(result);
        }
      };
      reader.readAsDataURL(file);
    },
    [onLogoUpload]
  );

  const { getRootProps, getInputProps, open: openFileDialog } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/svg+xml': ['.svg'],
    },
    maxSize: 2 * 1024 * 1024,
    noClick: true,
    noKeyboard: true,
    multiple: false,
  });

  return (
    <div className="flex flex-wrap items-center gap-1 bg-white border-b border-gray-200 px-3 py-2">
      {/* Tool buttons */}
      <div className="flex flex-wrap gap-1 flex-1">
        {TOOLS.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onToolChange(tool.id)}
            title={tool.label}
            className={`
              flex flex-col items-center justify-center w-12 h-10 rounded text-xs font-medium transition-colors
              ${
                activeTool === tool.id
                  ? 'bg-blue-100 border border-blue-400 text-blue-700'
                  : 'bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100'
              }
            `}
          >
            <span className="text-base leading-none">{tool.icon}</span>
            <span className="mt-0.5 text-[10px]">{tool.label}</span>
          </button>
        ))}

        {/* Brush controls — shown only when draw tool is active */}
        {activeTool === 'draw' && (
          <div className="flex items-center gap-2 ml-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded">
            <label className="text-xs text-amber-700 font-medium">Renk</label>
            <input
              type="color"
              value={brushColor}
              onChange={(e) => onBrushColor(e.target.value)}
              className="w-7 h-7 rounded cursor-pointer border border-amber-300"
              title="Fırça rengi"
            />
            <label className="text-xs text-amber-700 font-medium">Kalınlık</label>
            <input
              type="range"
              min={1}
              max={30}
              value={brushSize}
              onChange={(e) => onBrushSize(Number(e.target.value))}
              className="w-20"
              title="Fırça kalınlığı"
            />
            <span className="text-xs text-amber-700 w-6 text-center">{brushSize}</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-gray-200 mx-1 hidden sm:block" />

      {/* Right-side action buttons */}
      <div className="flex items-center gap-2" {...getRootProps()}>
        <input {...getInputProps()} />

        {/* Logo upload */}
        <button
          onClick={openFileDialog}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-teal-500 hover:bg-teal-600 text-white transition-colors"
          title="PNG, JPG veya SVG yükleyin (maks. 2MB)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          Logo Yükle
        </button>

        {/* Export PNG */}
        <button
          onClick={onExport}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          title="Tasarımı PNG olarak indir"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          PNG İndir
        </button>

        {/* Quote button */}
        <button
          onClick={onQuote}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white transition-all shadow-sm hover:shadow-md"
          style={{
            background: 'linear-gradient(135deg, #1a5fa8, #0d2d5e)',
          }}
          title="Teklif talebi oluştur"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Teklif Al
        </button>
      </div>
    </div>
  );
}
