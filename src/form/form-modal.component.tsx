import { FormEventHandler, PropsWithChildren } from 'react';
import FormCard from './form-card.component';
import SlideModal from '../slide-modal.component';
import { useAlertPrompt } from '../alert-prompt.component';

export default function FormModal({
  title,
  loading,
  open,
  isDirty,
  onClose,
  onSubmit,
  onModalExited,
  children,
}: {
  title: string;
  loading?: boolean;
  open: boolean;
  isDirty: boolean;
  onClose?: () => void;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  onModalExited?: () => void;
} & PropsWithChildren) {
  const { promptAlert } = useAlertPrompt();

  const handleClose = () => {
    if (isDirty) {
      promptAlert({
        title: 'Are you sure?',
        message:
          'Are you sure you want to close this? The input values will be lost.',
        okText: 'Yes',
        showCancel: true,
        cancelText: 'No',
        onOk: onClose,
      });
    } else {
      if (onClose) onClose();
    }
  };

  return (
    <SlideModal
      open={open}
      transitionProps={{
        onExited: onModalExited,
      }}
    >
      <FormCard
        title={title}
        loading={loading}
        onClose={handleClose}
        onSubmit={onSubmit}
      >
        {children}
      </FormCard>
    </SlideModal>
  );
}
