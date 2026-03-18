import Button from './Button';
import ModalLayout from './ModalLayout';

interface ConfirmModalProps {
  showConfirm: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmModal = ({ showConfirm, onClose, onConfirm }: ConfirmModalProps) => {
  return (
    <ModalLayout isOpen={showConfirm} onClose={onClose} className="w-[320px]">
      <div className="flex min-h-[140px] flex-col justify-between pt-6">
        <span className="text-body2-d text-center leading-relaxed">
          작성한 내용이 저장되지 않습니다.
          <br />
          정말 나가시겠습니까?
        </span>

        <div className="mt-8 flex gap-2">
          <Button color="light" size="md" className="flex-1" onClick={onClose}>
            취소
          </Button>
          <Button color="dark" size="md" className="flex-1" onClick={onConfirm}>
            닫기
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default ConfirmModal;
