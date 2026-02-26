'use client';

import { useState } from 'react';

import { MainBox } from '@shared';
import { useGetPolicy } from 'src/services/policy/useGetPolicy';
import { FilterType } from 'src/types/FilterType';
import { formatPolicy } from 'src/utils/formatPolicy';

import Table from '@admin/components/Table';
import FilterSegment from '@admin/components/policy/FilterSegment';

const PolicyPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('ALL');
  const [page, setPage] = useState(0);

  const { data, isLoading } = useGetPolicy(selectedFilter, page);

  if (isLoading) {
    return <div className="p-10 text-center">데이터 로드 중...</div>;
  }

  if (!data) {
    return <div className="p-10 text-center">표시할 정책 데이터가 없습니다.</div>;
  }

  const policyRows = formatPolicy({ policies: data });

  return (
    <div className="flex h-screen flex-col gap-5">
      <FilterSegment
        selectedFilter={selectedFilter}
        setSelectedFilter={(filter) => {
          setSelectedFilter(filter);
          setPage(1);
        }}
      />
      <MainBox className="relative h-full p-4">
        <Table headers={['정책', '권한', '기본값', '상태', '관리']} rows={policyRows} />
      </MainBox>
    </div>
  );
};

export default PolicyPage;
