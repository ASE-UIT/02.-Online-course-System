import { useEffect } from "react";

const RemoveCategories = ({ row }) => {
  useEffect(() => {
    console.log("RemoveCategories: rowData", row);
  }, [row]);

  return <div>RemoveCategories: {row?.id}</div>;
};

export default RemoveCategories;
