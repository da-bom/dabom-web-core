import React from 'react';

interface TableProps {
  headers: string[];
  rows: { id: React.Key; cells: React.ReactNode[] }[];
}

const Table = ({ headers, rows }: TableProps) => {
  return (
    <div className="w-full overflow-hidden rounded-lg border-[1px] border-gray-100">
      <table className="w-full border-collapse">
        <thead className="bg-brand-dark text-brand-white text-body2-d h-11">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-brand-white text-center">
          {rows.map((row, index) => (
            <tr key={index} className="text-body2-d h-11 border-t border-gray-100">
              {row.cells.map((cell, cellIndex) => (
                <td key={`${row.id}-${cellIndex}`} className="px-4 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
