const CUSTOMER_LIST = {
  familyId: 100,
  familyName: "김씨 가족",
  year: 2024,
  month: 1,
  totalQuotaBytes: 107374182400,
  remainingBytes: 53687091200,
  customers: [
    {
      customerId: 12345,
      name: "아빠",
      monthlyUsedBytes: 5368709120,
      monthlyLimitBytes: 10737418240,
      isBlocked: false,
    },
    {
      customerId: 12346,
      name: "엄마",
      monthlyUsedBytes: 4294967296,
      monthlyLimitBytes: 10737418240,
      isBlocked: false,
    },
    {
      customerId: 12347,
      name: "자녀1 (나)",
      monthlyUsedBytes: 3221225472,
      monthlyLimitBytes: 5368709120,
      isBlocked: false,
      isMe: true,
    },
    {
      customerId: 12348,
      name: "자녀2",
      monthlyUsedBytes: 2147483648,
      monthlyLimitBytes: 5368709120,
      isBlocked: true,
      blockReason: "MONTHLY_LIMIT_EXCEEDED",
    },
  ],
};

export default CUSTOMER_LIST;
