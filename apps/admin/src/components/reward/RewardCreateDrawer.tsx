'use client';

import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { ImageIcon } from '@icons';
import {
  Button,
  CloseConfirmModal,
  Drawer,
  Input,
  MainBox,
  RadioGroup,
  TextField,
  useUploadImage,
} from '@shared';

import { RewardCreate, RewardCreateSchema } from 'src/api/reward/schema';
import { useCreateReward } from 'src/api/reward/useCreateReward';

import Loading from '../common/Loading';

const RewardCreateDrawer = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false); // 👈 모달 상태 추가

  const { mutate: createReward, isPending: isCreating } = useCreateReward();
  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();

  const { register, handleSubmit, control, setValue } = useForm<RewardCreate>({
    resolver: zodResolver(RewardCreateSchema),
    defaultValues: {
      category: 'DATA',
      name: '',
      price: 0,
      thumbnailUrl: null,
    },
  });

  const handleImageClick = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const uploadedUrl = await uploadImage({ file, type: 'REWARD' });
      setValue('thumbnailUrl', uploadedUrl);
      setPreviewUrl(uploadedUrl);
    } catch (error) {
      console.error('이미지 업로드 에러:', error);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const onSubmit = (data: RewardCreate) => {
    createReward(data, {
      onSuccess: () => {
        router.back();
      },
    });
  };

  const isSubmitting = isCreating || isUploading;

  return (
    <>
      <Drawer>
        <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          <header className="flex flex-col gap-3">
            <h1 className="text-h2-d">보상 추가</h1>
            <p className="text-body3-d text-gray-700">유저에게 제공될 보상을 추가합니다.</p>
          </header>

          <hr className="my-6 border-gray-100" />

          <div className="flex flex-1 flex-col gap-8">
            <TextField label="유형">
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    name="category"
                    options={[
                      { label: '데이터', value: 'DATA' },
                      { label: '기프티콘', value: 'GIFTICON' },
                    ]}
                    selectedValue={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </TextField>

            <TextField label="썸네일">
              <MainBox
                className="relative flex h-45 w-45 cursor-pointer items-center justify-center overflow-hidden text-gray-700"
                onClick={handleImageClick}
              >
                {isUploading ? (
                  <Loading />
                ) : (
                  <>
                    {previewUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={previewUrl}
                        alt="thumbnail"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon />
                    )}
                  </>
                )}
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

          <div className="mt-auto flex justify-end gap-2 pt-6">
            <Button
              color="light"
              size="md-short"
              type="button"
              onClick={() => setShowExitConfirm(true)}
            >
              취소
            </Button>
            <Button color="dark" size="md" type="submit" disabled={isSubmitting}>
              {isSubmitting ? '처리 중...' : '변경사항 저장'}
            </Button>
          </div>
        </form>
      </Drawer>

      <CloseConfirmModal
        showConfirm={showExitConfirm}
        onClose={() => setShowExitConfirm(false)}
        onConfirm={() => {
          setShowExitConfirm(false);
          router.back();
        }}
      />
    </>
  );
};

export default RewardCreateDrawer;
