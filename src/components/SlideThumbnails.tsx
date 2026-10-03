/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Plus,
  ChevronUp,
  ChevronDown,
  Copy,
  Trash2,
  LayoutTemplate,
  Sparkles,
  BarChart2,
  Columns2,
  Grid3X3,
  GitCommit,
  Quote,
  SlidersHorizontal,
  CheckCircle2,
  FileText,
  Table,
} from 'lucide-react';
import {
  SlideData,
  SlideLayout,
  LAYOUT_DEFINITIONS,
  THEME_CONFIGS,
  SlideTheme,
} from '../types/presentation';

interface SlideThumbnailsProps {
  slides: SlideData[];
  activeSlideIndex: number;
  deckTheme: SlideTheme;
  onSelectSlide: (index: number) => void;
  onAddSlide: (layout: SlideLayout) => void;
  onDuplicateSlide: (index: number) => void;
  onDeleteSlide: (index: number) => void;
  onMoveSlideUp: (index: number) => void;
  onMoveSlideDown: (index: number) => void;
}

const LAYOUT_ICONS: Record<SlideLayout, React.FC<{ className?: string }>> = {
  title: LayoutTemplate,
  impact: Sparkles,
  metrics: BarChart2,
  split: Columns2,
  features: Grid3X3,
  timeline: GitCommit,
  quote: Quote,
  chart: SlidersHorizontal,
  table: Table,
  closing: CheckCircle2,
  blank: FileText,
};

export const SlideThumbnails: React.FC<SlideThumbnailsProps> = ({
  slides,
  activeSlideIndex,
  deckTheme,
  onSelectSlide,
  onAddSlide,
  onDuplicateSlide,
  onDeleteSlide,
  onMoveSlideUp,
  onMoveSlideDown,
}) => {
  const [showLayoutMenu, setShowLayoutMenu] = useState(false);

  return (
    <aside className="w-64 border-r border-neutral-800 bg-neutral-950 flex flex-col h-full select-none shrink-0 no-print">
      {/* Header with New Slide Button */}
      <div className="p-3 border-b border-neutral-800 flex items-center justify-between gap-2">
        <div className="text-xs font-semibold text-neutral-400 tracking-wider uppercase">
          Diapositivas ({slides.length})
        </div>

        <div className="relative">
          <button
            onClick={() => setShowLayoutMenu(!showLayoutMenu)}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Añadir</span>
          </button>

          {showLayoutMenu && (
            <div className="absolute right-0 top-full mt-1 w-64 bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl p-2 z-50 max-h-96 overflow-y-auto custom-scrollbar">
              <div className="text-[10px] font-semibold text-neutral-400 px-2 py-1 tracking-wider uppercase">
                Selecciona un diseño
              </div>
              {LAYOUT_DEFINITIONS.map((def) => {
                const Icon = LAYOUT_ICONS[def.id] || FileText;
                return (
                  <button
                    key={def.id}
                    onClick={() => {
                      onAddSlide(def.id);
                      setShowLayoutMenu(false);
                    }}
                    className="w-full flex items-start gap-2.5 p-2 rounded-md hover:bg-neutral-800 transition-colors text-left group"
                  >
                    <div className="p-1.5 rounded bg-neutral-800 group-hover:bg-amber-400/20 text-neutral-400 group-hover:text-amber-400 transition-colors shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-neutral-200 group-hover:text-white truncate">
                        {def.title}
                      </div>
                      <div className="text-[10px] text-neutral-400 leading-tight line-clamp-1">
                        {def.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Slide Thumbnails Scrollable List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2.5">
        {slides.map((slide, index) => {
          const isActive = index === activeSlideIndex;
          const Icon = LAYOUT_ICONS[slide.layout] || FileText;
          const activeThemeKey = slide.themeOverride || deckTheme;
          const themeConf = THEME_CONFIGS[activeThemeKey] || THEME_CONFIGS['dark-slate'];

          return (
            <div
              key={slide.id}
              onClick={() => onSelectSlide(index)}
              className={`group relative rounded-lg p-2 transition-all cursor-pointer border ${
                isActive
                  ? 'bg-neutral-900/90 border-amber-400/80 shadow-md ring-1 ring-amber-400/40'
                  : 'bg-neutral-900/30 hover:bg-neutral-900/70 border-neutral-800/80 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className={`text-[11px] font-mono font-medium ${
                    isActive ? 'text-amber-400' : 'text-neutral-400'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className="text-[10px] text-neutral-400 flex items-center gap-1 truncate">
                  <Icon className="w-3 h-3 text-neutral-400" />
                  <span className="truncate">
                    {LAYOUT_DEFINITIONS.find((d) => d.id === slide.layout)?.title || 'Diapositiva'}
                  </span>
                </span>
              </div>

              {/* 16:9 Thumbnail Preview Box */}
              <div
                className={`w-full aspect-video rounded overflow-hidden p-2 flex flex-col justify-between border ${themeConf.bgClass} ${themeConf.borderClass} relative`}
              >
                {/* Mini content representation */}
                <div className="space-y-0.5">
                  {slide.tag && (
                    <div className="text-[6px] text-amber-400/80 uppercase tracking-wider truncate">
                      {slide.tag}
                    </div>
                  )}
                  <div
                    className={`text-[8px] font-bold truncate leading-tight ${themeConf.textPrimary}`}
                  >
                    {slide.title || 'Sin título'}
                  </div>
                  {slide.subtitle && (
                    <div className={`text-[6px] truncate ${themeConf.textSecondary}`}>
                      {slide.subtitle}
                    </div>
                  )}
                </div>

                {/* Layout micro-indicator at bottom */}
                <div className="flex items-center justify-between pt-1">
                  <div className="h-0.5 w-6 bg-neutral-700 rounded" />
                  <div className="text-[6px] font-mono text-neutral-400">
                    {slide.notes ? '• notas' : ''}
                  </div>
                </div>
              </div>

              {/* Slide Actions Hover Bar */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end gap-1 mt-1.5 pt-1 border-t border-neutral-800/60">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveSlideUp(index);
                  }}
                  disabled={index === 0}
                  className="p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 disabled:opacity-30 disabled:hover:bg-transparent"
                  title="Mover arriba"
                >
                  <ChevronUp className="w-3 h-3" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveSlideDown(index);
                  }}
                  disabled={index === slides.length - 1}
                  className="p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 disabled:opacity-30 disabled:hover:bg-transparent"
                  title="Mover abajo"
                >
                  <ChevronDown className="w-3 h-3" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicateSlide(index);
                  }}
                  className="p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-amber-300"
                  title="Duplicar diapositiva"
                >
                  <Copy className="w-3 h-3" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSlide(index);
                  }}
                  disabled={slides.length <= 1}
                  className="p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-rose-400 disabled:opacity-30 disabled:hover:bg-transparent"
                  title="Eliminar diapositiva"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer shortcut helper */}
      <div className="p-2.5 border-t border-neutral-800/80 text-[10px] text-neutral-400 text-center">
        Usa las flechas <span className="font-mono text-neutral-300">↑</span> /{' '}
        <span className="font-mono text-neutral-300">↓</span> para navegar
      </div>
    </aside>
  );
};
