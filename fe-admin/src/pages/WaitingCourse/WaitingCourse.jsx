import DataTable from "@/components/Table/DataTable";
import { waitingCourseColumns } from "./CourseColumns";
import { waitingCourseList } from "./CourseList";
import { useEffect, useState } from "react";
import { CURRENT_PAGES } from "@/utils/globalUtils";
import { getWaitingCourseWithPage } from "@/api/courseApi";

const WaitingCourse = () => {
  const [columnVisibility, setColumnVisibility] = useState({
    select: true,
    id: true,
    thumbnail: true,
    name: true,
    category: true,
    shortDescription: true,
    createdBy: false,
    createAt: true,
    updateAt: true,
    startDate: false,
    endDate: false,
    status: true
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rpp, setRpp] = useState(10);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getWaitingCourseWithPage(rpp, page + 1);
        console.log("WaitingCourse", response.data.data.items);
        setData(response.data.data.items);
        setTotal(response.data.data.total);
        // Handle the response here
      } catch (error) {
        console.log("WaitingCourse error", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [rpp, page]);

  return (
    <div className="flex px-10 gap-10">
      {/* <div className="filter basis-1/4">
        <Filter manage={"category"} />
      </div> */}
      <div className="">
        <DataTable
          data={data}
          columns={waitingCourseColumns}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
          headerList={waitingCourseList}
          pageName={CURRENT_PAGES.WAITING_COURSE_PAGE}
          loading={loading}
          setLoading={setLoading}
          rpp={rpp}
          setRpp={setRpp}
          page={page}
          setPage={setPage}
          total={total}
        />
      </div>
    </div>
  );
};

export default WaitingCourse;
