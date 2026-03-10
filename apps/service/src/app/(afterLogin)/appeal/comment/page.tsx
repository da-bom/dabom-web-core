'use client';

import React, { Suspense, useMemo, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { ApprovedIcon, RejectedIcon } from '@icons';
import { formatSize } from '@shared';

import { AppealInputBar, ChatBubble, PolicySummaryCard } from 'src/components/appeal';
import { APPEAL_TYPE_LABEL, APPEAL_UI_TEXT } from 'src/constants/appeal';
import { mockAppealDetails } from 'src/data/appealDetails';
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

  const selectedPolicy = searchParams.get('policy') || APPEAL_TYPE_LABEL.NORMAL;
  const inputAmount = searchParams.get('amount');
  const inputReason = searchParams.get('reason');

  const [inputValue, setInputValue] = useState('');

  const initialData = useMemo(() => {
    return mockAppealDetails.find((n) => n.appealId === appealId) || mockAppealDetails[0];
  }, [appealId]);

  const [status, setStatus] = useState<AppealStatus>(() => {
    const rawStatus = initialData.status.toLowerCase();
    return isValidStatus(rawStatus) ? rawStatus : 'pending';
  });

  const displayReason = inputReason || initialData.requestReason;

  const userRole = getCurrentUserRole();
  const isOwner = userRole === 'OWNER';

  return (
    <div className="flex w-full flex-col">
      <main className="flex w-full flex-col items-center gap-4 p-5">
        <div className="sticky top-0 z-10 flex w-full flex-col items-center gap-4">
          {status === 'rejected' && <RejectedIcon />}
          {status === 'approved' && <ApprovedIcon />}

          <PolicySummaryCard
            policyName={selectedPolicy}
            requestedValue={
              inputAmount
                ? `${inputAmount}GB`
                : formatSize(initialData.desiredRules.limitBytes).total
            }
            reasonText={
              status === 'rejected' ? (
                <>
                  {APPEAL_UI_TEXT.REQUEST_REASON}: {displayReason}
                  {initialData.rejectReason && (
                    <>
                      <br />
                      {APPEAL_UI_TEXT.REJECT_REASON}: {initialData.rejectReason}
                    </>
                  )}
                </>
              ) : (
                `${APPEAL_UI_TEXT.REQUEST_REASON}: ${displayReason}`
              )
            }
            isOwner={status === 'pending' && isOwner}
            onApprove={() => setStatus('approved')}
            onReject={() => setStatus('rejected')}
          />
        </div>

        <div className="flex w-full flex-col gap-4">
          {!inputReason &&
            initialData.comments?.content.map((msg) => (
              <ChatBubble
                key={msg.commentId}
                senderName={msg.authorName}
                message={msg.comment}
                time={formatChatTime(msg.createdAt)}
                isMe={
                  isOwner
                    ? msg.authorName !== initialData.requesterName
                    : msg.authorName === initialData.requesterName
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
