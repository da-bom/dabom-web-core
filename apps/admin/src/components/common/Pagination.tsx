'use client';

import { ChevronIcon, cn } from '@shared';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="cursor-pointer text-gray-700 disabled:opacity-30"
      >
        <ChevronIcon className="rotate-180" sx={{ width: 16 }} />
      </button>

      <div className="flex items-center gap-1">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              'text-body2-d flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-colors',
              currentPage === page
                ? 'bg-primary-100 text-gray-900'
                : 'text-gray-700 hover:bg-gray-100',
            )}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="cursor-pointer text-gray-700 disabled:opacity-30"
      >
        <ChevronIcon sx={{ width: 16 }} />
      </button>
    </div>
  );
};

export default Pagination;
