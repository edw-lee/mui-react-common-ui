import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {
  FilterTextFieldProps,
  FilterTextFieldType,
} from './filter-textfield.component';
import DateRangePicker from '../../../date-range-picker';
import { DataTableToolbarFilterOperation } from '../data-table-toolbar.component';
import { DateRangeCalendarValue } from '../../../date-range-picker/date-range-calendar.component';

dayjs.extend(utc);

type DateFilterType = Omit<FilterTextFieldProps, 'type' | 'field'>;

const DateFilter = forwardRef<FilterTextFieldType, DateFilterType>(
  ({ label, sx, onFilterInput }: DateFilterType, ref) => {
    const [value, setValue] = useState<DateRangeCalendarValue | undefined>();

    useImperativeHandle(ref, () => ({
      clear: () => setValue(undefined),
    }));

    useEffect(() => {
      const from = value?.from?.isValid()
        ? value?.from.utc(true).toISOString()
        : undefined;
      const to = value?.to?.isValid()
        ? value?.to.utc(true).toISOString()
        : undefined;

      const values: string[] = [];
      let operations: DataTableToolbarFilterOperation[] = [];

      if (from) {
        values.push(from);
        operations.push('gte');
      }

      if (to) {
        values.push(to);
        operations.push('lte');
      }

      if (operations.length == 1) {
        operations = ['eq'];
      }

      onFilterInput(values, operations);
    }, [value]);

    return (
      <Stack sx={sx}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <DateRangePicker value={value} label={label} onChange={setValue} />
        </LocalizationProvider>
      </Stack>
    );
  },
);

DateFilter.displayName = 'DateFilter';

export default DateFilter;
