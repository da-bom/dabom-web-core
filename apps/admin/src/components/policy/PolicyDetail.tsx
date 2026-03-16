'use client';

import { useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { Button, Divider, Drawer, DropDown, MainBox, TextField } from '@shared';

import { Policy } from 'src/api/policy/schema';
import { useGetPolicyDetail } from 'src/api/policy/useGetPolicyDetail';
import { useUpdatePolicy } from 'src/api/policy/useUpdatePolicy';

import Error from '../common/Error';
import Loading from '../common/Loading';
import Status from './Status';
import StatusField from './StatusField';
import DefaultRuleField from './rule/DefaultRuleField';

const PolicyDetailDrawer = () => {
  const params = useParams();
  const policyId = Number(params.id);
  const { data, isLoading, isError } = useGetPolicyDetail(policyId);

  return (
    <Drawer>
      {isLoading && <Loading />}

      {!isLoading && isError && <Error title="데이터를 불러오지 못했습니다." />}

      {!isLoading && !isError && !data && <Error title="데이터가 존재하지 않습니다." />}

      {!isLoading && !isError && data && <PolicyDetailContent data={data} policyId={policyId} />}
    </Drawer>
  );
};

export default PolicyDetailDrawer;

const PolicyDetailContent = ({ data, policyId }: { data: Policy; policyId: number }) => {
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
    <>
      <header className="flex flex-col gap-3">
        <Status active={newData.isActive} />
        <h1 className="text-h2-d">{data.name}</h1>
        <input
          value={newData.description}
          onChange={(e) => setNewData((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="정책에 대한 설명을 입력하세요."
          className="border-none outline-none focus:border-b focus:border-gray-800"
        />
      </header>
      <Divider />
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
    </>
  );
};
