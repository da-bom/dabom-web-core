'use client';

import { ModalLayout } from '@shared';

interface GifticonModalProps {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  data: {
    imgUrl: string;
    brand: string;
    name: string;
    barcodeNumber: string;
  } | null;
}

const GifticonModal = ({ isOpen, onClose, data }: GifticonModalProps) => {
  if (!isOpen) return null;

  const renderErrorView = () => (
    <div className="flex flex-col items-center justify-center">
      <p>데이터를 불러오지 못했습니다.</p>
    </div>
  );

  return (
    <ModalLayout isOpen={isOpen} onClose={() => onClose(false)}>
      {!data ? (
        renderErrorView()
      ) : (
        <div className="flex flex-col items-center gap-4 px-4 py-2">
          <div className="relative h-40 w-40">
            {/* TODO: API 연결 시 Image로 수정 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.imgUrl} alt={data.name} className="h-full w-full object-contain" />{' '}
          </div>

          <div className="text-center">
            <h3 className="text-h2-m">{data.brand}</h3>
            <p className="text-body2-m">{data.name}</p>
          </div>

          <span className="text-barcode">{data.barcodeNumber}</span>
        </div>
      )}
    </ModalLayout>
  );
};

export default GifticonModal;
