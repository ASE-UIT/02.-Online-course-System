import { AlertCircleIcon, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";

export default function VideoViewer() {
  const { videoUrl } = useSelector((state) => state.learning);

  return (
    <div className="bg-gray-100">
      <div className="w-full h-[500px]">
        <ReactPlayer
          width="100%"
          height="100%"
          style={{ backgroundColor: "#000" }}
          controls={true}
          url={videoUrl || "https://files.vidstack.io/sprite-fight/720p.mp4"}
        />
      </div>
      <div className="mt-[20px] flex justify-end gap-[10px] px-[20px]">
        <div className="cursor-pointer hover:bg-gray-600 transition-all flex items-center gap-[8px] px-[8px] py-[6px] bg-gray-500 rounded-[4px]">
          <AlertCircleIcon className="w-[24px] h-[24px]" />
          <p className="text-text/lg/regular">Báo lỗi</p>
        </div>
        <div className="cursor-pointer hover:bg-gray-600 transition-all flex items-center gap-[8px] px-[8px] py-[6px] bg-gray-500 rounded-[4px]">
          <p className="text-text/lg/regular">Tự động phát</p>

          <div className="w-[20px] flex items-center h-[12px] bg-black-300 rounded-full">
            <div className="w-[4px] h-[4px] ml-[4px] bg-white rounded-full"></div>
          </div>
        </div>
        <div className="cursor-pointer hover:bg-primary-600 transition-all flex items-center gap-[8px] px-[8px] py-[6px] bg-primary-500 text-white rounded-[4px]">
          <p className="text-text/lg/regular">Bài sau</p>
          <ChevronRight className="w-[24px] h-[24px]" />
        </div>
      </div>
    </div>
  );
}
