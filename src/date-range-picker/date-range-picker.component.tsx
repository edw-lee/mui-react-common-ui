'use client';

import { alpha, Box, IconButton, Popover, Stack } from '@mui/material';
import { CalendarIcon, DateField } from '@mui/x-date-pickers';
import { useCallback, useRef, useState } from 'react';
import { Dayjs } from 'dayjs';
import DateRangeCalendar, {
  DateRangeCalendarValue,
} from './date-range-calendar.component';

export type DateRangePickerProps = {
  label?: string;
  value?: DateRangeCalendarValue;
  onChange: (range?: DateRangeCalendarValue) => void;
};

export default function DateRangePicker({
  label,
  value,
  onChange,
}: DateRangePickerProps) {
  const [calendarAnchorEl, setCalendarAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const showCalendar = Boolean(calendarAnchorEl);
  const calendarButtonRef = useRef<HTMLButtonElement>(null);
  const [fromDate, setFromDate] = useState<Dayjs | undefined>(
    value?.from ?? undefined,
  );
  const [toDate, setToDate] = useState<Dayjs | undefined>(
    value?.to ?? undefined,
  );

  const toggleCalendar = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCalendarAnchorEl(calendarAnchorEl ? null : e.currentTarget);
  };

  const handleDateChange = (dateRange?: DateRangeCalendarValue) => {
    if (onChange) {
      onChange(dateRange);
    }

    setFromDate(dateRange?.from ?? undefined);
    setToDate(dateRange?.to ?? undefined);
  };

  const onFromDateChange = useCallback(
    (_fromDate: Dayjs | null) => {
      handleDateChange({ from: _fromDate, to: toDate });
    },
    [toDate],
  );

  const onToDateChange = useCallback(
    (_toDate: Dayjs | null) => {
      handleDateChange({ to: _toDate, from: fromDate });
    },
    [fromDate],
  );

  return (
    <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
      <DateField
        label={`${label} (From)`}
        value={fromDate}
        onChange={(value) => onFromDateChange(value)}
        maxDate={fromDate}
        clearable
      />

      <Box
        sx={(theme) => ({
          borderBottom: 2,
          borderColor: alpha(theme.palette.text.primary, 0.4),
          width: 10,
          height: 0,
        })}
      />

      <DateField
        label={`${label} (To)`}
        value={toDate}
        onChange={(value) => onToDateChange(value)}
        InputProps={{
          endAdornment: (
            <IconButton ref={calendarButtonRef} onClick={toggleCalendar}>
              <CalendarIcon />
            </IconButton>
          ),
        }}
        clearable
        minDate={fromDate}
      />

      <Popover
        open={showCalendar}
        onClose={() => setCalendarAnchorEl(null)}
        anchorEl={calendarAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <DateRangeCalendar
          onChange={handleDateChange}
          value={{ from: fromDate, to: toDate }}
        />
      </Popover>
    </Stack>
  );
}
