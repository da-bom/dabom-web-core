'use client';

import { ComponentPropsWithoutRef, forwardRef, useState } from 'react';

import { VisibilityIcon, VisibilityOffIcon } from '../assets/icons';
import { cn } from '../utils/cn';

type InputType = 'text' | 'password' | 'tel' | 'email' | 'number';

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  type: InputType;
  onValueChange?: (value: string) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, value, onChange, onValueChange, className, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const inputType = type === 'password' && isVisible ? 'text' : type;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(e);
      if (onValueChange) onValueChange(e.target.value);
    };

    return (
      <div
        className={cn(
          'bg-brand-white flex h-12 items-center rounded-2xl border border-gray-200 px-4 transition-colors focus-within:border-gray-500',
          className,
        )}
      >
        <input
          {...props}
          ref={ref}
          type={inputType}
          value={value}
          className="w-full bg-transparent outline-none"
          onChange={handleChange}
        />
        {type === 'password' && (
          <button
            className="cursor-pointer"
            type="button"
            onClick={() => setIsVisible((prev) => !prev)}
          >
            {isVisible ? (
              <VisibilityIcon className="text-gray-600" />
            ) : (
              <VisibilityOffIcon className="text-gray-600" />
            )}
          </button>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
