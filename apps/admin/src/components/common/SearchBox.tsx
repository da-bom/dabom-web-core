'use client';

import React, { useState } from 'react';

import { CancelIcon, SearchIcon } from '@icons';
import { Button, DropDown, MainBox, RadioGroup } from '@shared';

interface FilterOption {
  label: string;
  value: string;
}

interface SearchBoxProps {
  sortOptions: FilterOption[];
  selectedSort: string;
  onSortChange: (value: string) => void;
  sortName: string;
  children?: React.ReactNode;
  searchOptions: string[];
  onSearch: (type: string, keyword: string) => void;
  onReset?: () => void;
}

const SearchBox = ({
  sortOptions,
  selectedSort,
  onSortChange,
  sortName,
  children,
  searchOptions,
  onSearch,
  onReset,
}: SearchBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSearchType, setSelectedSearchType] = useState(searchOptions[0]);
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(selectedSearchType, keyword);
  };

  return (
    <MainBox className="flex w-full flex-wrap items-center gap-5 py-3 pr-3 pl-5">
      <div className="flex shrink-0 items-center gap-5">
        <RadioGroup
          onChange={onSortChange}
          options={sortOptions}
          selectedValue={selectedSort}
          name={sortName}
        />
      </div>

      {children && (
        <div className="flex shrink-0 items-center gap-5">
          <div className="h-6 border-l border-gray-100" />
          <div className="shrink-0">{children}</div>
          <div className="h-6 border-l border-gray-100" />
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-1 items-center gap-2">
        <MainBox className="shrink-0">
          <DropDown
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            selectedOption={selectedSearchType}
            setSelectedOption={setSelectedSearchType}
            options={searchOptions}
            size="xs"
          />
        </MainBox>

        <SearchIcon sx={{ width: 16, height: 16 }} className="text-brand-dark shrink-0" />

        <input
          className="outline-brand-dark min-w-0 flex-1 p-1"
          placeholder="검색어 입력"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button
          type="button"
          className="shrink-0"
          onClick={() => {
            setKeyword('');
            onReset?.();
          }}
        >
          <CancelIcon className="cursor-pointer !text-gray-400" sx={{ width: 16 }} />
        </button>

        <Button type="submit" size="sm" color="dark" className="shrink-0">
          검색
        </Button>
      </form>
    </MainBox>
  );
};

export default SearchBox;
