'use client';

import { useParams } from 'next/navigation';

import { useGetPolicyDetail } from 'src/api/policy/useGetPolicyDetail';

import PolicyDetailForm from './PolicyDetailForm';

const PolicyDetailModal = () => {
  const params = useParams();
  const policyId = Number(params.id);

  const { data, isLoading, isError } = useGetPolicyDetail(policyId);

  if (isLoading) return <div>로딩</div>;
  if (isError) return <div>에러</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  return <PolicyDetailForm initialData={data} policyId={policyId} />;
};

export default PolicyDetailModal;
