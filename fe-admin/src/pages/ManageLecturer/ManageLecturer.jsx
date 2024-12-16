import DataTable from "@/components/Table/DataTable";
import { lecturerColumns } from "./LecturerColumns";
import { lecturerList } from "./LecturerList";
import { useEffect, useState } from "react";
import { CURRENT_PAGES } from "@/utils/globalUtils";
import { getAllLecturers } from "@/api/lecturerApi";

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

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await getAllLecturers(10, 1);
      setData(res.data.items);
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
        headerList={lecturerList}
        pageName={CURRENT_PAGES.LECTURER_PAGE}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};

export default ManageLecturer;
