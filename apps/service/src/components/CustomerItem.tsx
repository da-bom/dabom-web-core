import bytesToGB from "@repo/shared/src/utils/bytestoGB";
import { Icon } from "@shared";
import { CustomerListType } from "src/types/dataUsage";

const WARNING_THRESHOLD = 0.6;

const CustomerItem = ({ customer }: { customer: CustomerListType }) => {
  const usageRatio =
    customer.monthlyLimitBytes > 0
      ? customer.monthlyUsedBytes / customer.monthlyLimitBytes
      : 0;
  const showWarning = usageRatio >= WARNING_THRESHOLD;

  return (
    <li className="grid grid-cols-[auto_1fr_auto] items-start gap-4">
      <div className="h-8 w-8 rounded-full bg-gray-200" />

      <div className="flex items-center gap-2 pt-1">
        <span className="text-body2-d">{customer.name}</span>
        {customer.isMe && (
          <span className="bg-primary text-caption-d rounded-full px-3 py-0.5 text-[13px] text-white">
            나
          </span>
        )}
      </div>

      <div className="flex flex-col items-end gap-1 pt-1">
        <div className="text-body2-d">
          <span>{bytesToGB(customer.monthlyUsedBytes)}GB</span>
          <span>/{bytesToGB(customer.monthlyLimitBytes)}GB</span>
        </div>

        {showWarning && (
          <div className="flex items-center gap-1">
            <Icon
              name="WarningOutline"
              width={12}
              height={12}
              className="text-negative"
            />
            <span className="text-caption-m text-negative">
              데이터 사용량 조절이 필요해요
            </span>
          </div>
        )}
      </div>
    </li>
  );
};

export default CustomerItem;
