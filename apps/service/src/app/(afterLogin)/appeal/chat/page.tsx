'use client';

import React, { Suspense, useMemo, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { Block as BlockIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { Badge, formatSize } from '@shared';

import { AppealInputBar, ChatBubble, PolicySummaryCard } from 'src/components/appeal';
import { APPEAL_STATUS_LABEL, APPEAL_TYPE_LABEL, APPEAL_UI_TEXT } from 'src/constants/appeal';
import { mockAppealDetails } from 'src/data/appealDetails';
import { getCurrentUserRole } from 'src/utils/auth';
import { formatChatTime } from 'src/utils/formatTime';

function AppealChatContent() {
  const searchParams = useSearchParams();
  const appealId = Number(searchParams.get('id'));

  const selectedPolicy = searchParams.get('policy') || APPEAL_TYPE_LABEL.NORMAL;
  const inputAmount = searchParams.get('amount');
  const inputReason = searchParams.get('reason');

  const [inputValue, setInputValue] = useState('');

  const initialData = useMemo(() => {
    return mockAppealDetails.find((n) => n.appealId === appealId) || mockAppealDetails[0];
  }, [appealId]);

  const urlStatus = searchParams.get('status')?.toLowerCase() as
    | 'pending'
    | 'approved'
    | 'rejected'
    | 'cancelled';

  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected' | 'cancelled'>(
    urlStatus ||
      (initialData.status.toLowerCase() as 'pending' | 'approved' | 'rejected' | 'cancelled'),
  );

  const displayReason = inputReason || initialData.requestReason;

  const userRole = getCurrentUserRole();
  const isOwner = userRole === 'OWNER';

  return (
    <div className="flex w-full flex-col">
      <main className="flex w-full flex-col items-center gap-4 px-5 pt-5 pb-24">
        <div className="sticky top-0 z-10 flex w-full flex-col items-center gap-4">
          {status !== 'pending' && status !== 'cancelled' && (
            <Badge
              color={status === 'rejected' ? 'rejected' : 'approved'}
              size="md_fixed"
              className="gap-1"
            >
              {status === 'rejected' ? (
                <>
                  <BlockIcon sx={{ fontSize: 16 }} />
                  {APPEAL_STATUS_LABEL.REJECTED}
                </>
              ) : (
                <>
                  <CheckCircleIcon sx={{ fontSize: 16 }} />
                  {APPEAL_STATUS_LABEL.APPROVED}
                </>
              )}
            </Badge>
          )}

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

export default function AppealChatPage() {
  return (
    <Suspense fallback={<div className="h-full min-h-screen" />}>
      <AppealChatContent />
    </Suspense>
  );
}
