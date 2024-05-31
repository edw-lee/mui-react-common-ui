import { forwardRef, useState } from 'react';
import { SxProps, Theme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  DataTableToolbarFilterOperation,
  DataTableToolbarFilterType,
} from './data-table-toolbar.component';
import { TextFieldWithOptions } from '../../form';
import { TextFieldWithOptionsType } from '../../form/textfield-with-options.component';
import DateRangePicker from '../../date-range-picker/date-range-picker.component';

export type FilterTextFieldProps = {
  field: string;
  label?: string;
  type: DataTableToolbarFilterType;
  onFilterInput: (
    values: string[],
    operations?: DataTableToolbarFilterOperation[],
  ) => void;
  sx?: SxProps<Theme>;
};

const FilterTextField = forwardRef<
  TextFieldWithOptionsType,
  FilterTextFieldProps
>(({ field, label, type, sx, onFilterInput }: FilterTextFieldProps, ref) => {
  const [selectedOperation, setSelectedOperation] =
    useState<DataTableToolbarFilterOperation>('regex');

  if (type == 'number' || type == 'string') {
    return (
      <TextFieldWithOptions
        ref={ref}
        type={type}
        key={field}
        sx={sx}
        label={label ?? field}
        inputProps={{
          onInput: (e) =>
            onFilterInput([e.currentTarget.value], [selectedOperation]),
        }}
        onClear={() => onFilterInput([''])}
        onSelectOption={(operation) => setSelectedOperation(operation as any)}
        options={
          type == 'number'
            ? [
                {
                  label: '= ',
                  value: 'eq',
                },
                {
                  label: '> ',
                  value: 'gt',
                },
                {
                  label: '< ',
                  value: 'lt',
                },
                {
                  label: '>=',
                  value: 'gte',
                },
                {
                  label: '<=',
                  value: 'lte',
                },
              ]
            : undefined
        }
      />
    );
  } else if (type == 'date') {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <DateRangePicker
          onChange={(range) => {
            const from = range?.from?.toISOString();
            const to = range?.to?.toISOString();

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
          }}
        />
      </LocalizationProvider>
    );
  }
});

FilterTextField.displayName = 'FilterTextField';

export default FilterTextField;
