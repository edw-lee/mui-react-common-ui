import { IconButton, Popover, TextField } from '@mui/material';
import { CalendarIcon } from '@mui/x-date-pickers';
import { useEffect, useRef, useState } from 'react';
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
  const [textFieldValue, setTextFieldValue] = useState<string>();
  const showCalendar = Boolean(calendarAnchorEl);
  const calendarButtonRef = useRef<HTMLButtonElement>(null);

  const toggleCalendar = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCalendarAnchorEl(calendarAnchorEl ? null : e.currentTarget);
  };

  const handleDateChange = (dateRange?: DateRangeCalendarValue) => {
    if (onChange) {
      onChange(dateRange);
    }
  };

  const updateTextFieldValue = (dateRange?: DateRangeCalendarValue) => {
    if (!dateRange?.from && !dateRange?.to) {
      setTextFieldValue('');
      return;
    }

    const format = 'DD/MM/YYYY';
    const from = dateRange.from?.format(format);
    const to = dateRange.to?.format(format);

    if (from && to) {
      setTextFieldValue(`${from} - ${to}`);
    } else if (from) {
      setTextFieldValue(`${from}`);
    } else if (to) {
      setTextFieldValue(`${to}`);
    } else {
      setTextFieldValue(`${format} - ${format}`);
    }
  };

  const handleTextFieldKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (e.key == 'Backspace' || e.key == 'Delete') {
      handleDateChange(undefined);
    }
  };

  useEffect(() => {
    updateTextFieldValue(value);
  }, [value]);

  return (
    <>
      <TextField
        label={label}
        placeholder="DD/MM/YYYY"
        autoComplete="off"
        focused={showCalendar || !!textFieldValue}
        onClick={() => setCalendarAnchorEl(calendarButtonRef.current)}
        onKeyDown={handleTextFieldKeyDown}
        value={textFieldValue || ''}
        InputProps={{
          endAdornment: (
            <IconButton ref={calendarButtonRef} onClick={toggleCalendar}>
              <CalendarIcon />
            </IconButton>
          ),
        }}
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
        <DateRangeCalendar onChange={handleDateChange} value={value} />
      </Popover>
    </>
  );
}
