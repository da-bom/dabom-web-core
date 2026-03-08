'use client';

import { useState } from 'react';

import { Card } from '@shared';
import { AWARD_DATA, GIFTICON } from 'src/data/awards';

import GifticonModal from '@service/components/mypage/GiftModal';

const AwardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className="m-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        {AWARD_DATA.map((item, index) => (
          <Card
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
        data={selectedIndex !== null ? GIFTICON[selectedIndex] : null}
      />
    </div>
  );
};

export default AwardPage;
