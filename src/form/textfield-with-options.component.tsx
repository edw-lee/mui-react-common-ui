import { Close } from '@mui/icons-material';
import {
  IconButton,
  MenuItem,
  TextField as MUITextField,
  TextFieldProps as MUITextFieldProps,
  Select,
  Stack,
} from '@mui/material';
import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';
import { ClearableTextFieldType } from './clearable-textfield.component';

export type TextFieldWithOptionsOptionType = {
  label?: string;
  value: string;
};

export type TextFieldWithOptionsType = ClearableTextFieldType;

export type TextFieldWithOptionsProps = {
  options?: TextFieldWithOptionsOptionType[];
  onClear?: () => void;
  onSelectOption?: (option: string, input: string) => void;
};

const TextFieldWithOptions = forwardRef<
  TextFieldWithOptionsType,
  TextFieldWithOptionsProps & MUITextFieldProps
>(
  (
    {
      onClear,
      onSelectOption,
      sx,
      options,
      ...props
    }: TextFieldWithOptionsProps & MUITextFieldProps,
    ref: ForwardedRef<TextFieldWithOptionsType>,
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
      <Stack sx={sx} flexDirection={'row'}>
        {!!options?.length && (
          <Select
            size="small"
            defaultValue={options[0].value}
            onChange={(e) =>
              onSelectOption && onSelectOption(e.target.value as any, value)
            }
          >
            {options?.map(({ label, value }, index) => (
              <MenuItem key={index} value={value}>
                {label ?? value}
              </MenuItem>
            ))}
          </Select>
        )}
        <MUITextField
          {...props}
          sx={{ flex: 1 }}
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
      </Stack>
    );
  },
);

TextFieldWithOptions.displayName = 'TextFieldWithOptions';

export default TextFieldWithOptions;
