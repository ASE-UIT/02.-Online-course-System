import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import BlankImg from "/blank.png";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px] border-gray-600 shadow-md"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px] border-gray-600 shadow-md"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="#"
        className="font-semibold text-black"
      />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] font-semibold text-black">{row.index + 1}</div>
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "avatar",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ẢNH ĐẠI DIỆN" />
    ),
    cell: ({ row }) => {
      const avatar = row.getValue("avatar");

      if (!avatar) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <img
            src={avatar.value || BlankImg}
            alt="avatar"
            className="w-16 h-16"
          />
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TÊN" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "course",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SÔ KHOÁ HỌC" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.getValue("course")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "createdBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TẠO BỞI" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("createdBy")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
];
