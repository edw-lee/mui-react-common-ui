import { TextField, TextFieldProps } from '@mui/material';
import { Controller } from 'react-hook-form';
import { ChangeEvent } from 'react';
import { FormInputProps } from './form-input-props';

export function FormTextField({
  name,
  control,
  label,
  rules,
  ...textFieldProps
}: FormInputProps & TextFieldProps) {
  const _onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    onChange: (...event: any[]) => void,
  ) => {
    onChange(e);

    if (textFieldProps.onChange) {
      textFieldProps.onChange(e);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { invalid, error },
      }) => (
        <TextField
          {...textFieldProps}
          inputProps={{
            maxLength:
              (rules?.maxLength as any)?.value || rules?.maxLength || undefined,
            minLength: (rules?.minLength as any)?.value || rules?.minLength,
            min: (rules?.min as any)?.value || rules?.min,
            max: (rules?.max as any)?.value || rules?.max,
          }}
          required={!!rules?.required}
          value={value}
          onBlur={onBlur}
          onChange={(e) => _onChange(e, onChange)}
          error={!!error}
          label={label}
          helperText={invalid && error?.message}
          variant="outlined"
        />
      )}
    />
  );
}
