import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import Searchbar from "../Searchbar/Searchbar";
import PenLineIcon from "@/assets/PenLineIcon";
import DialogComponent from "../Dialog/DialogComponent";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const data = [
  {
    id: "1",
    name: "Phần mềm",
    thumbnail: "https://via.placeholder.com/150",
    courses: 5,
    createdBy: "Admin"
  },
  {
    id: "2",
    name: "Phần mềm",
    thumbnail: "https://via.placeholder.com/150",
    courses: 3,
    createdBy: "Admin"
  },
  {
    id: "3",
    name: "Phần mềm",
    thumbnail: "https://via.placeholder.com/150",
    courses: 8,
    createdBy: "Admin"
  }
];

export const columns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>
  },
  {
    accessorKey: "thumbnail",
    header: "Ảnh đại diện",
    cell: ({ row }) => (
      <div>
        <img
          src={row.getValue("thumbnail")}
          alt="Thumbnail"
          style={{ width: "50px", height: "50px" }}
        />
      </div>
    )
  },
  {
    accessorKey: "name",
    header: "Tên",
    cell: ({ row }) => <div>{row.getValue("name")}</div>
  },
  {
    accessorKey: "courses",
    header: "Số khoá học",
    cell: ({ row }) => <div>{row.getValue("courses")}</div>
  },
  {
    accessorKey: "createdBy",
    header: "Tạo bởi",
    cell: ({ row }) => <div>{row.getValue("createdBy")}</div>
  },
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => alert(`Change ${user.id}`)}
            className="p-1 hover:text-primary-600"
          >
            <PenLineIcon className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => alert(`Change ${user.id}`)}
            className="p-1 text-error-500 hover:text-error-600"
          >
            <Trash2 className="w-6 h-6" />
          </Button>
        </div>
      );
    }
  }
];

export default function DataTable() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [dialogContentValue, setDialogContentValue] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  const addButton = (
    <Button variant="primary" className="bg-primary-500 text-white px-10 py-2">
      Thêm
    </Button>
  );

  const dialogContent = (
    <Label className="text-text/md/medium">
      <span>Tên</span>
      <Input
        className="border-gray-600"
        type="text"
        placeholder={dialogContentValue}
        onChange={(event) => setDialogContentValue(event.target.value)}
      />
    </Label>
  );

  return (
    <div className="h-full min-w-[calc(100vh-320px-40px)] space-y-5">
      <div className="w-full flex gap-[10px]">
        <Searchbar
          placeholder="Tìm kiếm gì đó"
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
        />

        <DialogComponent
          triggerButton={addButton}
          title="Thêm"
          description={null}
          content={null}
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="border-r text-text/md/semibold"
                    >
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
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border-r ">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Không có dữ liệu.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} trên{" "}
          {table.getFilteredRowModel().rows.length} hàng được chọn
        </div> */}
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Trước
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Sau
          </Button>
        </div>
      </div>
    </div>
  );
}
