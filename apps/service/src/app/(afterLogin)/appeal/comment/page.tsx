'use client';

import React, { Suspense, useMemo, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { ApprovedIcon, RejectedIcon } from '@icons';
import { Button, formatSize } from '@shared';

import { useGetAppealDetail } from 'src/api/appeal/useGetAppealDetail';
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

  const selectedPolicy = searchParams.get('policy') || APPEAL_TYPE_LABEL.NORMAL;
  const inputAmount = searchParams.get('amount');
  const inputReason = searchParams.get('reason');

  const cursor = searchParams.get('cursor') || undefined;
  const size = Number(searchParams.get('size'));

  const { data, isLoading, isError, refetch } = useGetAppealDetail(appealId, cursor, size);

  const [inputValue, setInputValue] = useState('');

  const userRole = getCurrentUserRole();
  const isOwner = userRole === 'OWNER';

  if (isLoading) {
    return (
      <div className="flex h-full min-h-screen items-center justify-center">
        <p className="text-body1-m">이의제기 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex h-full min-h-screen flex-col items-center justify-center p-8 text-center">
        <p className="text-h2-m mb-4">상세 정보를 불러오는 중 오류가 발생했습니다.</p>
        <Button size="md" color="light" onClick={() => refetch()}>
          다시 시도하기
        </Button>
      </div>
    );
  }

  const status = isValidStatus(data.status.toLowerCase())
    ? (data.status.toLowerCase() as AppealStatus)
    : 'pending';
  const displayReason = inputReason || data.requestReason;

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
                : data.desiredRules?.limitBytes
                  ? formatSize(data.desiredRules.limitBytes).total
                  : '-'
            }
            reasonText={
              status === 'rejected' ? (
                <>
                  {APPEAL_UI_TEXT.REQUEST_REASON}: {displayReason}
                  {data.rejectReason && (
                    <>
                      <br />
                      {APPEAL_UI_TEXT.REJECT_REASON}: {data.rejectReason}
                    </>
                  )}
                </>
              ) : (
                `${APPEAL_UI_TEXT.REQUEST_REASON}: ${displayReason}`
              )
            }
            isOwner={status === 'pending' && isOwner}
            onApprove={() => {}}
            onReject={() => {}}
          />
        </div>

        <div className="flex w-full flex-col gap-4">
          {data.comments?.content.map((msg) => (
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
