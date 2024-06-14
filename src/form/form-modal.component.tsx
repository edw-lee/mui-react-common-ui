'use client';

import { FormEventHandler, PropsWithChildren } from 'react';
import {
  Box,
  BoxProps,
  Dialog,
  DialogContent,
  DialogContentProps,
  DialogProps,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { SlideTransition } from '../slide-modal/slide-modal.component';
import { useAlertPrompt } from '../alert-prompt/alert-prompt.component';

type FormModalProps = {
  title: string;
  loading?: boolean;
  isDirty: boolean;
  onClose?: () => void;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  onModalExited?: () => void;
  dialogContentProps?: DialogContentProps;
  formContainerProps?: BoxProps;
  fieldsetContainerProps?: BoxProps;
} & PropsWithChildren;

export default function FormModal({
  title,
  loading,
  isDirty,
  open,
  dialogContentProps,
  formContainerProps,
  fieldsetContainerProps,
  onSubmit,
  onModalExited,
  onClose,
  children,
  ...dialogProps
}: FormModalProps & DialogProps) {
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
      {...dialogProps}
      open={open}
      TransitionComponent={SlideTransition}
      closeAfterTransition
      sx={{
        ...dialogProps?.sx,
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

      <DialogContent {...dialogContentProps}>
        <Box
          component="form"
          noValidate
          onSubmit={onSubmit}
          {...formContainerProps}
        >
          <Box
            component="fieldset"
            disabled={loading}
            {...fieldsetContainerProps}
          >
            {children}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
