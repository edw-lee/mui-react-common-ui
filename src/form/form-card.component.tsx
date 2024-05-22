'use client';
import { Close } from '@mui/icons-material';
import { Box, Card, CardHeader, IconButton } from '@mui/material';
import { FormEventHandler, PropsWithChildren } from 'react';

export default function FormCard({
  title,
  loading,
  onSubmit,
  onClose,
  children,
}: {
  title: string;
  loading?: boolean;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  onClose?: () => void;
} & PropsWithChildren) {
  return (
    <Card
      component="form"
      noValidate
      onSubmit={onSubmit}
      sx={{
        width: 650,
      }}
    >
      <CardHeader
        title={title}
        action={
          <IconButton onClick={onClose} sx={{ zIndex: 2 }}>
            <Close />
          </IconButton>
        }
      />

      <Box component="fieldset" disabled={loading}>
        {children}
      </Box>
    </Card>
  );
}
