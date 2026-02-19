import { Icon, cn } from "@shared";

export type ViewMode = "list" | "chart";

interface ViewSegmentProps {
  viewMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

const VIEW_OPTIONS = [
  {
    id: "list" as const,
    label: "리스트",
    activeIcon: "List",
    inactiveIcon: "List",
  },
  {
    id: "chart" as const,
    label: "차트",
    activeIcon: "Graph",
    inactiveIcon: "Graph",
  },
] as const;

export const ViewSegment = ({ viewMode, onModeChange }: ViewSegmentProps) => {
  return (
    <div className="bg-brand-white flex h-8 w-full max-w-87.5 items-center rounded-full border border-gray-200">
      {VIEW_OPTIONS.map(({ id, label, activeIcon, inactiveIcon }) => {
        const isActive = viewMode === id;
        return (
          <button
            key={id}
            onClick={() => onModeChange(id)}
            className={cn(
              "text-caption-m mx-2 flex h-5 flex-1 items-center justify-center gap-1 rounded-full transition-colors",
              isActive
                ? "bg-primary-50 text-primary"
                : "bg-transparent text-gray-400",
            )}
          >
            <Icon name={isActive ? activeIcon : inactiveIcon} />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
};
