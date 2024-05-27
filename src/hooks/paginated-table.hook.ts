import { useMemo, useState } from 'react';

export const DEFAULT_ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

export type UsePaginatedTableProps = {
  page?: number;
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  sortDirections?: Record<string, number>;
};

const usePaginatedTable = ({
  page: initialPage = 0,
  rowsPerPage: initialRowsPerPage = DEFAULT_ROWS_PER_PAGE_OPTIONS[0],
  rowsPerPageOptions = DEFAULT_ROWS_PER_PAGE_OPTIONS,
  sortDirections: initialSortDirections = {},
}: UsePaginatedTableProps) => {
  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, _setRowsPerPage] = useState(initialRowsPerPage);
  const [sortDirections, setSortDirections] = useState<Record<string, number>>(
    initialSortDirections,
  );
  const [filters, _setFilters] = useState<Record<string, string>>({});

  const setRowsPerPage = (rows: number) => {
    _setRowsPerPage(rows);
    setPage(0);
  };

  const sortDirectionsQueryString = useMemo(
    () =>
      Object.keys(sortDirections)
        .map((key) => (sortDirections[key] > 0 ? key : `-${key}`))
        .join(),
    [sortDirections],
  );

  const onSortDirectionChange = (field: string) => {
    const sort = sortDirections[field];

    delete sortDirections[field];

    setSortDirections({ [field]: -sort, ...sortDirections });
  };

  const setFilters = (_filters: Record<string, string>) => {
    _setFilters(_filters);
    setPage(0);
  };

  return {
    page,
    rowsPerPage,
    rowsPerPageOptions,
    sortDirections,
    sortDirectionsQueryString,
    filters,
    setPage,
    setRowsPerPage,
    onSortDirectionChange,
    setFilters,
  };
};

export default usePaginatedTable;