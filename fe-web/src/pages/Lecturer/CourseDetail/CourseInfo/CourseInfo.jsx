import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name_course: z.string().min(6, {
    message: "Vui lòng nhập tên khóa học",
  }),
  name_course_en: z.string().min(6, {
    message: "Vui lòng nhập tên khóa học bằng tiếng Anh",
  }),
  summary: z.string().min(1, {
    message: "Vui lòng nhập mô tả khóa học",
  }),
  category: z.string().min(1, {
    message: "Vui lòng nhập danh mục của khóa học",
  }),
  date_open: z.date({
    required_error: "Vui lòng chọn ngày mở",
  }),
  date_close: z.date({
    required_error: "Vui lòng chọn ngày kết thúc",
  }),
  original_price: z
    .number({
      invalid_type_error: "Vui lòng nhập số hợp lệ",
    })
    .min(1, {
      message: "Vui lòng nhập giá gốc khóa học",
    }),
  link_ref: z.string().min(1, {
    message: "Vui lòng nhập liên kết nhóm",
  }),
  link: z.string().min(1, {
    message: "Vui lòng đường dẫn khóa học",
  }),
  lecturer_account: z.string().min(1, {
    message: "Vui lòng tài khoản giảng viên",
  }),
  lecturer_profile: z.string().min(1, {
    message: "Vui lòng thông tin giảng viên",
  }),
  tags: z.string().min(1, {
    message: "Vui lòng nhập tags",
  }),
  description: z.string().min(1, {
    message: "Vui lòng nhập description",
  }),
});

export default function CourseInfo() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name_course: "",
      name_course_en: "",
      summary: "",
      category: "",
      date_open: "",
      date_close: "",
      original_price: "",
      link_ref: "",
      link: "",
      lecturer_profile: "",
      lecturer_account: "",
      tags: "",
      description: "",
    },
  });
  async function onSubmit(values) {
    console.log(values);
  }
  return (
    <div className="p-[20px]">
      <header className="text-display/md/medium">THÔNG TIN CƠ BẢN</header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-4">
          <div className="flex items-start gap-5 w-full">
            <div className="basis-[50%] flex flex-col gap-3">
              <FormField
                control={form.control}
                name="name_course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text/md/medium">
                      Tên khóa học<span className="text-error-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input className="border-gray-600" placeholder={field.value} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name_course_en"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text/md/medium">
                      Tên khóa học tiếng anh<span className="text-error-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input className="border-gray-600" autoComplete="email" placeholder={field.value} {...field} />
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
                    <FormLabel className="text-text/md/medium">
                      Mô tả ngắn<span className="text-error-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input className="border-gray-600" autoComplete="email" placeholder={field.value} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text/md/medium">
                      Danh mục khóa học<span className="text-error-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input className="border-gray-600" autoComplete="email" placeholder={field.value} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date_open"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1 mt-1">
                    <FormLabel className="text-text/md/medium">Ngày mở miễn phí</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal border-gray-600 border-[1px] ",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span className="font-worksans">Chọn ngày bắt đầu</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 " align="start">
                        <Calendar
                          mode="single"
                          className={"border-gray-300"}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date_close"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1 mt-1">
                    <FormLabel className="text-text/md/medium">Ngày đóng miễn phí</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal border-gray-600 border-[1px] ",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span className="font-worksans">Chọn ngày kết thúc</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 " align="start">
                        <Calendar
                          mode="single"
                          className={"border-gray-300"}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="basis-[50%] flex flex-col gap-3">
              <FormField
                control={form.control}
                name="original_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text/md/medium">
                      Giá gốc<span className="text-error-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input className="border-gray-600" placeholder={field.value} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="link_ref"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text/md/medium">
                      Liên kết nhóm trên mạng xã hội<span className="text-error-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input className="border-gray-600" placeholder={field.value} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text/md/medium">
                      Đường dẫn khoá học<span className="text-error-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input className="border-gray-600" placeholder={field.value} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lecturer_profile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text/md/medium">
                      Tài khoản giảng viên<span className="text-error-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input className="border-gray-600" placeholder={field.value} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lecturer_account"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text/md/medium">
                      Profile giảng viên<span className="text-error-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input className="border-gray-600" placeholder={field.value} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text/md/medium">
                      Tags (cách nhau bởi dấu phẩy)<span className="text-error-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input className="border-gray-600" placeholder={field.value} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Khóa học miễn phí
            </label>
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-text/md/medium">
                  Giới thiệu khoá học<span className="text-error-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea className="border-gray-600 h-[180px]" placeholder={field.value} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className=" inline-block mt-5 px-8 rounded-xl">
            Lưu
          </Button>
        </form>
      </Form>
    </div>
  );
}
