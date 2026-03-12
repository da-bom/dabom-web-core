'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useParams, useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { ImageIcon } from '@icons';
import { Button, Drawer, Input, MainBox, TextField } from '@shared';

import { RewardUpdate, RewardUpdateSchema } from 'src/api/reward/schema';
import { useDeleteReward } from 'src/api/reward/useDeleteReward';
import { useUpdateReward } from 'src/api/reward/useUpdateReward';

import ConfirmModal from '../common/ConfirmModal';

const RewardEditDrawer = () => {
  const router = useRouter();
  const { id } = useParams();
  const targetId = Number(id);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: updateReward, isPending } = useUpdateReward();
  const { mutate: deleteReward } = useDeleteReward();

  const { register, handleSubmit } = useForm<RewardUpdate>({
    resolver: zodResolver(RewardUpdateSchema),
  });

  const onSubmit = (data: RewardUpdate) => {
    updateReward({ id: targetId, payload: data });
  };

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        buttonText="보상 삭제"
        onClickButton={() => {
          deleteReward(targetId);
          setIsModalOpen(false);
        }}
      >
        <div className="text-body2-d flex flex-col gap-1">
          <p className="font-bold">• 삭제한 보상은 복구할 수 없습니다.</p>
          <p>• 보상이 삭제되어도 유저에게 제공된 보상은 해당 보상의 만료일까지 유효합니다.</p>
        </div>
      </ConfirmModal>

      <Drawer>
        <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col">
          <header className="flex flex-col gap-3">
            <h1 className="text-h2-d">보상 수정</h1>
            <p className="text-body3-d text-gray-700">유저에게 제공될 보상을 수정합니다.</p>
          </header>

          <hr className="my-6 border-gray-100" />

          <div className="flex flex-1 flex-col gap-8">
            <TextField label="유형">
              <div className="text-body3-d bg-background-base rounded-md p-2 text-gray-700">
                유형은 변경할 수 없습니다.
              </div>
            </TextField>

            <TextField label="썸네일">
              <MainBox className="flex h-45 w-45 items-center justify-center text-gray-700">
                <ImageIcon />
              </MainBox>
            </TextField>

            <TextField label="상품명">
              <Input
                {...register('name')}
                type="text"
                placeholder="상품명을 입력하세요."
                className="w-82"
              />
            </TextField>

            <TextField label="단가">
              <Input
                {...register('price', { valueAsNumber: true })}
                type="number"
                placeholder="단가를 입력하세요."
                className="w-82"
              />
            </TextField>
          </div>

          <div className="mt-auto flex justify-between pt-6">
            <Button
              color="light"
              size="md-short"
              type="button"
              className="text-negative"
              onClick={handleDelete}
            >
              삭제
            </Button>
            <div className="flex gap-2">
              <Button color="light" size="md-short" type="button" onClick={() => router.back()}>
                취소
              </Button>
              <Button color="dark" size="md" type="submit" disabled={isPending}>
                {isPending ? '저장 중...' : '변경사항 저장'}
              </Button>
            </div>
          </div>
        </form>
      </Drawer>
    </>
  );
};

export default RewardEditDrawer;
