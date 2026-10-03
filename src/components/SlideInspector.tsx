/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  LayoutTemplate,
  Palette,
  Sparkles,
  MessageSquareText,
  ChevronRight,
  ChevronLeft,
  Layers,
  Sliders,
  Image as ImageIcon,
  Trash2,
} from 'lucide-react';
import {
  SlideData,
  SlideLayout,
  SlideTheme,
  SlideTransition,
  LAYOUT_DEFINITIONS,
  THEME_CONFIGS,
} from '../types/presentation';

interface SlideInspectorProps {
  slide: SlideData;
  deckTheme: SlideTheme;
  onUpdateSlide: (updates: Partial<SlideData>) => void;
}

export const SlideInspector: React.FC<SlideInspectorProps> = ({
  slide,
  deckTheme,
  onUpdateSlide,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (isCollapsed) {
    return (
      <div className="border-l border-neutral-800 bg-neutral-950 p-2 flex flex-col items-center justify-start shrink-0 no-print">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors"
          title="Abrir panel de ajustes"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <aside className="w-72 border-l border-neutral-800 bg-neutral-950 flex flex-col h-full select-none shrink-0 no-print overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-neutral-800 flex items-center justify-between">
        <div className="text-xs font-semibold text-neutral-400 tracking-wider uppercase flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-amber-400" />
          <span>Ajustes de Diapositiva</span>
        </div>
        <button
          onClick={() => setIsCollapsed(true)}
          className="p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors"
          title="Minimizar panel"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6 text-xs">
        {/* 1. LAYOUT SELECTOR */}
        <div className="space-y-2">
          <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
            Estructura / Diseño
          </label>
          <select
            value={slide.layout}
            onChange={(e) => onUpdateSlide({ layout: e.target.value as SlideLayout })}
            className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1.5 text-neutral-200 text-xs outline-hidden focus:border-amber-400"
          >
            {LAYOUT_DEFINITIONS.map((def) => (
              <option key={def.id} value={def.id}>
                {def.title}
              </option>
            ))}
          </select>
          <p className="text-[10px] text-neutral-500 leading-tight">
            {LAYOUT_DEFINITIONS.find((d) => d.id === slide.layout)?.description}
          </p>
        </div>

        {/* 2. BACKGROUND & THEME OVERRIDE */}
        <div className="space-y-2">
          <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider flex items-center justify-between">
            <span>Tema de Fondo</span>
            {slide.themeOverride && (
              <button
                onClick={() => onUpdateSlide({ themeOverride: undefined })}
                className="text-[10px] text-amber-400 hover:underline capitalize"
              >
                Usar tema global
              </button>
            )}
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {(Object.keys(THEME_CONFIGS) as SlideTheme[]).map((themeKey) => {
              const conf = THEME_CONFIGS[themeKey];
              const isSelected = (slide.themeOverride || deckTheme) === themeKey;
              return (
                <button
                  key={themeKey}
                  onClick={() => onUpdateSlide({ themeOverride: themeKey })}
                  className={`p-2 rounded border text-left transition-colors flex items-center justify-between ${
                    isSelected
                      ? 'border-amber-400 bg-amber-400/10 text-white font-medium'
                      : 'border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-neutral-300'
                  }`}
                >
                  <span className="truncate text-[11px]">{conf.name}</span>
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      themeKey === 'warm-editorial'
                        ? 'bg-stone-300'
                        : themeKey === 'clean-white'
                        ? 'bg-white'
                        : themeKey === 'obsidian-emerald'
                        ? 'bg-emerald-400'
                        : themeKey === 'midnight-blue'
                        ? 'bg-sky-400'
                        : themeKey === 'sunset-gradient'
                        ? 'bg-rose-400'
                        : 'bg-neutral-800'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. SLIDE TRANSITION */}
        <div className="space-y-2">
          <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
            Efecto de Transición
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: 'slide', label: 'Desplazar' },
              { id: 'fade', label: 'Desvanecer' },
              { id: 'zoom', label: 'Zoom Suave' },
              { id: 'none', label: 'Instantáneo' },
            ].map((t) => {
              const activeTransition = slide.transition || 'slide';
              const isSelected = activeTransition === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => onUpdateSlide({ transition: t.id as SlideTransition })}
                  className={`px-2 py-1.5 rounded text-[11px] text-center border transition-colors ${
                    isSelected
                      ? 'border-amber-400 bg-amber-400/10 text-amber-300 font-medium'
                      : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200'
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. SUPPORTING IMAGE (IMAGEN DE APOYO) */}
        <div className="space-y-2 pt-2 border-t border-neutral-800">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Imagen de Apoyo</span>
            </label>
            {slide.imageUrl && (
              <button
                onClick={() => onUpdateSlide({ imageUrl: undefined, imageAlt: undefined })}
                className="text-[10px] text-rose-400 hover:underline flex items-center gap-1"
                title="Quitar imagen de esta diapositiva"
              >
                <Trash2 className="w-3 h-3" />
                <span>Quitar</span>
              </button>
            )}
          </div>

          <p className="text-[10px] text-neutral-500">
            Añade imágenes corporativas de MIA FOODS o introduce una URL.
          </p>

          {/* Quick preset selector for MIA FOODS assets */}
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {[
              {
                name: 'Panadería Artesanal',
                path: '/src/assets/images/mia_bakery_hero_1791039490818.jpg',
              },
              {
                name: 'Catálogo Productos',
                path: '/src/assets/images/mia_products_showcase_1791039505030.jpg',
              },
              {
                name: 'Fábrica & Hornos',
                path: '/src/assets/images/mia_facility_line_1791039519144.jpg',
              },
              {
                name: 'Logística B2B',
                path: '/src/assets/images/mia_b2b_distribution_1791039529720.jpg',
              },
            ].map((preset, idx) => (
              <button
                key={idx}
                onClick={() =>
                  onUpdateSlide({
                    imageUrl: preset.path,
                    imageAlt: `MIA FOODS · ${preset.name}`,
                  })
                }
                className={`p-1.5 rounded border text-left text-[10px] transition-colors truncate flex items-center gap-1.5 ${
                  slide.imageUrl === preset.path
                    ? 'border-amber-400 bg-amber-400/10 text-amber-300 font-medium'
                    : 'border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-neutral-300'
                }`}
                title={preset.name}
              >
                <img
                  src={preset.path}
                  alt={preset.name}
                  referrerPolicy="no-referrer"
                  className="w-4 h-4 rounded object-cover shrink-0"
                />
                <span className="truncate">{preset.name}</span>
              </button>
            ))}
          </div>

          <div className="pt-2 space-y-1.5">
            <input
              type="text"
              value={slide.imageUrl || ''}
              onChange={(e) => onUpdateSlide({ imageUrl: e.target.value })}
              placeholder="Ruta o URL de la imagen..."
              className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-neutral-200 placeholder:text-neutral-600 outline-hidden focus:border-amber-400"
            />
            {slide.imageUrl && (
              <input
                type="text"
                value={slide.imageAlt || ''}
                onChange={(e) => onUpdateSlide({ imageAlt: e.target.value })}
                placeholder="Pie de foto / Descripción..."
                className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1 text-xs text-neutral-300 placeholder:text-neutral-600 outline-hidden focus:border-amber-400"
              />
            )}
          </div>
        </div>

        {/* 5. SPEAKER NOTES (NOTAS DEL ORADOR) */}
        <div className="space-y-2 pt-2 border-t border-neutral-800">
          <label className="text-[11px] font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
            <MessageSquareText className="w-3.5 h-3.5 text-amber-400" />
            <span>Notas del Orador</span>
          </label>
          <p className="text-[10px] text-neutral-500">
            Anotaciones privadas visibles solo para el ponente durante la presentación.
          </p>
          <textarea
            value={slide.notes || ''}
            onChange={(e) => onUpdateSlide({ notes: e.target.value })}
            rows={5}
            placeholder="Escribe recordatorios, puntos clave para hablar o datos adicionales..."
            className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-xs text-neutral-200 placeholder:text-neutral-600 outline-hidden focus:border-amber-400 custom-scrollbar resize-none leading-relaxed"
          />
        </div>
      </div>

      {/* Footer shortcut helper */}
      <div className="p-3 border-t border-neutral-800 bg-neutral-950/80 text-[10px] text-neutral-500 leading-tight">
        Haz clic directo en cualquier texto de la diapositiva para editarlo al instante.
      </div>
    </aside>
  );
};
