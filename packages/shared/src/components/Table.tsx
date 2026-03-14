import React from 'react';

import { cn } from '../utils/cn';

interface TableProps {
  headers: string[];
  rows: { id: React.Key; cells: React.ReactNode[] }[];
  className?: string;
}

const Table = ({ headers, rows, className }: TableProps) => {
  return (
    <div className={cn('h-full w-full overflow-auto border border-gray-100', className)}>
      <table className="min-h-full w-full border-collapse">
        <thead className="bg-brand-dark text-brand-white text-body2-d sticky top-0 z-21 h-11">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-brand-white text-center">
          {rows.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="py-6 text-gray-400">
                데이터가 없습니다
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id} className="text-body2-d h-11 border-t border-gray-100">
                {row.cells.map((cell, cellIndex) => (
                  <td key={`${row.id}-${cellIndex}`} className="px-4 py-2">
                    <div className="flex items-center justify-center">{cell}</div>
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
