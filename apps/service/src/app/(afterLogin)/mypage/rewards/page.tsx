'use client';

import { useState } from 'react';

import { Box, Skeleton } from '@mui/material';
import { Button, Card } from '@shared';

import { useGetReceivedRewards } from 'src/api/reward/useGetReceivedRewards';
import GifticonModal from 'src/components/mypage/GiftModal';

const RewardSkeleton = () => (
  <div className="m-5 flex flex-col gap-4">
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Box
          key={i}
          className="flex h-45 flex-col justify-between rounded-2xl border border-gray-100 bg-white p-4"
        >
          <div className="flex flex-col gap-2">
            <Skeleton variant="text" width="40%" height={20} />
            <Skeleton variant="text" width="80%" height={24} />
            <Skeleton variant="text" width="60%" height={18} />
          </div>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={32}
            sx={{ borderRadius: '8px' }}
            animation="wave"
          />
        </Box>
      ))}
    </div>
  </div>
);

const RewardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
  const [usedRewardIds, setUsedRewardIds] = useState<Set<number>>(new Set());

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetReceivedRewards(10);

  const allRewards = data?.pages.flatMap((page) => page.rewards) ?? [];

  const handleCardClick = (requestId: number, category: string) => {
    setSelectedRequestId(requestId);
    setIsModalOpen(true);

    if (category === 'DATA') {
      setUsedRewardIds((prev) => new Set(prev).add(requestId));
    }
  };

  if (isLoading) {
    return <RewardSkeleton />;
  }

  const selectedReward = allRewards.find((r) => r.requestId === selectedRequestId);

  return (
    <div className="m-5">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        {allRewards.map((item) => {
          const { reward } = item.missionItem;
          const isUsed = usedRewardIds.has(item.requestId);

          return (
            <Card
              className="h-45"
              key={item.requestId}
              subtitle={reward.category === 'DATA' ? '데이터' : '기프티콘'}
              title={reward.name}
              description={`${item.approvedBy.name}님이 승인함`}
            >
              <Button
                size="sm"
                color="light"
                isFullWidth
                onClick={() => handleCardClick(item.requestId, reward.category)}
                disabled={reward.category === 'DATA' && isUsed}
              >
                {reward.category === 'DATA'
                  ? isUsed
                    ? '사용 완료'
                    : '데이터 사용하기'
                  : '기프티콘 보기'}
              </Button>
            </Card>
          );
        })}
      </div>

      {hasNextPage && !isFetchingNextPage && (
        <div className="mt-8 flex justify-center">
          <Button color="light" size="md" onClick={() => fetchNextPage()}>
            더보기
          </Button>
        </div>
      )}

      <GifticonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedReward ?? null}
      />
    </div>
  );
};

export default RewardPage;
