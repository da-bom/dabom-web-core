import { Button } from '@shared';

import { useRequestMission } from 'src/api/mission/useRequestMission';

import StatusBox from './StatusBox';

const MemberActionButton = ({ id, status }: { id: number; status: string }) => {
  const { mutate: requestApproval } = useRequestMission();

  const handleRequest = () => {
    // 미션 완료 요청 실행
    requestApproval(id);
  };
  if (status === 'PENDING') return <StatusBox>응답 대기 중</StatusBox>;
  return (
    <Button size="sm" color="dark" isFullWidth onClick={handleRequest}>
      보상 요청하기
    </Button>
  );
};

export default MemberActionButton;
