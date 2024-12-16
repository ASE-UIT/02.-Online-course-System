import { CURRENT_PAGES, MODAL_BODY_TYPES } from "@/utils/globalUtils";
import DialogComponent from "../Dialog/DialogComponent";
import BlankImg from "/blank.png";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";
import { useLocation } from "react-router-dom";
import { approveCourse } from "@/api/courseApi";
import { useToast } from "@/hooks/use-toast";
import { set } from "date-fns";

const RowDetail = ({ row, headerList, pageName, setLoading }) => {
  const url = useLocation();
  const { toast } = useToast();
  const headerTranslator = (id) => {
    const header = headerList.find((header) => header.id === id);
    return header ? header.title : id;
  };

  const renderValue = (value) => {
    if (typeof value === "object" && value !== null) {
      if (value?.name) {
        const valueName = JSON.stringify(value?.name);
        return valueName.slice(1, valueName.length - 1);
      }
      return JSON.stringify(value);
    }
    return value;
  };

  const handleApprove = (id) => async () => {
    try {
      setLoading(true);
      const response = await approveCourse(id);
      console.log("Approve course", response);
      toast({
        description: `Duyệt khoá học ${row?.name ? row.name : id} thành công`
      });
      setLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 200);
    } catch (error) {
      console.log("Approve course error", error);
      setLoading(false);
    }
  };

  return (
    <div className="h-full py-4 px-8 flex justify-start items-center">
      <img src={BlankImg} alt="cate detail" className="ml-20" />
      <div className="px-8 flex flex-col md:gap-8 justify-center items-stretch">
        <ul>
          {Object.entries(row).map(([key, value], index) =>
            key === "thumbnail" ||
            key === "id" ||
            key === null ||
            key === " " ? (
              <></>
            ) : (
              <li key={index}>
                <strong>{headerTranslator(key)}:</strong> {renderValue(value)}
              </li>
            )
          )}
        </ul>
        <div className="flex gap-4">
          <>
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
          </>
          <>
            {pageName === CURRENT_PAGES.WAITING_COURSE_PAGE && (
              <Button
                variant="secondary"
                className=" text-white px-4 py-2"
                onClick={() => {
                  window.open(
                    `https://eduhub.io.vn/web/learning/${row.id}`,
                    "_blank"
                  );
                }}
              >
                Chi tiết khoá học
                <ExternalLink size={16} className="ml-1" />
              </Button>
            )}
          </>
          <>
            {pageName === CURRENT_PAGES.WAITING_COURSE_PAGE && (
              <Button
                variant="outline"
                className=" text-black px-4 py-2 border-black"
                onClick={handleApprove(row.id)}
              >
                Duyệt
                {/* <ExternalLink size={16} className="ml-1" /> */}
              </Button>
            )}
          </>

          {pageName !== CURRENT_PAGES.WAITING_COURSE_PAGE && (
            <DialogComponent
              bodyType={MODAL_BODY_TYPES.EDIT}
              currentPage={pageName}
              row={row}
            />
          )}
          <DialogComponent
            bodyType={MODAL_BODY_TYPES.REMOVE}
            currentPage={pageName}
            row={row}
          />
        </div>
      </div>
    </div>
  );
};

export default RowDetail;
