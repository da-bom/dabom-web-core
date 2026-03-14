'use client';

import { Button } from '@shared';

import { useRespondReward } from 'src/api/reward/useRespondReward';

import StatusBox from './StatusBox';

const OwnerActionButton = ({ status, requestId }: { status: string; requestId: number }) => {
  const { mutate: respond, isPending } = useRespondReward();

  const handleApprove = () => {
    if (window.confirm('보상을 수락하시겠습니까?')) {
      respond({
        requestId,
        payload: { status: 'APPROVED' },
      });
    }
  };

  const handleReject = () => {
    const reason = window.prompt('거절 사유를 입력해주세요.');

    if (reason === null) return;
    if (reason.trim() === '') {
      alert('거절 사유는 필수입니다.');
      return;
    }

    respond({
      requestId,
      payload: {
        status: 'REJECTED',
        rejectReason: reason,
      },
    });
  };

  if (status === 'PENDING') {
    return <StatusBox>진행 중</StatusBox>;
  }

  return (
    <div className="flex gap-2">
      <Button size="sm" color="light" isFullWidth onClick={handleReject} disabled={isPending}>
        거절
      </Button>
      <Button size="sm" color="dark" isFullWidth onClick={handleApprove} disabled={isPending}>
        수락
      </Button>
    </div>
  );
};

export default OwnerActionButton;
