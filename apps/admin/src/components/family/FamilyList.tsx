"use client";

import TableChartIcon from "@mui/icons-material/TableChartOutlined";
import { FamilySearchRequest } from "src/services/family/schema";
import { useGetFamilies } from "src/services/family/useGetFamilies";

import Error from "./Error";
import FamilyItem from "./FamilyItem";

const FamilyList = ({
  params,
  selectedFam,
  setSelectedFam,
}: {
  params: FamilySearchRequest;
  selectedFam: number | undefined;
  setSelectedFam: (familyId: number | undefined) => void;
}) => {
  const { data, isLoading } = useGetFamilies(params);

  const familyList = data?.content || [];
  const totalElements = data?.numberOfElements || 0;

  if (isLoading) {
    return <div>로딩</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 py-2">
        <TableChartIcon />
        <span className="text-h2-d">검색된 가족 ({data?.totalElements})</span>
      </div>
      <div className="border-[1px] border-gray-100" />
      <div className="flex flex-col gap-2 py-2">
        {totalElements > 0 ? (
          familyList.map((f) => (
            <FamilyItem
              key={f.familyId}
              id={f.familyId}
              customers={f.customers}
              isSelected={f.familyId === selectedFam}
              setSelectedFam={setSelectedFam}
            />
          ))
        ) : (
          <Error title="검색된 가족이 없습니다." />
        )}
      </div>
    </div>
  );
};

export default FamilyList;
