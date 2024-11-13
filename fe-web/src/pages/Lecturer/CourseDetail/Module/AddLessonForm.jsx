import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import UploadBar from "../../components/UploadBar";
import { Button } from "@/components/ui/button";
const formSchema = z.object({
  title: z.string().min(1, {
    message: "Vui lòng nhập tên bài học",
  }),
  intro: z.string().min(1, {
    message: "Vui lòng nhập giới thiệu cho khóa học",
  }),
});
export default function AddLessonForm({ setShowAddLessonForm }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      summary: "",
      intro: "",
    },
  });
  async function onSubmit(values) {
    console.log(values);
  }
  return (
    <div>
      <div className="flex items-center gap-2">
        <div
          onClick={() => setShowAddLessonForm(false)}
          className="px-2 py-2 rounded-full hover:bg-gray-500 transition-all cursor-pointer"
        >
          <ChevronLeft />
        </div>
        <header className="text-display/md/medium">THÊM BÀI HỌC MỚI</header>
      </div>
      <div className="py-[20px] border-[1px] border-black-300 border-dashed mt-3 flex flex-col gap-2 items-center justify-center">
        <p className="text-text/md/regular">Video bài học</p>
        <p className="text-text/sm/regular text-error-500">Chưa có video</p>
        <div className="px-[16px] py-[12px] flex items-center gap-2 bg-primary-500 rounded-[8px] text-white">
          <VideoIcon />
          <p>Tải lên video</p>
        </div>
        <p className="text-text/md/regular">Hoặc nhập link video Youtube</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-12">
          <div className="gap-5 flex flex-col w-full">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text/md/medium">
                    Tiêu đề<span className="text-error-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input className="border-gray-600 w-full" placeholder={field.value} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text/md/medium">Mô tả ngắn</FormLabel>
                  <FormControl>
                    <Input className="border-gray-600 w-full" placeholder={field.value} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Khóa học miễn phí
              </label>
            </div>
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text/md/medium">Giới thiệu</FormLabel>
                  <FormControl>
                    <Textarea className="border-gray-600 w-full h-[200px]" placeholder={field.value} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="">
              <p className="text-text/md/medium mb-2">Tài liệu Khoá học</p>
              <UploadBar />
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
