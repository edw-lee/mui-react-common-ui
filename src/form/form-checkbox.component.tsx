import { Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';
import { Controller } from 'react-hook-form';
import { FormInputProps } from './form-input-props';

export function FormCheckbox({
  name,
  control,
  label,
  rules,
  ...checkboxProps
}: FormInputProps & CheckboxProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <FormControlLabel
          label={label}
          control={
            <Checkbox
              {...checkboxProps}
              value={name}
              checked={value}
              onBlur={onBlur}
              onChange={(e, checked) => {
                onChange(e, checked);
                if (checkboxProps.onChange) {
                  checkboxProps.onChange(e, checked);
                }
              }}
            />
          }
        />
      )}
    />
  );
}
