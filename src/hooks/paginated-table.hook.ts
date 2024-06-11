'use client';

import { Dispatch, SetStateAction, useMemo, useState } from 'react';

export const DEFAULT_ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

export type UsePaginatedTableProps = {
  page?: number;
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  sortDirections?: Record<string, number>;
};

export type UsePaginatedTableReturnType = {
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
  sortDirections: Record<string, number>;
  sortDirectionsQueryString: string;
  filters: Record<string, string>;
  setPage: Dispatch<SetStateAction<number>>;
  setRowsPerPage: (rows: number) => void;
  onSortDirectionChange: (field: string | string[]) => void;
  setFilters: (_filters: Record<string, string>) => void;
};

export default function usePaginatedTable({
  page: initialPage = 0,
  rowsPerPage: initialRowsPerPage = DEFAULT_ROWS_PER_PAGE_OPTIONS[0],
  rowsPerPageOptions = DEFAULT_ROWS_PER_PAGE_OPTIONS,
  sortDirections: initialSortDirections = {},
}: UsePaginatedTableProps): UsePaginatedTableReturnType {
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

  const onSortDirectionChange = (field: string | string[]) => {
    const fields = Array.isArray(field) ? field : [field];

    let newSortDirections = { ...sortDirections };

    fields.forEach((f) => {
      const sort = newSortDirections[f] ? -newSortDirections[f] : -1;

      //Remove orginal field
      delete newSortDirections[f];

      //Add to the first position so that the latest sort is prioritised
      newSortDirections = { [f]: sort, ...newSortDirections };
    });

    setSortDirections(newSortDirections);
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
}
