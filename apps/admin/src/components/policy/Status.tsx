import { CheckOutlinedIcon, UnpublishedIcon } from '@icons';

const Status = ({ active }: { active: boolean }) => (
  <div
    className={`text-body1-d flex items-center gap-1 ${active ? 'text-primary' : 'text-gray-600'}`}
  >
    {active ? (
      <>
        <CheckOutlinedIcon sx={{ width: 14 }} />
        <span className="text-body2-d font-bold">활성화</span>
      </>
    ) : (
      <>
        <UnpublishedIcon sx={{ width: 14 }} />
        <span className="text-body2-d font-bold">비활성화</span>
      </>
    )}
  </div>
);

export default Status;
