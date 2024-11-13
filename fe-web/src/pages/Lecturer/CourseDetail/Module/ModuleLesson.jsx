import { FileText, Pen, PlusIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import AddLessonForm from "./AddLessonForm";
const lessons = [
  {
    name: "Bài 1: Giới thiệu",
  },
  {
    name: "Bài 2: Giới thiệu",
  },

  {
    name: "Bài 3: Giới thiệu",
  },
  {
    name: "Bài 4: Giới thiệu",
  },
];
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
      <div className="flex gap-2">
        <Pen className="w-[16px] h-[16px] text-primary-400" />
        <Trash2 className="w-[16px] h-[16px] text-error-500" />
      </div>
    ),
    width: "8%",
  },
];
export default function ModuleLesson() {
  const [showAddLessonForm, setShowAddLessonForm] = useState(false);
  return (
    <div className="p-[20px]">
      {!showAddLessonForm && (
        <div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-display/md/medium">DANH SÁCH BÀI HỌC</p>
              <p className="text-text/md/medium">(Giữ và kéo thả để sắp xếp vị trí phần học và bài họ)</p>
            </div>
            <div className="flex items-center py-[10px] px-[16px] bg-primary-500 rounded-[8px] gap-2 text-white cursor-pointer hover:bg-primary-600 transition-all">
              <PlusIcon />
              <p className="text-text/md/medium">Phần học mới</p>
            </div>
          </div>
          <div className="w-full p-[10px] border-[1px] border-gray-500 rounded-[4px] mt-4">
            <table className="w-full">
              <thead>
                <tr className="border-b-[1px]">
                  {LESSONS_TABLE_HEADER.map((header) => (
                    <th
                      key={header.label}
                      className={` text-start py-2  text-base-black`}
                      style={{ width: header.width }}
                    >
                      <span className="text-text/md/regular">{header.label}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lessons.map((lesson, index) => {
                  return (
                    <tr key={`row-${index}`} className={`border-b-[1px] border-dashed	`}>
                      <td className={`text-start text-text/md/regular items-center  border-gray-300 py-3 flex gap-2`}>
                        <FileText className="w-[16px] h-[16px]" />
                        <p>{lesson.name}</p>
                      </td>
                      <td className={`text-start text-text/md/regular  border-gray-300 py-3`}>{}</td>
                      <td className={`text-start text-text/md/regular  border-gray-300 py-3`}>{}</td>
                      <td className={`text-start text-text/md/regular  border-gray-300 py-3`}>{}</td>
                      <td className={`text-start text-text/md/regular  border-gray-300 py-3`}>{}</td>
                      <td className={`text-start text-text/md/regular  border-gray-300 py-3`}>
                        <div className="flex gap-2">
                          <Pen className="w-[16px] cursor-pointer h-[16px] text-primary-400" />
                          <Trash2 className="w-[16px] cursor-pointer h-[16px] text-error-500" />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex gap-3 mt-2 items-center">
              <div
                onClick={() => {
                  setShowAddLessonForm(true);
                }}
                className="flex items-center py-[10px] px-[16px] bg-success-600 rounded-[8px] gap-2 text-white cursor-pointer hover:bg-success-700 transition-all"
              >
                <PlusIcon />
                <p className="text-text/md/medium">Bài học mới</p>
              </div>
              <div className="flex items-center py-[10px] px-[16px] bg-warning-700 rounded-[8px] gap-2 text-white cursor-pointer hover:bg-warning-800 transition-all">
                <PlusIcon />
                <p className="text-text/md/medium">Bài trắc nghiệm</p>
              </div>
              <p className="text-text/md/regular">Một phần học nên có một bài trắc nghiệm</p>
            </div>
          </div>
        </div>
      )}
      {showAddLessonForm && <AddLessonForm setShowAddLessonForm={setShowAddLessonForm} />}
    </div>
  );
}
