import Filter from "@/components/Filter/Filter";
import DataTable from "@/components/Table/DataTable";
import { categoriesColumns } from "./CategoriesColumns";
import { categoriesList } from "./CategoriesList";
import { useEffect, useState } from "react";
import { CURRENT_PAGES } from "@/utils/globalUtils";
import { use } from "react";
import { getAllCategories } from "@/api/courseApi";

// const changeButton = (
//   <Button variant="primary" className="bg-primary-500 text-white px-4 py-2">
//     Cập nhật
//   </Button>
// );

const ManageCategories = () => {
  const [columnVisibility, setColumnVisibility] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await getAllCategories();
      setData(res.data);
    }
    fetchData();
  }, []);

  return (
    <div className="flex px-10 gap-10">
      <div className="filter basis-1/4">
        <Filter manage={"category"} />
      </div>
      <div className="filter basis-3/4">
        <DataTable
          data={data}
          columns={categoriesColumns}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
          headerList={categoriesList}
          pageName={CURRENT_PAGES.CATEGORY_PAGE}
        />
      </div>
    </div>
  );
};

export default ManageCategories;
