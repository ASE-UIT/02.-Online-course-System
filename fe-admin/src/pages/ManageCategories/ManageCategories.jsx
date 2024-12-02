import Filter from "@/components/Filter/Filter";
import DataTable from "@/components/Table/DataTable";

const ManageCategories = () => {
  return (
    <div className="flex px-10 gap-10">
      <div className="filter basis-1/4">
        <Filter manage={"category"} />
      </div>
      <div className="filter basis-3/4">
      <DataTable />
      </div>
    </div>
  );
};

export default ManageCategories;
