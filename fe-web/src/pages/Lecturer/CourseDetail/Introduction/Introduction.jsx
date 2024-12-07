import { mediaApi } from "@/api/media";
import { Button } from "@/components/ui/button";
import { useUpdateCourseMutation } from "@/store/rtk/course.services";
import { UploadCloud } from "lucide-react";
import { useRef, useState } from "react";

export default function Introduction({ course }) {
  const fileInputRef = useRef(null);
  const [errorEmptyFile, setErrorEmptyFile] = useState(false);
  const [updateCourse] = useUpdateCourseMutation();
  const [fileSlt, setFileSlt] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadClick = () => {
    setErrorEmptyFile(false);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleUploadImage = async () => {
    if (!validateFileEmpty()) return;
    setIsLoading(true);
    if (fileSlt) {
      const newUrl = await uploadImageLesson();
      const payload = {
        thumbnail: newUrl,
      };
      await updateCourse({ courseId: course.id, payload });
    }
    setIsLoading(false);
  };
  const uploadImageLesson = async () => {
    //Get random url video
    const fileUrlResponse = await mediaApi.getImageUrl();
    if (!fileUrlResponse?.data) return;

    //Upload video to backend
    const formData = new FormData();
    formData.append("file", fileSlt);
    await mediaApi.uploadImage(fileUrlResponse.data.fileName, formData);
    return fileUrlResponse.data.mediaUrl;
  };
  const validateFileEmpty = () => {
    if (fileSlt || showImageTitle) return true;
    setErrorEmptyFile(true);
    return false;
  };
  const showImageTitle = course?.thumbnail ? true : false;
  return (
    <div className="p-[20px]">
      <header className="text-display/md/medium">ẢNH BÌA VÀ VIDEO SALE</header>
      <div>
        <p className="text-text/md/medium">Ảnh bìa</p>
        <div
          className={`${
            errorEmptyFile ? "border-error-500 bg-error-50" : "border-black-300"
          } py-[20px] border-[1px]  border-dashed mt-3 flex flex-col gap-2 items-center justify-center`}
        >
          {!fileSlt && (
            <>
              {!showImageTitle && <p className="text-text/sm/regular text-error-500">Chưa có ảnh bìa</p>}
              {showImageTitle && <p>Đã có ảnh bìa</p>}
            </>
          )}
          {fileSlt && <p>{fileSlt.name}</p>}
          <div
            onClick={() => handleUploadClick()}
            className="cursor-pointer hover:bg-primary-600 transition-all px-[16px] py-[12px] flex items-center gap-2 bg-primary-500 rounded-[8px] text-white"
          >
            <UploadCloud />
            <p>Tải lên ảnh bìa</p>
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => setFileSlt(e.target.files?.[0])}
            style={{ display: "none" }}
          />
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
      <Button
        onClick={() => {
          handleUploadImage();
        }}
        type="submit"
        className=" inline-block mt-5 px-8 rounded-xl"
      >
        {isLoading ? (
          <div className="w-4 h-4 border-[3px] border-t-transparent border-white rounded-full animate-spin"></div>
        ) : (
          "Lưu"
        )}
      </Button>
    </div>
  );
}
