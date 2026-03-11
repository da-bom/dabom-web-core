'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { Table } from '@shared';

import Pagination from 'src/components/common/Pagination';
import { REWARD_HISTORY } from 'src/data/reward';
import { formatRewardHistory } from 'src/utils/formatRewardHistory';

const RewardHistoryPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex h-screen flex-col justify-between">
      <Table
        className="rounded-md"
        headers={['전화번호', '사용 여부', '상품', '지급 미션', '쿠폰 번호', '발급일', '만료일']}
        rows={formatRewardHistory({ history: REWARD_HISTORY })}
      />
      <Pagination
        currentPage={currentPage}
        // TODO: API 연결 후 반영
        // totalPages={data.totalPages}
        totalPages={5}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default RewardHistoryPage;
