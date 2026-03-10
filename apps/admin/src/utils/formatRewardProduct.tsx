import { ImageIcon } from '@icons';
import { Button } from '@shared';

import { Product } from 'src/api/reward/schema';

export const formatRewardProduct = ({ product }: { product: readonly Product[] }) => {
  return product.map((p) => ({
    id: p.id,
    cells: [
      <span key={p.id}>{p.id}</span>,
      <span key={p.id}>{p.type === 'DATA' ? '데이터' : '기프티콘'}</span>,
      <div key={p.id}>{p.type === 'DATA' ? '-' : <ImageIcon />}</div>,
      <span key={p.id}>{p.productName}</span>,
      <span key={p.id}>{p.price.toLocaleString()}</span>,
      <div key={p.id} className="flex justify-center">
        <Button size="sm" color="light">
          수정
        </Button>
      </div>,
    ],
  }));
};
