import Filter from "@/components/Filter/Filter";
import DataTable from "@/components/Table/DataTable";
import { categoriesColumns } from "./CategoriesColumns";
import { categoriesList } from "./CategoriesList";
import { useEffect, useState } from "react";
import { CURRENT_PAGES } from "@/utils/globalUtils";
import { getAllCategoriesWithPage } from "@/api/courseApi";

// const changeButton = (
//   <Button variant="primary" className="bg-primary-500 text-white px-4 py-2">
//     Cập nhật
//   </Button>
// );

const ManageCategories = () => {
  const [columnVisibility, setColumnVisibility] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rpp, setRpp] = useState(10);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  async function fetchData() {
    setLoading(true);
    const res = await getAllCategoriesWithPage(rpp, page + 1);
    setData(res.data.items);
    setTotal(res.data.total);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [page, rpp]);

  function reload() {
    fetchData();
  }

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
          loading={loading}
          setLoading={setLoading}
          rpp={rpp}
          setRpp={setRpp}
          page={page}
          setPage={setPage}
          total={total}
          reload={reload}
        />
      </div>
    </div>
  );
};

export default ManageCategories;
