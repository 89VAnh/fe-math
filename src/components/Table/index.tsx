import {
  Table as NextTable,
  Spinner,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { Key, useEffect } from "react";

type Column<T> = {
  key: string;
  label: string;
  render?: ({ children, item }: { children: any; item: T }) => React.ReactNode;
};

export default function Table<T>({
  columns,
  rows,
  rowKey,
  isLoading = false,
}: {
  columns: Column<T>[];
  rows: T[];
  rowKey: keyof T;
  isLoading?: boolean;
}) {
  const renderCell = React.useCallback(
    (item: T, columnKey: React.Key) => {
      const cellValue = item[columnKey as keyof T];
      const column = columns.find((column) => column.key === columnKey);
      if (column && column.render) {
        return column.render({ children: cellValue, item });
      } else return cellValue as React.ReactNode;
    },
    [columns]
  );

  return (
    <NextTable aria-label='Example table with dynamic content'>
      <TableHeader columns={columns || []}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        emptyContent={"Chưa có dữ liệu nào"}
        items={rows || []}
        isLoading={isLoading}
        loadingContent={<Spinner label='Loading...' />}>
        {(item) => (
          <TableRow key={item[rowKey] as Key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </NextTable>
  );
}
