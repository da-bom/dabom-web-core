import { cn } from "../utils/cn";
import Icon from "./Icon";

interface SwitchProps {
  children: React.ReactNode;
  type: "primary" | "secondary" | "gray";
  radius: "full" | "half";
  onClick: () => void;
}

const Switch = ({ children, type, radius, onClick }: Readonly<SwitchProps>) => {
  return (
    <button
      type="button"
      className={cn(
        "flex w-fit cursor-pointer items-center gap-1 rounded-full border-[1px] px-4 py-1",
        type === "primary" && "border-primary bg-primary-50",
        type === "secondary" && "border-primary-800",
        type === "gray" && "border-gray-800 bg-gray-100",

        radius === "full" ? "rounded-full" : "rounded-md",
      )}
      onClick={onClick}
    >
      <div className="text-caption-d text-brand-dark">{children}</div>
      <Icon
        name="Change"
        className={type === "gray" ? "text-gray-800" : "text-primary"}
      />
    </button>
  );
};

export default Switch;
