import Filter from "@/components/Filter/Filter";
import DataTable from "@/components/Table/DataTable";
import { categoriesColumns } from "./CategoriesColumns";
import { categoriesList } from "./CategoriesList";
import { useState } from "react";
import { CURRENT_PAGES } from "@/utils/globalUtils";

const data = [
  {
    id: "TASK-8782",
    thumbnail:
      "https://www.figma.com/design/H2xQOXOAcFuJXgFATi9VqE/Copy-Place?node-id=129-1780&m=dev",
    name: "Danh mục 1",
    totalCourse: 100,
    createdBy: "ADMIN",
    updateAt: "2021-10-10"
  },
  {
    id: "TASK-7878",
    thumbnail:
      "https://www.figma.com/design/H2xQOXOAcFuJXgFATi9VqE/Copy-Place?node-id=129-1780&m=dev",
    name: "Danh mục 1",
    totalCourse: 100,
    createdBy: "ADMIN",
    updateAt: "2021-10-10"
  },
  {
    id: "TASK-7839",
    thumbnail:
      "https://www.figma.com/design/H2xQOXOAcFuJXgFATi9VqE/Copy-Place?node-id=129-1780&m=dev",
    name: "Danh mục 1",
    totalCourse: 100,
    createdBy: "ADMIN",
    updateAt: "2021-10-10"
  }
];

// const changeButton = (
//   <Button variant="primary" className="bg-primary-500 text-white px-4 py-2">
//     Cập nhật
//   </Button>
// );

const ManageCategories = () => {
  const [columnVisibility, setColumnVisibility] = useState({});

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
