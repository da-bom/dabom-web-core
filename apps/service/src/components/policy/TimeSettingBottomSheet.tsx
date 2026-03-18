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
          'bg-brand-white flex h-131 w-full flex-col items-start rounded-t-2xl px-8 pb-8 shadow-2xl',
          isClosing ? 'animate-slide-down' : 'animate-slide-up',
        )}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="mx-auto mt-6 mb-[22px] h-1 w-20 rounded-full bg-gray-100" />

        <div id="sheet-title" className="text-h2-m mb-10 w-fit">
          {title}
        </div>
        <div className="mx-auto grid h-71 w-75 grid-cols-1 grid-rows-1 place-items-center">
          <div className="bg-primary-50 pointer-events-none z-0 col-start-1 row-start-1 h-11 w-full rounded-lg" />

          <div className="z-10 col-start-1 row-start-1 flex h-full w-full items-center justify-center gap-7">
            <TimeColumn items={HOURS} selectedItem={selectedHour} onSelect={setSelectedHour} />
            <span className="text-h1-m w-fit leading-[29px] text-gray-500" aria-hidden="true">
              :
            </span>
            <TimeColumn
              items={MINUTES}
              selectedItem={selectedMinute}
              onSelect={setSelectedMinute}
            />
          </div>
        </div>

        <div className="mt-auto flex w-full justify-center">
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
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [visualIndex, setVisualIndex] = useState(items.indexOf(selectedItem));

  const [prevSelectedItem, setPrevSelectedItem] = useState(selectedItem);
  if (selectedItem !== prevSelectedItem) {
    setPrevSelectedItem(selectedItem);
    setVisualIndex(items.indexOf(selectedItem));
  }

  useEffect(() => {
    if (listRef.current) {
      const index = items.indexOf(selectedItem);
      const targetScroll = index * ITEM_HEIGHT;
      listRef.current.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  }, [items, selectedItem]);

  const handleScroll = (e: React.UIEvent<HTMLUListElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const index = Math.round(scrollTop / ITEM_HEIGHT);

    if (index >= 0 && index < items.length) {
      setVisualIndex(index);

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        if (items[index] !== selectedItem) {
          onSelect(items[index]);
        }
      }, 150);
    }
  };

  return (
    <ul
      ref={listRef}
      onScroll={handleScroll}
      className="scrollbar-hide z-10 flex h-full w-8 snap-y snap-mandatory flex-col items-center overflow-y-auto scroll-smooth py-30 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      {items.map((item, i) => {
        const isSelected = i === visualIndex;
        return (
          <li
            key={item}
            className="flex h-11 w-full shrink-0 snap-center items-center justify-center"
          >
            <span
              className={cn(
                'w-fit text-center font-semibold transition-all duration-200',
                isSelected
                  ? 'text-primary text-[24px] leading-[29px]'
                  : 'text-[20px] leading-[24px] text-gray-500',
              )}
            >
              {item}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
