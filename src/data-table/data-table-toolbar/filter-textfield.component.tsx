import { forwardRef } from 'react';
import { SxProps, Theme } from '@mui/material';
import { DataTableToolbarFilterOperation } from './data-table-toolbar.component';
import { TextFieldWithOptions } from '../../form';
import { TextFieldWithOptionsType } from '../../form/textfield-with-options.component';

export type FilterTextFieldProps = {
  field: string;
  label?: string;
  type: 'text' | 'number';
  onFilterInput: (value: string) => void;
  onSelectOperation: (
    value: string,
    operation: DataTableToolbarFilterOperation,
  ) => void;
  sx?: SxProps<Theme>;
};

const FilterTextField = forwardRef<
  TextFieldWithOptionsType,
  FilterTextFieldProps
>(
  (
    {
      field,
      label,
      type,
      sx,
      onFilterInput,
      onSelectOperation,
    }: FilterTextFieldProps,
    ref,
  ) => {
    return (
      <TextFieldWithOptions
        ref={ref}
        type={type}
        key={field}
        sx={sx}
        label={label ?? field}
        inputProps={{
          onInput: (e) => onFilterInput(e.currentTarget.value),
        }}
        onClear={() => onFilterInput('')}
        onSelectOption={(operation, input) =>
          onSelectOperation(input, operation as any)
        }
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
  },
);

FilterTextField.displayName = 'FilterTextField';

export default FilterTextField;
