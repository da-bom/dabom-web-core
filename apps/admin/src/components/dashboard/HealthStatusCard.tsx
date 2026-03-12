import { HeartIcon } from '@icons';
import { MainBox } from '@shared';

const HealthStatusCard = ({ systems }: { systems: string[] }) => (
  <MainBox className="flex w-full flex-col gap-7 p-5">
    <div className="flex gap-1">
      <HeartIcon className="text-primary-600" sx={{ width: 20 }} />
      <span className="text-body2-d font-bold">System Health</span>
    </div>
    <div className="bg-background-base w-full rounded px-10 py-2">
      <div className="flex w-full justify-between">
        {systems.map((sys) => (
          <span key={sys} className="text-body2-d text-gray-700">
            {sys}
          </span>
        ))}
      </div>
    </div>
  </MainBox>
);

export default HealthStatusCard;
