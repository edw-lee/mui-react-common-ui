import {
  Checkbox,
  CircularProgress,
  Paper,
  PaperProps,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableContainerProps,
  TableHead,
  TablePagination,
  TablePaginationProps,
  TableProps,
  TableRow,
  Typography,
} from '@mui/material';
import React, {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
} from 'react';
import useDataTable from './data-table.hooks';
import DataTableToolbar, {
  DataTableToolbarFilter,
  DataTableToolbarFilterType,
  DataTableToolbarProps,
} from './data-table-toolbar';
import SortIcon from './sort-button.component';
import { DropDownFilterOption } from './data-table-toolbar/filter-textfield/dropdown-filter.component';

export type DataTableColumn<T> = {
  field: string | string[];
  header: string;
  flex?: string;
  sortable?: boolean;
  filterLabel?: string | string[];
  filterType?: DataTableToolbarFilterType | DataTableToolbarFilterType[];
  options?: DropDownFilterOption[] | DropDownFilterOption[][];
  getter?: (row: T) => any;
};

export type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  rows?: T[];
  idField?: string;
  noDataText?: string;
  emptyCellText?: string;
  onDelete?: (deleteIds: string[]) => void;
  onRowClick?: (data: T) => void;
  customToolbarButtons?: (selected: string[]) => React.JSX.Element[];
  tablePaginationProps?: TablePaginationProps;
  paperContainerProps?: PaperProps;
  tableContainerProps?: TableContainerProps;
  tableProps?: TableProps;
  isLoading?: boolean;
  disableCheckbox?: boolean;
  sortDirections?: Record<string, number>;
  onSortDirectionClicked?: (field: string | string[]) => void;
  onSelectedChange?: (selectdIds: string[]) => void;
} & DataTableToolbarProps;

export type DataTableType = { clearSelected: () => void };

function DataTableRow<T extends Record<string, any>>({
  row,
  columns,
  checked,
  onCheckClick,
  onRowClick,
  emptyCellText,
  hover,
  disableCheckbox,
}: {
  row: T;
  columns: DataTableColumn<T>[];
  checked?: boolean;
  onCheckClick?: () => void;
  onRowClick?: () => void;
  emptyCellText?: string;
  hover?: boolean;
  disableCheckbox?: boolean;
}) {
  const getCellValue = (row: T, { field, getter }: DataTableColumn<T>) => {
    let value;

    if (getter) {
      value = getter(row);
    } else {
      value = row[field.toString()];
    }

    return value ?? emptyCellText;
  };

  return (
    <TableRow sx={{ cursor: hover ? 'pointer' : 'initial' }} hover={hover}>
      {!disableCheckbox && (
        <TableCell>
          <Checkbox checked={checked} onClick={onCheckClick} />
        </TableCell>
      )}

      {columns.map((col, colIdx) => (
        <TableCell key={colIdx} onClick={onRowClick}>
          {getCellValue(row, col)}
        </TableCell>
      ))}
    </TableRow>
  );
}

function _DataTable<T extends Record<string, any>>(
  props: DataTableProps<T>,
  ref: ForwardedRef<DataTableType>,
) {
  const {
    columns,
    rows,
    idField = '_id',
    noDataText = 'No data.',
    emptyCellText = 'N/A',
    title,
    onDelete,
    onRowClick,
    customToolbarButtons,
    tablePaginationProps,
    paperContainerProps,
    tableContainerProps,
    tableProps,
    isLoading,
    disableDelete,
    disableCheckbox,
    sortDirections = {},
    onSortDirectionClicked,
    onFiltersChange,
    onSelectedChange,
  } = props;

  const {
    onCheck,
    onCheckAll,
    onClearChecks,
    clearSelected,
    isChecked,
    isAllChecked,
    selectedCount,
    selected,
    fieldsSortDirections,
  } = useDataTable({
    rows: rows ?? [],
    idField,
    columns,
    sortDirections,
  });

  const filters: DataTableToolbarFilter[] = columns
    .filter((col) => !!col.filterType)
    .flatMap((col) => {
      const fields = Array.isArray(col.field) ? col.field : [col.field];
      let options: DropDownFilterOption[][] | undefined = col.options as any;

      if (col.options && !Array.isArray(col.options[0])) {
        options = [col.options as any];
      }

      let labels = [col.header];

      if (col.filterLabel) {
        if (Array.isArray(col.filterLabel)) {
          labels = col.filterLabel;
        } else {
          labels = [col.filterLabel];
        }
      }

      const filterTypes = Array.isArray(col.filterType)
        ? col.filterType
        : [col.filterType];

      return fields.map((field, index) => ({
        field,
        label: labels[Math.min(index, labels.length - 1)],
        type: filterTypes[Math.min(index, filterTypes.length - 1)]!,
        options: options?.at(Math.min(index, options.length - 1)),
      }));
    });

  useImperativeHandle(ref, () => ({
    clearSelected,
  }));

  useEffect(() => {
    if (onSelectedChange) {
      onSelectedChange(selected);
    }
  }, [selected]);

  return (
    <Paper component={Stack} {...paperContainerProps}>
      <DataTableToolbar
        title={title}
        selectedCount={selectedCount}
        onDelete={() => onDelete && onDelete(selected)}
        customToolbarButtons={
          customToolbarButtons && customToolbarButtons(selected)
        }
        disableDelete={disableDelete}
        filters={filters}
        onFiltersChange={onFiltersChange}
        onClearChecksClicked={onClearChecks}
      />

      <TableContainer {...tableContainerProps}>
        <Table {...tableProps}>
          <TableHead>
            <TableRow>
              {!disableCheckbox && (
                <TableCell>
                  <Checkbox checked={isAllChecked} onClick={onCheckAll} />
                </TableCell>
              )}

              {columns.map((col, idx) => {
                const fieldString = col.field.toString();

                return (
                  <TableCell
                    key={idx}
                    width={col.flex ?? `${(1 * 100) / columns.length}%`}
                  >
                    <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
                      <Typography>{col.header}</Typography>
                      {col.sortable && (
                        <SortIcon
                          sortDirection={
                            fieldsSortDirections[fieldString] > 0
                              ? 'asc'
                              : 'desc'
                          }
                          onClick={() =>
                            onSortDirectionClicked &&
                            onSortDirectionClicked(col.field)
                          }
                        />
                      )}
                    </Stack>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {!isLoading ? (
              rows?.length ? (
                rows.map((row, rowIdx) => (
                  <DataTableRow
                    key={rowIdx}
                    row={row}
                    columns={columns}
                    checked={isChecked(row[idField])}
                    onCheckClick={() => onCheck(row[idField])}
                    onRowClick={() => onRowClick && onRowClick(row)}
                    emptyCellText={emptyCellText}
                    hover={Boolean(onRowClick)}
                    disableCheckbox={disableCheckbox}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    sx={{ textAlign: 'center' }}
                  >
                    {noDataText}
                  </TableCell>
                </TableRow>
              )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  sx={{ textAlign: 'center' }}
                >
                  <CircularProgress size={30} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {tablePaginationProps && (
        <Table>
          <TableBody>
            <TableRow>
              <TablePagination {...tablePaginationProps} />
            </TableRow>
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}

const DataTable = forwardRef(_DataTable) as <T>(
  props: DataTableProps<T> & { ref?: React.ForwardedRef<DataTableType> },
) => ReturnType<typeof _DataTable>;

export default DataTable;
