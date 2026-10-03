/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { PresentationDeck, SlideData, SlideLayout, SlideTheme } from './types/presentation';
import {
  loadSavedDeck,
  saveDeckToStorage,
  createNewSlide,
  duplicateSlide,
} from './utils/storage';
import { TopBar } from './components/TopBar';
import { SlideThumbnails } from './components/SlideThumbnails';
import { SlideCanvas } from './components/SlideCanvas';
import { SlideInspector } from './components/SlideInspector';
import { PresentationMode } from './components/PresentationMode';
import { TemplatesModal } from './components/TemplatesModal';
import { ShortcutsModal } from './components/ShortcutsModal';
import { PrintSlidesView } from './components/PrintSlidesView';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [deck, setDeck] = useState<PresentationDeck>(() => loadSavedDeck());
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isPresenting, setIsPresenting] = useState<boolean>(false);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState<boolean>(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState<boolean>(false);

  // Undo / Redo history
  const [historyPast, setHistoryPast] = useState<PresentationDeck[]>([]);
  const [historyFuture, setHistoryFuture] = useState<PresentationDeck[]>([]);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(
    null
  );

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Save to localStorage automatically on deck changes
  useEffect(() => {
    saveDeckToStorage(deck);
  }, [deck]);

  // Push state to undo stack
  const pushHistory = useCallback(
    (currentDeck: PresentationDeck) => {
      setHistoryPast((prev) => [...prev.slice(-20), JSON.parse(JSON.stringify(currentDeck))]);
      setHistoryFuture([]);
    },
    []
  );

  const handleUndo = useCallback(() => {
    if (historyPast.length === 0) return;
    const previous = historyPast[historyPast.length - 1];
    setHistoryPast((prev) => prev.slice(0, prev.length - 1));
    setHistoryFuture((prev) => [JSON.parse(JSON.stringify(deck)), ...prev]);
    setDeck(previous);
    if (activeSlideIndex >= previous.slides.length) {
      setActiveSlideIndex(Math.max(0, previous.slides.length - 1));
    }
    showToast('Acción deshecha', 'info');
  }, [historyPast, deck, activeSlideIndex]);

  const handleRedo = useCallback(() => {
    if (historyFuture.length === 0) return;
    const next = historyFuture[0];
    setHistoryFuture((prev) => prev.slice(1));
    setHistoryPast((prev) => [...prev, JSON.parse(JSON.stringify(deck))]);
    setDeck(next);
    if (activeSlideIndex >= next.slides.length) {
      setActiveSlideIndex(Math.max(0, next.slides.length - 1));
    }
    showToast('Acción rehecha', 'info');
  }, [historyFuture, deck, activeSlideIndex]);

  // Deck title update
  const handleUpdateDeckTitle = (newTitle: string) => {
    pushHistory(deck);
    setDeck((prev) => ({
      ...prev,
      title: newTitle,
      updatedAt: new Date().toISOString(),
    }));
    showToast('Título actualizado');
  };

  // Theme change
  const handleSelectTheme = (theme: SlideTheme) => {
    pushHistory(deck);
    setDeck((prev) => ({
      ...prev,
      theme,
      updatedAt: new Date().toISOString(),
    }));
    showToast(`Tema cambiado a ${theme}`);
  };

  // Aspect ratio change
  const handleSelectAspectRatio = (ratio: '16:9' | '4:3') => {
    pushHistory(deck);
    setDeck((prev) => ({
      ...prev,
      aspectRatio: ratio,
      updatedAt: new Date().toISOString(),
    }));
    showToast(`Formato cambiado a ${ratio}`);
  };

  // Update current slide
  const handleUpdateSlide = (updates: Partial<SlideData>) => {
    pushHistory(deck);
    setDeck((prev) => {
      const updatedSlides = [...prev.slides];
      if (updatedSlides[activeSlideIndex]) {
        updatedSlides[activeSlideIndex] = {
          ...updatedSlides[activeSlideIndex],
          ...updates,
        };
      }
      return {
        ...prev,
        slides: updatedSlides,
        updatedAt: new Date().toISOString(),
      };
    });
  };

  // Add new slide
  const handleAddSlide = (layout: SlideLayout) => {
    pushHistory(deck);
    const newSlide = createNewSlide(layout);
    setDeck((prev) => {
      const updatedSlides = [...prev.slides];
      // Insert right after the current active slide
      const insertIndex = activeSlideIndex + 1;
      updatedSlides.splice(insertIndex, 0, newSlide);
      return {
        ...prev,
        slides: updatedSlides,
        updatedAt: new Date().toISOString(),
      };
    });
    setActiveSlideIndex(activeSlideIndex + 1);
    showToast('Nueva diapositiva añadida');
  };

  // Duplicate slide
  const handleDuplicateSlide = (index: number) => {
    pushHistory(deck);
    setDeck((prev) => {
      const target = prev.slides[index];
      if (!target) return prev;
      const duplicated = duplicateSlide(target);
      const updatedSlides = [...prev.slides];
      updatedSlides.splice(index + 1, 0, duplicated);
      return {
        ...prev,
        slides: updatedSlides,
        updatedAt: new Date().toISOString(),
      };
    });
    setActiveSlideIndex(index + 1);
    showToast('Diapositiva duplicada');
  };

  // Delete slide
  const handleDeleteSlide = (index: number) => {
    if (deck.slides.length <= 1) return;
    pushHistory(deck);
    setDeck((prev) => {
      const updatedSlides = prev.slides.filter((_, idx) => idx !== index);
      return {
        ...prev,
        slides: updatedSlides,
        updatedAt: new Date().toISOString(),
      };
    });
    if (activeSlideIndex >= index) {
      setActiveSlideIndex(Math.max(0, activeSlideIndex - 1));
    }
    showToast('Diapositiva eliminada', 'info');
  };

  // Move slide up
  const handleMoveSlideUp = (index: number) => {
    if (index === 0) return;
    pushHistory(deck);
    setDeck((prev) => {
      const updated = [...prev.slides];
      const temp = updated[index];
      updated[index] = updated[index - 1];
      updated[index - 1] = temp;
      return { ...prev, slides: updated };
    });
    setActiveSlideIndex(index - 1);
  };

  // Move slide down
  const handleMoveSlideDown = (index: number) => {
    if (index === deck.slides.length - 1) return;
    pushHistory(deck);
    setDeck((prev) => {
      const updated = [...prev.slides];
      const temp = updated[index];
      updated[index] = updated[index + 1];
      updated[index + 1] = temp;
      return { ...prev, slides: updated };
    });
    setActiveSlideIndex(index + 1);
  };

  // Import JSON file
  const handleImportJSON = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (parsed && Array.isArray(parsed.slides) && parsed.slides.length > 0) {
          pushHistory(deck);
          setDeck(parsed);
          setActiveSlideIndex(0);
          showToast('Presentación importada exitosamente');
        } else {
          showToast('El archivo no contiene una presentación válida', 'info');
        }
      } catch (err) {
        console.error('Error al importar JSON:', err);
        showToast('Error al leer el archivo JSON', 'info');
      }
    };
    reader.readAsText(file);
  };

  // Print PDF
  const handlePrintPDF = () => {
    window.print();
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const isInputActive = ['INPUT', 'TEXTAREA'].includes(
        (document.activeElement as HTMLElement)?.tagName
      );

      // F5 to start presentation
      if (e.key === 'F5') {
        e.preventDefault();
        setIsPresenting(true);
        return;
      }

      if (isInputActive) return;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      } else if (e.key === '?') {
        e.preventDefault();
        setIsShortcutsModalOpen(true);
      } else if (e.key.toLowerCase() === 'p' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setIsPresenting(true);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveSlideIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveSlideIndex((prev) => Math.min(deck.slides.length - 1, prev + 1));
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [deck.slides.length, handleUndo, handleRedo]);

  const activeSlide = deck.slides[activeSlideIndex] || deck.slides[0];

  return (
    <div className="flex flex-col h-screen w-screen bg-neutral-950 text-neutral-100 overflow-hidden font-sans">
      {/* 1. TOP BAR */}
      <TopBar
        deck={deck}
        onUpdateDeckTitle={handleUpdateDeckTitle}
        onSelectTheme={handleSelectTheme}
        onSelectAspectRatio={handleSelectAspectRatio}
        onStartPresentation={() => setIsPresenting(true)}
        onOpenTemplates={() => setIsTemplatesModalOpen(true)}
        onOpenShortcuts={() => setIsShortcutsModalOpen(true)}
        onImportJSON={handleImportJSON}
        canUndo={historyPast.length > 0}
        canRedo={historyFuture.length > 0}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onPrintPDF={handlePrintPDF}
      />

      {/* 2. MAIN WORKSPACE: LEFT THUMBNAILS | CENTER CANVAS | RIGHT INSPECTOR */}
      <div className="flex-1 flex overflow-hidden no-print">
        {/* Left Thumbnails List */}
        <SlideThumbnails
          slides={deck.slides}
          activeSlideIndex={activeSlideIndex}
          deckTheme={deck.theme}
          onSelectSlide={(idx) => setActiveSlideIndex(idx)}
          onAddSlide={handleAddSlide}
          onDuplicateSlide={handleDuplicateSlide}
          onDeleteSlide={handleDeleteSlide}
          onMoveSlideUp={handleMoveSlideUp}
          onMoveSlideDown={handleMoveSlideDown}
        />

        {/* Center Canvas */}
        {activeSlide ? (
          <SlideCanvas
            slide={activeSlide}
            deckTheme={deck.theme}
            aspectRatio={deck.aspectRatio}
            slideIndex={activeSlideIndex}
            totalSlides={deck.slides.length}
            onUpdateSlide={handleUpdateSlide}
            onPresent={() => setIsPresenting(true)}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-neutral-500">
            No hay diapositivas disponibles
          </div>
        )}

        {/* Right Inspector */}
        {activeSlide && (
          <SlideInspector
            slide={activeSlide}
            deckTheme={deck.theme}
            onUpdateSlide={handleUpdateSlide}
          />
        )}
      </div>

      {/* 3. FULLSCREEN PRESENTATION MODE */}
      {isPresenting && (
        <PresentationMode
          deck={deck}
          initialSlideIndex={activeSlideIndex}
          onExit={() => setIsPresenting(false)}
        />
      )}

      {/* 4. TEMPLATES GALLERY MODAL */}
      <TemplatesModal
        isOpen={isTemplatesModalOpen}
        onClose={() => setIsTemplatesModalOpen(false)}
        onSelectDeck={(selectedDeck) => {
          pushHistory(deck);
          setDeck(selectedDeck);
          setActiveSlideIndex(0);
          showToast(`Plantilla "${selectedDeck.title}" cargada`);
        }}
      />

      {/* 5. SHORTCUTS MODAL */}
      <ShortcutsModal
        isOpen={isShortcutsModalOpen}
        onClose={() => setIsShortcutsModalOpen(false)}
      />

      {/* 6. PRINT TO PDF VIEW (HIDDEN ON SCREEN, ACTIVE ON PRINT) */}
      <PrintSlidesView deck={deck} />

      {/* 7. TOAST FEEDBACK ALERT */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-neutral-900 border border-neutral-700 text-neutral-200 text-xs px-3.5 py-2 rounded-lg shadow-xl animate-in fade-in slide-in-from-bottom-2">
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-sky-400" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}
    </div>
  );
}
