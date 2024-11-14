import { GripVertical, PlusIcon, Trash2 } from "lucide-react";

export default function UploadBar() {
  return (
    <div className="flex items-center cursor-pointer gap-4">
      <GripVertical className="text-gray-500" />
      <div className="flex items-center border-[1px] border-gray-600 flex-1 rounded-md overflow-hidden text-text/md/medium text-black">
        <div className="px-[12px] py-[10px] w-[150px] text-center bg-gray-500 ">Chọn tệp</div>
        <div className="px-4">Tải lên tài liệu mới</div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-[24px] hover:bg-gray-500 transition-all h-[24px] text-center bg-gray-300 rounded-full flex justify-center items-center">
          <PlusIcon className="w-[16px] h-[16px] text-black-300" />
        </div>
        <div className="w-[24px] hover:bg-gray-500 transition-all h-[24px] text-center bg-gray-300 rounded-full flex justify-center items-center">
          <Trash2 className="w-[16px] h-[16px] text-black-300" />
        </div>
      </div>
    </div>
  );
}
