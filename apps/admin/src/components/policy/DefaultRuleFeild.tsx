"use client";

import { TextField } from "@shared";

import {
  MONTHLY_LIMIT,
  PolicyDetailType,
  TIME_BLOCK,
} from "@shared/types/policyType";

import MonthlyBlockField from "./MonthlyBlockFeild";
import TimeBlockFeild from "./TimeBlockFeild";

interface Props {
  type: string;
  rules: PolicyDetailType["defaultRules"];
  onRuleChange: (newRules: PolicyDetailType["defaultRules"]) => void;
}

const DefaultRuleField = ({ type, rules, onRuleChange }: Props) => {
  console.log(type);
  if (type === "MANUAL_BLOCK") return null;
  return (
    <TextField label="기본값">
      {type === "MONTHLY_LIMIT" && (
        <MonthlyBlockField
          rules={rules as MONTHLY_LIMIT}
          onRuleChange={(newRules) => onRuleChange(newRules)}
        />
      )}

      {type === "TIME_BLOCK" && (
        <TimeBlockFeild
          rules={rules as TIME_BLOCK}
          onRuleChange={(newRules) => onRuleChange(newRules)}
        />
      )}
    </TextField>
  );
};
export default DefaultRuleField;
