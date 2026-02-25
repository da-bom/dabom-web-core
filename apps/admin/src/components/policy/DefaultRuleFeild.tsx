'use client';

import { TextField } from '@shared';
import { DefaultRules, MonthlyLimit, PolicyType, TimeBlock } from 'src/api/policy/schema';

import MonthlyBlockField from './MonthlyBlockFeild';
import TimeBlockFeild from './TimeBlockFeild';

interface Props {
  type: PolicyType;
  rules: DefaultRules;
  onRuleChange: (newRules: DefaultRules) => void;
}

const DefaultRuleField = ({ type, rules, onRuleChange }: Props) => {
  if (type === 'MANUAL_BLOCK') return null;

  return (
    <TextField label="기본값">
      {type === 'MONTHLY_LIMIT' && (
        <MonthlyBlockField
          rules={rules as MonthlyLimit}
          onRuleChange={(newRules: MonthlyLimit) => onRuleChange(newRules)}
        />
      )}

      {type === 'TIME_BLOCK' && (
        <TimeBlockFeild
          rules={rules as TimeBlock}
          onRuleChange={(newRules: TimeBlock) => onRuleChange(newRules)}
        />
      )}
    </TextField>
  );
};

export default DefaultRuleField;
