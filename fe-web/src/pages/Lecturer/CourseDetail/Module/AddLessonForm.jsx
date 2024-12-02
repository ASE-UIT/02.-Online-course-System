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
import { useEffect, useRef, useState } from "react";
import { mediaApi } from "@/api/media";
import { calculateVideoDuration } from "@/utils/getLengthVideo";
import { useUpdateCourseMutation } from "@/store/rtk/course.services";
const formSchema = z.object({
  title: z.string().min(1, {
    message: "Vui lòng nhập tên bài học",
  }),
  description: z.string().min(1, {
    message: "Vui lòng nhập giới thiệu cho khóa học",
  }),
  intro: z.string().min(1, {
    message: "Vui lòng nhập giới thiệu cho khóa học",
  }),
});

export default function AddLessonForm({ onClose, moduleSlt, course, isEditForm }) {
  const fileInputRef = useRef(null);
  const [fileSlt, setFileSlt] = useState(null);
  const [errorEmptyFile, setErrorEmptyFile] = useState(false);
  const [isFreeTrial, setIsFreeTrial] = useState(false);
  const [updateCourse] = useUpdateCourseMutation();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      intro: "",
    },
  });
  async function onSubmit(values) {
    setIsLoading(true);
    try {
      const isValid = validateFileEmpty();
      if (!isValid) return;
      // Check if is edit form handle to edit not create new
      if (isEditForm !== -1) {
        await handleEditLesson(values);
        return;
      }
      await handleCreateLesson(values);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  const handleEditLesson = async (values) => {
    if (fileSlt) {
      // If edit file new from local user
      const data = await uploadVideoLesson();
      const newModule = { ...moduleSlt };

      const updatedLessons = [...moduleSlt.lessons];

      updatedLessons[isEditForm] = {
        ...moduleSlt.lessons[isEditForm],
        description: values.description,
        title: values.title,
        introduction: values.intro,
        isFreeTrial: isFreeTrial,
        duration: data.duration,
        videoUrl: data.url,
      };
      newModule.lessons = updatedLessons;
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
      onClose();
    } else {
      const newModule = { ...moduleSlt };
      const updatedLessons = [...moduleSlt.lessons];
      const newLesson = {
        ...moduleSlt.lessons[isEditForm],
        description: values.description,
        title: values.title,
        introduction: values.intro,
        isFreeTrial: isFreeTrial,
      };
      updatedLessons[isEditForm] = newLesson;
      newModule.lessons = updatedLessons;
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
      onClose();
    }
  };
  const handleCreateLesson = async (values) => {
    const data = await uploadVideoLesson();
    // Update course
    const newLessons = [
      ...moduleSlt.lessons,
      {
        description: values.description,
        title: values.title,
        introduction: values.intro,
        isFreeTrial: isFreeTrial,
        duration: data.duration,
        order: moduleSlt.lessons.length + 1,
        videoUrl: data.url,
      },
    ];
    const newModule = { ...moduleSlt };
    newModule.lessons = newLessons;
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
    onClose();
  };
  const uploadVideoLesson = async () => {
    //Get random url video
    const fileUrlResponse = await mediaApi.getVideoUrl();
    if (!fileUrlResponse?.data) return;

    //Upload video to backend
    const formData = new FormData();
    formData.append("file", fileSlt);
    await mediaApi.uploadVideo(fileUrlResponse.data.fileName, formData);
    const duration = await calculateVideoDuration(fileSlt);
    return { url: fileUrlResponse.data.mediaUrl, duration };
  };
  const validateFileEmpty = () => {
    if (fileSlt || (isEditForm !== -1 && moduleSlt.lessons[isEditForm].videoUrl !== "")) return true;
    setErrorEmptyFile(true);
    return false;
  };
  const handleUploadClick = () => {
    setErrorEmptyFile(false);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  useEffect(() => {
    if (isEditForm !== -1 && form.setValue) {
      const lesson = moduleSlt.lessons[isEditForm];
      form.setValue("title", lesson.title);
      form.setValue("description", lesson.description);
      form.setValue("intro", lesson.introduction);
      setIsFreeTrial(lesson?.isFreeTrial);
    }
  }, [isEditForm, form, moduleSlt]);
  const showVideoTitle =
    !fileSlt && isEditForm !== -1 && Boolean(moduleSlt?.lessons[isEditForm]?.videoUrl) !== false ? true : false;

  return (
    <div>
      <div className="flex items-center gap-2">
        <div
          onClick={() => onClose()}
          className="px-2 py-2 rounded-full hover:bg-gray-500 transition-all cursor-pointer"
        >
          <ChevronLeft />
        </div>
        <header className="text-display/md/medium">{isEditForm ? "CHỈNH SỬA BÀI HỌC" : "THÊM BÀI HỌC MỚI"}</header>
      </div>
      <div
        className={`${
          errorEmptyFile ? "border-error-500 bg-error-50" : "border-black-300"
        } py-[20px] border-[1px]  border-dashed mt-3 flex flex-col gap-2 items-center justify-center`}
      >
        <p className="text-text/md/regular">Video bài học</p>
        {fileSlt && !showVideoTitle && <p>{fileSlt.name}</p>}
        {!fileSlt && !showVideoTitle && <p className="text-text/sm/regular text-error-500">Chưa có video</p>}
        {showVideoTitle && <p>Đã có video</p>}
        <div
          onClick={() => handleUploadClick()}
          className="cursor-pointer hover:bg-primary-600 transition-all px-[16px] py-[12px] flex items-center gap-2 bg-primary-500 rounded-[8px] text-white"
        >
          <VideoIcon />
          <p>Tải lên video</p>
        </div>
      </div>
      <input
        type="file"
        accept="video/mp4"
        ref={fileInputRef}
        onChange={(e) => setFileSlt(e.target.files?.[0])}
        style={{ display: "none" }}
      />
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
              name="description"
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
              <Checkbox id="terms" checked={isFreeTrial} onCheckedChange={(e) => setIsFreeTrial(e)} />
              <label
                htmlFor="terms"
                className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Khóa học miễn phí
              </label>
            </div>
            <FormField
              control={form.control}
              name="intro"
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
          <Button
            disabled={isLoading}
            onClick={() => validateFileEmpty()}
            type="submit"
            className=" inline-block mt-5 px-8 rounded-xl"
          >
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
