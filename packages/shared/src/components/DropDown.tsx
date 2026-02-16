"use client";

import { useEffect, useRef, useState } from "react";

import Icon from "./Icon";

const DropDown = ({
  options,
  selectedOption,
  setSelectedOption,
}: {
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-82" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand-white flex h-12 w-full cursor-pointer items-center justify-between rounded-xl border-[1px] border-gray-200 px-4 hover:border-gray-300 active:bg-gray-50"
        aria-label="dropdown"
      >
        <span className="text-body1-m text-gray-800">{selectedOption}</span>
        <div
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <Icon name="Chevron" className="-rotate-90"></Icon>
        </div>
      </button>

      {isOpen && (
        <div className="bg-brand-white absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 shadow-lg">
          {options.map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => {
                setSelectedOption(option);
                setIsOpen(false);
              }}
              className="text-body1-m flex h-12 cursor-pointer items-center px-4 text-gray-700 transition-colors hover:bg-gray-100"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
