import { cn } from "../utils/cn";

const SubBox = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "bg-background-sub rounded-md border-[1px] border-gray-100",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default SubBox;
