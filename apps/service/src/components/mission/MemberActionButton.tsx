import { Button } from '@shared';

import { useRequestMission } from 'src/api/mission/useRequestMission';

import StatusBox from './StatusBox';

const MemberActionButton = ({
  requestId,
  status,
}: {
  requestId: number;
  status: 'PENDING' | 'REJECTED' | null;
}) => {
  const { mutate: requestApproval } = useRequestMission();

  const handleRequest = () => {
    requestApproval(requestId);
  };
  if (status === 'PENDING') return <StatusBox>응답 대기 중</StatusBox>;
  return (
    <Button size="sm" color="dark" isFullWidth onClick={handleRequest}>
      보상 요청하기
    </Button>
  );
};

export default MemberActionButton;
