'use client';

import dayjs from 'dayjs';

import { useGetMissionHistory } from 'src/api/mission/useGetMissionHistory';
import DateDivider from 'src/components/mission/history/DateDivider';
import HistoryItem from 'src/components/mission/history/HistoryItem';

const MissionHistoryPage = () => {
  const { data, isLoading, isError } = useGetMissionHistory({ size: 20 });

  if (isLoading) return <div className="m-4 text-center text-gray-500">불러오는 중...</div>;
  if (isError) return <div className="m-4 text-center text-red-500">데이터 로드 실패</div>;

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
