'use client';

import { useState } from 'react';

import { WarningIcon } from '@icons';
import { Button, InputField, ModalLayout } from '@shared';

interface ConfirmModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  buttonText: string;
  onClickButton: () => void;
}

const ConfirmModal = ({
  children,
  isOpen,
  onClose,
  buttonText,
  onClickButton,
}: ConfirmModalProps) => {
  const [confirmText, setConfirmText] = useState('');

  const handleClose = () => {
    setConfirmText('');
    onClose();
  };

  const isConfirmed = confirmText === '확인';

  return (
    <ModalLayout isAdmin isOpen={isOpen} onClose={handleClose}>
      {isOpen && (
        <div className="flex max-w-82 flex-col gap-14">
          <div className="flex flex-col items-center gap-5 text-center">
            <WarningIcon className="text-negative" />
            <div className="text-body2-d flex flex-col gap-1">{children}</div>
          </div>

          <InputField
            type="text"
            label='주의사항 확인 후 아래에 "확인"을 입력해주세요.'
            placeholder="확인"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            autoComplete="off"
          />

          <Button
            size="lg"
            color="light"
            className={`text-negative ${!isConfirmed ? 'opacity-50' : 'opacity-100'}`}
            onClick={() => {
              onClickButton();
              handleClose();
            }}
            disabled={!isConfirmed}
          >
            {buttonText}
          </Button>
        </div>
      )}
    </ModalLayout>
  );
};

export default ConfirmModal;
