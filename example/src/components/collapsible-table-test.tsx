import {
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { CollapsibleTable } from '@edwinlee/common-ui';

export default function CollapsibleTableTest() {
  return (
    <Stack gap={1}>
      <Typography fontWeight={900}>Collapsible Table</Typography>
      <CollapsibleTable
        paperContainerProps={{
          sx: {
            border: '1px solid rgb(0,0,0,0.2)',
          },
        }}
        title="Test Collapsible Table"
        columns={[
          { header: 'First Name', field: 'firstName' },
          { header: 'Last Name', field: 'lastName' },
        ]}
        rows={[
          {
            firstName: 'Jane',
            lastName: 'Doe',
          },
          {
            firstName: 'Edwin',
            lastName: 'Lee',
          },
        ]}
        collapsedRow={(row) => (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Test Inner table</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
        tablePaginationProps={{
          count: 100,
          onPageChange: () => {},
          page: 0,
          rowsPerPage: 10,
        }}
      />
    </Stack>
  );
}
