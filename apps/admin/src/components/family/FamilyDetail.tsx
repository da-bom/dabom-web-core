'use client';

import PersonIcon from '@mui/icons-material/PeopleOutlined';
import { Badge, Button, SubBox, formatSize } from '@shared';
import dayjs from 'dayjs';
import { useGetFamilyDetail } from 'src/services/family/useGetFamilyDetail';
import { formatFamily } from 'src/utils/formatFamily';

import Table from '../Table';

const FamilyDetail = ({ selectedFam }: { selectedFam: number | undefined }) => {
  const { data: familyDetail, isLoading } = useGetFamilyDetail(selectedFam);

  if (!selectedFam) return <div>선택된 가족 없음</div>;

  if (isLoading) return <div>로딩</div>;

  if (!familyDetail) return <div>가족 정보 없음</div>;

  return (
    <div className="flex h-full flex-col justify-between p-4">
      <div className="flex items-center gap-2">
        <Badge size="lg" color="outline">
          FAM-{familyDetail.familyId}
        </Badge>
        <span className="text-h2-d">{familyDetail.familyName} 상세 관리</span>
      </div>
      <div className="w-full border-[1px] border-gray-100" />

      <SubBox className="flex flex-col gap-4 p-4">
        <p className="text-body1-d flex justify-between">
          <span>총 사용량: {formatSize(familyDetail.usedBytes).total}</span>
          <span>한도: {formatSize(familyDetail.totalQuotaBytes).total}</span>
        </p>
        <div className="h-9 w-full rounded-full bg-gray-200">
          <div
            className="bg-primary h-full rounded-full transition-all duration-500"
            style={{ width: `${familyDetail.usedPercent}%` }}
          />
        </div>
        <p className="flex justify-between">
          <span className="text-body2-d text-gray-800">
            업데이트 일시: {dayjs(familyDetail.updatedAt).format('YYYY. MM. DD. HH:mm')}
          </span>
          <span className="text-h2-d text-primary">{familyDetail.usedPercent.toFixed(1)}%</span>
        </p>
      </SubBox>

      <SubBox className="flex flex-col gap-4 p-4">
        <div className="flex items-center gap-2">
          <PersonIcon />
          <span className="text-body1-d">구성원 권한 및 한도 설정</span>
        </div>
        <Table
          headers={['권한', '이름', '사용량/한도']}
          rows={formatFamily({
            customer: familyDetail.customers,
          })}
        />
      </SubBox>

      <div className="flex justify-end">
        <Button color="dark" size="md">
          변경사항 저장
        </Button>
      </div>
    </div>
  );
};

export default FamilyDetail;
