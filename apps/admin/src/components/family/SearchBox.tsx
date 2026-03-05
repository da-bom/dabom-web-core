import { useState } from 'react';

import { CancelIcon, DropDown, MainBox, RadioGroup, SearchIcon } from '@shared';

const SORT_OPTION = [
  {
    label: '가나다 순',
    value: 'abc',
  },
  {
    label: '사용량 많은 순',
    value: '',
  },
  {
    label: '사용량 적은 순',
    value: '',
  },
];

const SearchBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('전화번호');
  return (
    <MainBox className="flex h-14 w-full items-center gap-5 px-5 py-3">
      <RadioGroup
        onChange={() => {
          // TODO: 선택 로직 추가
        }}
        options={SORT_OPTION}
        selectedValue="abc"
        name="family-sort"
      />
      <div className="self-stretch border border-gray-100" />
      <div className="flex w-fit items-center gap-2">
        <span className="text-body3-d">데이터 사용량</span>
        <input
          className="bg-background-base outline-brand-dark h-8 w-14 rounded-sm"
          type="number"
        />{' '}
        % ~
        <input
          className="bg-background-base outline-brand-dark h-8 w-14 rounded-sm"
          type="number"
        />{' '}
        %
      </div>
      <div className="self-stretch border border-gray-100" />
      <div className="flex flex-1 items-center gap-2">
        <MainBox className="shrink-0">
          <DropDown
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            options={['전화번호', '이름']}
            size="xs"
          />
        </MainBox>
        <div className="flex flex-1 items-center">
          <SearchIcon sx={{ width: 16 }} />
          <input className="p-1 outline-none" placeholder="검색어 입력" />
        </div>
        <button onClick={() => {}}>
          <CancelIcon className="cursor-pointer !text-gray-400" sx={{ width: 16 }} />
        </button>
      </div>
    </MainBox>
  );
};

export default SearchBox;
