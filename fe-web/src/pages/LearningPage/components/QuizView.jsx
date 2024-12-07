import { Checkbox } from "@/components/ui/checkbox";
import { useAnswerQuizMutation, useGetQuizDoneByCourseIdQuery } from "@/store/rtk/course.services";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function QuizView() {
  const { moduleSlt, course } = useSelector((state) => state.learning);
  const [curQuzIdx, setCurQuzIdx] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const { data: quizRes } = useGetQuizDoneByCourseIdQuery(course.id);
  const [answerQuiz] = useAnswerQuizMutation();
  const tmp = course?.lessonParts && (course?.lessonParts[moduleSlt]?.quizzes || []);
  const quizzes = tmp || [];

  useEffect(() => {
    if (quizzes.length > 0) {
      setCurQuzIdx(0);
      setSelectedAnswers(
        quizzes.map((quiz) => ({
          quizId: quiz.id, // Assuming quizzes have an 'id' field
          choices: [],
          status: "unknown",
        }))
      );
    }
  }, [quizzes]);

  const handleSelection = (quizId, choice) => {
    setSelectedAnswers((prev) =>
      prev.map((answer) =>
        answer.quizId === quizId
          ? {
              ...answer,
              choices: answer.choices.includes(choice)
                ? answer.choices.filter((c) => c !== choice)
                : [...answer.choices, choice],
            }
          : answer
      )
    );
  };

  const handleAnswerQuiz = async () => {
    try {
      setIsLoading(true);
      const responses = await Promise.all(
        selectedAnswers.map(async (answer) => {
          const response = await answerQuiz({
            quizId: answer.quizId,
            choices: answer.choices,
          }).unwrap();
          return {
            quizId: answer.quizId,
            success: response.data.answerResult,
          };
        })
      );

      setSelectedAnswers((prev) =>
        prev.map((answer) => {
          const matchingResponse = responses.find((res) => res.quizId === answer.quizId);
          if (matchingResponse) {
            return {
              ...answer,
              status: matchingResponse.success ? "success" : "failed",
            };
          }
          return answer;
        })
      );
      setIsSuccess(true);
    } catch (error) {
      console.error("Error answering quizzes:", error);
    } finally {
      setIsLoading(false);
    }
  };
  if (curQuzIdx === -1) return <></>;

  return (
    <div className="w-full h-full p-[20px]">
      {!isSuccess && (
        <>
          <p className="text-text/lg/medium">Trắc nghiệm</p>
          <div className="min-h-[350px]">
            {quizzes.map((quiz, idx) => {
              if (idx !== curQuzIdx) return <div key={quiz.id}></div>;
              const currentAnswer = selectedAnswers.find((answer) => answer.quizId === quiz.id) || {};
              return (
                <div key={quiz.id}>
                  <p className="text-text/md/medium my-2">{quiz.content}</p>
                  <div className="flex flex-col gap-3 mt-3">
                    {["A", "B", "C", "D"].map((choice) => (
                      <div className="flex items-center gap-2" key={choice}>
                        <Checkbox
                          id={`quiz-${quiz.id}-choice-${choice}`}
                          checked={currentAnswer.choices?.includes(choice)}
                          onCheckedChange={() => handleSelection(quiz.id, choice)}
                        />
                        <label
                          htmlFor={`quiz-${quiz.id}-choice-${choice}`}
                          className="cursor-pointer text-text/md/regular"
                        >
                          {quiz[`choice${choice}`]}
                        </label>
                      </div>
                    ))}
                  </div>
                  {currentAnswer.status !== "unknown" && (
                    <>
                      <div
                        className={`${
                          currentAnswer.status === "success"
                            ? "bg-success-50 text-success-700"
                            : "bg-error-50 text-error-700"
                        } mt-4 py-[8px] px-[12px]  inline-block text-text/md/medium rounded-[8px]`}
                      >
                        {currentAnswer.status === "success" ? "Bạn đã trả lời đúng!" : "Bạn đã trả lời sai!"}
                      </div>
                      <p className="text-text/lg/medium my-2">Giải thích đáp án:</p>
                      <p>{quiz.explanation}</p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-between">
            {curQuzIdx !== 0 && (
              <button
                onClick={() => {
                  setCurQuzIdx(curQuzIdx - 1);
                }}
                className="w-[150px] flex items-center gap-2 border-[1px] rounded-[8px] justify-center py-[12px] border-gray-500 cursor-pointer hover:bg-gray-300 transition-all"
              >
                <ChevronLeft />
                <p className="text-text/md/medium">Câu trước</p>
              </button>
            )}
            {curQuzIdx === 0 && <div className="min-w-[150px]"></div>}
            <div className="text-text/md/medium">Câu {`${curQuzIdx + 1}/${quizzes.length}`}</div>
            {curQuzIdx !== quizzes.length - 1 && (
              <button
                onClick={() => {
                  setCurQuzIdx(curQuzIdx + 1);
                }}
                disabled={curQuzIdx === quizzes.length - 1}
                className="w-[150px] flex items-center gap-2 border-[1px] rounded-[8px] justify-center py-[12px] border-gray-500 cursor-pointer hover:bg-gray-300 transition-all"
              >
                <p className="text-text/md/medium">Câu tiếp</p>
                <ChevronRight />
              </button>
            )}
            {curQuzIdx === quizzes.length - 1 && (
              <button
                onClick={() => {
                  handleAnswerQuiz();
                }}
                className="w-[150px] flex items-center gap-2 bg-primary-500 text-white border-[1px] rounded-[8px] justify-center py-[12px] border-primary-500 cursor-pointer hover:bg-primary-600 transition-all"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-[3px] border-t-transparent border-white rounded-full animate-spin"></div>
                ) : (
                  <p className="text-text/md/medium">Hoàn thành</p>
                )}
              </button>
            )}
          </div>
        </>
      )}
      {isSuccess && (
        <div>
          <p className="text-text/lg/medium">Tổng kết trắc nghiệm</p>
          <div className="min-h-[350px]">
            <div className="flex-col flex gap-2 my-2">
              {selectedAnswers.map((ans, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <p className="min-w-[50px]">{`Câu ${idx + 1}`}</p>
                  {ans.status === "success" ? "Đúng" : "Sai"}
                </div>
              ))}
            </div>
            <p className="text-text/lg/medium">Bạn đã làm rất tốt!</p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => {
                setIsSuccess(false);
              }}
              className="w-[150px] flex items-center gap-2 border-[1px] rounded-[8px] justify-center py-[12px] border-gray-500 cursor-pointer hover:bg-gray-300 transition-all"
            >
              <ChevronLeft />
              <p className="text-text/md/medium">Quay trở lại</p>
            </button>{" "}
            <button
              onClick={() => {
                setIsSuccess(false);
                setSelectedAnswers(
                  quizzes.map((quiz) => ({
                    quizId: quiz.id, // Assuming quizzes have an 'id' field
                    choices: [],
                    status: "unknown",
                  }))
                );
              }}
              className="w-[150px] flex items-center gap-2 bg-primary-500 text-white border-[1px] rounded-[8px] justify-center py-[12px] border-primary-500 cursor-pointer hover:bg-primary-600 transition-all"
            >
              <p className="text-text/md/medium">Làm lại</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
