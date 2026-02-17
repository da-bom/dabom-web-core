"use client";

import React, { useEffect, useRef, useState } from "react";

import { cn } from "@shared";

import { HOURS, MINUTES } from "@shared/data/times";

interface TimeSettingSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialTime: string;
  onSave: (newTime: string) => void;
}

const ITEM_HEIGHT = 44;

export default function TimeSettingSheet({
  isOpen,
  onClose,
  title,
  initialTime,
  onSave,
}: TimeSettingSheetProps) {
  const [selectedHour, setSelectedHour] = useState(() =>
    initialTime ? initialTime.split(":")[0] : "07",
  );
  const [selectedMinute, setSelectedMinute] = useState(() =>
    initialTime ? initialTime.split(":")[1] : "00",
  );

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSave = () => {
    onSave(`${selectedHour}:${selectedMinute}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "animate-fade-in fixed inset-0 z-100 flex items-end justify-center",
        "bg-black/30 backdrop-blur-[2px]",
      )}
      onClick={handleBackdropClick}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        className="animate-slide-up bg-brand-white flex h-131 w-full flex-col rounded-xl px-8 pt-6 pb-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-6 h-1 w-20 rounded-full bg-gray-100" />
        <div id="sheet-title" className="text-h2-m mb-4">
          {title}
        </div>
        <div className="grid h-71 w-full grid-cols-1 grid-rows-1 place-items-center">
          <div className="bg-primary-50 pointer-events-none z-0 col-start-1 row-start-1 h-11 w-full rounded-lg" />
          <div className="z-10 col-start-1 row-start-1 flex h-full w-full items-center justify-center gap-4">
            <TimeColumn
              items={HOURS}
              selectedItem={selectedHour}
              onSelect={setSelectedHour}
            />
            <span
              className="text-h2-m z-10 pb-1 text-gray-500"
              aria-hidden="true"
            >
              :
            </span>
            <TimeColumn
              items={MINUTES}
              selectedItem={selectedMinute}
              onSelect={setSelectedMinute}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className={cn(
            "text-body1-m flex w-full items-center justify-center rounded-2xl",
            "mt-auto h-14",
            "bg-brand-dark text-brand-white",
          )}
        >
          변경사항 저장
        </button>
      </div>
    </div>
  );
}

interface TimeColumnProps {
  items: string[];
  selectedItem: string;
  onSelect: (val: string) => void;
}

function TimeColumn({ items, selectedItem, onSelect }: TimeColumnProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (listRef.current) {
      const targetScroll = items.indexOf(selectedItem) * ITEM_HEIGHT;
      listRef.current.scrollTop = targetScroll;
    }
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLUListElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const index = Math.round(scrollTop / ITEM_HEIGHT);

    if (index >= 0 && index < items.length) {
      if (items[index] !== selectedItem) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
          onSelect(items[index]);
        }, 100);
      }
    }
  };

  return (
    <ul
      ref={listRef}
      onScroll={handleScroll}
      tabIndex={0}
      className="scrollbar-hide z-10 flex h-full w-15 snap-y snap-mandatory flex-col items-center overflow-y-auto py-30 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      {items.map((item) => {
        const isSelected = item === selectedItem;
        return (
          <li
            key={item}
            aria-selected={isSelected}
            role="option"
            className={cn(
              "flex h-11 shrink-0 snap-center items-center justify-center",
              isSelected
                ? "text-h1-m text-primary font-bold transition-all duration-200"
                : "text-h2-m text-gray-500 opacity-50 transition-all duration-200",
            )}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
}
