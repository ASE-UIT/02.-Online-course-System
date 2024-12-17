import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/Table/DTColumnHeader";
import BlankImg from "/blank.png";
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
  // {
  //   accessorKey: "avatar",
  //   name: "Ảnh đại diện",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="ẢNH ĐẠI DIỆN" />
  //   ),
  //   cell: ({ row }) => {
  //     const avatar = row.getValue("avatar");

  //     if (!avatar) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex w-[100px] items-center">
  //         <img
  //           src={avatar.value || BlankImg}
  //           alt="avatar"
  //           className="w-16 h-16"
  //         />
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  //   enableSorting: false
  // },
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
    accessorKey: "createAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TẠO VÀO NGÀY" />
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
    accessorKey: "updateAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SỬA VÀO NGÀY" />
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
    accessorKey: "isApproved",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TRẠNG THÁI DUYỆT" />
    ),
    cell: ({ row }) => {
      const isApproved = row.getValue("isApproved");
      return (
        <div className="flex items-center">
          <span
            className={`px-2 py-1 rounded font-bold ${
              isApproved ? "bg-green-600 text-white" : "bg-red-600 text-white"
            }`}
          >
            {isApproved ? "Đã duyệt" : "Chưa duyệt"}
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
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CHỨC DANH" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("role")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false
  },
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ĐÁNH GIÁ" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("rating")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false
  },
  {
    accessorKey: "course",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SỐ LƯỢNG KHOÁ HỌC" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("course")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false
  }
];
