'use client';

import React, { Suspense, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

import { useSearchParams } from 'next/navigation';

import { ApprovedIcon, RejectedIcon } from '@icons';
import { formatSize } from '@shared';

import { useSuspenseGetAppealDetail } from 'src/api/appeal/useGetAppealDetail';
import { usePatchAppealRespond } from 'src/api/appeal/usePatchAppealRespond';
import { usePostComment } from 'src/api/appeal/usePostComment';
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
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data } = useSuspenseGetAppealDetail(appealId);
  const { mutateAsync: postComment } = usePostComment(appealId);
  const { mutateAsync: respondAppeal } = usePatchAppealRespond(appealId);

  const [inputValue, setInputValue] = useState('');

  const userRole = getCurrentUserRole();
  const isOwner = userRole === 'OWNER';

  const rawStatus = data.status.toLowerCase();
  const status = isValidStatus(rawStatus) ? rawStatus : 'pending';

  const sortedComments = useMemo(() => {
    return [...data.comments.content].reverse();
  }, [data.comments.content]);

  useLayoutEffect(() => {
    if (scrollRef.current) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [sortedComments]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    try {
      await postComment({ comment: inputValue });
      setInputValue('');
    } catch (error) {
      console.error('댓글 작성 실패:', error);
    }
  };

  const handleApprove = async () => {
    try {
      await respondAppeal({ action: 'APPROVED', rejectReason: null });
      toast.success('이의제기를 승인했습니다.');
    } catch (error) {
      console.error('승인 실패:', error);
      toast.error('승인에 실패했습니다.');
    }
  };

  const handleReject = async () => {
    const reason = window.prompt('거절 사유를 입력해주세요.');
    if (reason === null) return;

    try {
      await respondAppeal({ action: 'REJECTED', rejectReason: reason || '사유 없음' });
      toast.success('이의제기를 거절했습니다.');
    } catch (error) {
      console.error('거절 실패:', error);
      toast.error('거절에 실패했습니다.');
    }
  };

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
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </div>

        <div className="flex w-full flex-col gap-4" ref={scrollRef}>
          {sortedComments.map((msg) => (
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
          onSubmit={handleSendMessage}
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
