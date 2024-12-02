import { closestCenter, DndContext } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ChevronLeft, GripVertical, PenLine, PlusIcon, Trash2 } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import AddSelectionForm from "./AddSelectionForm";
import { Button } from "@/components/ui/button";
import { useUpdateCourseMutation } from "@/store/rtk/course.services";
import DeleteModal from "./DeleteModal";
export default function QuizzList({ onClose, moduleSlt, course }) {
  const [quizzes, setQuizzes] = useState([]);
  const [quizzSlt, setQuizSlt] = useState(-1);
  const [quizzDeleteSlt, setQuizDeleteSlt] = useState(-1);
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setQuizzes((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const oldArr = arrayMove(items, oldIndex, newIndex);
        const newArr = oldArr.map((item, idx) => {
          return { ...item, order: idx + 1 };
        });
        return newArr;
      });
    }
  };
  const handleSaveQuiz = async (quizzes) => {
    const newQuizzes = quizzes.map((quiz) => {
      if (quiz.id.startsWith("temp-")) {
        delete quiz.id;
      }
      return quiz;
    });
    const newModule = { ...moduleSlt };
    newModule.quizzes = newQuizzes;
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
  };
  const handleDeleteQuiz = async () => {
    const tmpQuizzes = quizzes.filter((quiz, id) => id !== quizzDeleteSlt);
    const newQuizzes = tmpQuizzes.map((item, idx) => {
      return { ...item, order: idx + 1 };
    });
    const newModule = { ...moduleSlt };
    newModule.quizzes = newQuizzes;
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
  };
  useEffect(() => {
    if (moduleSlt?.quizzes) {
      const idx = course?.lessonParts?.findIndex((module) => module.id === moduleSlt.id);
      if (idx > -1) setQuizzes(course.lessonParts[idx].quizzes);
    }
  }, [moduleSlt, course]);

  return (
    <div>
      {quizzSlt === -1 && (
        <>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <div
                onClick={() => onClose()}
                className="px-2 py-2 rounded-full hover:bg-gray-500 transition-all cursor-pointer"
              >
                <ChevronLeft />
              </div>
              <header className="text-display/md/medium">CÂU HỎI TRẮC NGHIỆM</header>
            </div>
            <div
              onClick={() => {
                const id = nanoid();
                const newQuiz = {
                  id: `temp-${id}`,
                  order: quizzes.length + 1,
                  content: `temp-${id}`,
                  explanation: null,
                  choiceA: null,
                  choiceB: null,
                  choiceC: null,
                  choiceD: null,
                  correctChoices: [],
                };
                const newQuizzes = [...quizzes, newQuiz];
                setQuizzes(newQuizzes);
                handleSaveQuiz(newQuizzes);
              }}
              className="flex items-center justify-center gap-2 bg-primary-500 px-[16px] py-[12px] rounded-[8px] text-white cursor-pointer hover:bg-primary-600 transition-all"
            >
              <PlusIcon className="w-[24px] h-[24px]" />
              <p className="text-text/md/medium">Thêm mới</p>
            </div>
          </div>
          <div className="mt-6">
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={quizzes.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                {quizzes.map((quizz, id) => {
                  return (
                    <QuizRow
                      quizz={quizz}
                      key={id}
                      idx={id}
                      setQuizSlt={setQuizSlt}
                      setQuizDeleteSlt={setQuizDeleteSlt}
                    />
                  );
                })}
              </SortableContext>
            </DndContext>
          </div>
          <Button
            onClick={() => handleSaveQuiz(quizzes)}
            disabled={isLoading}
            type="submit"
            className=" inline-block mt-5 px-8 rounded-xl"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-[3px] border-t-transparent border-white rounded-full animate-spin"></div>
            ) : (
              "Lưu"
            )}
          </Button>
        </>
      )}
      {quizzSlt !== -1 && (
        <AddSelectionForm
          quizz={quizzes[quizzSlt]}
          quizzes={quizzes}
          quizzSlt={quizzSlt}
          onClose={() => {
            setQuizSlt(-1);
          }}
          course={course}
          moduleSlt={moduleSlt}
        />
      )}
      {quizzDeleteSlt !== -1 && (
        <DeleteModal
          onClose={() => {
            setQuizDeleteSlt(-1);
          }}
          title="Bạn có chắc muốn xóa câu hỏi trắc nghiệm này"
          msg="Câu hỏi này sẽ bị xóa vĩnh viễn, bạn có chắc muốn tiếp tục"
          handleDelete={() => {
            handleDeleteQuiz();
          }}
        />
      )}
    </div>
  );
}
const QuizRow = ({ quizz, setQuizSlt, idx, setQuizDeleteSlt }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: quizz.id });
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
  return (
    <div ref={setNodeRef} style={style} {...attributes} className="flex items-center cursor-pointer gap-4 mt-3 ">
      <GripVertical {...headerProps} className="text-gray-500" />
      <div className="w-full px-4 py-2 bg-gray-300 min-h-[50px] text-text/md/medium line-clamp-1 leading-[2] select-none">
        {quizz.content}
      </div>
      <div className="flex items-center gap-2">
        <div
          onClick={() => setQuizSlt(idx)}
          className="w-[24px] hover:bg-gray-500 transition-all h-[24px] text-center bg-gray-300 rounded-full flex justify-center items-center"
        >
          <PenLine className="w-[16px] h-[16px] text-black-300" />
        </div>
        <div
          onClick={() => setQuizDeleteSlt(idx)}
          className="w-[24px] hover:bg-gray-500 transition-all h-[24px] text-center bg-gray-300 rounded-full flex justify-center items-center"
        >
          <Trash2 className="w-[16px] h-[16px] text-black-300" />
        </div>
      </div>
    </div>
  );
};
