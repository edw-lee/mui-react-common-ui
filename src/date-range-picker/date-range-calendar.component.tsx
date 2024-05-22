import React from 'react';
import { alpha } from '@mui/material';
import { DateCalendar, PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

function Day(props: PickersDayProps<Dayjs> & { from?: Dayjs; to?: Dayjs }) {
  const { from, to, ...pickerProps } = props;

  const isSelected = props.day.isSame(from) || props.day.isSame(to);
  const isBetween =
    from && props.day.isAfter(from) && to && props.day.isBefore(to);

  return (
    <PickersDay
      {...pickerProps}
      selected={isSelected}
      sx={(theme) => ({
        backgroundColor: isBetween
          ? alpha(theme.palette.primary.main, 0.15)
          : undefined,
      })}
    />
  );
}

export type DateRangeCalendarValue = { from?: Dayjs | null; to?: Dayjs | null };

export type DateRangeCalendarProps = {
  value?: DateRangeCalendarValue;
  onChange?: (range?: DateRangeCalendarValue) => void;
};

export default function DateRangeCalendar({
  value,
  onChange,
}: DateRangeCalendarProps) {
  const [range, setRange] = useState<DateRangeCalendarValue | undefined>(value);

  const handleChange = (value: Dayjs | null) => {
    if (
      !range?.from ||
      (!!range.from && !!range.to) ||
      value?.isBefore(range.from)
    ) {
      setRange({ from: value });
    } else if (value?.isAfter(range.from)) {
      setRange({ ...range, to: value });
    }
  };

  useEffect(() => {
    if (onChange) {
      onChange(range);
    }
  }, [range]);

  return (
    <DateCalendar
      value={null}
      onChange={handleChange}
      slots={{
        day: Day,
      }}
      slotProps={{
        day: {
          ...range,
        } as any,
      }}
    />
  );
}
