'use client';
import { useState } from 'react';

import { DropDown } from '@shared';

const DataInput = ({
  limit,
}: {
  limit: {
    value: number;
    unit: string;
    total: string;
  };
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex w-fit items-center rounded-lg border border-gray-600">
      <input
        type="number"
        defaultValue={limit.value}
        className="w-16 border-r border-gray-600 px-3 text-center outline-none"
      />

      <DropDown
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        options={['MB', 'GB', 'TB']}
        selectedOption={limit.unit}
        setSelectedOption={() => {}}
        size="xs"
        className="h-8"
      />
    </div>
  );
};

export default DataInput;
