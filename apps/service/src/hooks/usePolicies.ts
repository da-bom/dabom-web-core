import { QUERY_STALE_TIME, http } from "@shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import {
  FamilyDetail,
  ServicePoliciesResponse,
  UpdatePolicyRequest,
  UpdatePolicyResponse,
} from "src/types/policiesType";

import { ApiErrorResponse } from "@shared/type/error";
import { CustomerDetail } from "@shared/type/familyType";

export const getFamilyPolicies = async (): Promise<FamilyDetail> => {
  const response =
    await http.get<ServicePoliciesResponse>("/families/policies");

  const familyData = response as unknown as ServicePoliciesResponse["data"];

  console.log("백엔드 응답 데이터:", familyData);

  const mappedCustomers: CustomerDetail[] = familyData.customers.map((c) => {
    const monthlyPolicy = c.policies?.find((p) =>
      p.type.includes("MONTHLY_LIMIT"),
    );

    return {
      customerId: c.customerId,
      name: c.name,
      phoneNumber: c.phoneNumber,
      role: c.role,
      monthlyUsedBytes: c.usedBytes ?? 0,
      monthlyLimitBytes: monthlyPolicy?.rules?.limitBytes ?? 0,
    };
  });

  return {
    familyId: familyData.familyId || 0,
    familyName: "다봄 가족스",
    createdById: 0,
    customers: mappedCustomers,
    totalQuotaBytes: familyData.totalQuotaBytes ?? 0,
    currentMonth: "",
    createdAt: "",
    updatedAt: "",
  };
};

export const useGetFamilyPolicies = () => {
  return useQuery<FamilyDetail, ApiErrorResponse>({
    queryKey: ["familyPolicies"],
    queryFn: getFamilyPolicies,
    staleTime: QUERY_STALE_TIME.fiveMinutes,
    enabled:
      typeof window !== "undefined" && !!localStorage.getItem("access_token"),
  });
};

export const updatePolicy = async (
  payload: UpdatePolicyRequest,
): Promise<UpdatePolicyResponse> => {
  console.log("서버로 보내는 데이터:", JSON.stringify(payload, null, 2));
  const response = await http.patch("families/policies", payload);

  return response as unknown as UpdatePolicyResponse;
};

export const useUpdatePolicy = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdatePolicyResponse,
    ApiErrorResponse,
    UpdatePolicyRequest
  >({
    mutationFn: (payload) => updatePolicy(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["familyPolicies"] });
    },

    onError: (error: ApiErrorResponse) => {
      alert(error.errorMessage);
    },
  });
};
