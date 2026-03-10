'use client';

import { useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { CheckOutlinedIcon, UnpublishedIcon } from '@icons';
import { Button, Drawer, DropDown, MainBox, TextField } from '@shared';

import { PolicyDetail } from 'src/api/policy/schema';
import { useGetPolicyDetail } from 'src/api/policy/useGetPolicyDetail';
import { useUpdatePolicy } from 'src/api/policy/useUpdatePolicy';

import StatusField from './StatusField';
import DefaultRuleField from './rule/DefaultRuleField';

const PolicyDetailModal = () => {
  const params = useParams();
  const policyId = Number(params.id);

  const { data, isLoading, isError } = useGetPolicyDetail(policyId);

  if (isLoading) return <div>로딩</div>;
  if (isError) return <div>에러</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  return <PolicyDetailContent data={data} policyId={policyId} />;
};

export default PolicyDetailModal;

const PolicyDetailContent = ({ data, policyId }: { data: PolicyDetail; policyId: number }) => {
  const router = useRouter();
  const { mutate: updatePolicy } = useUpdatePolicy();

  const [isOpen, setIsOpen] = useState(false);
  const [newData, setNewData] = useState({
    type: data.type,
    description: data.description,
    defaultRules: data.defaultRules,
    requiredRole: data.requireRole ?? 'MEMBER',
    isActive: data.isActive,
  });

  const handleSave = () => {
    updatePolicy(
      {
        policyId,
        data: {
          type: newData.type,
          description: newData.description,
          requireRole: newData.requiredRole,
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
    <Drawer>
      <header className="flex flex-col gap-3">
        <Status active={newData.isActive} />
        <h1 className="text-h2-d">{data.name}</h1>
        <p className="text-body3-d text-gray-700">{newData.description}</p>
      </header>

      <hr className="border-gray-100" />

      <div className="flex h-full flex-col gap-8">
        <TextField label="권한">
          <MainBox className="rounded-xl border-gray-200 hover:border-gray-300 active:bg-gray-50">
            <DropDown
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              options={['ADMIN', 'OWNER', 'MEMBER']}
              selectedOption={newData.requiredRole}
              setSelectedOption={(option) =>
                setNewData((prev) => ({
                  ...prev,
                  requiredRole: option as 'ADMIN' | 'OWNER' | 'MEMBER',
                }))
              }
            />
          </MainBox>
        </TextField>

        <DefaultRuleField
          type={data.type}
          rules={newData.defaultRules}
          onRuleChange={(newRules) => {
            setNewData((prev) => ({ ...prev, defaultRules: newRules }));
          }}
        />

        <StatusField
          isSystem={data.isSystem}
          isActive={data.isActive}
          onActiveChange={(checked) => {
            setNewData((prev) => ({ ...prev, isActive: checked }));
          }}
        />
      </div>

      <div className="mt-auto flex justify-end gap-2">
        <Button color="light" size="md-short" onClick={() => router.back()}>
          취소
        </Button>
        <Button color="dark" size="md" onClick={handleSave}>
          변경사항 저장
        </Button>
      </div>
    </Drawer>
  );
};

const Status = ({ active }: { active: boolean }) => (
  <div
    className={`text-body1-d flex items-center gap-1 ${active ? 'text-primary' : 'text-gray-600'}`}
  >
    {active ? (
      <>
        <CheckOutlinedIcon sx={{ width: 14 }} />
        <span className="text-body2-d font-bold">활성화</span>
      </>
    ) : (
      <>
        <UnpublishedIcon sx={{ width: 14 }} />
        <span className="text-body2-d font-bold">비활성화</span>
      </>
    )}
  </div>
);
