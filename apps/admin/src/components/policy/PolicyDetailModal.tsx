"use client";

import { useParams, useRouter } from "next/navigation";

import { Button, DropDown, Icon, RadioGroup, Switch, TextField } from "@shared";

import POLICY_DETAIL from "@shared/data/policyDetail";

const PolicyDetailModal = () => {
  const router = useRouter();
  const params = useParams();
  const policyId = Number(params.id);

  const data = POLICY_DETAIL[policyId as keyof typeof POLICY_DETAIL];

  return (
    <div
      role="presentation"
      onClick={() => router.back()}
      className="fixed inset-0 z-50 flex h-screen justify-end bg-black/20"
      aria-label="닫기"
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className="bg-brand-white flex h-full w-175 flex-col border-l border-gray-300 px-11 py-8 shadow-[-4px_0_10px_rgba(0,0,0,0.1)]"
      >
        <div className="flex flex-col gap-10 overflow-y-auto">
          <button
            className="w-fit cursor-pointer text-gray-500"
            onClick={() => router.back()}
          >
            <Icon name="Chevron" />
          </button>

          <header className="flex flex-col gap-3">
            <Status active={data.isActive} />
            <h1 className="text-h1-d">{data.name}</h1>
            <p className="text-body1-d text-gray-700">{data.description}</p>
          </header>

          <hr className="border-gray-100" />

          <div className="flex flex-col gap-8">
            <TextField label="권한">
              <DropDown
                options={["ADMIN", "OWNER", "MEMBER"]}
                selectedOption={data.requireRole}
                setSelectedOption={() => {}}
              />
            </TextField>

            {/* TODO: 타입에 따라 렌더링 */}
            {/* <TextField label="기본값">
              <DropDown
                options={["추가 사용량 부과", "속도 제한", "사용 차단"]}
                selectedOption={data.default_rules.rule}
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
                  onClick={() => {}}
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
        </div>

        <div className="mt-auto flex justify-end gap-2">
          <Button color="light" size="md-short" onClick={() => router.back()}>
            취소
          </Button>
          <Button color="dark" size="md">
            변경사항 저장
          </Button>
        </div>
      </aside>
    </div>
  );
};

const Status = ({ active }: { active: boolean }) => (
  <div
    className={`text-body1-d flex items-center gap-1 ${active ? "text-primary" : "text-gray-600"}`}
  >
    {active ? (
      <>
        <Icon name="Check" />
        <span>활성화</span>
      </>
    ) : (
      <>
        <Icon name="Deactive" />
        <span>비활성화</span>
      </>
    )}
  </div>
);

export default PolicyDetailModal;
