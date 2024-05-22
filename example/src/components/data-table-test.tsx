import { Stack, Typography } from '@mui/material';
import { DataTable } from '@edwinlee/common-ui';
import { useCallback, useState } from 'react';

export default function DataTableTest() {
  const [sortDirections, setSortDirections] = useState<Record<string, number>>({
    firstName: -1,
    lastName: -1,
    age: -1,
  });

  const onSortDirectionClicked = useCallback(
    (field: string) => {
      sortDirections[field] = -sortDirections[field];
      setSortDirections({ ...sortDirections });
    },
    [sortDirections],
  );

  return (
    <Stack gap={1}>
      <Typography fontWeight={900}>Data Table</Typography>
      <DataTable
        paperContainerProps={{
          sx: {
            border: '1px solid rgba(0,0,0,0.2)',
          },
        }}
        title="Test Data Table"
        columns={[
          {
            header: 'First Name',
            field: 'firstName',
            filterType: 'string',
            sortable: true,
          },
          {
            header: 'Last Name',
            field: 'lastName',
            filterType: 'string',
            sortable: true,
          },
          {
            header: 'Age',
            field: 'age',
            filterType: 'number',
            sortable: true,
          },
        ]}
        sortDirections={sortDirections}
        onSortDirectionClicked={onSortDirectionClicked}
        rows={[
          {
            firstName: 'Jane',
            lastName: 'Doe',
            age: 19,
          },
          {
            firstName: 'John',
            lastName: 'Doe',
            age: 30,
          },
          {
            firstName: 'Alexis',
            lastName: 'Rae',
            age: 22,
          },
          {
            firstName: 'Elvis',
            lastName: 'Parsley',
            age: 40,
          },
        ]}
        tablePaginationProps={{
          count: 50,
          page: 0,
          rowsPerPage: 10,
          onPageChange: () => {},
        }}
      />
    </Stack>
  );
}
