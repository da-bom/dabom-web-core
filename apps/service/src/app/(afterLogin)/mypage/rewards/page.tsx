'use client';

import { useState } from 'react';

import { Button, Card } from '@shared';

import { useGetReceivedRewards } from 'src/api/reward/useGetReceivedRewards';
import GifticonModal from 'src/components/mypage/GiftModal';

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
    return <div className="flex h-full items-center justify-center p-20">로딩</div>;
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
      {hasNextPage && (
        <div className="mt-8 flex justify-center">
          <Button
            color="light"
            size="md"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? '불러오는 중...' : '더보기'}
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
