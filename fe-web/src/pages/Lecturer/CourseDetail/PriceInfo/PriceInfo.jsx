import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useUpdateCourseMutation } from "@/store/rtk/course.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  original_price: z.coerce
    .number({
      invalid_type_error: "Vui lòng nhập số hợp lệ",
    })
    .min(0, {
      message: "Vui lòng nhập giá gốc khóa học",
    }),
  price: z.coerce
    .number({
      invalid_type_error: "Vui lòng nhập số hợp lệ",
    })
    .min(0, {
      message: "Vui lòng nhập giá bán khóa học",
    }),
  min_price: z.coerce
    .number({
      invalid_type_error: "Vui lòng nhập số hợp lệ",
    })
    .min(0, {
      message: "Vui lòng nhập giá bán thấp nhất khóa học",
    }),
});
export default function PriceInfo({ course }) {
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      original_price: course.originalPrice,
      price: course.sellPrice,
      min_price: course.lowestPrice,
    },
  });
  async function onSubmit(values) {
    const payload = {
      originalPrice: values.original_price,
      sellPrice: values.price,
      lowestPrice: values.min_price,
    };
    await updateCourse({ courseId: course.id, payload });
  }
  return (
    <div className="p-[20px]">
      <header className="text-display/md/medium">GIÁ KHOÁ HỌC</header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-8">
          <div className="flex gap-8">
            <div className="basis-1/3">
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
            </div>
            <div className="basis-1/3">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text/md/medium">
                      Giá bán<span className="text-error-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input className="border-gray-600" placeholder={field.value} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="basis-1/3">
              <FormField
                control={form.control}
                name="min_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text/md/medium">
                      Giá bán thấp nhất<span className="text-error-500">*</span>
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
  );
}
