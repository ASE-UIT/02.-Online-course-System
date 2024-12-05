import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

import { DataTablePagination } from "./DTPagination";
import { DataTableViewOptions } from "./DTViewOptions";
import RowDetail from "./RowDetail";

export default function DataTable({
  columns,
  columnVisibility,
  setColumnVisibility,
  data,
  dialogButton,
  headerList
}) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState({});
  const [sorting, setSorting] = React.useState([]);
  const [expandedRows, setExpandedRows] = React.useState({});

  const handleRowClick = (rowId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId]
    }));
  };

  var CollapsibleRowContent = ({ row, headerList }) => (
    <td colSpan={6}>
      <RowDetail row={row} headerList={headerList} />
    </td>
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  });

  return (
    <div className="py-4 rounded-md border space-y-4 bg-[rgba(244,247,252,0.75)] shadow-md">
      <div className="w-full flex justify-end items-center gap-4 px-4">
        {dialogButton}
        <div className="flex items-center justify-between">
          <DataTableViewOptions table={table} headerList={headerList} />
        </div>
      </div>
      <div className="bg-white">
        <Table>
          <TableHeader className="bg-[rgba(244,247,252,0.75)]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => handleRowClick(row.id)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  <Collapsible
                    open={expandedRows[row.id]}
                    className="w-full"
                    asChild
                  >
                    <tr>
                      <CollapsibleContent className="bg-white" asChild>
                        <CollapsibleRowContent
                          row={row.original}
                          headerList={headerList}
                        />
                      </CollapsibleContent>
                    </tr>
                  </Collapsible>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Không có kết quả
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
