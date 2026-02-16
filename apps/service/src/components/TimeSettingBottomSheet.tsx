"use client";

import React, { useState } from "react";

import { cn } from "@shared";

interface TimeSettingSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialTime: string;
  onSave: (newTime: string) => void;
}

const HOURS = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, "0"),
);
const MINUTES = Array.from({ length: 12 }, (_, i) =>
  (i * 5).toString().padStart(2, "0"),
);
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
        className={cn(
          "animate-slide-up flex w-full flex-col",
          "h-131 rounded-xl",
          "bg-brand-white shadow-2xl",
          "px-8 pt-6 pb-8",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-6 h-1 w-20 rounded-full bg-gray-100" />
        <div className="text-h2-m mb-4">{title}</div>
        <div className="grid h-71 w-full grid-cols-1 grid-rows-1 place-items-center">
          <div className="bg-primary-50 pointer-events-none z-0 col-start-1 row-start-1 h-11 w-full rounded-lg" />
          <div className="z-10 col-start-1 row-start-1 flex h-full w-full items-center justify-center gap-4">
            <TimeColumn
              items={HOURS}
              selectedItem={selectedHour}
              onSelect={setSelectedHour}
            />
            <span className="text-h2-m z-10 pb-1 text-gray-500">:</span>
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
  const setScrollRef = (node: HTMLUListElement | null) => {
    if (node) {
      const targetScroll = items.indexOf(selectedItem) * ITEM_HEIGHT;
      if (Math.abs(node.scrollTop - targetScroll) > 10) {
        node.scrollTop = targetScroll;
      }
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLUListElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const index = Math.round(scrollTop / ITEM_HEIGHT);
    if (index >= 0 && index < items.length) {
      if (items[index] !== selectedItem) {
        onSelect(items[index]);
      }
    }
  };

  return (
    <ul
      ref={setScrollRef}
      onScroll={handleScroll}
      className={cn(
        "scrollbar-hide z-10 flex h-full flex-col items-center",
        "snap-y snap-mandatory overflow-y-auto",
        // 스크롤바 숨기기
        "[&::-webkit-scrollbar]:hidden", // Chrome, Safari, Edge
        "[-ms-overflow-style:none]", // IE
        "w-15",
        "py-30",
      )}
    >
      {items.map((item) => {
        const isSelected = item === selectedItem;
        return (
          <li
            key={item}
            className={cn(
              "flex shrink-0 snap-center items-center justify-center",
              "h-11",
              isSelected
                ? "text-h1-m text-primary scale-110 font-bold"
                : "text-h2-m text-gray-500 opacity-50",
            )}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
}
