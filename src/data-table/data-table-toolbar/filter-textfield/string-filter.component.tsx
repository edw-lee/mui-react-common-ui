import { forwardRef } from 'react';
import {
  FilterTextFieldProps,
  FilterTextFieldType,
} from './filter-textfield.component';
import { TextFieldWithOptions } from '../../../form';

type StringFilterProps = Omit<FilterTextFieldProps, 'field'>;

const StringFilter = forwardRef<FilterTextFieldType, StringFilterProps>(
  ({ label, type, sx, onFilterInput }: StringFilterProps, ref) => {
    return (
      <TextFieldWithOptions
        ref={ref}
        type={type}
        sx={sx}
        label={label}
        inputProps={{
          onInput: (e) => onFilterInput([e.currentTarget.value], ['regex']),
        }}
        onClear={() => onFilterInput([''])}
      />
    );
  },
);

StringFilter.displayName = 'StringFilter';

export default StringFilter;
