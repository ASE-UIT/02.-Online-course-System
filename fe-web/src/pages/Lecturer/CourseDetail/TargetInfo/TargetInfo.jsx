import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateCourseMutation } from "@/store/rtk/course.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripVertical, PlusIcon, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import { z } from "zod";
const formSchema = z.object({
  target: z.string(),
  welcome: z.string(),
});
export default function TargetInfo({ course }) {
  const [targets, setTargets] = useState([""]);
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();
  const [txt, setTxt] = useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      target: "",
      welcome: course.welcomeJoin,
    },
  });
  async function onSubmit(values) {
    await updateCourse({
      courseId: course.id,
      payload: {
        courseTargets: targets,
        welcomeJoin: values.welcome,
        participants: values.target,
      },
    });
  }
  const handleUpdateTargets = (e, id) => {
    setTargets((prev) => {
      const newArr = [...prev];
      newArr[id] = e.target.value;
      return newArr;
    });
  };
  useEffect(() => {
    if (course?.courseTargets) {
      setTargets(course.courseTargets);
      form.setValue("target", course.participants);
    }
  }, [course]);
  return (
    <div className="p-[20px] flex-1">
      <header className="text-display/md/medium">MỤC TIÊU KHÓA HỌC</header>
      <div className="mt-2 text-text/md/medium">
        <p>Học viên sẽ học được gì trong khóa học</p>
        {targets.map((target, id) => (
          <div key={id} className="flex items-center cursor-pointer gap-4 mt-3">
            <GripVertical className="text-gray-500" />
            <Input
              className="px-4"
              placeholder={"Nhập lựa chọn"}
              value={target}
              onChange={(e) => handleUpdateTargets(e, id)}
            />
            <div className="flex items-center gap-2">
              <div className="w-[24px] hover:bg-gray-500 transition-all h-[24px] text-center bg-gray-300 rounded-full flex justify-center items-center">
                <PlusIcon
                  onClick={() => {
                    setTargets((prev) => [...prev, ""]);
                  }}
                  className="w-[16px] h-[16px] text-black-300"
                />
              </div>
              <div className="w-[24px] hover:bg-gray-500 transition-all h-[24px] text-center bg-gray-300 rounded-full flex justify-center items-center">
                <Trash2
                  onClick={() => {
                    const newArr = targets.filter((target, idx) => idx !== id);
                    setTargets(newArr);
                  }}
                  className="w-[16px] h-[16px] text-black-300"
                />
              </div>
            </div>
          </div>
        ))}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-8">
            <div className="gap-12 flex flex-col w-full">
              <FormField
                control={form.control}
                name="target"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text/md/medium">Khoá học này dành cho đối tượng nào?</FormLabel>
                    <div className="w-full max-w-full">
                      <ReactQuill theme="snow" className="h-[250px] max-w-full" {...field} />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="welcome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text/md/medium">Chào mừng học viên tham gia lớp học</FormLabel>
                    <FormControl>
                      <Textarea className="border-gray-600 w-full h-[150px]" placeholder={field.value} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isLoading} type="submit" className=" inline-block mt-5 px-8 rounded-xl">
              {isLoading ? (
                <div className="w-4 h-4 border-[3px] border-t-transparent border-white rounded-full animate-spin"></div>
              ) : (
                "Lưu"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
