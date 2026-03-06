import { PersonIcon } from '@icons';
import { SubBox, Table } from '@shared';
import { FamilyDetail } from 'src/api/family/schema';
import { formatFamily } from 'src/utils/formatFamily';

const FamilyTable = ({ familyDetail }: { familyDetail: FamilyDetail }) => {
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
        })}
      />
    </SubBox>
  );
};

export default FamilyTable;
