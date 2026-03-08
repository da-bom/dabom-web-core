'use client';

import React, { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { Block as BlockIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { Badge } from '@shared';

import { AppealInputBar, ChatBubble, PolicySummaryCard } from '@service/components/appeal';
import { getCurrentUserRole } from '@service/utils/auth';

export default function AppealChatPage() {
  const searchParams = useSearchParams();
  const selectedPolicy = searchParams.get('policy') || '데이터 한도 제한';
  const [inputValue, setInputValue] = useState('');

  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const rejectionReason = '너무 많다. 5만 해라.';

  const userRole = getCurrentUserRole();
  const isOwner = userRole === 'OWNER';

  const messages = [
    {
      senderName: '김철수',
      message: '10은 너무 많지 않니 5만 해라.',
      time: '2026. 02. 21 14:32',
      isMe: false,
    },
    {
      senderName: '나',
      message: '네 알겠어요. 대신 다음에 필요해지면 또 보내주세요.',
      time: '2026. 02. 21 14:32',
      isMe: true,
    },
    {
      senderName: '김철수',
      message: '그래',
      time: '2026. 02. 21 14:32',
      isMe: false,
    },
  ];

  return (
    <div className="flex w-full flex-col">
      <main className="flex w-full flex-col items-center gap-4 px-5 pt-5 pb-24">
        <div className="sticky top-0 z-10 flex w-full flex-col items-center gap-4 pb-2">
          {status !== 'pending' && (
            <Badge
              color={status === 'rejected' ? 'rejected' : 'approved'}
              size="md_fixed"
              className="gap-1"
            >
              {status === 'rejected' ? (
                <BlockIcon sx={{ fontSize: 16 }} />
              ) : (
                <CheckCircleIcon sx={{ fontSize: 16 }} />
              )}
              {status === 'rejected' ? '거절됨' : '수락됨'}
            </Badge>
          )}

          <PolicySummaryCard
            policyText={`정책: ${selectedPolicy}`}
            reasonText={
              status === 'rejected' ? (
                <>
                  요청 사유: 인강 들어야 해요.
                  <br />
                  거절 사유: {rejectionReason}
                </>
              ) : (
                '요청 사유: 인강 들어야 해요.'
              )
            }
            isOwner={status === 'pending' && isOwner}
            onApprove={() => setStatus('approved')}
            onReject={() => setStatus('rejected')}
          />
        </div>

        {/* 채팅 메시지 목록 */}
        <div className="flex w-full flex-col gap-4">
          {messages.map((msg, index) => (
            <ChatBubble
              key={index}
              senderName={msg.senderName}
              message={msg.message}
              time={msg.time}
              isMe={msg.isMe}
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
