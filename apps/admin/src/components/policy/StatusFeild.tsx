import { RadioGroup, Switch, TextField } from "@shared";

import {
  EditablePolicyFields,
  PolicyDetailType,
} from "@shared/types/policyType";

const StatusFeild = ({
  data,
  setData,
}: {
  originData: PolicyDetailType;
  data: EditablePolicyFields;
  setData: (data: EditablePolicyFields) => void;
}) => {
  return (
    <div>
      {/* TODO: 타입에 따라 렌더링 */}
      {/* <TextField label="기본값">
        <DropDown
          options={["추가 사용량 부과", "속도 제한", "사용 차단"]}
          selectedOption={originData.default_rules.}
          setSelectedOption={() => {}}
        />
      </TextField> */}
      <TextField
        label="상태"
        description="정책 활성화 즉시 모든 유저에게 적용됩니다."
      >
        <div className="flex items-center gap-4">
          <Switch
            type={data.isActive ? "primary" : "gray"}
            size="lg"
            onClick={() => {
              setData({ ...data, isActive: !data.isActive });
            }}
          >
            {data.isActive ? "활성화" : "비활성화"}
          </Switch>
        </div>
      </TextField>
      {data.isActive && (
        <div className="ml-16">
          <RadioGroup
            options={[
              { label: "정책 수정 이후에만 적용하기", value: "after" },
              {
                label: "기존 값 덮어쓰기",
                value: "overwrite",
                subLabel: "유저가 설정했던 값이 모두 덮어씌워집니다.",
                isWarning: true,
              },
            ]}
            name="policy"
            selectedValue=""
            onChange={() => {
              // TODO: 변경하기 ...
            }}
          />
        </div>
      )}
    </div>
  );
};

export default StatusFeild;
