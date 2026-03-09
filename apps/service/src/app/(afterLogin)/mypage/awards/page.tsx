'use client';

import { useState } from 'react';

import { Card } from '@shared';

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
    <div className="m-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        {AWARD_DATA.map((item, index) => (
          <Card
            className="h-45"
            key={item.id}
            subtitle={item.subtitle}
            title={item.title}
            description={item.description}
            buttonText={item.buttonText}
            disabled={item.isUsed}
            onClick={() => handleCardClick(index)}
          />
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
