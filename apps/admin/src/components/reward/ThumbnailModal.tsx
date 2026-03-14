'use client';

import { useState } from 'react';

import { ImageIcon } from '@icons';
import { ModalLayout } from '@shared';

const ThumbnailModal = ({ url, productName }: { url: string | null; productName: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!url) {
    return <span>-</span>;
  }

  return (
    <>
      <div
        className="hover:text-primary-600 flex cursor-pointer justify-center p-1 transition-colors"
        onClick={() => setIsModalOpen(true)}
        title="이미지 미리보기"
      >
        <ImageIcon />
      </div>

      <ModalLayout isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isAdmin>
        <div className="flex flex-col items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt={`${productName}-preview`}
            className="max-h-[70vh] max-w-full object-contain"
          />
        </div>
      </ModalLayout>
    </>
  );
};

export default ThumbnailModal;
