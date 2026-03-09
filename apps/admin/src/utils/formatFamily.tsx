import { Switch, formatSize } from '@shared';

import { FamilyCustomer } from 'src/api/family/schema';
import DataInput from 'src/components/family/DataInput';

export const formatFamily = ({ customer }: { customer: FamilyCustomer[] }) => {
  return customer.map((i) => ({
    id: i.customerId,
    cells: [
      <div className="flex justify-center" key={i.customerId}>
        <Switch
          type={i.role === 'OWNER' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => {
            // TODO: OWNER <> MEMBER 값이 바뀌도록
          }}
        >
          {i.role}
        </Switch>
      </div>,
      <span key={`name-${i.customerId}`}>{i.name}</span>,
      <div key={`usage-${i.customerId}`} className="flex justify-center">
        <div className="flex w-60 items-center justify-end gap-2">
          <span className="text-gray-700">
            {formatSize(i.monthlyUsedBytes).value.toFixed(0)}
            {formatSize(i.monthlyUsedBytes).unit} /{' '}
          </span>
          {i.monthlyLimitBytes ? (
            <DataInput limit={formatSize(i.monthlyLimitBytes)} />
          ) : // TODO: 데이터가 차단된 경우 추가
          null}
        </div>
      </div>,
    ],
  }));
};
