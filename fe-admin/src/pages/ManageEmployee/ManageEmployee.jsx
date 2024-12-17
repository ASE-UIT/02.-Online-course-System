import DataTable from "@/components/Table/DataTable";
import { lecturerColumns } from "./EmployeeColumns";
import { employeeList } from "./EmployeeList";
import { useEffect, useState } from "react";
import { CURRENT_PAGES } from "@/utils/globalUtils";
import { getAllEmployee } from "@/api/employeeApi";

const ManageEmployee = () => {
  const [columnVisibility, setColumnVisibility] = useState({
    name: true,
    roleId: true,
    email: true,
    phoneNumber: true,
    createdBy: false,
    updateAt: true,
    createAt: false
  });
  const [loading, setLoading] = useState(false);
  const [rpp, setRpp] = useState(10);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    function fetchData() {
      setLoading(true);
      getAllEmployee(10, 1)
        .then((res) => {
          console.log("Employee ", res);
          setData(res.data.items);
          setTotal(res.data.total);
        })
        .catch((err) => {
          console.log(err);
        });

      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div>
      <DataTable
        data={data}
        columns={lecturerColumns}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
        headerList={employeeList}
        pageName={CURRENT_PAGES.EMPLOYEE_PAGE}
        loading={loading}
        setLoading={setLoading}
        rpp={rpp}
        setRpp={setRpp}
        page={page}
        setPage={setPage}
        total={total}
      />
    </div>
  );
};

export default ManageEmployee;
