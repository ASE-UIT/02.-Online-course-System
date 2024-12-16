import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSelect
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { courseApi } from "@/api/courseApi";
import { useGetCategoriesQuery } from "@/store/rtk/course.services";
import { mediaApi } from "@/api/media";
import axios from "axios";

const formSchema = z.object({
  name_course: z.string().min(6, { message: "Vui lòng nhập tên khóa học" }),
  summary: z.string().min(1, { message: "Vui lòng nhập mô tả khóa học" }),
  category: z
    .string()
    .min(1, { message: "Vui lòng chọn chuyên mục của khóa học" }),
  // picture: z.any().refine((file) => file instanceof File, { message: "Vui lòng tải lên một tệp" }),
  description: z.string().min(1, { message: "Vui lòng nhập description" }),
  benefits: z.string().min(1, { message: "Vui lòng nhập các lợi ích" }),
  participant: z
    .string()
    .min(1, { message: "Vui lòng nhập các đối tượng tham gia" }),
  requirement: z
    .string()
    .min(1, { message: "Vui lòng nhập các yêu cầu đầu vào" })
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
      requirement: ""
    }
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { data, isLoading } = useGetCategoriesQuery();
  const [errorEmptyFile, setErrorEmptyFile] = useState("");
  // console.log('data',data)
  const categories = Array.isArray(data?.data) ? data.data : [];

  const fileInputRef = useRef(null);
  const [fileSlt, setFileSlt] = useState(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      console.log("click");
      fileInputRef.current.click();
    }
  };

  const uploadImageLesson = async () => {
    //Get random url video
    const fileUrlResponse = await mediaApi.getImageUrl();
    if (!fileUrlResponse?.data) return;

    const formData = new FormData();
    formData.append("file", fileSlt);
    await mediaApi.uploadImage(fileUrlResponse.data.fileName, formData);
    return fileUrlResponse.data.mediaUrl;
  };

  const onSubmit = async (values) => {
    if (!fileSlt) {
      setErrorEmptyFile("Vui lòng tải lên một tệp");
      return;
    }
    try {
      setError(null); // Reset previous errors
      setSuccessMessage(null); // Reset success message
      const url = await uploadImageLesson();
      const formData = new FormData();
      formData.append("name", values.name_course);
      formData.append("shortDescription", values.summary);
      formData.append("categoryId", values.category);
      formData.append("thumbnail", url); // Ensure this is a File object
      formData.append("description", values.description);
      formData.append("benefits", values.benefits);
      formData.append("participants", values.participant);
      formData.append("requirement", values.requirement);

      // Log formData fields
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value instanceof File ? value.name : value}`);
      }

      // const response = await courseApi.createCourse(formData);
      const handleData = {
        name: values.name_course,
        shortDescription: values.summary,
        introduction: values.description,
        thumbnail: url,
        participants: values.participant,
        categoryId: values.category,
        benefits: values.benefits,
        requirement: values.requirement
      };

      // const response = await courseApi.createCourse(formData);
      let tokenLecturer = localStorage.getItem("authLecturer");
      tokenLecturer = tokenLecturer.replace(/^"|"$/g, "");
      const response = await axios.post(
        "https://eduhub.io.vn/eduhub-api/api/v1/course",
        handleData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenLecturer}`
          }
        }
      );

      setSuccessMessage("Course created successfully!");
      console.log("Response from backend:", response);
    } catch (err) {
      setError("Failed to create course. Please try again.");
      console.error("Error creating course:", err);
    }
  };

  return (
    <div className="mx-[80px] rounded-t-[12px] flex flex-col gap-[10px] border border-gray-500">
      <div className="title flex bg-primary-50 py-[8px] px-[20px] gap-[10px] justify-between items-center h-[64px] border rounded-t-[12px]">
        <p className="text-text/lg/medium">Thêm khóa học mới</p>
      </div>
      <div className="content p-[20px]">
        <div className="link">
          <label className="text-text/md/regular">
            Tải lên khoá học bằng đường dẫn link outline google sheet{" "}
            <span className="text-text/md/medium text-primary-500">[mẫu]</span>
          </label>
          <div className="flex gap-[8px] items-center">
            <div className="py-2 w-[909px]">
              <Input />
            </div>
            <div className="button w-[115px]">
              <Button className="w-full text-text/md/medium text-white">
                Tải lên
              </Button>
            </div>
          </div>
        </div>
        <header className="text-display/md/medium py-[20px]">
          Hoặc điền thông tin vào form dưới đây
        </header>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 mt-4"
          >
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
                      <Input
                        className="border-gray-600"
                        placeholder="Nhập tên khóa học"
                        {...field}
                      />
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
                        options={
                          categories
                            ? categories.map((category) => ({
                                value: category.id, // Assuming category has 'id' and 'name'
                                label: category.name
                              }))
                            : []
                        }
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
                      Ảnh (theo tỉ lệ 2:1)
                      <span className="text-error-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="">
                        <div
                          className="flex h-10 w-full rounded-md border border-gray-600 bg-background px-3 py-2 text-text/md/normal ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground text-gray-900 focus-visible:outline-none 
                        hover-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          onClick={() => handleUploadClick()}
                        >
                          {fileSlt ? fileSlt?.name : "Tải lên một ảnh"}
                        </div>
                        {errorEmptyFile && (
                          <p className="text-text/sm/medium py-2 text-red-500">
                            {errorEmptyFile}
                          </p>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => {
                setFileSlt(e.target.files?.[0]);
                setErrorEmptyFile("");
              }}
              style={{ display: "none" }}
            />
            {/* <div className="flex gap-[10px] items-center">
              <Checkbox />
              <p className='text-text/md/regular'>Cho trải nghiệm thử khi có coupon (<span className='text-text/md/medium text-error-500'>?</span>)</p>
            </div>   */}

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-text/md/medium">
                    Mô tả ngắn (100-200 ký tự)
                    <span className="text-error-500">*</span>
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
                <FormItem>
                  <FormLabel className="text-text/md/medium">
                    Giới thiệu<span className="text-error-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="border-gray-600 h-[245px]"
                      placeholder={field.value}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="benefits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text/md/medium">
                    Lợi ích (mỗi lợi ích một dòng)
                    <span className="text-error-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="border-gray-600 h-[245px]"
                      placeholder={field.value}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="participant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text/md/medium">
                    Đối tượng tham gia<span className="text-error-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="border-gray-600 h-[245px]"
                      placeholder={field.value}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requirement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text/md/medium">
                    Yêu cầu đầu vào<span className="text-error-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="border-gray-600 h-[245px]"
                      placeholder={field.value}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Submit Button */}
            <Button
              type="submit"
              className="py-3 px-4 w-[94px] text-white bg-primary-500"
              disabled={isLoading}
              onClick={() => {
                if (!fileSlt) {
                  setErrorEmptyFile("Vui lòng tải lên một tệp");
                  return;
                }
              }}
            >
              {isLoading ? "Đang tạo..." : "Lưu"}
            </Button>

            {/* Error and Success Messages */}
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {successMessage && (
              <p className="text-green-500 mt-2">{successMessage}</p>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
