"use client";
import { MoreIcon } from "@/assets";
import { useSearchResult } from "@/helper/data/result.loader";
import { getUser } from "@/lib/account.action";
import { Account } from "@/types/Account";
import { Result } from "@/types/Result";
import { formatDate } from "@/utils";
import {
  getKeyValue,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

const columns = [
  {
    key: "index",
    label: "STT",
  },
  {
    key: "testId",
    label: "Bài thi",
  },
  {
    key: "startTime",
    label: "Giờ bắt đầu",
  },
  {
    key: "endTime",
    label: "Giờ kết thúc",
  },
  {
    key: "score",
    label: "Điểm",
  },
  {
    key: "more",
    label: "Xem chi tiết",
  },
];

export default function HistoryPage() {
  const [user, setUser] = useState<Account>({} as Account);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;
  useEffect(() => {
    getUser().then((user) => {
      setUser(user);
    });
  }, []);

  const { data } = useSearchResult({
    user: user.username,
    page,
    pageSize: PAGE_SIZE,
  });

  const pages = useMemo(
    () => (data?.total ? Math.ceil((data?.total || 0) / PAGE_SIZE) : 0),
    [data?.total, PAGE_SIZE]
  );

  const renderCell = React.useCallback((item: Result, columnKey: React.Key) => {
    const cellValue: any = item[columnKey as keyof Result];
    switch (columnKey) {
      case "startTime":
      case "endTime":
        return formatDate(cellValue.toString());

      case "more":
        return (
          <Link href={`/result/${item.id}`}>
            <MoreIcon />
          </Link>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className='rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5'>
      <Table
        aria-label='Example table with dynamic content'
        bottomContent={
          pages > 1 ? (
            <div className='flex w-full justify-center'>
              <Pagination
                isCompact
                showControls
                showShadow
                color='primary'
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null
        }>
        <TableHeader columns={columns || []}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={
            data?.data
              ? (data?.data as Result[]).map((item: Result, index: number) => ({
                  ...item,
                  index: (page - 1) * PAGE_SIZE + index + 1,
                }))
              : []
          }>
          {(item: Result) => (
            <TableRow key={item?.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
