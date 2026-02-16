import React from "react";

import { Badge, cn } from "@shared";

interface NotiBoxProps {
  title: string;
  description: string;
  isRead?: boolean;
  className?: string;
}

export const NotiBox = ({
  title,
  description,
  isRead = true,
  className,
}: NotiBoxProps) => {
  return (
    <div
      className={cn(
        "bg-brand-white flex h-20 w-full flex-col justify-center rounded-lg border-2 px-4 transition-all",

        !isRead ? "border-primary" : "border-gray-200",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        {!isRead && (
          <Badge color="primary" size="sm">
            NEW
          </Badge>
        )}
        <h3 className="text-body1-m truncate">{title}</h3>
      </div>
      <p className="text-body2-m mt-1 line-clamp-1 text-gray-700">
        {description}
      </p>
    </div>
  );
};
