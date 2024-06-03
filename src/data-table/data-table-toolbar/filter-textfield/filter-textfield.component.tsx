'use client';

import { forwardRef } from 'react';
import { SxProps, Theme } from '@mui/material';
import NumberFilter from './number-filter.component';
import StringFilter from './string-filter.component';
import DateFilter from './date-filter.component';
import DropDownFilter, { DropDownFilterOption } from './dropdown-filter.component';
import {
  DataTableToolbarFilterOperation,
  DataTableToolbarFilterType,
} from '../data-table-toolbar.component';

export type FilterTextFieldProps = {
  field: string;
  label?: string;
  type: DataTableToolbarFilterType;
  onFilterInput: (
    values: string[],
    operations?: DataTableToolbarFilterOperation[],
  ) => void;
  sx?: SxProps<Theme>;
  options?: DropDownFilterOption[];
};

export type FilterTextFieldType = {
  clear: () => void;
};

export type FilterType = Omit<FilterTextFieldProps, 'type' | 'field'>;

const FilterTextField = forwardRef<FilterTextFieldType, FilterTextFieldProps>(
  (
    { field, label, type, sx, options, onFilterInput }: FilterTextFieldProps,
    ref,
  ) => {
    label = label ?? field;

    switch (type) {
      case 'string':
        return (
          <StringFilter
            ref={ref}
            type={type}
            sx={sx}
            label={label}
            onFilterInput={onFilterInput}
          />
        );
      case 'number':
        return (
          <NumberFilter
            ref={ref}
            type={type}
            sx={sx}
            label={label}
            onFilterInput={onFilterInput}
          />
        );
      case 'date':
        return (
          <DateFilter
            ref={ref}
            sx={sx}
            label={label}
            onFilterInput={onFilterInput}
          />
        );
      case 'dropdown':
        return (
          <DropDownFilter
            ref={ref}
            sx={sx}
            label={label}
            options={options}
            onFilterInput={onFilterInput}
          />
        );
    }
  },
);

FilterTextField.displayName = 'FilterTextField';

export default FilterTextField;
