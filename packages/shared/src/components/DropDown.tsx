'use client';

import { useEffect, useRef } from 'react';

import { ChevronIcon } from '../assets/icons';
import { cn } from '../utils/cn';

const DropDown = ({
  isOpen,
  setIsOpen,
  options,
  selectedOption,
  setSelectedOption,
  size = 'lg',
  className,
  disabled = false,
  renderOption,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  size?: 'xs' | 'sm' | 'lg';
  className?: string;
  disabled?: boolean;
  renderOption?: (option: string) => React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [disabled, setIsOpen]);

  return (
    <div
      className={cn(
        'relative',
        size == 'lg' ? 'min-w-82' : 'min-w-22',
        size == 'xs' ? 'h-9' : 'h-12',
        className,
      )}
      ref={containerRef}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex h-full w-full items-center justify-between gap-3 px-3 outline-none',
          disabled ? 'bg-background-sub cursor-not-allowed rounded-2xl' : 'cursor-pointer',
        )}
        aria-label="dropdown"
      >
        <span className="text-body1-m text-gray-800">{selectedOption}</span>
        <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronIcon className="rotate-90 text-gray-800" sx={{ width: 16 }} />
        </div>
      </button>

      {!disabled && isOpen && (
        <div className="bg-brand-white custom-scrollbar absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-gray-200 shadow-lg">
          {options.map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => {
                setSelectedOption(option);
                setIsOpen(false);
              }}
              className="text-body1-m flex h-12 w-full cursor-pointer items-center px-4 text-gray-700 transition-colors hover:bg-gray-100"
            >
              {renderOption ? renderOption(option) : option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
