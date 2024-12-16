import DataTable from "@/components/Table/DataTable";
import { lecturerColumns } from "./EmployeeColumns";
import { lecturerList } from "./EmployeeList";
import { useState } from "react";
import { CURRENT_PAGES } from "@/utils/globalUtils";

const data = [
  {
    id: "EMP-001",
    name: "Nguyễn Văn A",
    roleId: "ROLE-001",
    email: "email@gmail.com",
    phoneNumber: "+84 123 456 789",
    createdBy: "ADMIN",
    updateAt: "2024-12-30T12:00:00Z",
    createAt: "2024-12-30T12:00:00Z",
  },
  {
    id: "EMP-002",
    name: "Trần Thị B",
    roleId: "ROLE-002",
    email: "tranthib@gmail.com",
    phoneNumber: "+84 987 654 321",
    createdBy: "ADMIN",
    updateAt: "2024-12-30T12:00:00Z",
    createAt: "2024-12-30T12:00:00Z",
  },
  {
    id: "EMP-003",
    name: "Lê Văn C",
    roleId: "ROLE-003",
    email: "levanc@gmail.com",
    phoneNumber: "+84 456 789 123",
    createdBy: "ADMIN",
    updateAt: "2024-12-30T12:00:00Z",
    createAt: "2024-12-30T12:00:00Z",
  },
];

const ManageEmployee = () => {
  const [columnVisibility, setColumnVisibility] = useState({
    name: true,
    roleId: true,
    email: true,
    phoneNumber: true,
    createdBy: true,
    updateAt: false,
    createAt: false,
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

export default ManageEmployee;
