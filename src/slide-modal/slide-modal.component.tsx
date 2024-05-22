'use client';

import { Close } from '@mui/icons-material';
import {
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  ModalProps,
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

type SlideModalProps = Omit<ModalProps, 'open'> & {
  open?: boolean;
  title?: string;
  disableCloseOnBackdrop?: boolean;
  transitionProps?: TransitionProps;
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
    ...props
  }: SlideModalProps & Omit<DialogProps, 'open'>,
  ref: React.Ref<SlideModalType | undefined>,
) {
  const [open, setOpen] = useState(props.open || false);
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
        '.MuiDialog-container': {
          overflowY: !props.open ? 'hidden' : undefined,
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

      <DialogContent sx={{ pt: 3 }}>{children}</DialogContent>
    </Dialog>
  );
});

SlideModal.displayName = 'SlideModal';
export default SlideModal;
