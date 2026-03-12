'use client';

import React from 'react';

import { cn } from '@shared';

interface ChatBubbleProps {
  senderName?: string;
  message: React.ReactNode;
  time: string;
  isMe: boolean;
}

export function ChatBubble({ senderName, message, time, isMe }: ChatBubbleProps) {
  return (
    <div className={cn('flex w-full flex-col gap-1', isMe ? 'items-end' : 'items-start')}>
      {!isMe && senderName && <span className="text-caption-m leading-[17px]">{senderName}</span>}
      <div
        className={cn(
          'rounded-bubble flex w-fit max-w-[70vw] flex-col justify-center border border-gray-200 px-4 py-3',
          isMe
            ? 'bg-primary-50 rounded-br-bubble-sm items-end'
            : 'bg-brand-white rounded-bl-bubble-sm items-start',
        )}
      >
        <span className={cn('text-body1-m break-words', isMe ? 'text-right' : 'text-left')}>
          {message}
        </span>
        <span
          className={cn(
            'text-caption-m h-fit w-fit leading-[100%] text-gray-500',
            isMe ? 'text-right' : 'text-left',
          )}
        >
          {time}
        </span>
      </div>
    </div>
  );
}
