'use client';

import Link from 'next/link';

import { ChevronIcon } from '@icons';
import { Button, Card, MainBox } from '@shared';

import { MissionItem } from 'src/api/mission/schema';
import { useGetMissions } from 'src/api/mission/useGetMissions';
import MemberActionButton from 'src/components/mission/MemberActionButton';
import OwnerActionButton from 'src/components/mission/OwnerActionButton';

const isOwner = true;

const MissionPage = () => {
  const { data, isLoading, isError } = useGetMissions({ size: 20 });

  if (isLoading) return <div className="m-5 text-center">미션을 불러오는 중...</div>;
  if (isError)
    return <div className="m-5 text-center text-red-500">데이터를 불러오지 못했습니다.</div>;

  const missions = data?.missions ?? [];

  return (
    <div className="m-5 flex flex-col gap-5 pb-40">
      <p className="flex flex-col">
        <span className="text-h2-m">현재 진행 중인 미션</span>
        <span className="text-body2-m text-gray-800">
          {isOwner
            ? '진행 중인 미션을 확인하고, 보상 요청에 응답해 주세요.'
            : '미션을 완료한 후에는 보상을 요청해 주세요.'}
        </span>
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        {missions.length > 0 ? (
          missions.map((mission: MissionItem) => (
            <Card
              className="h-55"
              key={mission.missionItemId}
              title={mission.missionText}
              description={`보상: ${mission.reward.name} (${mission.reward.value}${mission.reward.unit})`}
            >
              {isOwner ? (
                // API의 requestStatus 전달
                <OwnerActionButton status={mission.requestStatus} />
              ) : (
                <MemberActionButton status={mission.requestStatus} />
              )}
            </Card>
          ))
        ) : (
          <div className="col-span-2 py-10 text-center text-gray-500">
            진행 중인 미션이 없습니다.
          </div>
        )}
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
