import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Pen, PlusIcon, Trash2 } from "lucide-react";
import LessonCard from "./LessonCard";
import { closestCenter, DndContext, useSensor, useSensors } from "@dnd-kit/core";
import { MouseSensor2 } from "./MouseSensorCustom";

export function ModuleCard({
  module,
  setItems,
  handleShowAddSelectionForm,
  handleShowAddLessonForm,
  handleShowDeleteLessonForm,
  setEditModuleIdx,
  setDeleteModule,
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: module.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    position: isDragging ? "relative" : "static",
    opacity: isDragging ? 0.9 : 1,
  };
  const headerProps = {
    ...listeners,
    className: "drag-handle cursor-grab",
  };
  const sensors = useSensors(
    useSensor(MouseSensor2, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  const handleDragEndLesson = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = module.lessons.findIndex((lesson) => lesson.id === active.id);
      const newIndex = module.lessons.findIndex((lesson) => lesson.id === over.id);
      const newLessonOrder = [...module.lessons];
      // Move the dragged lesson to its new position
      const [movedLesson] = newLessonOrder.splice(oldIndex, 1);
      newLessonOrder.splice(newIndex, 0, movedLesson);

      // Update the module's lesson order in setItems
      setItems((prevItems) => {
        const oldArr = prevItems.map((item) => (item.id === module.id ? { ...item, lessons: newLessonOrder } : item));
        return oldArr.map((module) => {
          const newLesson = module.lessons.map((lesson, id) => ({ ...lesson, order: id + 1 }));
          return {
            ...module,
            lessons: newLesson,
          };
        });
      });
    }
  };
  const LESSONS_TABLE_HEADER = [
    {
      label: "Phần I: MỞ ĐẦU",
      width: "42%",
    },
    {
      label: "Học thứ",
      width: "10%",
    },

    {
      label: "Xem",
      width: "8%",
    },
    {
      label: "Thời lượng",
      width: "15%",
    },
    {
      label: "Ngày cập nhật",
      width: "17%",
    },
    {
      label: (
        <div data-no-dnd="true" className="flex gap-2">
          <Pen onClick={() => setEditModuleIdx()} className="w-[16px] h-[16px] text-primary-400" />
          <Trash2 onClick={() => setDeleteModule()} className="w-[16px] h-[16px] text-error-500" />
        </div>
      ),
      width: "8%",
    },
  ];
  if (!module) return <></>;
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`w-full bg-white p-[10px] border-[1px] border-gray-500 rounded-[4px] mt-4`}
    >
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndLesson}>
        <SortableContext items={module.lessons.map((lesson) => lesson.id)} strategy={verticalListSortingStrategy}>
          <table className="w-full">
            <thead>
              <tr
                className={`border-b-[1px] ${isDragging ? "cursor-grabbing" : "cursor-grab hover:cursor-grab"}`}
                {...headerProps}
              >
                {LESSONS_TABLE_HEADER.map((header, id) => (
                  <th key={id} className="text-start py-2 text-base-black" style={{ width: header.width }}>
                    <span className="text-text/md/regular">{id === 0 ? module.partName : header.label}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {module?.lessons?.length === 0 && (
                <tr className="text-black-300">
                  <td>Chưa có bài học nào.</td>
                </tr>
              )}
              {module?.lessons &&
                module?.lessons?.length > 0 &&
                module.lessons.map((lesson, idx) => (
                  <LessonCard
                    lesson={lesson}
                    key={lesson.id}
                    handleShowEditLessonForm={() => {
                      handleShowAddLessonForm(module, idx);
                    }}
                    handleShowDeleteLessonForm={() => {
                      handleShowDeleteLessonForm(module, idx);
                    }}
                  />
                ))}
            </tbody>
          </table>
        </SortableContext>
      </DndContext>
      <div className="flex gap-3 mt-2 items-center">
        <div
          onClick={() => handleShowAddLessonForm(module, -1)}
          className="flex items-center py-[10px] px-[16px] bg-success-600 rounded-[8px] gap-2 text-white cursor-pointer hover:bg-success-700 transition-all"
        >
          <PlusIcon />
          <p className="text-text/md/medium">Bài học mới</p>
        </div>
        <div
          onClick={() => handleShowAddSelectionForm(module, -1)}
          className="flex items-center py-[10px] px-[16px] bg-warning-700 rounded-[8px] gap-2 text-white cursor-pointer hover:bg-warning-800 transition-all"
        >
          <p className="text-text/md/medium">Câu hỏi trắc nghiệm</p>
        </div>
        <p className="text-text/md/regular">Một phần học nên có một bài trắc nghiệm</p>
      </div>
    </div>
  );
}
