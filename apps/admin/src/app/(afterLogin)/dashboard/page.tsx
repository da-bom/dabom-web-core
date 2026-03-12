import { ResetIcon } from '@icons';
import { MainBox } from '@shared';
import dayjs from 'dayjs';

import HealthStatusCard from 'src/components/dashboard/HealthStatusCard';
import SummaryCard from 'src/components/dashboard/SummaryCard';
import TpsStatusCard from 'src/components/dashboard/TpsStatusCard';
import { DASHBOARD } from 'src/data/dashboard';

// TODO: API 연결 후 API 응답으로 수정
const timeStamp = '2024-01-15T10:30:00Z';

const DashboardPage = () => {
  return (
    <div className="flex h-screen flex-col gap-4">
      <div className="flex w-full items-center justify-end gap-1 text-gray-800">
        <ResetIcon sx={{ width: 16, height: 16 }} />
        <span>현재 시간: {dayjs(timeStamp).format('YYYY-MM-DD HH:mm')}</span>
      </div>
      <div className="flex w-full gap-4">
        <TpsStatusCard value={DASHBOARD.currentTps} lastUpdate="2026-03-10 11:18:32" />
        <HealthStatusCard systems={['Kafka', 'Redis', 'MySQL']} />
      </div>

      <div className="flex w-full gap-4">
        <SummaryCard
          title="가족"
          value={DASHBOARD.totalFamilies}
          subValue={DASHBOARD.activeFamilies}
          label="활성:"
        />
        <SummaryCard
          title="유저"
          value={DASHBOARD.totalUsers}
          subValue={DASHBOARD.blockedUsers}
          label="차단:"
        />
        <SummaryCard title="오늘의 이벤트" value={DASHBOARD.todayEvents} />
      </div>

      <div className="flex h-full w-full gap-4">
        <MainBox className="flex w-full flex-col items-center gap-4 p-5">
          <span className="text-body1-d">실시간 처리량(TPS)</span>
          <div className="h-full">{/* 차트 영역 */}</div>
        </MainBox>

        <MainBox className="flex w-full flex-col items-center gap-4 overflow-y-auto px-10 py-5">
          <span className="text-body1-d">최근 차단 내역</span>
          {DASHBOARD.recentBlocks.map((item) => (
            <MainBox
              key={`${item.familyId}-${item.customerId}`}
              className="flex w-full flex-col gap-1 border-gray-500 p-4"
            >
              <span className="text-body2-d">
                {item.customerId}님 ({item.familyId})의 데이터가 차단되었습니다.
              </span>
              <div className="text-body3-d flex justify-between">
                <span className="text-gray-800">사유: {item.reason}</span>
                <span className="text-gray-500">{item.blockedAt}</span>
              </div>
            </MainBox>
          ))}
        </MainBox>
      </div>
    </div>
  );
};

export default DashboardPage;
