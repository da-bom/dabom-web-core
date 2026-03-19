'use client';

import { Pie } from 'react-chartjs-2';

import { bytesToGB, cn } from '@shared';
import { ArcElement, Chart as ChartJS, Legend, Tooltip, TooltipItem } from 'chart.js';

import { CHART_COLOR } from 'src/app/(afterLogin)/home/contents';
import { CustomerListType } from 'src/types/DataUsage';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartDataItem {
  id: number | string;
  name: string;
  value: number;
  color: string;
  isRemaining?: boolean;
}

interface Props {
  customers?: CustomerListType[];
  totalUsageGB?: number;
  totalQuotaBytes?: number | null;

  items?: ChartDataItem[];
  unit?: string;

  variant?: 'default' | 'card';
}

const UsageChart = ({
  customers,
  totalUsageGB,
  totalQuotaBytes,
  items,
  unit = 'GB',
  variant = 'default',
}: Props) => {
  const isCard = variant === 'card';
  const showLegend = !items;
  const cutout = isCard ? '35%' : '30%';
  const chartSize = 215;

  const isEmpty = totalUsageGB === 0;

  const getChartDataRaw = (): ChartDataItem[] => {
    if (items) return items;
    if (customers) {
      return customers.map((customer, index) => ({
        id: customer.customerId,
        name: customer.name,
        value: bytesToGB(customer.monthlyUsedBytes),
        color: CHART_COLOR.COLORS[index % CHART_COLOR.COLORS.length],
        isRemaining: false,
      }));
    }
    return [];
  };

  const chartDataRaw = getChartDataRaw();

  if (chartDataRaw.length === 0) {
    return (
      <div
        className={cn(
          'flex w-full items-center justify-center text-gray-400',
          isCard ? 'bg-brand-white h-75 rounded-2xl border border-gray-200' : 'p-8',
        )}
      >
        <p>데이터가 없습니다.</p>
      </div>
    );
  }

  const chartData: ChartDataItem[] = [...chartDataRaw];

  if (totalQuotaBytes && totalUsageGB !== undefined) {
    const totalQuotaGB = bytesToGB(totalQuotaBytes);
    const remainingTotalGB = Math.max(0, totalQuotaGB - totalUsageGB);
    chartData.push({
      id: 'total-remaining',
      name: '전체 잔여 용량',
      value: remainingTotalGB,
      color: '#ffffff',
      isRemaining: true,
    });
  }

  const data = {
    labels: chartData.map((c) => c.name),
    datasets: [
      {
        data: chartData.map((c) => c.value),
        backgroundColor: chartData.map((c) => c.color),
        borderWidth: 0,
        hoverOffset: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: isCard ? !isEmpty : true,
        callbacks: {
          label: (context: TooltipItem<'pie'>) => {
            const val = context.parsed;
            const displayVal = isCard ? val.toFixed(0) : val;
            return ` ${context.label}: ${displayVal}${unit}`;
          },
        },
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: '#ffffff',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        bodyFont: {
          size: 12,
          weight: 'bold' as const,
        },
      },
    },
    cutout: cutout,
  };

  return (
    <div
      className={cn(
        'animate-in fade-in zoom-in-95 flex flex-col items-center duration-500',
        isCard
          ? 'bg-brand-white h-75 w-full justify-center gap-4 rounded-2xl border border-gray-200'
          : 'mx-auto gap-4',
      )}
      style={!isCard ? { width: showLegend ? 264 : chartSize } : undefined}
    >
      <div
        className="relative flex aspect-square items-center justify-center"
        style={{ width: chartSize, height: chartSize }}
      >
        <Pie data={data} options={options} />
      </div>

      {showLegend && (
        <div
          className={cn(
            'flex flex-wrap justify-center px-2',
            isCard ? 'w-full gap-x-4 gap-y-1' : 'gap-x-4 gap-y-3',
          )}
        >
          {chartDataRaw.map((c) => (
            <div key={c.id} className="flex items-center gap-1">
              <div className="h-4 w-4 rounded-full" style={{ backgroundColor: c.color }} />
              <span className="text-caption-m">{c.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsageChart;
