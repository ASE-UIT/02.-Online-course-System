import { Button } from "../ui/button";
import BlankImg from "/blank.png";

const RowDetail = ({ row, headerList }) => {
  const headerTranslator = (id) => {
    const header = headerList.find((header) => header.id === id);
    return header ? header.title : "";
  };

  return (
    <div className="h-[260px] py-4 px-8 flex justify-start items-center">
      <img src={BlankImg} alt="cate detail" className="ml-20" />
      <div className="px-8 flex flex-col md:gap-8 justify-center items-stretch">
        <ul>
          {Object.entries(row).map(([key, value], index) =>
            key === "avatar" || key === "id" ? (
              <></>
            ) : (
              <li key={index}>
                <strong>{headerTranslator(key)}:</strong> {value}
              </li>
            )
          )}
        </ul>
        <div className="flex gap-4">
          <Button className="mt-4">Cập nhật</Button>
          <Button className="mt-4 bg-error-500 px-8">Xoá</Button>
        </div>
      </div>
    </div>
  );
};

export default RowDetail;
