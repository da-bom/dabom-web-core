'use client';

import { useState } from 'react';

import { ResetIcon } from '@icons';
import { MainBox } from '@shared';

import { FamilySearchRequest } from 'src/api/family/schema';
import SearchBox from 'src/components/common/SearchBox';
import FamilyDetail from 'src/components/family/FamilyDetail';
import FamilyList from 'src/components/family/FamilyList';

const INITIAL_FAMILY_SEARCH_PARAMS: FamilySearchRequest = {
  page: 0,
  size: 15,
  filters: {},
  sort: [{ field: 'name', direction: 'ASC' }],
};

const FamilyPage = () => {
  const [selectedFam, setSelectedFam] = useState<number | undefined>(undefined);
  const [params, setParams] = useState<FamilySearchRequest>(INITIAL_FAMILY_SEARCH_PARAMS);
  const [usageRange, setUsageRange] = useState({ min: '', max: '' });

  console.log(params);

  const handleSearch = (type: string, keyword: string) => {
    console.log('여기 들어왓나?');
    setParams((prev) => ({
      ...prev,
      page: 0,
      filters: {
        name: type === '이름' && keyword ? { operator: 'contains', value: keyword } : undefined,
        phone:
          type === '전화번호' && keyword ? { operator: 'contains', value: keyword } : undefined,
        usageRate:
          usageRange.min || usageRange.max
            ? {
                operator: 'between',
                min: Number(usageRange.min) || 0,
                max: Number(usageRange.max) || 100,
              }
            : undefined,
      },
    }));
  };

  const handleSortChange = (value: string) => {
    const [field, direction] = value.split('_');
    setParams((prev) => ({
      ...prev,
      sort: [{ field, direction: direction as 'ASC' | 'DESC' }],
    }));
  };

  const handleReset = () => {
    setSelectedFam(undefined);
    setParams(INITIAL_FAMILY_SEARCH_PARAMS);
    setUsageRange({ min: '', max: '' });
  };

  const currentSortValue = params.sort?.[0]
    ? `${params.sort[0].field}_${params.sort[0].direction}`
    : 'name_ASC';

  return (
    <div className="flex h-screen w-full flex-col gap-4 overflow-hidden">
      <div className="flex flex-col items-end gap-1">
        <button className="flex cursor-pointer items-center gap-1 px-1" onClick={handleReset}>
          <ResetIcon sx={{ width: 13 }} />
          <span className="text-body3-d">초기화</span>
        </button>
        <SearchBox
          sortOptions={[
            { label: '가나다 순', value: 'name_ASC' },
            { label: '사용량 많은 순', value: 'usageRate_DESC' },
            { label: '사용량 적은 순', value: 'usageRate_ASC' },
          ]}
          selectedSort={currentSortValue}
          onSortChange={handleSortChange}
          sortName="family-sort"
          searchOptions={['이름', '전화번호']}
          onSearch={handleSearch}
          onReset={handleReset}
        >
          <div className="flex w-fit items-center gap-2">
            <span className="text-body2-d shrink-0">데이터 사용량</span>
            <input
              className="bg-background-base outline-brand-dark h-8 w-14 rounded-sm px-1 text-center"
              type="number"
              value={usageRange.min}
              onChange={(e) => setUsageRange((prev) => ({ ...prev, min: e.target.value }))}
            />
            <span className="text-body2-d">% ~</span>
            <input
              className="bg-background-base outline-brand-dark h-8 w-14 rounded-sm px-1 text-center"
              type="number"
              value={usageRange.max}
              onChange={(e) => setUsageRange((prev) => ({ ...prev, max: e.target.value }))}
            />
            <span className="text-body2-d">%</span>
          </div>
        </SearchBox>
      </div>

      <div className="flex h-full gap-5 overflow-hidden">
        <MainBox className="h-full w-86 p-4">
          <FamilyList params={params} selectedFam={selectedFam} setSelectedFam={setSelectedFam} />
        </MainBox>
        <MainBox className="h-full w-full flex-1 overflow-auto">
          <FamilyDetail selectedFam={selectedFam} />
        </MainBox>
      </div>
    </div>
  );
};

export default FamilyPage;
