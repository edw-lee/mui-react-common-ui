import {
  DatePicker,
  DatePickerProps,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { FormInputProps } from './form-input-props';
import { Controller, useFormContext } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export default function FormDatePicker({
  name,
  control,
  label,
  rules,
  ...datePickerProps
}: FormInputProps & DatePickerProps<Dayjs>) {
  const formContext = useFormContext();

  if (!control) {
    control = formContext.control;
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        ...rules,
        validate: {
          max: (date) => {
            return datePickerProps.disableFuture && date
              ? dayjs()
                  .utc()
                  ?.isAfter(dayjs(date, { locale: 'en-gb' }).utc()) ||
                  'Invalid date.'
              : true;
          },
        },
      }}
      render={({
        field: { onChange, value },
        fieldState: { invalid, error },
      }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <DatePicker
            {...datePickerProps}
            slotProps={{
              textField: {
                helperText: invalid && error?.message,
                error: !!error,
              },
            }}
            value={dayjs.utc(value, 'YYYY-MM-DD')}
            onChange={(e, context) => {
              if (e?.isValid()) {
                onChange(e?.toISOString() || null);

                if (datePickerProps.onChange) {
                  datePickerProps.onChange(e, context);
                }
              }
            }}
            label={label}
          />
        </LocalizationProvider>
      )}
    />
  );
}
