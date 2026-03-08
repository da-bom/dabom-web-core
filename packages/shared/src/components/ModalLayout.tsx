'use client';

import React from 'react';

import { CloseIcon } from '../assets/icons';

interface ModalLayoutProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalLayout = ({ isOpen, onClose, children }: ModalLayoutProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 min-h-50 w-[85%] rounded-2xl bg-white p-6">
        <button onClick={onClose} className="absolute top-4 right-4 cursor-pointer">
          <CloseIcon sx={{ width: 20 }} />
        </button>

        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
