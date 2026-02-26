import { MainBox, cn } from '@shared';
import { FilterType } from 'src/types/FilterType';

const FilterButton = ({
  children,
  isSelected,
  onClick,
}: {
  children: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className={cn(
        'h-10 w-30 cursor-pointer rounded-lg',
        isSelected ? 'text-primary bg-background-sub' : 'text-gray-600',
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const FilterSegment = ({
  selectedFilter,
  setSelectedFilter,
}: {
  selectedFilter: FilterType;
  setSelectedFilter: (selectedFIlter: FilterType) => void;
}) => {
  return (
    <MainBox className="text-body1-d w-fit rounded-2xl p-4">
      <FilterButton isSelected={selectedFilter === 'ALL'} onClick={() => setSelectedFilter('ALL')}>
        전체
      </FilterButton>
      <FilterButton
        isSelected={selectedFilter === 'ACTIVE'}
        onClick={() => setSelectedFilter('ACTIVE')}
      >
        활성화
      </FilterButton>
      <FilterButton
        isSelected={selectedFilter === 'DEACTIVE'}
        onClick={() => setSelectedFilter('DEACTIVE')}
      >
        비활성화
      </FilterButton>
    </MainBox>
  );
};

export default FilterSegment;
