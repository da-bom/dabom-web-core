import { Button } from '@shared';

import StatusBox from './StatusBox';

const OwnerActionButton = ({ id, status }: { id: number; status: string }) => {
  console.log(id);
  if (status === 'PENDING') return <StatusBox>진행 중</StatusBox>;
  return (
    <div className="flex gap-2">
      <Button size="sm" color="light" isFullWidth>
        거절
      </Button>
      <Button size="sm" color="dark" isFullWidth>
        수락
      </Button>
    </div>
  );
};

export default OwnerActionButton;
