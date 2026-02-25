'use client';

import { useState } from 'react';

import { TimeBlock } from 'src/api/policy/schema';

const TimeBlockField = ({
  rules,
  onRuleChange,
}: {
  rules: TimeBlock;
  onRuleChange: (newRules: TimeBlock) => void;
}) => {
  const [startTime, setStartTime] = useState(rules.start);
  const [endTime, setEndTime] = useState(rules.end);

  const formatTime = (value: string) => {
    const digits = value.replaceAll(/\D/g, '').slice(0, 4);
    let hour = digits.slice(0, 2);
    let minute = digits.slice(2);

    if (hour && Number(hour) > 23) hour = '23';
    if (minute && Number(minute) > 59) minute = '59';

    return minute ? `${hour}:${minute}` : hour;
  };

  const handleChange = (val: string, type: 'start' | 'end') => {
    const formatted = formatTime(val);
    if (type === 'start') {
      setStartTime(formatted);
      if (formatted.length === 5) onRuleChange({ ...rules, start: formatted });
    } else {
      setEndTime(formatted);
      if (formatted.length === 5) onRuleChange({ ...rules, end: formatted });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex h-12 w-28 overflow-hidden rounded-xl border border-gray-200 bg-white focus-within:border-gray-300">
        <input
          type="text"
          placeholder="00:00"
          value={startTime}
          onChange={(e) => handleChange(e.target.value, 'start')}
          className="text-body1-m w-full px-4 text-center text-gray-800 outline-none"
        />
      </div>
      <span className="text-gray-400">~</span>
      <div className="flex h-12 w-28 overflow-hidden rounded-xl border border-gray-200 bg-white focus-within:border-gray-300">
        <input
          type="text"
          placeholder="00:00"
          value={endTime}
          onChange={(e) => handleChange(e.target.value, 'end')}
          className="text-body1-m w-full px-4 text-center text-gray-800 outline-none"
        />
      </div>
    </div>
  );
};

export default TimeBlockField;
