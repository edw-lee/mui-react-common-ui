import { useCallback, useMemo, useState } from 'react';
import { DataTableColumn } from './data-table.component';

export type UseDataTableProps<T> = {
  rows: T[];
  idField: keyof T;
  columns: DataTableColumn<T>[];
};

const useDataTable = <T>({ rows, idField }: UseDataTableProps<T>) => {
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

  return {
    onCheck,
    onCheckAll,
    onClearChecks,
    isChecked,
    isAllChecked,
    selectedCount,
    selected,
  };
};

export default useDataTable;
