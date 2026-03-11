'use client';

import { Suspense } from 'react';

// 1. Suspense 임포트
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Table } from '@shared';

import Pagination from 'src/components/common/Pagination';
import SearchBox from 'src/components/family/SearchBox';
import { REWARD_HISTORY } from 'src/data/reward';
import { formatRewardHistory } from 'src/utils/formatRewardHistory';

const RewardHistoryContent = () => {
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
    <div className="flex h-screen flex-col justify-between gap-4">
      <div className="flex flex-col gap-4">
        <SearchBox
          sortOptions={[
            { label: '최신 지급순', value: 'latest' },
            { label: '만료 임박순', value: 'manryo' },
            { label: '미사용 내역만 보기 ', value: 'nouse' },
          ]}
          selectedSort="latest"
          onSortChange={() => {}}
          sortName="reward-sort"
          searchOptions={['전화번호', '쿠폰번호']}
          onSearch={(type, val) => console.log(type, val)}
        />

        <Table
          className="rounded-md"
          headers={['전화번호', '사용 여부', '상품', '지급 미션', '쿠폰 번호', '발급일', '만료일']}
          rows={formatRewardHistory({ history: REWARD_HISTORY })}
        />
      </div>
      <Pagination currentPage={currentPage} totalPages={5} onPageChange={handlePageChange} />
    </div>
  );
};

const RewardHistoryPage = () => {
  return (
    <Suspense fallback={<div>로딩</div>}>
      <RewardHistoryContent />
    </Suspense>
  );
};

export default RewardHistoryPage;
