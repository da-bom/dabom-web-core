import { Badge, cn } from '@shared';

import { Customer } from '@shared/types/familyType';

interface FamilyItemProps {
  id: number;
  customers: Customer[];
  isSelected: boolean;
  setSelectedFam: (familyId: number) => void;
}

const FamilyItem = ({ id, customers, isSelected, setSelectedFam }: Readonly<FamilyItemProps>) => {
  return (
    <button
      type="button"
      className={cn(
        'flex w-full flex-col justify-between transition-colors',
        'cursor-pointer rounded-md border-[1px] p-2',
        isSelected ? 'bg-primary-50 border-primary-300' : 'bg-brand-white border-gray-300',
      )}
      onClick={() => setSelectedFam(id)}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge color={isSelected ? 'white' : 'gray'} size="sm">
            FAM-{id}
          </Badge>
          <span className="text-body1-d">{customers[0]?.name}</span>
        </div>
        <span className="text-caption-d text-gray-500">{customers.length}명</span>
      </div>

      <div className="flex w-full flex-wrap">
        <span className="text-caption-d text-gray-500">
          {customers.map((c) => c.name).join(', ')}
        </span>
      </div>
    </button>
  );
};

export default FamilyItem;
