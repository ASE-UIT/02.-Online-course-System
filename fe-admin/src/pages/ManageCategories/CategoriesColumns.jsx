import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/Table/DTColumnHeader";
import BlankImg from "/blank.png";

export const categoriesColumns = [
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
      let avatar = row.getValue("thumbnail");

      if (!avatar || typeof avatar !== "string") {
        avatar = BlankImg;
      } else {
        avatar = avatar.startsWith("blob:") ? avatar.slice(5) : avatar;
        try {
          new URL(avatar);
        } catch (e) {
          console.log("Invalid URL", e);
          avatar = BlankImg;
        }
      }

      return (
        <div className="flex w-[100px] items-center">
          <img
            src={avatar}
            alt="thumbnail"
            className="w-16 h-16"
            onError={(e) => {
              e.target.src = BlankImg;
            }}
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
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "totalCourse",
    name: "Số khóa học",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SÔ KHOÁ HỌC" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.getValue("totalCourse")}</span>
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
      return (
        <div className="flex items-center">
          <span>{row.getValue("updateAt")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false
  }
];
