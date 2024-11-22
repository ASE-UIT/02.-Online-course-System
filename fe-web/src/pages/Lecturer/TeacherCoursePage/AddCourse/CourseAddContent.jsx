import CommentIcon from '@/assets/CommentIcon';
import GroupIcon from '@/assets/GroupIcon';
import StarIcon from '@/assets/StarIcon';
import { Button } from '@/components/ui/button';
import { Plus, Upload } from 'lucide-react';
import React from 'react';
import CourseCardIcon from "/picture/CourseCardIcon.svg";
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, FormSelect, FormUpload } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  name_course: z.string().min(6, {
    message: "Vui lòng nhập tên khóa học",
  }),
  summary: z.string().min(1, {
    message: "Vui lòng nhập mô tả khóa học",
  }),
  category: z.string().min(1, {
    message: "Vui lòng chọn chuyên mục của khóa học",
  }),
  picture: z.any().refine((file) => file instanceof File, {
    message: "Vui lòng tải lên một tệp",
  }),
  description: z.string().min(1, {
    message: "Vui lòng nhập description",
  }),
  benefits: z.string().min(1, {
    message: "Vui lòng nhập các lợi ích",
  }),
  participant: z.string().min(1, {
    message: "Vui lòng nhập các đối tượng tham gia",
  }),
  requirement: z.string().min(1, {
    message: "Vui lòng nhập các yêu cầu đầu vào",
  }),
});

export const AddCourseContent = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name_course: "",
      summary: "",
      category: "",
      description: "",
      picture: null,
      benefits: "",
      participant: "",
      requirement: "",
    },
  });

  async function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className="mx-[80px] rounded-t-[12px] flex flex-col gap-[10px] border border-gray-500">
      <div className="title flex bg-primary-50 py-[8px] px-[20px] gap-[10px] justify-between items-center h-[64px] border rounded-t-[12px]">
        <p className="text-text/lg/medium">Thêm khóa học mới</p>
      </div>
      <div className="content p-[20px]">
        <div className="link">
          <label className="text-text/md/regular">
            Tải lên khoá học bằng đường dẫn link outline google sheet{' '}
            <span className="text-text/md/medium text-primary-500">[mẫu]</span>
          </label>
          <div className="flex gap-[8px] items-center">
            <div className="py-2 w-[909px]">
              <Input />
            </div>
            <div className="button w-[115px]">
              <Button className="w-full text-text/md/medium text-white">Tải lên</Button>
            </div>
          </div>
        </div>
        <header className="text-display/md/medium py-[20px]">
          Hoặc điền thông tin vào form dưới đây
        </header>
        
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-4">
            <div className="flex items-start gap-5 w-full">
              {/* First Input Field - Width 542px */}
              <FormField
                control={form.control}
                name="name_course"
                render={({ field }) => (
                  <FormItem className="basis-[45%]">
                    <FormLabel className="text-text/md/medium">
                      Tên khóa học<span className="text-error-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input className="border-gray-600" placeholder="Nhập tên khóa học" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="basis-[20%]">
                    <FormLabel className="text-text/md/medium">
                      Chuyên mục<span className="text-error-500">*</span>
                    </FormLabel>
                    <FormControl>
                    <FormSelect 
                        value={field.value}
                        onChange={field.onChange}
                        options={[
                          { value: 'technology', label: 'Công nghệ' },
                          { value: 'business', label: 'Kinh doanh' },
                          { value: 'design', label: 'Thiết kế' },
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="picture"
                render={({ field }) => (
                  <FormItem className="basis-[35%]">
                    <FormLabel className="text-text/md/medium">
                      Ảnh (theo tỉ lệ 2:1)<span className="text-error-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <FormUpload onChange={(e) => field.onChange(e.target.files[0])} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-[10px] items-center">
              <Checkbox/>
              <p className='text-text/md/regular'>Cho trải nghiệm thử khi có coupon (<span className='text-text/md/medium text-error-500'>?</span>)</p>
            </div>  
            <FormField
                control={form.control}
                name="picture"
                render={({ field }) => (
                  <FormItem className="w-full ">
                    <FormLabel className="text-text/md/medium">
                    Mô tả ngắn (100-200 ký tự)<span className="text-error-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input className="border-gray-600" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            /> 
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-text/md/medium">
                    Giới thiệu<span className="text-error-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea className="border-gray-600 h-[245px]" placeholder={field.value} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="benefits"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-text/md/medium">
                    Lợi ích (mỗi lợi ích một dòng)<span className="text-error-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea className="border-gray-600 h-[245px]" placeholder={field.value} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="participant"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-text/md/medium">
                    Đối tượng đầu vào<span className="text-error-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea className="border-gray-600 h-[189px]" placeholder={field.value} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="requirement"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-text/md/medium">
                    Yêu cầu đầu vào<span className="text-error-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea className="border-gray-600 h-[189px]" placeholder={field.value} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Submit Button */}
            <Button type="submit" className="py-3 px-4 w-[94px] text-white bg-primary-500">
              Lưu
            </Button>
          </form>
        </FormProvider>

      </div>
    </div>
  );
};
