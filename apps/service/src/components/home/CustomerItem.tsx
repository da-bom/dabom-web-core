'use client';

import { ErrorOutlineIcon } from '@icons';
import { bytesToGB } from '@shared';

import { CustomerListType } from 'src/types/DataUsage';

const WARNING_THRESHOLD = 0.6;

const CustomerItem = ({ customer }: { customer: CustomerListType }) => {
  const usageRatio =
    customer.monthlyLimitBytes > 0 ? customer.monthlyUsedBytes / customer.monthlyLimitBytes : 0;
  const showWarning = usageRatio >= WARNING_THRESHOLD;

  return (
    <li className="flex h-12 w-full flex-col items-end">
      <div className="flex h-6 w-full flex-row items-center justify-between">
        <div className="flex h-6 w-fit flex-row items-center gap-[10px]">
          <span className="text-body2-d h-6 w-fit">{customer.name}</span>
          {customer.isMe && (
            <div className="bg-primary flex h-5 w-fit items-center justify-center rounded-full px-3">
              <span className="text-body3-d w-fit text-white">나</span>
            </div>
          )}
        </div>
        <span className="text-body2-d h-6 w-fit">
          {Math.round(bytesToGB(customer.monthlyUsedBytes))}GB
        </span>
      </div>

      {showWarning && (
        <div className="flex h-[17px] w-fit flex-row items-center justify-center gap-[5px]">
          <ErrorOutlineIcon sx={{ width: 12, height: 12 }} className="text-negative" />
          <span className="text-caption-m text-negative w-fit">데이터 사용량 조절이 필요해요</span>
        </div>
      )}
    </li>
  );
};

export default CustomerItem;
