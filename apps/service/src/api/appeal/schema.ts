export type AppealType = 'NORMAL' | 'EMERGENCY';
export type AppealStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

export interface Comment {
  commentId: number;
  authorId: number;
  authorName: string;
  comment: string;
  createdAt: string;
}

export interface AppealSummary {
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
}

export interface AppealDetail {
  appealId: number;
  policyAssignmentId: number;
  requesterId: number;
  requesterName: string;
  requestReason: string;
  rejectReason: string | null;
  desiredRules: {
    limitBytes: number;
  };
  status: AppealStatus;
  resolvedById: number | null;
  resolvedAt: string | null;
  createdAt: string;
  comments: {
    content: Comment[];
    nextCursor: string | null;
    hasNext: boolean;
  };
  type?: AppealType;
}

export type Appeal = AppealDetail;

export interface AppealCreateRequest {
  policyAssignmentId: number;
  requestReason: string;
  desiredRules?: {
    limitBytes: number;
  };
}

export interface AppealCreateResponse {
  success: boolean;
  data: {
    appealId: number;
    policyAssignmentId: number;
    status: AppealStatus;
    desiredRules: {
      limitBytes: number;
    };
    createdAt: string;
  };
  timestamp: string;
}

export interface AppealResponse {
  success: boolean;
  data: {
    appeals: AppealSummary[];
  };
  timestamp: string;
}

export interface AppealDetailResponse {
  success: boolean;
  data: AppealDetail;
  timestamp: string;
}
