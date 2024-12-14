import DataTable from "@/components/Table/DataTable";
import { waitingCourseColumns } from "./CourseColumns";
import { waitingCourseList } from "./CourseList";
import { useEffect, useState } from "react";
import { CURRENT_PAGES } from "@/utils/globalUtils";
import { getWaitingCourseWithPage } from "@/api/courseApi";

const WaitingCourse = () => {
  const [columnVisibility, setColumnVisibility] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getWaitingCourseWithPage(100, 1);
        console.log("WaitingCourse", response.data.data.items);
        setData(response.data.data.items);
        // Handle the response here
      } catch (error) {
        console.log("WaitingCourse error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex px-10 gap-10">
      {/* <div className="filter basis-1/4">
        <Filter manage={"category"} />
      </div> */}
      <div className="filter basis-3/4">
        <DataTable
          data={data}
          columns={waitingCourseColumns}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
          headerList={waitingCourseList}
          pageName={CURRENT_PAGES.WAITING_COURSE_PAGE}
        />
      </div>
    </div>
  );
};

export default WaitingCourse;
