export type AppealType = 'NORMAL' | 'EMERGENCY';
export type AppealStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Author {
  customerId: number;
  name: string;
}

export interface Message {
  messageId: number;
  author: Author;
  message: string;
  createdAt: string;
}

export interface Appeal {
  appealId: number;
  type: AppealType;
  policyAssignmentId: number;
  requesterId: number;
  requesterName: string;
  requestReason: string;
  desiredRules: {
    limitBytes: number;
  };
  status: AppealStatus;
  createdAt: string;
  messages?: Message[];
}

export interface AppealResponse {
  success: boolean;
  data: {
    appeals: Appeal[];
  };
  timestamp: string;
}
