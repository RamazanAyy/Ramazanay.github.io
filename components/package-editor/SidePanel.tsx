'use client';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import type { ProductId, ToolType } from './types/editor.types';
import type { useFabricCanvas } from './hooks/useFabricCanvas';

interface ProductCard {
  id: ProductId;
  label: string;
  icon: string;
}

const PRODUCTS: ProductCard[] = [
  { id: 'wipe', label: 'Islak Mendil', icon: '🧴' },
  { id: 'diaper', label: 'Bebek Bezi', icon: '👶' },
  { id: 'pad', label: 'Hijyen Pedi', icon: '🌸' },
  { id: 'adult', label: 'Yetişkin Bezi', icon: '🏥' },
];

const LABEL_BG_SWATCHES = ['#ffffff', '#f0f4f8', '#fffbe6', '#f0fff4', '#fff0f5', '#0d2d5e'];
const TEXT_COLOR_SWATCHES = ['#0d2d5e', '#111827', '#ffffff', '#1a5fa8', '#b91c1c', '#065f46'];

const FONT_FAMILIES = [
  'Arial',
  'Arial Black',
  'Georgia',
  'Times New Roman',
  'Courier New',
  'Verdana',
  'Trebuchet MS',
];

interface SidePanelProps {
  pkgColor: string;
  labelBg: string;
  labelTextColor: string;
  activeTool: ToolType;
  selectedProps: ReturnType<ReturnType<typeof useFabricCanvas>['getActiveObjectProps']>;
  onProductSelect: (p: ProductId) => void;
  onPkgColorChange: (c: string) => void;
  onLabelBgChange: (c: string) => void;
  onLabelTextChange: (text: string) => void;
  onLabelTextColorChange: (c: string) => void;
  onObjectPropChange: (props: Record<string, unknown>) => void;
}

