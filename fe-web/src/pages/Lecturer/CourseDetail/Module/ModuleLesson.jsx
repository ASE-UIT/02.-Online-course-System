// ModuleLesson.jsx
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { DndContext, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ModuleCard } from "./ModuleCard";
import { MouseSensor2 } from "./MouseSensorCustom";
import { Button } from "@/components/ui/button";
import { useUpdateCourseMutation } from "@/store/rtk/course.services";
import AddLessonForm from "./AddLessonForm";
import DeleteLessonModal from "./DeleteLessonModal";
import QuizzList from "./QuizzList";

export default function ModuleLesson({ course }) {
  const [items, setItems] = useState([]);
  const [showAddLessonForm, setShowAddLessonForm] = useState(false);
  const [showAddSelectionForm, setShowAddSelectionForm] = useState(false);
  const [showDeleteLessonForm, setShowDeleteLessonForm] = useState(false);
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();
  const [moduleSlt, setModuleSlt] = useState(null);
  const [isEditForm, setIsEditForm] = useState(-1);
  const sensors = useSensors(
    useSensor(MouseSensor2, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const oldArr = arrayMove(items, oldIndex, newIndex);
        const newArr = oldArr.map((item, idx) => {
          return { ...item, partNo: idx + 1 };
        });
        return newArr;
      });
    }
  };
  const handleUpdateModule = async () => {
    await updateCourse({
      courseId: course.id,
      payload: {
        lessonParts: items,
      },
    });
  };
  const handleShowAddLessonForm = (module, lessonIdx) => {
    setShowAddLessonForm(true);
    setModuleSlt(module);
    setIsEditForm(lessonIdx);
  };
  const handleShowAddSelectionForm = (module, lessonIdx) => {
    setShowAddSelectionForm(true);
    setModuleSlt(module);
    setIsEditForm(lessonIdx);
  };
  const handleShowDeleteLessonForm = (module, lessonIdx) => {
    setShowDeleteLessonForm(true);
    setModuleSlt(module);
    setIsEditForm(lessonIdx);
  };
  useEffect(() => {
    if (course?.lessonParts?.length > 0) {
      setItems(course.lessonParts);
    }
  }, [course]);
  return (
    <div className="p-[20px]">
      {!showAddLessonForm && !showAddSelectionForm && (
        <div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-display/md/medium">DANH SÁCH BÀI HỌC</p>
              <p className="text-text/md/medium">(Giữ và kéo thả để sắp xếp vị trí phần học và bài học)</p>
            </div>
            <div className="flex items-center py-[10px] px-[16px] bg-primary-500 rounded-[8px] gap-2 text-white cursor-pointer hover:bg-primary-600 transition-all">
              <PlusIcon />
              <p className="text-text/md/medium">Phần học mới</p>
            </div>
          </div>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
              {items.map((module) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  setItems={setItems}
                  handleShowAddSelectionForm={handleShowAddSelectionForm}
                  handleShowAddLessonForm={handleShowAddLessonForm}
                  handleShowDeleteLessonForm={handleShowDeleteLessonForm}
                />
              ))}
            </SortableContext>
          </DndContext>

          <Button
            disabled={isLoading}
            onClick={handleUpdateModule}
            type="submit"
            className=" inline-block mt-5 px-8 rounded-xl"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-[3px] border-t-transparent border-white rounded-full animate-spin"></div>
            ) : (
              "Lưu thay đổi"
            )}
          </Button>
        </div>
      )}
      {showAddLessonForm && (
        <AddLessonForm
          onClose={() => {
            setIsEditForm(-1);
            setShowAddLessonForm(false);
          }}
          course={course}
          moduleSlt={moduleSlt}
          isEditForm={isEditForm}
        />
      )}
      {showDeleteLessonForm && (
        <DeleteLessonModal
          course={course}
          moduleSlt={moduleSlt}
          isEditForm={isEditForm}
          onClose={() => {
            setIsEditForm(-1);
            setShowDeleteLessonForm(false);
          }}
        />
      )}
      {showAddSelectionForm && (
        <QuizzList
          onClose={() => {
            setIsEditForm(-1);
            setShowAddSelectionForm(false);
          }}
          course={course}
          moduleSlt={moduleSlt}
        />
      )}
    </div>
  );
}
