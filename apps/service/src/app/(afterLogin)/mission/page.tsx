import Link from 'next/link';

import { ChevronIcon } from '@icons';
import { Button, Card, MainBox } from '@shared';

import MemberActionButton from 'src/components/mission/MemberActionButton';
import OwnerActionButton from 'src/components/mission/OwnerActionButton';
import { MISSION_LIST } from 'src/data/mission';

const isOwner = true;

const MissionPage = () => {
  return (
    <div className="m-5 flex flex-col gap-5">
      <p className="flex flex-col">
        <span className="text-h2-m">현재 진행 중인 미션</span>
        <span className="text-body2-m gray-800">
          {isOwner
            ? '진행 중인 미션을 확인하고, 보상 요청에 응답해 주세요.'
            : '미션을 완료한 후에는 보상을 요청해 주세요.'}
        </span>
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        {MISSION_LIST.map((mission) => (
          <Card
            className="h-55"
            key={mission.id}
            title={mission.title}
            description={`보상: ${mission.reward}`}
          >
            {isOwner ? (
              <OwnerActionButton status={mission.status} requestId={mission.id} />
            ) : (
              <MemberActionButton status={mission.status} />
            )}
          </Card>
        ))}
      </div>
      <Link href="/mission/history">
        <MainBox className="flex cursor-pointer items-center justify-between rounded-2xl p-4">
          <span className="text-body1-m">지난 내역 보기</span>
          <ChevronIcon className="text-gray-800" sx={{ width: 16 }} />
        </MainBox>
      </Link>
      <Link className="fixed right-0 bottom-25 left-0 mx-5" href="/mission/create">
        <Button size="lg" color="dark" isFullWidth>
          미션 만들기
        </Button>
      </Link>
    </div>
  );
};

export default MissionPage;