export function SidePanel({
  pkgColor,
  labelBg,
  labelTextColor,
  selectedProps,
  onProductSelect,
  onPkgColorChange,
  onLabelBgChange,
  onLabelTextChange,
  onLabelTextColorChange,
  onObjectPropChange,
}: SidePanelProps) {
  const [labelBgHex, setLabelBgHex] = useState(labelBg);
  const [brandText, setBrandText] = useState('MARKA ADINIZ');
  const [showPkgPicker, setShowPkgPicker] = useState(false);

  const handleLabelBgHex = (val: string) => {
    setLabelBgHex(val);
    if (/^#[0-9a-fA-F]{6}$/.test(val)) onLabelBgChange(val);
  };

  const isText = selectedProps?.type === 'i-text' || selectedProps?.type === 'text';
  const isShape =
    selectedProps?.type === 'rect' ||
    selectedProps?.type === 'ellipse' ||
    selectedProps?.type === 'line' ||
    selectedProps?.type === 'triangle' ||
    selectedProps?.type === 'path';

  return (
    <div className="bg-white p-4 space-y-6 overflow-y-auto h-full">
      {/* ── Ürün Seç ─────────────────────────────── */}
      <section>
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Ürün Seç</p>
        <div className="grid grid-cols-2 gap-2">
          {PRODUCTS.map((p) => (
            <button
              key={p.id}
              onClick={() => onProductSelect(p.id)}
              className="flex flex-col items-center gap-1 p-2 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors text-center"
            >
              <span className="text-2xl">{p.icon}</span>
              <span className="text-[11px] font-medium text-gray-700 leading-tight">{p.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Paket Rengi ──────────────────────────── */}
      <section>
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Paket Rengi</p>
        <div className="space-y-2">
          <div
            className="w-full h-10 rounded-lg border border-gray-200 cursor-pointer shadow-sm"
            style={{ backgroundColor: pkgColor }}
            onClick={() => setShowPkgPicker((v) => !v)}
            title="Paket rengi seç"
          />
          {showPkgPicker && (
            <div className="relative z-10">
              <HexColorPicker color={pkgColor} onChange={onPkgColorChange} className="w-full" />
              <button
                className="mt-2 w-full text-xs text-gray-500 hover:text-gray-800"
                onClick={() => setShowPkgPicker(false)}
              >
                Kapat
              </button>
            </div>
          )}
          <p className="text-xs text-gray-400 text-center font-mono">{pkgColor.toUpperCase()}</p>
        </div>
      </section>

      {/* ── Etiket ───────────────────────────────── */}
      <section>
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Etiket</p>

        {/* Label background */}
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1.5">Etiket arka plan</p>
          <div className="flex gap-1.5 flex-wrap mb-2">
            {LABEL_BG_SWATCHES.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setLabelBgHex(c);
                  onLabelBgChange(c);
                }}
                className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${
                  labelBg === c ? 'border-blue-500 scale-110' : 'border-gray-300'
                }`}
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>
          <input
            type="text"
            value={labelBgHex}
            onChange={(e) => handleLabelBgHex(e.target.value)}
            placeholder="#ffffff"
            maxLength={7}
            className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 font-mono focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>

        {/* Brand text input */}
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1.5">Marka yazısı</p>
          <input
            type="text"
            value={brandText}
            onChange={(e) => {
              const v = e.target.value.slice(0, 30);
              setBrandText(v);
              onLabelTextChange(v);
            }}
            placeholder="Marka adınızı girin"
            maxLength={30}
            className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <p className="text-right text-[10px] text-gray-400 mt-0.5">{brandText.length}/30</p>
        </div>

        {/* Text color */}
        <div>
          <p className="text-xs text-gray-500 mb-1.5">Yazı rengi</p>
          <div className="flex gap-1.5 flex-wrap">
            {TEXT_COLOR_SWATCHES.map((c) => (
              <button
                key={c}
                onClick={() => onLabelTextColorChange(c)}
                className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${
                  labelTextColor === c ? 'border-blue-500 scale-110' : 'border-gray-300'
                }`}
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Seçili Nesne ─────────────────────────── */}
      {selectedProps && (
        <section>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
            Seçili Nesne
          </p>

          {/* Text-specific controls */}
          {isText && (
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-500 mb-1">Yazı tipi</p>
                <select
                  value={selectedProps.fontFamily ?? 'Arial'}
                  onChange={(e) => onObjectPropChange({ fontFamily: e.target.value })}
                  className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400"
                >
                  {FONT_FAMILIES.map((f) => (
                    <option key={f} value={f} style={{ fontFamily: f }}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Yazı boyutu</p>
                <input
                  type="number"
                  min={8}
                  max={120}
                  value={selectedProps.fontSize ?? 18}
                  onChange={(e) => onObjectPropChange({ fontSize: Number(e.target.value) })}
                  className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    onObjectPropChange({
                      fontWeight:
                        selectedProps.fontWeight === 'bold' || selectedProps.fontWeight === '700' || selectedProps.fontWeight === '900'
                          ? 'normal'
                          : 'bold',
                    })
                  }
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                    selectedProps.fontWeight === 'bold' || selectedProps.fontWeight === '700' || selectedProps.fontWeight === '900'
                      ? 'bg-blue-100 border-blue-400 text-blue-700'
                      : 'bg-gray-50 border-gray-200 text-gray-600'
                  }`}
                >
                  K (Kalın)
                </button>
                <button
                  onClick={() =>
                    onObjectPropChange({
                      fontStyle: selectedProps.fontStyle === 'italic' ? 'normal' : 'italic',
                    })
                  }
                  className={`flex-1 py-1.5 rounded-lg text-xs italic border transition-colors ${
                    selectedProps.fontStyle === 'italic'
                      ? 'bg-blue-100 border-blue-400 text-blue-700'
                      : 'bg-gray-50 border-gray-200 text-gray-600'
                  }`}
                >
                  <em>İ (İtalik)</em>
                </button>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Metin rengi</p>
                <input
                  type="color"
                  value={
                    typeof selectedProps.fill === 'string' && /^#[0-9a-fA-F]{6}$/.test(selectedProps.fill)
                      ? selectedProps.fill
                      : '#111827'
                  }
                  onChange={(e) => onObjectPropChange({ fill: e.target.value })}
                  className="w-full h-9 rounded-lg border border-gray-200 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Shape-specific controls */}
          {isShape && (
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-500 mb-1">Dolgu rengi</p>
                <input
                  type="color"
                  value={
                    typeof selectedProps.fill === 'string' && /^#[0-9a-fA-F]{6}$/.test(selectedProps.fill)
                      ? selectedProps.fill
                      : '#0EA5E9'
                  }
                  onChange={(e) => onObjectPropChange({ fill: e.target.value })}
                  className="w-full h-9 rounded-lg border border-gray-200 cursor-pointer"
                />
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Kenar rengi</p>
                <input
                  type="color"
                  value={
                    typeof selectedProps.stroke === 'string' && /^#[0-9a-fA-F]{6}$/.test(selectedProps.stroke)
                      ? selectedProps.stroke
                      : '#111827'
                  }
                  onChange={(e) => onObjectPropChange({ stroke: e.target.value })}
                  className="w-full h-9 rounded-lg border border-gray-200 cursor-pointer"
                />
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Kenar kalınlığı</p>
                <input
                  type="number"
                  min={0}
                  max={20}
                  value={selectedProps.strokeWidth ?? 2}
                  onChange={(e) => onObjectPropChange({ strokeWidth: Number(e.target.value) })}
                  className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">
                  Saydamlık ({Math.round((selectedProps.opacity ?? 1) * 100)}%)
                </p>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={selectedProps.opacity ?? 1}
                  onChange={(e) => onObjectPropChange({ opacity: Number(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {/* Generic opacity for other objects */}
          {!isText && !isShape && (
            <div>
              <p className="text-xs text-gray-500 mb-1">
                Saydamlık ({Math.round((selectedProps.opacity ?? 1) * 100)}%)
              </p>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={selectedProps.opacity ?? 1}
                onChange={(e) => onObjectPropChange({ opacity: Number(e.target.value) })}
                className="w-full"
              />
            </div>
          )}
        </section>
      )}
    </div>
  );
}
