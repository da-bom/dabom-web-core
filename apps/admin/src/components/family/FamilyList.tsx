"use client";

import TableChartIcon from "@mui/icons-material/TableChartOutlined";

import { FAMILY } from "@shared/data/family";

import FamilyItem from "./FamilyItem";

const FamilyList = ({
  selectedFam,
  setSelectedFam,
}: {
  selectedFam: number | undefined;
  setSelectedFam: (familyId: number | undefined) => void;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 py-2">
        <TableChartIcon />
        <span className="text-h2-d">검색된 가족 ({FAMILY.length})</span>
      </div>
      <div className="border-[1px] border-gray-100" />
      <div className="flex flex-col gap-2 py-2">
        {FAMILY.map((fam) => {
          return (
            <FamilyItem
              key={fam.familyId}
              id={fam.familyId}
              customers={fam.customers}
              isSelected={fam.familyId === selectedFam}
              setSelectedFam={setSelectedFam}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FamilyList;
