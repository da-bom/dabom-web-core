'use client';

import { Box, Skeleton } from '@mui/material';
import { Divider } from '@shared';
import dayjs from 'dayjs';

import { useGetMissionHistory } from 'src/api/mission/useGetMissionHistory';
import DateDivider from 'src/components/mission/history/DateDivider';
import HistoryItem from 'src/components/mission/history/HistoryItem';

const MissionHistorySkeleton = () => (
  <div className="m-4 flex flex-col gap-4">
    {[1, 2].map((group) => (
      <div key={group} className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Divider />
          <Skeleton variant="text" width={40} height={24} />
          <Divider />
        </div>

        {[1, 2].map((item) => (
          <Box
            key={item}
            className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4"
          >
            <div className="flex flex-1 flex-col gap-1">
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton variant="text" width="40%" height={20} />
            </div>
            <Skeleton variant="rectangular" width={60} height={32} sx={{ borderRadius: '8px' }} />
          </Box>
        ))}
      </div>
    ))}
  </div>
);

const MissionHistoryPage = () => {
  const { data, isLoading, isError } = useGetMissionHistory({ size: 20 });

  if (isLoading) return <MissionHistorySkeleton />;

  if (isError) {
    return (
      <div className="m-4 flex flex-col items-center justify-center py-20 text-center">
        <p className="text-body1-m mb-2 text-red-500">데이터 로드 실패</p>
        <p className="text-caption-m text-center text-gray-400">잠시 후 다시 시도해주세요.</p>
      </div>
    );
  }

  const historyList = data?.requests ?? [];

  return (
    <div className="m-4 flex flex-col gap-4">
      {historyList.length > 0 ? (
        historyList.map((item, index) => {
          const currentDate = dayjs(item.requestedAt).format('M/D');
          const prevDate =
            index > 0 ? dayjs(historyList[index - 1].requestedAt).format('M/D') : null;

          const isNewDate = currentDate !== prevDate;

          return (
            <div key={item.requestId} className="contents">
              {isNewDate && <DateDivider date={currentDate} />}
              <HistoryItem mission={item} />
            </div>
          );
        })
      ) : (
        <div className="text-body2-m py-20 text-center text-gray-500">과거 내역이 없습니다.</div>
      )}
    </div>
  );
};

export default MissionHistoryPage;
