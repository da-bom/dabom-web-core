import { Switch, formatSize } from '@shared';

import { FamilyCustomer } from 'src/api/family/schema';
import DataInput from 'src/components/family/DataInput';

interface FormatFamilyProps {
  customer: FamilyCustomer[];
  onRoleChange: (customerId: number, nextRole: 'OWNER' | 'MEMBER') => void;
  onLimitChange: (customerId: number, nextLimit: number | null) => void;
}

export const formatFamily = ({ customer, onRoleChange, onLimitChange }: FormatFamilyProps) => {
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
            const nextRole = i.role === 'OWNER' ? 'MEMBER' : 'OWNER';
            onRoleChange(i.customerId, nextRole);
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
          {i.monthlyLimitBytes !== null && limit ? (
            <DataInput
              limit={limit}
              onChange={(newByteValue) => onLimitChange(i.customerId, newByteValue)}
              onBlock={() => onLimitChange(i.customerId, null)}
            />
          ) : (
            <div>한도 없음</div>
          )}
        </span>,
      ],
    };
  });
};
