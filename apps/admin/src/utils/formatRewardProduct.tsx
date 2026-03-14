import Link from 'next/link';

import { Button } from '@shared';

import { RewardTemplate } from 'src/api/reward/schema';
import ThumbnailModal from 'src/components/reward/ThumbnailModal';

export const formatRewardProduct = ({ products }: { products: readonly RewardTemplate[] }) => {
  const items = products ?? [];

  return items.map((p) => ({
    id: p.id,
    cells: [
      <span key={`${p.id}-id`}>{p.id}</span>,
      <span key={`${p.id}-type`}>{p.category === 'DATA' ? '데이터' : '기프티콘'}</span>,

      <div key={`${p.id}-icon`} className="flex justify-center">
        <ThumbnailModal url={p.thumbnailUrl} productName={p.name} />
      </div>,

      <span key={`${p.id}-name`}>{p.name}</span>,
      <span key={`${p.id}-price`}>{p.price.toLocaleString()}</span>,

      <Link key={`${p.id}-link`} className="flex justify-center" href={`/reward/products/${p.id}`}>
        <Button size="sm" color="light">
          <span>수정</span>
        </Button>
      </Link>,
    ],
  }));
};
