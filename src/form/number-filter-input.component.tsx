import { Close } from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  MenuItem,
  outlinedInputClasses,
  Select,
  SelectProps,
  styled,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { useEffect, useState } from 'react';

const StyledSelect = styled(Select)<SelectProps>(() => ({
  [`.${outlinedInputClasses.notchedOutline}`]: {
    border: 0,
  },
}));

const StyledTextField = styled(TextField)<TextFieldProps>(() => ({
  [`.${outlinedInputClasses.adornedStart}`]: {
    paddingLeft: 0,
  },
}));

function FilterSelect(props: SelectProps) {
  return (
    <FormControl fullWidth sx={{ minWidth: 70, textAlign: 'center' }}>
      <StyledSelect {...props} defaultValue="=">
        <MenuItem value="=">{'='}</MenuItem>
        <MenuItem value=">=">{'>='}</MenuItem>
        <MenuItem value="<=">{'<='}</MenuItem>
        <MenuItem value=">">{'>'}</MenuItem>
        <MenuItem value="<">{'<'}</MenuItem>
      </StyledSelect>
    </FormControl>
  );
}

export default function NumberFilterInput(
  props: TextFieldProps & { onChange?: (value?: string) => void },
) {
  const [comparator, setComparator] = useState<string>('=');
  const [value, setValue] = useState<string | undefined>(
    (props.value as any) || undefined,
  );

  useEffect(() => {
    if (props.onChange) {
      props.onChange(value ? `${comparator}${value}` : undefined);
    }
  }, [value, comparator]);

  return (
    <StyledTextField
      sx={{
        width: 200,
      }}
      {...props}
      type="number"
      autoComplete="off"
      value={value || ''}
      onChange={(e) => setValue(e.target.value)}
      InputProps={{
        startAdornment: (
          <FilterSelect
            onChange={(e) => setComparator(e.target.value as string)}
          />
        ),
        endAdornment: (
          <IconButton onClick={() => setValue(undefined)}>
            <Close />
          </IconButton>
        ),
      }}
    />
  );
}
