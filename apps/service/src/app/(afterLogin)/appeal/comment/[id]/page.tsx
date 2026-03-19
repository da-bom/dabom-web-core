'use client';

import { Suspense, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { ApprovedIcon, RejectedIcon } from '@icons';
import { Skeleton } from '@mui/material';
import { Button, formatSize } from '@shared';

import { Comment } from 'src/api/appeal/schema';
import { useGetAppealDetail } from 'src/api/appeal/useGetAppealDetail';
import { usePatchAppealRespond } from 'src/api/appeal/usePatchAppealRespond';
import { usePostComment } from 'src/api/appeal/usePostComment';
import { useCustomerMe } from 'src/api/auth/useCustomerMe';
import { AppealInputBar, ChatBubble, PolicySummaryCard } from 'src/components/appeal';
import { APPEAL_TYPE_LABEL, APPEAL_UI_TEXT } from 'src/constants/appeal';
import { formatChatTime } from 'src/utils/formatTime';
import { showToast } from 'src/utils/toast';

type AppealStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';
const VALID_STATUSES: AppealStatus[] = ['pending', 'approved', 'rejected', 'cancelled'];

const isValidStatus = (status: string | null): status is AppealStatus => {
  return VALID_STATUSES.includes(status?.toLowerCase() as AppealStatus);
};

const AppealDetailSkeleton = () => (
  <div className="flex w-full flex-col items-center gap-6 p-5">
    <Skeleton
      variant="rectangular"
      width="100%"
      height={160}
      sx={{ borderRadius: '12px' }}
      animation="wave"
    />
    <div className="mt-4 flex w-full flex-col gap-4">
      <div className="flex flex-col items-end gap-1">
        <Skeleton variant="text" width="30%" height={20} />
        <Skeleton
          variant="rectangular"
          width="60%"
          height={60}
          sx={{ borderRadius: '12px 12px 0 12px' }}
        />
      </div>
      <div className="flex flex-col items-start gap-1">
        <Skeleton variant="text" width="30%" height={20} />
        <Skeleton
          variant="rectangular"
          width="50%"
          height={45}
          sx={{ borderRadius: '12px 12px 12px 0' }}
        />
      </div>
    </div>
  </div>
);

function AppealCommentContent() {
  const router = useRouter();
  const params = useParams();
  const appealId = Number(params.id);
  const searchParams = useSearchParams();
  const scrollRef = useRef<HTMLDivElement>(null);

  const selectedPolicy = searchParams.get('policy') || APPEAL_TYPE_LABEL.NORMAL;
  const inputAmount = searchParams.get('amount');
  const inputReason = searchParams.get('reason');

  const cursor = searchParams.get('cursor') || undefined;
  const size = Number(searchParams.get('size')) || undefined;

  const { data, isLoading, isError, refetch } = useGetAppealDetail(appealId, cursor, size);
  const { mutateAsync: respondAppeal } = usePatchAppealRespond(appealId);
  const { mutateAsync: postComment } = usePostComment(appealId);

  const [inputValue, setInputValue] = useState('');

  const { data: user } = useCustomerMe();
  const isOwner = user?.role === 'OWNER';

  const sortedComments = useMemo(() => {
    if (!data?.comments?.content) return [];
    return [...data.comments.content].reverse();
  }, [data]);

  useLayoutEffect(() => {
    if (scrollRef.current && sortedComments.length > 0) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [sortedComments]);

  if (isLoading) return <AppealDetailSkeleton />;

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

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    try {
      await postComment({ comment: inputValue });
      setInputValue('');
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      showToast.error('메시지 전송에 실패했습니다.');
    }
  };

  const handleApprove = async () => {
    try {
      await respondAppeal({ action: 'APPROVED', rejectReason: null });
      showToast.success('요청을 승인했습니다.');
    } catch (error) {
      console.error('승인 실패:', error);
      showToast.error('승인 처리 중 오류가 발생했습니다.');
    }
  };

  const handleReject = () => {
    router.push(`/appeal/create/reason?id=${appealId}&action=REJECTED`);
  };

  return (
    <div className="flex w-full flex-col">
      <main className="flex w-full flex-col items-center gap-4 p-5">
        <div className="sticky top-0 z-10 flex w-full flex-col items-center gap-4">
          {status === 'rejected' && <RejectedIcon />}
          {status === 'approved' && <ApprovedIcon />}

          <PolicySummaryCard
            policyName={selectedPolicy}
            requestedValue={
              selectedPolicy === APPEAL_TYPE_LABEL.EMERGENCY || data.type === 'EMERGENCY'
                ? APPEAL_UI_TEXT.EMERGENCY_DATA_AMOUNT
                : inputAmount
                  ? `${inputAmount}GB`
                  : data.policyType === 'MANUAL_BLOCK'
                    ? APPEAL_UI_TEXT.MANUAL_BLOCK
                    : data.policyType === 'APP_BLOCK'
                      ? APPEAL_UI_TEXT.APP_BLOCK
                      : data.desiredRules?.limitBytes !== undefined &&
                          data.desiredRules?.limitBytes !== null
                        ? formatSize(data.desiredRules.limitBytes).total
                        : data.policyType === 'MONTHLY_LIMIT' &&
                            data.desiredRules?.limitBytes === null
                          ? APPEAL_UI_TEXT.UNBLOCK_LIMIT
                          : data.desiredRules?.start !== undefined &&
                              data.desiredRules?.start !== null
                            ? `${data.desiredRules.start} ~ ${data.desiredRules.end}`
                            : data.policyType === 'TIME_BLOCK' &&
                                (data.desiredRules?.start === null ||
                                  data.desiredRules?.start === undefined)
                              ? APPEAL_UI_TEXT.UNBLOCK_LIMIT
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
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </div>

        <div className="flex w-full flex-col gap-4" ref={scrollRef}>
          {sortedComments.map((msg: Comment) => (
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
    <Suspense fallback={<AppealDetailSkeleton />}>
      <AppealCommentContent />
    </Suspense>
  );
}
