"use client";

import { cn } from "@shared";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

type ProgressBarSize = "md"; // 나중에 더 추가할 예정

interface ProgressBarProps {
  value: number;
  size?: ProgressBarSize;
  className?: string;
}

const SIZE_CONFIG = {
  md: { height: "h-4", barSize: 12 },
};

const ProgressBar = ({ value, size = "md", className }: ProgressBarProps) => {
  const data = [{ name: "Progress", current: value }];
  const { height, barSize } = SIZE_CONFIG[size];

  return (
    <div className={cn("w-full", height, className)}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis type="category" dataKey="name" hide />

          <Bar
            dataKey="current"
            fill="var(--color-primary)"
            radius={[10, 10, 10, 10]}
            barSize={barSize}
            isAnimationActive={true}
            animationDuration={1000}
            animationEasing="ease-out"
            background={{ fill: "var(--color-gray-100)", radius: 10 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressBar;
