'use client';

import { ComponentPropsWithoutRef, useState } from 'react';

import { VisibilityIcon, VisibilityOffIcon } from '../assets/icons';

type InputType = 'text' | 'password' | 'tel' | 'email';

export interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'onChange'> {
  type: InputType;
  value: string;
  onChange: (value: string) => void;
}

const Input = ({ type, value, onChange, ...props }: InputProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const inputType = type === 'password' && isVisible ? 'text' : type;

  return (
    <div className="bg-brand-white flex h-12 items-center rounded-2xl border border-gray-200 px-4">
      <input
        {...props}
        type={inputType}
        value={value}
        className="w-full outline-none"
        onChange={(e) => onChange(e.target.value)}
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
};

export default Input;
