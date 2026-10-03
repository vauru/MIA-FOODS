/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Download,
  Upload,
  Printer,
  Sparkles,
  HelpCircle,
  Undo2,
  Redo2,
  ChevronDown,
  Monitor,
  Smartphone,
  Palette,
} from 'lucide-react';
import { PresentationDeck, SlideTheme, THEME_CONFIGS } from '../types/presentation';
import { exportDeckAsJSON } from '../utils/storage';

interface TopBarProps {
  deck: PresentationDeck;
  onUpdateDeckTitle: (newTitle: string) => void;
  onSelectTheme: (theme: SlideTheme) => void;
  onSelectAspectRatio: (ratio: '16:9' | '4:3') => void;
  onStartPresentation: () => void;
  onOpenTemplates: () => void;
  onOpenShortcuts: () => void;
  onImportJSON: (file: File) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onPrintPDF: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  deck,
  onUpdateDeckTitle,
  onSelectTheme,
  onSelectAspectRatio,
  onStartPresentation,
  onOpenTemplates,
  onOpenShortcuts,
  onImportJSON,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onPrintPDF,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(deck.title);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const exportMenuRef = useRef<HTMLDivElement>(null);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTitleValue(deck.title);
  }, [deck.title]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setShowExportMenu(false);
      }
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setShowThemeMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTitleSubmit = () => {
    setIsEditingTitle(false);
    if (titleValue.trim() && titleValue !== deck.title) {
      onUpdateDeckTitle(titleValue.trim());
    } else {
      setTitleValue(deck.title);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportJSON(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <header className="h-14 border-b border-neutral-800 bg-neutral-950 px-4 md:px-6 flex items-center justify-between gap-4 select-none shrink-0 no-print">
      {/* Zone 1: Single text element wordmark + Deck Title */}
      <div className="flex items-center gap-3 min-w-0">
        <a
          href="/"
          className="text-base font-extrabold tracking-tight text-neutral-100 hover:text-amber-400 transition-colors shrink-0 font-display flex items-center gap-1.5"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
          PresentaStudio
        </a>

        <div className="h-4 w-px bg-neutral-800 shrink-0" />

        {/* Editable deck title */}
        {isEditingTitle ? (
          <input
            type="text"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            onBlur={handleTitleSubmit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleTitleSubmit();
              if (e.key === 'Escape') {
                setTitleValue(deck.title);
                setIsEditingTitle(false);
              }
            }}
            autoFocus
            className="text-sm font-medium text-neutral-200 bg-neutral-900 border border-amber-400/80 rounded px-2 py-0.5 outline-hidden truncate max-w-xs md:max-w-md"
          />
        ) : (
          <button
            onClick={() => setIsEditingTitle(true)}
            className="text-sm font-medium text-neutral-300 hover:text-white truncate max-w-xs md:max-w-md text-left px-2 py-0.5 rounded hover:bg-neutral-900/80 transition-colors"
            title="Haz clic para cambiar el título de la presentación"
          >
            {deck.title}
          </button>
        )}
      </div>

      {/* Zone 2: Navigation links & tool actions (Single line, no pills) */}
      <nav className="hidden lg:flex items-center gap-1 text-xs text-neutral-400 font-medium">
        {/* Undo / Redo */}
        <div className="flex items-center gap-0.5 mr-2">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`p-1.5 rounded transition-colors ${
              canUndo ? 'hover:bg-neutral-800 text-neutral-300' : 'text-neutral-700 cursor-not-allowed'
            }`}
            title="Deshacer (Ctrl+Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`p-1.5 rounded transition-colors ${
              canRedo ? 'hover:bg-neutral-800 text-neutral-300' : 'text-neutral-700 cursor-not-allowed'
            }`}
            title="Rehacer (Ctrl+Y)"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="h-4 w-px bg-neutral-800 mr-2" />

        {/* Aspect Ratio Selector */}
        <div className="flex items-center bg-neutral-900 rounded p-0.5 border border-neutral-800/80 mr-2">
          <button
            onClick={() => onSelectAspectRatio('16:9')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
              deck.aspectRatio === '16:9'
                ? 'bg-neutral-800 text-neutral-100 shadow-xs'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="Pantalla Panorámica 16:9"
          >
            16:9
          </button>
          <button
            onClick={() => onSelectAspectRatio('4:3')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
              deck.aspectRatio === '4:3'
                ? 'bg-neutral-800 text-neutral-100 shadow-xs'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="Pantalla Estándar 4:3"
          >
            4:3
          </button>
        </div>

        {/* Global Theme Dropdown */}
        <div className="relative mr-2" ref={themeMenuRef}>
          <button
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:bg-neutral-900 text-neutral-300 hover:text-white transition-colors border border-neutral-800/80"
          >
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span className="truncate max-w-[100px]">{THEME_CONFIGS[deck.theme]?.name || 'Tema'}</span>
            <ChevronDown className="w-3 h-3 text-neutral-500" />
          </button>

          {showThemeMenu && (
            <div className="absolute top-full left-0 mt-1 w-52 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl p-1.5 z-50">
              <div className="text-[10px] font-semibold text-neutral-400 px-2 py-1 tracking-wider uppercase">
                Temas del Deck
              </div>
              {(Object.keys(THEME_CONFIGS) as SlideTheme[]).map((themeKey) => {
                const conf = THEME_CONFIGS[themeKey];
                const isSelected = deck.theme === themeKey;
                return (
                  <button
                    key={themeKey}
                    onClick={() => {
                      onSelectTheme(themeKey);
                      setShowThemeMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded transition-colors text-left ${
                      isSelected
                        ? 'bg-amber-400/10 text-amber-300 font-medium'
                        : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                    }`}
                  >
                    <span>{conf.name}</span>
                    <span
                      className={`w-3 h-3 rounded-full border border-neutral-700 ${
                        themeKey === 'warm-editorial'
                          ? 'bg-stone-200'
                          : themeKey === 'clean-white'
                          ? 'bg-white'
                          : themeKey === 'obsidian-emerald'
                          ? 'bg-emerald-500'
                          : themeKey === 'midnight-blue'
                          ? 'bg-sky-500'
                          : themeKey === 'sunset-gradient'
                          ? 'bg-rose-500'
                          : 'bg-neutral-800'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Templates link */}
        <button
          onClick={onOpenTemplates}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:bg-neutral-900 text-neutral-300 hover:text-white transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Plantillas</span>
        </button>

        {/* Shortcuts link */}
        <button
          onClick={onOpenShortcuts}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:bg-neutral-900 text-neutral-400 hover:text-white transition-colors"
          title="Atajos de teclado (?)"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Atajos</span>
        </button>
      </nav>

      {/* Zone 3: 1-2 Primary Actions */}
      <div className="flex items-center gap-2">
        {/* Hidden file input for importing JSON */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".json,application/json"
          className="hidden"
        />

        {/* Export / Share Dropdown */}
        <div className="relative" ref={exportMenuRef}>
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-md transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exportar</span>
            <ChevronDown className="w-3 h-3 text-neutral-500" />
          </button>

          {showExportMenu && (
            <div className="absolute right-0 top-full mt-1 w-56 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl p-1.5 z-50">
              <button
                onClick={() => {
                  exportDeckAsJSON(deck);
                  setShowExportMenu(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-neutral-200 hover:bg-neutral-800 hover:text-white rounded transition-colors text-left"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <div>
                  <div className="font-medium">Descargar archivo JSON</div>
                  <div className="text-[10px] text-neutral-500">Guarda una copia editable</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowExportMenu(false);
                  fileInputRef.current?.click();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-neutral-200 hover:bg-neutral-800 hover:text-white rounded transition-colors text-left"
              >
                <Upload className="w-4 h-4 text-sky-400" />
                <div>
                  <div className="font-medium">Importar presentación</div>
                  <div className="text-[10px] text-neutral-500">Cargar archivo .json previo</div>
                </div>
              </button>

              <div className="h-px bg-neutral-800 my-1" />

              <button
                onClick={() => {
                  setShowExportMenu(false);
                  onPrintPDF();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-neutral-200 hover:bg-neutral-800 hover:text-white rounded transition-colors text-left"
              >
                <Printer className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="font-medium">Imprimir / Guardar en PDF</div>
                  <div className="text-[10px] text-neutral-500">Apertura diálogo de impresión</div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Primary CTA: Presentar (F5) */}
        <button
          onClick={onStartPresentation}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md shadow-xs transition-colors whitespace-nowrap active:scale-95"
          title="Iniciar modo presentación a pantalla completa (Tecla F5 o P)"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Presentar</span>
          <span className="hidden sm:inline text-[10px] font-mono opacity-70">F5</span>
        </button>
      </div>
    </header>
  );
};
