'use client';

import { ChevronIcon } from '@icons';
import { cn } from '@shared';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const maxVisible = 5;

  const getVisiblePages = () => {
    let start = currentPage + 1 - Math.floor(maxVisible / 2);

    if (start < 1) {
      start = 1;
    }

    if (start + maxVisible - 1 > totalPages) {
      start = Math.max(1, totalPages - maxVisible + 1);
    }

    const length = Math.min(maxVisible, totalPages);
    return Array.from({ length }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  const handleChange = (targetPage: number) => {
    if (targetPage < 1 || targetPage > totalPages) return;
    onPageChange(targetPage - 1);
  };

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <button
        onClick={() => handleChange(currentPage)}
        disabled={currentPage === 0}
        className="cursor-pointer text-gray-700 disabled:opacity-30"
      >
        <ChevronIcon className="rotate-180" sx={{ width: 16 }} />
      </button>

      <div className="flex items-center gap-1">
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => handleChange(page)}
            className={cn(
              'text-body2-d flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-colors',
              currentPage + 1 === page
                ? 'bg-brand-dark text-brand-white'
                : 'text-gray-700 hover:bg-gray-100',
            )}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => handleChange(currentPage + 2)}
        disabled={currentPage >= totalPages - 1}
        className="cursor-pointer text-gray-700 disabled:opacity-30"
      >
        <ChevronIcon sx={{ width: 16 }} />
      </button>
    </div>
  );
};

export default Pagination;
