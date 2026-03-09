import { SubBox, formatSize } from '@shared';
import dayjs from 'dayjs';

import { FamilyDetail } from 'src/api/family/schema';

const UsageBox = ({ familyDetail }: { familyDetail: FamilyDetail }) => {
  return (
    <SubBox className="flex flex-col gap-2 p-4">
      <p className="text-body2-d flex justify-between">
        <span>
          <b>총 사용량: </b>
          <span>{formatSize(familyDetail.usedBytes).total}</span>
        </span>
        <span>
          <b>한도: </b>
          <span>{formatSize(familyDetail.totalQuotaBytes).total}</span>
        </span>
      </p>
      <div className="h-9 w-full rounded-full bg-gray-200">
        <div
          className="bg-primary-600 h-full rounded-full transition-all duration-500"
          style={{ width: `${familyDetail.usedPercent}%` }}
        />
      </div>
      <p className="flex justify-between">
        <span className="text-body3-d text-gray-800">
          업데이트 일시: {dayjs(familyDetail.updatedAt).format('YYYY. MM. DD. HH:mm')}
        </span>
        <span className="text-body1-d text-primary-600">
          {familyDetail.usedPercent.toFixed(0)}%
        </span>
      </p>
    </SubBox>
  );
};

export default UsageBox;
