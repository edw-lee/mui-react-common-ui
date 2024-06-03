import { forwardRef, useState } from 'react';
import {
  FilterTextFieldProps,
  FilterTextFieldType,
} from './filter-textfield.component';
import { TextFieldWithOptions } from '../../../form';
import { TextFieldWithOptionsOptionType } from '../../../form/textfield-with-options.component';
import { DataTableToolbarFilterOperation } from '../data-table-toolbar.component';

type NumberFilterProps = Omit<FilterTextFieldProps, 'field'>;

const NumberFilter = forwardRef<FilterTextFieldType, NumberFilterProps>(
  ({ label, type, sx, onFilterInput }: NumberFilterProps, ref) => {
    const [selectedOperation, setSelectedOperation] =
      useState<DataTableToolbarFilterOperation>('eq');

    const options: TextFieldWithOptionsOptionType[] = [
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
    ];

    return (
      <TextFieldWithOptions
        ref={ref}
        type={type}
        sx={sx}
        label={label}
        inputProps={{
          onInput: (e) =>
            onFilterInput([e.currentTarget.value], [selectedOperation]),
        }}
        onClear={() => onFilterInput([''])}
        onSelectOption={(operation) => setSelectedOperation(operation as any)}
        options={options}
      />
    );
  },
);

NumberFilter.displayName = 'NumberFilter';

export default NumberFilter;
