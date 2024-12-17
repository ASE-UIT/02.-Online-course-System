import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLoaderData } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { vi } from "date-fns/locale";
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { mediaApi } from "@/api/media";
import { useToast } from "@/hooks/use-toast";
import { studentUpdateProfile } from "@/api/profileApi";

const schema = z.object({
  name: z.string().min(1, "Họ và tên là bắt buộc"),
  email: z.string().nullable().optional(),
  phone_number: z.string().nullable().optional(),
  birthday: z.string().optional(),
  address: z.string().optional(),
  avatar: z.string().optional()
});

const ProfileTab = ({ pageName }) => {
  const { toast } = useToast();
  const studentInfor = useLoaderData().data; // Use useLoaderData to get student information
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    studentInfor.birthday ? new Date(studentInfor.birthday) : null
  );
  const [avatarUrl, setAvatarUrl] = useState(studentInfor.avatar);
  const [avatarError, setAvatarError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: studentInfor.name,
      email: studentInfor.email,
      phone_number: studentInfor.phoneNumber,
      birthday: studentInfor.birthday,
      address: studentInfor.address,
      avatar: studentInfor.avatar
    }
  });

  const onSubmit = async (data) => {
    console.log("Data submitted:", data);
    try {
      setLoading(true);
      const response = await studentUpdateProfile(
        data.name,
        data.avatar,
        data.birthday,
        data.address
      );
      console.log("Profile updated successfully:", response);
      toast({
        type: "success",
        title: "Cập nhật thông tin thành công",
        description: "Thông tin hồ sơ của bạn đã được cập nhật"
      });

      setLoading(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        type: "error",
        title: "Cập nhật thông tin thất bại",
        description: "Đã xảy ra lỗi không xác định"
      });
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setAvatarError("Chỉ chấp nhận tệp hình ảnh");
        return;
      }
      setAvatarError("");
      const reader = new FileReader();
      reader.onloadend = async () => {
        setAvatarUrl(reader.result);
        setValue("avatar", reader.result);

        // Call the uploadImage API
        const formData = new FormData();
        formData.append("file", file);
        try {
          const response = await mediaApi.uploadImage(file.name, formData);
          console.log("Image uploaded successfully:", response.data?.mediaUrl);
          setValue("avatar", response.data?.mediaUrl);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Cập nhật thông tin hồ sơ</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-black">Ảnh đại diện</label>
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-24 h-24 rounded-full mb-4"
            />
          )}
          <div className="flex items-center">
            <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600">
              Chọn tệp
              <input
                type="file"
                accept="image/*"
                {...register("avatar")}
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          {avatarError && <p className="text-red-500">{avatarError}</p>}
        </div>
        <div>
          <label className="block text-black">Họ và tên</label>
          <input
            type="text"
            {...register("name")}
            className="w-full p-2 border rounded-md"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-black">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-2 border rounded-md"
            disabled
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-black">Điện thoại</label>
          <input
            type="text"
            {...register("phone_number")}
            className="w-full p-2 border rounded-md"
            disabled
          />
          {errors.phone_number && (
            <p className="text-red-500">{errors.phone_number.message}</p>
          )}
        </div>
        <div>
          <label className="block text-black">Ngày sinh</label>
          <Popover isOpen={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-500"
                onClick={() => setIsPopoverOpen(true)}
              >
                {selectedDate
                  ? format(selectedDate, "dd/MM/yyyy")
                  : "Chọn ngày"}
                <CalendarDays className="w-6 h-6 ml-2" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-max h-max pr-3">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setValue("birthday", date);
                  setIsPopoverOpen(false);
                }}
                locale={vi}
                className="w-full p-2 border-none rounded-md"
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <label className="block text-black">Địa chỉ</label>
          <input
            type="text"
            {...register("address")}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default ProfileTab;
