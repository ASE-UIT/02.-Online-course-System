import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/Table/DTColumnHeader";
import { format } from "date-fns";

export const lecturerColumns = [
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
    accessorKey: "name",
    name: "Tên",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TÊN" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">{row.getValue("name")}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "email",
    name: "Email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="EMAIL" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-full items-center">
          <span>{row.getValue("email")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false
  },
  {
    accessorKey: "phoneNumber",
    name: "Số điện thoại",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SỐ ĐIỆN THOẠI" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">
            {row.getValue("phoneNumber")}
          </span>
        </div>
      );
    },
    enableSorting: false
  },
  {
    accessorKey: "roleId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="VỊ TRÍ" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.getValue("roleId")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false
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
    accessorKey: "updateAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NGÀY SỬA GẦN NHẤT" />
    ),
    cell: ({ row }) => {
      const dateValue = row.getValue("updateAt");
      const formattedDate = format(new Date(dateValue), "dd/MM/yyyy");

      return (
        <div className="flex w-[100px] items-center">
          <span>{formattedDate}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false
  },
  {
    accessorKey: "createAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NGÀY TẠO" />
    ),
    cell: ({ row }) => {
      const dateValue = row.getValue("createAt");
      const formattedDate = format(new Date(dateValue), "dd/MM/yyyy");

      return (
        <div className="flex w-[100px] items-center">
          <span>{formattedDate}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false
  }
];
