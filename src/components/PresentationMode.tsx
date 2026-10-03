/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  Pause,
  RotateCcw,
  MessageSquareText,
  MousePointer,
  HelpCircle,
  Quote as QuoteIcon,
  CheckCircle,
  Circle,
} from 'lucide-react';
import { PresentationDeck, SlideTheme, THEME_CONFIGS } from '../types/presentation';
import { renderSlideIcon } from '../utils/iconMap';

interface PresentationModeProps {
  deck: PresentationDeck;
  initialSlideIndex?: number;
  onExit: () => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({
  deck,
  initialSlideIndex = 0,
  onExit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialSlideIndex);
  const [showNotes, setShowNotes] = useState(false);
  const [laserActive, setLaserActive] = useState(false);
  const [laserPos, setLaserPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [showControls, setShowControls] = useState(true);

  // Timer state
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const hideControlsTimeout = useRef<number | null>(null);

  const currentSlide = deck.slides[currentIndex] || deck.slides[0];
  const activeThemeKey: SlideTheme = currentSlide.themeOverride || deck.theme;
  const theme = THEME_CONFIGS[activeThemeKey] || THEME_CONFIGS['dark-slate'];

  // Stopwatch effect
  useEffect(() => {
    let interval: number;
    if (timerRunning) {
      interval = window.setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  // Format timer
  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown' || e.key === 'Enter') {
        e.preventDefault();
        goToNextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'Backspace') {
        e.preventDefault();
        goToPrevSlide();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onExit();
      } else if (e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setLaserActive((prev) => !prev);
      } else if (e.key.toLowerCase() === 'n') {
        e.preventDefault();
        setShowNotes((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, deck.slides.length, onExit]);

  // Mouse move handler for laser & controls auto-hide
  const handleMouseMove = (e: React.MouseEvent) => {
    if (laserActive) {
      setLaserPos({ x: e.clientX, y: e.clientY });
    }

    setShowControls(true);
    if (hideControlsTimeout.current) {
      window.clearTimeout(hideControlsTimeout.current);
    }
    hideControlsTimeout.current = window.setTimeout(() => {
      setShowControls(false);
    }, 3500);
  };

  const goToNextSlide = () => {
    if (currentIndex < deck.slides.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      // Confetti on final slide!
      if (nextIndex === deck.slides.length - 1) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
        });
      }
    }
  };

  const goToPrevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center select-none overflow-hidden ${
        laserActive ? 'cursor-none' : ''
      }`}
    >
      {/* VIRTUAL LASER POINTER */}
      {laserActive && (
        <div
          className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
          style={{ left: `${laserPos.x}px`, top: `${laserPos.y}px` }}
        >
          <div className="w-4 h-4 rounded-full bg-red-500 shadow-[0_0_16px_5px_rgba(239,68,68,0.9)] animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-white absolute inset-0 m-auto" />
        </div>
      )}

      {/* SLIDE CANVAS (16:9 or 4:3 container scaled to viewport) */}
      <div
        className={`w-full h-full max-w-full max-h-full ${
          deck.aspectRatio === '16:9' ? 'aspect-video' : 'aspect-[4/3]'
        } ${theme.bgClass} flex flex-col justify-between p-8 md:p-16 lg:p-20 relative overflow-hidden transition-all duration-300`}
      >
        {/* Ambient subtle gradient */}
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/25 pointer-events-none" />

        {/* TOP HEADER OF SLIDE */}
        <div className="space-y-3 relative z-10 max-w-5xl">
          {currentSlide.tag && (
            <div className={`text-xs md:text-sm uppercase tracking-wider font-semibold ${theme.badgeClass}`}>
              {currentSlide.tag}
            </div>
          )}

          <h1
            className={`text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-display leading-tight ${theme.textPrimary}`}
          >
            {currentSlide.title}
          </h1>

          {currentSlide.subtitle && currentSlide.layout !== 'title' && currentSlide.layout !== 'impact' && (
            <p className={`text-base md:text-xl leading-relaxed max-w-4xl ${theme.textSecondary}`}>
              {currentSlide.subtitle}
            </p>
          )}
        </div>

        {/* MIDDLE CONTENT BY LAYOUT */}
        <div className="flex-1 my-6 flex flex-col justify-center relative z-10">
          {/* 1. TITLE */}
          {currentSlide.layout === 'title' && (
            <div className="my-auto">
              {currentSlide.imageUrl ? (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-6xl">
                  <div className="md:col-span-7 space-y-6">
                    {currentSlide.subtitle && (
                      <p className={`text-xl md:text-2xl leading-relaxed ${theme.textSecondary}`}>
                        {currentSlide.subtitle}
                      </p>
                    )}
                    {currentSlide.content && (
                      <div className="pt-6 border-t border-white/10 flex items-center justify-between text-sm md:text-base font-mono text-neutral-400">
                        <span>{currentSlide.content}</span>
                        <span>Diapositiva 01</span>
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-5">
                    <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-4/3 relative">
                      <img
                        src={currentSlide.imageUrl}
                        alt={currentSlide.imageAlt || 'MIA FOODS'}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      {currentSlide.imageAlt && (
                        <div className="absolute bottom-0 inset-x-0 bg-stone-950/80 backdrop-blur-xs text-xs text-stone-300 px-3 py-1.5 truncate">
                          {currentSlide.imageAlt}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 my-auto max-w-4xl">
                  {currentSlide.subtitle && (
                    <p className={`text-xl md:text-2xl lg:text-3xl leading-relaxed ${theme.textSecondary}`}>
                      {currentSlide.subtitle}
                    </p>
                  )}
                  {currentSlide.content && (
                    <div className="pt-8 border-t border-white/10 flex items-center justify-between text-sm md:text-base font-mono text-neutral-400">
                      <span>{currentSlide.content}</span>
                      <span>Diapositiva 01</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 2. IMPACT */}
          {currentSlide.layout === 'impact' && (
            <div className="space-y-8 my-auto max-w-5xl">
              {currentSlide.subtitle && (
                <p className={`text-xl md:text-2xl font-medium leading-relaxed ${theme.textSecondary}`}>
                  {currentSlide.subtitle}
                </p>
              )}
            </div>
          )}

          {/* 3. METRICS */}
          {currentSlide.layout === 'metrics' && (
            <div className={`grid grid-cols-1 ${currentSlide.imageUrl ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-6 md:gap-6 my-auto`}>
              {(currentSlide.metrics || []).map((m) => (
                <div
                  key={m.id}
                  className={`p-6 md:p-7 rounded-xl ${theme.cardBg} flex flex-col justify-between`}
                >
                  <div>
                    <div className={`text-xs md:text-sm uppercase tracking-wider font-semibold ${theme.textSecondary}`}>
                      {m.label}
                    </div>
                    <div className={`text-4xl md:text-5xl font-extrabold font-mono tabular-nums my-3 ${theme.textPrimary}`}>
                      {m.value}
                    </div>
                    {m.change && (
                      <div className="flex items-center gap-1.5 text-sm font-semibold mb-3">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-mono ${
                            m.changePositive
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-rose-500/20 text-rose-400'
                          }`}
                        >
                          {m.changePositive ? '▲' : '▼'} {m.change}
                        </span>
                      </div>
                    )}
                  </div>
                  {m.description && (
                    <div className={`text-xs md:text-sm leading-relaxed ${theme.textSecondary} pt-3 border-t border-white/5`}>
                      {m.description}
                    </div>
                  )}
                </div>
              ))}
              {currentSlide.imageUrl && (
                <div className={`rounded-xl overflow-hidden border ${theme.borderClass} relative flex flex-col shadow-lg`}>
                  <img
                    src={currentSlide.imageUrl}
                    alt={currentSlide.imageAlt || 'Showcase'}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {currentSlide.imageAlt && (
                    <div className="absolute bottom-0 inset-x-0 bg-stone-900/80 text-xs text-stone-200 px-3 py-1.5 truncate">
                      {currentSlide.imageAlt}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 4. SPLIT */}
          {currentSlide.layout === 'split' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-auto">
              {(currentSlide.columns || []).map((col, idx) => (
                <div key={idx} className={`p-6 md:p-8 rounded-xl ${theme.cardBg}`}>
                  <h3 className={`text-xl md:text-2xl font-bold font-display ${theme.textPrimary} mb-1`}>
                    {col.title}
                  </h3>
                  {col.subtitle && (
                    <div className={`text-xs md:text-sm ${theme.textSecondary} mb-4`}>
                      {col.subtitle}
                    </div>
                  )}
                  <ul className="space-y-3 mt-4">
                    {col.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3 text-sm md:text-base leading-relaxed">
                        <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" />
                        <span className={theme.textPrimary}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* 5. FEATURES */}
          {currentSlide.layout === 'features' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 my-auto">
              {(currentSlide.features || []).map((feat) => (
                <div key={feat.id} className={`p-6 md:p-8 rounded-xl ${theme.cardBg}`}>
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mb-5">
                    {renderSlideIcon(feat.iconName, 'w-6 h-6')}
                  </div>
                  <h3 className={`text-lg md:text-xl font-bold font-display ${theme.textPrimary} mb-2.5`}>
                    {feat.title}
                  </h3>
                  <p className={`text-sm md:text-base leading-relaxed ${theme.textSecondary}`}>
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* 6. TIMELINE */}
          {currentSlide.layout === 'timeline' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 my-auto">
              {(currentSlide.timeline || []).map((node) => (
                <div key={node.id} className={`p-5 md:p-6 rounded-xl ${theme.cardBg}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-semibold text-amber-400">
                      {node.date}
                    </span>
                    {node.completed ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                    ) : (
                      <Circle className="w-5 h-5 text-neutral-500" />
                    )}
                  </div>
                  <h4 className={`text-sm md:text-base font-bold font-display ${theme.textPrimary} mb-2`}>
                    {node.title}
                  </h4>
                  <p className={`text-xs md:text-sm leading-relaxed ${theme.textSecondary}`}>
                    {node.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* 7. QUOTE */}
          {currentSlide.layout === 'quote' && currentSlide.quote && (
            <div className="max-w-4xl mx-auto my-auto p-10 md:p-14 rounded-2xl bg-neutral-900/40 border border-white/5 relative">
              <QuoteIcon className="w-16 h-16 text-amber-400/20 absolute -top-6 -left-6 pointer-events-none" />
              <blockquote className={`text-2xl md:text-3xl lg:text-4xl font-serif italic leading-relaxed ${theme.textPrimary} mb-8`}>
                "{currentSlide.quote.text}"
              </blockquote>
              <div className="pt-6 border-t border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-400 font-bold flex items-center justify-center text-base font-mono">
                  {currentSlide.quote.author.charAt(0)}
                </div>
                <div>
                  <div className={`text-base md:text-lg font-bold ${theme.textPrimary}`}>
                    {currentSlide.quote.author}
                  </div>
                  <div className="text-xs md:text-sm text-neutral-400">
                    {currentSlide.quote.role} · {currentSlide.quote.organization}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 8. CHART */}
          {currentSlide.layout === 'chart' && (
            <div className="max-w-3xl mx-auto w-full space-y-6 my-auto">
              {(currentSlide.chartData || []).map((chartItem) => (
                <div key={chartItem.id} className="space-y-2">
                  <div className="flex items-center justify-between text-base md:text-lg font-medium">
                    <span className={theme.textPrimary}>{chartItem.label}</span>
                    <span className="font-mono text-amber-400 font-semibold">{chartItem.value}%</span>
                  </div>
                  <div className="h-4 w-full bg-neutral-800 rounded-full overflow-hidden p-0.5 border border-neutral-700/50">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        chartItem.highlight ? 'bg-amber-400' : 'bg-neutral-400'
                      }`}
                      style={{ width: `${Math.min(100, Math.max(0, chartItem.value))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 9. TABLE */}
          {currentSlide.layout === 'table' && currentSlide.tableData && (
            <div className="w-full max-w-5xl mx-auto my-auto">
              <div className={`overflow-x-auto rounded-xl border ${theme.borderClass} ${theme.cardBg} shadow-2xl`}>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5 text-xs md:text-sm uppercase tracking-wider font-semibold">
                      {currentSlide.tableData.headers.map((header, hIdx) => (
                        <th key={hIdx} className="p-4 md:p-5 text-neutral-300 font-semibold">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm md:text-base">
                    {currentSlide.tableData.rows.map((row) => (
                      <tr key={row.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 md:p-5 font-bold font-display text-amber-400 whitespace-nowrap">
                          {row.dimension}
                        </td>
                        <td className={`p-4 md:p-5 ${theme.textPrimary}`}>
                          {row.metric}
                        </td>
                        <td className="p-4 md:p-5 text-neutral-300 font-mono text-xs md:text-sm">
                          <span className="bg-neutral-800/90 px-3 py-1.5 rounded-md border border-neutral-700/60 inline-block">
                            {row.tool}
                          </span>
                        </td>
                        <td className="p-4 md:p-5 font-bold text-emerald-400">
                          <span className="bg-emerald-500/15 px-3 py-1.5 rounded-md border border-emerald-500/30 inline-block">
                            {row.goal}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 10. CLOSING */}
          {currentSlide.layout === 'closing' && currentSlide.closing && (
            <div className="max-w-2xl mx-auto text-center space-y-8 my-auto">
              <h2 className={`text-2xl md:text-4xl font-bold font-display ${theme.textPrimary}`}>
                {currentSlide.closing.title}
              </h2>
              <p className={`text-base md:text-lg ${theme.textSecondary}`}>
                {currentSlide.closing.subtitle}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-neutral-300">
                {currentSlide.closing.email && (
                  <div className="bg-neutral-900/80 border border-neutral-800 px-4 py-2 rounded-lg">
                    <span className="text-neutral-500 mr-1.5">Email:</span>
                    <span>{currentSlide.closing.email}</span>
                  </div>
                )}
                {currentSlide.closing.website && (
                  <div className="bg-neutral-900/80 border border-neutral-800 px-4 py-2 rounded-lg">
                    <span className="text-neutral-500 mr-1.5">Web:</span>
                    <span>{currentSlide.closing.website}</span>
                  </div>
                )}
              </div>
              {currentSlide.closing.actionText && (
                <div className="pt-2">
                  <div className="inline-block px-8 py-3.5 rounded-xl bg-amber-400 text-neutral-950 font-bold text-sm shadow-xl hover:scale-105 transition-transform">
                    {currentSlide.closing.actionText}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 10. BLANK */}
          {currentSlide.layout === 'blank' && (
            <div className="p-8 md:p-12 rounded-xl bg-white/5 border border-white/10 max-w-4xl mx-auto my-auto text-base md:text-lg leading-relaxed">
              {currentSlide.content}
            </div>
          )}
        </div>

        {/* BOTTOM FOOTER */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs md:text-sm text-neutral-400 font-mono relative z-10">
          <span>{deck.title}</span>
          <span>
            {currentIndex + 1} / {deck.slides.length}
          </span>
        </div>
      </div>

      {/* SPEAKER NOTES FLOATING OVERLAY (Press 'N') */}
      {showNotes && (
        <div className="fixed bottom-20 left-6 max-w-md w-full bg-neutral-900/95 border border-amber-400/40 rounded-xl shadow-2xl p-4 z-50 text-neutral-200 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-800 mb-2.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <MessageSquareText className="w-3.5 h-3.5" />
              <span>Notas del Orador ({currentIndex + 1})</span>
            </div>
            <button
              onClick={() => setShowNotes(false)}
              className="text-neutral-400 hover:text-white p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="text-xs leading-relaxed text-neutral-300 max-h-48 overflow-y-auto custom-scrollbar">
            {currentSlide.notes ? (
              <p className="whitespace-pre-line">{currentSlide.notes}</p>
            ) : (
              <p className="text-neutral-500 italic">No hay notas configuradas para esta diapositiva.</p>
            )}
          </div>
        </div>
      )}

      {/* FLOATING PRESENTER CONTROLS DOCK */}
      <div
        className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-neutral-900/90 border border-neutral-800/90 rounded-full px-4 py-2 flex items-center gap-3 shadow-2xl backdrop-blur-md transition-opacity duration-300 z-40 ${
          showControls ? 'opacity-100' : 'opacity-0 hover:opacity-100'
        }`}
      >
        {/* Previous Button */}
        <button
          onClick={goToPrevSlide}
          disabled={currentIndex === 0}
          className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-300 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          title="Diapositiva anterior (Flecha Izq / RePág)"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Slide Counter */}
        <span className="text-xs font-mono font-medium text-neutral-300 px-1">
          {currentIndex + 1} / {deck.slides.length}
        </span>

        {/* Next Button */}
        <button
          onClick={goToNextSlide}
          disabled={currentIndex === deck.slides.length - 1}
          className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-300 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          title="Diapositiva siguiente (Flecha Der / Espacio / AvPág)"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="h-4 w-px bg-neutral-800" />

        {/* Timer / Cronómetro */}
        <div className="flex items-center gap-1.5 bg-neutral-950/60 px-2.5 py-1 rounded-full border border-neutral-800">
          <span className="text-xs font-mono font-semibold text-amber-400">
            {formatTimer(timerSeconds)}
          </span>
          <button
            onClick={() => setTimerRunning(!timerRunning)}
            className="text-neutral-400 hover:text-white"
            title={timerRunning ? 'Pausar cronómetro' : 'Reanudar cronómetro'}
          >
            {timerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
          <button
            onClick={() => {
              setTimerSeconds(0);
              setTimerRunning(false);
            }}
            className="text-neutral-400 hover:text-white"
            title="Reiniciar cronómetro"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>

        <div className="h-4 w-px bg-neutral-800" />

        {/* Laser Pointer Toggle */}
        <button
          onClick={() => setLaserActive(!laserActive)}
          className={`p-1.5 rounded-full transition-colors ${
            laserActive
              ? 'bg-red-500/20 text-red-400 ring-1 ring-red-400'
              : 'hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200'
          }`}
          title="Puntero láser virtual (Tecla L)"
        >
          <MousePointer className="w-4 h-4" />
        </button>

        {/* Notes Toggle */}
        <button
          onClick={() => setShowNotes(!showNotes)}
          className={`p-1.5 rounded-full transition-colors ${
            showNotes
              ? 'bg-amber-400/20 text-amber-300 ring-1 ring-amber-400'
              : 'hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200'
          }`}
          title="Notas del orador (Tecla N)"
        >
          <MessageSquareText className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-neutral-800" />

        {/* Exit Presentation */}
        <button
          onClick={onExit}
          className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-rose-400 transition-colors"
          title="Salir del modo presentación (Escape)"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
