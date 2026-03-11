'use client';

import router from 'next/router';

import { ImageIcon } from '@icons';
import { Button, Drawer, Input, MainBox, TextField } from '@shared';

const RewardCreateDrawer = () => {
  const handleSave = () => {};
  const handleDelete = () => {};
  return (
    <Drawer>
      <header className="flex flex-col gap-3">
        <h1 className="text-h2-d">보상 수정</h1>
        <p className="text-body3-d text-gray-700">유저에게 제공될 보상을 수정합니다.</p>
      </header>

      <hr className="border-gray-100" />

      <div className="flex h-full flex-col gap-8">
        <TextField label="상품">
          <div className="text-body3-d bg-background-base rounded-md p-2 text-gray-700">
            유형은 변경할 수 없습니다.
          </div>
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
      <div className="flex justify-between">
        <Button color="light" size="md-short" className="text-negative" onClick={handleDelete}>
          삭제
        </Button>
        <div className="mt-auto flex gap-2">
          <Button color="light" size="md-short" onClick={() => router.back()}>
            취소
          </Button>
          <Button color="dark" size="md" onClick={handleSave}>
            변경사항 저장
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default RewardCreateDrawer;
