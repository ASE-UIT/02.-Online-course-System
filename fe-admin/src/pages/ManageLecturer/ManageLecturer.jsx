import DataTable from "@/components/Table/DataTable";
import { lecturerColumns } from "./LecturerColumns";
import { lecturerList } from "./LecturerList";
import { useState } from "react";
import { CURRENT_PAGES } from "@/utils/globalUtils";

const data = [
  {
    id: "TASK-8782",
    avatar:
      "https://www.figma.com/design/H2xQOXOAcFuJXgFATi9VqE/Copy-Place?node-id=129-1780&m=dev",
    name: "Nguyễn Văn A",
    phone: "+84 123 456 789",
    email: "email@gmail.com",
    startDay: "30-12-2024",
    createdBy: "ADMIN",
    role: "Giảng viên",
    rating: 5,
    course: 5
  },
  {
    id: "TASK-8782",
    avatar:
      "https://www.figma.com/design/H2xQOXOAcFuJXgFATi9VqE/Copy-Place?node-id=129-1780&m=dev",
    name: "Nguyễn Văn A",
    phone: "+84 123 456 789",
    email: "email@gmail.com",
    startDay: "30-12-2024",
    createdBy: "Người dùng",
    role: "Giảng viên",
    rating: 5,
    course: 5
  }
];

const ManageLecturer = () => {
  const [columnVisibility, setColumnVisibility] = useState({
    avatar: true,
    name: true,
    phone: true,
    email: true,
    startDay: true,
    createdBy: true,
    role: false,
    rating: false,
    course: false
  });

  return (
    <div>
      <DataTable
        data={data}
        columns={lecturerColumns}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
        headerList={lecturerList}
        pageName={CURRENT_PAGES.LECTURER_PAGE}
      />
    </div>
  );
};

export default ManageLecturer;
