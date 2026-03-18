'use client';

import { Button, ModalLayout } from '@shared';

interface PushConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const PushConfirmModal = ({ isOpen, onClose, onConfirm }: PushConfirmModalProps) => {
  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      className="bg-brand-white flex min-h-0 w-75 flex-col items-center gap-4 px-4 pt-4 pb-8"
    >
      <div className="mt-8 flex w-67 items-center justify-center text-center">
        <p className="text-body1-m">
          데이터 사용량 경고를 포함한
          <br />
          모든 알림이 해제됩니다.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          color="light"
          onClick={onClose}
          className="h-9 min-w-16 rounded-lg border-gray-200"
        >
          <span className="text-body2-m">취소</span>
        </Button>

        <Button
          size="sm"
          color="dark"
          onClick={onConfirm}
          className="h-9 min-w-16 rounded-lg border-gray-200"
        >
          <span className="text-body2-m">확인</span>
        </Button>
      </div>
    </ModalLayout>
  );
};

export default PushConfirmModal;
