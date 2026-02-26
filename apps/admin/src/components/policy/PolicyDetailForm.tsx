'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  Button,
  CheckIcon,
  ChevronIcon,
  DropDown,
  MainBox,
  TextField,
  UnpublishedIcon,
} from '@shared';
import { PolicyDetail } from 'src/services/policy/schema';
import { useUpdatePolicy } from 'src/services/policy/useUpdatePolicy';

import DefaultRuleFeild from './DefaultRuleFeild';
import StatusFeild from './StatusFeild';

interface Props {
  initialData: PolicyDetail;
  policyId: number;
}

const PolicyDetailForm = ({ initialData, policyId }: Props) => {
  const router = useRouter();
  const [newData, setNewData] = useState({
    description: initialData.description,
    defaultRules: initialData.defaultRules,
    requiredRole: initialData.requiredRole,
    isActive: initialData.isActive,
  });
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: updatePolicy } = useUpdatePolicy();

  const handleSave = () => {
    updatePolicy(
      {
        policyId,
        data: {
          description: newData.description,
          requiredRole: newData.requiredRole,
          isActive: newData.isActive,
          defaultRules: newData.defaultRules,
          overWrite: true,
        },
      },
      {
        onSuccess: () => {
          router.push('/policy');
        },
      },
    );
  };

  return (
    <div
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          router.back();
        }
      }}
      className="fixed inset-0 z-50 flex h-screen justify-end bg-black/20"
    >
      <aside className="bg-brand-white flex h-full w-175 flex-col border-l border-gray-300 px-11 py-8 shadow-[-4px_0_10px_rgba(0,0,0,0.1)]">
        <div className="flex h-full flex-col gap-10 overflow-y-auto">
          <button className="w-fit cursor-pointer text-gray-500" onClick={() => router.back()}>
            <ChevronIcon />
          </button>

          <header className="flex flex-col gap-3">
            <Status active={newData.isActive} />
            <h1 className="text-h1-d">{initialData.name}</h1>
            <p className="text-body1-d text-gray-700">{newData.description}</p>
          </header>

          <hr className="border-gray-100" />

          <div className="flex h-full flex-col gap-8">
            <TextField label="권한">
              <MainBox className="rounded-xl border-[1px] border-gray-200 hover:border-gray-300 active:bg-gray-50">
                <DropDown
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  options={['ADMIN', 'OWNER', 'MEMBER']}
                  selectedOption={newData.requiredRole}
                  setSelectedOption={(option) =>
                    setNewData((prev) => ({
                      ...prev,
                      requireRole: option as 'ADMIN' | 'OWNER' | 'MEMBER',
                    }))
                  }
                />
              </MainBox>
            </TextField>

            <DefaultRuleFeild
              type={initialData.policyType}
              rules={newData.defaultRules}
              onRuleChange={(newRules) => {
                setNewData((prev) => ({ ...prev, default_rules: newRules }));
              }}
            />

            <StatusFeild
              isSystem={initialData.isSystem}
              isActive={initialData.isActive}
              onActiveChange={(checked) => {
                setNewData((prev) => ({ ...prev, isActive: checked }));
              }}
            />
          </div>
        </div>

        <div className="mt-auto flex justify-end gap-2">
          <Button color="light" size="md-short" onClick={() => router.back()}>
            취소
          </Button>
          <Button color="dark" size="md" onClick={handleSave}>
            변경사항 저장
          </Button>
        </div>
      </aside>
    </div>
  );
};

const Status = ({ active }: { active: boolean }) => (
  <div
    className={`text-body1-d flex items-center gap-1 ${active ? 'text-primary' : 'text-gray-600'}`}
  >
    {active ? (
      <>
        <CheckIcon />
        <span>활성화</span>
      </>
    ) : (
      <>
        <UnpublishedIcon />
        <span>비활성화</span>
      </>
    )}
  </div>
);

export default PolicyDetailForm;
