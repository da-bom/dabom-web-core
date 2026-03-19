'use client';

import { Button } from '@shared';

import { useRespondReward } from 'src/api/reward/useRespondReward';
import { showToast } from 'src/utils/toast';

import StatusBox from './StatusBox';

const OwnerActionButton = ({
  status,
  requestId,
}: {
  status: 'PENDING' | 'REJECTED' | 'APPROVED' | null;
  requestId: number;
}) => {
  const { mutate: respond, isPending } = useRespondReward();

  const handleApprove = () => {
    if (!requestId) {
      showToast.error('요청이 실패되었습니다.');
      return;
    }
    respond({
      requestId,
      payload: { status: 'APPROVED' },
    });
  };

  const handleReject = () => {
    if (!requestId) {
      showToast.error('요청이 실패되었습니다.');
      return;
    }
    respond({
      requestId,
      payload: {
        status: 'REJECTED',
        rejectReason: '.',
      },
    });
  };

  if (status === null) {
    return <StatusBox>진행 중</StatusBox>;
  }

  if (status === 'REJECTED') {
    return <StatusBox>거절됨</StatusBox>;
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
