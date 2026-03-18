'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { ChevronIcon } from '../assets/icons';
import ConfirmModal from './ConfirmModal';

const Drawer = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [showConfirm, setShowConfirm] = useState(false);

  const handleCloseAttempt = () => {
    setShowConfirm(true);
  };

  const confirmClose = () => {
    setShowConfirm(false);
    router.back();
  };

  return (
    <>
      <div
        role="presentation"
        onClick={handleCloseAttempt}
        className="fixed inset-0 z-50 flex h-screen justify-end bg-black/20"
      >
        <aside
          onClick={(e) => e.stopPropagation()}
          className="bg-brand-white flex h-full w-175 flex-col border-l border-gray-300 px-11 py-8 shadow-[-4px_0_10px_rgba(0,0,0,0.1)]"
        >
          <div className="flex h-full flex-col gap-10 overflow-y-auto">
            <button className="text-brand-dark w-fit cursor-pointer" onClick={handleCloseAttempt}>
              <ChevronIcon sx={{ width: 20 }} />
            </button>
            {children}
          </div>
        </aside>
      </div>

      <ConfirmModal
        showConfirm={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmClose}
      />
    </>
  );
};

export default Drawer;
