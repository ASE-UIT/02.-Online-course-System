import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, GripVertical, PlusIcon, Trash2, UploadCloud } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
  question: z.string().min(1, {
    message: "Vui lòng nhập câu hỏi",
  }),
  answer: z.string().min(1, {
    message: "Vui lòng nhập giải thích đáp án",
  }),
});
export default function AddSelectionForm({ onClose }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });
  async function onSubmit(values) {
    console.log(values);
  }
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
        <p className="text-text/sm/regular text-error-500">Chưa có hình ảnh</p>
        <div className="px-[16px] py-[12px] flex items-center gap-2 bg-primary-500 rounded-[8px] text-white">
          <UploadCloud />
          <p>Tải lên hình ảnh</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-text/md/medium">Loại câu trắc nghiệm</p>
        <RadioGroup defaultValue="option-one" className="flex items-center mt-2 gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one" className="cursor-pointer !text-text/md/regular">
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
      </div>
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
              name="answer"
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
              <RadioGroup>
                <div className="flex items-center cursor-pointer gap-4 mt-2">
                  <GripVertical className="text-gray-500" />
                  <RadioGroupItem value="option-one" id="option-one" />
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
              </RadioGroup>
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
