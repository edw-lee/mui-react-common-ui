import { Button, Stack, Typography } from '@mui/material';
import { SlideModal } from '@edwinlee/common-ui';
import { useRef } from 'react';
import { SlideModalType } from '../../../dist/slide-modal';
import { Mood } from '@mui/icons-material';

export default function SlideModalTest() {
  const slideModalRef = useRef<SlideModalType>(null);

  return (
    <Stack gap={1}>
      <Typography fontWeight={900}>Slide Modal</Typography>
      <Button variant="outlined" onClick={() => slideModalRef.current?.open()}>
        Open Slide Modal
      </Button>
      <SlideModal ref={slideModalRef}>
        <Stack
          width={200}
          height={100}
          alignItems={'center'}
          justifyContent={'center'}
          gap={2}
        >
          <Mood fontSize="large" color="warning" />
          <Typography fontWeight={700}>This is a slide modal</Typography>
        </Stack>
      </SlideModal>
    </Stack>
  );
}
