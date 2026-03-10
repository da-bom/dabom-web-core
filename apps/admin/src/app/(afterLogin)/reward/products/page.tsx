import { Button, Table } from '@shared';

import { REWARD_PRODUCT } from 'src/data/reward';
import { formatRewardProduct } from 'src/utils/formatRewardProduct';

const RewardProductPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <Button size="lg" color="light">
        보상 추가하기
      </Button>
      <Table
        className="rounded-md"
        headers={['ID', '유형', '썸네일', '상품', '단가', '관리']}
        rows={formatRewardProduct({ product: REWARD_PRODUCT })}
      />
    </div>
  );
};

export default RewardProductPage;
