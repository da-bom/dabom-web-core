'use client';

import { Pie } from 'react-chartjs-2';

import { bytesToGB } from '@shared';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { CHART_COLOR } from 'src/app/(afterLogin)/home/contents';
import { CustomerListType } from 'src/types/dataUsage';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  customers: CustomerListType[];
  totalUsageGB: number;
}

const UsageChart = ({ customers, totalUsageGB }: Props) => {
  if (!customers || customers.length === 0) {
    return (
      <div className="flex w-full items-center justify-center p-8 text-gray-400">
        <p>데이터가 없습니다.</p>
      </div>
    );
  }

  const isEmpty = totalUsageGB === 0;

  const totalLimitGB = customers.reduce((acc, c) => acc + bytesToGB(c.monthlyLimitBytes), 0);
  const separatorValue = totalLimitGB * 0.005;

  const chartData = customers.flatMap((customer, index) => {
    const idx = index % CHART_COLOR.COLORS.length;
    const usedGB = bytesToGB(customer.monthlyUsedBytes);
    const limitGB = bytesToGB(customer.monthlyLimitBytes);
    const remainingGB = Math.max(0, limitGB - usedGB);

    return [
      {
        id: `${customer.customerId}-used`,
        name: `${customer.name} (사용)`,
        value: usedGB,
        color: CHART_COLOR.COLORS[idx],
        isSeparator: false,
      },
      {
        id: `${customer.customerId}-remaining`,
        name: `${customer.name} (잔여)`,
        value: remainingGB,
        color: '#EAEAEA',
        isSeparator: false,
      },
      {
        id: `${customer.customerId}-sep`,
        name: 'separator',
        value: separatorValue,
        color: '#FEFEFE',
        isSeparator: true,
      },
    ];
  });

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
        enabled: !isEmpty,
        filter: (tooltipItem: import('chart.js').TooltipItem<'pie'>) => {
          return !chartData[tooltipItem.dataIndex].isSeparator;
        },
        callbacks: {
          label: (context: import('chart.js').TooltipItem<'pie'>) => {
            return ` ${context.label}: ${context.parsed.toFixed(1)}GB`;
          },
        },
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        bodyFont: {
          size: 12,
          weight: 'bold' as const,
        },
      },
    },
    cutout: '35%',
  };

  const legendData = customers.map((customer, index) => ({
    id: customer.customerId,
    name: customer.name,
    color: CHART_COLOR.COLORS[index % CHART_COLOR.COLORS.length],
  }));

  return (
    <div className="animate-in fade-in zoom-in-95 flex w-full flex-col items-center gap-5 duration-500">
      <div className="relative flex aspect-square w-full items-center justify-center">
        <Pie data={data} options={options} />
      </div>

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
        {legendData.map((c) => (
          <div key={c.id} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: c.color }} />
            <span className="text-caption-m">{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsageChart;
