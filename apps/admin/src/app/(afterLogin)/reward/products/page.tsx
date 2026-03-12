'use client';

import Link from 'next/link';

import { Button, Table } from '@shared';

import { useGetRewardTemplates } from 'src/api/reward/useGetRewards';
import Loading from 'src/components/common/Loading';
import { formatRewardProduct } from 'src/utils/formatRewardProduct';

const RewardProductPage = () => {
  const { data: templates, isLoading } = useGetRewardTemplates();

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col gap-4">
      <Link href="/reward/products/create">
        <Button size="lg" color="light">
          보상 추가하기
        </Button>
      </Link>

      <Table
        className="rounded-md"
        headers={['ID', '유형', '썸네일', '상품', '단가', '관리']}
        // 2. 서버 데이터를 포맷팅 함수에 전달
        rows={formatRewardProduct({ products: templates ?? [] })}
      />
    </div>
  );
};

export default RewardProductPage;
