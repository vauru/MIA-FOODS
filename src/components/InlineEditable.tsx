/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';

interface InlineEditableProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  className?: string;
  multiline?: boolean;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

export const InlineEditable: React.FC<InlineEditableProps> = ({
  value,
  onChange,
  placeholder = 'Haz clic para editar...',
  className = '',
  multiline = false,
  tag = 'div',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentText(value);
  }, [value]);

  useEffect(() => {
    if (isEditing) {
      if (multiline && textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.select();
        // Auto-adjust height
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      } else if (!multiline && inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [isEditing, multiline]);

  const handleBlur = () => {
    setIsEditing(false);
    if (currentText !== value) {
      onChange(currentText);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      handleBlur();
    } else if (e.key === 'Escape') {
      setCurrentText(value);
      setIsEditing(false);
    }
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentText(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          ref={textareaRef}
          value={currentText}
          onChange={handleTextareaInput}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`w-full bg-neutral-900/90 text-inherit border border-amber-400/80 rounded-md px-2 py-1 outline-hidden resize-none shadow-xs font-inherit ${className}`}
          placeholder={placeholder}
          rows={2}
        />
      );
    }

    return (
      <input
        ref={inputRef}
        type="text"
        value={currentText}
        onChange={(e) => setCurrentText(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`w-full bg-neutral-900/90 text-inherit border border-amber-400/80 rounded-md px-2 py-1 outline-hidden shadow-xs font-inherit ${className}`}
        placeholder={placeholder}
      />
    );
  }

  const Tag = tag;
  const displayContent = value?.trim() ? value : placeholder;
  const isPlaceholder = !value?.trim();

  return (
    <Tag
      onClick={() => setIsEditing(true)}
      title="Haz clic para editar este texto"
      className={`group relative cursor-text transition-colors rounded-sm px-1 py-0.5 hover:ring-1 hover:ring-amber-400/40 hover:bg-white/5 ${
        isPlaceholder ? 'opacity-40 italic' : ''
      } ${className}`}
    >
      {displayContent}
      <span className="opacity-0 group-hover:opacity-100 absolute -top-2.5 right-1 text-[10px] text-amber-400/80 bg-neutral-900 px-1 py-0.2 rounded font-sans pointer-events-none transition-opacity">
        Editar
      </span>
    </Tag>
  );
};
