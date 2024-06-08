'use client';

import { Close } from '@mui/icons-material';
import {
  Dialog,
  DialogContent,
  DialogContentProps,
  DialogProps,
  DialogTitle,
  IconButton,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

export const SlideTransition = forwardRef(function SlideTransition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide ref={ref} {...props} direction="up" timeout={500} />;
});

type SlideModalProps = {
  title?: string;
  disableCloseOnBackdrop?: boolean;
  transitionProps?: TransitionProps;
  dialogContentProps?: DialogContentProps;
};

export type SlideModalType = {
  open: () => void;
  close: () => void;
};

const SlideModal = forwardRef(function (
  {
    children,
    transitionProps,
    title,
    disableCloseOnBackdrop,
    dialogContentProps,
    ...props
  }: SlideModalProps & Omit<DialogProps, 'open'>,
  ref: React.Ref<SlideModalType | undefined>,
) {
  const [open, setOpen] = useState(false);
  const [isClosed, setIsClosed] = useState(!open);

  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true);
      setIsClosed(false);
    },
    close: () => onClose(),
  }));

  const onClose = () => {
    setOpen(false);
  };

  if (isClosed) {
    return null;
  }

  return (
    <Dialog
      {...props}
      open={open}
      TransitionComponent={SlideTransition}
      TransitionProps={transitionProps}
      onTransitionExited={() => {
        setIsClosed(true);
      }}
      closeAfterTransition
      sx={{
        ...props.sx,
        '.MuiDialog-container': {
          overflowY: !open ? 'hidden' : undefined,
        },
      }}
      onClose={() => {
        !disableCloseOnBackdrop && onClose;
      }}
    >
      <DialogTitle sx={{ pb: 0 }}>{title}</DialogTitle>

      <IconButton
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
        onClick={onClose}
      >
        <Close />
      </IconButton>

      <DialogContent {...dialogContentProps}>{children}</DialogContent>
    </Dialog>
  );
});

SlideModal.displayName = 'SlideModal';
export default SlideModal;
