export const MOCK_RECAP_DATA = {
  success: true,
  data: {
    recapId: 401,
    familyId: 100,
    familyName: '김씨 가족',
    reportMonth: '2026-03-01',
    totalUsedBytes: 53687091200,
    totalQuotaBytes: 107374182400,
    usageRatePercent: 50.0,

    usageByWeekday: {
      monday: 15.2,
      tuesday: 18.5,
      wednesday: 62.1,
      thursday: 85.0,
      friday: 30.0,
      saturday: 70.3,
      sunday: 25.9,
    },

    peakUsage: {
      startHour: 21,
      endHour: 23,
      mostUsedWeekday: 'thursday',
    },

    missionSummary: {
      totalMissionCount: 10,
      completedMissionCount: 5,
      rejectedRequestCount: 3,
    },

    appealSummary: {
      totalAppeals: 4,
      approvedAppeals: 3,
      rejectedAppeals: 1,
    },

    appealHighlights: {
      topSuccessfulRequester: {
        requesterId: 12346,
        requesterName: '김민지',
        approvedAppealCount: 3,
        recentApprovedAppeals: [
          {
            appealId: 91,
            approverId: 12345,
            approverName: '김철수',
            requestReason: '야간 차단 해제를 요청했어요.',
            requestedAt: '2026-03-21T14:32:00',
          },
          {
            appealId: 87,
            approverId: 12345,
            approverName: '김철수',
            requestReason: '주말 사용 제한 완화를 요청했어요.',
            requestedAt: '2026-03-18T20:10:00',
          },
          {
            appealId: 83,
            approverId: 12345,
            approverName: '김철수',
            requestReason: '인강 시청 시간 연장을 요청했어요.',
            requestedAt: '2026-03-12T19:05:00',
          },
        ],
      },
      topAcceptedApprover: {
        approverId: 12345,
        approverName: '김철수',
        approvedAppealCount: 3,
        recentAcceptedAppeals: [
          {
            appealId: 91,
            requesterId: 12346,
            requesterName: '김민지',
            requestReason: '야간 차단 해제를 요청했어요.',
            resolvedAt: '2026-03-21T14:32:00',
          },
          {
            appealId: 87,
            requesterId: 12346,
            requesterName: '김민지',
            requestReason: '주말 사용 제한 완화를 요청했어요.',
            resolvedAt: '2026-03-18T20:10:00',
          },
          {
            appealId: 83,
            requesterId: 12347,
            requesterName: '김민수',
            requestReason: '인강 시청 시간 연장을 요청했어요.',
            resolvedAt: '2026-03-12T19:05:00',
          },
        ],
      },
    },

    communicationScore: 82.5,
    generatedAt: '2026-03-01T00:00:00',
  },
};
