'use client';

import { Close } from '@mui/icons-material';
import {
  IconButton,
  TextField as MUITextField,
  TextFieldProps as MUITextFieldProps,
} from '@mui/material';
import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';

export type ClearableTextFieldType = {
  clear: () => void;
};

export type TextFieldProps = {
  onClear?: () => void;
};

const ClearableTextField = forwardRef<
  ClearableTextFieldType,
  TextFieldProps & MUITextFieldProps
>(
  (
    { onClear, ...props }: TextFieldProps & MUITextFieldProps,
    ref: ForwardedRef<ClearableTextFieldType>,
  ) => {
    const [value, setValue] = useState('');

    const _onClearHandler = () => {
      setValue('');

      if (onClear) {
        onClear();
      }
    };

    useImperativeHandle(ref, () => ({
      clear: _onClearHandler,
    }));

    return (
      <MUITextField
        {...props}
        value={value}
        inputProps={{
          ...props.inputProps,
          onInput: (e) => {
            setValue(e.currentTarget.value);

            if (props.inputProps?.onInput) {
              props.inputProps.onInput(e);
            }
          },
        }}
        InputProps={{
          ...props.InputProps,
          sx: {
            padding: 0,
            ...props.InputProps?.sx,
          },
          endAdornment: props.InputProps?.endAdornment ?? (
            <IconButton onClick={_onClearHandler}>
              <Close fontSize="small" />
            </IconButton>
          ),
        }}
      />
    );
  },
);

ClearableTextField.displayName = 'ClearableTextField';

export default ClearableTextField;
