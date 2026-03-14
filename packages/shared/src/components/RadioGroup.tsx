'use client';

import { ErrorIcon } from '../assets/icons';

interface RadioOption {
  label: string;
  value: string;
  subLabel?: string;
  isWarning?: boolean;
}

interface RadioGroupProps {
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  name: string; // 라디오 그룹을 식별하는 고유 이름
}

const RadioGroup = ({ options, selectedValue, onChange, name }: RadioGroupProps) => {
  return (
    <>
      {options.map((option, idx) => (
        <label key={`option.value-${idx}`} className="flex cursor-pointer items-center gap-2">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            className="checked:border-primary-600 h-4 w-4 cursor-pointer appearance-none rounded-full border-1 border-gray-300 transition-all duration-150 ease-in-out checked:border-[4.5px] checked:bg-white"
          />

          <div className="flex flex-1 flex-col gap-0.5">
            <span className="text-body2-d shrink-0">{option.label}</span>
            {option.subLabel && (
              <div className="flex items-center gap-1">
                {option.isWarning && <ErrorIcon className="text-primary-700 h-3 w-3" />}
                <span
                  className={`text-caption-d ${option.isWarning ? 'text-primary-700' : 'text-gray-500'}`}
                >
                  {option.subLabel}
                </span>
              </div>
            )}
          </div>
        </label>
      ))}
    </>
  );
};

export default RadioGroup;
