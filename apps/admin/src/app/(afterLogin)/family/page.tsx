'use client';

import { useState } from 'react';

import { MainBox, ResetIcon } from '@shared';
import { FamilySearchRequest } from 'src/api/family/schema';
import FamilyDetail from 'src/components/family/FamilyDetail';
import FamilyList from 'src/components/family/FamilyList';
import SearchBox from 'src/components/family/SearchBox';

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
    <div className="flex h-screen w-full flex-col gap-5 overflow-hidden">
      <div className="flex flex-col items-end gap-1">
        <button className="flex cursor-pointer items-center gap-1 px-1" onClick={handleReset}>
          <ResetIcon sx={{ width: 13 }} />
          <span className="text-body3-d">초기화</span>
        </button>
        <SearchBox />
      </div>
      <div className="flex h-full gap-5">
        <MainBox className="w-86 p-4">
          <FamilyList params={params} selectedFam={selectedFam} setSelectedFam={setSelectedFam} />
        </MainBox>
        <MainBox className="w-full flex-1">
          <FamilyDetail selectedFam={selectedFam} />
        </MainBox>
      </div>
    </div>
  );
};

export default FamilyPage;
