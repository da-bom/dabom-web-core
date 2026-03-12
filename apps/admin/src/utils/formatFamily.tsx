import { Switch, formatSize } from '@shared';

import { FamilyCustomer } from 'src/api/family/schema';
import DataInput from 'src/components/family/DataInput';

export const formatFamily = ({ customer }: { customer: FamilyCustomer[] }) => {
  return customer.map((i) => {
    const usage = formatSize(i.monthlyUsedBytes);
    const limit = i.monthlyLimitBytes ? formatSize(i.monthlyLimitBytes) : null;

    return {
      id: i.customerId,
      cells: [
        <Switch
          key={`role-${i.customerId}`}
          type={i.role === 'OWNER' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => {
            // TODO: OWNER <> MEMBER 값이 바뀌도록
          }}
        >
          {i.role}
        </Switch>,

        <span key={`name-${i.customerId}`}>{i.name}</span>,

        <span key={`usage-${i.customerId}`} className="flex w-60 items-center justify-end gap-2">
          <span className="text-gray-700">
            {usage.value.toFixed(0)}
            {usage.unit} /
          </span>
          {limit ? (
            <DataInput limit={limit} />
          ) : // TODO: 데이터가 차단된 경우 추가
          null}
        </span>,
      ],
    };
  });
};
