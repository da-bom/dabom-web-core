'use client';

import { useRouter } from 'next/router';

import { ImageIcon } from '@icons';
import { Button, Drawer, Input, MainBox, RadioGroup, TextField } from '@shared';

const RewardCreateDrawer = () => {
  const router = useRouter();
  const handleSave = () => {};
  return (
    <Drawer>
      <header className="flex flex-col gap-3">
        <h1 className="text-h2-d">보상 추가</h1>
        <p className="text-body3-d text-gray-700">유저에게 제공될 보상을 추가합니다.</p>
      </header>

      <hr className="border-gray-100" />

      <div className="flex h-full flex-col gap-8">
        <TextField label="상품">
          <RadioGroup
            name="reward-type"
            options={[
              { label: '데이터', value: 'DATA' },
              { label: '기프티콘', value: 'GIFTICON' },
            ]}
            // TODO: 기능 구현 시 값 수정
            selectedValue="DATA"
            onChange={() => {}}
          />
        </TextField>

        <TextField label="썸네일">
          <MainBox className="flex h-45 w-45 items-center justify-center text-gray-700">
            <ImageIcon />
          </MainBox>
        </TextField>

        <TextField label="상품">
          <Input type="text" placeholder="상품명을 입력하세요." className="w-82" />
        </TextField>

        <TextField label="단가">
          <Input type="number" placeholder="단가를 입력하세요." className="w-82" />
        </TextField>
      </div>

      <div className="mt-auto flex justify-end gap-2">
        <Button color="light" size="md-short" onClick={() => router.back()}>
          취소
        </Button>
        <Button color="dark" size="md" onClick={handleSave}>
          변경사항 저장
        </Button>
      </div>
    </Drawer>
  );
};

export default RewardCreateDrawer;
