import DataTable from "@/components/Table/DataTable";
import { lecturerColumns } from "./LecturerColumns";
import { lecturerList } from "./LecturerList";
import DialogComponent from "@/components/Dialog/DialogComponent";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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

  const addButton = (
    <Button variant="primary" className="bg-primary-500 text-white px-4 py-2">
      <span className="text-text/xl/medium pr-6">+</span>
      Thêm
    </Button>
  );

  return (
    <div>
      <DataTable
        data={data}
        columns={lecturerColumns}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
        headerList={lecturerList}
        dialogButton={
          <DialogComponent
            triggerButton={addButton}
            title="Thêm giảng viên mới"
            description={null}
            content={null}
          />
        }
      />
    </div>
  );
};

export default ManageLecturer;
