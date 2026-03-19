'use client';

import { HeartIcon } from '@icons';
import { MainBox, cn } from '@shared';

import { SystemHealth } from 'src/api/dashboard/schema';

interface HealthStatusCardProps {
  systemHealth: SystemHealth;
}

const HealthStatusCard = ({ systemHealth }: HealthStatusCardProps) => {
  const systems = [
    { key: 'kafka', label: 'Kafka' },
    { key: 'redis', label: 'Redis' },
    { key: 'mysql', label: 'MySQL' },
  ] as const;

  return (
    <MainBox className="flex w-full flex-col gap-7 p-5">
      <div className="flex items-center gap-1">
        <HeartIcon className="text-negative-600" sx={{ width: 20 }} />
        <span className="text-body2-d font-bold text-gray-900">System Health</span>
      </div>

      <div className="bg-background-base w-full rounded px-8 py-3">
        <div className="flex w-full items-center justify-between">
          {systems.map(({ key, label }) => {
            // 상태값에 따른 색상 결정 (보통 'UP', 'HEALTHY', 'OK' 등)
            const status = systemHealth[key]?.toUpperCase();
            const isHealthy = status === 'UP' || status === 'HEALTHY' || status === 'OK';

            return (
              <div key={key} className="flex items-center gap-2">
                {/* 🟢 상태 인디케이터 (불빛) */}
                <div
                  className={cn(
                    'h-2 w-2 animate-pulse rounded-full', // 깜빡이는 효과 추가 가능
                    isHealthy ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500',
                  )}
                />
                <span
                  className={cn(
                    'text-body2-d font-medium transition-colors',
                    isHealthy ? 'text-gray-800' : 'text-negative-600',
                  )}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </MainBox>
  );
};

export default HealthStatusCard;
