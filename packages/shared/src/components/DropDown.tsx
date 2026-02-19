"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "../utils/cn";
import Icon from "./Icon";

const DropDown = ({
  options,
  selectedOption,
  setSelectedOption,
  size = "lg",
}: {
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  size?: "sm" | "lg";
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
    <div
      className={cn("relative", size == "sm" ? "w-20" : "w-82")}
      ref={containerRef}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-full cursor-pointer items-center justify-between px-4"
        aria-label="dropdown"
      >
        <span className="text-body1-m text-gray-800">{selectedOption}</span>
        <div
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <Icon name="Chevron" className="-rotate-90 text-gray-800"></Icon>
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
              className="text-body1-m flex h-12 w-full cursor-pointer items-center px-4 text-gray-700 transition-colors hover:bg-gray-100"
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
