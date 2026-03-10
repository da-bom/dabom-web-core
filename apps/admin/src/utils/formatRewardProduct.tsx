import Link from 'next/link';

import { ImageIcon } from '@icons';
import { Button } from '@shared';

import { Product } from 'src/api/reward/schema';

export const formatRewardProduct = ({ product }: { product: readonly Product[] }) => {
  return product.map((p) => ({
    id: p.id,
    cells: [
      <span key={`${p.id}-id`}>{p.id}</span>,
      <span key={`${p.id}-type`}>{p.type === 'DATA' ? '데이터' : '기프티콘'}</span>,
      <div key={`${p.id}-icon`} className="flex justify-center">
        {p.type === 'DATA' ? '-' : <ImageIcon />}
      </div>,
      <span key={`${p.id}-name`}>{p.productName}</span>,
      <span key={`${p.id}-price`}>{p.price.toLocaleString()}</span>,
      <Link key={`${p.id}-link`} className="flex justify-center" href={`/reward/products/${p.id}`}>
        <Button size="sm" color="light">
          <span>수정</span>
        </Button>
      </Link>,
    ],
  }));
};
