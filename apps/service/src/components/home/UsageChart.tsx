'use client';

import { Pie } from 'react-chartjs-2';

import { bytesToGB } from '@shared';
import { ArcElement, Chart as ChartJS, Legend, Tooltip, TooltipItem } from 'chart.js';

import { CHART_COLOR } from 'src/app/(afterLogin)/home/contents';
import { CustomerListType } from 'src/types/DataUsage';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  customers?: CustomerListType[];
  totalUsageGB?: number;
  totalQuotaBytes?: number;

  items?: { id: number | string; name: string; value: number; color: string }[];
  unit?: string;
}

const UsageChart = ({ customers, totalUsageGB, totalQuotaBytes, items, unit = 'GB' }: Props) => {
  const showLegend = !items;
  const cutout = '30%';
  const chartSize = 215;
  const containerWidth = showLegend ? 264 : chartSize;

  const getChartData = () => {
    if (items) return items;

    if (customers) {
      return customers.map((customer, index) => ({
        id: customer.customerId,
        name: customer.name,
        value: bytesToGB(customer.monthlyUsedBytes),
        color: CHART_COLOR.COLORS[index % CHART_COLOR.COLORS.length],
      }));
    }

    return [];
  };

  const chartDataRaw = getChartData();

  if (chartDataRaw.length === 0) {
    return (
      <div className="flex w-full items-center justify-center p-8 text-gray-400">
        <p>데이터가 없습니다.</p>
      </div>
    );
  }

  const chartData = [...chartDataRaw];

  if (totalQuotaBytes !== undefined && totalUsageGB !== undefined) {
    const totalQuotaGB = bytesToGB(totalQuotaBytes);
    const remainingTotalGB = Math.max(0, totalQuotaGB - totalUsageGB);
    chartData.push({
      id: 'total-remaining',
      name: '전체 잔여 용량',
      value: remainingTotalGB,
      color: '#ffffff',
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
        enabled: true,
        callbacks: {
          label: (context: TooltipItem<'pie'>) => {
            const val = context.parsed;
            return ` ${context.label}: ${val}${unit}`;
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
      className="animate-in fade-in zoom-in-95 mx-auto flex flex-col items-center gap-4 duration-500"
      style={{ width: containerWidth }}
    >
      <div
        className="relative flex aspect-square items-center justify-center"
        style={{ width: chartSize }}
      >
        <Pie data={data} options={options} />
      </div>

      {showLegend && (
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-3">
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
