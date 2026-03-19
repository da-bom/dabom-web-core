'use client';

import React from 'react';

import { ChatBubble } from 'src/components/appeal/ChatBubble';
import { RECAP_UI_TEXT } from 'src/constants/recap';
import { formatChatTime } from 'src/utils/formatTime';

interface Appeal {
  appealId: number;
  approverName: string;
  requestReason: string;
  requestedAt: string;
}

interface RecapStep3AppealProps {
  requesterName: string;
  appeals: Appeal[];
  successRate: number;
}

export function RecapStep3Appeal({ requesterName, appeals, successRate }: RecapStep3AppealProps) {
  if (!requesterName) {
    return (
      <div className="flex h-fit flex-col items-center gap-10 p-8">
        <h1 className="text-h1-m h-fit w-full leading-[29px] break-keep whitespace-pre-line">
          {RECAP_UI_TEXT.STEP3_EMPTY}
        </h1>
      </div>
    );
  }

  return (
    <div className="flex h-fit flex-col items-center gap-10 p-8">
      <h1 className="text-h1-m h-fit w-full leading-[29px] break-keep whitespace-pre-line">
        {requesterName}
        {RECAP_UI_TEXT.STEP3_TITLE_PREFIX}
        {successRate}%{RECAP_UI_TEXT.STEP3_TITLE_SUFFIX}
      </h1>

      <div className="flex h-fit w-full flex-col items-end gap-7">
        {appeals.map((appeal) => (
          <ChatBubble
            key={appeal.appealId}
            message={`${appeal.approverName}님에게 ${appeal.requestReason}`}
            time={formatChatTime(appeal.requestedAt)}
            isMe={true}
          />
        ))}
      </div>
    </div>
  );
}
