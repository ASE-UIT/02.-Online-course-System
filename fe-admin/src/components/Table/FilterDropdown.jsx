import { DataTableViewOptions } from "./data-table-view-options";

export function FilterDropdown({ table }) {
  return (
    <div className="flex items-center justify-between">
      <DataTableViewOptions table={table} />
    </div>
  );
}
