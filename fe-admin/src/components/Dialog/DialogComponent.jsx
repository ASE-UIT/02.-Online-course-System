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

const DialogComponent = ({ bodyType, currentPage, id }) => {
  const vietnameseText = () => {
    // CATEGORY_PAGE
    if (currentPage === CURRENT_PAGES.CATEGORY_PAGE) {
      return "danh mục";
    } else if (currentPage === CURRENT_PAGES.LECTURER_PAGE) {
      return "giảng viên";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {
          {
            [MODAL_BODY_TYPES.ADD]: (
              <Button
                variant="primary"
                className="bg-primary-500 text-white px-4 py-2"
              >
                <span className="text-text/xl/medium pr-6">+</span>
                Thêm
              </Button>
            ),
            [MODAL_BODY_TYPES.EDIT]: <Button className="">Cập nhật</Button>,
            [MODAL_BODY_TYPES.REMOVE]: (
              <Button className=" bg-error-500 px-8">Xoá</Button>
            )
          }[bodyType]
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
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
                <CategoriesModalBody id={id} isAddOrChange={true} />
              ),
              [CURRENT_PAGES.LECTURER_PAGE]: (
                <LecturerModalBody id={id} isAddOrChange={true} />
              )
            }[currentPage]
        }
        {
          // EDIT
          bodyType === MODAL_BODY_TYPES.EDIT &&
            {
              [CURRENT_PAGES.CATEGORY_PAGE]: (
                <CategoriesModalBody id={id} isAddOrChange={false} />
              ),
              [CURRENT_PAGES.LECTURER_PAGE]: (
                <LecturerModalBody id={id} isAddOrChange={false} />
              )
            }[currentPage]
        }
        {
          // REMOVE
          bodyType === MODAL_BODY_TYPES.REMOVE &&
            {
              [CURRENT_PAGES.CATEGORY_PAGE]: <RemoveCategories id={id} />,
              [CURRENT_PAGES.LECTURER_PAGE]: <RemoveLecturer id={id} />
            }[currentPage]
        }
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;