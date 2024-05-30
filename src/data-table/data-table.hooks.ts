import { useCallback, useMemo, useState } from 'react';
import { DataTableColumn } from './data-table.component';

export type UseDataTableProps<T> = {
  rows: T[];
  idField: keyof T;
  columns: DataTableColumn<T>[];
  sortDirections?: Record<string, number>;
};

const useDataTable = <T>({
  rows,
  idField,
  columns,
  sortDirections,
}: UseDataTableProps<T>) => {
  const [selected, setSelected] = useState<string[]>([]);

  const onCheck = useCallback(
    (id: string) => {
      if (selected.includes(id)) {
        const newSelected = selected.filter((_id) => _id != id);

        setSelected(newSelected);
      } else {
        const newSelected = Array.from(new Set([...selected, id]));

        setSelected(newSelected);
      }
    },
    [selected],
  );

  const onCheckAll = useCallback(() => {
    const rowIds = rows.map((row: any) => row[idField]);

    if (!isAllChecked) {
      setSelected(Array.from(new Set(selected.concat(rowIds))));
    } else {
      setSelected(selected.filter((id) => !rowIds.includes(id)));
    }
  }, [selected, rows]);

  const onClearChecks = () => {
    setSelected([]);
  };

  const isChecked = useCallback(
    (id: string) => {
      return selected.includes(id);
    },
    [selected],
  );

  const isAllChecked = useMemo(() => {
    return (
      Boolean(rows.length) &&
      rows.every((row: any) => selected.includes(row[idField]))
    );
  }, [selected, rows]);

  const selectedCount = useMemo(() => selected.length, [selected]);

  const fieldsSortDirections = useMemo(() => {
    const result: Record<string, number> = {};

    columns.forEach((column) => {
      const fields = Array.isArray(column.field)
        ? column.field
        : [column.field];

      const fieldsString = fields.toString();

      if (!sortDirections) {
        result[fieldsString] = 1;
        return;
      }

      const sort = fields.reduce(
        (prev, field) => Math.sign(sortDirections[field] + prev),
        1,
      );

      result[fieldsString] = sort;
    });

    return result;
  }, [sortDirections]);

  const clearSelected = () => setSelected([]);

  return {
    onCheck,
    onCheckAll,
    onClearChecks,
    clearSelected,
    isChecked,
    isAllChecked,
    selectedCount,
    selected,
    fieldsSortDirections,
  };
};

export default useDataTable;
