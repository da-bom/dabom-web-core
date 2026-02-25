"use client";

import { useState } from "react";

import { MainBox, RefreshIcon, SubBox } from "@shared";
import FamilyDetail from "src/components/family/FamilyDetail";
import FamilyList from "src/components/family/FamilyList";
import { FamilySearchRequest } from "src/services/family/schema";

const FamilyPage = () => {
  const [selectedFam, setSelectedFam] = useState<number | undefined>(undefined);

  const INITIAL_FAMILY_SEARCH_PARAMS: FamilySearchRequest = {
    page: 0,
    size: 10,
    filters: {},
    sort: [{ field: "createdAt", direction: "desc" }],
  };

  const [params, setParams] = useState<FamilySearchRequest>(
    INITIAL_FAMILY_SEARCH_PARAMS,
  );

  const handleReset = () => {
    setSelectedFam(undefined);
    setParams(INITIAL_FAMILY_SEARCH_PARAMS);
  };

  return (
    <div className="flex h-screen w-full flex-col gap-5 overflow-hidden">
      <MainBox className="flex w-full justify-between gap-5 p-5">
        <SubBox className="h-11 w-38">type</SubBox>
        {/* TODO: 여기서 setParams({ ...params, filters: { ... } }) 호출 */}
        <SubBox className="w-full">search</SubBox>
        <button
          className="flex w-22 cursor-pointer items-center gap-1"
          onClick={handleReset}
        >
          <RefreshIcon />
          <span>초기화</span>
        </button>
      </MainBox>
      <div className="flex h-full gap-5">
        <MainBox className="w-86 p-4">
          <FamilyList
            params={params}
            selectedFam={selectedFam}
            setSelectedFam={setSelectedFam}
          />
        </MainBox>
        <MainBox className="w-full flex-1">
          <FamilyDetail selectedFam={selectedFam} />
        </MainBox>
      </div>
    </div>
  );
};

export default FamilyPage;
