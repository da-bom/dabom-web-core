export interface Customer {
  customerId: number;
  name: string;
}

export interface Family {
  familyId: number;
  familyName: string;
  customerCount: number;
  customers: Customer[];
  createdAt: string;
}

export interface CustomerDetail {
  customerId: number;
  name: string;
  role: "OWNER" | "MEMBER";
  phoneNumber: string;
  monthlyLimitBytes: number;
  monthlyUsedBytes: number;
}
