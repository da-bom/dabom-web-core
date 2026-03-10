import { Button } from '@shared';

import StatusBox from './StatusBox';

const MemberActionButton = ({ status }: { status: string }) => {
  if (status === 'PENDING') return <StatusBox>응답 대기 중</StatusBox>;
  return (
    <Button size="sm" color="dark" isFullWidth>
      보상 요청하기
    </Button>
  );
};

export default MemberActionButton;
