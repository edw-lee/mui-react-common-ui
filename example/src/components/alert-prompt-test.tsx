import { Button, Stack, Typography } from '@mui/material';
import { AlertPrompt, AlertPromptTypes } from '@edwinlee/common-ui';

export default function AlertPromptTest() {
  const { promptAlert } = AlertPrompt.useAlertPrompt();

  const onClick = (icon: AlertPromptTypes.AlertIconType) => {
    promptAlert({
      title: 'Test',
      message: 'Test alert',
      icon,
    });
  };

  return (
    <Stack gap={1}>
      <Typography fontWeight={900}>Alert Prompts</Typography>
      <Button
        variant="contained"
        color="error"
        onClick={() => onClick('error')}
      >
        Show Error Alert
      </Button>
      <Button variant="contained" color="info" onClick={() => onClick('info')}>
        Show Info Alert
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => onClick('question')}
      >
        Show Question Alert
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={() => onClick('success')}
      >
        Show Success Alert
      </Button>
      <Button
        variant="contained"
        color="warning"
        onClick={() => onClick('warning')}
      >
        Show Warning Alert
      </Button>
    </Stack>
  );
}
