import { ChevronLeft, VideoIcon } from "lucide-react";

export default function AddLessonForm({ setShowAddLessonForm }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div
          onClick={() => setShowAddLessonForm(false)}
          className="px-2 py-2 rounded-full hover:bg-gray-500 transition-all cursor-pointer"
        >
          <ChevronLeft />
        </div>
        <header className="text-display/md/medium">THÊM BÀI HỌC MỚI</header>
      </div>
      <div className="py-[20px] border-[1px] border-black-300 border-dashed mt-3 flex flex-col gap-2 items-center justify-center">
        <p className="text-text/md/regular">Video bài học</p>
        <p className="text-text/sm/regular text-error-500">Chưa có video</p>
        <div className="px-[16px] py-[12px] flex items-center gap-2 bg-primary-500 rounded-[8px] text-white">
          <VideoIcon />
          <p>Tải lên video</p>
        </div>
        <p className="text-text/md/regular">Hoặc nhập link video Youtube</p>
      </div>
    </div>
  );
}
