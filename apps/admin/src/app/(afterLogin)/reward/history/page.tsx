'use client';

import { Suspense } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Table } from '@shared';

// 🔍 추가
import { RewardGrantParamsSchema } from 'src/api/reward/schema';
import { useGetRewardGrants } from 'src/api/reward/useGetRewardGrants';
import Loading from 'src/components/common/Loading';
import Pagination from 'src/components/common/Pagination';
import SearchBox from 'src/components/common/SearchBox';
// 🔍 추가
import { formatRewardHistory } from 'src/utils/formatRewardHistory';

const RewardHistoryContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 🔍 1. URLSearchParams를 Zod 스키마로 파싱하여 API 파라미터 생성
  const params = {
    page: Number(searchParams.get('page')) || 0,
    size: 20,
    status: searchParams.get('status') || '',
    sort: (searchParams.get('sort') as 'LATEST' | 'EXPIRING_SOON') || 'LATEST',
    unusedOnly: searchParams.get('unusedOnly') === 'true',
    phoneNumber: searchParams.get('phoneNumber') || '',
  };

  const validatedParams = RewardGrantParamsSchema.parse(params);

  // 🔍 2. 실제 API 호출
  const { data, isLoading } = useGetRewardGrants(validatedParams);

  // 🔍 3. URL 파라미터 업데이트 공통 함수
  const updateParams = (newParams: Record<string, string | number | boolean | undefined>) => {
    const nextParams = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === '' || value === false) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, String(value));
      }
    });

    // 필터 변경 시 페이지는 항상 0으로 초기화
    if (!newParams.page) nextParams.set('page', '0');

    router.push(`${pathname}?${nextParams.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    updateParams({ page: newPage });
  };

  const handleSortChange = (val: string) => {
    // SearchBox의 옵션 값에 맞춰 status나 sort 처리
    if (val === 'nouse') {
      updateParams({ unusedOnly: true });
    } else {
      updateParams({ sort: val === 'latest' ? 'LATEST' : 'EXPIRING_SOON', unusedOnly: false });
    }
  };

  const handleSearch = (type: string, val: string) => {
    if (type === '전화번호') {
      updateParams({ phoneNumber: val });
    }
    // 쿠폰번호 검색 필드가 API에 생긴다면 추가 대응
  };

  return (
    <div className="flex h-screen flex-col justify-between gap-4">
      <div className="flex flex-col gap-4">
        <SearchBox
          sortOptions={[
            { label: '최신 지급순', value: 'latest' },
            { label: '만료 임박순', value: 'expiring-soon' },
            { label: '미사용 내역만 보기', value: 'nouse' },
          ]}
          selectedSort={validatedParams.unusedOnly ? 'nouse' : validatedParams.sort.toLowerCase()}
          onSortChange={handleSortChange}
          sortName="reward-sort"
          searchOptions={['전화번호', '쿠폰번호']}
          onSearch={handleSearch}
          onClickSearch={() => {}} // SearchBox 내부에 따라 선택적 사용
        />

        {isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <Loading />
          </div>
        ) : (
          <Table
            className="rounded-md"
            headers={[
              '전화번호',
              '사용 여부',
              '상품',
              '지급 미션',
              '쿠폰 번호',
              '발급일',
              '만료일',
            ]}
            // 🔍 API에서 받은 data.content를 포맷팅하여 전달
            rows={formatRewardHistory({ history: data?.content || [] })}
          />
        )}
      </div>
      <Pagination
        currentPage={validatedParams.page}
        totalPages={data?.totalPages || 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

const RewardHistoryPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <RewardHistoryContent />
    </Suspense>
  );
};

export default RewardHistoryPage;
