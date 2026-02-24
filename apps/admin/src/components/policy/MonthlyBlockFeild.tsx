import { useState } from "react";

import { DropDown, formatSize, formatToBytes } from "@shared";

import { MONTHLY_LIMIT } from "@shared/types/policyType";

const MonthlyBlockField = ({
  rules,
  onRuleChange,
}: {
  rules: MONTHLY_LIMIT;
  onRuleChange: (newRules: MONTHLY_LIMIT) => void;
}) => {
  console.log("rules", rules);
  const initial = formatSize(rules.limitBytes);
  const [localValue, setLocalValue] = useState(initial.value);
  const [localUnit, setLocalUnit] = useState(initial.unit);

  const handleUpdate = (val: number, unit: string) => {
    setLocalValue(val);
    setLocalUnit(unit);
    onRuleChange({ ...rules, limitBytes: formatToBytes(val, unit) });
  };

  return (
    <div className="flex h-12 w-fit overflow-hidden rounded-xl border border-gray-200 focus-within:border-gray-300">
      <input
        type="number"
        value={localValue}
        onChange={(e) => handleUpdate(Number(e.target.value), localUnit)}
        className="text-body1-m w-20 px-4 text-center text-gray-800 outline-none"
      />
      <div className="my-auto h-8 w-[1px] bg-gray-200" />
      <DropDown
        size="sm"
        options={["Bytes", "KB", "MB", "GB"]}
        selectedOption={localUnit}
        setSelectedOption={(nextUnit) => handleUpdate(localValue, nextUnit)}
      />
    </div>
  );
};

export default MonthlyBlockField;
