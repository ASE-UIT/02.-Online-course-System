// ModuleLesson.jsx
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import AddLessonForm from "./AddLessonForm";
import AddSelectionForm from "./AddSelectionForm";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ModuleCard } from "./ModuleCard";
const modules = [
  {
    id: "1",
    part: "Phần I: MỞ ĐẦU",
    lesson: [
      {
        id: "I1",
        name: "Bài 1: Giới thiệu",
      },
      { id: "I2", name: "Bài 2: Giới thiệu" },
      {
        id: "I3",
        name: "Bài 3: Giới thiệu",
      },
      {
        id: "I4",
        name: "Bài 4: Giới thiệu",
      },
    ],
  },
  {
    id: "2",
    part: "Phần II : GIỚI THIỆU",
    lesson: [
      { id: "II1", name: "Bài 1: Giới thiệu" },
      { id: "II2", name: "Bài 2: Giới thiệu" },
      { id: "II3", name: "Bài 3: Giới thiệu" },
      { id: "II4", name: "Bài 4: Giới thiệu" },
    ],
  },
  {
    id: "3",
    part: "Phần III : KẾT THÚC",
    lesson: [
      { id: "III1", name: "Bài 1: Giới thiệu" },
      { id: "III2", name: "Bài 2: Giới thiệu" },

      { id: "III3", name: "Bài 3: Giới thiệu" },
      { id: "III4", name: "Bài 4: Giới thiệu" },
    ],
  },
];

// CustomPointerSensor.js

export class CustomPointerSensor extends PointerSensor {
  static activators = [
    {
      eventName: "onPointerDown",
      handler: ({ nativeEvent: event }) => {
        // Chỉ cho phép drag khi click vào phần tử có class 'drag-handle'
        if (!event.target.closest(".drag-handle")) {
          return false;
        }
        return true;
      },
    },
  ];
}
export default function ModuleLesson() {
  const [items, setItems] = useState(modules);
  const [showAddLessonForm, setShowAddLessonForm] = useState(false);
  const [showAddSelectionForm, setShowAddSelectionForm] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  useEffect(() => {
    console.log(items);
  }, [items]);
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
                <ModuleCard key={module.id} module={module} setItems={setItems} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      )}
      {showAddLessonForm && <AddLessonForm setShowAddLessonForm={setShowAddLessonForm} />}
      {showAddSelectionForm && <AddSelectionForm setShowAddSelectionForm={setShowAddSelectionForm} />}
    </div>
  );
}
