'use client';

import { Collapse, Stack, TableCell, TableRow } from '@mui/material';
import { ReactNode, useState } from 'react';
import { ChevronRight, ExpandMore } from '@mui/icons-material';
import { CollapsibleTableColumn } from './collapsible-table.component';

export type CollapsibleTableRowProps<T> = {
  collapsedRow: (row: T) => ReactNode;
  emptyCellPlaceholder?: string;
};

export type RowType = Record<string, string | number | boolean>;

export default function CollapsibleTableRow<T extends RowType>({
  row,
  columns,
  collapsedRow,
  emptyCellPlaceholder = 'N/A',
}: {
  row: T;
  columns: CollapsibleTableColumn<T>[];
} & CollapsibleTableRowProps<T>) {
  const [open, setOpen] = useState(false);

  const getCellValue = (
    row: T,
    { field, getter }: CollapsibleTableColumn<T>,
  ) => {
    let value;

    if (getter) {
      value = getter(row);
    } else {
      value = row[field];
    }

    return value ?? emptyCellPlaceholder;
  };

  return (
    <>
      <TableRow
        hover
        sx={{
          cursor: 'pointer',
        }}
      >
        {columns.map((col, idx) => (
          <TableCell key={idx} onClick={() => setOpen(!open)}>
            <Stack
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={col.align}
              gap={1}
            >
              {idx == 0 && (open ? <ExpandMore /> : <ChevronRight />)}
              {getCellValue(row, col)}
            </Stack>
          </TableCell>
        ))}
      </TableRow>

      <TableRow>
        <TableCell colSpan={columns.length} padding="none">
          <Collapse in={open}>{collapsedRow(row)}</Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
