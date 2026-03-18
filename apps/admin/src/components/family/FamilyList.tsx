'use client';

import { Divider } from '@shared';

import { FamilySearchRequest } from 'src/api/family/schema';
import { useGetFamilies } from 'src/api/family/useGetFamilies';

import Error from '../common/Error';
import Loading from '../common/Loading';
import Pagination from '../common/Pagination';
import FamilyItem from './FamilyItem';

interface FamilyListProps {
  params: FamilySearchRequest;
  selectedFam: number | undefined;
  setSelectedFam: (familyId: number | undefined) => void;
  onPageChange: (page: number) => void;
}

const FamilyList = ({ params, selectedFam, setSelectedFam, onPageChange }: FamilyListProps) => {
  const { data, isLoading, isFetching } = useGetFamilies(params);

  const familyList = data?.content || [];
  const totalElements = data?.totalElements || 0;
  const totalPages = data?.totalPages || 0;
  const currentPage = params.page || 0;

  // ✅ 필터가 'name'일 때의 검색어 추출
  const nameFilterValue = params.filters?.name?.value || '';

  if (isLoading) return <Loading />;

  return (
    <div className="relative flex h-full flex-col gap-2">
      {isFetching && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50">
          <Loading />
        </div>
      )}
      <span className="text-body1-d">검색 결과 (총 {totalElements}건)</span>
      <Divider />

      <div className="flex flex-1 flex-col gap-2 overflow-auto py-2">
        {familyList.length > 0 ? (
          familyList.map((f) => (
            <FamilyItem
              key={f.familyId}
              id={f.familyId}
              customers={f.customers}
              isSelected={f.familyId === selectedFam}
              setSelectedFam={setSelectedFam}
              highlightQuery={nameFilterValue}
            />
          ))
        ) : (
          <Error title="검색된 가족이 없습니다." />
        )}
      </div>

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </div>
  );
};

export default FamilyList;
