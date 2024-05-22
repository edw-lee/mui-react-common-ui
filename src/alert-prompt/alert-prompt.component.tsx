import {
  CheckCircleOutline,
  ErrorOutline,
  HelpOutline,
  InfoOutlined,
  WarningOutlined,
} from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  SvgIconProps,
  Typography,
  Zoom,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import {
  createContext,
  forwardRef,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

export type AlertIconType =
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'question';

export type AlertPromptProps = {
  title?: string;
  message: string;
  showOk?: boolean;
  okText?: string;
  onOk?: () => void;
  showCancel?: boolean;
  cancelText?: string;
  onCancel?: () => void;
  onClose?: () => void;
  disableCloseFromOutside?: boolean;
  icon?: AlertIconType;
};

const AlertPromptContext = createContext<{
  promptAlert: (props: AlertPromptProps) => Promise<boolean>;
}>({
  promptAlert: () => Promise.resolve(false),
});

export function AlertPromptProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const [props, setProps] = useState<AlertPromptProps>({ message: '' });

  const promptAlert = (props: AlertPromptProps): Promise<boolean> => {
    let resolvePromise: (value: boolean) => void;

    const promise: Promise<boolean> = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    const onOk = props.onOk?.bind({});
    props.onOk = () => {
      if (onOk) {
        onOk();
      }

      resolvePromise(true);
    };

    const onClose = props.onClose?.bind({});
    props.onClose = () => {
      if (onClose) {
        onClose();
      }

      resolvePromise(false);
    };

    const onCancel = props.onCancel?.bind({});
    props.onCancel = () => {
      if (onCancel) {
        onCancel();
      }

      resolvePromise(false);
    };

    setOpen(true);
    setProps(props);

    return promise;
  };

  const onClose = () => {
    setOpen(false);

    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <AlertPromptContext.Provider value={{ promptAlert }}>
      {children}
      <AlertPrompt
        {...props}
        open={open}
        showOk={props.showOk ?? true}
        okText={props.okText ?? 'Okay'}
        cancelText={props.cancelText ?? 'Cancel'}
        onClose={onClose}
      />
    </AlertPromptContext.Provider>
  );
}

export const useAlertPrompt = () => useContext(AlertPromptContext);

const ZoomTransition = forwardRef(function ZoomTransition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return (
    <Zoom
      ref={ref}
      {...props}
      timeout={{
        enter: 350,
        exit: 250,
      }}
      unmountOnExit
    />
  );
});

const AlertIcon = ({
  icon,
  ...props
}: { icon: AlertIconType } & SvgIconProps) => {
  switch (icon) {
    case 'info':
      return <InfoOutlined {...props} color="info" />;
    case 'warning':
      return <WarningOutlined {...props} color="warning" />;
    case 'success':
      return <CheckCircleOutline {...props} color="success" />;
    case 'error':
      return <ErrorOutline {...props} color="error" />;
    case 'question':
      return <HelpOutline {...props} color="warning" />;
  }
};

export default function AlertPrompt({
  open,
  ...props
}: AlertPromptProps & { open: boolean }) {
  const _onCancel = () => {
    if (props.onCancel) {
      props.onCancel();
    }

    _onClose();
  };

  const _onOk = () => {
    if (props.onOk) {
      props.onOk();
    }

    _onClose();
  };

  const _onClose = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <Dialog
      TransitionComponent={ZoomTransition}
      open={open}
      closeAfterTransition
      onClose={() => !props.disableCloseFromOutside && _onClose()}
    >
      {(props.title || props.icon) && (
        <DialogTitle>
          <Stack gap={1} alignItems={props.icon ? 'center' : undefined}>
            {props.icon && (
              <AlertIcon
                icon={props.icon}
                sx={{
                  fontSize: 80,
                }}
              />
            )}

            {props.title}
          </Stack>
        </DialogTitle>
      )}
      <DialogContent
        sx={{
          minWidth: 300,
          maxWidth: 500,
        }}
      >
        <Typography textAlign={props.icon ? 'center' : undefined}>
          {props.message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: props.icon ? 'center' : undefined }}>
        {props.showCancel && (
          <Button
            onClick={_onCancel}
            color={'inherit'}
            variant={props.icon ? 'contained' : undefined}
          >
            {props.cancelText}
          </Button>
        )}
        {props.showOk && (
          <Button
            onClick={_onOk}
            autoFocus
            color={props.icon ? 'info' : undefined}
            variant={props.icon ? 'contained' : undefined}
          >
            {props.okText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
