import { MainBox } from '@shared';
import dayjs from 'dayjs';

import StatusIcon from 'src/components/common/StatusIcon';

const HistoryItem = ({
  mission,
}: {
  mission: { status: string; title: string; completedAt: string };
}) => (
  <MainBox className="flex flex-col gap-1 rounded-2xl p-4">
    <div className="flex items-center gap-1">
      <StatusIcon status={mission.status} />
      <span className="text-body1-m">{mission.title}</span>
    </div>
    <span className="text-caption-m text-gray-500">
      완료일: {dayjs(mission.completedAt).format('YYYY. MM. DD HH:mm')}
    </span>
  </MainBox>
);

export default HistoryItem;
