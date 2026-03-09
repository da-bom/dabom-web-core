import { DoNotIcon } from '@icons';

import { Toggle } from '../common/Toggle';

interface PolicyBlockOwnerProps {
  isBlocked: boolean;
  isEditingByOther: boolean;
  onToggleBlock: () => void;
}

export function PolicyBlockOwner({
  isBlocked,
  isEditingByOther,
  onToggleBlock,
}: PolicyBlockOwnerProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <DoNotIcon sx={{ fontSize: 16 }} className="text-primary" />
        <span className="text-body1-m">데이터 사용 차단</span>
      </div>
      <Toggle isChecked={isBlocked} onToggle={onToggleBlock} disabled={isEditingByOther} />
    </div>
  );
}
