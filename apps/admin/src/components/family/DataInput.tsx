'use client';

import { useState } from 'react';

import { DropDown } from '@shared';

interface DataInputProps {
  limit: {
    value: number;
    unit: string;
    total: string;
  };
  onChange?: (newByteValue: number) => void;
  onBlock?: () => void;
}

const DataInput = ({ limit, onChange }: DataInputProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const calculateBytes = (value: number, unit: string) => {
    const units: Record<string, number> = {
      MB: 1024 ** 2,
      GB: 1024 ** 3,
      TB: 1024 ** 4,
    };
    return value * (units[unit] || 1);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (onChange) {
      onChange(calculateBytes(newValue, limit.unit));
    }
  };

  const handleUnitChange = (newUnit: string) => {
    if (onChange) {
      onChange(calculateBytes(limit.value, newUnit));
    }
    setIsOpen(false);
  };

  return (
    <div className="flex w-fit items-center rounded-lg border border-gray-600">
      <input
        type="number"
        value={limit.value}
        onChange={handleNumberChange}
        className="text-body2-d h-8 w-16 border-r border-gray-600 px-2 text-center outline-none"
      />

      <DropDown
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        options={['MB', 'GB', 'TB']}
        selectedOption={limit.unit}
        setSelectedOption={handleUnitChange}
        size="xs"
      />
    </div>
  );
};

export default DataInput;
