/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  CheckCircle,
  Circle,
  Quote as QuoteIcon,
  Maximize2,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  SlideData,
  SlideTheme,
  THEME_CONFIGS,
  MetricItem,
  ColumnItem,
  FeatureItem,
  TimelineNode,
  ChartDatum,
  TableRow,
} from '../types/presentation';
import { InlineEditable } from './InlineEditable';
import { renderSlideIcon } from '../utils/iconMap';

interface SlideCanvasProps {
  slide: SlideData;
  deckTheme: SlideTheme;
  aspectRatio: '16:9' | '4:3';
  slideIndex: number;
  totalSlides: number;
  onUpdateSlide: (updated: Partial<SlideData>) => void;
  onPresent: () => void;
}

export const SlideCanvas: React.FC<SlideCanvasProps> = ({
  slide,
  deckTheme,
  aspectRatio,
  slideIndex,
  totalSlides,
  onUpdateSlide,
  onPresent,
}) => {
  const [zoomScale, setZoomScale] = useState<number>(1);
  const activeThemeKey = slide.themeOverride || deckTheme;
  const theme = THEME_CONFIGS[activeThemeKey] || THEME_CONFIGS['dark-slate'];

  // Handlers for dynamic array items inside layouts
  const handleAddMetric = () => {
    const currentMetrics = slide.metrics || [];
    const newMetric: MetricItem = {
      id: 'm-' + Math.random().toString(36).substring(2, 7),
      label: 'Nuevo Indicador',
      value: '+50%',
      change: '+15% mejora',
      changePositive: true,
      description: 'Descripción breve de la métrica alcanzada.',
    };
    onUpdateSlide({ metrics: [...currentMetrics, newMetric] });
  };

  const handleDeleteMetric = (id: string) => {
    const currentMetrics = slide.metrics || [];
    if (currentMetrics.length <= 1) return;
    onUpdateSlide({ metrics: currentMetrics.filter((m) => m.id !== id) });
  };

  const handleUpdateMetric = (id: string, updates: Partial<MetricItem>) => {
    const currentMetrics = slide.metrics || [];
    onUpdateSlide({
      metrics: currentMetrics.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    });
  };

  const handleAddColumnItem = (colIndex: number) => {
    const currentCols = slide.columns ? [...slide.columns] : [];
    if (!currentCols[colIndex]) return;
    const col = { ...currentCols[colIndex] };
    col.items = [...col.items, 'Nuevo punto clave relevante'];
    currentCols[colIndex] = col;
    onUpdateSlide({ columns: currentCols });
  };

  const handleDeleteColumnItem = (colIndex: number, itemIndex: number) => {
    const currentCols = slide.columns ? [...slide.columns] : [];
    if (!currentCols[colIndex]) return;
    const col = { ...currentCols[colIndex] };
    col.items = col.items.filter((_, idx) => idx !== itemIndex);
    currentCols[colIndex] = col;
    onUpdateSlide({ columns: currentCols });
  };

  const handleUpdateColumnItem = (colIndex: number, itemIndex: number, text: string) => {
    const currentCols = slide.columns ? [...slide.columns] : [];
    if (!currentCols[colIndex]) return;
    const col = { ...currentCols[colIndex] };
    col.items = col.items.map((item, idx) => (idx === itemIndex ? text : item));
    currentCols[colIndex] = col;
    onUpdateSlide({ columns: currentCols });
  };

  const handleAddFeature = () => {
    const current = slide.features || [];
    const newFeat: FeatureItem = {
      id: 'f-' + Math.random().toString(36).substring(2, 7),
      title: 'Nuevo Pilar',
      description: 'Detalle sobre este componente o ventaja estratégica.',
      iconName: 'Sparkles',
    };
    onUpdateSlide({ features: [...current, newFeat] });
  };

  const handleDeleteFeature = (id: string) => {
    const current = slide.features || [];
    if (current.length <= 1) return;
    onUpdateSlide({ features: current.filter((f) => f.id !== id) });
  };

  const handleUpdateFeature = (id: string, updates: Partial<FeatureItem>) => {
    const current = slide.features || [];
    onUpdateSlide({
      features: current.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    });
  };

  const handleAddTimelineNode = () => {
    const current = slide.timeline || [];
    const newNode: TimelineNode = {
      id: 't-' + Math.random().toString(36).substring(2, 7),
      date: `Fase ${current.length + 1} · 2026`,
      title: 'Nuevo Hito Programado',
      description: 'Objetivos y entregables específicos de esta etapa.',
      completed: false,
    };
    onUpdateSlide({ timeline: [...current, newNode] });
  };

  const handleDeleteTimelineNode = (id: string) => {
    const current = slide.timeline || [];
    if (current.length <= 1) return;
    onUpdateSlide({ timeline: current.filter((t) => t.id !== id) });
  };

  const handleUpdateTimelineNode = (id: string, updates: Partial<TimelineNode>) => {
    const current = slide.timeline || [];
    onUpdateSlide({
      timeline: current.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    });
  };

  const handleUpdateChartDatum = (id: string, updates: Partial<ChartDatum>) => {
    const current = slide.chartData || [];
    onUpdateSlide({
      chartData: current.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    });
  };

  const handleAddTableRow = () => {
    const currentTable = slide.tableData || {
      headers: ['Dimensión', 'Métrica Clave', 'Herramienta de Medición', 'Meta a 9 Meses'],
      rows: [],
    };
    const newRow: TableRow = {
      id: 'row-' + Math.random().toString(36).substring(2, 7),
      dimension: 'Nueva Dimensión',
      metric: 'Métricas de rendimiento',
      tool: 'Herramienta analítica',
      goal: 'Meta cuantitativa',
    };
    onUpdateSlide({
      tableData: {
        ...currentTable,
        rows: [...currentTable.rows, newRow],
      },
    });
  };

  const handleDeleteTableRow = (id: string) => {
    const currentTable = slide.tableData;
    if (!currentTable || currentTable.rows.length <= 1) return;
    onUpdateSlide({
      tableData: {
        ...currentTable,
        rows: currentTable.rows.filter((r) => r.id !== id),
      },
    });
  };

  const handleUpdateTableRow = (id: string, updates: Partial<TableRow>) => {
    const currentTable = slide.tableData;
    if (!currentTable) return;
    onUpdateSlide({
      tableData: {
        ...currentTable,
        rows: currentTable.rows.map((r) => (r.id === id ? { ...r, ...updates } : r)),
      },
    });
  };

  const handleUpdateTableHeader = (index: number, text: string) => {
    const currentTable = slide.tableData;
    if (!currentTable) return;
    const newHeaders = [...currentTable.headers];
    newHeaders[index] = text;
    onUpdateSlide({
      tableData: {
        ...currentTable,
        headers: newHeaders,
      },
    });
  };

  return (
    <div className="flex-1 bg-neutral-900/60 flex flex-col h-full overflow-hidden select-none relative">
      {/* Canvas Top Bar Controls: Slide index, Zoom, Presentation Quick Launch */}
      <div className="h-10 px-4 border-b border-neutral-800 flex items-center justify-between text-xs text-neutral-400 bg-neutral-950/70 shrink-0 no-print">
        <div className="flex items-center gap-2">
          <span className="font-mono text-neutral-300 font-semibold">
            {slideIndex + 1} / {totalSlides}
          </span>
          <span className="text-neutral-600">·</span>
          <span className="text-[11px] capitalize text-neutral-400">
            {slide.layout} {slide.themeOverride ? `(${slide.themeOverride})` : ''}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom scale controls */}
          <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded px-1.5 py-0.5 gap-1">
            <button
              onClick={() => setZoomScale((prev) => Math.max(0.6, prev - 0.1))}
              className="p-1 hover:text-white rounded"
              title="Reducir zoom"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <span className="text-[10px] font-mono w-10 text-center text-neutral-300">
              {Math.round(zoomScale * 100)}%
            </span>
            <button
              onClick={() => setZoomScale((prev) => Math.min(1.4, prev + 0.1))}
              className="p-1 hover:text-white rounded"
              title="Aumentar zoom"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
            <button
              onClick={() => setZoomScale(1)}
              className="text-[10px] hover:text-white px-1 ml-1 text-neutral-400 border-l border-neutral-800"
              title="Restablecer tamaño (100%)"
            >
              100%
            </button>
          </div>

          <button
            onClick={onPresent}
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded transition-colors"
            title="Vista previa a pantalla completa"
          >
            <Maximize2 className="w-3 h-3" />
            <span className="hidden sm:inline">Pantalla Completa</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Scroll Area */}
      <div className="flex-1 overflow-auto custom-scrollbar flex items-center justify-center p-4 md:p-8">
        {/* Slide Frame (Aspect Ratio 16:9 or 4:3) */}
        <div
          style={{ transform: `scale(${zoomScale})`, transformOrigin: 'center center' }}
          className={`w-full max-w-5xl transition-transform duration-150 ${
            aspectRatio === '16:9' ? 'aspect-video' : 'aspect-[4/3]'
          } rounded-xl shadow-2xl overflow-hidden border ${theme.borderClass} ${theme.bgClass} flex flex-col justify-between p-8 md:p-12 relative text-left`}
        >
          {/* Subtle grid or background aura effect */}
          <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/20 pointer-events-none" />

          {/* SLIDE HEADER: Tag (Kicker) + Title + Subtitle */}
          <div className="space-y-2 relative z-10">
            {/* Unboxed editorial tag/kicker */}
            <div className="flex items-center gap-2">
              <InlineEditable
                value={slide.tag || 'Categoría · Contexto'}
                onChange={(val) => onUpdateSlide({ tag: val })}
                className={`text-xs md:text-sm uppercase tracking-wider font-semibold ${theme.badgeClass}`}
                placeholder="Escribe la etiqueta o categoría..."
              />
            </div>

            {/* Slide Title */}
            <InlineEditable
              value={slide.title}
              onChange={(val) => onUpdateSlide({ title: val })}
              multiline
              tag="h2"
              className={`text-2xl md:text-4xl font-extrabold tracking-tight font-display leading-tight ${theme.textPrimary}`}
              placeholder="Haz clic para escribir el título de la diapositiva..."
            />

            {/* Slide Subtitle (if not in Title or Impact layout) */}
            {slide.layout !== 'title' && slide.layout !== 'impact' && (
              <InlineEditable
                value={slide.subtitle || ''}
                onChange={(val) => onUpdateSlide({ subtitle: val })}
                multiline
                className={`text-sm md:text-base leading-relaxed max-w-3xl ${theme.textSecondary}`}
                placeholder="Añade un subtítulo o contexto explicativo..."
              />
            )}
          </div>

          {/* SLIDE BODY: Layout Specific Rendering */}
          <div className="flex-1 my-4 flex flex-col justify-center relative z-10">
            {/* 1. TITLE LAYOUT (PORTADA) */}
            {slide.layout === 'title' && (
              <div className="my-auto">
                {slide.imageUrl ? (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-7 space-y-4">
                      <InlineEditable
                        value={slide.subtitle || ''}
                        onChange={(val) => onUpdateSlide({ subtitle: val })}
                        multiline
                        className={`text-sm md:text-base leading-relaxed ${theme.textSecondary}`}
                        placeholder="Subtítulo introductorio que explica el objetivo de la presentación..."
                      />
                      <div className="pt-4 border-t border-stone-300/60 dark:border-white/10 flex items-center justify-between text-xs text-stone-500 dark:text-neutral-400 font-mono">
                        <InlineEditable
                          value={slide.content || 'MIA FOODS · Dirección Comercial'}
                          onChange={(val) => onUpdateSlide({ content: val })}
                          className="text-stone-500 dark:text-neutral-400"
                          placeholder="Autor · Fecha · Organización"
                        />
                        <span className="hidden md:inline">Diapositiva 01</span>
                      </div>
                    </div>
                    <div className="md:col-span-5">
                      <div className="rounded-xl overflow-hidden shadow-md border border-stone-200 dark:border-white/10 bg-white/40 aspect-4/3 relative group">
                        <img
                          src={slide.imageUrl}
                          alt={slide.imageAlt || 'Imagen de apoyo'}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {slide.imageAlt && (
                          <div className="absolute bottom-0 inset-x-0 bg-stone-900/75 backdrop-blur-xs text-[10px] text-stone-200 px-2.5 py-1 truncate">
                            {slide.imageAlt}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 my-auto">
                    <InlineEditable
                      value={slide.subtitle || ''}
                      onChange={(val) => onUpdateSlide({ subtitle: val })}
                      multiline
                      className={`text-base md:text-xl leading-relaxed max-w-3xl ${theme.textSecondary}`}
                      placeholder="Subtítulo introductorio que explica el objetivo de la presentación..."
                    />
                    <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs md:text-sm text-neutral-400 font-mono">
                      <InlineEditable
                        value={slide.content || 'Presentado por: Equipo de Proyecto · Marzo 2026'}
                        onChange={(val) => onUpdateSlide({ content: val })}
                        className="text-neutral-400"
                        placeholder="Autor · Fecha · Organización"
                      />
                      <span className="hidden md:inline text-neutral-400">Diapositiva 01</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. IMPACT LAYOUT (GRAN DECLARACIÓN) */}
            {slide.layout === 'impact' && (
              <div className="space-y-6 my-auto max-w-4xl">
                <InlineEditable
                  value={slide.subtitle || ''}
                  onChange={(val) => onUpdateSlide({ subtitle: val })}
                  multiline
                  className={`text-lg md:text-xl font-medium leading-relaxed ${theme.textSecondary}`}
                  placeholder="Añade una argumentación o dato que refuerce la declaración principal..."
                />
              </div>
            )}

            {/* 3. METRICS LAYOUT (3 KPIs) */}
            {slide.layout === 'metrics' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {(slide.metrics || []).map((metric) => (
                    <div
                      key={metric.id}
                      className={`p-5 rounded-lg ${theme.cardBg} transition-all relative group flex flex-col justify-between`}
                    >
                      <button
                        onClick={() => handleDeleteMetric(metric.id)}
                        className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 p-1 text-neutral-500 hover:text-rose-400 transition-opacity"
                        title="Eliminar métrica"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div>
                        <InlineEditable
                          value={metric.label}
                          onChange={(val) => handleUpdateMetric(metric.id, { label: val })}
                          className={`text-xs uppercase tracking-wider font-semibold ${theme.textSecondary}`}
                          placeholder="Nombre de la métrica..."
                        />

                        <div className="my-2">
                          <InlineEditable
                            value={metric.value}
                            onChange={(val) => handleUpdateMetric(metric.id, { value: val })}
                            className={`text-3xl md:text-4xl font-extrabold font-mono tabular-nums ${theme.textPrimary}`}
                            placeholder="$0.00"
                          />
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-semibold mb-2">
                          <span
                            onClick={() =>
                              handleUpdateMetric(metric.id, {
                                changePositive: !metric.changePositive,
                              })
                            }
                            className={`cursor-pointer px-1.5 py-0.5 rounded text-[11px] font-mono ${
                              metric.changePositive
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-rose-500/20 text-rose-400'
                            }`}
                            title="Haz clic para alternar positivo/negativo"
                          >
                            {metric.changePositive ? '▲' : '▼'}
                          </span>
                          <InlineEditable
                            value={metric.change || '+0%'}
                            onChange={(val) => handleUpdateMetric(metric.id, { change: val })}
                            className="text-neutral-400 text-xs font-medium"
                            placeholder="+0%"
                          />
                        </div>
                      </div>

                      <InlineEditable
                        value={metric.description || ''}
                        onChange={(val) => handleUpdateMetric(metric.id, { description: val })}
                        multiline
                        className={`text-xs leading-relaxed ${theme.textSecondary} pt-2 border-t border-white/5`}
                        placeholder="Explicación detallada del resultado..."
                      />
                    </div>
                  ))}
                </div>

                {/* Add metric card button */}
                {(slide.metrics || []).length < 4 && (
                  <button
                    onClick={handleAddMetric}
                    className="flex items-center gap-1 text-xs text-neutral-400 hover:text-amber-400 transition-colors mx-auto py-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Añadir otra métrica</span>
                  </button>
                )}
              </div>
            )}

            {/* 4. SPLIT LAYOUT (DOS COLUMNAS) */}
            {slide.layout === 'split' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(slide.columns || []).map((col, colIdx) => (
                  <div
                    key={col.id || colIdx}
                    className={`p-5 rounded-lg ${theme.cardBg} flex flex-col justify-between`}
                  >
                    <div>
                      <InlineEditable
                        value={col.title}
                        onChange={(val) => {
                          const updated = [...(slide.columns || [])];
                          updated[colIdx].title = val;
                          onUpdateSlide({ columns: updated });
                        }}
                        className={`text-lg font-bold font-display ${theme.textPrimary}`}
                        placeholder="Título de la columna..."
                      />
                      {col.subtitle && (
                        <InlineEditable
                          value={col.subtitle}
                          onChange={(val) => {
                            const updated = [...(slide.columns || [])];
                            updated[colIdx].subtitle = val;
                            onUpdateSlide({ columns: updated });
                          }}
                          className={`text-xs ${theme.textSecondary} mb-3`}
                          placeholder="Subtítulo..."
                        />
                      )}

                      <ul className="space-y-2.5 mt-4">
                        {col.items.map((item, itemIdx) => (
                          <li
                            key={itemIdx}
                            className="flex items-start gap-2.5 text-xs md:text-sm group/item"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                            <div className="flex-1">
                              <InlineEditable
                                value={item}
                                onChange={(val) => handleUpdateColumnItem(colIdx, itemIdx, val)}
                                multiline
                                className={theme.textPrimary}
                                placeholder="Escribe el punto..."
                              />
                            </div>
                            <button
                              onClick={() => handleDeleteColumnItem(colIdx, itemIdx)}
                              className="opacity-0 group-hover/item:opacity-100 p-1 text-neutral-500 hover:text-rose-400 transition-opacity"
                              title="Eliminar este punto"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => handleAddColumnItem(colIdx)}
                      className="mt-4 flex items-center gap-1 text-xs text-neutral-400 hover:text-amber-400 transition-colors pt-2 border-t border-white/5"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Añadir viñeta</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 5. FEATURES LAYOUT (TRES PILARES) */}
            {slide.layout === 'features' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {(slide.features || []).map((feat) => (
                    <div
                      key={feat.id}
                      className={`p-5 rounded-lg ${theme.cardBg} flex flex-col justify-between group relative`}
                    >
                      <button
                        onClick={() => handleDeleteFeature(feat.id)}
                        className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 p-1 text-neutral-500 hover:text-rose-400 transition-opacity"
                        title="Eliminar pilar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div>
                        <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mb-4">
                          {renderSlideIcon(feat.iconName, 'w-5 h-5')}
                        </div>

                        <InlineEditable
                          value={feat.title}
                          onChange={(val) => handleUpdateFeature(feat.id, { title: val })}
                          className={`text-base font-bold font-display ${theme.textPrimary} mb-2`}
                          placeholder="Título del pilar..."
                        />

                        <InlineEditable
                          value={feat.description}
                          onChange={(val) => handleUpdateFeature(feat.id, { description: val })}
                          multiline
                          className={`text-xs md:text-sm leading-relaxed ${theme.textSecondary}`}
                          placeholder="Descripción detallada de la función o pilar..."
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {(slide.features || []).length < 4 && (
                  <button
                    onClick={handleAddFeature}
                    className="flex items-center gap-1 text-xs text-neutral-400 hover:text-amber-400 transition-colors mx-auto py-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Añadir otro pilar</span>
                  </button>
                )}
              </div>
            )}

            {/* 6. TIMELINE LAYOUT (HOJA DE RUTA) */}
            {slide.layout === 'timeline' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 relative">
                  {(slide.timeline || []).map((node) => (
                    <div
                      key={node.id}
                      className={`p-4 rounded-lg ${theme.cardBg} flex flex-col justify-between group relative`}
                    >
                      <button
                        onClick={() => handleDeleteTimelineNode(node.id)}
                        className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 p-1 text-neutral-500 hover:text-rose-400 transition-opacity"
                        title="Eliminar hito"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <InlineEditable
                            value={node.date}
                            onChange={(val) => handleUpdateTimelineNode(node.id, { date: val })}
                            className="text-[11px] font-mono font-semibold text-amber-400"
                            placeholder="Q1 · Enero"
                          />
                          <button
                            onClick={() =>
                              handleUpdateTimelineNode(node.id, { completed: !node.completed })
                            }
                            className={`p-0.5 rounded transition-colors ${
                              node.completed ? 'text-emerald-400' : 'text-neutral-500 hover:text-neutral-300'
                            }`}
                            title="Alternar estado completado"
                          >
                            {node.completed ? (
                              <CheckCircle className="w-4 h-4 fill-emerald-500/20" />
                            ) : (
                              <Circle className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        <InlineEditable
                          value={node.title}
                          onChange={(val) => handleUpdateTimelineNode(node.id, { title: val })}
                          className={`text-xs md:text-sm font-bold font-display ${theme.textPrimary} mb-1.5`}
                          placeholder="Nombre del hito..."
                        />

                        <InlineEditable
                          value={node.description}
                          onChange={(val) =>
                            handleUpdateTimelineNode(node.id, { description: val })
                          }
                          multiline
                          className={`text-xs leading-relaxed ${theme.textSecondary}`}
                          placeholder="Detalles del entregable..."
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {(slide.timeline || []).length < 5 && (
                  <button
                    onClick={handleAddTimelineNode}
                    className="flex items-center gap-1 text-xs text-neutral-400 hover:text-amber-400 transition-colors mx-auto py-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Añadir hito de tiempo</span>
                  </button>
                )}
              </div>
            )}

            {/* 7. QUOTE LAYOUT (CITA) */}
            {slide.layout === 'quote' && slide.quote && (
              <div className="max-w-3xl mx-auto my-auto p-8 rounded-xl bg-neutral-900/40 border border-white/5 relative">
                <QuoteIcon className="w-12 h-12 text-amber-400/20 absolute -top-4 -left-4 pointer-events-none" />
                <div className="relative z-10 space-y-4">
                  <InlineEditable
                    value={slide.quote.text}
                    onChange={(val) =>
                      onUpdateSlide({ quote: { ...slide.quote!, text: val } })
                    }
                    multiline
                    className={`text-lg md:text-2xl font-serif italic leading-relaxed ${theme.textPrimary}`}
                    placeholder="Escribe la cita o testimonio aquí..."
                  />

                  <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-400 font-bold flex items-center justify-center text-sm font-mono shrink-0">
                      {slide.quote.author ? slide.quote.author.charAt(0) : 'A'}
                    </div>
                    <div>
                      <InlineEditable
                        value={slide.quote.author}
                        onChange={(val) =>
                          onUpdateSlide({ quote: { ...slide.quote!, author: val } })
                        }
                        className={`text-sm font-bold ${theme.textPrimary}`}
                        placeholder="Nombre del autor..."
                      />
                      <div className="flex items-center gap-1 text-xs text-neutral-400">
                        <InlineEditable
                          value={slide.quote.role}
                          onChange={(val) =>
                            onUpdateSlide({ quote: { ...slide.quote!, role: val } })
                          }
                          placeholder="Cargo..."
                        />
                        <span>·</span>
                        <InlineEditable
                          value={slide.quote.organization || ''}
                          onChange={(val) =>
                            onUpdateSlide({ quote: { ...slide.quote!, organization: val } })
                          }
                          placeholder="Empresa o institución..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 8. CHART LAYOUT (DISTRIBUCIÓN / BARRAS) */}
            {slide.layout === 'chart' && (
              <div className="max-w-2xl mx-auto w-full space-y-4 my-auto">
                {(slide.chartData || []).map((chartItem) => (
                  <div key={chartItem.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs md:text-sm">
                      <InlineEditable
                        value={chartItem.label}
                        onChange={(val) => handleUpdateChartDatum(chartItem.id, { label: val })}
                        className={`font-medium ${theme.textPrimary}`}
                        placeholder="Nombre de la categoría..."
                      />
                      <div className="flex items-center gap-2 font-mono">
                        <input
                          type="number"
                          value={chartItem.value}
                          onChange={(e) =>
                            handleUpdateChartDatum(chartItem.id, {
                              value: Number(e.target.value) || 0,
                            })
                          }
                          className="w-12 bg-neutral-900 text-right px-1 py-0.5 rounded border border-neutral-700 text-xs font-mono text-neutral-200 outline-hidden"
                          min={0}
                          max={100}
                        />
                        <span className="text-neutral-400">%</span>
                      </div>
                    </div>

                    {/* Visual Progress Bar */}
                    <div className="h-3 w-full bg-neutral-800/80 rounded-full overflow-hidden p-0.5 border border-neutral-700/50">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          chartItem.highlight ? 'bg-amber-400' : 'bg-neutral-400'
                        }`}
                        style={{ width: `${Math.min(100, Math.max(0, chartItem.value))}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 9. TABLE LAYOUT (MATRIZ / CUADRO DE MANDO) */}
            {slide.layout === 'table' && slide.tableData && (
              <div className="w-full my-auto space-y-3">
                <div className={`overflow-x-auto rounded-lg border ${theme.borderClass} ${theme.cardBg}`}>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5 text-[11px] md:text-xs uppercase tracking-wider font-semibold">
                        {slide.tableData.headers.map((header, hIdx) => (
                          <th key={hIdx} className="p-3 md:p-3.5 text-neutral-300 font-semibold">
                            <InlineEditable
                              value={header}
                              onChange={(val) => handleUpdateTableHeader(hIdx, val)}
                              className="text-neutral-300 font-semibold"
                              placeholder="Cabecera..."
                            />
                          </th>
                        ))}
                        <th className="w-8 p-2"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs md:text-sm">
                      {slide.tableData.rows.map((row) => (
                        <tr key={row.id} className="hover:bg-white/5 transition-colors group">
                          <td className="p-3 md:p-3.5 font-bold font-display text-amber-400 whitespace-nowrap">
                            <InlineEditable
                              value={row.dimension}
                              onChange={(val) => handleUpdateTableRow(row.id, { dimension: val })}
                              className="text-amber-400 font-bold"
                              placeholder="Dimensión..."
                            />
                          </td>
                          <td className="p-3 md:p-3.5 text-neutral-200">
                            <InlineEditable
                              value={row.metric}
                              onChange={(val) => handleUpdateTableRow(row.id, { metric: val })}
                              multiline
                              className={theme.textPrimary}
                              placeholder="Métricas clave..."
                            />
                          </td>
                          <td className="p-3 md:p-3.5 text-neutral-300 font-mono text-[11px] md:text-xs">
                            <span className="bg-neutral-800/80 px-2 py-1 rounded border border-neutral-700/60 inline-block">
                              <InlineEditable
                                value={row.tool}
                                onChange={(val) => handleUpdateTableRow(row.id, { tool: val })}
                                className="text-neutral-300 font-mono"
                                placeholder="Herramienta..."
                              />
                            </span>
                          </td>
                          <td className="p-3 md:p-3.5 font-semibold text-emerald-400">
                            <span className="bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30 inline-block">
                              <InlineEditable
                                value={row.goal}
                                onChange={(val) => handleUpdateTableRow(row.id, { goal: val })}
                                className="text-emerald-400 font-semibold"
                                placeholder="Meta..."
                              />
                            </span>
                          </td>
                          <td className="p-2 text-right">
                            <button
                              onClick={() => handleDeleteTableRow(row.id)}
                              className="opacity-0 group-hover:opacity-100 p-1 text-neutral-500 hover:text-rose-400 transition-opacity"
                              title="Eliminar fila"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  onClick={handleAddTableRow}
                  className="flex items-center gap-1 text-xs text-neutral-400 hover:text-amber-400 transition-colors mx-auto py-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir fila a la tabla</span>
                </button>
              </div>
            )}

            {/* 10. CLOSING LAYOUT (CIERRE) */}
            {slide.layout === 'closing' && slide.closing && (
              <div className="max-w-xl mx-auto text-center space-y-6 my-auto">
                <InlineEditable
                  value={slide.closing.title}
                  onChange={(val) =>
                    onUpdateSlide({ closing: { ...slide.closing!, title: val } })
                  }
                  className={`text-xl md:text-2xl font-bold font-display ${theme.textPrimary}`}
                  placeholder="Título de despedida o llamada a la acción..."
                />

                <InlineEditable
                  value={slide.closing.subtitle}
                  onChange={(val) =>
                    onUpdateSlide({ closing: { ...slide.closing!, subtitle: val } })
                  }
                  multiline
                  className={`text-xs md:text-sm ${theme.textSecondary}`}
                  placeholder="Detalles sobre próximos pasos o reuniones..."
                />

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-300 bg-neutral-900/80 border border-neutral-800 px-3 py-1.5 rounded-md">
                    <span className="text-neutral-500">Email:</span>
                    <InlineEditable
                      value={slide.closing.email || ''}
                      onChange={(val) =>
                        onUpdateSlide({ closing: { ...slide.closing!, email: val } })
                      }
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-300 bg-neutral-900/80 border border-neutral-800 px-3 py-1.5 rounded-md">
                    <span className="text-neutral-500">Web:</span>
                    <InlineEditable
                      value={slide.closing.website || ''}
                      onChange={(val) =>
                        onUpdateSlide({ closing: { ...slide.closing!, website: val } })
                      }
                      placeholder="www.ejemplo.com"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <div className="inline-block px-5 py-2.5 rounded-lg bg-amber-400 text-neutral-950 font-bold text-xs shadow-md">
                    <InlineEditable
                      value={slide.closing.actionText || 'Comenzar Ahora'}
                      onChange={(val) =>
                        onUpdateSlide({ closing: { ...slide.closing!, actionText: val } })
                      }
                      placeholder="Texto del botón"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 10. BLANK LAYOUT (LIENZO LIBRE) */}
            {slide.layout === 'blank' && (
              <div className="p-6 rounded-lg bg-white/5 border border-white/10 space-y-4 my-auto">
                <InlineEditable
                  value={slide.content || 'Haz clic para redactar el contenido de tu diapositiva.'}
                  onChange={(val) => onUpdateSlide({ content: val })}
                  multiline
                  className={`text-sm md:text-base leading-relaxed ${theme.textPrimary}`}
                  placeholder="Escribe libremente aquí párrafos, ideas o listas..."
                />
              </div>
            )}
          </div>

          {/* SLIDE FOOTER: Editorial quiet pagination & copyright */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400 font-mono relative z-10">
            <span className="truncate max-w-xs">{slide.title || 'PresentaStudio'}</span>
            <div className="flex items-center gap-2">
              <span>
                {slideIndex + 1} / {totalSlides}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
