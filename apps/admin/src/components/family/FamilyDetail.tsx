'use client';

import { Badge, Button } from '@shared';
import { useGetFamilyDetail } from 'src/api/family/useGetFamilyDetail';

import Error from '../common/Error';
import FamilyTable from './FamilyTable';
import UsageBox from './UsageBox';

const FamilyDetail = ({ selectedFam }: { selectedFam: number | undefined }) => {
  const { data: familyDetail, isLoading } = useGetFamilyDetail(selectedFam);

  if (!selectedFam)
    return (
      <Error
        title="가족이 선택되지 않았습니다."
        description="좌측 리스트에서 가족을 선택해 주세요."
      />
    );

  if (isLoading) return <div>로딩</div>;

  if (!familyDetail) return <div>가족 정보 없음</div>;

  return (
    <div className="flex h-full w-full flex-1 flex-col justify-between gap-4 p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Badge size="lg" color="primary_light">
            FAM-{familyDetail.familyId}
          </Badge>
          <span className="text-body1-d">{familyDetail.familyName}</span>
        </div>
        <div className="w-full border border-gray-100" />

        <UsageBox familyDetail={familyDetail} />
        <FamilyTable familyDetail={familyDetail} />
      </div>

      <div className="flex justify-end">
        <Button color="dark" size="md">
          변경사항 저장
        </Button>
      </div>
    </div>
  );
};

export default FamilyDetail;
