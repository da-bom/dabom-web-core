import { PolicyDetailType } from "@shared/types/policyType";

// 예시

interface Props {
  type: string;
  rules: PolicyDetailType["default_rules"];
  onRuleChange: (newRules: PolicyDetailType["default_rules"]) => void;
}

const DefaultRuleField = ({ type, rules, onRuleChange }: Props) => {
  if (type === "MONTHLY_BLOCK") {
    // const r = rules as MONTHLY_BLOCK;
    return <div>데이터 사용량 한도 설정</div>;
  }

  if (type === "TIME_BLOCK") {
    // const r = rules as TIME_BLOCK;
    return <div className="flex gap-2">시간 제한</div>;
  }

  return null;
};

export default DefaultRuleField;
