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
        'cursor-pointer rounded-md border border-gray-300 p-2',
        isSelected ? 'bg-gray-100' : 'bg-brand-white',
      )}
      onClick={() => setSelectedFam(id)}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge className="min-w-24" color={isSelected ? 'white' : 'gray'} size="sm">
            FAM-{String(id).padStart(4, '0')}{' '}
          </Badge>
          <span className="text-body3-d">
            {customers[0]?.name} 외 {customers.length - 1}명
          </span>
        </div>
      </div>
    </button>
  );
};

export default FamilyItem;
