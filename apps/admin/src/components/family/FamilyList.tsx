'use client';

import { Divider } from '@shared';

import { FamilySearchRequest } from 'src/api/family/schema';
import { useGetFamilies } from 'src/api/family/useGetFamilies';

import Error from '../common/Error';
import FamilyItem from './FamilyItem';

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
    <div className="flex h-[calc(100vh-250px)] flex-col gap-2">
      <span className="text-body1-d">검색 결과 (총 {data?.totalElements}건)</span>
      <Divider />
      <div className="flex flex-col gap-2 overflow-auto py-2">
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
