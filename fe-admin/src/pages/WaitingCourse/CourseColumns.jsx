import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/Table/DTColumnHeader";
import BlankImg from "/blank.png";
import { format } from "date-fns";

export const waitingCourseColumns = [
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
    accessorKey: "thumbnail",
    name: "Ảnh đại diện",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ẢNH ĐẠI DIỆN" />
    ),
    cell: ({ row }) => {
      const avatar = row.getValue("thumbnail");

      if (!avatar) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <img
            src={avatar.value || BlankImg}
            alt="thumbnail"
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
    accessorKey: "name",
    name: "Tên",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TÊN" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="lg:max-w-[300px] font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "shortDescription",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="MÔ TẢ" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex md:max-w-[400px] items-center">
          <span>{row.getValue("shortDescription")}</span>
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
    accessorKey: "updateAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LẦN SỬA CUỐI" />
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
      <DataTableColumnHeader column={column} title="TẠO VÀO LÚC" />
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
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TRẠNG THÁI" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");

      return (
        <div className="flex items-center md:min-w-[80px] truncate">
          <span
            className={`px-2 py-1 rounded font-bold ${
              status === "WAITING_FOR_APPROVAL"
                ? "bg-blue-600 text-white"
                : status === "PUBLISHED"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {status === "WAITING_FOR_APPROVAL"
              ? "Chờ duyệt"
              : status === "PUBLISHED"
              ? "Đã duyệt"
              : "Từ chối"}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NGÀY BẮT ĐẦU" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("startDate")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NGÀY KẾT THÚC" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("endDate")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false
  }
];
