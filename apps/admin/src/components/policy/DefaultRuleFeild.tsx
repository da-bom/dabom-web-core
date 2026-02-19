"use client";

import { TextField } from "@shared";

import { MONTHLY_BLOCK, PolicyDetailType } from "@shared/types/policyType";

import MonthlyBlockField from "./MonthlyBlockFeild";

interface Props {
  type: string;
  rules: PolicyDetailType["default_rules"];
  onRuleChange: (newRules: PolicyDetailType["default_rules"]) => void;
}

const DefaultRuleField = ({ type, rules, onRuleChange }: Props) => {
  return (
    <TextField label="기본값">
      {type === "MONTHLY_BLOCK" && (
        <MonthlyBlockField
          rules={rules as MONTHLY_BLOCK}
          onRuleChange={(newRules) => onRuleChange(newRules)}
        />
      )}
    </TextField>
  );
};
export default DefaultRuleField;
