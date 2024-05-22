import { Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { FormInputProps } from './form-input-props';

export default function FormCheckbox({
  name,
  control,
  label,
  rules,
  ...checkboxProps
}: FormInputProps & CheckboxProps) {
  const formContext = useFormContext();

  if (!control) {
    control = formContext.control;
  }

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
