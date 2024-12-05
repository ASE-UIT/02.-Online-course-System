import DialogComponent from "@/components/Dialog/DialogComponent";
import Filter from "@/components/Filter/Filter";
import DataTable from "@/components/Table/DataTable";
import { Button } from "@/components/ui/button";
import { categoriesColumns } from "./CategoriesColumns";
import { categoriesList } from "./CategoriesList";
import { useState } from "react";

const data = [
  {
    id: "TASK-8782",
    avatar:
      "https://www.figma.com/design/H2xQOXOAcFuJXgFATi9VqE/Copy-Place?node-id=129-1780&m=dev",
    name: "Danh mục 1",
    course: 100,
    createdBy: "ADMIN"
  },
  {
    id: "TASK-7878",
    avatar:
      "https://www.figma.com/design/H2xQOXOAcFuJXgFATi9VqE/Copy-Place?node-id=129-1780&m=dev",
    name: "Danh mục 1",
    course: 100,
    createdBy: "ADMIN"
  },
  {
    id: "TASK-7839",
    avatar:
      "https://www.figma.com/design/H2xQOXOAcFuJXgFATi9VqE/Copy-Place?node-id=129-1780&m=dev",
    name: "Danh mục 1",
    course: 100,
    createdBy: "ADMIN"
  }
];

const addButton = (
  <Button variant="primary" className="bg-primary-500 text-white px-4 py-2">
    <span className="text-text/xl/medium pr-6">+</span>
    Thêm
  </Button>
);

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
          dialogButton={
            <DialogComponent
              triggerButton={addButton}
              title="Thêm danh mục"
              description={null}
              content={null}
            />
          }
        />
      </div>
    </div>
  );
};

export default ManageCategories;
