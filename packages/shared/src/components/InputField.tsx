'use client';

import { useState } from 'react';

import { VisibilityIcon, VisibilityOffIcon } from '../assets/icons';

type InputType = 'text' | 'password' | 'tel' | 'email';

interface InputFieldProps {
  label: string;
  type: InputType;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const Input = ({
  placeholder,
  type,
  value,
  onChange,
}: {
  placeholder: string;
  type: InputType;
  value: string;
  onChange: (value: string) => void;
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const inputType = type === 'password' && isVisible ? 'text' : type;

  return (
    <div className="bg-brand-white flex h-12 w-82 items-center rounded-2xl border-[1px] border-gray-200 px-4">
      <input
        type={inputType}
        value={value}
        className="w-full outline-none"
        placeholder={placeholder}
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

const InputField = ({
  label,
  type,
  placeholder = '입력하세요',
  value,
  onChange,
}: InputFieldProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <label className="body1-m text-gray-800">{label}</label>
      <Input placeholder={placeholder} type={type} value={value} onChange={onChange} />
    </div>
  );
};

export default InputField;
