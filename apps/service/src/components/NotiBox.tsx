import { Badge, cn } from "@shared";

interface NotiBoxProps {
  title: string;
  description: string;
  isRead?: boolean;
  className?: string;
}

const NotiBox = ({
  title,
  description,
  isRead = true,
  className,
}: NotiBoxProps) => {
  return (
    <div
      className={cn(
        "h-[80px] w-full",
        "flex flex-col justify-center px-5",
        "bg-brand-white rounded-lg border shadow-sm transition-all",

        isRead ? "border-grayscale-200" : "border-primary-400",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        {!isRead && <Badge color="primary">NEW</Badge>}
        <h3 className="text-body1-m truncate">{title}</h3>
      </div>
      <p className="text-body2-m text-grayscale-600 line-clamp-1">
        {description}
      </p>
    </div>
  );
};

export default NotiBox;
