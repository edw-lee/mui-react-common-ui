'use client';

import {
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
import CollapsibleTableRow, {
  CollapsibleTableRowProps,
} from './collapsible-table-row.component';
import DataTableToolbar, {
  DataTableToolbarFilter,
  DataTableToolbarFilterType,
  DataTableToolbarProps,
} from '../data-table/data-table-toolbar';
import SortIcon from '../data-table/sort-button.component';

export type CollapsibleTableColumn<T> = {
  field: string;
  header: string;
  getter?: (row: T) => any;
  flex?: string;
  align?: 'center' | 'right' | 'left';
  sortable?: boolean;
  filterType?: DataTableToolbarFilterType;
};

export type CollapsibleTableProps<T> = {
  columns: CollapsibleTableColumn<T>[];
  title: string;
  rows?: T[];
  noRowsText?: string;
  tableProps?: TableProps;
  tableContainerProps?: TableContainerProps;
  paperContainerProps?: PaperProps;
  tablePaginationProps?: TablePaginationProps;
  isLoading?: boolean;
  sortDirections?: Record<string, number>;
  onSortDirectionClicked?: (field: string) => void;
} & CollapsibleTableRowProps<T> &
  DataTableToolbarProps;

export default function CollapsibleTable<T extends Record<string, any>>({
  columns,
  rows,
  noRowsText = 'No rows.',
  tableProps,
  tableContainerProps,
  paperContainerProps,
  tablePaginationProps,
  isLoading,
  sortDirections = {},
  title,
  onSortDirectionClicked,
  onFiltersChange,
  ...props
}: CollapsibleTableProps<T>) {
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
        selectedCount={0}
        filters={filters}
        onFiltersChange={onFiltersChange}
      />

      <TableContainer {...tableContainerProps}>
        <Table {...tableProps}>
          <TableHead>
            <TableRow>
              {columns.map((col, idx) => (
                <TableCell
                  key={idx}
                  style={{
                    width: col.flex ?? `${(1 * 100) / columns.length}%`,
                  }}
                >
                  <Stack
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={col.align}
                  >
                    <Typography textAlign={'right'}>{col.header}</Typography>

                    {col.sortable && (
                      <SortIcon
                        sortDirection={
                          sortDirections[col.field] > 0 ? 'asc' : 'desc'
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
                rows.map((row, idx) => (
                  <CollapsibleTableRow
                    key={idx}
                    row={row}
                    columns={columns}
                    {...props}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    sx={{ textAlign: 'center' }}
                  >
                    {noRowsText}
                  </TableCell>
                </TableRow>
              )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
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
