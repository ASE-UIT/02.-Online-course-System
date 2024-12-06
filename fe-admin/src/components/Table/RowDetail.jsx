import { CURRENT_PAGES, MODAL_BODY_TYPES } from "@/utils/globalUtils";
import DialogComponent from "../Dialog/DialogComponent";
import BlankImg from "/blank.png";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";

const RowDetail = ({ row, headerList, pageName }) => {
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
          {pageName === CURRENT_PAGES.LECTURER_PAGE && (
            <Button
              variant="secondary"
              className=" text-white px-4 py-2"
              onClick={() => {
                window.open(
                  "https://eduhub.io.vn/web/lecturer/course",
                  "_blank"
                );
              }}
            >
              Xem trên web
              <ExternalLink size={16} className="ml-1" />
            </Button>
          )}
          <DialogComponent
            bodyType={MODAL_BODY_TYPES.EDIT}
            currentPage={pageName}
            id={row.id}
          />
          <DialogComponent
            bodyType={MODAL_BODY_TYPES.REMOVE}
            currentPage={pageName}
            id={row.id}
          />
        </div>
      </div>
    </div>
  );
};

export default RowDetail;
