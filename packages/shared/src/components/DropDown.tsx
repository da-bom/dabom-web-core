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
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  size?: 'xs' | 'sm' | 'lg';
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  return (
    <div
      className={cn(
        'relative w-fit',
        size == 'lg' ? 'min-w-82' : 'min-w-22',
        size == 'xs' ? 'h-9' : 'h-12',
        className,
      )}
      ref={containerRef}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-full w-full cursor-pointer items-center justify-between gap-3 px-4 outline-none"
        aria-label="dropdown"
      >
        <span className="text-body1-m text-gray-800">{selectedOption}</span>
        <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronIcon className="rotate-90 text-gray-800" sx={{ width: 16 }} />
        </div>
      </button>

      {isOpen && (
        <div className="bg-brand-white absolute z-20 mt-2 w-full rounded-xl border border-gray-200 shadow-lg">
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
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
