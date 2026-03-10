'use client';

import { useState } from 'react';

import { Button, Card } from '@shared';

import GifticonModal from 'src/components/mypage/GiftModal';
import { AWARD_DATA, GIFTICON } from 'src/data/awards';

const AwardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleCardClick = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  return (
    <div className="m-5">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        {AWARD_DATA.map((item) => (
          <Card
            className="h-45"
            key={item.id}
            subtitle={item.subtitle}
            title={item.title}
            description={item.description}
          >
            {item.isUsed ? (
              <Button size="sm" color="gray" disabled isFullWidth>
                사용 완료
              </Button>
            ) : (
              <Button size="sm" color="light" isFullWidth onClick={() => handleCardClick(item.id)}>
                {item.type === 'data' ? '데이터 사용하기' : '기프티콘 보기'}
              </Button>
            )}
          </Card>
        ))}
      </div>

      <GifticonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedId !== null ? GIFTICON[selectedId] : null}
      />
    </div>
  );
};

export default AwardPage;
