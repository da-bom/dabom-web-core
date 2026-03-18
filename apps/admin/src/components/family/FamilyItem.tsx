'use client';

import { Fragment, useMemo } from 'react';

import { Badge, cn } from '@shared';

import { Customer } from '@shared/types/familyType';

interface FamilyItemProps {
  id: number;
  customers: Customer[];
  isSelected: boolean;
  setSelectedFam: (familyId: number) => void;
  highlightQuery?: string;
}

const FamilyItem = ({
  id,
  customers,
  isSelected,
  setSelectedFam,
  highlightQuery,
}: Readonly<FamilyItemProps>) => {
  const MAX_VISIBLE = 3;

  const displayInfo = useMemo(() => {
    if (!highlightQuery?.trim()) {
      return {
        list: customers.slice(0, MAX_VISIBLE),
        hasMore: customers.length > MAX_VISIBLE,
      };
    }

    const matched: Customer[] = [];
    const others: Customer[] = [];

    customers.forEach((c) => {
      if (c.name.includes(highlightQuery)) {
        matched.push(c);
      } else {
        others.push(c);
      }
    });

    let visibleList = matched.slice(0, MAX_VISIBLE);

    const remainingSlots = MAX_VISIBLE - visibleList.length;
    if (remainingSlots > 0 && others.length > 0) {
      visibleList = [...visibleList, ...others.slice(0, remainingSlots)];
    }

    const hasMore = customers.length > visibleList.length;

    return { list: visibleList, hasMore };
  }, [customers, highlightQuery]);

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
            FAM-{String(id).padStart(4, '0')}
          </Badge>

          <div className="text-body3-d flex items-center gap-x-1 text-gray-700">
            {displayInfo.list.map((customer, index) => {
              const isHighlighted = highlightQuery && customer.name.includes(highlightQuery);

              return (
                <Fragment key={customer.customerId}>
                  <span
                    className={cn(
                      isHighlighted && 'text-brand-dark bg-primary-100 rounded-sm font-bold',
                    )}
                  >
                    {customer.name}
                  </span>
                  {(index < displayInfo.list.length - 1 || displayInfo.hasMore) && <span>,</span>}
                </Fragment>
              );
            })}

            {displayInfo.hasMore && <span>...</span>}
          </div>
        </div>
      </div>
    </button>
  );
};

export default FamilyItem;
