import {
  ApiCustomer,
  FamilyDetail,
  FamilyPoliciesData,
  ServiceCustomerDetail,
} from '../api/policy/schema';

export const formatFamilyPolicies = (familyData: FamilyPoliciesData): FamilyDetail => {
  const mappedCustomers: ServiceCustomerDetail[] = familyData.customers.map((c: ApiCustomer) => {
    const monthlyPolicy = c.policies.find((p) => p.type === 'MONTHLY_LIMIT');
    const timeBlockPolicy = c.policies.find((p) => p.type === 'TIME_BLOCK');
    const manualBlockPolicy = c.policies.find((p) => p.type === 'MANUAL_BLOCK');

    if (monthlyPolicy && monthlyPolicy.rules?.limitBytes === undefined) {
      console.warn(`Monthly policy exists for customer ${c.customerId} but limitBytes is missing.`);
    }

    const monthlyLimitBytes = monthlyPolicy ? (monthlyPolicy.rules?.limitBytes ?? null) : null;
    const isBlocked = manualBlockPolicy?.isActive ?? false;

    let timeLimit: { start: string; end: string } | null = null;
    if (timeBlockPolicy?.isActive) {
      const { start, end } = timeBlockPolicy.rules ?? {};
      if (!start || !end) {
        console.warn(
          `Time block policy is active for customer ${c.customerId} but start/end times are missing.`,
        );
      }
      timeLimit = {
        start: start ?? '00:00',
        end: end ?? '23:00',
      };
    }

    return {
      customerId: c.customerId,
      name: c.name,
      phoneNumber: c.phoneNumber,
      role: c.role,
      monthlyUsedBytes: c.usedBytes,
      monthlyLimitBytes,
      isBlocked,
      timeLimit,
    };
  });

  return {
    familyId: familyData.familyId,
    familyName: '다봄 가족스',
    createdById: 0,
    customers: mappedCustomers,
    totalQuotaBytes: familyData.totalQuotaBytes,
    currentMonth: '',
    createdAt: '',
    updatedAt: '',
  };
};
