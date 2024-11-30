import { mediaApi } from "@/api/media";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateCourseMutation } from "@/store/rtk/course.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, GripVertical, PlusIcon, Trash2, UploadCloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
  question: z.string().min(1, {
    message: "Vui lòng nhập câu hỏi",
  }),
  explanation: z.string().min(1, {
    message: "Vui lòng nhập giải thích đáp án",
  }),
});
const mapChoice = {
  1: "A",
  2: "B",
  3: "C",
  4: "D",
};
export default function AddSelectionForm({ onClose, quizz, quizzes, quizzSlt, moduleSlt, course }) {
  const fileInputRef = useRef(null);
  const [fileSlt, setFileSlt] = useState(null);
  const [updateCourse] = useUpdateCourseMutation();

  const [corChoices, setCorChoices] = useState([]);
  const [choices, setChoices] = useState({
    choiceA: "",
    choiceB: "",
    choiceC: "",
    choiceD: "",
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      explanation: "",
    },
  });
  async function onSubmit(values) {
    const newQuizz = {
      ...quizz,
      content: values.question,
      explanation: values.explanation,
      correctChoices: corChoices,
      choiceA: choices.choiceA,
      choiceB: choices.choiceB,
      choiceC: choices.choiceC,
      choiceD: choices.choiceD,
    };
    if (newQuizz.id.startsWith("temp-")) delete newQuizz.id;
    const newQuizzes = [...quizzes];
    newQuizzes[quizzSlt] = newQuizz;
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
  }

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  useEffect(() => {
    if (quizz) {
      form.setValue("explanation", quizz?.explanation || "");
      form.setValue("question", quizz?.content || "");
      setChoices({
        choiceA: quizz?.choiceA || "",
        choiceB: quizz?.choiceB || "",
        choiceC: quizz?.choiceC || "",
        choiceD: quizz?.choiceD || "",
      });
      setCorChoices(quizz?.correctChoices || []);
    }
  }, [quizz, form]);

  return (
    <div>
      <div className="flex items-center gap-2">
        <div
          onClick={() => onClose()}
          className="px-2 py-2 rounded-full hover:bg-gray-500 transition-all cursor-pointer"
        >
          <ChevronLeft />
        </div>
        <header className="text-display/md/medium">THÊM BÀI TRẮC NGHIỆM</header>
      </div>
      <div className="py-[20px] border-[1px] border-black-300 border-dashed mt-3 flex flex-col gap-2 items-center justify-center">
        <p className="text-text/md/regular">Hình ảnh</p>
        {fileSlt && <p>{fileSlt.name}</p>}
        {!fileSlt && <p className="text-text/sm/regular text-error-500">Chưa có hình ảnh</p>}
        <div
          onClick={() => handleUploadClick()}
          className="cursor-pointer hover:bg-primary-600 transition-all px-[16px] py-[12px] flex items-center gap-2 bg-primary-500 rounded-[8px] text-white"
        >
          <UploadCloud />
          <p>Tải lên hình ảnh</p>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => setFileSlt(e.target.files?.[0])}
          style={{ display: "none" }}
        />
      </div>
      {/* <div className="mt-4">
        <p className="text-text/md/medium">Loại câu trắc nghiệm</p>
        <RadioGroup defaultValue="option-one" className="flex items-center mt-2 gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one" className="cursor-pointer  !text-text/md/regular">
              Một lựa chọn
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two" className="cursor-pointer !text-text/md/regular">
              Nhiều lựa chọn
            </Label>
          </div>
        </RadioGroup>
      </div> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-12">
          <div className="gap-5 flex flex-col w-full">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text/md/medium">
                    Câu hỏi trắc nghiệm<span className="text-error-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input className="border-gray-600 w-full" placeholder={field.value} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="explanation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text/md/medium">
                    Giải thích đáp án<span className="text-error-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea className="border-gray-600 w-full h-[150px]" placeholder={field.value} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <p className="text-text/md/medium">Lựa chọn (ít nhất 2 lựa chọn)</p>
              {[1, 2, 3, 4].map((vl, idx) => {
                const choiceValue = mapChoice[vl];
                const key = Object.keys(choices)[vl - 1];
                return (
                  <div key={idx} className="flex items-center cursor-pointer gap-4 mt-2">
                    <GripVertical className="text-gray-500" />
                    <Checkbox
                      id="option-one"
                      checked={corChoices.includes(mapChoice[vl])}
                      onCheckedChange={() => {
                        setCorChoices((prev) => {
                          if (prev.includes(choiceValue)) {
                            return prev.filter((item) => item !== choiceValue);
                          } else {
                            return [...prev, choiceValue];
                          }
                        });
                      }}
                    />
                    <Input
                      className="px-4"
                      placeholder={"Nhập lựa chọn"}
                      value={choices[key]}
                      onChange={(e) => {
                        setChoices((prev) => ({ ...prev, [key]: e.target.value }));
                      }}
                    />
                    <div className="flex items-center gap-2">
                      <div className="w-[24px] hover:bg-gray-500 transition-all h-[24px] text-center bg-gray-300 rounded-full flex justify-center items-center">
                        <PlusIcon className="w-[16px] h-[16px] text-black-300" />
                      </div>
                      <div className="w-[24px] hover:bg-gray-500 transition-all h-[24px] text-center bg-gray-300 rounded-full flex justify-center items-center">
                        <Trash2 className="w-[16px] h-[16px] text-black-300" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Button type="submit" className=" inline-block mt-5 px-8 rounded-xl">
            Lưu
          </Button>
        </form>
      </Form>
    </div>
  );
}
