'use client';

import React, { useEffect, useRef, useState } from 'react';

import { Button, HOURS, MINUTES, cn } from '@shared';

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
}: Readonly<TimeSettingSheetProps>) {
  const [selectedHour, setSelectedHour] = useState(() =>
    initialTime ? initialTime.split(':')[0] : '07',
  );
  const [selectedMinute, setSelectedMinute] = useState(() =>
    initialTime ? initialTime.split(':')[1] : '00',
  );

  const [isClosing, setIsClosing] = useState(false);
  const pendingSaveRef = useRef<string | null>(null);

  const startClosing = () => {
    setIsClosing(true);
  };

  const handleAnimationEnd = () => {
    if (isClosing) {
      if (pendingSaveRef.current) {
        onSave(pendingSaveRef.current);
        pendingSaveRef.current = null;
      }

      onClose();
      setIsClosing(false);
    }
  };

  const handleBackdropClick = () => {
    startClosing();
  };

  const handleSave = () => {
    pendingSaveRef.current = `${selectedHour}:${selectedMinute}`;
    startClosing();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
      e.preventDefault();
      startClosing();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-end justify-center">
      <button
        type="button"
        aria-label="닫기"
        className={cn(
          'fixed inset-0 cursor-default bg-black/30 backdrop-blur-[2px]',
          isClosing ? 'animate-fade-out' : 'animate-fade-in',
        )}
        onClick={handleBackdropClick}
        onKeyDown={handleKeyDown}
      />
      <dialog
        open
        aria-modal="true"
        aria-labelledby="sheet-title"
        className={cn(
          'bg-brand-white flex h-131 w-full flex-col rounded-xl px-8 pt-6 pb-8 shadow-2xl',
          isClosing ? 'animate-slide-down' : 'animate-slide-up',
        )}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="mx-auto mb-6 h-1 w-20 rounded-full bg-gray-100" />
        <div id="sheet-title" className="text-h2-m mb-4">
          {title}
        </div>
        <div className="grid h-71 w-full grid-cols-1 grid-rows-1 place-items-center">
          <div className="bg-primary-50 pointer-events-none z-0 col-start-1 row-start-1 h-11 w-full rounded-lg" />
          <div className="z-10 col-start-1 row-start-1 flex h-full w-full items-center justify-center gap-4">
            <TimeColumn items={HOURS} selectedItem={selectedHour} onSelect={setSelectedHour} />
            <span className="text-gray-500" aria-hidden="true">
              :
            </span>
            <TimeColumn
              items={MINUTES}
              selectedItem={selectedMinute}
              onSelect={setSelectedMinute}
            />
          </div>
        </div>

        <div className="mt-auto flex h-14 w-full items-center justify-center">
          <Button type="submit" size="lg" color="dark" onClick={handleSave}>
            변경사항 저장
          </Button>
        </div>
      </dialog>
    </div>
  );
}

interface TimeColumnProps {
  items: string[];
  selectedItem: string;
  onSelect: (val: string) => void;
}

function TimeColumn({ items, selectedItem, onSelect }: Readonly<TimeColumnProps>) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (listRef.current) {
      const targetScroll = items.indexOf(selectedItem) * ITEM_HEIGHT;
      listRef.current.scrollTop = targetScroll;
    }
  }, [items, selectedItem]);

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
      ref={listRef}
      onScroll={handleScroll}
      className="scrollbar-hide z-10 flex h-full w-15 snap-y snap-mandatory flex-col items-center overflow-y-auto py-30 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      {items.map((item) => {
        const isSelected = item === selectedItem;
        return (
          <li
            key={item}
            aria-current={isSelected ? 'true' : undefined}
            className={cn(
              'flex h-11 shrink-0 snap-center items-center justify-center',
              isSelected ? 'text-h1-m text-primary' : 'text-h2-m text-gray-500',
            )}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
}
