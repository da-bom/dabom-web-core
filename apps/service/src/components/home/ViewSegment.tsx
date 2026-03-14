'use client';

import { GraphIcon, ListIcon } from '@icons';

export type ViewMode = 'list' | 'chart';

interface ViewSegmentProps {
  viewMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

const VIEW_OPTIONS = [
  {
    id: 'list' as const,
    label: '리스트',
    Icon: ListIcon,
  },
  {
    id: 'chart' as const,
    label: '그래프',
    Icon: GraphIcon,
  },
] as const;

export const ViewSegment = ({ viewMode, onModeChange }: ViewSegmentProps) => {
  return (
    <div className="bg-brand-white flex h-8 w-full flex-row items-center justify-center gap-1 rounded-full border border-gray-200 px-2">
      {VIEW_OPTIONS.map(({ id, label, Icon }) => {
        const isActive = viewMode === id;
        return (
          <button
            key={id}
            onClick={() => onModeChange(id)}
            className={`text-caption-m flex h-5 flex-1 items-center justify-center gap-1 rounded-full transition-colors ${isActive ? 'bg-primary-50 text-primary' : 'text-gray-400'}`}
          >
            <Icon sx={{ fontSize: id === 'list' ? '13px' : '15px' }} />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
};
