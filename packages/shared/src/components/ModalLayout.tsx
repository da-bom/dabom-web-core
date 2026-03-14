'use client';

import React from 'react';

import { CloseIcon } from '../assets/icons';
import { cn } from '../utils/cn';

interface ModalLayoutProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isAdmin?: boolean;
  className?: string;
}

const ModalLayout = ({
  isOpen,
  onClose,
  children,
  isAdmin = false,
  className,
}: ModalLayoutProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-51 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div
        className={cn(
          'relative z-10 min-h-50 rounded-2xl bg-white',
          isAdmin ? 'w-fit p-10' : 'w-[85%] p-6',
          className,
        )}
      >
        <button onClick={onClose} className="absolute top-4 right-4 cursor-pointer">
          <CloseIcon sx={{ width: isAdmin ? 24 : 20, height: isAdmin ? 24 : 20 }} />
        </button>

        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
