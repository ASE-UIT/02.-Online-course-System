import { useSortable } from "@dnd-kit/sortable";
import { FileText, Pen, Trash2 } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";

export default function LessonCard({ lesson }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: lesson.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    position: isDragging ? "relative" : "static",
    opacity: isDragging ? 0.9 : 1,
  };
  return (
    <tr
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      key={lesson.id}
      style={style}
      className="border-b-[1px] bg-white border-dashed"
    >
      <td className="text-start text-text/md/regular items-center border-gray-300 py-3 flex gap-2">
        <FileText className="w-[16px] h-[16px]" />
        <p>{lesson.name}</p>
      </td>
      <td className="text-start text-text/md/regular border-gray-300 py-3" />
      <td className="text-start text-text/md/regular border-gray-300 py-3" />
      <td className="text-start text-text/md/regular border-gray-300 py-3" />
      <td className="text-start text-text/md/regular border-gray-300 py-3" />
      <td className="text-start text-text/md/regular border-gray-300 py-3">
        <div className="flex gap-2">
          <Pen className="w-[16px] cursor-pointer h-[16px] text-primary-400" />
          <Trash2 className="w-[16px] cursor-pointer h-[16px] text-error-500" />
        </div>
      </td>
    </tr>
  );
}
