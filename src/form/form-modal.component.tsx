'use client';

import { FormEventHandler, PropsWithChildren } from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { SlideTransition } from '../slide-modal/slide-modal.component';
import { useAlertPrompt } from '../alert-prompt/alert-prompt.component';

type FormModalProps = {
  title: string;
  loading?: boolean;
  open: boolean;
  isDirty: boolean;
  onClose?: () => void;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  onModalExited?: () => void;
} & PropsWithChildren;

export default function FormModal({
  title,
  loading,
  isDirty,
  open,
  onSubmit,
  onModalExited,
  onClose,
  children,
}: FormModalProps) {
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
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={SlideTransition}
      closeAfterTransition
      sx={{
        '.MuiDialog-container': {
          overflowY: !open ? 'hidden' : undefined,
        },
      }}
      onTransitionExited={onModalExited}
      onClose={handleClose}
    >
      <DialogTitle sx={{ pb: 0 }}>{title}</DialogTitle>

      <IconButton
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
        onClick={handleClose}
      >
        <Close />
      </IconButton>

      <DialogContent sx={{ pt: 3 }}>
        <Box component="form" noValidate onSubmit={onSubmit}>
          <Box component="fieldset" disabled={loading}>
            {children}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
