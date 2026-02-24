"use client";

import { useState } from "react";

import RefreshIcon from "@mui/icons-material/CachedOutlined";
import { MainBox, SubBox } from "@shared";

import FamilyDetail from "@admin/components/family/FamilyDetail";
import FamilyList from "@admin/components/family/FamilyList";

const FamilyPage = () => {
  const [selectedFam, setSelectedFam] = useState<number | undefined>(undefined);
  return (
    <div className="flex h-screen w-full flex-col gap-5 overflow-hidden">
      <MainBox className="flex w-full justify-between gap-5 p-5">
        <SubBox className="h-11 w-38">type</SubBox>
        <SubBox className="w-full">search</SubBox>
        <button
          className="flex w-22 cursor-pointer items-center gap-1"
          // TODO: params 제외한 요청 다시 보내는 로직 추가
          onClick={() => setSelectedFam(undefined)}
        >
          <RefreshIcon />
          <span>초기화</span>
        </button>
      </MainBox>
      <div className="flex h-full gap-5">
        <MainBox className="w-86 p-4">
          <FamilyList
            selectedFam={selectedFam}
            setSelectedFam={setSelectedFam}
          />
        </MainBox>
        <MainBox className="w-full flex-1">
          <FamilyDetail
            selectedFam={selectedFam}
            setSelectedFam={setSelectedFam}
          />
        </MainBox>
      </div>
    </div>
  );
};

export default FamilyPage;
