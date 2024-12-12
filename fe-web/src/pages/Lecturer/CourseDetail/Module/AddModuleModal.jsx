import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateCourseMutation } from "@/store/rtk/course.services";
import { useEffect, useState } from "react";

export default function AddModuleModal({ onClose, course, editModuleIdx }) {
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();
  const [moduleName, setModuleName] = useState("");
  const handleAddModule = async () => {
    if (editModuleIdx !== -1) {
      const oldModules = course?.lessonParts || [];
      const newModules = JSON.parse(JSON.stringify([...oldModules]));
      newModules[editModuleIdx].partName = moduleName;
      const payload = {
        lessonParts: newModules,
      };
      await updateCourse({ courseId: course.id, payload });
      onClose();
      return;
    }

    const oldModules = course?.lessonParts || [];
    const newModules = [
      ...oldModules,
      {
        courseId: course.id,
        partName: moduleName,
        partNo: oldModules.length + 1,
        lessons: [],
        quizzes: [],
      },
    ];
    const payload = {
      lessonParts: newModules,
    };
    await updateCourse({ courseId: course.id, payload });
    onClose();
  };
  useEffect(() => {
    if (editModuleIdx !== -1 && course) {
      setModuleName(course.lessonParts[editModuleIdx].partName || "");
    }
  }, [editModuleIdx, course]);
  return (
    <div
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed top-0 right-0 left-0 bottom-0 bg-black/40 z-[9999] flex items-center justify-center"
    >
      <div className="bg-white p-[20px] rounded-lg w-[500px]">
        <header className="text-[24px] font-semibold">
          {editModuleIdx !== -1 ? "Đổi tên phần học" : "Thêm phần học mới"}
        </header>
        <p className="text-[16px] mt-1">Tên phần học</p>

        <Input
          className="border-gray-600 mt-2"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
          placeholder={"Nhập tên phần học mới"}
        />
        <Button
          onClick={() => handleAddModule()}
          type="submit"
          className=" inline-block mt-5 px-8 text-[16px] rounded-xl"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-[3px] border-t-transparent border-white rounded-full animate-spin"></div>
          ) : (
            `${editModuleIdx !== -1 ? "Cập nhật" : "Thêm mới"}`
          )}
        </Button>
      </div>
    </div>
  );
}
