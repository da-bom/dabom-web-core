'use client';

import { useState } from 'react';

import { Divider } from '@mui/material';
import { Badge, Button } from '@shared';

import { FamilyDetail as FamilyDetailType } from 'src/api/family/schema';
import { useGetFamilyDetail } from 'src/api/family/useGetFamilyDetail';
import { useUpdateFamily } from 'src/api/family/useUpdateFamily';

import Error from '../common/Error';
import Loading from '../common/Loading';
import FamilyTable from './FamilyTable';
import UsageBox from './UsageBox';

const FamilyDetailContent = ({ initialData }: { initialData: FamilyDetailType }) => {
  const [familyDetail, setFamilyDetail] = useState<FamilyDetailType>(initialData);
  const { mutate: updateFamily, isPending } = useUpdateFamily(familyDetail.familyId);

  const handleSave = () => {
    const updatePayload = {
      members: familyDetail.customers.map((c) => ({
        customerId: c.customerId,
        role: c.role as 'OWNER' | 'MEMBER',
        monthlyLimitBytes: c.monthlyLimitBytes ?? 0,
      })),
    };

    updateFamily(updatePayload);
  };

  return (
    <div className="flex h-full w-full flex-1 flex-col justify-between gap-4 p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Badge size="lg" color="primary_light">
            FAM-{familyDetail.familyId}
          </Badge>
          <span className="text-body1-d">{familyDetail.familyName}</span>
        </div>
        <Divider />
        <UsageBox familyDetail={familyDetail} />
        <FamilyTable familyDetail={familyDetail} onChange={(updated) => setFamilyDetail(updated)} />
      </div>
      <div className="flex justify-end">
        <Button color="dark" size="md" onClick={handleSave} disabled={isPending}>
          {isPending ? '저장 중...' : '변경사항 저장'}
        </Button>
      </div>
    </div>
  );
};

const FamilyDetail = ({ selectedFam }: { selectedFam: number | undefined }) => {
  const { data: serverData, isLoading } = useGetFamilyDetail(selectedFam);

  if (!selectedFam)
    return (
      <Error
        title="가족이 선택되지 않았습니다."
        description="좌측 리스트에서 가족을 선택해 주세요."
      />
    );
  if (isLoading) return <Loading />;
  if (!serverData) return <Error title="가족 정보가 존재하지 않습니다." />;

  return <FamilyDetailContent key={selectedFam} initialData={serverData} />;
};

export default FamilyDetail;
