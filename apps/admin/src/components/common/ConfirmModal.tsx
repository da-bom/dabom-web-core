import { WarningIcon } from '@icons';
import { Button, InputField, ModalLayout } from '@shared';

const ConfirmModal = ({
  children,
  isOpen,
  onClose,
  buttonText,
  onClickButton,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  buttonText: string;
  onClickButton: () => void;
}) => {
  return (
    <ModalLayout isAdmin isOpen={isOpen} onClose={onClose}>
      <div className="flex max-w-82 flex-col gap-14">
        <div className="flex flex-col items-center gap-5">
          <WarningIcon className="text-negative" />
          {children}
        </div>

        <InputField
          type="text"
          label='주의사항 확인 후 아래에 "확인"을 입력해주세요.'
          placeholder="확인"
        />

        <Button size="lg" color="light" className="text-negative" onClick={onClickButton}>
          {buttonText}
        </Button>
      </div>
    </ModalLayout>
  );
};

export default ConfirmModal;
