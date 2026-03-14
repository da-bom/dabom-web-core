'use client';

import { ModalLayout } from '@shared';

import { ReceivedReward } from 'src/api/reward/schema';

interface GifticonModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ReceivedReward | null;
}

const GifticonModal = ({ isOpen, onClose, data }: GifticonModalProps) => {
  if (!isOpen) return null;

  const renderErrorView = () => (
    <div className="flex flex-col items-center justify-center py-10">
      <p className="text-body2-m text-gray-500">데이터를 불러오지 못했습니다.</p>
    </div>
  );

  const rewardInfo = data?.missionItem.reward;

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      {!data || !rewardInfo ? (
        renderErrorView()
      ) : (
        <div className="flex flex-col items-center gap-4 px-4 py-2">
          <div className="relative h-40 w-40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={rewardInfo.thumbnailUrl}
              alt={rewardInfo.name}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="text-center">
            <h3 className="text-h2-m">
              {rewardInfo.category === 'DATA' ? 'U+ 데이터' : '기프티콘'}
            </h3>
            <p className="text-body2-m">{rewardInfo.name}</p>
          </div>

          {rewardInfo.category !== 'DATA' && (
            <span className="text-barcode mt-2">0000 0000 0000</span>
          )}
        </div>
      )}
    </ModalLayout>
  );
};

export default GifticonModal;
