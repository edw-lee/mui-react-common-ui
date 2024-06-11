'use client';

import {
  Autocomplete,
  Chip,
  FormControl,
  FormControlProps,
  TextField,
} from '@mui/material';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { FormInputProps } from './form-input-props';

export type FormSelectOptionType = {
  value?: string;
  label: string;
};

export type FormSelectProps = {
  options: FormSelectOptionType[];
} & FormControlProps &
  FormInputProps;

export default function FormSelect({
  name,
  control,
  label,
  options,
  rules,
  ...props
}: FormSelectProps) {
  const formContext = useFormContext();

  if (!control) {
    control = formContext.control;
  }

  const [autoCompleteValue, setAutocompleteValue] = useState<any>(null);
  const value = useWatch({
    name,
    control,
  });

  useEffect(() => {
    const option = options.find((o) => o.value == value);
    setAutocompleteValue(option || null);
  }, [options, value]);

  return (
    <FormControl fullWidth {...props}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({
          field: { onChange, onBlur },
          fieldState: { invalid, error },
        }) => (
          <Autocomplete
            options={options}
            onBlur={onBlur}
            onChange={(e, option) => {
              onChange(option?.value);
            }}
            value={autoCompleteValue}
            autoHighlight
            autoSelect
            componentsProps={{ popper: { style: { width: 'fit-content' } } }}
            renderTags={(tagValue, getTagProps) => {
              return tagValue.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={index}
                  label={option.label}
                />
              ));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{
                  maxLength:
                    (rules?.maxLength as any)?.value ||
                    rules?.maxLength ||
                    undefined,
                  minLength:
                    (rules?.minLength as any)?.value || rules?.minLength,
                  min: (rules?.min as any)?.value || rules?.min,
                  max: (rules?.max as any)?.value || rules?.max,
                  ...params.inputProps,
                  autoComplete: 'new-password',
                }}
                required={!!rules?.required}
                error={!!error}
                label={label}
                helperText={invalid && error?.message}
                variant="outlined"
              />
            )}
          />
        )}
      />
    </FormControl>
  );
}
