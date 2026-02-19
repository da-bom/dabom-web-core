import { Switch, formatSize } from "@shared";

import { CustomerDetail } from "@shared/types/familyType";

export const formatFamily = ({ customer }: { customer: CustomerDetail[] }) => {
  return customer.map((i) => ({
    id: i.customerId,
    cells: [
      <Switch
        key={i.customerId}
        type={i.role === "OWNER" ? "primary" : "secondary"}
        size="sm"
        onClick={() => {
          // TODO: OWNER <> MEMBER 값이 바뀌도록
        }}
      >
        {i.role}
      </Switch>,
      <span key={`name-${i.customerId}`}>{i.name}</span>,
      <div key={`usage-${i.customerId}`} className="flex justify-center gap-1">
        <span className="text-gray-700">
          {formatSize(i.monthlyUsedBytes).value} /
        </span>
        <input
          type="number"
          className="w-13 rounded border-[1px] border-gray-600 px-4 text-center outline-none"
          value={formatSize(i.monthlyLimitBytes).value}
          onChange={() => {
            // TODO: 기능 구현 시 추가
          }}
        />
        <span>{formatSize(i.monthlyLimitBytes).unit}</span>
      </div>,
    ],
  }));
};
