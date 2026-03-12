'use client';

import React, { Suspense, useMemo, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { ApprovedIcon, RejectedIcon } from '@icons';
import { formatSize } from '@shared';

import { useSuspenseGetAppealDetail } from 'src/api/appeal/useGetAppealDetail';
import { AppealInputBar, ChatBubble, PolicySummaryCard } from 'src/components/appeal';
import { APPEAL_TYPE_LABEL, APPEAL_UI_TEXT } from 'src/constants/appeal';
import { getCurrentUserRole } from 'src/utils/auth';
import { formatChatTime } from 'src/utils/formatTime';

type AppealStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

const VALID_STATUSES: AppealStatus[] = ['pending', 'approved', 'rejected', 'cancelled'];

const isValidStatus = (status: string | null): status is AppealStatus => {
  return VALID_STATUSES.includes(status?.toLowerCase() as AppealStatus);
};

function AppealCommentContent() {
  const searchParams = useSearchParams();
  const appealId = Number(searchParams.get('id'));

  const { data } = useSuspenseGetAppealDetail(appealId);

  const [inputValue, setInputValue] = useState('');

  const userRole = getCurrentUserRole();
  const isOwner = userRole === 'OWNER';

  const rawStatus = data.status.toLowerCase();
  const status = isValidStatus(rawStatus) ? rawStatus : 'pending';

  const policyLabel = useMemo(() => {
    if (data.type === 'EMERGENCY') return APPEAL_TYPE_LABEL.EMERGENCY;
    if (data.policyType === 'TIME_BLOCK') return APPEAL_TYPE_LABEL.TIME_BLOCK;
    if (data.policyType === 'MONTHLY_LIMIT') return APPEAL_TYPE_LABEL.NORMAL;
    return APPEAL_TYPE_LABEL.NORMAL;
  }, [data]);

  const requestedValue = useMemo(() => {
    const rawLimitBytes = data.desiredRules?.limitBytes;
    const startTime = data.desiredRules?.start;
    const endTime = data.desiredRules?.end;

    const numLimitBytes = rawLimitBytes !== null ? Number(rawLimitBytes) : NaN;

    if (!isNaN(numLimitBytes)) {
      return formatSize(numLimitBytes).total;
    }
    if (startTime && endTime) {
      return `${startTime} ~ ${endTime}`;
    }
    if (data.type === 'EMERGENCY') {
      return APPEAL_UI_TEXT.EMERGENCY_DATA_AMOUNT;
    }
    return '-';
  }, [data]);

  return (
    <div className="flex w-full flex-col">
      <main className="flex w-full flex-col items-center gap-4 p-5">
        <div className="sticky top-0 z-10 flex w-full flex-col items-center gap-4">
          {status === 'rejected' && <RejectedIcon />}
          {status === 'approved' && <ApprovedIcon />}

          <PolicySummaryCard
            policyName={policyLabel}
            requestedValue={requestedValue}
            reasonText={
              status === 'rejected' ? (
                <>
                  {APPEAL_UI_TEXT.REQUEST_REASON}: {data.requestReason}
                  {data.rejectReason && (
                    <>
                      <br />
                      {APPEAL_UI_TEXT.REJECT_REASON}: {data.rejectReason}
                    </>
                  )}
                </>
              ) : (
                `${APPEAL_UI_TEXT.REQUEST_REASON}: ${data.requestReason}`
              )
            }
            isOwner={status === 'pending' && isOwner}
            onApprove={() => {
              console.log('approved');
            }}
            onReject={() => {
              console.log('rejected');
            }}
          />
        </div>

        <div className="flex w-full flex-col gap-4">
          {data.comments.content.map((msg) => (
            <ChatBubble
              key={msg.commentId}
              senderName={msg.authorName}
              message={msg.comment}
              time={formatChatTime(msg.createdAt)}
              isMe={
                isOwner
                  ? msg.authorName !== data.requesterName
                  : msg.authorName === data.requesterName
              }
            />
          ))}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full">
        <AppealInputBar
          value={inputValue}
          onChange={setInputValue}
          onSubmit={() => {
            console.log('Submit:', inputValue);
            setInputValue('');
          }}
          disabled={status !== 'pending'}
        />
      </div>
    </div>
  );
}

export default function AppealCommentPage() {
  return (
    <Suspense fallback={<div className="h-full min-h-screen" />}>
      <AppealCommentContent />
    </Suspense>
  );
}
