import { CheckOutlinedIcon } from '@icons';
import { MainBox } from '@shared';

const TpsStatusCard = ({ value, lastUpdate }: { value: number; lastUpdate: string }) => (
  <MainBox className="flex w-full flex-col gap-7 p-5">
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        <CheckOutlinedIcon className="text-primary-600" sx={{ width: 20 }} />
        <span className="text-body2-d font-bold">실시간 처리량</span>
      </div>
      <span className="text-body3-d text-gray-700">최근 업데이트: {lastUpdate}</span>
    </div>
    <span className="text-h1-d">{value.toLocaleString()} TPS</span>
  </MainBox>
);

export default TpsStatusCard;
