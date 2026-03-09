import { EmergencyIcon } from '../assets/icons';
import AwardIcon from '../assets/icons/AwardIcon';
import { GRADE_TYPE } from '../types/gradeType';
import { cn } from '../utils/cn';

const GRADE_CONFIG = {
  VVIP: {
    label: 'VVIP',
    color: 'text-primary',
    icon: AwardIcon,
  },
  VIP: {
    label: 'VIP',
    color: 'text-primary',
    icon: AwardIcon,
  },
  BEST: {
    label: '우수',
    color: 'text-[#E7A341]',
    icon: EmergencyIcon,
  },
  NORMAL: {
    label: '일반',
    color: 'text-[#78933D]',
    icon: EmergencyIcon,
  },
};

const Grade = ({ grade }: { grade: GRADE_TYPE }) => {
  const config = GRADE_CONFIG[grade];
  const GradeIcon = config.icon;

  return (
    <div className={cn('flex items-center', config.color)}>
      <GradeIcon sx={{ width: 16 }} />
      <span className="text-body2-m font-bold">{config.label}</span>
    </div>
  );
};

export default Grade;
