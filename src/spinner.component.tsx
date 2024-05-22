'use client';

import { Box, CircularProgress } from '@mui/material';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

const SpinnerContext = createContext<{
  isShowSpinner: boolean;
  showSpinner: (isShow: boolean) => void;
}>({
  isShowSpinner: false,
  showSpinner: () => {},
});

export function SpinnerProvider({ children }: PropsWithChildren) {
  const [isShow, setIsShow] = useState(false);

  return (
    <SpinnerContext.Provider
      value={{
        isShowSpinner: isShow,
        showSpinner: (isShow) => setIsShow(isShow),
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
