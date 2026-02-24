"use client";

import { useParams } from "next/navigation";

import { useGetPolicyDetail } from "src/hooks/useGetPolicyDetail";

import PolicyDetailForm from "./PolicyDetailForm";

const PolicyDetailModal = () => {
  const params = useParams();
  const policyId = Number(params.id);
  const { data, isLoading } = useGetPolicyDetail(policyId);

  if (isLoading) return <div className="fixed inset-0 bg-black/20" />;
  if (!data) return null;

  return <PolicyDetailForm initialData={data} policyId={policyId} />;
};

export default PolicyDetailModal;
