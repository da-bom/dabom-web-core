'use client';

import { PersonIcon } from '@icons';
import { SubBox, Table } from '@shared';

import { FamilyCustomer, FamilyDetail } from 'src/api/family/schema';
import { formatFamily } from 'src/utils/formatFamily';

interface FamilyTableProps {
  familyDetail: FamilyDetail;
  onChange: (updated: FamilyDetail) => void;
}

const FamilyTable = ({ familyDetail, onChange }: FamilyTableProps) => {
  const handleCustomerUpdate = (customerId: number, partial: Partial<FamilyCustomer>) => {
    const updatedCustomers = familyDetail.customers.map((c) =>
      c.customerId === customerId ? { ...c, ...partial } : c,
    );

    onChange({
      ...familyDetail,
      customers: updatedCustomers,
    });
  };

  return (
    <SubBox className="flex max-h-90 flex-col gap-4 p-4">
      <div className="text-body2-d flex items-center gap-2">
        <PersonIcon sx={{ width: 20 }} />
        <b>구성원 권한 및 한도 설정</b>
      </div>
      <Table
        headers={['권한', '이름', '사용량/한도']}
        rows={formatFamily({
          customer: familyDetail.customers,
          // formatFamily에 변경 핸들러 전달
          onRoleChange: (id, nextRole) => handleCustomerUpdate(id, { role: nextRole }),
          onLimitChange: (id, nextLimit) =>
            handleCustomerUpdate(id, { monthlyLimitBytes: nextLimit }),
        })}
        className="max-h-90 rounded-lg"
      />
    </SubBox>
  );
};

export default FamilyTable;
