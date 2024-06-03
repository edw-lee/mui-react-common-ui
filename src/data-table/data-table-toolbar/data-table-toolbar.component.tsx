import { Clear, Delete, FilterAlt, FilterAltOff } from '@mui/icons-material';
import {
  Collapse,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import FilterTextField from './filter-textfield';
import { TextFieldWithOptionsType } from '../../form/textfield-with-options.component';

export type DataTableToolbarFilterOperation =
  | 'regex'
  | 'lt'
  | 'lte'
  | 'gt'
  | 'gte'
  | 'eq'
  | 'neq'
  | 'in'
  | 'nin';
export type DataTableToolbarFilterType =
  | 'string'
  | 'number'
  | 'date'
  | 'options';
export type DataTableToolbarFilterValue = {
  operation: DataTableToolbarFilterOperation;
  value: string;
};

export type DataTableToolbarFilter = {
  field: string;
  label?: string;
  type: DataTableToolbarFilterType;
};

export type DataTableToolbarProps = {
  title: string;
  disableDelete?: boolean;
  onFiltersChange?: (filters: Record<string, string>) => void;
};

export type DataTableToobarPrivateProps = {
  selectedCount: number;
  onDelete?: () => void;
  customToolbarButtons?: React.JSX.Element[];
  filters?: DataTableToolbarFilter[];
  onClearChecksClicked?: () => void;
};

const ALL_OPERATIONS: DataTableToolbarFilterOperation[] = [
  'eq',
  'gt',
  'gte',
  'in',
  'lt',
  'lte',
  'neq',
  'nin',
  'regex',
];

export default function DataTableToolbar({
  title,
  selectedCount,
  onDelete,
  customToolbarButtons,
  disableDelete,
  filters,
  onFiltersChange,
  onClearChecksClicked,
}: DataTableToolbarProps & DataTableToobarPrivateProps) {
  const hasFilter = Boolean(filters?.length);
  const [openFilter, setOpenFilter] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const inputRefs = useRef<(TextFieldWithOptionsType | null)[]>(
    Array(filters?.length).fill(null),
  );

  const onFilterInput = useCallback(
    (
      field: string,
      values: string[],
      operations: DataTableToolbarFilterOperation[] = ['regex'],
    ) => {
      const newFilterValues = { ...filterValues };

      ALL_OPERATIONS.forEach(
        (operation) => delete newFilterValues[`${field}[${operation}]`],
      );

      values.map((value, index) => {
        const operation = operations[Math.min(index, operations.length - 1)];

        const fieldKey = `${field}[${operation}]`;

        if (!value) {
          delete newFilterValues[fieldKey];
        } else {
          newFilterValues[fieldKey] = value;
        }

        setFilterValues(newFilterValues);

        if (onFiltersChange) {
          onFiltersChange(newFilterValues);
        }
      });
    },
    [filterValues],
  );

  const onToggleFilter = useCallback(() => {
    const newOpenFilter = !openFilter;

    setOpenFilter(newOpenFilter);

    if (!newOpenFilter) {
      onCloseFilters();
    }
  }, [openFilter]);

  const onCloseFilters = useCallback(() => {
    inputRefs.current.forEach((ref) => ref?.clear());

    if (onFiltersChange) {
      onFiltersChange({});
    }
  }, [inputRefs]);

  return (
    <Stack>
      <Toolbar>
        {!selectedCount ? (
          <Stack flexDirection={'row'} flexGrow={1} alignItems={'center'}>
            <Typography variant="h6" flexGrow={1}>
              {title}
            </Typography>

            {hasFilter && (
              <IconButton onClick={onToggleFilter}>
                {openFilter ? <FilterAlt /> : <FilterAltOff />}
              </IconButton>
            )}
          </Stack>
        ) : (
          <Stack
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            flexGrow={1}
          >
            <Stack flexDirection={'row'} alignItems={'center'}>
              <IconButton onClick={onClearChecksClicked}>
                <Clear />
              </IconButton>
              <Typography variant="h6">{selectedCount} selected</Typography>
            </Stack>

            <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
              {customToolbarButtons?.map((button, idx) =>
                React.cloneElement(button, { key: idx }),
              )}

              {!disableDelete && (
                <IconButton onClick={onDelete}>
                  <Delete />
                </IconButton>
              )}
            </Stack>
          </Stack>
        )}
      </Toolbar>

      <Collapse
        in={openFilter}
        sx={{
          flexGrow: 1,
        }}
      >
        <Stack flexDirection={'row'} flexWrap={'wrap'} p={2} gap={1}>
          {filters?.map(({ field, label, type }, index) => (
            <FilterTextField
              ref={(el) => (inputRefs.current[index] = el)}
              type={type}
              key={`filter_${field}${index}`}
              field={field}
              label={label}
              onFilterInput={(values, operations) => {
                onFilterInput(field, values, operations);
              }}
            />
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
}
