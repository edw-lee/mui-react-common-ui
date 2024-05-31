import { Stack, Typography } from '@mui/material';
import { DataTable, usePaginatedTable } from '@edwinlee/common-ui';

export default function DataTableTest() {
  const { onSortDirectionChange, sortDirections } = usePaginatedTable({});

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
            header: 'Mixed Column',
            field: ['column1', 'column2'],
            filterLabel: ['Mixed Column 1', 'Mixed Column 2'],
            filterType: 'string',
            sortable: true,
          },
          {
            header: 'Mixed Column 1 Label',
            field: ['column1', 'column2'],
            filterLabel: 'Mixed Column 1 Label',
            filterType: 'string',
            sortable: true,
          },
          {
            header: 'Mixed Column No Label',
            field: ['column1', 'column2'],
            filterType: 'string',
            sortable: true,
          },
          {
            header: 'Mixed Filters',
            field: ['column1', 'column2'],
            filterType: ['string', 'number'],
            sortable: true,
          },
          {
            header: 'Age',
            field: 'age',
            filterType: 'number',
            sortable: true,
          },
          {
            header: 'Date of Birth',
            field: 'dob',
            filterType: 'date',
          },
        ]}
        sortDirections={sortDirections}
        onSortDirectionClicked={onSortDirectionChange}
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
