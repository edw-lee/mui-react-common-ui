'use client';

import { Box, CircularProgress } from '@mui/material';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

export type SpinnerProviderProps = {
  minOnScreenDuration?: number; //Minimum on screen duration the spinner will show on screen
};

const SpinnerContext = createContext<{
  isShowSpinner: boolean;
  showSpinner: (isShow: boolean) => void;
}>({
  isShowSpinner: false,
  showSpinner: () => {},
});

export function SpinnerProvider({
  children,
  minOnScreenDuration = 1000,
}: PropsWithChildren & SpinnerProviderProps) {
  const [isShow, setIsShow] = useState(false);
  const shownTimestamp = useRef(0);
  const timeoutRef = useRef(0);

  const showSpinner = useCallback(
    (show: boolean) => {
      if (show) {
        shownTimestamp.current = Date.now();
        setIsShow(true);
      } else {
        clearTimeout(timeoutRef.current);

        const shownDuration = Date.now() - shownTimestamp.current;
        const timeoutDuration = Math.max(
          0,
          minOnScreenDuration - shownDuration,
        );

        timeoutRef.current = setTimeout(() => {
          setIsShow(false);
        }, timeoutDuration);
      }
    },
    [shownTimestamp.current],
  );

  return (
    <SpinnerContext.Provider
      value={{
        isShowSpinner: isShow,
        showSpinner,
      }}
    >
      <fieldset {...{ inert: isShow ? '' : undefined }}>
        <Spinner show={isShow} />
        {children}
      </fieldset>
    </SpinnerContext.Provider>
  );
}

export const useSpinner = () => useContext(SpinnerContext);

export default function Spinner({ show }: { show: boolean }) {
  if (!show) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999999,
        backgroundColor: '#000000aa',
      }}
    >
      <CircularProgress size={40} />
    </Box>
  );
}
