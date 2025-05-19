'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { FilePlus2, Search } from 'lucide-react';

import Link from 'next/link';

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterValue: string;
  actionButtonText?: React.ReactNode;
  modalChildren?: React.ReactNode;
  newTabLink?: string;
  searchPlaceholder: string;
  noHeader?: true;
};

export default function DataTable<TData, TValue>({
  columns,
  data,
  filterValue,
  searchPlaceholder,
  noHeader,
  newTabLink,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center py-4 gap-2">
          <Search />
          <Input
            placeholder={searchPlaceholder}
            value={(table.getColumn(filterValue)?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn(filterValue)?.setFilterValue(event.target.value)}
            className="h-12"
          />
        </div>
        <div className="flex gap-x-2">
          {newTabLink && (
            <Link href={newTabLink}>
              <Button variant="outline">
                <FilePlus2 className="me-1" /> Create category
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className=" border bg-background rounded-lg">
        <Table className="">
          {!noHeader && (
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
          )}

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="max-w-[400px] break-words">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No Results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
