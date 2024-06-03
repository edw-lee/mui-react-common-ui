import {
  forwardRef,
  SyntheticEvent,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { Autocomplete, Chip, TextField } from '@mui/material';
import {
  FilterTextFieldProps,
  FilterTextFieldType,
} from './filter-textfield.component';

export type DropDownFilterOption = {
  label: string;
  value?: string;
};

type DropDownFilterProps = Omit<FilterTextFieldProps, 'type' | 'field'>;

const DropDownFilter = forwardRef<FilterTextFieldType, DropDownFilterProps>(
  ({ sx, label, options, onFilterInput }: DropDownFilterProps, ref) => {
    const [value, setValue] = useState<DropDownFilterOption[]>([]);

    const onChange = (
      e: SyntheticEvent<Element, Event>,
      options: DropDownFilterOption[],
    ) => {
      if (options.find((option) => option.value == '-')) {
        setValue([]);
      } else {
        setValue(options);
      }
    };

    useImperativeHandle(ref, () => ({
      clear: () => setValue([]),
    }));

    useEffect(() => {
      if (value.length) {
        const filterValues = value.map((val) => val.value ?? val.label);
        onFilterInput([filterValues.toString()], ['in']);
      } else {
        onFilterInput(['']);
      }
    }, [value]);

    return (
      <Autocomplete
        sx={{ minWidth: 150, ...sx }}
        options={options ?? []}
        onChange={onChange}
        value={value}
        autoHighlight
        multiple
        componentsProps={{ popper: { style: { width: 'fit-content' } } }}
        renderTags={(tagValue, getTagProps) => {
          return tagValue.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              key={index}
              label={option.label}
            />
          ));
        }}
        renderInput={(params) => (
          <TextField {...params} label={label} variant="outlined" />
        )}
      />
    );
  },
);

DropDownFilter.displayName = 'DropDownFilter';

export default DropDownFilter;
