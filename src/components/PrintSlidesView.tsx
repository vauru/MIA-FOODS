/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PresentationDeck, THEME_CONFIGS } from '../types/presentation';
import { renderSlideIcon } from '../utils/iconMap';

interface PrintSlidesViewProps {
  deck: PresentationDeck;
}

export const PrintSlidesView: React.FC<PrintSlidesViewProps> = ({ deck }) => {
  return (
    <div className="print-only">
      {deck.slides.map((slide, index) => {
        const activeTheme = slide.themeOverride || deck.theme;
        const theme = THEME_CONFIGS[activeTheme] || THEME_CONFIGS['dark-slate'];

        return (
          <div
            key={slide.id}
            className={`print-slide-page ${theme.bgClass} flex flex-col justify-between p-12 text-left relative`}
            style={{ width: '100vw', height: '100vh', pageBreakAfter: 'always' }}
          >
            {/* Header */}
            <div className="space-y-2">
              {slide.tag && (
                <div className={`text-xs uppercase tracking-wider font-semibold ${theme.badgeClass}`}>
                  {slide.tag}
                </div>
              )}
              <h1 className={`text-3xl font-extrabold font-display ${theme.textPrimary}`}>
                {slide.title}
              </h1>
              {slide.subtitle && slide.layout !== 'title' && slide.layout !== 'impact' && (
                <p className={`text-sm ${theme.textSecondary}`}>{slide.subtitle}</p>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 my-6 flex flex-col justify-center">
              {slide.layout === 'title' && (
                <div className="my-auto">
                  {slide.imageUrl ? (
                    <div className="grid grid-cols-2 gap-8 items-center">
                      <div className="space-y-4">
                        <p className={`text-xl ${theme.textSecondary}`}>{slide.subtitle}</p>
                        <p className="text-xs font-mono text-neutral-400">{slide.content}</p>
                      </div>
                      <div className="rounded-xl overflow-hidden border border-stone-200 aspect-4/3">
                        <img
                          src={slide.imageUrl}
                          alt={slide.imageAlt || 'MIA FOODS'}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 my-auto">
                      <p className={`text-xl ${theme.textSecondary}`}>{slide.subtitle}</p>
                      <p className="text-xs font-mono text-neutral-400">{slide.content}</p>
                    </div>
                  )}
                </div>
              )}

              {slide.layout === 'impact' && (
                <div className="space-y-4 my-auto">
                  <p className={`text-lg font-medium ${theme.textSecondary}`}>{slide.subtitle}</p>
                </div>
              )}

              {slide.layout === 'metrics' && (
                <div className="grid grid-cols-3 gap-4">
                  {(slide.metrics || []).map((m) => (
                    <div key={m.id} className={`p-4 rounded-lg ${theme.cardBg}`}>
                      <div className={`text-xs uppercase ${theme.textSecondary}`}>{m.label}</div>
                      <div className={`text-3xl font-bold font-mono my-2 ${theme.textPrimary}`}>
                        {m.value}
                      </div>
                      <div className="text-xs text-neutral-400">{m.description}</div>
                    </div>
                  ))}
                </div>
              )}

              {slide.layout === 'split' && (
                <div className="grid grid-cols-2 gap-6">
                  {(slide.columns || []).map((col, idx) => (
                    <div key={idx} className={`p-4 rounded-lg ${theme.cardBg}`}>
                      <h3 className={`text-base font-bold ${theme.textPrimary} mb-2`}>{col.title}</h3>
                      <ul className="space-y-2">
                        {col.items.map((item, itemIdx) => (
                          <li key={itemIdx} className={`text-xs flex items-start gap-2 ${theme.textPrimary}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {slide.layout === 'features' && (
                <div className="grid grid-cols-3 gap-4">
                  {(slide.features || []).map((feat) => (
                    <div key={feat.id} className={`p-4 rounded-lg ${theme.cardBg}`}>
                      <h4 className={`text-sm font-bold ${theme.textPrimary} mb-1.5`}>{feat.title}</h4>
                      <p className={`text-xs ${theme.textSecondary}`}>{feat.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {slide.layout === 'timeline' && (
                <div className="grid grid-cols-4 gap-3">
                  {(slide.timeline || []).map((node) => (
                    <div key={node.id} className={`p-3 rounded-lg ${theme.cardBg}`}>
                      <div className="text-[10px] font-mono text-amber-400">{node.date}</div>
                      <div className={`text-xs font-bold ${theme.textPrimary} my-1`}>{node.title}</div>
                      <div className={`text-[10px] ${theme.textSecondary}`}>{node.description}</div>
                    </div>
                  ))}
                </div>
              )}

              {slide.layout === 'quote' && slide.quote && (
                <div className="p-6 rounded-lg bg-neutral-900/30 max-w-xl mx-auto my-auto text-center space-y-4">
                  <blockquote className={`text-xl italic font-serif ${theme.textPrimary}`}>
                    "{slide.quote.text}"
                  </blockquote>
                  <div className={`text-sm font-bold ${theme.textPrimary}`}>{slide.quote.author}</div>
                  <div className="text-xs text-neutral-400">
                    {slide.quote.role} · {slide.quote.organization}
                  </div>
                </div>
              )}

              {slide.layout === 'chart' && (
                <div className="space-y-3 max-w-md mx-auto my-auto w-full">
                  {(slide.chartData || []).map((c) => (
                    <div key={c.id}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className={theme.textPrimary}>{c.label}</span>
                        <span className="font-mono text-amber-400">{c.value}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400"
                          style={{ width: `${c.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {slide.layout === 'table' && slide.tableData && (
                <div className="w-full max-w-4xl mx-auto my-auto">
                  <table className="w-full text-left border-collapse border border-white/10 rounded-lg">
                    <thead>
                      <tr className="bg-white/5 border-b border-white/10 text-xs uppercase">
                        {slide.tableData.headers.map((h, hIdx) => (
                          <th key={hIdx} className="p-3 text-neutral-300 font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs">
                      {slide.tableData.rows.map((row) => (
                        <tr key={row.id}>
                          <td className="p-3 font-bold text-amber-400">{row.dimension}</td>
                          <td className={`p-3 ${theme.textPrimary}`}>{row.metric}</td>
                          <td className="p-3 font-mono text-[11px] text-neutral-300">{row.tool}</td>
                          <td className="p-3 font-semibold text-emerald-400">{row.goal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {slide.layout === 'closing' && slide.closing && (
                <div className="text-center space-y-4 my-auto">
                  <h2 className={`text-2xl font-bold ${theme.textPrimary}`}>{slide.closing.title}</h2>
                  <p className={`text-xs ${theme.textSecondary}`}>{slide.closing.subtitle}</p>
                  <p className="text-xs font-mono text-neutral-400">
                    {slide.closing.email} · {slide.closing.website}
                  </p>
                </div>
              )}

              {slide.layout === 'blank' && (
                <div className={`text-sm ${theme.textPrimary}`}>{slide.content}</div>
              )}
            </div>

            {/* Footer */}
            <div className="pt-2 border-t border-white/10 flex justify-between text-[10px] font-mono text-neutral-400">
              <span>{deck.title}</span>
              <span>
                {index + 1} / {deck.slides.length}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
