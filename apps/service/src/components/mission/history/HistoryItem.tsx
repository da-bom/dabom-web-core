import { MainBox } from '@shared';
import dayjs from 'dayjs';

import { MissionHistory } from 'src/api/mission/schema';
import StatusIcon from 'src/components/common/StatusIcon';

interface HistoryItemProps {
  mission: MissionHistory;
}

const HistoryItem = ({ mission }: HistoryItemProps) => {
  const { status, missionItem, requestedAt, requestedBy } = mission;

  return (
    <MainBox className="flex flex-col gap-1 rounded-2xl p-4">
      <div className="flex items-center gap-1">
        <StatusIcon status={status} />
        <span className="text-body1-m">{missionItem.missionText}</span>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-body2-m text-gray-700">요청자: {requestedBy.name}</span>
        <span className="text-caption-m text-gray-500">
          요청일: {dayjs(requestedAt).format('YYYY. MM. DD HH:mm')}
        </span>
      </div>
    </MainBox>
  );
};

export default HistoryItem;
