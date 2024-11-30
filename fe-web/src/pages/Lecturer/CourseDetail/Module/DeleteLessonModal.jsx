import { useUpdateCourseMutation } from "@/store/rtk/course.services";

export default function DeleteLessonModal({ onClose, course, moduleSlt, isEditForm }) {
  const [updateCourse] = useUpdateCourseMutation();

  const handleDeleteLesson = async () => {
    const lessons = moduleSlt.lessons.filter((lesson, idx) => idx !== isEditForm);
    const newLessons = lessons.map((ls, idx) => ({ ...ls, order: idx + 1 }));
    const newModule = { ...moduleSlt };
    newModule.lessons = newLessons;

    const newLessonParts = course.lessonParts.map((module) => {
      if (module.id === newModule.id) return newModule;
      return module;
    });
    await updateCourse({
      courseId: course.id,
      payload: {
        lessonParts: newLessonParts,
      },
    });
    onClose();
  };
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed top-0 right-0 left-0 bottom-0 bg-black/40 z-[9999] flex items-center justify-center"
    >
      <div className="bg-white p-[20px] rounded-lg w-[500px]">
        <header className="text-[24px] font-semibold">Bạn có chăc muốn xóa bài học này</header>
        <p>Bạn học này sẽ bị xóa vĩnh viễn, bạn có chắc muốn tiếp tục</p>
        <div className="flex items-center gap-4 mt-4">
          <div
            onClick={() => onClose()}
            className="px-6 py-2 rounded-md  cursor-pointer hover:bg-gray-400 transition-all"
          >
            Hủy bỏ
          </div>
          <div
            onClick={() => {
              handleDeleteLesson();
            }}
            className="px-6 py-2 rounded-md bg-primary-500 text-white cursor-pointer hover:bg-primary-600 transition-all"
          >
            Tiếp tục
          </div>
        </div>
      </div>
    </div>
  );
}
