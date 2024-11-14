import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripVertical, PlusIcon, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
  target: z.string(),
  welcome: z.string(),
});
export default function TargetInfo() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      target: "",
      welcome: "",
    },
  });
  async function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className="p-[20px]">
      <header className="text-display/md/medium">MỤC TIÊU KHÓA HỌC</header>
      <div className="mt-2 text-text/md/medium">
        <p>Học viên sẽ học được gì trong khóa học</p>
        <div className="flex items-center cursor-pointer gap-4 mt-3">
          <GripVertical className="text-gray-500" />
          <Input className="px-4" placeholder={"Nhập lựa chọn"} />
          <div className="flex items-center gap-2">
            <div className="w-[24px] hover:bg-gray-500 transition-all h-[24px] text-center bg-gray-300 rounded-full flex justify-center items-center">
              <PlusIcon className="w-[16px] h-[16px] text-black-300" />
            </div>
            <div className="w-[24px] hover:bg-gray-500 transition-all h-[24px] text-center bg-gray-300 rounded-full flex justify-center items-center">
              <Trash2 className="w-[16px] h-[16px] text-black-300" />
            </div>
          </div>
        </div>
        <div className="flex items-center cursor-pointer gap-4 mt-3">
          <GripVertical className="text-gray-500" />
          <Input className="px-4" placeholder={"Nhập lựa chọn"} />
          <div className="flex items-center gap-2">
            <div className="w-[24px] hover:bg-gray-500 transition-all h-[24px] text-center bg-gray-300 rounded-full flex justify-center items-center">
              <PlusIcon className="w-[16px] h-[16px] text-black-300" />
            </div>
            <div className="w-[24px] hover:bg-gray-500 transition-all h-[24px] text-center bg-gray-300 rounded-full flex justify-center items-center">
              <Trash2 className="w-[16px] h-[16px] text-black-300" />
            </div>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-8">
            <div className="gap-5 flex flex-col w-full">
              <FormField
                control={form.control}
                name="target"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text/md/medium">Khoá học này dành cho đối tượng nào?</FormLabel>
                    <FormControl>
                      <Textarea className="border-gray-600 w-full h-[150px]" placeholder={field.value} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="target"
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
            <Button type="submit" className=" inline-block mt-5 px-8 rounded-xl">
              Lưu
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
