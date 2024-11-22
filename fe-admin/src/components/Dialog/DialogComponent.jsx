import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

const DialogComponent = ({ triggerButton, title, description, content }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="w-full">{content}</div>
        <DialogFooter className="sm:justify-end">
          <Button
            type="submit"
            variant="primary"
            className="bg-primary-500 text-white sm:px-10"
          >
            Lưu
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="bg-gray-400 sm:px-10"
            >
              Huỷ
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
