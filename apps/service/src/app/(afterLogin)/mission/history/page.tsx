import dayjs from 'dayjs';
import { MISSION_HISTORY } from 'src/data/mission';

import DateDivider from '@service/components/mission/history/DateDevider';
import HistoryItem from '@service/components/mission/history/HistoryItem';

const MissionHistoryPage = () => {
  return (
    <div className="m-4 flex flex-col gap-4">
      {MISSION_HISTORY.map((mission, index) => {
        const currentDate = dayjs(mission.completedAt).format('M/D');
        const prevDate =
          index > 0 ? dayjs(MISSION_HISTORY[index - 1].completedAt).format('M/D') : null;

        const isNewDate = currentDate !== prevDate;

        return (
          <div key={mission.id} className="contents">
            {isNewDate && <DateDivider date={currentDate} />}
            <HistoryItem mission={mission} />
          </div>
        );
      })}
    </div>
  );
};

export default MissionHistoryPage;
