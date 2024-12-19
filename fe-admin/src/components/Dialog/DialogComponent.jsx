import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { MODAL_BODY_TYPES, CURRENT_PAGES } from "@/utils/globalUtils";
import CategoriesModalBody from "./Category/CategoriesModalBody";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import RemoveCategories from "./Category/RemoveCategories";
import LecturerModalBody from "./Lecturer/LecturerModalBody";
import RemoveLecturer from "./Lecturer/RemoveLecturer";
import EmployeeModalBody from "./Employee/EmployeeModalBody";
import RemoveEmployee from "./Employee/RemoveEmployee";
import { set } from "date-fns";

const DialogComponent = ({
  bodyType,
  currentPage,
  row,
  setLoading,
  reload
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const vietnameseText = () => {
    // CATEGORY_PAGE
    if (currentPage === CURRENT_PAGES.CATEGORY_PAGE) {
      return "danh mục";
    } else if (currentPage === CURRENT_PAGES.LECTURER_PAGE) {
      return "giảng viên";
    } else if (currentPage === CURRENT_PAGES.EMPLOYEE_PAGE) {
      return "nhân viên";
    } else if (currentPage === CURRENT_PAGES.WAITING_COURSE_PAGE) {
      return "khoá học";
    }
  };

  const handleClostDialog = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {
          {
            [MODAL_BODY_TYPES.ADD]: (
              <Button
                variant="primary"
                className="bg-primary-500 text-white px-4 py-2"
                onClick={() => setIsOpen(true)}
              >
                <span className="text-text/xl/medium pr-6">+</span>
                Thêm
              </Button>
            ),
            [MODAL_BODY_TYPES.EDIT]: (
              <Button className="" onClick={() => setIsOpen(true)}>
                Cập nhật
              </Button>
            ),
            [MODAL_BODY_TYPES.REMOVE]: (
              <Button
                className=" bg-error-500 px-8"
                onClick={() => setIsOpen(true)}
              >
                Xoá
              </Button>
            )
          }[bodyType]
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-screen overflow-y-scroll px-4 py-8 mb-16">
        <DialogHeader>
          <DialogTitle>
            {
              {
                [MODAL_BODY_TYPES.ADD]: `Thêm ${vietnameseText()} mới`,
                [MODAL_BODY_TYPES.EDIT]: `Chỉnh sửa ${vietnameseText()}`,
                [MODAL_BODY_TYPES.REMOVE]: `Xoá ${vietnameseText()}`
              }[bodyType]
            }
          </DialogTitle>
          <DialogDescription>
            {
              {
                [MODAL_BODY_TYPES.REMOVE]: `Bạn chắc chắn muồn xoá ${vietnameseText()} này?`
              }[bodyType]
            }
          </DialogDescription>
        </DialogHeader>
        {
          // ADD
          bodyType === MODAL_BODY_TYPES.ADD &&
            {
              [CURRENT_PAGES.CATEGORY_PAGE]: (
                <CategoriesModalBody
                  row={row}
                  isAddOrChange={true}
                  setLoading={setLoading}
                />
              ),
              [CURRENT_PAGES.LECTURER_PAGE]: (
                <LecturerModalBody
                  row={row}
                  isAddOrChange={true}
                  setLoading={setLoading}
                />
              ),
              [CURRENT_PAGES.EMPLOYEE_PAGE]: (
                <EmployeeModalBody
                  row={row}
                  isAddOrChange={true}
                  setLoading={setLoading}
                />
              ),
              [CURRENT_PAGES.WAITING_COURSE_PAGE]: (
                <EmployeeModalBody
                  row={row}
                  isAddOrChange={true}
                  setLoading={setLoading}
                />
              )
            }[currentPage]
        }
        {
          // EDIT
          bodyType === MODAL_BODY_TYPES.EDIT &&
            {
              [CURRENT_PAGES.CATEGORY_PAGE]: (
                <CategoriesModalBody row={row} isAddOrChange={false} />
              ),
              [CURRENT_PAGES.LECTURER_PAGE]: (
                <LecturerModalBody row={row} isAddOrChange={false} />
              ),
              [CURRENT_PAGES.EMPLOYEE_PAGE]: (
                <EmployeeModalBody row={row} isAddOrChange={false} />
              ),
              [CURRENT_PAGES.WAITING_COURSE_PAGE]: (
                <EmployeeModalBody row={row} isAddOrChange={false} />
              )
            }[currentPage]
        }
        {
          // REMOVE
          bodyType === MODAL_BODY_TYPES.REMOVE &&
            {
              [CURRENT_PAGES.CATEGORY_PAGE]: (
                <RemoveCategories
                  row={row}
                  setLoading={setLoading}
                  handleClostDialog={handleClostDialog}
                  reload={reload}
                />
              ),
              [CURRENT_PAGES.LECTURER_PAGE]: <RemoveLecturer row={row} />,
              [CURRENT_PAGES.EMPLOYEE_PAGE]: (
                <RemoveEmployee
                  row={row}
                  setLoading={setLoading}
                  handleClostDialog={handleClostDialog}
                />
              )
            }[currentPage]
        }
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
