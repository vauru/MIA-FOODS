/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Sparkles, Check, Layers } from 'lucide-react';
import { TEMPLATE_DECKS } from '../data/starterDecks';
import { PresentationDeck } from '../types/presentation';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDeck: (deck: PresentationDeck) => void;
}

export const TemplatesModal: React.FC<TemplatesModalProps> = ({
  isOpen,
  onClose,
  onSelectDeck,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white font-display">
              Galería de Plantillas de Presentación
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Templates Grid */}
        <div className="p-6 overflow-y-auto custom-scrollbar grid grid-cols-1 md:grid-cols-2 gap-4">
          {TEMPLATE_DECKS.map((tpl) => (
            <div
              key={tpl.id}
              className="p-5 rounded-xl border border-neutral-800 hover:border-amber-400/60 bg-neutral-950/60 hover:bg-neutral-950 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                  <span className="text-amber-400 font-medium">{tpl.category}</span>
                  <span className="font-mono text-neutral-400">
                    {tpl.slidesCount} diapositivas
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors font-display mb-1.5">
                  {tpl.name}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  {tpl.description}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                <span className="text-[11px] text-neutral-400">
                  Tema: {tpl.deck.theme}
                </span>

                <button
                  onClick={() => {
                    const cloned: PresentationDeck = JSON.parse(JSON.stringify(tpl.deck));
                    cloned.id = 'deck-' + Date.now();
                    cloned.updatedAt = new Date().toISOString();
                    onSelectDeck(cloned);
                    onClose();
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors"
                >
                  Cargar Plantilla
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-800 bg-neutral-950 text-xs text-neutral-400 flex items-center justify-between">
          <span>Tip: Al cargar una plantilla nueva, reemplazarás el contenido actual. Puedes exportar antes a JSON.</span>
          <button
            onClick={onClose}
            className="text-neutral-300 hover:text-white px-3 py-1 rounded hover:bg-neutral-800"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
