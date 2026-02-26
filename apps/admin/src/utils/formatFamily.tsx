import { Switch, formatSize } from '@shared';
import { FamilyCustomer } from 'src/services/family/schema';

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
      <div key={`usage-${i.customerId}`} className="flex justify-center gap-1">
        <span className="text-gray-700">{formatSize(i.monthlyUsedBytes).value} /</span>
        <input
          type="number"
          className="w-13 rounded border-[1px] border-gray-600 px-4 text-center outline-none"
          // TODO: 한도가 없는 경우 UI 추가
          value={i.monthlyLimitBytes ? formatSize(i.monthlyLimitBytes).value : 0}
          onChange={() => {
            // TODO: 기능 구현 시 추가
          }}
        />
        <span>{i.monthlyLimitBytes ? formatSize(i.monthlyLimitBytes).unit : 'GB'}</span>
      </div>,
    ],
  }));
};
