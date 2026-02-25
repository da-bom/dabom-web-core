"use client";

import { useParams } from "next/navigation";

import { useGetPolicyDetail } from "src/hooks/useGetPolicyDetail";

import { RuleType } from "@shared/types/policyType";

import PolicyDetailForm from "./PolicyDetailForm";

const PolicyDetailModal = () => {
  const params = useParams();
  const policyId = Number(params.id);

  const { data, isLoading, isError } = useGetPolicyDetail(policyId);

  if (isLoading) return <div>로딩</div>;
  if (isError) return <div>에러</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  const formattedData = {
    id: data.id,
    name: data.name,
    description: data.description,
    policyType: data.policyType as RuleType,
    defaultRules: data.defaultRules,
    requiredRole: data.requiredRole,
    isActive: data.isActive,
    isSystem: data.isSystem,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };

  return <PolicyDetailForm initialData={formattedData} policyId={policyId} />;
};

export default PolicyDetailModal;
