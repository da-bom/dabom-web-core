"use client";

import { useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { Button, DropDown, Icon, TextField } from "@shared";

import POLICY_DETAIL from "@shared/data/policyDetail";
import { PolicyDetailType } from "@shared/types/policyType";

import StatusFeild from "./StatusFeild";

const PolicyDetailModal = () => {
  const router = useRouter();
  const params = useParams();
  const policyId = Number(params.id);

  const data = POLICY_DETAIL[
    policyId as keyof typeof POLICY_DETAIL
  ] as unknown as PolicyDetailType;

  const [newData, setNewData] = useState({
    description: data.description,
    default_rules: data.default_rules,
    requireRole: data.requireRole,
    isActive: data.isActive,
  });

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
            {/* TODO: input으로 변경 */}
            <p className="text-body1-d text-gray-700">{data.description}</p>
          </header>

          <hr className="border-gray-100" />

          <div className="flex flex-col gap-8">
            <TextField label="권한">
              <DropDown
                options={["ADMIN", "OWNER", "MEMBER"]}
                selectedOption={newData.requireRole}
                setSelectedOption={() => {}}
              />
            </TextField>

            <StatusFeild
              isSystem={data.isSystem}
              data={newData}
              setData={setNewData}
            />
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
