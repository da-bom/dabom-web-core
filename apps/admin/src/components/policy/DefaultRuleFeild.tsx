"use client";

import { TextField } from "@shared";

import {
  MonthlyBlock,
  PolicyDetailType,
  TimeBlock,
} from "@shared/types/policyType";

import MonthlyBlockField from "./MonthlyBlockFeild";
import TimeBlockFeild from "./TimeBlockFeild";

interface Props {
  type: string;
  rules: PolicyDetailType["default_rules"];
  onRuleChange: (newRules: PolicyDetailType["default_rules"]) => void;
}

const DefaultRuleField = ({ type, rules, onRuleChange }: Props) => {
  if (type === "ManualBlock") return null;
  return (
    <TextField label="기본값">
      {type === "MonthlyBlock" && (
        <MonthlyBlockField
          rules={rules as MonthlyBlock}
          onRuleChange={(newRules) => onRuleChange(newRules)}
        />
      )}

      {type === "TimeBlock" && (
        <TimeBlockFeild
          rules={rules as TimeBlock}
          onRuleChange={(newRules) => onRuleChange(newRules)}
        />
      )}
    </TextField>
  );
};
export default DefaultRuleField;
