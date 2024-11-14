import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";

export default function Introduction() {
  return (
    <div className="p-[20px]">
      <header className="text-display/md/medium">ẢNH BÌA VÀ VIDEO SALE</header>
      <div className="mt-5">
        <p className="text-text/md/medium">Ảnh bìa</p>
        <div className="py-[20px] border-[1px] border-black-300 border-dashed mt-3 flex flex-col gap-2 items-center justify-center">
          <p className="text-text/sm/regular text-error-500">Chưa có ảnh bìa</p>
          <div className="px-[16px] py-[12px] flex items-center gap-2 bg-primary-500 rounded-[8px] text-white">
            <UploadCloud />
            <p>Tải lên ảnh bìa</p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <p className="text-text/md/medium">Video sale</p>
        <div className="py-[20px] border-[1px] border-black-300 border-dashed mt-3 flex flex-col gap-2 items-center justify-center">
          <p className="text-text/sm/regular text-error-500">Chưa có video</p>
          <div className="px-[16px] py-[12px] flex items-center gap-2 bg-primary-500 rounded-[8px] text-white">
            <UploadCloud />
            <p>Tải lên video</p>
          </div>
        </div>
      </div>
      <Button type="submit" className=" inline-block mt-5 px-8 rounded-xl">
        Lưu
      </Button>
    </div>
  );
}
