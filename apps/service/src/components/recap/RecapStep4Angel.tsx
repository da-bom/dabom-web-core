'use client';

import React from 'react';

import { CheckOutlinedIcon } from '@icons';

import { ChatBubble } from 'src/components/appeal/ChatBubble';
import { RECAP_UI_TEXT } from 'src/constants/recap';
import { formatChatTime } from 'src/utils/formatTime';

interface ApprovedAppeal {
  appealId: number;
  requesterName: string;
  resolvedAt: string;
}

interface RecapStep4AngelProps {
  approverName: string;
  approvedAppeals: ApprovedAppeal[];
}

export function RecapStep4Angel({ approverName, approvedAppeals }: RecapStep4AngelProps) {
  if (!approverName) {
    return (
      <div className="flex h-fit flex-col items-center gap-10 p-8">
        <h1 className="text-h1-m h-fit w-full leading-[29px] break-keep whitespace-pre-line">
          {RECAP_UI_TEXT.STEP4_EMPTY}
        </h1>
      </div>
    );
  }

  return (
    <div className="flex h-fit flex-col items-center gap-10 p-8">
      <h1 className="text-h1-m h-fit w-full leading-[29px] break-keep whitespace-pre-line">
        {approverName}
        {RECAP_UI_TEXT.STEP4_TITLE_SUFFIX}
      </h1>

      <div className="flex h-fit w-full flex-col items-start gap-[22px]">
        {approvedAppeals.map((appeal) => (
          <ChatBubble
            key={appeal.appealId}
            senderName={approverName}
            isMe={false}
            time={formatChatTime(appeal.resolvedAt)}
            message={
              <div className="flex items-center gap-1">
                <CheckOutlinedIcon sx={{ fontSize: 15 }} className="text-positive" />
                <span>{appeal.requesterName}님의 요청을 수락했습니다.</span>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
}
