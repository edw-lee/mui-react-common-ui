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
import React from 'react';
import useDataTable from './data-table.hooks';
import DataTableToolbar, {
  DataTableToolbarFilter,
  DataTableToolbarFilterType,
  DataTableToolbarProps,
} from './data-table-toolbar.component';
import SortIcon from './sort-button.component';

export type DataTableColumn<T> = {
  field: string;
  header: string;
  flex?: string;
  sortable?: boolean;
  filterType?: DataTableToolbarFilterType;
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
  onSortDirectionClicked?: (field: string) => void;
} & DataTableToolbarProps;

export default function DataTable<T extends Record<string, any>>({
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
}: DataTableProps<T>) {
  const {
    onCheck,
    onCheckAll,
    onClearChecks,
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
    .map((col) => ({
      field: col.field,
      label: col.header,
      type: col.filterType!,
    }));

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

              {columns.map((col, idx) => (
                <TableCell
                  key={idx}
                  width={col.flex ?? `${(1 * 100) / columns.length}%`}
                >
                  <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
                    <Typography>{col.header}</Typography>
                    {col.sortable && (
                      <SortIcon
                        sortDirection={
                          fieldsSortDirections[col.field] > 0 ? 'asc' : 'desc'
                        }
                        onClick={() =>
                          onSortDirectionClicked &&
                          onSortDirectionClicked(col.field)
                        }
                      />
                    )}
                  </Stack>
                </TableCell>
              ))}
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
      value = row[field];
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
