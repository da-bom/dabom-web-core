import Link from 'next/link';

import { ChevronIcon } from '@icons';
import { Button, Card, MainBox } from '@shared';

import { MISSION_LIST_MEMBER } from 'src/data/mission';

const isOwner = true;

const StatusBox = ({ children }: { children: React.ReactNode }) => (
  <div className="text-body2-m flex h-9 w-full items-center justify-center rounded-md border border-gray-300 text-gray-700">
    {children}
  </div>
);

const MemberActionButton = ({ status }: { status: string }) => {
  if (status === 'PENDING') return <StatusBox>응답 대기 중</StatusBox>;
  return (
    <Button size="sm" color="dark" isFullWidth>
      보상 요청하기
    </Button>
  );
};

const OwnerActionButton = ({ status }: { status: string }) => {
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

const MissionPage = () => {
  return (
    <div className="m-4 flex flex-col gap-5">
      <p className="flex flex-col">
        <span className="text-h2-m">현재 진행 중인 미션</span>
        <span className="text-body2-m gray-800">
          {isOwner
            ? '진행 중인 미션을 확인하고, 보상 요청에 응답해 주세요.'
            : '미션을 완료한 후에는 보상을 요청해 주세요.'}
        </span>
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        {MISSION_LIST_MEMBER.map((mission) => (
          <Card
            className="h-55"
            key={mission.id}
            title={mission.title}
            description={`보상: ${mission.reward}`}
          >
            {isOwner ? (
              <OwnerActionButton status={mission.status} />
            ) : (
              <MemberActionButton status={mission.status} />
            )}
          </Card>
        ))}
      </div>
      <Link href="/mission/log">
        <MainBox className="flex cursor-pointer items-center justify-between rounded-2xl p-4">
          <span className="text-body1-m">지난 내역 보기</span>
          <ChevronIcon className="text-gray-800" sx={{ width: 16 }} />
        </MainBox>
      </Link>
    </div>
  );
};

export default MissionPage;
