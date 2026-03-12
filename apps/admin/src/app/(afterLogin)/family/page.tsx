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
  sort: [{ field: 'createdAt', direction: 'desc' }],
};

const FamilyPage = () => {
  const [selectedFam, setSelectedFam] = useState<number | undefined>(undefined);

  const [params, setParams] = useState<FamilySearchRequest>(INITIAL_FAMILY_SEARCH_PARAMS);

  const handleReset = () => {
    setSelectedFam(undefined);
    setParams(INITIAL_FAMILY_SEARCH_PARAMS);
  };

  return (
    <div className="flex h-screen w-full flex-col gap-4 overflow-hidden">
      <div className="flex flex-col items-end gap-1">
        <button className="flex cursor-pointer items-center gap-1 px-1" onClick={handleReset}>
          <ResetIcon sx={{ width: 13 }} />
          <span className="text-body3-d">초기화</span>
        </button>
        <SearchBox
          // TODO: API 연결 시 실제 값으로 수정
          sortOptions={[
            { label: '사용량 많은 순', value: 'largest' },
            { label: '사용량 적은 순', value: 'smallest' },
            { label: '가나다 순', value: 'abc' },
          ]}
          selectedSort="largest"
          onSortChange={() => {}}
          sortName="family-sort"
          searchOptions={['전화번호', '이름']}
          onSearch={(type, val) => console.log(type, val)}
          onClickSearch={() => {}}
        >
          <div className="flex w-fit items-center gap-2">
            <span className="text-body3-d shrink-0">데이터 사용량</span>
            <input className="bg-background-base h-8 w-14 rounded-sm" type="number" /> % ~
            <input className="bg-background-base h-8 w-14 rounded-sm" type="number" /> %
          </div>
        </SearchBox>
      </div>
      <div className="flex h-full gap-5">
        <MainBox className="w-86 p-4">
          <FamilyList params={params} selectedFam={selectedFam} setSelectedFam={setSelectedFam} />
        </MainBox>
        <MainBox className="h-full w-full flex-1">
          <FamilyDetail selectedFam={selectedFam} />
        </MainBox>
      </div>
    </div>
  );
};

export default FamilyPage;
