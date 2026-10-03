/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Keyboard, HelpCircle } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'F5 / P', desc: 'Iniciar presentación a pantalla completa' },
    { key: 'Espacio / →', desc: 'Avanzar a la siguiente diapositiva' },
    { key: '← / RePág', desc: 'Retroceder a la diapositiva anterior' },
    { key: 'Esc', desc: 'Salir del modo presentación o cancelar edición' },
    { key: 'L', desc: 'Activar / Desactivar puntero láser virtual' },
    { key: 'N', desc: 'Mostrar / Ocultar notas del orador durante la presentación' },
    { key: 'Ctrl + Z', desc: 'Deshacer último cambio en la diapositiva' },
    { key: 'Ctrl + Y', desc: 'Rehacer cambio deshecho' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white font-display">
              Atajos de Teclado
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 divide-y divide-neutral-800 text-xs">
          {shortcuts.map((s, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between">
              <span className="text-neutral-300">{s.desc}</span>
              <kbd className="px-2 py-1 rounded bg-neutral-950 border border-neutral-700 font-mono text-[11px] text-amber-300 shadow-xs">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="px-6 py-3 border-t border-neutral-800 bg-neutral-950 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
