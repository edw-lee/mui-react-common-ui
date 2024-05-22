import { Button, Stack, Typography } from '@mui/material';
import { Spinner } from '@edwinlee/common-ui';

export default function SpinnerTest() {
  const { showSpinner } = Spinner.useSpinner();

  const onClick = () => {
    showSpinner(true);

    setTimeout(() => {
      showSpinner(false);
    }, 3000);
  };

  return (
    <Stack gap={1}>
      <Typography fontWeight={900}>Spinner</Typography>
      <Button variant="contained" onClick={onClick}>
        Show spinner
      </Button>
    </Stack>
  );
}
